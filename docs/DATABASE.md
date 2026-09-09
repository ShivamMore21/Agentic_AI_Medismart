# MediSmart — Database Schema

**Database**: SQLite (dev) → PostgreSQL (prod, same schema)
**ORM**: Raw SQL via `better-sqlite3` (dev) / `pg` (prod)

---

## Tables

### users
| Column | Type | Constraints |
|---|---|---|
| id | TEXT | PK, UUID |
| name | TEXT | NOT NULL |
| email | TEXT | UNIQUE, NOT NULL |
| password_hash | TEXT | NOT NULL |
| role | TEXT | CHECK IN ('patient','pharmacist','admin') |
| phone | TEXT | |
| age | INTEGER | |
| gender | TEXT | |
| locality | TEXT | |
| pincode | TEXT | |
| abha_id | TEXT | UNIQUE |
| abdm_verified | INTEGER | DEFAULT 0 |
| store_name | TEXT | Pharmacist only |
| license_number | TEXT | Pharmacist only |
| abdm_facility_id | TEXT | Pharmacist only |
| pos_software | TEXT | Pharmacist only |
| branch_id | TEXT | Pharmacist only |
| created_at | TEXT | ISO8601 |
| updated_at | TEXT | ISO8601 |

**Indexes**: email, role, pincode

---

### medicines
| Column | Type | Constraints |
|---|---|---|
| id | TEXT | PK |
| brand_name | TEXT | NOT NULL |
| manufacturer | TEXT | |
| salt_composition | TEXT | NOT NULL |
| dosage_form | TEXT | |
| pack_size | TEXT | |
| prescribed_mrp | REAL | |
| market_price | REAL | |
| generic_substitute_name | TEXT | |
| generic_manufacturer | TEXT | |
| generic_price | REAL | |
| jan_aushadhi_price | REAL | |
| savings_percentage | REAL | |
| bio_equivalence_score | REAL | |
| category | TEXT | |
| schedule_type | TEXT | CHECK IN ('Schedule H','Schedule H1','OTC') |
| description | TEXT | |
| created_at | TEXT | |

**Indexes**: brand_name (FTS), salt_composition (FTS), category, schedule_type

---

### pharmacies
| Column | Type | Constraints |
|---|---|---|
| id | TEXT | PK |
| name | TEXT | NOT NULL |
| store_type | TEXT | CHECK IN ('Jan Aushadhi (Govt)','Organized Chain','Independent Chemist','Online E-Pharmacy') |
| address | TEXT | |
| locality | TEXT | |
| pincode | TEXT | NOT NULL |
| lat | REAL | |
| lng | REAL | |
| phone | TEXT | |
| open_hours | TEXT | |
| is_open_24 | INTEGER | DEFAULT 0 |
| abdm_verified | INTEGER | DEFAULT 0 |
| owner_user_id | TEXT | FK → users.id |
| created_at | TEXT | |

**Indexes**: pincode, locality, store_type

---

### pharmacy_stock
| Column | Type | Constraints |
|---|---|---|
| id | TEXT | PK |
| pharmacy_id | TEXT | FK → pharmacies.id |
| medicine_id | TEXT | FK → medicines.id |
| price | REAL | |
| stock_count | INTEGER | DEFAULT 0 |
| stock_status | TEXT | CHECK IN ('High Stock','Ample Stock','Low Stock','In Stock') |
| batch_number | TEXT | |
| rack_location | TEXT | |
| last_synced_at | TEXT | |

---

### reservations
| Column | Type | Constraints |
|---|---|---|
| id | TEXT | PK |
| hold_code | TEXT | UNIQUE, NOT NULL |
| patient_id | TEXT | FK → users.id |
| pharmacy_id | TEXT | FK → pharmacies.id |
| medicine_id | TEXT | FK → medicines.id |
| patient_name | TEXT | |
| medicine_name | TEXT | |
| generic_switched | INTEGER | DEFAULT 0 |
| savings_amount | REAL | DEFAULT 0 |
| amount_due | REAL | |
| payment_method | TEXT | DEFAULT 'UPI / Cash' |
| status | TEXT | CHECK IN ('Awaiting Pickup','Dispensed','Expired') |
| erx_verified | INTEGER | DEFAULT 0 |
| expires_at | TEXT | NOT NULL |
| created_at | TEXT | |

