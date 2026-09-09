# MediSmart — Error Handling

## Standard Error Response Format

All API errors return this consistent shape:

```json
{
  "success": false,
  "message": "Human-readable error message",
  "code": "ERROR_CODE_CONSTANT",
  "errors": []
}
```

- `message`: Safe for display to end users.
- `code`: Machine-readable constant for frontend error handling.
- `errors`: Array of field-level validation errors (populated on `VALIDATION_ERROR` only).

## HTTP Status Codes

| Status | Meaning | Example |
|---|---|---|
| 200 | OK | Successful GET/PATCH |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Malformed JSON body |
| 401 | Unauthorized | Missing or invalid JWT |
| 403 | Forbidden | Valid JWT but wrong role |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate email, duplicate license number |
| 422 | Unprocessable Entity | Joi validation failure |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Unexpected server failure |

## Error Code Constants

```js
AUTH_REQUIRED        // No token provided
INVALID_TOKEN        // Malformed or expired JWT
FORBIDDEN            // Insufficient role
VALIDATION_ERROR     // Joi schema failure
NOT_FOUND            // Entity doesn't exist
CONFLICT             // Uniqueness violation
HOLD_EXISTS          // Active reservation already exists for this medicine/pharmacy
HOLD_EXPIRED         // Reservation expired
SCHEDULE_H_REQUIRED  // Prescription required for H/H1 medicine
RATE_LIMITED         // Too many requests
INTERNAL_ERROR       // Generic server error (no details in prod)
```

## Centralized Error Handler

Located in `backend/src/middlewares/errorHandler.middleware.js`.

All errors thrown in services/controllers propagate to this handler via `next(error)`.

```js
// Usage in any controller:
try {
  const result = await service.doSomething();
  res.json({ success: true, data: result });
} catch (err) {
  next(err);
}
```

## Production vs Development

- **Development**: Stack trace included in response for debugging.
- **Production** (`NODE_ENV=production`): Stack trace suppressed. Generic message returned.

```json
// Production 500
{ "success": false, "message": "An unexpected error occurred.", "code": "INTERNAL_ERROR" }

// Development 500
{ "success": false, "message": "Cannot read property of undefined", "code": "INTERNAL_ERROR", "stack": "..." }
```
