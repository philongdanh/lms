---
id: mocks
title: Mock Server
sidebar_label: Mocks
---

# Mock Server

API mock server cho development và testing.

## Overview

Mock servers cung cấp fake API responses cho:
- Frontend development không cần backend
- Integration testing
- Demo environments

## Structure

```
mocks/
├── README.md       # File này
├── server.js       # Mock server entry
├── data/           # Mock data fixtures
│   └── users.json
└── handlers/       # Request handlers
    └── users.js
```

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
          items: [
            { id: '1', name: 'John', email: 'john@example.com' }
          ],
          pagination: { page: 1, limit: 20, total: 1 }
        }
      })
    );
  }),
];
```

### Option 2: JSON Server

```json
// db.json
{
  "users": [
    { "id": "1", "name": "John", "email": "john@example.com" }
  ]
}
```

```bash
npx json-server --watch db.json --port 3001
```

### Option 3: Prism (OpenAPI)

```bash
npx @stoplight/prism-cli mock openapi/main.yaml --port 3001
```

## Mock Data Guidelines

| Hướng dẫn | Mô tả |
|-----------|-------|
| Dữ liệu thực tế | Sử dụng tên, email thực tế |
| Edge cases | Bao gồm empty states, errors |
| ID nhất quán | Sử dụng ID dự đoán được cho testing |
| Timestamps | Sử dụng ngày tương đối |

## Mock Scenarios

| Scenario | Cách kích hoạt |
|----------|----------------|
| Success | Response mặc định |
| Empty list | `?scenario=empty` |
| Error | `?scenario=error` |
| Slow response | `?scenario=slow` |

## Integration

### Development

```bash
# Start mock server
npm run mock:start

# Start frontend with mock
VITE_API_URL=http://localhost:3001 npm run dev
```

### Testing

```javascript
// Setup MSW for tests
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## References

- [OpenAPI](../openapi/README.md)
- [Contracts](../contracts/README.md)
