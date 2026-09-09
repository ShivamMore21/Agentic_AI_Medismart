# MediSmart — Comprehensive Implementation Phases & Detailed Substeps

## Executive Overview
MediSmart Healthcare Technologies is India's open pharmaceutical transparency platform. This document outlines the step-by-step master roadmap for building, hardening, and deploying MediSmart—from initial architecture to production deployment and regulatory compliance.

Each phase contains specific, actionable substeps, technical requirements, deliverables, and verification criteria.

---

## Phase 1: Project Setup, Planning & Architecture

### Phase Goal
Establish a robust engineering foundation, project standards, repository structure, design specifications, and architecture decision records (ADRs).

### Substeps
- **1.1 Repository & Project Workspace Initialization**
  - [x] Initialize Git repository with structured `.gitignore` (ignoring `.env`, `node_modules`, `dist`, SQLite databases).
  - [x] Configure workspace structure with root frontend React SPA, `backend/` Node.js server directory, and `docs/` documentation hub.
  - [x] Setup `package.json` for frontend and backend with locked dependency versions.

- **1.2 Architecture Decisions & Tech Stack Definition**
  - [x] Draft `decisions.md` (ADR system) defining key choices: React 19, TypeScript 5.8, Tailwind CSS v4, Vite 6, Express.js, Node.js, SQLite/PostgreSQL, and `@google/genai`.
  - [x] Document backend layered architecture: `Client → Express Router → Middleware → Controller → Service → Repository → Database`.
  - [x] Define JWT-based stateless authentication flow with bcrypt password hashing (12 rounds) and 7-day token expiry.

- **1.3 Documentation Hub Setup (`docs/`)**
  - [x] Write `docs/CONTEXT.md`: System purpose, target personas (Patient, Pharmacist, Admin), core modules, and tech stack details.
  - [x] Write `docs/REQUIREMENTS.md`: Map functional requirements (REQ-001 through REQ-020) to frontend components and backend endpoints.
  - [x] Write `docs/DATABASE.md`: Schema specifications, entity relationship diagrams, tables (`users`, `patient_profiles`, `pharmacies`, `medicines`, `reservations`, `discrepancies`, `price_ceilings`, `audit_logs`).
  - [x] Write `docs/API_CONTRACT.md`: Endpoints, HTTP methods, request payloads, response formats, error codes, and headers.
  - [x] Write `docs/BUSINESS_RULES.md`: DPCO price ceiling formulas, 2-hour hold reservation lifecycle, Schedule H/H1 audit requirements.
  - [x] Write `docs/SECURITY.md`: Authentication, authorization (RBAC), CORS, rate limiting, and data encryption policies.
  - [x] Write `docs/ERROR_HANDLING.md`: Standardized error payload structure (`{ success: false, error: { code, message, details } }`).
  - [x] Write `docs/DEPLOYMENT.md`: Environment variables, staging and production deployment steps.

- **1.4 TypeScript & Code Quality Tooling**
  - [x] Configure `tsconfig.json` for frontend and backend with strict type checking.
  - [x] Setup environment variable validation templates (`.env.example` in root and `backend/`).

---

## Phase 2: Frontend Architecture & UI Component Development (Client Portal)

### Phase Goal
Develop a modern, high-performance, responsive React single-page application (SPA) with full visual polish, accessible design components, and state management.

### Substeps
- **2.1 Global Layout & Design System Setup**
  - [x] Configure Tailwind CSS v4 design tokens, custom glassmorphism styles, color palettes, and typography.
  - [x] Implement standard App Header with active role indicator (`Patient`, `Pharmacist`, `Admin`), search shortcut, and profile dropdown.
  - [x] Build multi-view tab navigation bar allowing seamless switching across consumer, pharmacy partner, admin, and PRD compliance views.

- **2.2 Medicine Discovery & Salt Parity Search Engine (`ConsumerDiscoveryView.tsx`)**
  - [x] Implement search bar supporting brand name lookup (e.g. *Augmentin 625mg*) and active pharmaceutical ingredient (API) salt search (e.g. *Amoxicillin + Clavulanic Acid*).
  - [x] Create medicine search result cards detailing DPCO ceiling price, market price, savings percentage, manufacturer, and dosage form.
  - [x] Build Family Savings Calculator computing monthly cost reduction when switching from branded to bio-equivalent generics.

- **2.3 Rx Salt Parity Comparison Matrix (`RxMatcherMatrixView.tsx`)**
  - [x] Build side-by-side visual comparison cards for branded medicine vs Jan Aushadhi generic counterpart.
  - [x] Display chemical composition parity, bio-equivalence verification badges, CDSCO approval status, and price differences.
  - [x] Implement Quick Action button to locate nearby stock for the generic substitute.

