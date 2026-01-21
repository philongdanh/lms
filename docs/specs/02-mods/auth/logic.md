---
id: auth-logic
title: Auth Business Logic
sidebar_label: Logic
sidebar_position: 2
---

# Auth - Business Logic

Chi tiết quy tắc nghiệp vụ, workflows và xử lý lỗi cho module Auth.

---

## Business Rules

| Rule ID     | Name          | Description                            | Condition       | Action          | Exception    |
| ----------- | ------------- | -------------------------------------- | --------------- | --------------- | ------------ |
| BR-AUTH-001 | Tenant Scope  | Email unique theo tenant_id            | Register/Update | Validate unique | Return Error |
| BR-AUTH-002 | Lifecycle     | User/Tenant chỉ soft delete            | Delete          | Mark deleted_at | N/A          |
| BR-AUTH-003 | Token Policy  | Access (15m), Refresh (7d)             | Login/Refresh   | Issue tokens    | N/A          |
| BR-AUTH-004 | Session Limit | 5 (Student/Parent), 10 (Admin/Teacher) | Login           | Revoke oldest   | N/A          |
| BR-AUTH-005 | Session TTL   | Auto-expire sau 7 ngày idle            | Cron/Check      | Revoke          | N/A          |
| BR-AUTH-006 | Tenant Status | Chỉ tenant ACTIVE được login           | Login           | Check status    | Block login  |

---

## Dependencies

### Phụ thuộc nội bộ

- ✅ Tenant Service - Quản lý thông tin tenant
- ❌ Notification Service - Gửi OTP/Welcome email

### Phụ thuộc bên ngoài

- ✅ Redis - Caching session/tokens
- ✅ PostgreSQL - Lưu trữ bền vững

---

## KPIs & Metrics

| Metric              | Target         | Measurement | Frequency |
| ------------------- | -------------- | ----------- | --------- |
| Login Latency       | < 200ms        | APM         | Realtime  |
| Token Refresh       | < 100ms        | APM         | Realtime  |
| Concurrent Sessions | Limit enforced | DB Count    | Per login |

---

## Validation Criteria

- [ ] Tất cả use cases đã định nghĩa
- [ ] Business rules đầy đủ và chính xác
- [ ] Dependencies đã xác định
- [ ] KPIs có thể đo lường

---

## Review & Approval

| Role              | Name | Date | Status |
| ----------------- | ---- | ---- | ------ |
| **Product Owner** |      |      |        |
| **Tech Lead**     |      |      |        |
| **QA Lead**       |      |      |        |

---

# Workflows

---

## Workflow Summary

| Workflow ID | Name                | Trigger      | Actors          | Status |
| ----------- | ------------------- | ------------ | --------------- | ------ |
| WF-AUTH-001 | School Registration | Admin Access | Sch-Admin       | Active |
| WF-AUTH-002 | User Registration   | User Access  | User            | Active |
| WF-AUTH-003 | Multi-Device Login  | Login        | User            | Active |
| WF-AUTH-004 | Parent-Student Link | User Request | Parent, Student | Active |
| WF-AUTH-005 | Token Refresh       | Token Expire | System          | Active |
| WF-AUTH-006 | Logout & Revoke     | User Action  | User            | Active |

---

## Workflow Details

### WF-AUTH-001: School Registration

**Description**: Quy trình đăng ký tenant mới cho trường học.

#### Flow Diagram

#### Steps

| Step | Description   | Actor  | System Action        | Exit Condition |
| ---- | ------------- | ------ | -------------------- | -------------- |
| 1    | Submit Info   | Admin  | Validate Data        | Valid Data     |
| 2    | Create Tenant | System | Insert DB (PENDING)  | Success        |
| 3    | Verify Email  | System | Send OTP             | Email Verified |
| 4    | Activate      | System | Update Status ACTIVE | Active         |

### WF-AUTH-002: User Registration

**Description**: Đăng ký người dùng mới (Student/Parent).

#### Flow Diagram

### WF-AUTH-003: Multi-Device Login

**Description**: Đăng nhập và kiểm soát thiết bị.

#### Flow Diagram

### WF-AUTH-004: Parent-Student Link

**Description**: Liên kết tài khoản phụ huynh và học sinh.

#### Flow Diagram

### WF-AUTH-005: Token Refresh

**Description**: Cấp lại access token.

#### Flow Diagram

### WF-AUTH-006: Logout & Revoke

**Description**: Đăng xuất và thu hồi session.

#### Flow Diagram

---

## Events

### Sự kiện hệ thống

| Event Name             | Description            | Payload                       | Emitted By     |
| ---------------------- | ---------------------- | ----------------------------- | -------------- |
| `auth.user.registered` | Người dùng mới đăng ký | `{user_id, email, tenant_id}` | AuthService    |
| `auth.login.success`   | Đăng nhập thành công   | `{user_id, device_id}`        | AuthService    |
| `auth.session.revoked` | Session bị thu hồi     | `{session_id, reason}`        | SessionService |

---

## Error Handling

| Error Scenario     | Detection       | Recovery Action       | Escalation |
| ------------------ | --------------- | --------------------- | ---------- |
| Redis Down         | Connection Fail | Fallback to DB (slow) | Alert Ops  |
| Email Service Fail | Timeout         | Retry 3x, then Queue  | Alert Ops  |

---

## Performance Requirements

- **Thời gian xử lý**: < 500ms cho complex auth flows
- **Concurrent Users**: Hỗ trợ 5000 concurrent logins

---

## Security Requirements

- [x] Audit logging cho tất cả sự kiện registration/login
- [x] Input sanitization
- [x] Rate limiting

---

## References

- [Overview](/specs)
