import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

export type Role = 'patient' | 'pharmacist' | 'admin';
export type ReservationStatus = 'Awaiting Pickup' | 'Dispensed' | 'Cancelled' | 'Expired';

export interface User { id: string; name: string; email: string; passwordHash: string; role: Role; phone?: string; pharmacyId?: string; }
export interface Medicine { id: string; brandName: string; saltComposition: string; category: string; dpcoCeilingPrice: number; marketPrice: number; scheduleType: 'Schedule H' | 'Schedule H1' | 'OTC'; manufacturer: string; genericPrice: number; }
export interface Pharmacy { id: string; name: string; address: string; locality: string; pincode: string; licenseNumber: string; approved: boolean; ownerId: string; }
export interface Reservation { id: string; holdCode: string; patientId: string; pharmacyId: string; medicineId: string; quantity: number; totalPrice: number; status: ReservationStatus; expiresAt: string; createdAt: string; }
export interface AuditLog { id: string; actorId: string; action: string; targetType: string; targetId: string; metadata: unknown; timestamp: string; }

const medicines: Medicine[] = [
  { id: 'augmentin-625', brandName: 'Augmentin 625 Duo', saltComposition: 'Amoxicillin 500mg + Clavulanic Acid 125mg', category: 'Antibiotics', dpcoCeilingPrice: 223.5, marketPrice: 224.5, scheduleType: 'Schedule H1', manufacturer: 'GSK India', genericPrice: 42 },
  { id: 'atorvastatin-20', brandName: 'Lipitor 20mg', saltComposition: 'Atorvastatin Calcium IP 20mg', category: 'Cardiac & Cholesterol', dpcoCeilingPrice: 465, marketPrice: 452, scheduleType: 'Schedule H', manufacturer: 'Pfizer India', genericPrice: 18 },
  { id: 'metformin-500', brandName: 'Glucophage 500mg', saltComposition: 'Metformin Hydrochloride IP 500mg', category: 'Diabetes', dpcoCeilingPrice: 185, marketPrice: 178, scheduleType: 'Schedule H', manufacturer: 'Merck', genericPrice: 14 },
  { id: 'paracetamol-650', brandName: 'Dolo 650mg', saltComposition: 'Paracetamol IP 650mg', category: 'Pain & Fever', dpcoCeilingPrice: 33.6, marketPrice: 33.5, scheduleType: 'OTC', manufacturer: 'Micro Labs', genericPrice: 13.5 },
];

const users: User[] = [];
const pharmacies: Pharmacy[] = [
  { id: 'pmbjp-indiranagar', name: 'PMBJP Jan Aushadhi Kendra', address: '100ft Road, Indiranagar', locality: 'Indiranagar', pincode: '560038', licenseNumber: 'KA-PMBJP-1042', approved: true, ownerId: 'seed-pharmacist' },
];
const reservations: Reservation[] = [];
const auditLogs: AuditLog[] = [];

export const store = {
  users, medicines, pharmacies, reservations, auditLogs,
  async seed() {
    if (!users.some((u) => u.email === 'admin@medismart.test')) {
      users.push({ id: 'seed-admin', name: 'MediSmart Administrator', email: 'admin@medismart.test', passwordHash: await bcrypt.hash('Admin#2026Secure', 12), role: 'admin' });
      users.push({ id: 'seed-pharmacist', name: 'Partner Pharmacist', email: 'pharmacist@medismart.test', passwordHash: await bcrypt.hash('Pharmacist#2026', 12), role: 'pharmacist', pharmacyId: 'pmbjp-indiranagar' });
    }
  },
  addAudit(actorId: string, action: string, targetType: string, targetId: string, metadata: unknown = {}) {
    auditLogs.unshift({ id: randomUUID(), actorId, action, targetType, targetId, metadata, timestamp: new Date().toISOString() });
  },
};
