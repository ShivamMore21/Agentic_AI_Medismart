# MediSmart

MediSmart is organized as two independent applications:

- `frontend/` — React, Vite, TypeScript, and Tailwind client portal.
- `backend/` — Express, TypeScript, JWT/RBAC, medicine, pharmacy, reservation, admin, and integration API.

## Prerequisites

- Node.js 20 or newer
- npm

## Environment variables

Frontend variables belong in `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:4000/api/v1
```

Backend variables belong in `backend/.env`. Copy `backend/.env.example` and set a secure `JWT_SECRET`, `DATABASE_URL`, and `FRONTEND_URL`.

## Install dependencies

```bash
cd frontend
npm install

cd ../backend
npm install
```

## Start the backend

```bash
cd backend
npm run dev
```

The API runs at `http://localhost:4000/api/v1`. Verify it with:

```bash
curl http://localhost:4000/api/v1/health
```

## Start the frontend

In a second terminal:

```bash
cd frontend
npm run dev
```

The frontend runs at `http://localhost:3000` and uses `VITE_API_BASE_URL` for backend calls.

## Run both together

Start the backend and frontend in two terminals, or use Docker for the backend:

```bash
docker compose up --build
```

The frontend can still be started separately with `cd frontend && npm run dev`.

## Verification

Frontend:

```bash
cd frontend
npm run lint
npm run build
```

Backend:

```bash
cd backend
npm test
```

The backend smoke tests cover health, medicine search, registration/JWT issuance, and admin authorization. The frontend performs a health request on startup through `frontend/src/lib/api.ts`; browser requests are allowed by the backend CORS configuration.