- **2.4 GIS Pharmacy Locator & Stock Finder (`PharmacyStockLocatorView.tsx`)**
  - [x] Build pharmacy filter controls by pincode, locality radius, pharmacy type (*Jan Aushadhi Kendra* vs *Private Chemist*), and open status.
  - [x] Create store cards showing live stock availability (*In Stock*, *Low Stock*, *Out of Stock*), distance, contact details, and address.
  - [x] Integrate hold reservation triggers directly from store search result items.

- **2.5 2-Hour Reservation & Counter Hold Engine (`App.tsx`, Modal flows)**
  - [x] Build reservation modal capturing patient details, pharmacy selection, quantity, and urgency.
  - [x] Implement `#MS-XXXX` unique hold code generator with countdown timer component (2 hours).
  - [x] Display active hold status badge and cancellation trigger for patients.

- **2.6 Patient Health Locker & History (`MedicineHistoryAndConditionsView.tsx`)**
  - [x] Build prescription history manager displaying past medications, dosages, prescribing doctor, and refill reminders.
  - [x] Create chronic condition management interface allowing patients to tag active health conditions (e.g., *Diabetes Type 2*, *Hypertension*).
  - [x] Build prescription file attachment modal with drag-and-drop preview.

- **2.7 Regulatory Price Discrepancy Reporting Modal (`PriceDiscrepancyModal.tsx`)**
  - [x] Build complaint filing modal capturing pharmacy name, charged price vs DPCO ceiling, store receipt photo upload, and comments.
  - [x] Provide instant validation feedback comparing entered price against regulatory maximum ceiling.

---

## Phase 3: B2B Pharmacist & Admin Governance Portals

### Phase Goal
Equip pharmacists with real-time inventory and counter hold fulfillment tools, while empowering State Drug Controllers with oversight, application review, and DPCO price enforcement tools.

### Substeps
- **3.1 B2B Pharmacist Partner Portal (`PharmacyPartnerPortalView.tsx`)**
  - [x] Implement real-time reservation queue displaying incoming patient hold requests, countdown timers, and hold codes (`#MS-XXXX`).
  - [x] Build action buttons for pharmacists to mark holds as **Dispensed** or **Expired/Cancelled**.
  - [x] Build stock availability toggle enabling pharmacists to update inventory counts for critical generic medicines.
  - [x] Scaffold POS / Marg ERP / C-Square integration configuration modal for store sync.

- **3.2 Admin Governance & Compliance Dashboard (`AdminPortalView.tsx`)**
  - [x] Build Pharmacy Onboarding Review queue allowing state regulators to verify Drug License numbers, proprietor details, and approve/reject applications.
  - [x] Create Price Discrepancy Investigation portal displaying patient-submitted complaints, flagged overcharging stores, and action triggers (Issue Warning, Send Inspector).
  - [x] Build CDSCO Price Ceiling Management interface allowing admins to update DPCO price ceilings per salt composition.

- **3.3 CDSCO Regulatory Audit Trail Viewer (`PRD Compliance Tab`)**
  - [x] Implement immutable audit log table recording all Schedule H / H1 dispensing events, pharmacy approvals, and price ceiling edits.
  - [x] Filter audit logs by date range, user ID, pharmacy license, and action type.

---

## Phase 4: Backend API Architecture & Core Services

### Phase Goal
Construct a robust, modular, production-ready Express.js backend server with SQLite (dev) / PostgreSQL (prod) database repositories, JWT security, and comprehensive route controllers.

### Substeps
- **4.1 Express Server Scaffolding (`backend/src/server.ts`, `app.ts`)**
  - [x] Initialize Express application with middleware stack: `cors()`, `express.json()`, `express.urlencoded()`, Morgan logging.
  - [x] Define modular router structure mounted at `/api/v1`.
  - [x] Implement health check endpoint `GET /api/v1/health` returning uptime, database connection status, and version.

- **4.2 Database Access Layer & Migration Scaffolding (`backend/src/config/database.ts`, `db.ts`)**
  - [x] Set up database connection pool abstraction supporting SQLite (`sqlite3` / `better-sqlite3`) for local development and PostgreSQL (`pg`) for production.
  - [x] Create automated table creation / migration script initializing tables:
    - `users` (id, email, password_hash, role, name, phone, created_at)
    - `patient_profiles` (user_id, age, gender, pincode, locality, abha_id, conditions)
    - `pharmacies` (id, user_id, store_name, proprietor, license_number, abdm_facility_id, pos_system, address, pincode, lat, lng, is_approved)
    - `medicines` (id, brand_name, salt_composition, category, dpco_ceiling_price, market_price, unit_pack, manufacturer, schedule_type)
    - `pharmacy_stocks` (id, pharmacy_id, medicine_id, stock_status, quantity, updated_at)
    - `reservations` (id, hold_code, patient_id, pharmacy_id, medicine_id, quantity, total_price, status, expires_at, created_at)
    - `discrepancies` (id, patient_id, pharmacy_id, medicine_id, charged_price, ceiling_price, status, comments, created_at)
    - `audit_logs` (id, actor_id, action, target_type, target_id, metadata, timestamp)
  - [x] Write database seeder script populating initial medicines, Jan Aushadhi pharmacies, DPCO ceilings, and sample users.

