# MediSmart — Business Rules

Business rules are enforced **in the backend services**, never trusted from the client.

---

## Authentication & Access

**BR-001**: A user must be authenticated (valid JWT) to place a medicine hold, view medication history, file a discrepancy report, or access any pharmacist/admin portal endpoints.

**BR-002**: A pharmacist can only view and update reservations for their own pharmacy (`owner_user_id` must match the JWT `id`).

**BR-003**: An admin can access all resources. No pharmacy-scoping applies to admin users.

**BR-004**: A patient can only read/modify their own medication history and conditions.

---

## Medicine & Reservations

**BR-005**: A 2-hour hold (reservation) is only valid for 2 hours from creation (`expires_at = created_at + 7200 seconds`). After expiry, status transitions to `Expired` automatically on read.

**BR-006**: A hold code must be unique and follow the format `#MS-XXXX` (4 random digits).

**BR-007**: A patient cannot hold the same medicine at the same pharmacy if an active (`Awaiting Pickup`) reservation already exists.

**BR-008**: Generic switch savings are calculated as `originalBrandMRP - mrpPaid` and must be stored, not computed at read time.

---

## Regulatory (CDSCO / DPCO)

**BR-009**: Any dispensing of a Schedule H or Schedule H1 medicine must create an entry in `audit_logs` with the actor, pharmacy, and medicine details.

**BR-010**: A price discrepancy report is flagged automatically if `reportedPrice > officialPrice * 1.02` (i.e., more than 2% above DPCO ceiling).

**BR-011**: Only an admin can update `price_ceilings`, `discrepancy_reports` status, or `pharmacy_applications` status.

**BR-012**: The CDSCO price ceiling (`dpco_ceiling_price_per_unit`) must never be modified to zero or a negative value.

---

## Pharmacy Onboarding

**BR-013**: A pharmacy application requires a unique `license_number`. Duplicate license numbers are rejected at the API level.

**BR-014**: A pharmacy is only approved after admin review. Self-approval by a pharmacist is not permitted.

---

## Data Integrity

**BR-015**: Medicines flagged as `Schedule H` or `Schedule H1` require a valid prescription reference (`erx_verified = true`) before the hold status can transition to `Dispensed`.

**BR-016**: Patient email addresses must be unique across all roles. A patient and pharmacist cannot share the same email.
