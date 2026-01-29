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

Đăng ký tài khoản mới cho `Student` hoặc `Parent`.

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

### Multi-Device Login

Đăng nhập và kiểm soát thiết bị.

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

### Parent-Student Link

Liên kết tài khoản phụ huynh với học sinh.

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

### Logout & Revoke

Đăng xuất và thu hồi session.

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

### Quy tắc & Ràng buộc

- Ghi log tất cả sự kiện đăng ký/đăng nhập
- Sanitize input đầu vào
- Rate limiting theo IP
- Tối đa 3 thiết bị mỗi user
- JWT hết hạn: 15 phút, Refresh token: 7 ngày

### Lifecycle Sequence

Vòng đời trạng thái user từ đăng ký đến xóa.

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

> **SSoT**: [Database Blueprint](../../blueprint/architecture/database.md)

---

## API & Integration

### Các thao tác GraphQL

> **SSoT**: [schema.graphql](../api/graphql/auth/schema.graphql) |
> [operations.graphql](../api/graphql/auth/operations.graphql)

```graphql
type Query {
  """
  Danh sách session đang hoạt động
  """
  sessions: [Session!]! @auth @rateLimit(limit: 100, window: "1m")
}

type Mutation {
  """
  Đăng nhập - không cần auth
  """
  login(input: LoginInput!): AuthPayload! @rateLimit(limit: 10, window: "1m")

  """
  Đăng ký tài khoản mới
  """
  register(input: RegisterInput!): Boolean! @rateLimit(limit: 5, window: "1m")

  """
  Xác thực tài khoản bằng OTP Email
  """
  verifyAccount(input: VerifyAccountInput!): AuthPayload!
    @rateLimit(limit: 5, window: "1m")

  """
  Làm mới access token
  """
  refreshToken(token: String!): AuthPayload!
    @auth
    @rateLimit(limit: 20, window: "1m")

  """
  Đăng xuất
  """
  logout: Boolean! @auth @rateLimit(limit: 50, window: "1m")

  """
  Thu hồi session cụ thể
  """
  revokeSession(id: ID!): Boolean! @auth @rateLimit(limit: 50, window: "1m")

  """
  Liên kết tài khoản phụ huynh với học sinh
  """
  linkParent(studentEmail: String!): Boolean!
    @auth
    @rateLimit(limit: 10, window: "1m")
}

input LoginInput {
  email: String!
  password: String!
  deviceInfo: DeviceInfoInput
}

input RegisterInput {
  email: String!
  password: String!
  role: Role!
}

input VerifyAccountInput {
  email: String!
  code: String!
  deviceInfo: DeviceInfoInput
}

type AuthPayload {
  accessToken: String!
  refreshToken: String!
  user: User!
}
```

### Sự kiện & Webhooks

| Sự kiện           | Kích hoạt                    | Payload                           |
| ----------------- | ---------------------------- | --------------------------------- |
| `user.registered` | Sau khi đăng ký thành công   | `{ userId, email, role }`         |
| `user.logged_in`  | Sau khi đăng nhập thành công | `{ userId, deviceId, sessionId }` |
| `user.logged_out` | Sau khi đăng xuất            | `{ userId, sessionId }`           |
| `session.revoked` | Khi session bị thu hồi       | `{ userId, sessionId }`           |

---

## Acceptance Criteria

### Yêu cầu chức năng

| ID        | Yêu cầu                  | Điều kiện                             |
| --------- | ------------------------ | ------------------------------------- |
| `LMS-001` | Đăng ký email hợp lệ     | Email chưa tồn tại, định dạng đúng    |
| `LMS-004` | Đăng nhập thành công     | Thông tin đúng, tài khoản đã xác thực |
| `LMS-007` | Session đa thiết bị      | Cả hai session đều active             |
| `LMS-006` | Logout vô hiệu hóa token | `refreshToken` bị thu hồi             |

### Các Edge Cases

| Trường hợp                | Xử lý                                     |
| ------------------------- | ----------------------------------------- |
| Email đã tồn tại          | Trả về lỗi `409 CONFLICT`                 |
| Sai mật khẩu              | Trả về lỗi `401 UNAUTHORIZED`             |
| Vượt quá rate limit       | Trả về `429 TOO_MANY_REQUESTS`            |
| **Redis** không hoạt động | Fallback sang DB (chậm hơn) + Alert Ops   |
| Email service lỗi         | Retry 3 lần, sau đó đưa vào Queue + Alert |

---
