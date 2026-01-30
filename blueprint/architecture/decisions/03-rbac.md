---
id: 03-rbac
title: '03: RBAC'
sidebar_label: '03: RBAC'
sidebar_position: 3
---

# 03: RBAC

Authorization model linh hoạt

---

## Decision

**RBAC** với 5 roles

| Role           | Phạm vi  | Mô tả                   |
| -------------- | -------- | ----------------------- |
| `root-admin`   | Hệ thống | Admin hệ thống          |
| `tenant-admin` | Tenant   | Admin tenant            |
| `teacher`      | Tenant   | Quản lý học liệu        |
| `student`      | Tenant   | Học viên                |
| `parent`       | Tenant   | Phụ huynh (xem báo cáo) |

---

## Permissions

Seed cứng trong Entity `Permission`

### Admin

| Code               | Mô tả           |
| ------------------ | --------------- |
| `tenant:create`    | Tạo mới         |
| `tenant:read`      | Xem chi tiết    |
| `tenant:update`    | Cập nhật        |
| `tenant:delete`    | Xóa (soft/hard) |
| `tenant:suspend`   | Đình chỉ        |
| `user:create`      | Tạo mới         |
| `user:read`        | Xem chi tiết    |
| `user:update`      | Cập nhật        |
| `user:delete`      | Xóa             |
| `user:import`      | Import CSV      |
| `user:impersonate` | Đăng nhập thay  |
| `role:assign`      | Gán role        |

### Content

| Code              | Mô tả        |
| ----------------- | ------------ |
| `subject:create`  | Tạo mới      |
| `subject:read`    | Xem chi tiết |
| `subject:update`  | Cập nhật     |
| `subject:delete`  | Xóa          |
| `topic:create`    | Tạo mới      |
| `topic:read`      | Xem chi tiết |
| `topic:update`    | Cập nhật     |
| `topic:delete`    | Xóa          |
| `lesson:create`   | Tạo mới      |
| `lesson:read`     | Xem chi tiết |
| `lesson:update`   | Cập nhật     |
| `lesson:delete`   | Xóa          |
| `lesson:publish`  | Xuất bản     |
| `question:create` | Tạo mới      |
| `question:read`   | Xem chi tiết |
| `question:update` | Cập nhật     |
| `question:delete` | Xóa          |
| `question:import` | Import CSV   |
| `media:upload`    | Upload file  |
| `media:delete`    | Xóa file     |

### Learning

| Code                  | Mô tả           |
| --------------------- | --------------- |
| `progress:read`       | Xem mọi tiến độ |
| `progress:read_own`   | Xem của mình    |
| `progress:read_child` | Xem của con     |
| `exercise:submit`     | Nộp bài         |
| `learning_path:read`  | Xem lộ trình    |

### Tournament

| Code                | Mô tả        |
| ------------------- | ------------ |
| `tournament:create` | Tạo mới      |
| `tournament:read`   | Xem chi tiết |
| `tournament:update` | Cập nhật     |
| `tournament:delete` | Xóa          |
| `tournament:join`   | Tham gia     |
| `tournament:submit` | Nộp bài      |

### Gamification

| Code               | Mô tả        |
| ------------------ | ------------ |
| `leaderboard:read` | Xem BXH      |
| `reward:redeem`    | Đổi thưởng   |
| `badge:read`       | Xem huy hiệu |

### Analytics

| Code                  | Mô tả           |
| --------------------- | --------------- |
| `report:read`         | Xem báo cáo     |
| `report:read_own`     | Báo cáo cá nhân |
| `report:export`       | Xuất file       |
| `analytics:dashboard` | Truy cập dash   |

---

## Rules

### 1. Isolation

> SSoT: [`TC-ARCH-006`](../design.md#architecture)

- Data cách ly theo `tenant_id`
- User chỉ thấy data thuộc tenant gán
- `root-admin` thấy cross-tenant

### 2. Ownership

- **Own data only**: Chỉ sửa data mình tạo/liên kết
- `teacher`: Chỉ sửa `Topic`, `Lesson` chính chủ
- `parent`: Chỉ xem data `student` liên kết

### 3. Assignment

```d2
direction: down
# SSoT: C-015 (RBAC)

root_admin: {
  label: "root-admin"
  style.fill: "#e74c3c"
}
tenant_admin: {
  label: "tenant-admin"
  style.fill: "#3498db"
}
teacher: {
  style.fill: "#2ecc71"
}
student: {
  style.fill: "#f39c12"
}
parent: {
  style.fill: "#9b59b6"
}

root_admin -> tenant_admin: assign
tenant_admin -> teacher: assign
tenant_admin -> student: assign
tenant_admin -> parent: assign
```

| Assigner       | Can Assign Roles                               |
| -------------- | ---------------------------------------------- |
| `root-admin`   | `tenant-admin`, `teacher`, `student`, `parent` |
| `tenant-admin` | `teacher`, `student`, `parent`                 |

### 4. Publishing

- `teacher`: Tạo `Lesson` (`DRAFT`)
- `tenant-admin`: Review -> `Publish` (`PUBLISHED`)
- `student`: Chỉ thấy `PUBLISHED`
