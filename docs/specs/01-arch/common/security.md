---
id: security
title: Security
sidebar_label: Security
sidebar_position: 2
---

# Security Policy

Tiêu chuẩn bảo mật, kiểm soát truy cập và xác thực.

---

## RBAC Model

### Tổng quan kiến trúc

```d2
direction: right

Authentication_Layer: Authentication Layer {
  JWT: JWT Token
  Refresh: Refresh Token (Hashed)
  Blacklist: Token Blacklist (Redis)
}

Authorization_Layer: Authorization Layer {
  Role: Role
  Permission: Permission
  RolePermission: RolePermission
}

Data_Layer: Data Layer {
  User: User
  UserRole: UserRole
  Tenant: Tenant
}

Data_Layer.User -> Data_Layer.UserRole
Data_Layer.UserRole -> Authorization_Layer.Role
Authorization_Layer.Role -> Authorization_Layer.RolePermission
Authorization_Layer.RolePermission -> Authorization_Layer.Permission

Authentication_Layer.JWT -> Data_Layer.User
Authentication_Layer.Refresh -> Authentication_Layer.Blacklist
Data_Layer.User -> Data_Layer.Tenant
```

### Các thành phần chính

| Component            | Description                                         | Storage Location       |
| -------------------- | --------------------------------------------------- | ---------------------- |
| **User**             | Tài khoản người dùng, không lưu trực tiếp loại user | PostgreSQL             |
| **Role**             | Vai trò với name, color, description                | PostgreSQL (Seed data) |
| **Permission**       | Permission cụ thể theo module và action             | PostgreSQL (Seed data) |
| **UserRole**         | Gán role cho user trong tenant                      | PostgreSQL             |
| **RolePermission**   | Gán permission cho role                             | PostgreSQL             |
| **JWT Access Token** | Token ngắn hạn (15-30 phút)                         | Client-side            |
| **Refresh Token**    | Token dài hạn, chỉ lưu hash                         | PostgreSQL (hashed)    |
| **Token Blacklist**  | Danh sách token đã thu hồi                          | Redis                  |

---

## Authentication Flow

### Luồng đăng nhập

```d2
direction: right

Client: Client
API: API
AuthService: AuthService
SessionService: SessionService
DB: Database
Redis: Redis Cache

Client -> API: POST /auth/login
API -> AuthService: Validate credentials
AuthService -> DB: Find user by email
DB -> AuthService: User record
AuthService -> DB: Get roles & permissions
DB -> AuthService: Roles & Permissions
AuthService -> SessionService: Check device limit
SessionService -> DB: Count sessions
SessionService -> DB: Revoke oldest (if needed)
SessionService -> Redis: Blacklist token
AuthService -> DB: Create UserSession
AuthService -> API: Return tokens
API -> Client: Login success
```

### Luồng Refresh Token

```d2
direction: right

Client: Client
API: API
AuthService: AuthService
Redis: Redis Cache
DB: Database

Client -> API: POST /auth/refresh
API -> AuthService: Validate refresh token
AuthService -> Redis: Check blacklist
Redis -> AuthService: Token status
AuthService -> DB: Find session
DB -> AuthService: Session record
AuthService -> DB: Rotate token
AuthService -> Client: New tokens (if valid)
AuthService -> Client: 401 Revoked (if blacklisted)
```

---

## Authorization Flow

### Luồng xác thực quyền

```d2
direction: right

A: Incoming Request
B: Extract JWT
C: Decode JWT Payload
D: "JWT Permissions Set\nPj = {p1, p2, p3, ...}"
E: "Endpoint Required Permissions\nPe = {pA, pB, pC, ...}"
F: Check Permission Intersection
G: "Is Pj ∩ Pe ≠ ∅?" {
  shape: diamond
}
H: Access Granted
I: "Access Denied\n403 Forbidden"
J: Check Tenant Scope
K: "Is tenant_id valid?" {
  shape: diamond
}
L: Process Request
M: Log Permission Denial

A -> B
B -> C
C -> D
A -> E
D -> F
E -> F
F -> G
G -> H: Yes
G -> I: No
H -> J
J -> K
K -> L: Yes
K -> I: No
I -> M
```

### Các cấp độ chi tiết quyền

Hệ thống hỗ trợ 3 mức độ chi tiết của permission:

| Level            | Pattern         | Example     | Use Case                        |
| ---------------- | --------------- | ----------- | ------------------------------- |
| **Module-level** | `module:*`      | `exam:*`    | Admin có full access cho module |
| **Action-level** | `module:action` | `exam:read` | Specific action trên module     |
| **Special**      | `admin:*`       | `admin:all` | Root admin bypass               |

### Pipeline xử lý yêu cầu

