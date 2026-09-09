import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import config from './config/env';
import { AuthRequest, authenticateToken, requireRole } from './middleware/auth';
import { authLimiter, loginSchema, registerSchema, reservationSchema, validateBody } from './middleware/security';
import { Medicine, Role, store } from './store';

const api = Router();
const fail = (res: Response, status: number, code: string, message: string) => res.status(status).json({ success: false, error: { code, message } });
const ok = (res: Response, data: unknown, status = 200) => res.status(status).json({ success: true, data });
const publicUser = (u: any) => ({ id: u.id, name: u.name, email: u.email, role: u.role, phone: u.phone, pharmacyId: u.pharmacyId });
const tokenFor = (u: any) => jwt.sign({ userId: u.id, role: u.role }, config.jwt.secret, { expiresIn: config.jwt.expiresIn as any });

api.use('/auth', authLimiter);
api.post('/auth/register', validateBody(registerSchema), async (req, res) => {
  const { name, email, password, role = 'patient', phone } = req.body || {};
  if (!name || !email || !password || !['patient', 'pharmacist', 'admin'].includes(role)) return fail(res, 422, 'VALIDATION_ERROR', 'name, email, password, and valid role are required');
  if (store.users.some((u) => u.email === String(email).toLowerCase())) return fail(res, 409, 'CONFLICT', 'Email is already registered');
  if (role === 'admin') return fail(res, 403, 'FORBIDDEN', 'Administrator accounts cannot be self-registered');
  const user = { id: randomUUID(), name, email: String(email).toLowerCase(), passwordHash: await bcrypt.hash(password, 12), role: role as Role, phone };
  store.users.push(user); return res.status(201).json({ success: true, token: tokenFor(user), user: publicUser(user) });
});

api.post('/auth/login', validateBody(loginSchema), async (req, res) => {
  const user = store.users.find((u) => u.email === String(req.body?.email || '').toLowerCase());
  if (!user || !(await bcrypt.compare(req.body?.password || '', user.passwordHash))) return fail(res, 401, 'INVALID_CREDENTIALS', 'Email or password is incorrect');
  store.addAudit(user.id, `${user.role} login`, 'user', user.id); return res.json({ success: true, token: tokenFor(user), user: publicUser(user) });
});
api.get('/auth/me', authenticateToken, (req: AuthRequest, res) => { const user = store.users.find((u) => u.id === req.user?.userId); return user ? ok(res, publicUser(user)) : fail(res, 404, 'NOT_FOUND', 'User not found'); });

api.get('/medicines', (req, res) => {
  const q = String(req.query.search || '').toLowerCase(); const category = String(req.query.category || '').toLowerCase();
  const data = store.medicines.filter((m) => (!q || `${m.brandName} ${m.saltComposition}`.toLowerCase().includes(q)) && (!category || m.category.toLowerCase().includes(category)));
  return res.json({ success: true, data, total: data.length, limit: Number(req.query.limit || 20), offset: Number(req.query.offset || 0) });
});
api.get('/medicines/:id', (req, res) => { const medicine = store.medicines.find((m) => m.id === req.params.id); return medicine ? ok(res, medicine) : fail(res, 404, 'NOT_FOUND', 'Medicine not found'); });
api.get('/medicines/:id/substitutes', (req, res) => { const medicine = store.medicines.find((m) => m.id === req.params.id); if (!medicine) return fail(res, 404, 'NOT_FOUND', 'Medicine not found'); return ok(res, store.medicines.filter((m) => m.id !== medicine.id && m.saltComposition.split(' IP')[0] === medicine.saltComposition.split(' IP')[0]).map((m) => ({ ...m, savingsPercentage: Math.round((1 - m.genericPrice / medicine.marketPrice) * 100) }))); });

api.get('/pharmacies', (req, res) => { const data = store.pharmacies.filter((p) => (!req.query.pincode || p.pincode === req.query.pincode) && (!req.query.locality || p.locality.toLowerCase().includes(String(req.query.locality).toLowerCase()))); return ok(res, data); });
api.get('/pharmacies/:id', (req, res) => { const p = store.pharmacies.find((x) => x.id === req.params.id); return p ? ok(res, p) : fail(res, 404, 'NOT_FOUND', 'Pharmacy not found'); });
api.patch('/pharmacies/:id/inventory/:itemId', authenticateToken, requireRole('pharmacist'), (req: AuthRequest, res) => { const p = store.pharmacies.find((x) => x.id === req.params.id); if (!p || p.ownerId !== req.user?.userId) return fail(res, 403, 'FORBIDDEN', 'Pharmacy access denied'); return ok(res, { pharmacyId: p.id, medicineId: req.params.itemId, stockStrips: Number(req.body.stockStrips || 0), storePriceMRP: Number(req.body.storePriceMRP || 0), updatedAt: new Date().toISOString() }); });

api.post('/reservations', validateBody(reservationSchema), authenticateToken, requireRole('patient'), (req: AuthRequest, res) => { const { pharmacyId, medicineId, quantity = 1 } = req.body || {}; const p = store.pharmacies.find((x) => x.id === pharmacyId); const m = store.medicines.find((x) => x.id === medicineId); if (!p || !m) return fail(res, 404, 'NOT_FOUND', 'Pharmacy or medicine not found'); const reservation = { id: randomUUID(), holdCode: `#MS-${Math.floor(1000 + Math.random() * 9000)}`, patientId: req.user!.userId, pharmacyId, medicineId, quantity: Number(quantity), totalPrice: m.genericPrice * Number(quantity), status: 'Awaiting Pickup' as const, expiresAt: new Date(Date.now() + 7200000).toISOString(), createdAt: new Date().toISOString() }; store.reservations.unshift(reservation); store.addAudit(req.user!.userId, 'Reservation Created', 'reservation', reservation.id, { medicineId, scheduleType: m.scheduleType }); return res.status(201).json({ success: true, data: { ...reservation, pharmacyName: p.name, medicine: m.brandName } }); });
api.get('/reservations', authenticateToken, (req: AuthRequest, res) => { const data = store.reservations.filter((r) => req.user?.role === 'patient' ? r.patientId === req.user.userId : (!req.query.pharmacyId || r.pharmacyId === req.query.pharmacyId)); return ok(res, data); });
api.patch('/reservations/:id/status', authenticateToken, requireRole('pharmacist'), (req: AuthRequest, res) => { const r = store.reservations.find((x) => x.id === req.params.id); const p = store.pharmacies.find((x) => x.id === r?.pharmacyId); if (!r || !p || p.ownerId !== req.user?.userId) return fail(res, 403, 'FORBIDDEN', 'Reservation access denied'); if (!['Dispensed', 'Cancelled'].includes(req.body?.status)) return fail(res, 422, 'VALIDATION_ERROR', 'Status must be Dispensed or Cancelled'); r.status = req.body.status; store.addAudit(req.user!.userId, `Reservation ${r.status}`, 'reservation', r.id); return ok(res, r); });

api.get('/admin/audit-logs', authenticateToken, requireRole('admin'), (_req, res) => ok(res, store.auditLogs));
api.get('/admin/ceilings', authenticateToken, requireRole('admin'), (_req, res) => ok(res, store.medicines.map((m) => ({ id: m.id, saltName: m.saltComposition, dpcoCeilingPrice: m.dpcoCeilingPrice, scheduleType: m.scheduleType }))));
api.get('/admin/applications', authenticateToken, requireRole('admin'), (_req, res) => ok(res, store.pharmacies.filter((p) => !p.approved)));

export default api;
