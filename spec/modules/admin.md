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

### Workflow chính

| Workflow        | Mô tả                              | Actor          | Kết quả                                     |
| --------------- | ---------------------------------- | -------------- | ------------------------------------------- |
| Create `Tenant` | Khởi tạo tenant mới cho trường học | Root Admin     | `Tenant` được tạo, email kích hoạt được gửi |
| Import Users    | Import users hàng loạt từ CSV      | `Tenant` Admin | Users được tạo, báo cáo lỗi nếu có          |
| Impersonate     | Đăng nhập thay user để hỗ trợ      | `Admin`        | Session impersonation được tạo              |
| Delete `Tenant` | Xóa mềm và xóa cứng tenant         | Root Admin     | `Tenant` bị xóa sau 30 ngày                 |

#### Detailed Flows

##### Create Tenant

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

##### Import Users

```d2
shape: sequence_diagram
"Tenant Admin"
"Admin Service"
Storage
Queue
Worker
"Auth Service"
Database
"Notification Service"

"Tenant Admin" -> "Admin Service": upload_csv(file)
"Admin Service" -> Storage: save_temp_file
"Admin Service" -> Queue: push_job(import_users)
"Admin Service" -> "Tenant Admin": job_id

Worker -> Queue: pop_job
Worker -> Storage: read_file
Worker -> "Auth Service": batch_create_users
Worker -> Database: save_import_log
Worker -> "Notification Service": notify_admin(result)
```

##### Impersonate

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

##### Delete Tenant

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

### Rules & Constraints

- `Tenant` code phải là duy nhất trong toàn hệ thống
- Chỉ Root Admin mới có thể tạo/xóa `Tenant`
- Giới hạn import tối đa 500 users/lần
- Soft delete → Hard delete sau 30 ngày
- Audit log cho tất cả Impersonation

### Lifecycle Sequence

```d2
shape: sequence_diagram
"Root Admin"
"Admin Service"
Database
"Email Service"
"Tenant Admin"
"Event Bus"
Queue
Scheduler

"Root Admin" -> "Admin Service": create_tenant()
"Admin Service" -> Database: insert(status=PENDING)
"Admin Service" -> "Email Service": send_activation_link()

"Tenant Admin" -> "Admin Service": activate(token)
"Admin Service" -> Database: update(status=ACTIVE)

"Root Admin" -> "Admin Service": suspend_tenant()
"Admin Service" -> Database: update(status=SUSPENDED)
"Admin Service" -> "Event Bus": publish(tenant.suspended)

"Root Admin" -> "Admin Service": reactivate()
"Admin Service" -> Database: update(status=ACTIVE)

"Root Admin" -> "Admin Service": soft_delete()
"Admin Service" -> Database: update(status=DELETED)
"Admin Service" -> Queue: schedule_hard_delete(30_days)

Scheduler -> "Admin Service": execute_hard_delete()
"Admin Service" -> Database: purge_tenant_data()
```

---

## Data Model

### Schema & Entities

| Entity           | Fields chính                                      | Mô tả                 |
| ---------------- | ------------------------------------------------- | --------------------- |
| `Tenant`         | `id`, `code`, `name`, `status`, `settings`        | Thông tin trường học  |
| `TenantSettings` | `id`, `tenant_id`, `config_json`                  | Cấu hình riêng tenant |
| `AuditLog`       | `id`, `actor_id`, `action`, `target`, `timestamp` | Log hành động admin   |

### Relations

| `Relation`                  | Mô tả                               |
| --------------------------- | ----------------------------------- |
| `Tenant` → `User`           | `1:N` - `Tenant` sở hữu nhiều users |
| `Tenant` → `TenantSettings` | `1:1` - Mỗi tenant có 1 cấu hình    |
| `Admin` → `AuditLog`        | `1:N` - Log hành động của admin     |

---

## API & Integration

### GraphQL Operations

| Type       | Operation         | Mô tả               | Auth          | Rate Limit |
| ---------- | ----------------- | ------------------- | ------------- | ---------- |
| `Mutation` | `createTenant`    | Tạo tenant mới      | ✅ Root Admin | 10/min     |
| `Query`    | `tenants`         | Danh sách tenants   | ✅ Root Admin | 100/min    |
| `Query`    | `tenant`          | Chi tiết tenant     | ✅ Root Admin | 100/min    |
| `Mutation` | `updateTenant`    | Cập nhật tenant     | ✅ Root Admin | 50/min     |
| `Mutation` | `deleteTenant`    | Xóa tenant (soft)   | ✅ Root Admin | 10/min     |
| `Mutation` | `importUsers`     | Import users từ CSV | ✅ `Admin`    | 5/min      |
| `Mutation` | `impersonateUser` | Đăng nhập thay user | ✅ `Admin`    | 10/min     |

### Events & Webhooks

| Event               | Trigger               | Payload                       |
| ------------------- | --------------------- | ----------------------------- |
| `tenant.created`    | Sau khi tạo tenant    | `{ tenantId, code, name }`    |
| `tenant.activated`  | Sau khi kích hoạt     | `{ tenantId }`                |
| `users.imported`    | Sau khi import xong   | `{ tenantId, count, errors }` |
| `user.impersonated` | Khi admin impersonate | `{ adminId, targetUserId }`   |

---

## Acceptance Criteria

### Functional Requirements

| ID          | Requirement             | Điều kiện                     |
| ----------- | ----------------------- | ----------------------------- |
| `FR-ADM-01` | Tạo `Tenant` thành công | Code duy nhất, dữ liệu hợp lệ |
| `FR-ADM-02` | Import users hàng loạt  | CSV format đúng, ≤500 rows    |
| `FR-ADM-03` | Impersonate hoạt động   | Audit log được ghi            |

### Edge Cases

| Case                     | Xử lý                       |
| ------------------------ | --------------------------- |
| `Tenant` code trùng      | Trả về lỗi `Code Exists`    |
| Import > 500 users       | Trả về lỗi `Limit Exceeded` |
| Email trùng trong import | Bỏ qua dòng, ghi log lỗi    |
| Email service down       | Queue lại, retry sau        |

---
