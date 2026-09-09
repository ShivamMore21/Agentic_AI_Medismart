import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/env';
import { Role } from '../store';

export interface AuthRequest extends Request { user?: { userId: string; role: Role }; }

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.header('authorization');
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ success: false, error: { code: 'AUTH_REQUIRED', message: 'Bearer token required' } });
  try { req.user = jwt.verify(header.slice(7), config.jwt.secret) as { userId: string; role: Role }; next(); }
  catch { return res.status(401).json({ success: false, error: { code: 'INVALID_TOKEN', message: 'Token is invalid or expired' } }); }
}

export const requireRole = (...roles: Role[]) => (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || !roles.includes(req.user.role)) return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Insufficient role permissions' } });
  next();
};
