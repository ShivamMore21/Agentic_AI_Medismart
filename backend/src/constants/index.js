'use strict';

module.exports = {
  // User roles
  ROLES: {
    PATIENT: 'patient',
    PHARMACIST: 'pharmacist',
    ADMIN: 'admin',
  },

  // Reservation statuses
  RESERVATION_STATUS: {
    AWAITING: 'Awaiting Pickup',
    DISPENSED: 'Dispensed',
    EXPIRED: 'Expired',
  },

  // Medicine schedule types
  SCHEDULE_TYPES: {
    H: 'Schedule H',
    H1: 'Schedule H1',
    OTC: 'OTC',
  },

  // Discrepancy report statuses
  DISCREPANCY_STATUS: {
    INVESTIGATING: 'Under Investigation',
    WARNING: 'Warning Issued',
    RESOLVED: 'Resolved / Refunded',
    DISMISSED: 'Dismissed',
  },

  // Pharmacy application statuses
  APPLICATION_STATUS: {
    PENDING: 'Pending Verification',
    APPROVED: 'Approved',
    AUDIT: 'Requires Audit',
  },

  // Hold duration in seconds (2 hours)
  HOLD_DURATION_SECONDS: 7200,

  // Error codes
  ERROR_CODES: {
    AUTH_REQUIRED: 'AUTH_REQUIRED',
    INVALID_TOKEN: 'INVALID_TOKEN',
    FORBIDDEN: 'FORBIDDEN',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    NOT_FOUND: 'NOT_FOUND',
    CONFLICT: 'CONFLICT',
    HOLD_EXISTS: 'HOLD_EXISTS',
    HOLD_EXPIRED: 'HOLD_EXPIRED',
    SCHEDULE_H_REQUIRED: 'SCHEDULE_H_REQUIRED',
    RATE_LIMITED: 'RATE_LIMITED',
    INTERNAL_ERROR: 'INTERNAL_ERROR',
  },

  // Audit log actions
  AUDIT_ACTIONS: {
    RESERVATION_CREATED: 'Reservation Created',
    RESERVATION_DISPENSED: 'Reservation Dispensed',
    PHARMACIST_LOGIN: 'Pharmacist Login',
    ADMIN_LOGIN: 'Admin Login',
    CEILING_REVISED: 'Ceiling Revision',
    NOTICE_DISPATCHED: 'Notice Dispatched',
    PHARMACY_APPROVED: 'Pharmacy Approved',
  },
};
