# Architecture

## Flow

```text
Raw Sheet Data
      ↓
Reusable Utility Functions
      ↓
Validation / Conversion
      ↓
cleanRecord()
      ↓
Clean Structured Data
      ↓
Sheet / Database / API
```

## Design principles

1. Prefer explicit parsing over ambiguous guessing.
2. Return `null` when conversion cannot be performed.
3. Keep utilities small and composable.
4. Keep Sheet-specific logic outside the library.
5. Test utilities independently before composing them.
6. Use Git for source history and Apps Script deployment versions for runtime releases.

## Boundary

The library handles generic transformations. A consuming project should handle:

- sheet names and ranges
- business rules
- permissions
- triggers
- logging
- API calls
- project-specific validation
