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

### School Registration

Đăng ký tenant mới cho trường học.

```d2
shape: sequence_diagram
Admin
"SaaS Platform"
Database
"Email Service"

Admin -> "SaaS Platform": register_tenant(school_info)
"SaaS Platform" -> Database: create_tenant(pending)
"SaaS Platform" -> "Email Service": send_activation_link()
"Email Service" -> Admin: activation_email
Admin -> "SaaS Platform": activate_tenant(token)
"SaaS Platform" -> Database: update_tenant(active)
"SaaS Platform" -> Admin: success
```

### User Registration

Đăng ký tài khoản mới (`US-001`).

```d2
shape: sequence_diagram
User
"Auth Service"
Database
"Email Service"

User -> "Auth Service": register(email, password)
"Auth Service" -> Database: check_email_exists
Database -> "Auth Service": not_found
"Auth Service" -> Database: create_user(pending)
"Auth Service" -> "Email Service": send_otp()
"Auth Service" -> User: show_otp_form
```

### OTP Verification

Xác thực mã OTP (`US-002`).

```d2
shape: sequence_diagram
User
"Auth Service"
Redis
Database

User -> "Auth Service": verify_otp(identifier, code)
"Auth Service" -> Redis: get_otp(identifier)
Redis -> "Auth Service": stored_otp
"Auth Service" -> "Auth Service": validate(code, stored_otp)
"Auth Service" -> Database: update_user(verified)
"Auth Service" -> Redis: delete_otp(identifier)
"Auth Service" -> User: success
```

**Quy tắc OTP:**

- 6 chữ số, TTL 60 giây
- Khóa tạm 15 phút sau 3 lần sai liên tiếp
- Cho phép gửi lại sau countdown

### Login

Đăng nhập và kiểm soát đa thiết bị (`US-003`).

```d2
shape: sequence_diagram
User
"Auth Service"
Database
Redis

User -> "Auth Service": login(email, password)
"Auth Service" -> Database: validate_credentials
Database -> "Auth Service": user_record
"Auth Service" -> Redis: check_active_sessions(user_id)
Redis -> "Auth Service": session_count
"Auth Service" -> Database: create_session(device_info)
"Auth Service" -> User: return (access_token, refresh_token)
```

### Forgot Password

Đặt lại mật khẩu qua email (`US-004`).

```d2
shape: sequence_diagram
User
"Auth Service"
Database
"Email Service"
Redis

User -> "Auth Service": request_reset(email)
"Auth Service" -> Database: find_user(email)
Database -> "Auth Service": user_record
"Auth Service" -> "Auth Service": generate_reset_token
"Auth Service" -> Redis: store_token(token, user_id, 15min)
"Auth Service" -> "Email Service": send_reset_link(token)
User -> "Auth Service": reset_password(token, new_password)
"Auth Service" -> Redis: validate_token(token)
"Auth Service" -> Database: update_password
"Auth Service" -> Database: revoke_all_sessions(user_id)
"Auth Service" -> User: success
```

### Logout

Đăng xuất an toàn (`US-005`).

```d2
shape: sequence_diagram
User
"Auth Service"
Redis
Database

User -> "Auth Service": logout(session_id)
"Auth Service" -> Redis: delete_session(session_id)
"Auth Service" -> Database: mark_session_revoked
"Auth Service" -> User: success
```

### Session Management

Quản lý phiên đăng nhập (`US-006`).

- Danh sách active sessions lưu trong Redis
- Cơ chế rotation Refresh Token
- Giới hạn tối đa 3 thiết bị đồng thời
- Admin có thể revoke session của user

### Protected Routes

Bảo vệ route cần xác thực (`US-007`).

```d2
shape: sequence_diagram
Client
"Auth Guard"
"Auth Service"
"Protected Route"

Client -> "Auth Guard": request + access_token
"Auth Guard" -> "Auth Service": validate_jwt(token)
"Auth Service" -> "Auth Guard": user_context + permissions
"Auth Guard" -> "Auth Guard": check_role_permission
"Auth Guard" -> "Protected Route": forward_request(user_context)
"Protected Route" -> Client: response
```

**Middleware:**

- Kiểm tra JWT hợp lệ mỗi request
- Redirect về Login nếu token thiếu/hết hạn
- Phân quyền access dựa trên Role

### Token Refresh

Làm mới access token khi hết hạn.

```d2
shape: sequence_diagram
Client
"Auth Service"
Database

Client -> "Auth Service": refresh_token(token)
"Auth Service" -> Database: validate_refresh_token
Database -> "Auth Service": valid
"Auth Service" -> "Auth Service": generate_new_access_token
"Auth Service" -> Client: new_access_token
```

