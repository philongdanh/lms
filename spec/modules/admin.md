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

| Workflow | Mô tả | Actor | Kết quả |
| -------- | ----- | ----- | ------- |
| Create Tenant | Khởi tạo tenant mới cho trường học | Root Admin | Tenant được tạo, email kích hoạt được gửi |
| Import Users | Import users hàng loạt từ CSV | Tenant Admin | Users được tạo, báo cáo lỗi nếu có |
| Impersonate | Đăng nhập thay user để hỗ trợ | Admin | Session impersonation được tạo |
| Delete Tenant | Xóa mềm và xóa cứng tenant | Root Admin | Tenant bị xóa sau 30 ngày |

### Rules & Constraints

- Tenant code phải là duy nhất trong toàn hệ thống
- Chỉ Root Admin mới có thể tạo/xóa Tenant
- Giới hạn import tối đa 500 users/lần
- Soft delete → Hard delete sau 30 ngày
- Audit log cho tất cả Impersonation

### State Machine

```d2
direction: right
[*] --> PENDING : create
PENDING --> ACTIVE : activate
ACTIVE --> SUSPENDED : suspend
SUSPENDED --> ACTIVE : reactivate
ACTIVE --> DELETED : soft_delete
DELETED --> [*] : hard_delete_30d
```

---

## Data Model

### Schema & Entities

| Entity | Fields chính | Mô tả |
| ------ | ------------ | ----- |
| Tenant | id, code, name, status, settings | Thông tin trường học |
| TenantSettings | id, tenant_id, config_json | Cấu hình riêng tenant |
| AuditLog | id, actor_id, action, target, timestamp | Log hành động admin |

### Relations

| Relation | Mô tả |
| -------- | ----- |
| Tenant → User | 1:N - Tenant sở hữu nhiều users |
| Tenant → TenantSettings | 1:1 - Mỗi tenant có 1 cấu hình |
| Admin → AuditLog | 1:N - Log hành động của admin |

---

## API & Integration

### Endpoints

| Method | Endpoint | Mô tả | Auth | Rate Limit |
| ------ | -------- | ----- | ---- | ---------- |
| POST | `/tenants` | Tạo tenant mới | ✅ Root Admin | 10/min |
| GET | `/tenants` | Danh sách tenants | ✅ Root Admin | 100/min |
| PUT | `/tenants/:id` | Cập nhật tenant | ✅ Root Admin | 50/min |
| DELETE | `/tenants/:id` | Xóa tenant (soft) | ✅ Root Admin | 10/min |
| POST | `/users/import` | Import users từ CSV | ✅ Admin | 5/min |
| POST | `/users/:id/impersonate` | Đăng nhập thay user | ✅ Admin | 10/min |

### Events & Webhooks

| Event | Trigger | Payload |
| ----- | ------- | ------- |
| `tenant.created` | Sau khi tạo tenant | `{ tenantId, code, name }` |
| `tenant.activated` | Sau khi kích hoạt | `{ tenantId }` |
| `users.imported` | Sau khi import xong | `{ tenantId, count, errors }` |
| `user.impersonated` | Khi admin impersonate | `{ adminId, targetUserId }` |

---

## Acceptance Criteria

### Functional Requirements

| ID | Requirement | Điều kiện |
| -- | ----------- | --------- |
| FR-ADM-01 | Tạo Tenant thành công | Code duy nhất, dữ liệu hợp lệ |
| FR-ADM-02 | Import users hàng loạt | CSV format đúng, ≤500 rows |
| FR-ADM-03 | Impersonate hoạt động | Audit log được ghi |

### Edge Cases

| Case | Xử lý |
| ---- | ----- |
| Tenant code trùng | Trả về lỗi "Code Exists" |
| Import > 500 users | Trả về lỗi "Limit Exceeded" |
| Email trùng trong import | Bỏ qua dòng, ghi log lỗi |
| Email service down | Queue lại, retry sau |

---
