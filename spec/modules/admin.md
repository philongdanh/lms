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

### Create Tenant

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

### Rules & Constraints

- Mã `Tenant` phải unique toàn hệ thống
- Chỉ `Root Admin` có thể tạo/xóa `Tenant`
- Giới hạn import: tối đa 500 users mỗi batch
- Soft delete → Hard delete sau 30 ngày
- Ghi audit log cho tất cả impersonation

### Lifecycle Sequence

Vòng đời tenant từ tạo đến xóa.

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

> **SSoT**: [Database Blueprint](../../blueprint/architecture/database.md)

---

## API & Integration

### GraphQL Operations

> **SSoT**: [schema.graphql](../api/graphql/admin/schema.graphql)

```graphql
type Query {
  """
  Danh sách tenant
  """
  tenants(status: TenantStatus): [Tenant!]!
    @auth(role: SUPER_ADMIN)
    @rateLimit(limit: 100, window: "1m")

  """
  Chi tiết tenant
  """
  tenant(id: ID!): Tenant!
    @auth(role: SUPER_ADMIN)
    @rateLimit(limit: 100, window: "1m")
}

type Mutation {
  """
  Tạo tenant mới
  """
  createTenant(input: CreateTenantInput!): Tenant!
    @auth(role: SUPER_ADMIN)
    @rateLimit(limit: 10, window: "1m")

  """
  Cập nhật tenant
  """
  updateTenant(id: ID!, input: UpdateTenantInput!): Tenant!
    @auth(role: SUPER_ADMIN)
    @rateLimit(limit: 50, window: "1m")

  """
  Xóa tenant (soft delete)
  """
  deleteTenant(id: ID!): Boolean!
    @auth(role: SUPER_ADMIN)
    @rateLimit(limit: 10, window: "1m")

  """
  Import users từ CSV
  """
  importUsers(file: Upload!): ImportJob!
    @auth(role: ADMIN)
    @rateLimit(limit: 5, window: "1m")

  """
  Đăng nhập với tư cách user khác
  """
  impersonateUser(userId: ID!): AuthPayload!
    @auth(role: ADMIN)
    @rateLimit(limit: 10, window: "1m")
}

input CreateTenantInput {
  code: String!
  name: String!
  adminEmail: String!
}

type ImportJob {
  jobId: ID!
  status: JobStatus!
}

enum TenantStatus {
  PENDING
  ACTIVE
  SUSPENDED
  DELETED
}
```

### Events & Webhooks

| Event               | Trigger                 | Payload                       |
| ------------------- | ----------------------- | ----------------------------- |
| `tenant.created`    | Sau khi tạo tenant      | `{ tenantId, code, name }`    |
| `tenant.activated`  | Sau khi kích hoạt       | `{ tenantId }`                |
| `users.imported`    | Sau khi import hoàn tất | `{ tenantId, count, errors }` |
| `user.impersonated` | Khi admin impersonate   | `{ adminId, targetUserId }`   |

---

## Acceptance Criteria

### Functional Requirements

| ID          | Yêu cầu                 | Điều kiện                     |
| ----------- | ----------------------- | ----------------------------- |
| `FR-ADM-01` | Tạo `Tenant` thành công | Mã unique, dữ liệu hợp lệ     |
| `FR-ADM-02` | Import users hàng loạt  | CSV đúng định dạng, ≤500 dòng |
| `FR-ADM-03` | Impersonate hoạt động   | Ghi audit log                 |

### Edge Cases

| Case                          | Xử lý                       |
| ----------------------------- | --------------------------- |
| Mã `Tenant` trùng             | Trả về lỗi `Code Exists`    |
| Import > 500 users            | Trả về lỗi `Limit Exceeded` |
| Email trùng trong import      | Bỏ qua dòng, ghi log lỗi    |
| Email service không hoạt động | Đưa vào queue, retry sau    |

---