### Parent-Student Link

Liên kết tài khoản phụ huynh với học sinh (`US-025`).

> [!NOTE] **Phase 2 Feature**: Sprint 7

```d2
shape: sequence_diagram
Parent
"Auth Service"
Database
"Email Service"
Student

Parent -> "Auth Service": link_student(student_email)
"Auth Service" -> Database: find_student
Database -> "Auth Service": student_record
"Auth Service" -> "Email Service": send_consent_request(student)
Student -> "Auth Service": approve_link(token)
"Auth Service" -> Database: create_relation(parent, student)
"Auth Service" -> Parent: notification_success
```

### User Lifecycle

Vòng đời trạng thái user từ đăng ký đến xóa.

```d2
direction: right

PENDING: {
  style.fill: "#fef3c7"
}
ACTIVE: {
  style.fill: "#d1fae5"
}
SUSPENDED: {
  style.fill: "#fee2e2"
}
PENDING_DEACTIVATION: {
  style.fill: "#fce7f3"
}
DELETED: {
  style.fill: "#e5e7eb"
  style.stroke-dash: 3
}

PENDING -> ACTIVE: verify_email()
ACTIVE -> SUSPENDED: detect_violation()
SUSPENDED -> ACTIVE: resolve_violation()
ACTIVE -> PENDING_DEACTIVATION: request_delete()
PENDING_DEACTIVATION -> DELETED: schedule_hard_delete(30 days)
```

**Triggers:**

- `PENDING` → `ACTIVE`: Xác thực email/OTP thành công
- `ACTIVE` → `SUSPENDED`: Admin/System phát hiện vi phạm
- `SUSPENDED` → `ACTIVE`: Admin giải quyết vi phạm
- `ACTIVE` → `PENDING_DEACTIVATION`: User yêu cầu xóa tài khoản
- `PENDING_DEACTIVATION` → `DELETED`: Scheduler thực thi sau 30 ngày

### Quy tắc & Ràng buộc

- Ghi log tất cả sự kiện đăng ký/đăng nhập
- Sanitize input đầu vào
- Rate limiting theo IP
- Tối đa 3 thiết bị/user
- JWT: 15 phút, Refresh token: 7 ngày

---

## API & Integration

### Sự kiện & Webhooks

| Sự kiện             | Kích hoạt                   | Payload                           |
| ------------------- | --------------------------- | --------------------------------- |
| `user.registered`   | Đăng ký thành công          | `{ userId, email, role }`         |
| `user.logged_in`    | Đăng nhập thành công        | `{ userId, deviceId, sessionId }` |
| `user.logged_out`   | Đăng xuất                   | `{ userId, sessionId }`           |
| `session.revoked`   | Session bị thu hồi          | `{ userId, sessionId }`           |
| `password.reset`    | Đặt lại mật khẩu            | `{ userId }`                      |
| `parent.link_child` | Liên kết phụ huynh-học sinh | `{ parentId, childId }`           |

---

## Acceptance Criteria

### Yêu cầu chức năng

| ID       | Yêu cầu             | Điều kiện                               |
| -------- | ------------------- | --------------------------------------- |
| `US-001` | Đăng ký email       | Email chưa tồn tại, định dạng hợp lệ    |
| `US-002` | Xác thực OTP        | 6 số, countdown 60s, khóa sau 3 lần sai |
| `US-003` | Đăng nhập           | Thông tin đúng, tài khoản đã xác thực   |
| `US-004` | Quên mật khẩu       | Token hợp lệ, vô hiệu session cũ        |
| `US-005` | Đăng xuất           | Thu hồi `refreshToken`                  |
| `US-006` | Session đa thiết bị | Max 3 devices, rotation token           |
| `US-007` | Protected Routes    | JWT valid, role-based access            |

### Edge Cases

| Trường hợp         | Xử lý                      |
| ------------------ | -------------------------- |
| Email đã tồn tại   | `409 CONFLICT`             |
| Sai mật khẩu       | `401 UNAUTHORIZED`         |
| OTP hết hạn        | `410 GONE`                 |
| OTP sai 3 lần      | `423 LOCKED` (15 phút)     |
| Vượt rate limit    | `429 TOO_MANY_REQUESTS`    |
| Redis down         | Fallback DB + Alert Ops    |
| Email service lỗi  | Retry 3 lần, Queue + Alert |
| Token không hợp lệ | `401 UNAUTHORIZED`         |
| Session đã thu hồi | `401 UNAUTHORIZED`         |

---