**Indexes**: patient_id, pharmacy_id, status, expires_at

---

### medicine_history
| Column | Type | Constraints |
|---|---|---|
| id | TEXT | PK |
| patient_id | TEXT | FK → users.id, NOT NULL |
| medicine_name | TEXT | |
| brand_prescribed | TEXT | |
| salt_composition | TEXT | |
| dosage | TEXT | |
| frequency | TEXT | |
| condition_targeted | TEXT | |
| start_date | TEXT | |
| end_date | TEXT | |
| status | TEXT | CHECK IN ('Active (Ongoing)','Completed','Refill Due','Discontinued') |
| pharmacy_name | TEXT | |
| pharmacy_locality | TEXT | |
| mrp_paid | REAL | |
| original_brand_mrp | REAL | |
| savings_realized | REAL | |
| is_jan_aushadhi | INTEGER | DEFAULT 0 |
| hold_code | TEXT | |
| refill_days_left | INTEGER | |
| prescribing_doctor | TEXT | |
| notes | TEXT | |
| created_at | TEXT | |

---

### medical_conditions
| Column | Type | Constraints |
|---|---|---|
| id | TEXT | PK |
| patient_id | TEXT | FK → users.id, NOT NULL |
| condition_name | TEXT | NOT NULL |
| diagnosed_year | TEXT | |
| severity | TEXT | CHECK IN ('Mild','Moderate','Severe','Controlled') |
| notes | TEXT | |
| created_at | TEXT | |

---

### discrepancy_reports
| Column | Type | Constraints |
|---|---|---|
| id | TEXT | PK |
| pharmacy_name | TEXT | NOT NULL |
| medicine_name | TEXT | NOT NULL |
| reported_price | REAL | NOT NULL |
| official_price | REAL | |
| difference_percentage | REAL | |
| receipt_attached | INTEGER | DEFAULT 0 |
| patient_phone | TEXT | |
| patient_id | TEXT | FK → users.id |
| locality | TEXT | |
| status | TEXT | CHECK IN ('Under Investigation','Warning Issued','Resolved / Refunded','Dismissed') |
| notes | TEXT | |
| created_at | TEXT | |

---

### price_ceilings
| Column | Type | Constraints |
|---|---|---|
| id | TEXT | PK |
| salt_name | TEXT | NOT NULL |
| dosage_form | TEXT | |
| therapeutic_category | TEXT | |
| dpco_ceiling_price_per_unit | REAL | |
| last_revised_date | TEXT | |
| reference_standard | TEXT | |
| is_schedule_h1 | INTEGER | DEFAULT 0 |

---

### pharmacy_applications
| Column | Type | Constraints |
|---|---|---|
| id | TEXT | PK |
| pharmacy_name | TEXT | NOT NULL |
| store_type | TEXT | |
| locality | TEXT | |
| pincode | TEXT | |
| proprietor_name | TEXT | |
| license_number | TEXT | UNIQUE |
| abdm_facility_id | TEXT | |
| pos_software | TEXT | |
| submitted_date | TEXT | |
| status | TEXT | CHECK IN ('Pending Verification','Approved','Requires Audit') |
| initial_sku_count | INTEGER | DEFAULT 0 |

---

### audit_logs
| Column | Type | Constraints |
|---|---|---|
| id | TEXT | PK |
| action | TEXT | NOT NULL |
| actor | TEXT | |
| detail | TEXT | |
| related_entity_id | TEXT | |
| created_at | TEXT | |

---

## Relationships
```
users (1) ──< medicine_history (many)
users (1) ──< medical_conditions (many)
users (1) ──< reservations (many) [as patient]
pharmacies (1) ──< pharmacy_stock (many)
pharmacies (1) ──< reservations (many)
medicines (1) ──< pharmacy_stock (many)
medicines (1) ──< reservations (many)
```

## Soft Delete Strategy
No soft delete in v1. Hard delete for patient history and conditions (user-controlled). Discrepancy reports are never deleted.

## Audit Requirements
All Schedule H / H1 reservation creates → write to `audit_logs`.
All admin status changes → write to `audit_logs`.
