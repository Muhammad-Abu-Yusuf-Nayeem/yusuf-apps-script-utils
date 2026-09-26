function normalizeText(value) {
  return String(value).trim().toUpperCase() + " ✓✓";
}

function isBlank(value) {
  return value === "" || value == null || value === undefined;
}

function cleanName(value) {
  return String(value).trim().replace(/\s+/g, " ");
}