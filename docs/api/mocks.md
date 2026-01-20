---
id: mocks
title: Mock Data
sidebar_label: Mocks
sidebar_position: 3
---

# Mock Data

API mock server for development and testing.

---

## Overview

Mock servers provide fake API responses for:

- Frontend development without backend
- Integration testing
- Demo environments

---

## Structure

```
mocks/
├── server.js       # Mock server entry
├── data/           # Mock data fixtures
│   └── users.json
└── handlers/       # Request handlers
    └── users.js
```

---

## Setup Options

### Option 1: Mock Service Worker (MSW)

```javascript
// handlers.js
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/v1/users', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'success',
        data: {
          items: [{ id: '1', name: 'John', email: 'john@example.com' }],
          pagination: { page: 1, limit: 20, total: 1 },
        },
      }),
    );
  }),
];
```

### Option 2: JSON Server

```json
// db.json
{
  "users": [{ "id": "1", "name": "John", "email": "john@example.com" }]
}
```

```bash
npx json-server --watch db.json --port 3001
```

### Option 3: Prism (OpenAPI)

```bash
npx @stoplight/prism-cli mock openapi/main.yaml --port 3001
```

---

## Mock Data Guidelines

| Guideline      | Description                     |
| -------------- | ------------------------------- |
| Realistic data | Use realistic names, emails     |
| Edge cases     | Include empty states, errors    |
| Consistent IDs | Use predictable IDs for testing |
| Timestamps     | Use relative dates              |

---

## Mock Scenarios

| Scenario      | How to trigger    |
| ------------- | ----------------- |
| Success       | Default response  |
| Empty list    | `?scenario=empty` |
| Error         | `?scenario=error` |
| Slow response | `?scenario=slow`  |

---

## Integration

### Development

```bash

---

# Start mock server
npm run mock:start
```

### Testing

```bash

---

# Run tests with mocks
npm run test:integration
```

---

## References

- [Contracts](./contracts.md)
- [OpenAPI](./openapi.md)