- **4.3 Auth & RBAC Middleware (`backend/src/middleware/auth.ts`, `backend/src/services/auth.service.ts`)**
  - [x] Implement `POST /api/v1/auth/register` supporting patient, pharmacist, and admin role registration.
  - [x] Implement `POST /api/v1/auth/login` validating bcrypt password hashes and returning signed JWT token containing `userId` and `role`.
  - [x] Build `authenticateToken` middleware checking `Authorization: Bearer <token>` header.
  - [x] Build `requireRole(...roles)` middleware enforcing RBAC on restricted routes.

- **4.4 Medicine Discovery & Parity API Service (`backend/src/controllers/medicine.controller.ts`)**
  - [x] Implement `GET /api/v1/medicines?search=&category=&schedule=` handling salt and brand text search.
  - [x] Implement `GET /api/v1/medicines/:id/substitutes` querying bio-equivalent medicines matching the target salt composition.

- **4.5 Pharmacy Stock Locator API Service (`backend/src/controllers/pharmacy.controller.ts`)**
  - [x] Implement `GET /api/v1/pharmacies?pincode=&locality=&type=` returning store details and live medicine stock status.
  - [x] Implement `PATCH /api/v1/pharmacies/:id/stock` allowing approved pharmacists to update stock counts.

- **4.6 Counter Hold Reservation Engine (`backend/src/services/reservation.service.ts`)**
  - [x] Implement `POST /api/v1/reservations` creating 2-hour holds, generating `#MS-XXXX` codes, setting `expires_at = NOW() + 2 hours`.
  - [x] Implement `GET /api/v1/reservations` with user/pharmacy ID filters.
  - [x] Implement `PATCH /api/v1/reservations/:id/status` for marking holds as **Dispensed** or **Cancelled**.
  - [x] Build background cron/interval worker auto-expiring overdue reservations (`status = 'Expired'`).
  - [x] Trigger audit log entry for Schedule H/H1 medicine reservations.

- **4.7 Patient History & Medical Conditions API (`backend/src/controllers/patient.controller.ts`)**
  - [x] Implement `GET/POST/DELETE /api/v1/patients/:id/history` managing medication history.
  - [x] Implement `GET/POST/DELETE /api/v1/patients/:id/conditions` managing chronic health conditions.

- **4.8 Admin Governance & Compliance API (`backend/src/controllers/admin.controller.ts`)**
  - [x] Implement `GET /api/v1/admin/applications` and `PATCH /api/v1/admin/applications/:id` for pharmacy onboarding approval.
  - [x] Implement `GET /api/v1/admin/discrepancies` and `PATCH status` for managing price overcharge complaints.
  - [x] Implement `GET/PATCH /api/v1/admin/ceilings` for updating DPCO regulatory price caps.
  - [x] Implement `GET /api/v1/admin/audit-logs` for fetching system regulatory logs.

---

## Phase 5: Intelligent AI Features & External Integrations

### Phase Goal
Integrate Google Gemini AI for smart prescription OCR and set up integration readiness for POS software and ABDM ABHA credentials.

### Substeps
- **5.1 Google Gemini AI Prescription OCR Service (`backend/src/services/ai.service.ts`)**
  - [x] Install `@google/genai` SDK and configure API client with `GEMINI_API_KEY`.
  - [x] Build endpoint `POST /api/v1/ai/analyze-prescription` receiving base64 image data.
  - [x] Craft structured prompt extracting: `medicineName`, `dosage`, `frequency`, `duration`, and `confidenceScore`.
  - [x] Implement fallback response and error handler for unreadable or non-prescription images.

- **5.2 Pharmacy POS & Marg ERP / C-Square Sync Webhook (`backend/src/routes/webhook.routes.ts`)**
  - [x] Scaffold webhook endpoint `POST /api/v1/webhooks/pos-sync` to process automated inventory stock updates from external POS software.
  - [x] Validate webhook payload signatures and map external item codes to MediSmart medicine IDs.

- **5.3 ABDM / ABHA Health ID Readiness**
  - [x] Validate ABHA ID format (`91-XXXX-XXXX-XXXX@abdm`) in registration service schemas.
  - [x] Store ABHA ID securely in `patient_profiles` table for future sandbox API integration.

---

## Phase 6: Error Handling, Security Hardening & Logging

### Phase Goal
Protect system against common web vulnerabilities, enforce input sanitization, log operational metrics, and provide clean error handling.

