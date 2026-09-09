import rateLimit from 'express-rate-limit';
import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

const limited = (_req: Request, res: Response) => res.status(429).json({ success: false, error: { code: 'RATE_LIMITED', message: 'Too many requests. Please try again later.' } });
export const globalLimiter = rateLimit({ windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 900000), max: Number(process.env.RATE_LIMIT_MAX || 100), standardHeaders: true, legacyHeaders: false, handler: limited });
export const authLimiter = rateLimit({ windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 900000), max: Number(process.env.RATE_LIMIT_AUTH_MAX || 10), standardHeaders: true, legacyHeaders: false, handler: limited });

export const validateBody = (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) return res.status(422).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Request validation failed', details: error.details.map((d) => d.message) } });
  req.body = value; next();
};

export const registerSchema = Joi.object({ name: Joi.string().trim().min(2).max(120).required(), email: Joi.string().email().required(), password: Joi.string().min(8).max(128).required(), role: Joi.string().valid('patient', 'pharmacist').default('patient'), phone: Joi.string().max(30).allow('') });
export const loginSchema = Joi.object({ email: Joi.string().email().required(), password: Joi.string().required() });
export const reservationSchema = Joi.object({ pharmacyId: Joi.string().required(), medicineId: Joi.string().required(), quantity: Joi.number().integer().min(1).max(100).default(1) });
