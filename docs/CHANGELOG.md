# MediSmart — Changelog

## [2026-09-08] — Backend Foundation

### Added
- Complete docs context system (14 files in `/docs`)
- Backend folder structure created (`backend/src/...`)
- All backend modules: auth, medicines, pharmacies, reservations, patient, admin, AI
- SQLite schema with 10 tables
- JWT authentication with bcrypt password hashing
- Role-based authorization middleware
- Joi validation for all endpoints
- Centralized error handler
- Winston structured logging
- Express rate limiting (global + auth-specific)
- Gemini AI integration for prescription OCR
- Database seed from frontend mockData
- Jest unit + integration tests scaffold
- `backend/README.md`

### Changed
- `changelog.md` (root) updated to reflect backend implementation
- `memory.md` updated with completed backend features
