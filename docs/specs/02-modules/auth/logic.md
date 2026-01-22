---
id: logic
title: Business Logic
sidebar_label: Logic
sidebar_position: 2
---

# Auth - Business Logic
 
Quy tắc nghiệp vụ và quy trình xử lý xác thực.


## Dependencies

### Phụ thuộc nội bộ

- ✅ Tenant Service - Quản lý thông tin tenant
- ❌ Notification Service - Gửi OTP/Welcome email

### Phụ thuộc bên ngoài

- ✅ Redis - Caching session/tokens
- ✅ PostgreSQL - Lưu trữ bền vững


## Validation Criteria

- [ ] Tất cả use cases đã định nghĩa
- [ ] Business rules đầy đủ và chính xác
- [ ] Dependencies đã xác định
- [ ] KPIs có thể đo lường


# Workflows


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


## Error Handling

| Error Scenario     | Detection       | Recovery Action       | Escalation |
| ------------------ | --------------- | --------------------- | ---------- |
| Redis Down         | Connection Fail | Fallback to DB (slow) | Alert Ops  |
| Email Service Fail | Timeout         | Retry 3x, then Queue  | Alert Ops  |


## Security Requirements

- [x] Audit logging cho tất cả sự kiện registration/login
- [x] Input sanitization
- [x] Rate limiting