### Substeps
- **6.1 Centralized Error Handling & Validation (`backend/src/middleware/error.middleware.ts`)**
  - [x] Integrate `Joi` or `Zod` schemas for request body and query parameter validation.
  - [x] Create centralized Express error handler mapping operational errors to standardized HTTP status codes (400, 401, 403, 404, 409, 422, 500).
  - [x] Prevent database error stack leakage in production responses.

- **6.2 Security Controls Implementation (`docs/SECURITY.md`)**
  - [x] Implement `helmet()` middleware for secure HTTP headers (HSTS, CSP, X-Frame-Options).
  - [x] Configure CORS with strict allowed origins.
  - [x] Implement rate-limiting middleware (`express-rate-limit`) on auth endpoints (max 10 requests per minute) and public APIs (max 100 requests per 15 mins).

- **6.3 Telemetry & Logging System**
  - [x] Setup `Winston` logger with log rotation for `combined.log` and `error.log`.
  - [x] Log request methods, status codes, execution durations, and error stack traces.

---

## Phase 7: Testing, Quality Assurance & Verification

### Phase Goal
Verify functional correctness, API contract adherence, security policies, and frontend-backend integration.

### Substeps
- **7.1 Backend Unit & Integration Tests**
  - [x] Setup `Jest` / `Supertest` test suite in `backend/tests/`.
  - [x] Write auth tests verifying user registration, password hashing, and token issuance.
  - [x] Write medicine search & substitute query tests.
  - [x] Write reservation lifecycle tests verifying hold creation, code generation, and 2-hour expiration logic.
  - [x] Write admin RBAC enforcement tests verifying restricted access to governance routes.

- **7.2 Frontend Component & Flow Testing**
  - [x] Test end-to-end user journeys: Search medicine -> Compare generic -> Locate pharmacy -> Book 2-hour hold.
  - [x] Verify state consistency across tab switching and mock database operations.
  - [x] Perform cross-browser and mobile responsive layout testing.

- **7.3 Security Audit & Performance Benchmark**
  - [x] Run static analysis (`npm run lint` / `tsc --noEmit`) to verify zero TypeScript errors.
  - [x] Audit API response latencies and optimize database index usage for search queries.

---

## Phase 8: Deployment, DevOps & Maintenance

### Phase Goal
Package the application for production deployment, automate build pipelines, execute PostgreSQL database migrations, and establish system monitoring.

### Substeps
- **8.1 Environment Configuration & Secrets Management**
  - [x] Finalize `.env.example` templates for frontend and backend.
  - [x] Secure production environment variables (`JWT_SECRET`, `GEMINI_API_KEY`, `DATABASE_URL`).

- **8.2 Database Migration & Production Database Setup**
  - [x] Run PostgreSQL migration scripts to provision tables in production environment.
  - [x] Execute initial database seed script populating Jan Aushadhi store registry and CDSCO DPCO price ceilings.

- **8.3 Production Containerization & CI/CD Pipeline**
  - [x] Write multi-stage `Dockerfile` for backend Node.js app and frontend Vite static build.
  - [x] Write `docker-compose.yml` orchestrating API server, PostgreSQL database, and Nginx reverse proxy.
  - [x] Setup GitHub Actions CI workflow running type checks, linting, and automated unit tests on push.

- **8.4 Production Hosting & Health Monitoring**
  - [x] Deploy frontend SPA to Vercel/Netlify and backend container to Render/AWS.
  - [x] Configure uptime monitoring targeting `GET /api/v1/health`.
  - [x] Establish maintenance procedures and documentation update workflows.

---

## Phase Execution Checklist Summary

| Phase # | Phase Title | Status | Primary Focus |
|---|---|---|---|
| **Phase 1** | Project Setup, Planning & Architecture | ✅ Completed | ADRs, Docs system, TS tooling |
| **Phase 2** | Frontend Architecture & Client Portal | ✅ Completed | Search, Parity Matcher, GIS locator, Holds |
| **Phase 3** | B2B Pharmacist & Admin Portals | ✅ Completed | Reservation queue, DPCO audit, Onboarding |
| **Phase 4** | Backend API & Core Services | ✅ Completed | Express API, SQLite/Postgres DB, JWT, RBAC |
| **Phase 5** | AI OCR & External Integrations | ✅ Completed | Gemini AI prescription OCR, POS webhooks |
| **Phase 6** | Security, Error Handling & Logging | ✅ Completed | Helmet, Rate limiting, Winston, Joi validation |
| **Phase 7** | Testing, QA & Verification | ✅ Completed | Jest API tests, RBAC checks, E2E flows |
| **Phase 8** | Deployment, DevOps & Maintenance | ✅ Completed | Docker, PostgreSQL migration, CI/CD |

