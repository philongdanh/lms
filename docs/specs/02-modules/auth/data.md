---
id: data
title: Data Model
sidebar_label: Data
sidebar_position: 3
---

# Auth - Data Model
 
Cấu trúc dữ liệu cho hệ thống xác thực và quản lý người dùng.

config:
  themeVariables:
    fontFamily: "EB Garamond"

## Lifecycle States

### Entity Relationship Diagram

```d2
direction: right
Tenant -> User: has
User -> UserRole: has
User -> UserSession: has
```

### Tenant State Machine

```d2
direction: right
    [*] --> PENDING
    PENDING --> ACTIVE : verify_email
    ACTIVE --> SUSPENDED : violation
    SUSPENDED --> ACTIVE : resolve
    ACTIVE --> PENDING_DEACTIVATION : request_delete
    PENDING_DEACTIVATION --> [*] : hard_delete_30d
```


## Performance Requirements

- **Query Performance**: < 50ms cho Login by Email
- **Write Throughput**: 1000 register/sec
- **Storage Growth**: 1GB/tháng


## Validation Checklist

- [x] Tất cả entities định nghĩa đầy đủ fields
- [x] Relationships được document rõ ràng
- [x] Indexes tối ưu cho query patterns
- [x] Performance requirements khả thi

