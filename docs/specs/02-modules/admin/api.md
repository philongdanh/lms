---
id: api
title: API Endpoints
sidebar_label: API
sidebar_position: 10
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
