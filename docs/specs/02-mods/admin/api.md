---
id: admin-api
title: Admin API Endpoints
sidebar_label: API
sidebar_position: 1
---

# Admin & Tenant - API Endpoints
 
Các giao diện quản trị hệ thống và cấu hình đa thực thể.

---

## Base Information

- **Base URL**: `/api/v1/admin`
- **Version**: 1.0
- **Format**: JSON
- **Authentication**: Bearer Token (Root Admin / Tenant Admin)

---

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

## References

- [Business Logic](./logic.md)
- [Data Model](./data.md)
- [Test Cases](./tests.md)
