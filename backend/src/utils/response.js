'use strict';

/**
 * Standard API response helpers.
 * All controllers use these to ensure consistent response shapes.
 */

/**
 * @param {object} res - Express response object
 * @param {any} data - Response payload
 * @param {number} [statusCode=200]
 */
function success(res, data, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    data,
  });
}

/**
 * @param {object} res - Express response object
 */
function noContent(res) {
  return res.status(204).send();
}

/**
 * @param {object} res - Express response object
 * @param {any} data - List data
 * @param {number} total - Total count for pagination
 * @param {number} limit
 * @param {number} offset
 */
function list(res, data, total, limit, offset) {
  return res.status(200).json({
    success: true,
    data,
    pagination: { total, limit, offset },
  });
}

/**
 * @param {object} res - Express response object
 * @param {string} message - Human-readable error message
 * @param {string} code - Machine-readable error code
 * @param {number} [statusCode=500]
 * @param {Array} [errors=[]] - Field-level validation errors
 */
function error(res, message, code, statusCode = 500, errors = []) {
  const body = { success: false, message, code };
  if (errors.length > 0) body.errors = errors;
  return res.status(statusCode).json(body);
}

module.exports = { success, noContent, list, error };
