---
id: gateway
title: API Gateway
sidebar_label: Gateway
sidebar_position: 1
---

# API Gateway

Tiêu chuẩn thiết kế và quản lý API tập trung.

---

## Standards

### URL Structure

```
https://api.example.com/api/{version}/{module}/{resource}/{id}
```

### HTTP Methods

| Method | Purpose           | Idempotent | Safe |
| ------ | ----------------- | ---------- | ---- |
| GET    | Lấy resource      | ✅         | ✅   |
| POST   | Tạo resource      | ❌         | ❌   |
| PUT    | Cập nhật/thay thế | ✅         | ❌   |
| PATCH  | Cập nhật một phần | ❌         | ❌   |
| DELETE | Xóa resource      | ✅         | ❌   |

### Headers

```http
Authorization: Bearer {token}
Content-Type: application/json
Accept: application/json
X-Request-ID: {uuid}
```

---

## Response Format

### Success

```json
{
  "status": "success",
  "data": {},
  "meta": { "timestamp": "...", "request_id": "..." }
}
```

### Error

```json
{
  "status": "error",
  "error": { "code": "ERROR_CODE", "message": "...", "details": {} },
  "meta": { "timestamp": "...", "request_id": "..." }
}
```

---

## Performance

| Percentile | Max Response Time |
| ---------- | ----------------- |
| P50        | 100ms             |
| P95        | 500ms             |
| P99        | 1000ms            |

### Rate Limits

| Tier     | Requests/min | Burst |
| -------- | ------------ | ----- |
| Standard | 100          | 200   |
| Premium  | 1000         | 2000  |

---

## Versioning

- **URL Versioning**: `/api/v1/`
- **Deprecation**: 6 months notice
- **Sunset**: 12 months after deprecation

---

## Core Endpoints

| Endpoint          | Method | Description       | Auth     |
| ----------------- | ------ | ----------------- | -------- |
| `/graphql`        | `POST` | `GraphQL` API     | Optional |
| `/api/upload`     | `POST` | File upload       | Required |
| `/api/webhooks/*` | `POST` | External webhooks | API Key  |
| `/health`         | `GET`  | Health check      | No       |
