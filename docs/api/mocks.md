---
id: mocks
title: Mock Data
sidebar_label: Mocks
sidebar_position: 3
---

# Mock Data

API mock server phục vụ phát triển và kiểm thử.

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

### Tùy chọn 1: Mock Service Worker (MSW)

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

### Tùy chọn 2: JSON Server

```json
// db.json
{
  "users": [{ "id": "1", "name": "John", "email": "john@example.com" }]
}
```

```bash
npx json-server --watch db.json --port 3001
```

### Tùy chọn 3: Prism (OpenAPI)

```bash
npx @stoplight/prism-cli mock openapi/main.yaml --port 3001
```

---

## Mock Data Guidelines

| Principle      | Description                       |
| -------------- | --------------------------------- |
| Dữ liệu thực tế | Sử dụng tên, email thực tế       |
| Edge case      | Bao gồm empty state, lỗi          |
| ID nhất quán   | Sử dụng ID dễ đoán cho kiểm thử   |
| Timestamp      | Sử dụng ngày tương đối            |

---

## Mock Scenarios

| Scenario      | Activation        |
| ------------- | ----------------- |
| Thành công    | Response mặc định |
| Danh sách trống | `?scenario=empty` |
| Lỗi           | `?scenario=error` |
| Phản hồi chậm | `?scenario=slow`  |

---

## Integration

### Phát triển

```bash

---

# Start mock server
npm run mock:start
```

### Kiểm thử

```bash

---

# Run tests with mocks
npm run test:integration
```

---

## References

- [Contracts](./contracts.md)
- [OpenAPI](./openapi.md)

