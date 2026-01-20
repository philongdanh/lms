---
id: admin-api
title: Admin API Endpoints
sidebar_label: API
---

# Admin API Endpoints

## Overview
API cho quản trị hệ thống và quản lý Tenant.

## Base Information
- **Base URL**: `/api/v1/admin`
- **Version**: 1.0
- **Authentication**: Bearer Token (Role: root-admin, tenant-admin)

## Endpoints Summary
| Method | Endpoint | Description | Auth Required | Rate Limit |
|--------|----------|-------------|---------------|------------|
| GET | `/tenants` | Lấy danh sách Tenant | ✅ (Root) | 20/min |
| POST | `/tenants` | Tạo mới Tenant | ✅ (Root) | 10/min |
| POST | `/tenants/{id}/suspend` | Tạm ngưng Tenant | ✅ (Root) | 10/min |
| POST | `/tenants/{id}/impersonate` | Đăng nhập với tư cách School Admin | ✅ (Root) | 5/min |
| POST | `/users/import` | Import user từ file | ✅ (Tenant) | 5/min |

## Endpoint Details

### Endpoint: POST `/tenants`
**Description**: Tạo một Tenant mới và tài khoản Admin tương ứng.

#### Request
```http
POST /api/v1/admin/tenants
Authorization: Bearer {token}

{
  "name": "Trường THCS ABC",
  "code": "thcs-abc",
  "admin_email": "admin@abc.edu.vn",
  "admin_name": "Admin School",
  "plan": "PRO"
}
```

#### Response
**Success (201 Created)**:
```json
{
  "data": {
    "id": "uuid",
    "status": "ACTIVE",
    "cname": "thcs-abc.lms.com"
  }
}
```

### Endpoint: POST `/users/import`
**Description**: Import danh sách user từ file CSV.

#### Request
```http
POST /api/v1/admin/users/import
Authorization: Bearer {token}
Content-Type: multipart/form-data

file: (binary.csv)
role: student
send_email: true
```

#### Response
**Success (200 OK)**:
```json
{
  "data": {
    "imported": 48,
    "failed": 2,
    "errors": [
      { "row": 10, "email": "invalid", "error": "Email format" }
    ]
  }
}
```

### Endpoint: POST `/tenants/{id}/impersonate`
**Description**: Lấy access token tạm thời thay mặt Tenant Admin.

#### Request
```http
POST /api/v1/admin/tenants/{id}/impersonate
Authorization: Bearer {token}
```

#### Response
**Success (200 OK)**:
```json
{
  "data": {
    "access_token": "eyJ...",
    "expires_in": 3600
  }
}
```

## Error Responses
| Code | Error | Description |
|------|-------|-------------|
| 409 | `ADMIN_TENANT_EXIST` | Mã Tenant đã tồn tại |
| 400 | `ADMIN_IMPORT_LIMIT` | File CSV quá lớn (>500 dòng) |
| 403 | `ADMIN_UNAUTHORIZED` | Không đủ quyền hạn |

## Performance Requirements
- **Tenant Creation**: < 2s (bao gồm tạo user, email async).
- **Import**: < 10s cho file 500 dòng.

## Security Requirements
- [ ] Xác thực Root Admin được thực thi nghiêm ngặt
- [ ] Audit log cho Impersonation


## Validation Checklist
- [ ] Xác minh cô lập Tenant
- [ ] Xác minh logic Soft delete

## References

- [Overview](./overview.md)
