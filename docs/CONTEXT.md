# MediSmart — Project Context

## Project Name
MediSmart Healthcare Technologies

## Purpose
India's open pharmaceutical transparency platform. Empowers patients to discover bio-equivalent generic medicines at a fraction of branded prices, locate live stock at nearby Jan Aushadhi / private chemist stores, and place 2-hour pharmacy counter holds — while giving pharmacists a B2B portal and admins CDSCO/DPCO regulatory oversight tools.

## Target Users
| Role | Description |
|---|---|
| Patient / Caregiver | Discovers cheaper generics, tracks medication history, files price complaints |
| Pharmacist | Manages inventory, fulfills patient holds, syncs with Marg ERP / C-Square POS |
| Admin (State Drug Controller) | Reviews pharmacy applications, enforces DPCO price ceilings, manages audit logs |

## Core Modules
1. **Medicine Discovery** — salt-based search, bio-equivalence matrix, family savings simulator
2. **Rx Salt Parity Matcher** — visual comparison of branded vs generic molecules
3. **GIS Pharmacy Locator** — live stock map across Jan Aushadhi & private chemists
4. **2-Hour Reservation System** — patient holds medicine at a specific pharmacy counter
5. **Medication History & Health Locker** — patient-owned prescription history + medical conditions
6. **B2B Pharmacist Portal** — inventory management, patient hold queue, POS sync
7. **Admin Portal** — pharmacy onboarding, price discrepancy enforcement, CDSCO audit

## Technology Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Vite 6
- **Backend**: Node.js, Express.js
- **Database**: SQLite (dev) → PostgreSQL (production)
- **Auth**: JWT (access token, 7-day expiry, bcrypt password hashing)
- **AI**: Google Gemini API (`@google/genai`) — prescription OCR
- **Logging**: Winston
- **Validation**: Joi

## Backend Architecture
```
Client → Express API → Middleware → Routes → Controllers → Services → Repositories → SQLite/PostgreSQL
```

## Authentication Strategy
JWT-based. Token issued on login, verified via `Authorization: Bearer <token>` header. Passwords hashed with bcrypt (12 rounds).

## Authorization Strategy
Role-based (`patient`, `pharmacist`, `admin`). Resource-level ownership checks in services.

## Important Integrations
- **Gemini AI**: Prescription image OCR to detect medicine names
- **ABDM**: Ayushman Bharat Digital Mission health ID (ABHA) — future integration
- **Marg ERP / C-Square POS**: Pharmacy inventory sync — future integration

## Current Implementation Status
- ✅ Frontend complete (React SPA with mock data)
- ✅ Docs context system created
- 🚧 Backend implementation in progress

## Development Phase
Phase 2 — Backend scaffolding and core modules
