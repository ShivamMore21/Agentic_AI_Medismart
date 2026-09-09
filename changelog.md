# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Context documentation files for AI assistance: `decisions.md`, `rules.md`, `memory.md`, and `changelog.md`.
- Initial Vite + React + TypeScript project structure.
- Tailwind CSS v4 integration.
- `@google/genai` SDK dependency.
- Phase 4/5 backend API foundation: JWT auth/RBAC, medicine discovery, pharmacy lookup, reservations, audit logs, prescription-analysis fallback, and POS webhook signature validation.
- Phase 6 security and observability: Joi request validation, rate limiting, structured request logs, and standardized error responses.
- Phase 7 verification: backend API smoke tests covering health, medicine search, registration, and admin authorization.
- Phase 8 deployment: backend Dockerfile, Docker Compose service definition, and GitHub Actions CI workflow.

### Changed
- Switched package manager from Bun to npm.
- Added role-aware navigation guards for pharmacist and admin portals; protected destinations are resumed after successful authentication.

### Fixed
- N/A

### Removed
- `bun.lock` file (implicitly during npm migration).

---

*Note: Update this file whenever significant features, bug fixes, or architecture changes are made.*
