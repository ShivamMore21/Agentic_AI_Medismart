# MediSmart — Security Policy

---

## Authentication
- JWT tokens signed with `JWT_SECRET` (min 32-char random string from env).
- Token expiry: 7 days (`expiresIn: '7d'`).
- Tokens verified on every protected route via `auth.middleware.js`.
- Failed auth returns `401 Unauthorized` — no detail about whether user exists.

## Password Security
- bcrypt hash with **12 salt rounds**.
- Minimum password length: 8 characters.
- Password hash is **never** returned in any API response.
- The `users` table `password_hash` field is excluded from all `SELECT *` queries.

## Authorization
- Role check via `role.middleware.js` — called after `auth.middleware.js`.
- Resource ownership checked in services, not controllers.
- Admin-only routes return `403 Forbidden` for non-admin tokens.
- Pharmacist routes for pharmacy-specific data validate `owner_user_id === req.user.id`.

## Input Validation
- All request bodies validated with **Joi schemas** before reaching controllers.
- Invalid input returns `422 Unprocessable Entity` with field-level errors.
- SQL injection: all queries use **parameterized statements** — no string concatenation.

## Rate Limiting
- Global: 100 requests / 15 minutes per IP.
- `/api/v1/auth/*`: 10 requests / 15 minutes per IP (brute-force protection).

## HTTP Security Headers
- `helmet()` applied globally — sets: `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Strict-Transport-Security`, `Content-Security-Policy`.

## CORS
- Allowed origin: `http://localhost:3000` (dev). Set via `FRONTEND_URL` env var.
- Methods: `GET, POST, PATCH, DELETE`.
- Credentials: `true` for cookie-based extensions (future).

## Environment Secrets
- `JWT_SECRET`, `GEMINI_API_KEY`, `DATABASE_URL` — never committed to git.
- `.env` is in `.gitignore`.
- `.env.example` provided with placeholder values.

## Never Expose
- `password_hash`
- JWT secret
- Database connection string
- Internal stack traces (production responses use generic error messages)
- ABHA private health data beyond authenticated user's own records

## File Upload Security (Prescription OCR)
- Only `image/jpeg`, `image/png`, `image/webp`, `application/pdf` accepted.
- Max file size: 5MB.
- Files processed in-memory by Gemini API — not stored on disk.

## Sensitive Data in Logs
- Passwords, tokens, ABHA IDs are **never** logged.
- Patient phone numbers are masked in logs: `+91 9845X XXXXX`.
