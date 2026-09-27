# Yusuf Apps Script Utils

A small reusable utility library for Google Apps Script projects, focused on data cleaning, validation, conversion, and reusable ETL helpers.

## Why this exists

Many Google Sheets automation projects repeatedly need the same operations:

- normalize text
- clean names
- convert messy numeric values
- parse dates
- validate email and Bangladesh phone numbers
- generate unique IDs
- compose these operations into a record-cleaning pipeline

This library centralizes those operations so individual Sheet projects can reuse tested logic instead of duplicating scripts.

## Architecture

```text
VS Code
   ↓
Git → GitHub
   ↓
clasp
   ↓
Apps Script Library
   ↓
Google Sheet Projects
```

## Utilities

| Function | Purpose |
|---|---|
| `isBlank()` | Detect blank and whitespace-only values |
| `normalizeText()` | Trim, collapse whitespace, uppercase |
| `cleanName()` | Normalize a person's name to title case |
| `toNumber()` | Convert numeric text and common currency symbols |
| `toBoolean()` | Convert common true/false representations |
| `parseDate()` | Parse supported date formats safely |
| `formatDate()` | Format a valid Date with `Utilities.formatDate()` |
| `isValidEmail()` | Basic email validation |
| `isValidPhone()` | Bangladesh mobile-number validation |
| `generateId()` | Generate timestamp + UUID-based IDs |
| `cleanRecord()` | Compose utilities into a record-cleaning pipeline |

## Supported date formats

`parseDate()` explicitly supports:

```text
18.11.2024
18/11/2024
2024-11-18
```

Ambiguous formats are intentionally not guessed.

## Example

```javascript
const rawRecord = {
  name: '  md.   rahim uddin ',
  amount: '৳1,25,000',
  date: '25.05.2025',
  email: ' RAHIM@EXAMPLE.COM ',
  phone: '+8801712345678'
};

const clean = YusufUtils.cleanRecord(rawRecord);
Logger.log(clean);
```

## Apps Script library usage

After deploying a version of this project as an Apps Script Library, add the library to a consuming Apps Script project.

Use the library identifier you configured, for example:

```javascript
YusufUtils.cleanName('  md. abu   yusuf nayeem  ');
YusufUtils.toNumber('৳2,500');
YusufUtils.parseDate('18.11.2024');
YusufUtils.generateId();
```

## Local development

Install clasp and authenticate with Google:

```bash
npm install -g @google/clasp
clasp login
```

Clone the Apps Script project if it already exists remotely:

```bash
clasp clone <SCRIPT_ID>
```

Push local changes:

```bash
clasp push
```

Pull remote changes:

```bash
clasp pull
```

## Git workflow

```bash
git status
git add .
git commit -m "Add reusable data utilities"
git push origin main
```

Recommended commit style:

```text
feat: add date parsing utility
fix: validate blank values
refactor: improve record cleaning
test: add utility test cases
```

## Project structure

```text
yusuf-apps-script-utils/
├── Utils.js
├── appsscript.json
├── README.md
├── .gitignore
├── LICENSE
├── docs/
│   └── architecture.md
└── tests/
    └── TestUtils.gs
```

## Scope

This project is intentionally small. It is a reusable foundation for Google Sheets and Apps Script automation rather than a full validation framework.

## License

MIT License. See `LICENSE`.
