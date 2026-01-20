---
id: realtime-api
title: Realtime API Endpoints
sidebar_label: API
sidebar_position: 2
---

# Real-time API Endpoints

---

## Overview

HTTP API hỗ trợ chức năng realtime (tương tác với Notification và Presence).

---

## Base Information

- **Base URL**: `/api/v1/realtime`
- **Version**: 1.0
- **Authentication**: Bearer Token

---

## Endpoints Summary

| Method | Endpoint                   | Description                             | Auth Required | Rate Limit |
| ------ | -------------------------- | --------------------------------------- | ------------- | ---------- |
| POST   | `/broadcast`               | Gửi tin nhắn broadcast (Internal/Admin) | ✅ (Admin)    | 100/min    |
| GET    | `/notifications`           | Lấy danh sách thông báo                 | ✅            | 60/min     |
| PUT    | `/notifications/{id}/read` | Đánh dấu đã đọc                         | ✅            | 60/min     |
| GET    | `/presence/{user_id}`      | Kiểm tra trạng thái online              | ✅            | 120/min    |

---

## Endpoint Details

### Endpoint: GET `/notifications`

**Description**: Lấy lịch sử thông báo của người dùng.

#### Request

```http
GET /api/v1/realtime/notifications?page=1&limit=20
Authorization: Bearer {token}
```

#### Response

**Success (200 OK)**:

```json
{
  "data": [
    {
      "id": "uuid",
      "title": "New Assignment",
      "body": "You have a Math assignment to complete",
      "read_at": null,
      "created_at": "2024-01-01T10:00:00Z"
    }
  ]
}
```

### Endpoint: POST `/broadcast`

**Description**: API nội bộ cho các service khác để kích hoạt thông báo
realtime.

#### Request

```http
POST /api/v1/realtime/broadcast
Authorization: Bearer {service-token}

{
  "channel": "user:uuid",
  "event": "notification",
  "data": {
    "title": "Welcome",
    "message": "Hello World"
  }
}
```

#### Response

**Success (200 OK)**:

```json
{
  "status": "queued",
  "receivers_count": 1
}
```

---

## Error Responses

| Code | Error                | Description           |
| ---- | -------------------- | --------------------- |
| 401  | `RT_UNAUTHORIZED`    | Token không hợp lệ    |
| 400  | `RT_INVALID_CHANNEL` | Channel không tồn tại |

---

## Performance Requirements

- **API Latency**: < 50ms.
- **Broadcast Propagation**: < 100ms đến Socket Server.

---

## Security Requirements

- [ ] Broadcast API được bảo vệ bởi Internal API Key hoặc chỉ Admin Role.

---

## Validation Checklist

- [ ] Đã xác minh bảo mật Internal API

---

## References

- [Overview](/specs)
