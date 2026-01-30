---
id: permissions
title: Permissions
sidebar_label: Permissions
sidebar_position: 4
---

# Permissions

Ma trận phân quyền cứng cho hệ thống LMS multi-tenant.

---

## Roles

> SSoT: [`NFR-SEC-01`](../product/constraints.md#security) (Constraints) |
> [0009: RBAC](decisions/0009-rbac.md) (Decision) | [System Design](design.md)
> (Design)

| Role           | Phạm vi  | Mô tả                                                |
| -------------- | -------- | ---------------------------------------------------- |
| `root-admin`   | Hệ thống | Quản trị viên cấp cao nhất, quản lý toàn bộ hệ thống |
| `tenant-admin` | Tenant   | Quản trị viên tenant, quản lý tenant được gán        |
| `teacher`      | Tenant   | Giáo viên, tạo và quản lý nội dung học tập           |
| `student`      | Tenant   | Học sinh, tham gia học tập và làm bài                |
| `parent`       | Tenant   | Phụ huynh, theo dõi tiến độ học sinh liên kết        |

---

## Permission Codes

Danh sách permission codes được seed cứng trong Entity `Permission`. Format:
`resource:action`.

### Admin Module

| Code               | Mô tả                           |
| ------------------ | ------------------------------- |
| `tenant:create`    | Tạo tenant mới                  |
| `tenant:read`      | Xem thông tin tenant            |
| `tenant:update`    | Cập nhật tenant                 |
| `tenant:delete`    | Xóa tenant (soft/hard)          |
| `tenant:suspend`   | Đình chỉ tenant                 |
| `user:create`      | Tạo user mới                    |
| `user:read`        | Xem thông tin user              |
| `user:update`      | Cập nhật user                   |
| `user:delete`      | Xóa user                        |
| `user:import`      | Import users hàng loạt          |
| `user:impersonate` | Đăng nhập với tư cách user khác |
| `role:assign`      | Gán role cho user               |

### Content Module

| Code              | Mô tả                         |
| ----------------- | ----------------------------- |
| `subject:create`  | Tạo môn học                   |
| `subject:read`    | Xem môn học                   |
| `subject:update`  | Cập nhật môn học              |
| `subject:delete`  | Xóa môn học                   |
| `topic:create`    | Tạo chủ đề                    |
| `topic:read`      | Xem chủ đề                    |
| `topic:update`    | Cập nhật chủ đề               |
| `topic:delete`    | Xóa chủ đề                    |
| `lesson:create`   | Tạo bài học                   |
| `lesson:read`     | Xem bài học                   |
| `lesson:update`   | Cập nhật bài học              |
| `lesson:delete`   | Xóa bài học                   |
| `lesson:publish`  | Xuất bản bài học              |
| `question:create` | Tạo câu hỏi                   |
| `question:read`   | Xem câu hỏi                   |
| `question:update` | Cập nhật câu hỏi              |
| `question:delete` | Xóa câu hỏi                   |
| `question:import` | Import câu hỏi hàng loạt      |
| `media:upload`    | Upload media (video/hình ảnh) |
| `media:delete`    | Xóa media                     |

### Learning Module

| Code                  | Mô tả                            |
| --------------------- | -------------------------------- |
| `progress:read`       | Xem tiến độ học tập              |
| `progress:read_own`   | Xem tiến độ học tập của bản thân |
| `progress:read_child` | Xem tiến độ của con (Parent)     |
| `exercise:submit`     | Nộp bài tập                      |
| `learning_path:read`  | Xem lộ trình học tập             |

### Tournament Module

| Code                | Mô tả                  |
| ------------------- | ---------------------- |
| `tournament:create` | Tạo giải đấu           |
| `tournament:read`   | Xem giải đấu           |
| `tournament:update` | Cập nhật giải đấu      |
| `tournament:delete` | Xóa giải đấu           |
| `tournament:join`   | Tham gia giải đấu      |
| `tournament:submit` | Nộp bài trong giải đấu |

### Gamification Module

| Code               | Mô tả             |
| ------------------ | ----------------- |
| `leaderboard:read` | Xem bảng xếp hạng |
| `reward:redeem`    | Đổi thưởng        |
| `badge:read`       | Xem huy hiệu      |

### Analytics Module

| Code                  | Mô tả                        |
| --------------------- | ---------------------------- |
| `report:read`         | Xem báo cáo                  |
| `report:read_own`     | Xem báo cáo của bản thân     |
| `report:export`       | Xuất báo cáo                 |
| `analytics:dashboard` | Truy cập dashboard analytics |

---

## Special Rules

### 1. Tenant Isolation

> SSoT: [`TC-ARCH-06`](../product/constraints.md#architecture)

- Tất cả data được cách ly theo `tenant_id`
- User chỉ có thể truy cập data trong tenant được gán
- `root-admin` có thể truy cập cross-tenant

### 2. Ownership Rules

- **Own data only**: User chỉ có thể thao tác trên data do mình tạo hoặc liên
  kết
- `teacher` chỉ có thể sửa/xóa `Topic`, `Lesson` do mình tạo (`created_by`)
- `parent` chỉ có thể xem data của `student` được liên kết

### 3. Role Assignment Constraints

```d2
direction: down
# SSoT: NFR-SEC-01 (RBAC)

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

root_admin -> tenant_admin: can assign
tenant_admin -> teacher: can assign
tenant_admin -> student: can assign
tenant_admin -> parent: can assign
```

| Assigner       | Can Assign Roles                               |
| -------------- | ---------------------------------------------- |
| `root-admin`   | `tenant-admin`, `teacher`, `student`, `parent` |
| `tenant-admin` | `teacher`, `student`, `parent`                 |

### 4. Content Publishing Flow

- `teacher` tạo `Lesson` với `status = DRAFT`
- `tenant-admin` review và `Publish` (`status = PUBLISHED`)
- Chỉ `PUBLISHED` lessons hiển thị cho `student`

---
