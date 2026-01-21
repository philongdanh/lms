---
id: auth-api
title: Auth API Endpoints
sidebar_label: API
sidebar_position: 1
---

# Auth - API Endpoints
 
Các giao diện lập trình cho hệ thống xác thực và phân quyền.

---

## Base Information

- **Base URL**: `/api/v1/auth`
- **Version**: 1.0
- **Format**: JSON
- **Authentication**: Bearer Token (JWT)

---

## Endpoints Summary

| Method | Endpoint        | Description        | Auth Required | Rate Limit |
| ------ | --------------- | ------------------ | ------------- | ---------- |
| POST   | `/login`        | Đăng nhập          | ❌            | 10/min     |
| POST   | `/register`     | Đăng ký            | ❌            | 5/min      |
| POST   | `/refresh`      | Refresh Token      | ✅ (Refresh)  | 20/min     |
| POST   | `/logout`       | Đăng xuất          | ✅            | 50/min     |
| GET    | `/sessions`     | Danh sách sessions | ✅            | 100/min    |
| DELETE | `/sessions/:id` | Thu hồi session    | ✅            | 50/min     |
| POST   | `/parents/link` | Liên kết phụ huynh | ✅            | 10/min     |

---

## Endpoint Details

### Endpoint: POST `/login`

**Description**: Xác thực credentials người dùng

#### Yêu cầu

```http
POST /api/v1/auth/login
Content-Type: application/json
```

**Body**:

| Parameter | Type   | Required | Description      |
| --------- | ------ | -------- | ---------------- |
| email     | string | ✅       | Email người dùng |
| password  | string | ✅       | Mật khẩu raw     |

#### Phản hồi

**Success (200 OK)**:

```json
{
  "status": "success",
  "data": {
    "access_token": "ey...",
    "refresh_token": "ey...",
    "user": { "id": "uuid", "email": "test@example.com" }
  }
}
```

**Error Responses**:

| Code | Error               | Description       |
| ---- | ------------------- | ----------------- |
| 401  | INVALID_CREDENTIALS | Sai mật khẩu      |
| 429  | RATE_LIMITED        | Quá nhiều lần thử |

### Endpoint: POST `/refresh`

**Description**: Lấy access token mới

#### Yêu cầu

```http
POST /api/v1/auth/refresh
Content-Type: application/json
```

**Body**:

| Parameter     | Type   | Required | Description          |
| ------------- | ------ | -------- | -------------------- |
| refresh_token | string | ✅       | Refresh token hợp lệ |

#### Phản hồi

**Success (200 OK)**:

```json
{
  "status": "success",
  "data": {
    "access_token": "ey...",
    "refresh_token": "ey..."
  }
}
```

---

## Test Cases

| Test Case       | Description   | Request     | Expected Response |
| --------------- | ------------- | ----------- | ----------------- |
| TC-API-AUTH-001 | Login Valid   | Valid creds | 200 + tokens      |
| TC-API-AUTH-002 | Login Invalid | Wrong pass  | 401               |
| TC-API-AUTH-003 | Refresh Valid | Valid token | 200 + new tokens  |

---

## Performance Requirements

- **Response Time**: P95 < 200ms
- **Availability**: 99.9%
- **Timeout**: 5 seconds

---

## Security Requirements

- [x] Yêu cầu authentication
- [x] Input validation (Email format)
- [x] Rate limiting theo IP
- [x] Secure Headers

---

## Validation Checklist

- [x] Tất cả endpoints đã document
- [x] Có request/response examples
- [x] Error codes đã định nghĩa
- [x] Performance requirements đã chỉ định

---

## References

- [Overview](/specs)
