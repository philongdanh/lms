---
id: logic
title: Business Logic
sidebar_label: Logic
sidebar_position: 20
---

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