```d2
shape: sequence_diagram

Client
Nginx
AuthMiddleware
TenantGuard
PermissionGuard
Controller
Service

Client -> Nginx: Request with JWT
Nginx -> AuthMiddleware: Forward request
AuthMiddleware -> AuthMiddleware: Validate JWT signature
AuthMiddleware -> AuthMiddleware: Check token expiry
AuthMiddleware -> AuthMiddleware: Extract user & permissions
AuthMiddleware -> TenantGuard: Pass to tenant guard
TenantGuard -> TenantGuard: Validate tenant_id in request
TenantGuard -> TenantGuard: Check user belongs to tenant
TenantGuard -> PermissionGuard: Pass to permission guard
PermissionGuard -> PermissionGuard: Get required permissions for route
PermissionGuard -> PermissionGuard: Check intersection
PermissionGuard -> Controller: Forward to controller (if granted)
Controller -> Service: Business logic
Service -> Client: 200 OK (if granted)
PermissionGuard -> Client: 403 Forbidden (if denied)
```

---

## Security Policies

### Bảo mật Token

| Policy                    | Value                | Description                  |
| ------------------------- | -------------------- | ---------------------------- |
| **Access Token Expiry**   | 15-30 phút           | Giảm window of attack        |
| **Refresh Token Expiry**  | 7 ngày               | Cân bằng giữa UX và security |
| **Token Algorithm**       | HS256/RS256          | Signing algorithm            |
| **Refresh Token Storage** | Chỉ hash             | Không lưu plain text         |
| **Blacklist TTL**         | Token expiry + 1 giờ | Cleanup sau khi hết hạn      |

### Bảo mật phiên

| Policy                    | Value                     | Description                  |
| ------------------------- | ------------------------- | ---------------------------- |
| **Max Devices**           | 3 (cấu hình được)         | Giới hạn thiết bị concurrent |
| **Session Tracking**      | Device ID, IP, User Agent | Audit trail                  |
| **Remote Logout**         | Có hỗ trợ                 | Logout các thiết bị khác     |
| **Oldest Session Revoke** | Tự động                   | Khi vượt limit               |

### Bảo mật mật khẩu

| Policy             | Value    | Description                   |
| ------------------ | -------- | ----------------------------- |
| **Hash Algorithm** | bcrypt   | Industry standard             |
| **Salt Rounds**    | 12       | Cân bằng performance/security |
| **Min Length**     | 8 ký tự  | Yêu cầu tối thiểu             |
| **Complexity**     | Optional | Uppercase, number, special    |

### Xác thực 2 yếu tố (2FA)

| Áp dụng cho    | Method                      | Required |
| -------------- | --------------------------- | -------- |
| `root-admin`   | TOTP (Google Authenticator) | Có       |
| `tenant-admin` | TOTP (Google Authenticator) | Có       |
| Các roles khác | Optional                    | Không    |

---

## Multi-Tenant Security

### Quy tắc cô lập dữ liệu

1. **Query Filter**: Tất cả queries PHẢI include `tenant_id` (trừ system tables)
2. **Cross-Tenant Block**: Không cho phép access dữ liệu tenant khác
3. **API Validation**: Validate `tenant_id` trong request body/params
4. **Audit Log**: Log tất cả cross-tenant access bởi root-admin

### Ma trận phạm vi Tenant

| Role           | Tenant của mình  | Tenant khác        | System Data     |
| -------------- | ---------------- | ------------------ | --------------- |
| `root-admin`   | ✅ Full          | ✅ Via impersonate | ✅ Full         |
| `tenant-admin` | ✅ Full          | ❌ Blocked         | ❌ Không access |
| `teacher`      | ✅ Limited       | ❌ Blocked         | ❌ Không access |
| `parent`       | ✅ Limited       | ❌ Blocked         | ❌ Không access |
| `student`      | ✅ Dữ liệu riêng | ❌ Blocked         | ❌ Không access |

---

## Permission Change Process

```d2
direction: right

A: Permission Change Request
B: Requirement Analysis
C: Security Impact Assessment
D: Code Changes
E: Update Permission Definitions
F: Update Role Mappings
G: Update Route Decorators
H: Unit & Integration Testing
I: Security Review
J: Staging Deployment
K: Production Deployment
L: User Notification
M: Monitoring & Audit
N: Any Issues? {
  shape: diamond
}
O: Rollback
P: Change Complete

A -> B
B -> C
C -> D
D -> E
E -> F
F -> G
G -> H
H -> I
I -> J
J -> K
K -> L
L -> M
M -> N
N -> O: Yes
N -> P: No
O -> H
```

---

## Rate Limiting & Protection

### Cấu hình giới hạn tốc độ

| Endpoint                | Limit          | Window | Block Duration |
| ----------------------- | -------------- | ------ | -------------- |
| `/auth/login`           | 5 requests     | 1 phút | 5 phút         |
| `/auth/register`        | 3 requests     | 1 giờ  | 1 giờ          |
| `/auth/forgot-password` | 3 requests     | 1 giờ  | 1 giờ          |
| General API             | 100 requests   | 1 phút | 1 phút         |
| WebSocket connect       | 10 connections | 1 phút | 5 phút         |

