/**
 * Yusuf Apps Script Utils
 * Reusable data-cleaning and validation utilities for Google Apps Script.
 */

/**
 * Checks whether a value is blank, including whitespace-only strings.
 * @param {*} value
 * @return {boolean}
 */
function isBlank(value) {
  return value == null || (typeof value === 'string' && value.trim() === '');
}

/**
 * Normalizes text by trimming, collapsing whitespace, and uppercasing.
 * @param {*} value
 * @return {string}
 */
function normalizeText(value) {
  if (isBlank(value)) return '';

  return String(value)
    .trim()
    .replace(/\s+/g, ' ')
    .toUpperCase();
}

/**
 * Cleans a person's name using title case.
 * @param {*} name
 * @return {string}
 */
function cleanName(name) {
  if (isBlank(name)) return '';

  return String(name)
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase());
}

/**
 * Converts common numeric text into a JavaScript Number.
 * Supports comma grouping and common currency symbols.
 * @param {*} value
 * @return {number|null}
 */
function toNumber(value) {
  if (isBlank(value)) return null;

  const cleaned = String(value)
    .replace(/,/g, '')
    .replace(/[৳$€£]/g, '')
    .trim();

  const number = Number(cleaned);
  return Number.isNaN(number) ? null : number;
}

/**
 * Converts common boolean representations into true/false.
 * @param {*} value
 * @return {boolean|null}
 */
function toBoolean(value) {
  if (isBlank(value)) return null;

  const normalized = String(value).trim().toLowerCase();

  if (['true', 'yes', 'y', '1'].includes(normalized)) return true;
  if (['false', 'no', 'n', '0'].includes(normalized)) return false;

  return null;
}

/**
 * Parses supported date formats into a valid JavaScript Date.
 * Supported: DD.MM.YYYY, DD/MM/YYYY, YYYY-MM-DD.
 * Invalid calendar dates return null.
 * @param {*} value
 * @return {Date|null}
 */
function parseDate(value) {
  if (isBlank(value)) return null;

  if (value instanceof Date && !isNaN(value.getTime())) {
    return value;
  }

  const text = String(value).trim();
  let day;
  let month;
  let year;
  let match;

  match = text.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (match) {
    [, day, month, year] = match;
    return buildValidDate(year, month, day);
  }

  match = text.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (match) {
    [, day, month, year] = match;
    return buildValidDate(year, month, day);
  }

  match = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) {
    [, year, month, day] = match;
    return buildValidDate(year, month, day);
  }

  return null;
}

/**
 * Internal helper for strict calendar-date validation.
 * @param {string|number} year
 * @param {string|number} month
 * @param {string|number} day
 * @return {Date|null}
 */
function buildValidDate(year, month, day) {
  const y = Number(year);
  const m = Number(month);
  const d = Number(day);

  const date = new Date(y, m - 1, d);

  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m - 1 ||
    date.getDate() !== d
  ) {
    return null;
  }

  return date;
}

/**
 * Formats a valid Date using Apps Script's Utilities.formatDate().
 * @param {Date} date
 * @param {string} format
 * @return {string}
 */
function formatDate(date, format = 'dd-MM-yyyy') {
  if (!(date instanceof Date) || isNaN(date.getTime())) return '';

  return Utilities.formatDate(
    date,
    Session.getScriptTimeZone(),
    format
  );
}

/**
 * Validates a basic email address structure.
 * @param {*} email
 * @return {boolean}
 */
function isValidEmail(email) {
  if (isBlank(email)) return false;

  const value = String(email).trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Validates common Bangladesh mobile number formats.
 * Accepts 01XXXXXXXXX, +8801XXXXXXXXX, and 8801XXXXXXXXX.
 * Spaces and hyphens are ignored.
 * @param {*} phone
 * @return {boolean}
 */
function isValidPhone(phone) {
  if (isBlank(phone)) return false;

  const value = String(phone)
    .trim()
    .replace(/[\s-]/g, '');

  return /^(01[3-9]\d{8}|\+8801[3-9]\d{8}|8801[3-9]\d{8})$/.test(value);
}

/**
 * Generates a timestamp-based unique ID.
 * @return {string}
 */
function generateId() {
  const timestamp = Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone(),
    'yyyyMMdd-HHmmss'
  );

  const random = Utilities.getUuid().substring(0, 6).toUpperCase();
  return `ID-${timestamp}-${random}`;
}

/**
 * Cleans a standard record by composing the reusable utilities.
 * @param {Object} record
 * @return {Object}
 */
function cleanRecord(record) {
  if (!record || typeof record !== 'object') return null;

  return {
    name: cleanName(record.name),
    amount: toNumber(record.amount),
    date: parseDate(record.date),
    email: isBlank(record.email) ? '' : String(record.email).trim().toLowerCase(),
    phone: isBlank(record.phone) ? '' : String(record.phone).trim()
  };
}
