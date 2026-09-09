# MediSmart — Architecture Decision Log

---

## DEC-001 — SQLite for Development, PostgreSQL-compatible for Production

**Decision**: Use `better-sqlite3` for local development with SQL compatible with PostgreSQL.

**Why**: Zero setup for development. Allows rapid iteration. Schema and query patterns are intentionally PostgreSQL-compatible for production migration.

**Alternatives considered**: MongoDB (rejected — relational data with foreign keys is a better fit), direct PostgreSQL (rejected — requires Docker/service setup for local dev).

**Impact**: Repositories use raw SQL. Switching to PostgreSQL requires only changing the DB driver, not query logic.

**Date**: 2026-09-08

---

## DEC-002 — JWT Authentication (Stateless)

**Decision**: Use JSON Web Tokens for authentication. Access token only (7-day expiry). No refresh token in v1.

**Why**: Stateless auth suits API-first architecture. No server-side session store needed. Works well with React SPA.

**Alternatives considered**: Session + Redis (rejected — adds Redis dependency for v1). Refresh tokens (deferred — added in v2 when mobile clients are built).

**Impact**: All protected routes verify `Authorization: Bearer <token>`. Token payload: `{ id, email, role, licenseNumber? }`.

**Date**: 2026-09-08

---

## DEC-003 — Raw SQL over ORM

**Decision**: Use raw SQL with `better-sqlite3` / `pg` instead of an ORM (Sequelize, Prisma, TypeORM).

**Why**: The data model is stable and well-defined. Raw SQL gives full control over queries and avoids ORM abstraction overhead. Easier to audit for CDSCO compliance queries.

**Alternatives considered**: Prisma (rejected — TypeScript-heavy, adds complexity), Sequelize (rejected — verbose, hides SQL logic).

**Impact**: All DB logic lives in repositories. Query logic is explicit and readable.

**Date**: 2026-09-08

---

## DEC-004 — Repository Pattern

**Decision**: Isolate all database access in repository modules. Services never write SQL directly.

**Why**: Clear separation of concerns. Makes testing easier (mock repository in service tests). Allows DB swap without touching business logic.

**Impact**: Every entity has a corresponding repository file.

**Date**: 2026-09-08

---

## DEC-005 — API Versioning via URL Prefix

**Decision**: All routes prefixed with `/api/v1/`.

**Why**: Allows backwards-compatible API evolution. When frontend requires breaking changes, a `/api/v2/` can be added without disrupting existing consumers.

**Date**: 2026-09-08

---

## DEC-006 — Seeded Data from mockData.ts

**Decision**: Backend is seeded with the same data from the frontend's `mockData.ts`. No empty database on first run.

**Why**: Allows immediate testing without manual data entry. Consistent with what the frontend already displays.

**Impact**: `backend/src/seeds/seed.js` populates all tables on first run.

**Date**: 2026-09-08

---

## DEC-007 — bcrypt with 12 Salt Rounds

**Decision**: Hash all passwords with bcrypt, 12 rounds.

**Why**: 12 rounds provides strong protection while keeping login response under 300ms on modern hardware.

**Date**: 2026-09-08

---

## DEC-008 — Express Rate Limiting

**Decision**: Apply `express-rate-limit` at the app level (100 req/15min per IP) with a stricter limit on `/auth` routes (10 req/15min).

**Why**: Prevents brute-force login attacks and API abuse. Critical for a healthcare platform.

**Date**: 2026-09-08
