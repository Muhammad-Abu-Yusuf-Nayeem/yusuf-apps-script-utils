


function cleanRecord(record) {
  return {
    name: cleanName(record.name),
    amount: toNumber(record.amount),
    date: parseDate(record.date),
    email: String(record.email || '').trim().toLowerCase(),
    phone: String(record.phone || '').trim()
  };
}
function isValidPhone(phone) {
  if (isBlank(phone)) return false;

  const value = String(phone)
    .trim()
    .replace(/[\s-]/g, '');

  return /^(01[3-9]\d{8}|\+8801[3-9]\d{8}|8801[3-9]\d{8})$/.test(value);
}
function isValidEmail(email) {
  if (isBlank(email)) return false;

  const value = String(email).trim();

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
function formatDate(date, format = 'dd-MM-yyyy') {
  if (!(date instanceof Date) || isNaN(date)) {
    return '';
  }

  return Utilities.formatDate(
    date,
    Session.getScriptTimeZone(),
    format
  );
}
function parseDate(value) {
  if (isBlank(value)) return null;

  if (value instanceof Date && !isNaN(value)) {
    return value;
  }

  const text = String(value).trim();

  // DD.MM.YYYY
  let match = text.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);

  if (match) {
    const [, day, month, year] = match;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  // DD/MM/YYYY
  match = text.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (match) {
    const [, day, month, year] = match;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  // YYYY-MM-DD
  match = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (match) {
    const [, year, month, day] = match;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  return null;
}

function toBoolean(value) {
  if (isBlank(value)) return null;

  const normalized = String(value).trim().toLowerCase();

  if (['true', 'yes', 'y', '1'].includes(normalized)) {
    return true;
  }

  if (['false', 'no', 'n', '0'].includes(normalized)) {
    return false;
  }

  return null;
}

function toNumber(value) {
  if (isBlank(value)) return null;

  const cleaned = String(value)
    .replace(/,/g, '')
    .replace(/[৳$€£]/g, '')
    .trim();

  const number = Number(cleaned);

  return Number.isNaN(number) ? null : number;
}

function normalizeText(value) {
  if (isBlank(value)) return '';

  return String(value)
    .trim()
    .replace(/\s+/g, ' ')
    .toUpperCase();
}

function isBlank(value) {
  return value === "" || value == null || value === undefined;
}

function cleanName(name) {
  if (isBlank(name)) return '';

  return String(name)
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase());
}

function generateId() {
  const timestamp = Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone(),
    "yyyyMMdd-HHmmss"
  );

  const random = Utilities.getUuid().substring(0, 6).toUpperCase();

  return `ID-${timestamp}-${random}`;
}