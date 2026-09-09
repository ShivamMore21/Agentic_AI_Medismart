# Architecture Decision Records (ADRs)

Document every important technical and product decision here. This serves as a historical record for the AI and human developers.

## Template

*Copy this template for new decisions.*

### [Short Title of the Decision]
**Date:** YYYY-MM-DD

**Context/Problem:**
[Describe the problem, requirements, or context that led to this decision.]

**Decision Taken:**
[Clearly state what was decided.]

**Reasoning:**
[Explain *why* this decision was made. What factors were considered? Why is this the best approach?]

**Alternatives Considered:**
[List other options that were evaluated and why they were rejected.]

**Impact on Project:**
[What are the consequences of this decision? How does it affect the architecture, UX, performance, timeline, etc.?]

---

## Decisions

### Initial Tech Stack Selection
**Date:** 2026-09-08

**Context/Problem:**
Need to select a frontend framework and build tool that allows for rapid development, type safety, and AI integration for the Medismart project.

**Decision Taken:**
Use Vite, React, TypeScript, and Tailwind CSS. Use the `@google/genai` SDK for AI integration.

**Reasoning:**
- **Vite:** Extremely fast HMR and build times compared to Create React App or Webpack.
- **React:** Component-based architecture with a massive ecosystem.
- **TypeScript:** Provides static typing, reducing runtime errors and improving AI code generation context.
- **Tailwind CSS:** Utility-first CSS framework that speeds up UI development and is easy for AI to generate.

**Alternatives Considered:**
- Next.js: Considered for SSR/SEO, but opted for a simpler SPA architecture for the initial phase unless server-side rendering is strictly required.
- vanilla JS: Too slow for complex UI development and lacks type safety.

**Impact on Project:**
Establishes the foundation for all frontend development. Developers and AI assistants must adhere to React best practices and Tailwind utility classes.

---

### Backend Layered Architecture
**Date:** 2026-09-09

**Context/Problem:**
Need a structured, scalable backend architecture for the Express.js server to separate concerns, improve testability, and keep business logic isolated from HTTP routing.

**Decision Taken:**
Implement a layered architecture pattern: Client → Express Router → Middleware → Controller → Service → Repository → Database.

**Reasoning:**
- **Separation of Concerns:** Controllers handle HTTP transport layer (req/res), Services handle core business logic, Repositories handle database interactions.
- **Testability:** Services can be unit tested without mocking Express objects.
- **Maintainability:** Easier to swap out the database layer (e.g., SQLite to PostgreSQL) by only modifying the Repository layer.

**Alternatives Considered:**
- Monolithic fat controllers: Rejected because it makes testing and code reuse difficult as the application grows.

**Impact on Project:**
All backend development must adhere to this directory structure. Business logic MUST NOT leak into controllers.

---

### Stateless JWT Authentication Flow
**Date:** 2026-09-09

**Context/Problem:**
Need a secure, scalable authentication mechanism supporting role-based access control (patient, pharmacist, admin) without maintaining server-side session state.

**Decision Taken:**
Use JSON Web Tokens (JWT) for stateless authentication. Passwords will be hashed using bcrypt (12 rounds). Tokens will have a 7-day expiry and contain the `userId` and `role`.

**Reasoning:**
- **Stateless:** APIs remain truly RESTful and scale easily horizontally without sticky sessions or centralized session stores like Redis.
- **Performance:** Cryptographic verification is fast.
- **Client-Side Storage:** Simple to store in `localStorage` or `sessionStorage` on the React client.

**Alternatives Considered:**
- Session-based auth with cookies (Express-session + Redis): Rejected as it adds infrastructural complexity (Redis) which is overkill for Phase 1.
- OAuth 2.0 / OIDC: Will be considered later for ABDM integration, but native auth is required for the MVP base.

**Impact on Project:**
Requires implementing `authenticateToken` and `requireRole` middleware on the backend. The frontend must attach the token in the `Authorization: Bearer <token>` header for all protected API calls.

---

### Protected Portal Navigation
**Date:** 2026-09-09

**Context/Problem:**
The Phase 3 pharmacist and admin portals were reachable from client navigation while the active session still had the patient role.

**Decision Taken:**
Guard pharmacist and admin portal navigation in the SPA. Store the requested destination, open the matching role login flow, and resume navigation after successful authentication.

**Reasoning:**
This keeps the UI consistent with backend RBAC and prevents an apparent authorization bypass caused by direct client-side view switching.

**Impact on Project:**
Portal entry points now enforce the expected role before rendering the B2B or admin view. Backend authorization remains authoritative for API access.

---

### Backend Persistence Seam for Phase 4
**Date:** 2026-09-09

**Context/Problem:**
The backend route imports and schema references existed in the scaffold, but the route, model, and service implementations were absent, preventing the server from compiling.

**Decision Taken:**
Implement the Phase 4 API behind an isolated typed store seam first. Routes depend on the store contract, allowing SQLite/PostgreSQL repositories to be introduced without changing the HTTP contract.

**Impact on Project:**
The API is runnable for local development and smoke testing. Production persistence migration remains a separate hardening step before deployment.
