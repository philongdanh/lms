---
id: auth
title: Auth
sidebar_label: Auth
sidebar_position: 1
---

# Auth

Authentication and authorization module for users in multi-tenant system.

---

## Business Logic

### Workflow chính

| Workflow            | Description                                | Actor    | Result                         |
| ------------------- | ------------------------------------------ | -------- | ------------------------------ |
| School Registration | Register new tenant for school             | `Admin`  | `Tenant` created and activated |
| User Registration   | Register new user (`Student`/`Parent`)     | `User`   | Account created and verified   |
| Multi-Device Login  | Login and device control                   | `User`   | Session created                |
| Parent-Student Link | Link parent and student accounts           | `Parent` | Accounts linked                |
| Token Refresh       | Issue new access token                     | `System` | New token issued               |
| Logout & Revoke     | Logout and revoke session                  | `User`   | Session revoked                |

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

- Audit logging for all registration/login events
- Input sanitization
- Rate limiting by IP
- Maximum 3 devices per user
- JWT expiry: 15 minutes, Refresh token: 7 days

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

| Entity        | Fields chính                                  | Description          |
| ------------- | --------------------------------------------- | -------------------- |
| `Tenant`      | `id`, `name`, `status`, `domain`              | School information   |
| `User`        | `id`, `email`, `password_hash`, `tenant_id`   | System user          |
| `UserRole`    | `id`, `user_id`, `role`                       | User role            |
| `UserSession` | `id`, `user_id`, `device_id`, `refresh_token` | Login session        |

### Relations

| `Relation`             | Description                        |
| ---------------------- | ---------------------------------- |
| `Tenant` → `User`      | `1:N` - One tenant has many users  |
| `User` → `UserRole`    | `1:N` - One user has many roles    |
| `User` → `UserSession` | `1:N` - One user has many sessions |

---

## API & Integration

### GraphQL Operations

| Type       | Operation       | Description        | Auth | Rate Limit |
| ---------- | --------------- | ------------------ | ---- | ---------- |
| `Mutation` | `login`         | Login              | ❌   | 10/min     |
| `Mutation` | `register`      | Register           | ❌   | 5/min      |
| `Mutation` | `refreshToken`  | Refresh Token      | ✅   | 20/min     |
| `Mutation` | `logout`        | Logout             | ✅   | 50/min     |
| `Query`    | `sessions`      | List sessions      | ✅   | 100/min    |
| `Mutation` | `revokeSession` | Revoke session     | ✅   | 50/min     |
| `Mutation` | `linkParent`    | Link parent        | ✅   | 10/min     |

### Events & Webhooks

| Event             | Trigger                  | Payload                           |
| ----------------- | ------------------------ | --------------------------------- |
| `user.registered` | After successful signup  | `{ userId, email, role }`         |
| `user.logged_in`  | After successful login   | `{ userId, deviceId, sessionId }` |
| `user.logged_out` | After logout             | `{ userId, sessionId }`           |
| `session.revoked` | When session is revoked  | `{ userId, sessionId }`           |

---

## Acceptance Criteria

### Functional Requirements

| ID           | Requirement             | Condition                          |
| ------------ | ----------------------- | ---------------------------------- |
| `FR-AUTH-01` | Valid email registration | Email doesn't exist, correct format |
| `FR-AUTH-02` | Successful login        | Correct credentials, verified account |
| `FR-AUTH-03` | Multi-device session    | Both sessions are active           |
| `FR-AUTH-04` | Logout invalidate token | `refreshToken` is revoked          |

### Edge Cases

| Case                | Handling                          |
| ------------------- | --------------------------------- |
| Email already exists | Return `CONFLICT` error          |
| Wrong password      | Return `UNAUTHORIZED` error       |
| Rate limit exceeded | Return `429 Too Many Requests`    |
| Redis down          | Fallback to DB (slow) + Alert Ops |
| Email service fail  | Retry 3x, then Queue + Alert Ops  |

---
