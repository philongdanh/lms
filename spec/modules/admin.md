---
id: admin
title: Admin
sidebar_label: Admin
sidebar_position: 2
---

# Admin

Multi-tenant system administration and user management module.

---

## Business Logic

### Main Workflows

| Workflow        | Description                        | Actor          | Result                                  |
| --------------- | ---------------------------------- | -------------- | --------------------------------------- |
| Create `Tenant` | Initialize new tenant for school   | `Root Admin`   | `Tenant` created, activation email sent |
| Import Users    | Bulk import users from CSV         | `Tenant Admin` | Users created, error report if any      |
| Impersonate     | Login as user for support          | `Admin`        | Impersonation session created           |
| Delete `Tenant` | Soft delete and hard delete tenant | `Root Admin`   | `Tenant` deleted after 30 days          |

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

- `Tenant` code must be unique system-wide
- Only `Root Admin` can create/delete `Tenant`
- Import limit: max 500 users per batch
- Soft delete → Hard delete after 30 days
- Audit log for all impersonation

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

| Entity           | Main Fields                                       | Description            |
| ---------------- | ------------------------------------------------- | ---------------------- |
| `Tenant`         | `id`, `code`, `name`, `status`, `settings`        | School information     |
| `TenantSettings` | `id`, `tenant_id`, `config_json`                  | Tenant-specific config |
| `AuditLog`       | `id`, `actor_id`, `action`, `target`, `timestamp` | Admin action log       |

### Relations

| `Relation`                  | Description                      |
| --------------------------- | -------------------------------- |
| `Tenant` → `User`           | `1:N` - `Tenant` owns many users |
| `Tenant` → `TenantSettings` | `1:1` - Each tenant has 1 config |
| `Admin` → `AuditLog`        | `1:N` - Admin action logs        |

---

## API & Integration

### GraphQL Operations

| Type       | Operation         | Description           | Auth            | Rate Limit |
| ---------- | ----------------- | --------------------- | --------------- | ---------- |
| `Mutation` | `createTenant`    | Create new tenant     | ✅ `Root Admin` | 10/min     |
| `Query`    | `tenants`         | Tenant list           | ✅ `Root Admin` | 100/min    |
| `Query`    | `tenant`          | Tenant details        | ✅ `Root Admin` | 100/min    |
| `Mutation` | `updateTenant`    | Update tenant         | ✅ `Root Admin` | 50/min     |
| `Mutation` | `deleteTenant`    | Delete tenant (soft)  | ✅ `Root Admin` | 10/min     |
| `Mutation` | `importUsers`     | Import users from CSV | ✅ `Admin`      | 5/min      |
| `Mutation` | `impersonateUser` | Login as user         | ✅ `Admin`      | 10/min     |

### Events & Webhooks

| Event               | Trigger                 | Payload                       |
| ------------------- | ----------------------- | ----------------------------- |
| `tenant.created`    | After tenant creation   | `{ tenantId, code, name }`    |
| `tenant.activated`  | After activation        | `{ tenantId }`                |
| `users.imported`    | After import complete   | `{ tenantId, count, errors }` |
| `user.impersonated` | When admin impersonates | `{ adminId, targetUserId }`   |

---

## Acceptance Criteria

### Functional Requirements

| ID          | Requirement                  | Condition                     |
| ----------- | ---------------------------- | ----------------------------- |
| `FR-ADM-01` | Create `Tenant` successfully | Unique code, valid data       |
| `FR-ADM-02` | Bulk import users            | Correct CSV format, ≤500 rows |
| `FR-ADM-03` | Impersonate works            | Audit log recorded            |

### Edge Cases

| Case                      | Handling                      |
| ------------------------- | ----------------------------- |
| Duplicate `Tenant` code   | Return `Code Exists` error    |
| Import > 500 users        | Return `Limit Exceeded` error |
| Duplicate email in import | Skip row, log error           |
| Email service down        | Queue, retry later            |

---
