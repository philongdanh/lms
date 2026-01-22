---
id: interfaces
title: Interfaces & API
sidebar_label: Interfaces
sidebar_position: 15
---

# Interfaces & API Standards

Tài liệu quy định các chuẩn giao tiếp, contract và mock data của hệ thống.

---

## OpenAPI Specification

Tài liệu đặc tả các giao diện lập trình theo chuẩn OpenAPI.

### Contents

Các file đặc tả OpenAPI được lưu trữ trong thư mục `static/openapi/`.

### Base Structure

| Section      | Purpose                                        |
| ------------ | ---------------------------------------------- |
| `info`       | Metadata của API (title, version, description) |
| `servers`    | URL của API server (prod, staging, dev)        |
| `tags`       | Nhóm các endpoint                              |
| `paths`      | Định nghĩa các endpoint                        |
| `components` | Reusable schemas, parameters, responses        |
| `security`   | Yêu cầu xác thực                               |

### File Organization

| Method      | Use Case             |
| ----------- | -------------------- |
| Single file | API nhỏ              |
| Multi-file  | API lớn sử dụng $ref |

### Naming Conventions

| Component  | Rule       | Example          |
| ---------- | ---------- | ---------------- |
| Paths      | kebab-case | `/user-profiles` |
| Operations | HTTP verb  | `get`, `post`    |
| Schemas    | PascalCase | `UserProfile`    |
| Properties | camelCase  | `firstName`      |

### Server Definitions

| Environment | URL Structure                    | Description           |
| ----------- | -------------------------------- | --------------------- |
| Production  | `https://api.lms.com/v1`         | API chính thức        |
| Staging     | `https://staging-api.lms.com/v1` | Môi trường thử nghiệm |
| Development | `http://localhost:3000/v1`       | Phát triển tại máy lẻ |

### Path Operations

#### GET List

| Attribute        | Value                   |
| ---------------- | ----------------------- |
| Path             | `/resources`            |
| Operation ID     | `listResources`         |
| Parameters       | `page`, `limit`, `sort` |
| Success Response | 200 with array          |
| Error Response   | 401 Unauthorized        |

#### GET Single

| Thuộc tính       | Giá trị           |
| ---------------- | ----------------- |
| Path             | `/resources/{id}` |
| Operation ID     | `getResource`     |
| Parameters       | `id` (path)       |
| Success Response | 200 with object   |
| Error Response   | 404 Not Found     |

#### POST Create

| Thuộc tính       | Giá trị          |
| ---------------- | ---------------- |
| Path             | `/resources`     |
| Operation ID     | `createResource` |
| Request Body     | Required         |
| Success Response | 201 Created      |
| Error Response   | 400 Bad Request  |

#### PUT Update

| Thuộc tính       | Giá trị           |
| ---------------- | ----------------- |
| Path             | `/resources/{id}` |
| Operation ID     | `updateResource`  |
| Parameters       | `id` (path)       |
| Request Body     | Required          |
| Success Response | 200 Updated       |
| Error Response   | 404 Not Found     |

#### DELETE

| Thuộc tính       | Giá trị           |
| ---------------- | ----------------- |
| Path             | `/resources/{id}` |
| Operation ID     | `deleteResource`  |
| Parameters       | `id` (path)       |
| Success Response | 204 No Content    |
| Error Response   | 404 Not Found     |

---

## API Contracts

Tiêu chuẩn và thỏa thuận về cấu trúc dữ liệu giao tiếp.

### Structure

```
contracts/
├── consumer-*.json     # Consumer contracts
└── provider-*.json     # Provider verification results
```

### Contract Template

#### Ví dụ Pact Contract

```json
{
  "consumer": {
    "name": "frontend-app"
  },
  "provider": {
    "name": "api-service"
  },
  "interactions": [
    {
      "description": "a request for user profile",
      "providerState": "user exists",
      "request": {
        "method": "GET",
        "path": "/api/v1/users/123",
        "headers": {
          "Authorization": "Bearer token"
        }
      },
      "response": {
        "status": 200,
        "headers": {
          "Content-Type": "application/json"
        },
        "body": {
          "status": "success",
          "data": {
            "id": "123",
            "email": "user@example.com",
            "name": "John Doe"
          }
        }
      }
    }
  ],
  "metadata": {
    "pactSpecification": {
      "version": "2.0.0"
    }
  }
}
```

### Workflow

#### Phía Consumer

1. Viết consumer test để tạo contract
2. Publish contract lên Pact Broker
3. Chạy trên mỗi PR của consumer

#### Phía Provider

1. Lấy contract từ Pact Broker
2. Xác thực provider dựa trên contract
3. Chạy trên mỗi PR của provider

### Guidelines

| Principle              | Description                     |
| ---------------------- | ------------------------------- |
| Giữ contract tối giản  | Chỉ bao gồm các field cần thiết |
| Sử dụng provider state | Thiết lập dữ liệu kiểm thử      |
| Quản lý phiên bản      | Theo dõi các breaking change    |
| Tự động hóa xác thực   | Tích hợp với CI/CD              |

### Tools

| Tool         | Purpose                     |
| ------------ | --------------------------- |
| Pact         | Framework kiểm thử contract |
| Pact Broker  | Lưu trữ contract            |
| can-i-deploy | Xác thực triển khai an toàn |

---

## Mock Data

Hệ thống dữ liệu giả lập phục vụ phát triển và kiểm thử.

### Structure

```
mocks/
├── server.js       # Mock server entry
├── data/           # Mock data fixtures
│   └── users.json
└── handlers/       # Request handlers
    └── users.js
```

### Setup Options

#### Tùy chọn 1: Mock Service Worker (MSW)

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

#### Tùy chọn 2: JSON Server

```json
// db.json
{
  "users": [{ "id": "1", "name": "John", "email": "john@example.com" }]
}
```

```bash
npx json-server --watch db.json --port 3001
```

#### Tùy chọn 3: Prism (OpenAPI)

```bash
npx @stoplight/prism-cli mock openapi/main.yaml --port 3001
```

### Mock Data Guidelines

| Principle       | Description                     |
| --------------- | ------------------------------- |
| Dữ liệu thực tế | Sử dụng tên, email thực tế      |
| Edge case       | Bao gồm empty state, lỗi        |
| ID nhất quán    | Sử dụng ID dễ đoán cho kiểm thử |
| Timestamp       | Sử dụng ngày tương đối          |

### Mock Scenarios

| Scenario        | Activation        |
| --------------- | ----------------- |
| Thành công      | Response mặc định |
| Danh sách trống | `?scenario=empty` |
| Lỗi             | `?scenario=error` |
| Phản hồi chậm   | `?scenario=slow`  |

### Integration

#### Phát triển

```bash
# Start mock server
npm run mock:start
```

#### Kiểm thử

```bash
# Run tests with mocks
npm run test:integration
```
