# MediSmart — API Contract

Base URL: `http://localhost:4000/api/v1`

---

## Auth

### POST /auth/register
**Auth**: Public
```json
// Request
{
  "name": "Priya Sharma",
  "email": "priya@example.com",
  "password": "SecurePass@123",
  "role": "patient",
  "phone": "+91 98450 12345",
  "age": 34,
  "gender": "Female",
  "locality": "Indiranagar, Bengaluru",
  "pincode": "560038",
  "abhaId": "91-1234-5678-9012@abdm",
  "existingConditions": ["Type 2 Diabetes Mellitus"]
}
// Pharmacist additional fields:
// { "storeName", "licenseNumber", "abdmFacilityId", "posSoftware" }

// Response 201
{ "success": true, "token": "<jwt>", "user": { ...UserSession } }
```

### POST /auth/login
**Auth**: Public
```json
// Request
{ "email": "priya@example.com", "password": "SecurePass@123" }

// Response 200
{ "success": true, "token": "<jwt>", "user": { ...UserSession } }
```

### GET /auth/me
**Auth**: Bearer token required
```json
// Response 200
{ "success": true, "user": { ...UserSession } }
```

---

## Medicines

### GET /medicines
**Auth**: Public
**Query**: `?search=augmentin&category=Antibiotics&scheduleType=Schedule H1&limit=20&offset=0`
```json
// Response 200
{ "success": true, "data": [ ...Medicine[] ], "total": 50, "limit": 20, "offset": 0 }
```

### GET /medicines/:id
**Auth**: Public
```json
// Response 200
{ "success": true, "data": { ...Medicine } }
```

### GET /medicines/:id/substitutes
**Auth**: Public
```json
// Response 200
{ "success": true, "data": [ ...SubstituteMatrixItem[] ] }
```

---

## Pharmacies

### GET /pharmacies
**Auth**: Public
**Query**: `?pincode=560038&locality=Indiranagar&storeType=Jan Aushadhi (Govt)&radius=5`
```json
// Response 200
{ "success": true, "data": [ ...PharmacyStore[] ] }
```

### GET /pharmacies/:id
**Auth**: Public
```json
// Response 200
{ "success": true, "data": { ...PharmacyStore } }
```

### GET /pharmacies/:id/inventory
**Auth**: Bearer + role: pharmacist (own pharmacy only)
```json
// Response 200
{ "success": true, "data": [ ...InventoryItem[] ] }
```

### PATCH /pharmacies/:id/inventory/:itemId
**Auth**: Bearer + role: pharmacist
```json
// Request
{ "stockStrips": 45, "storePriceMRP": 94.00 }
// Response 200
{ "success": true, "data": { ...InventoryItem } }
```

---

## Reservations

### POST /reservations
**Auth**: Bearer + role: patient
```json
// Request
{ "pharmacyId": "ph-001", "medicineId": "augmentin-625", "genericSwitched": true }

// Response 201
{ "success": true, "data": { "holdCode": "#MS-4821", "expiresAt": "2026-09-08T11:00:00Z", "pharmacyName": "HealthHub Koramangala", "medicine": "Moxikind-CV 625" } }
```

### GET /reservations
**Auth**: Bearer
**Patient**: sees own reservations
**Pharmacist**: sees reservations for their pharmacy (`?pharmacyId=ph-001`)
```json
// Response 200
{ "success": true, "data": [ ...PatientReservation[] ] }
```

### PATCH /reservations/:id/status
**Auth**: Bearer + role: pharmacist
```json
// Request
{ "status": "Dispensed" }
// Response 200
{ "success": true, "data": { ...PatientReservation } }
```

---

## Patient

### GET /patients/me/history
**Auth**: Bearer + role: patient
```json
// Response 200
{ "success": true, "data": [ ...MedicineHistoryItem[] ] }
```

### POST /patients/me/history
**Auth**: Bearer + role: patient
```json
// Request: { ...MedicineHistoryItem (without id) }
// Response 201
{ "success": true, "data": { ...MedicineHistoryItem } }
```

### PATCH /patients/me/history/:id
**Auth**: Bearer + role: patient
```json
// Request: { "status": "Completed" }
// Response 200
{ "success": true, "data": { ...MedicineHistoryItem } }
```

### DELETE /patients/me/history/:id
**Auth**: Bearer + role: patient
```json
// Response 204 No Content
```

### GET /patients/me/conditions
**Auth**: Bearer + role: patient
```json
// Response 200
{ "success": true, "data": [ ...MedicalCondition[] ] }
```

### POST /patients/me/conditions
**Auth**: Bearer + role: patient
```json
// Request: { "conditionName": "Hypertension", "severity": "Moderate", "diagnosedYear": "2022" }
// Response 201
{ "success": true, "data": { ...MedicalCondition } }
```

### DELETE /patients/me/conditions/:id
**Auth**: Bearer + role: patient
```json
// Response 204 No Content
```

---

## Admin

### GET /admin/applications
**Auth**: Bearer + role: admin
```json
// Response 200
{ "success": true, "data": [ ...PharmacyApplication[] ] }
```

### PATCH /admin/applications/:id
**Auth**: Bearer + role: admin
```json
// Request: { "status": "Approved" }
// Response 200
{ "success": true, "data": { ...PharmacyApplication } }
```

### GET /admin/discrepancies
**Auth**: Bearer + role: admin
```json
// Response 200
{ "success": true, "data": [ ...PriceDiscrepancyReport[] ] }
```

### PATCH /admin/discrepancies/:id
**Auth**: Bearer + role: admin
```json
// Request: { "status": "Warning Issued", "notes": "Notice served" }
// Response 200
{ "success": true, "data": { ...PriceDiscrepancyReport } }
```

### GET /admin/ceilings
**Auth**: Bearer + role: admin
```json
// Response 200
{ "success": true, "data": [ ...CdscoPriceCeilingItem[] ] }
```

### GET /admin/audit-logs
**Auth**: Bearer + role: admin
```json
// Response 200
{ "success": true, "data": [ { "id", "time", "action", "actor", "detail" } ] }
```

---

## AI

### POST /ai/analyze-prescription
**Auth**: Bearer + role: patient
```json
// Request (multipart/form-data): file: <image>
// OR: { "base64Image": "..." }

// Response 200
{ "success": true, "data": { "detectedMedicineName": "Augmentin 625", "confidence": 0.94 } }
```

---

## Discrepancy (Public Filing)

### POST /discrepancies
**Auth**: Bearer + role: patient
```json
// Request
{ "pharmacyName": "City Care Meds", "medicineName": "Atorvastatin 20mg", "reportedPrice": 112.00, "receiptAttached": true, "patientPhone": "+91 97411 XXXXX" }
// Response 201
{ "success": true, "data": { ...PriceDiscrepancyReport } }
```

---

## Health

### GET /health
**Auth**: Public
```json
// Response 200
{ "success": true, "status": "ok", "uptime": 12345, "timestamp": "2026-09-08T09:00:00Z" }
```
