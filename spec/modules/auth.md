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

| Workflow            | Mô tả                                    | Actor    | Kết quả                        |
| ------------------- | ---------------------------------------- | -------- | ------------------------------ |
| School Registration | Đăng ký tenant mới cho trường học        | `Admin`  | `Tenant` được tạo và kích hoạt |
| User Registration   | Đăng ký người dùng mới (Student/Parent)  | `User`   | Account được tạo và verify     |
| Multi-Device Login  | Đăng nhập và kiểm soát thiết bị          | `User`   | Session được tạo               |
| Parent-Student Link | Liên kết tài khoản phụ huynh và học sinh | `Parent` | Accounts được liên kết         |
| Token Refresh       | Cấp lại access token                     | `System` | Token mới được cấp             |
| Logout & Revoke     | Đăng xuất và thu hồi session             | `User`   | Session bị hủy                 |

#### Detailed Flows

##### School Registration

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

##### User Registration

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
User -> "Auth Service": verify_otp(code)
"Auth Service" -> Database: update_user(verified)
"Auth Service" -> User: success
```

##### Multi-Device Login

```d2
shape: sequence_diagram
User
"Auth Service"
Database
Redis

User -> "Auth Service": login(credentials)
"Auth Service" -> Database: validate_user
Database -> "Auth Service": ok
"Auth Service" -> Redis: check_active_sessions(user_id)
Redis -> "Auth Service": session_count
"Auth Service" -> Database: create_session(device_info)
"Auth Service" -> User: return (access_token, refresh_token)
```

##### Parent-Student Link

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

##### Token Refresh

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

##### Logout & Revoke

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

### Rules & Constraints

- Audit logging cho tất cả sự kiện registration/login
- Input sanitization
- Rate limiting theo IP
- Maximum 3 devices per user
- JWT expiry: 15 phút, Refresh token: 7 ngày

### Lifecycle Sequence

```d2
shape: sequence_diagram

User
"Auth Service"
Database
"Email Service"
System
Notification
Admin
Queue
Scheduler

User -> "Auth Service": register()
"Auth Service" -> Database: create_user(status=PENDING)
"Auth Service" -> "Email Service": send_verification()

User -> "Auth Service": verify_email(token)
"Auth Service" -> Database: update(status=ACTIVE)

System -> "Auth Service": detect_violation()
"Auth Service" -> Database: update(status=SUSPENDED)
"Auth Service" -> Notification: notify_user()

Admin -> "Auth Service": resolve_violation()
"Auth Service" -> Database: update(status=ACTIVE)

User -> "Auth Service": request_delete()
"Auth Service" -> Database: update(status=PENDING_DEACTIVATION)
"Auth Service" -> Queue: schedule_hard_delete(30_days)

Scheduler -> "Auth Service": execute_hard_delete()
"Auth Service" -> Database: delete_user_data()
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

| Entity        | Fields chính                                  | Mô tả                |
| ------------- | --------------------------------------------- | -------------------- |
| `Tenant`      | `id`, `name`, `status`, `domain`              | Thông tin trường học |
| `User`        | `id`, `email`, `password_hash`, `tenant_id`   | Người dùng hệ thống  |
| `UserRole`    | `id`, `user_id`, `role`                       | Vai trò người dùng   |
| `UserSession` | `id`, `user_id`, `device_id`, `refresh_token` | Session đăng nhập    |

### Relations

| `Relation`             | Mô tả                              |
| ---------------------- | ---------------------------------- |
| `Tenant` → `User`      | `1:N` - Một tenant có nhiều users  |
| `User` → `UserRole`    | `1:N` - Một user có nhiều roles    |
| `User` → `UserSession` | `1:N` - Một user có nhiều sessions |

---

## API & Integration

### GraphQL Operations

| Type       | Operation       | Mô tả              | Auth | Rate Limit |
| ---------- | --------------- | ------------------ | ---- | ---------- |
| `Mutation` | `login`         | Đăng nhập          | ❌   | 10/min     |
| `Mutation` | `register`      | Đăng ký            | ❌   | 5/min      |
| `Mutation` | `refreshToken`  | Refresh Token      | ✅   | 20/min     |
| `Mutation` | `logout`        | Đăng xuất          | ✅   | 50/min     |
| `Query`    | `sessions`      | Danh sách sessions | ✅   | 100/min    |
| `Mutation` | `revokeSession` | Thu hồi session    | ✅   | 50/min     |
| `Mutation` | `linkParent`    | Liên kết phụ huynh | ✅   | 10/min     |

### Events & Webhooks

| Event             | Trigger                      | Payload                           |
| ----------------- | ---------------------------- | --------------------------------- |
| `user.registered` | Sau khi đăng ký thành công   | `{ userId, email, role }`         |
| `user.logged_in`  | Sau khi đăng nhập thành công | `{ userId, deviceId, sessionId }` |
| `user.logged_out` | Sau khi đăng xuất            | `{ userId, sessionId }`           |
| `session.revoked` | Khi session bị thu hồi       | `{ userId, sessionId }`           |

---

## Acceptance Criteria

### Functional Requirements

| ID           | Requirement             | Điều kiện                          |
| ------------ | ----------------------- | ---------------------------------- |
| `FR-AUTH-01` | Đăng ký email hợp lệ    | Email chưa tồn tại, format đúng    |
| `FR-AUTH-02` | Đăng nhập thành công    | Credentials đúng, account verified |
| `FR-AUTH-03` | Multi-device session    | Cả 2 sessions đều active           |
| `FR-AUTH-04` | Logout invalidate token | refreshToken bị revoke             |

### Edge Cases

| Case                | Xử lý                             |
| ------------------- | --------------------------------- |
| Email đã tồn tại    | Trả về lỗi `CONFLICT`             |
| Password sai        | Trả về lỗi `UNAUTHORIZED`         |
| Rate limit exceeded | Trả về `429 Too Many Requests`    |
| Redis down          | Fallback to DB (slow) + Alert Ops |
| Email service fail  | Retry 3x, then Queue + Alert Ops  |

---