### Các bảo vệ bổ sung

| Protection             | Implementation    | Purpose                       |
| ---------------------- | ----------------- | ----------------------------- |
| **CORS**               | Whitelist origins | Chống cross-site attacks      |
| **Helmet**             | Security headers  | XSS, clickjacking protection  |
| **Input Validation**   | Class-validator   | SQL injection, XSS prevention |
| **Request Size Limit** | 10MB              | DoS prevention                |

---

## Audit Logging

### Các sự kiện được log

| Event Category     | Events                                     | Retention |
| ------------------ | ------------------------------------------ | --------- |
| **Authentication** | Login, logout, failed login, token refresh | 1 năm     |
| **Authorization**  | Permission denied, impersonation           | 1 năm     |
| **Data Access**    | CRUD operations trên sensitive data        | 6 tháng   |
| **Admin Actions**  | Tenant management, user management         | 2 năm     |

### Định dạng Log

```json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "level": "info",
  "event": "auth.login.success",
  "userId": "uuid",
  "tenantId": "uuid",
  "ip": "192.168.1.1",
  "userAgent": "Mozilla/5.0...",
  "metadata": {
    "deviceId": "uuid",
    "loginMethod": "password"
  }
}
```

---

## References

- [Business Overview](/specs)
- [System Design](../design.md)
- [Data Model](../data.md)
- [Auth Module](@site/docs/specs/02-mods/auth/logic.md)

---

## JWT Token Specification

### Tổng quan

- **Standard**: RFC 7519 (JSON Web Token).
- **Role**: Authentication (Stateless) & Authorization.
- **Đặc điểm**: Compact, Secure (Signed), Scalable.

### Cấu trúc Token

Format: `Header.Payload.Signature`

#### Header

Algorithm: `HS256` (HMAC SHA-256).

#### Payload (Claims)

**Standard Claims**:

- `sub`: User UUID.
- `iss`: Issuer (e.g., `lms-auth`).
- `iat`, `exp`: Timestamp.

**Custom Claims (Context)**:

- `tenant_id`: School Context hiện tại.
- `role`: RBAC Role (e.g., `teacher`).
- `permissions`: String array (e.g., `["content:create"]`).
- `session_id`: Cho revocation/blacklist.

#### Signature

`HMACSHA256(base64(header) + "." + base64(payload), secret)`

### Chiến lược (Dual Token)

| Token       | TTL | Storage (Client) | Mục đích            |
| ----------- | --- | ---------------- | ------------------- |
| **Access**  | 15m | Memory           | API Auth            |
| **Refresh** | 7d  | HttpOnly Cookie  | Rotate Access Token |

**Rotation Policy**: New Access Token = New Refresh Token. Old Refresh Token
invalidated ngay (Reuse Detection).

### Quy trình xác thực

```d2
direction: right

Request
Auth_Header: Auth Header? {
  shape: diamond
}
Verify_Sig: Verify Signature
Check_Exp: Check Expiration {
  shape: diamond
}
Check_Blacklist: Check Blacklist {
  shape: diamond
}
Pass_User_Ctx: Pass User Context
Unauthorized_401: 401 Unauthorized
Expired_401: 401 Expired
Revoked_401: 401 Revoked

Request -> Auth_Header
Auth_Header -> Unauthorized_401: No
Auth_Header -> Verify_Sig: Yes
Verify_Sig -> Unauthorized_401: Invalid
Verify_Sig -> Check_Exp: Valid
Check_Exp -> Expired_401: Expired
Check_Exp -> Check_Blacklist: Valid
Check_Blacklist -> Revoked_401: Listed
Check_Blacklist -> Pass_User_Ctx: OK
```

### Các thực hành bảo mật tốt nhất

1.  **Storage**: Access Token trong Memory (No XSS). Refresh Token trong
    HttpOnly Cookie.
2.  **Revocation**: Redis Blacklist (key: `session_id`, ttl: `exp`).
3.  **Algorithm**: Enforce `HS256`, reject `none`.

### Mã lỗi

| Code                  | Status | Description     |
| --------------------- | ------ | --------------- |
| `AUTH_HEADER_MISSING` | 401    | Yêu cầu token   |
| `TOKEN_EXPIRED`       | 401    | Cần refresh     |
| `TOKEN_INVALID`       | 401    | Bad signature   |
| `SESSION_REVOKED`     | 401    | Session revoked |

### Tài liệu tham khảo

- [RFC 7519](https://tools.ietf.org/html/rfc7519)
- [Auth Logic](@site/docs/specs/02-mods/auth/logic.md)
- [Auth Data](@site/docs/specs/02-mods/auth/data.md)
