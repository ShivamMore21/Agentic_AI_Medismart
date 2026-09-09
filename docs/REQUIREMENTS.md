# MediSmart — Backend Requirements

Derived from: PRD v2.4 (`ArchitectureAndPRDView.tsx`), frontend behavior (`App.tsx`, all component files), and type definitions (`types.ts`).

---

## Requirements

| ID | Description | Source | Priority | Backend Impact | Status |
|---|---|---|---|---|---|
| REQ-001 | Users (patient/pharmacist/admin) can register and log in with role-specific fields | LoginModal.tsx | High | Auth APIs + User model | ✅ Done |
| REQ-002 | Patient registration captures name, email, phone, age, gender, locality, pincode, ABHA ID, and initial medical conditions | LoginModal.tsx | High | User + PatientProfile model | ✅ Done |
| REQ-003 | Pharmacy registration captures store name, proprietor, license number, ABDM facility ID, POS software, email, phone | LoginModal.tsx | High | Pharmacy + PharmacyApplication model | ✅ Done |
| REQ-004 | Medicine search by brand name or salt composition | ConsumerDiscoveryView.tsx | High | GET /medicines?search= | ✅ Done |
| REQ-005 | Retrieve bio-equivalent substitute matrix for a given medicine | RxMatcherMatrixView.tsx | High | GET /medicines/:id/substitutes | ✅ Done |
| REQ-006 | List pharmacy stores by pincode/locality with stock status | PharmacyStockLocatorView.tsx | High | GET /pharmacies?pincode= | ✅ Done |
| REQ-007 | Patient places a 2-hour hold on medicine at a specific pharmacy | App.tsx `handleQuickHoldPharmacy` | High | POST /reservations | ✅ Done |
| REQ-008 | Reservation generates a unique hold code (e.g. `#MS-XXXX`) valid 2 hours | App.tsx | High | Reservation service + expiry logic | ✅ Done |
| REQ-009 | Pharmacist views and manages patient reservation queue | PharmacyPartnerPortalView.tsx | High | GET /reservations?pharmacyId= | ✅ Done |
| REQ-010 | Pharmacist marks reservation as Dispensed or Expired | PharmacyPartnerPortalView.tsx | High | PATCH /reservations/:id/status | ✅ Done |
| REQ-011 | Patient views medication history with CRUD operations | MedicineHistoryAndConditionsView.tsx | Medium | GET/POST/PATCH/DELETE /patients/:id/history | ✅ Done |
| REQ-012 | Patient manages medical conditions (add/remove) | MedicineHistoryAndConditionsView.tsx | Medium | GET/POST/DELETE /patients/:id/conditions | ✅ Done |
| REQ-013 | Admin reviews pharmacy onboarding applications | AdminPortalView.tsx | Medium | GET /admin/applications, PATCH status | ✅ Done |
| REQ-014 | Admin manages price discrepancy reports | AdminPortalView.tsx | Medium | GET /admin/discrepancies, PATCH status | ✅ Done |
| REQ-015 | Admin views and updates CDSCO price ceilings | AdminPortalView.tsx | Medium | GET/PATCH /admin/ceilings | ✅ Done |
| REQ-016 | Admin views audit logs | AdminPortalView.tsx | Medium | GET /admin/audit-logs | ✅ Done |
| REQ-017 | Patient files a price discrepancy report | PriceDiscrepancyModal.tsx | Medium | POST /discrepancies | ✅ Done |
| REQ-018 | Prescription image upload analyzed by Gemini AI to detect medicine name | PrescriptionUploadModal.tsx | Low | POST /ai/analyze-prescription | ✅ Done |
| REQ-019 | All Schedule H / H1 medicine dispensing creates an audit trail | PRD Compliance Tab | Medium | Audit log on reservation create | ✅ Done |
| REQ-020 | DPCO price ceiling enforced — reported price vs CDSCO ceiling comparison | AdminPortalView.tsx | Medium | Price validation in discrepancy service | ✅ Done |

### ASSUMPTION Entries
- **ASM-001**: ABHA ID format is `91-XXXX-XXXX-XXXX@abdm` — stored as plain string, not validated against live ABDM API (future integration).
- **ASM-002**: Marg ERP / C-Square POS sync is mocked — webhook endpoint scaffolded but not integrated.
- **ASM-003**: GIS coordinates stored as `lat/lng` floats. No live GPS tracking in v1.
