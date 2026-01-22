# Admin Module Specification

# Admin & Tenant Management - Business Logic

Quy tắc nghiệp vụ quản trị và vận hành hệ thống.

## Dependencies

### Phụ thuộc nội bộ

- ✅ Auth Module - Quản lý User/Đăng nhập.
- ✅ Analytics Module - Tổng hợp dữ liệu khi xóa Tenant.

### Phụ thuộc bên ngoài

- ✅ Email Service (SendGrid) - Gửi email kích hoạt.

## Validation Criteria

- ✅ Kiểm tra tính duy nhất của Tenant Code hoạt động chính xác.
- ✅ Quy trình Soft Delete -> Hard Delete chạy đúng.
- ✅ Import CSV báo cáo chính xác các dòng lỗi.
- ✅ Audit log cho Impersonation đầy đủ.

# Workflows

## Workflow Details

### WF-ADMIN-001: Create Tenant

**Description**: Quy trình khởi tạo một Tenant mới.

#### Flow Diagram

````d2
```d2
shape: sequence_diagram

RootAdmin
API
TenantService
DB
Email

RootAdmin -> API: POST /admin/tenants
API -> TenantService: Create tenant
TenantService -> DB: Check Unique Code
TenantService -> DB: Insert Tenant
TenantService -> DB: Create tenant-admin user
TenantService -> Email: Send activation email
TenantService -> RootAdmin: Tenant created
````

### WF-ADMIN-002: Import Users

**Description**: Quy trình import user hàng loạt.

#### Flow Diagram

````d2
```d2
direction: down

Upload: Upload CSV
Parse: Parse File
Validate: Validate Rows
Valid: All Valid? {
  shape: diamond
}
Insert: Batch Insert
Report: Generate Error Report
Email: Send Welcome Emails
Success: Return Success Report
Partial: Return Error Report

Upload -> Parse
Parse -> Validate
Validate -> Valid
Valid -> Insert: Yes
Valid -> Report: No
Insert -> Email
Email -> Success
Report -> Partial
````

#### Steps

| Step | Description      | Actor  | System Action                   | Exit Condition |
| ---- | ---------------- | ------ | ------------------------------- | -------------- |
| 1    | Tải lên CSV      | Admin  | Xác thực định dạng              | CSV hợp lệ     |
| 2    | Xác thực dữ liệu | System | Kiểm tra Email, Trường bắt buộc | -              |
| 3    | Batch Insert     | System | DB Transaction Insert           | Users đã tạo   |
| 4    | Thông báo        | System | Async Email Queue               | -              |

## Error Handling

| Error Scenario                | Detection     | Recovery Action          | Escalation |
| ----------------------------- | ------------- | ------------------------ | ---------- |
| Email trùng lặp trong Import  | DB Constraint | Bỏ qua dòng, ghi log lỗi | -          |
| Email Service không hoạt động | Timeout       | Thử lại sau (Job)        | -          |

## Security Requirements

- ✅ Chỉ Root Admin mới có thể kích hoạt các workflow Tenant.
- ✅ Tenant Admin chỉ có thể import user vào tenant của mình.

## References

- [Overview](/specs)

---

# API Endpoints

Các giao diện quản trị hệ thống và cấu hình đa thực thể.

## Endpoints Summary

| Method | Endpoint                 | Description         | Auth Required | Rate Limit |
| ------ | ------------------------ | ------------------- | ------------- | ---------- |
| POST   | `/tenants`               | Tạo tenant mới      | ✅ Root Admin | 10/min     |
| GET    | `/tenants`               | Danh sách tenants   | ✅ Root Admin | 100/min    |
| PUT    | `/tenants/:id`           | Cập nhật tenant     | ✅ Root Admin | 50/min     |
| DELETE | `/tenants/:id`           | Xóa tenant (soft)   | ✅ Root Admin | 10/min     |
| POST   | `/users/import`          | Import users từ CSV | ✅ Admin      | 5/min      |
| POST   | `/users/:id/impersonate` | Đăng nhập thay user | ✅ Admin      | 10/min     |

---

# Data Model

Cấu trúc dữ liệu quản lý thực thể và thiết lập hệ thống.

config: themeVariables: fontFamily: "EB Garamond"

## References

-
-
-

---

# Test Cases

Kịch bản kiểm thử quy trình quản trị và thiết lập.

## Test Categories

### 1. Kiểm thử chức năng

#### Business Logic

| Test ID        | Description           | Rules        | Expected Result               | Priority |
| -------------- | --------------------- | ------------ | ----------------------------- | -------- |
| TC-ADM-FUN-001 | Tạo Tenant            | BR-ADMIN-001 | Thành công nếu mã là duy nhất | P0       |
| TC-ADM-FUN-002 | Mã Tenant trùng lặp   | BR-ADMIN-001 | Lỗi "Code Exists"             | P1       |
| TC-ADM-FUN-003 | Giới hạn Import Users | BR-ADMIN-004 | Lỗi nếu > 500 dòng            | P1       |

### 2. Kiểm thử tích hợp

| Test ID        | Description          | Components   | Result          |
| -------------- | -------------------- | ------------ | --------------- |
| TC-ADM-INT-001 | Tạo Tenant gửi email | Admin, Email | Email nhận được |

### 4. Kiểm thử bảo mật

| Test ID        | Aspect                            | Method        | Result        |
| -------------- | --------------------------------- | ------------- | ------------- |
| TC-ADM-SEC-001 | Tenant Admin không thể tạo Tenant | POST /tenants | 403 Forbidden |

# Performance Requirements

## Performance Targets

### Thời gian phản hồi

| Operation          | P50   | P95   | P99   | Max | Measurement    |
| ------------------ | ----- | ----- | ----- | --- | -------------- |
| Create Tenant      | 500ms | 1s    | 2s    | 5s  | API End-to-end |
| Import Users (500) | 2s    | 5s    | 8s    | 15s | Job Duration   |
| List Tenants       | 50ms  | 100ms | 300ms | 1s  | DB Query       |

### Yêu cầu thông lượng

| Scenario         | Requests/sec | Concurrent Users | Data Volume |
| ---------------- | ------------ | ---------------- | ----------- |
| Admin Operations | 50           | 20 (Root Admins) | Thấp        |

## Resource Utilization Limits

| Resource          | Warning Threshold | Critical Threshold | Required Action  |
| ----------------- | ----------------- | ------------------ | ---------------- |
| CSV Parser Memory | 500MB             | 1GB                | Từ chối file lớn |

## Validation Checklist

- ✅ Xác minh việc thực thi giới hạn kích thước file tối đa

---
