---
id: contracts
title: API Contracts
sidebar_label: Contracts
---

# API Contracts

Consumer-driven contracts để kiểm thử API.

## Overview

API contracts định nghĩa hành vi mong đợi giữa các services (consumers và providers) sử dụng công cụ như Pact.

## Structure

```
contracts/
├── README.md           # File này
├── consumer-*.json     # Consumer contracts
└── provider-*.json     # Kết quả provider verification
```

## Contract Template

### Pact Contract Example

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

## Workflow

### Consumer Side

1. Viết consumer tests để tạo contracts
2. Publish contracts lên Pact Broker
3. Chạy trên mỗi consumer PR

### Provider Side

1. Pull contracts từ Pact Broker
2. Verify provider với contracts
3. Chạy trên mỗi provider PR

## Guidelines

| Hướng dẫn | Mô tả |
|-----------|-------|
| Giữ contracts tối thiểu | Chỉ bao gồm các trường bắt buộc |
| Sử dụng provider states | Thiết lập test data |
| Quản lý phiên bản | Theo dõi breaking changes |
| Tự động hóa verification | Tích hợp CI/CD |

## Tools

| Tool | Mục đích |
|------|----------|
| Pact | Contract testing framework |
| Pact Broker | Lưu trữ contracts |
| can-i-deploy | Kiểm tra deployment an toàn |

## References

- [OpenAPI](../openapi/README.md)
- [Mocks](../mocks/README.md)
- [API Gateway](/specs/cross-cutting/api-gateway)
