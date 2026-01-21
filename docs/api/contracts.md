---
id: contracts
title: API Contracts
sidebar_label: Contracts
sidebar_position: 2
---

# API Contracts

Hợp đồng API (Consumer-driven contracts) phục vụ việc kiểm thử API.

---

## Structure

```
contracts/
├── consumer-*.json     # Consumer contracts
└── provider-*.json     # Provider verification results
```

---

## Contract Template

### Ví dụ Pact Contract

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

---

## Workflow

### Phía Consumer

1. Viết consumer test để tạo contract
2. Publish contract lên Pact Broker
3. Chạy trên mỗi PR của consumer

### Phía Provider

1. Lấy contract từ Pact Broker
2. Xác thực provider dựa trên contract
3. Chạy trên mỗi PR của provider

---

## Guidelines

| Nguyên tắc             | Mô tả                         |
| ---------------------- | ----------------------------- |
| Giữ contract tối giản  | Chì bao gồm các field cần thiết |
| Sử dụng provider state | Thiết lập dữ liệu kiểm thử    |
| Quản lý phiên bản      | Theo dõi các breaking change  |
| Tự động hóa xác thực   | Tích hợp với CI/CD            |

---

## Tools

| Công cụ      | Mục đích                      |
| ------------ | ----------------------------- |
| Pact         | Framework kiểm thử contract   |
| Pact Broker  | Lưu trữ contract              |
| can-i-deploy | Xác thực triển khai an toàn   |

---

## References

- [OpenAPI](./openapi.md)
- [Mocks](./mocks.md)
- [API Gateway](../specs/01-architecture/cross-cutting/api-gateway.md)

