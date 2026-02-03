---
id: admin
title: Admin
sidebar_label: Admin
sidebar_position: 2
---

# Admin

Module quản trị hệ thống multi-tenant và quản lý người dùng.

---

## Business Logic

### Tạo Tenant

Khởi tạo tenant mới cho trường học.

```d2
shape: sequence_diagram
"Root Admin"
"Admin Service"
Database
Queue
"Email Service"

"Root Admin" -> "Admin Service": create_tenant(payload)
"Admin Service" -> Database: check_code_uniqueness
Database -> "Admin Service": unique
"Admin Service" -> Database: create_record
"Admin Service" -> Queue: publish(tenant.created)
"Admin Service" -> "Email Service": send_admin_invite
"Admin Service" -> "Root Admin": success_response
```

### Import Users

Nhập người dùng hàng loạt từ file CSV.

> **SSoT**:
> [33: SeaweedFS - Upload Flow](../../blueprint/architecture/decisions/33-seaweedfs.md#upload-flow)

```d2
shape: sequence_diagram
"Tenant Admin"
"Admin Service"
SeaweedFS
Queue
Worker
"Auth Service"
Database
"Notification Service"

"Tenant Admin" -> "Admin Service": get_upload_url(filename)
"Admin Service" -> SeaweedFS: generate_presigned_url
SeaweedFS -> "Admin Service": signed_url
"Admin Service" -> "Tenant Admin": return_url

"Tenant Admin" -> SeaweedFS: upload_file(csv)
SeaweedFS -> "Tenant Admin": 200 OK

"Tenant Admin" -> "Admin Service": import_users(file_id)
"Admin Service" -> Queue: push_job(import_users, file_id)
"Admin Service" -> "Tenant Admin": job_id

Worker -> Queue: pop_job
Worker -> SeaweedFS: read_file(file_id)
Worker -> "Auth Service": batch_create_users
Worker -> Database: save_import_log
Worker -> "Notification Service": notify_admin(result)
```

### Impersonate

Đăng nhập với tư cách user khác để hỗ trợ.

```d2
shape: sequence_diagram
Admin
"Admin Service"
"Auth Service"
Database

Admin -> "Admin Service": request_impersonation(target_user_id)
"Admin Service" -> "Auth Service": verify_admin_privileges
"Auth Service" -> "Admin Service": authorized
"Admin Service" -> Database: log_audit_trail
"Admin Service" -> "Auth Service": generate_impersonation_token
"Auth Service" -> Admin: return_temp_token
```

### Delete Tenant

Soft delete và hard delete tenant sau 30 ngày.

```d2
shape: sequence_diagram
"Root Admin"
"Admin Service"
Database
Queue

"Root Admin" -> "Admin Service": delete_tenant(tenant_id)
"Admin Service" -> Database: soft_delete_tenant
"Admin Service" -> Queue: schedule_hard_delete(30_days)
"Admin Service" -> "Root Admin": success
```

### Quy tắc & Ràng buộc

- Mã `Tenant` phải unique toàn hệ thống
- Chỉ `Root Admin` có thể tạo/xóa `Tenant`
- Giới hạn import: tối đa 500 users mỗi batch
- Soft delete → Hard delete sau 30 ngày
- Ghi audit log cho tất cả impersonation

### Tenant Lifecycle

Vòng đời tenant từ tạo đến xóa.

```d2
direction: right

PENDING: {
  style.fill: "#fef3c7"
}
ACTIVE: {
  style.fill: "#d1fae5"
}
SUSPENDED: {
  style.fill: "#fee2e2"
}
DELETED: {
  style.fill: "#e5e7eb"
  style.stroke-dash: 3
}

PENDING -> ACTIVE: activate(token)
ACTIVE -> SUSPENDED: suspend_tenant()
SUSPENDED -> ACTIVE: reactivate()
ACTIVE -> DELETED: soft_delete()
SUSPENDED -> DELETED: soft_delete()
DELETED -> DELETED: hard_delete(30 days)
```

**Triggers:**

- `PENDING` → `ACTIVE`: Tenant Admin click activation link
- `ACTIVE` → `SUSPENDED`: Root Admin suspend
- `SUSPENDED` → `ACTIVE`: Root Admin reactivate
- Any → `DELETED`: Soft delete + scheduler hard delete sau 30 ngày

---

## API & Integration

### Sự kiện & Webhooks

| Sự kiện             | Kích hoạt               | Payload                       |
| ------------------- | ----------------------- | ----------------------------- |
| `tenant.created`    | Sau khi tạo tenant      | `{ tenantId, code, name }`    |
| `tenant.activated`  | Sau khi kích hoạt       | `{ tenantId }`                |
| `users.imported`    | Sau khi import hoàn tất | `{ tenantId, count, errors }` |
| `user.impersonated` | Khi admin impersonate   | `{ adminId, targetUserId }`   |

---

## Acceptance Criteria

### Yêu cầu chức năng

| ID          | Yêu cầu                 | Điều kiện                     |
| ----------- | ----------------------- | ----------------------------- |
| `FR-ADM-01` | Tạo `Tenant` thành công | Mã unique, dữ liệu hợp lệ     |
| `FR-ADM-02` | Import users hàng loạt  | CSV đúng định dạng, ≤500 dòng |
| `FR-ADM-03` | Impersonate hoạt động   | Ghi audit log                 |

### Các Edge Cases

| Trường hợp                    | Xử lý                    |
| ----------------------------- | ------------------------ |
| Mã `Tenant` trùng             | `Code Exists`            |
| Import > 500 users            | `Limit Exceeded`         |
| Email trùng trong import      | Bỏ qua dòng, ghi log lỗi |
| Email service không hoạt động | Đưa vào queue, retry sau |

---
