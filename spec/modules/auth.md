---
id: auth
title: Auth
sidebar_label: Auth
sidebar_position: 1
---

# Auth

Module xác thực và phân quyền người dùng trong hệ thống multi-tenant.

---

## Business Logic

### Workflow chính

| Workflow | Mô tả | Actor | Kết quả |
| -------- | ----- | ----- | ------- |
| School Registration | Đăng ký tenant mới cho trường học | Admin | Tenant được tạo và kích hoạt |
| User Registration | Đăng ký người dùng mới (Student/Parent) | User | Account được tạo và verify |
| Multi-Device Login | Đăng nhập và kiểm soát thiết bị | User | Session được tạo |
| Parent-Student Link | Liên kết tài khoản phụ huynh và học sinh | Parent | Accounts được liên kết |
| Token Refresh | Cấp lại access token | System | Token mới được cấp |
| Logout & Revoke | Đăng xuất và thu hồi session | User | Session bị hủy |

### Rules & Constraints

- ✅ Audit logging cho tất cả sự kiện registration/login
- ✅ Input sanitization
- ✅ Rate limiting theo IP
- ✅ Maximum 3 devices per user
- ✅ JWT expiry: 15 phút, Refresh token: 7 ngày

### State Machine

```d2
direction: right
[*] --> PENDING
PENDING --> ACTIVE : verify_email
ACTIVE --> SUSPENDED : violation
SUSPENDED --> ACTIVE : resolve
ACTIVE --> PENDING_DEACTIVATION : request_delete
PENDING_DEACTIVATION --> [*] : hard_delete_30d
```

---

## Data Model

### Schema & Entities

```d2
direction: right
Tenant -> User: has
User -> UserRole: has
User -> UserSession: has
```

| Entity | Fields chính | Mô tả |
| ------ | ------------ | ----- |
| Tenant | id, name, status, domain | Thông tin trường học |
| User | id, email, password_hash, tenant_id | Người dùng hệ thống |
| UserRole | id, user_id, role | Vai trò người dùng |
| UserSession | id, user_id, device_id, refresh_token | Session đăng nhập |

### Relations

| Relation | Mô tả |
| -------- | ----- |
| Tenant → User | 1:N - Một tenant có nhiều users |
| User → UserRole | 1:N - Một user có nhiều roles |
| User → UserSession | 1:N - Một user có nhiều sessions |

---

## API & Integration

### Endpoints

| Method | Endpoint | Mô tả | Auth | Rate Limit |
| ------ | -------- | ----- | ---- | ---------- |
| POST | `/login` | Đăng nhập | ❌ | 10/min |
| POST | `/register` | Đăng ký | ❌ | 5/min |
| POST | `/refresh` | Refresh Token | ✅ | 20/min |
| POST | `/logout` | Đăng xuất | ✅ | 50/min |
| GET | `/sessions` | Danh sách sessions | ✅ | 100/min |
| DELETE | `/sessions/:id` | Thu hồi session | ✅ | 50/min |
| POST | `/parents/link` | Liên kết phụ huynh | ✅ | 10/min |

### Events & Webhooks

| Event | Trigger | Payload |
| ----- | ------- | ------- |
| `user.registered` | Sau khi đăng ký thành công | `{ userId, email, role }` |
| `user.logged_in` | Sau khi đăng nhập thành công | `{ userId, deviceId, sessionId }` |
| `user.logged_out` | Sau khi đăng xuất | `{ userId, sessionId }` |
| `session.revoked` | Khi session bị thu hồi | `{ userId, sessionId }` |

---

## Acceptance Criteria

### Functional Requirements

| ID | Requirement | Điều kiện |
| -- | ----------- | --------- |
| FR-AUTH-01 | Đăng ký email hợp lệ | Email chưa tồn tại, format đúng |
| FR-AUTH-02 | Đăng nhập thành công | Credentials đúng, account verified |
| FR-AUTH-03 | Multi-device session | Cả 2 sessions đều active |
| FR-AUTH-04 | Logout invalidate token | refreshToken bị revoke |

### Edge Cases

| Case | Xử lý |
| ---- | ----- |
| Email đã tồn tại | Trả về lỗi CONFLICT |
| Password sai | Trả về lỗi UNAUTHORIZED |
| Rate limit exceeded | Trả về 429 Too Many Requests |
| Redis down | Fallback to DB (slow) + Alert Ops |
| Email service fail | Retry 3x, then Queue + Alert Ops |

---
