---
id: admin-users
title: User Management
sidebar_label: Users
sidebar_position: 13
---

# User Management

Đặc tả màn hình quản lý người dùng.

---

## Overview

```yaml
route: /admin/users
layout: AdminLayout
access: Admin
```

---

## Screen Structure

### Hierarchy

```yaml
UserManagementPage:
  - PageHeader:
      - Title: "Quản lý người dùng"
      - AddUserButton: button[primary]
  - FilterBar:
      - SearchInput: input[type=search]
      - RoleFilter: select
      - StatusFilter: select
  - UserTable:
      - columns: [avatar, name, email, role, status, lastActive, actions]
      - pagination: true
  - UserModal: (conditional)
      - UserForm: form
```

---

## Components

### FilterBar

| Element        | Type        | Options                                      |
| :------------- | :---------- | :------------------------------------------- |
| `SearchInput`  | `TextInput` | `placeholder="Tìm theo tên, email..."`       |
| `RoleFilter`   | `Select`    | `["Tất cả", "Admin", "User"]`                |
| `StatusFilter` | `Select`    | `["Tất cả", "Active", "Inactive", "Banned"]` |

### UserTable

| Cột              | Field               | Sortable |
| :--------------- | :------------------ | :------- |
| `Avatar`         | `user.avatar`       | No       |
| `Tên`            | `user.name`         | Yes      |
| `Email`          | `user.email`        | Yes      |
| `Vai trò`        | `user.role`         | Yes      |
| `Trạng thái`     | `user.status`       | Yes      |
| `Hoạt động cuối` | `user.lastActiveAt` | Yes      |
| `Thao tác`       | Actions dropdown    | No       |

### Actions

| Action         | Trigger    | Effect                                      |
| :------------- | :--------- | :------------------------------------------ |
| `Xem chi tiết` | Menu click | Open user detail modal                      |
| `Chỉnh sửa`    | Menu click | Open edit modal                             |
| `Vô hiệu hóa`  | Menu click | Confirm, `PUT /api/admin/users/:id/disable` |
| `Xóa`          | Menu click | Confirm, `DELETE /api/admin/users/:id`      |

---

## States

| State     | Trigger                      | UI Changes       |
| :-------- | :--------------------------- | :--------------- |
| `loading` | Initial load / filter change | Table skeleton   |
| `idle`    | Data loaded                  | Show table       |
| `empty`   | No results                   | Show empty state |
| `modal`   | Add/Edit clicked             | Show modal form  |

---

## Responsive

```yaml
mobile:
  UserTable: card-list view
  FilterBar: collapsed to filter button
tablet:
  UserTable: horizontal scroll
desktop:
  UserTable: full table
```
