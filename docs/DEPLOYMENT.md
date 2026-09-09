# MediSmart — Deployment Guide

---

## Environment Variables

Create a `.env` file in `backend/` based on `.env.example`.

| Variable | Required | Description |
|---|---|---|
| `NODE_ENV` | Yes | `development` or `production` |
| `PORT` | Yes | Backend server port (default: 4000) |
| `JWT_SECRET` | Yes | Min 32-char random string |
| `JWT_EXPIRES_IN` | No | Token expiry, default `7d` |
| `DATABASE_URL` | No | SQLite file path or PostgreSQL connection URL |
| `GEMINI_API_KEY` | Yes | Google Gemini API key for prescription OCR |
| `FRONTEND_URL` | Yes | CORS allowed origin, e.g. `http://localhost:3000` |
| `RATE_LIMIT_WINDOW_MS` | No | Rate limit window, default `900000` (15 min) |
| `RATE_LIMIT_MAX` | No | Max requests per window, default `100` |

---

## Development Setup

```bash
# 1. Navigate to backend
cd backend

# 2. Install dependencies
npm install

# 3. Create .env
cp .env.example .env
# Edit .env and fill in JWT_SECRET and GEMINI_API_KEY

# 4. Seed database
npm run seed

# 5. Start dev server
npm run dev
# Server runs on http://localhost:4000

# 6. Health check
curl http://localhost:4000/api/v1/health
```

---

## Production Deployment

```bash
# Set NODE_ENV
NODE_ENV=production

# Start server
node src/server.js

# Or with PM2
pm2 start src/server.js --name medismart-api

# Or with Docker (Dockerfile provided in backend/)
docker build -t medismart-api .
docker run -p 4000:4000 --env-file .env medismart-api
```

---

## Build Commands

```bash
npm run dev       # Development with nodemon auto-reload
npm start         # Production start
npm test          # Run all tests
npm run seed      # Seed database with initial data
npm run seed:reset # Drop all tables and re-seed
```

---

## Database Configuration

- **Development**: SQLite file at `backend/data/medismart.db`
- **Production**: Set `DATABASE_URL=postgresql://user:pass@host:5432/medismart`
- The `database.js` config auto-detects based on `DATABASE_URL` prefix

---

## Health Check

```
GET /api/v1/health
```
Returns uptime and status. Use this for load balancer and monitoring probes.

---

## Logging

- Log level: `info` (prod), `debug` (dev)
- Log format: JSON structured logs (Winston)
- Log output: `stdout` (for containerized deployments to capture via log aggregators)
- Log file: `backend/logs/app.log` (dev only)

---

## Important Notes

- **Never commit `.env`** — it is in `.gitignore`
- Ensure `JWT_SECRET` is at least 32 random characters in production
- GEMINI_API_KEY must have the `generativelanguage` API enabled in Google Cloud Console
