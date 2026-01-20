---
id: admin-overview
title: Admin Overview
sidebar_label: Overview
sidebar_position: 1
---

# Admin & Tenant Management - Business Logic

Chi tiết đặc tả cho module Admin & Tenant Management - Business Logic.

---

## Business Context
- **Module**: Admin & Tenant Management
- **Version**: 1.0
- **Status**: Approved
- **Last Updated**: 2026-01-14

---

## Overview
Module quản trị hệ thống cung cấp các tính năng quản lý Tenant (Trường học), quản lý User (Giáo viên, Học sinh), và cấu hình hệ thống. Phân quyền nghiêm ngặt giữa Root Admin và Tenant Admin.

---

## Use Cases
| Use Case ID | Use Case Name | Description | Priority | Status |
|------------|--------------|-------|----------|--------|
| UC-ADMIN-001 | Create Tenant | Tạo mới một Tenant (Trường học) | P0 | Planned |
| UC-ADMIN-002 | Suspend Tenant | Tạm ngưng hoạt động của Tenant | P1 | Planned |
| UC-ADMIN-003 | Impersonate Admin | Đăng nhập với tư cách Tenant Admin | P1 | Planned |
| UC-ADMIN-004 | Import Users | Import danh sách user từ file CSV | P0 | Planned |
| UC-ADMIN-005 | Configure System | Thay đổi cấu hình hệ thống | P2 | Planned |

### UC-ADMIN-004: Import Users
**Actor**: Tenant Admin
**Preconditions**: File CSV đúng định dạng.
**Main Flow**:
1. Admin tải lên file CSV.
2. Hệ thống xác thực định dạng và dữ liệu.
3. Hệ thống tạo các tài khoản User.
4. Hệ thống gửi email kích hoạt (tùy chọn).
5. Hệ thống trả về kết quả import.

---

## Business Rules
| Rule ID | Rule Name | Description | Condition | Action | Exception |
|---------|----------|-------|------------|---------|------------|
| BR-ADMIN-001 | Unique Tenant Code | Mã Tenant phải là duy nhất | Mã đã tồn tại trong DB | Từ chối tạo mới | - |
| BR-ADMIN-002 | Tenant Soft Delete | Xóa Tenant chỉ đánh dấu là đã xóa | Yêu cầu xóa | Đặt `deleted_at`, Lên lịch xóa vĩnh viễn sau 30 ngày | - |

---

## References

- [Logic](./logic.md)
- [Data Model](./data.md)
- [API](./api.md)
- [Tests](./tests.md)
