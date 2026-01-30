---
id: roadmap
title: Roadmap
sidebar_label: Roadmap
sidebar_position: 2
---

# Roadmap

Lộ trình chiến lược và các cột mốc quan trọng để chinh phục mục tiêu sản phẩm.

---

## Timeline

> SSoT: [`BC-001`](constraints.md#business-constraints) (Timeline) |
> [`BC-002`](constraints.md#business-constraints) (MVP)

### Giai đoạn 1: MVP

| Sprint      | Thời gian     | Trọng tâm             | Deliverables / Bàn giao                  |
| ----------- | ------------- | --------------------- | ---------------------------------------- |
| **S1**      | 20/01 - 02/02 | Foundation            | Monorepo, DB schema, CI/CD (In-progress) |
| **S2**      | 03/02 - 16/02 | Auth & Users          | RBAC, Profile, Multi-device session      |
| **S3**      | 17/02 - 02/03 | Content & Learning    | Cấu trúc bài học, Quiz engine, Tiến độ   |
| **S4**      | 03/03 - 15/03 | Gamification & Polish | Badges cơ bản, Sửa lỗi, UAT              |
| **Release** | 16/03 - 22/03 | **Release**           | Beta Feedback, Cloud Deploy, Go Live     |

**MVP Scope:**

- Xác thực & Phân quyền (Auth)
- Học tập: Cấu trúc bài học, Quiz engine
- Tiến độ: Theo dõi hoàn thành, Lịch sử học
- Gamification cơ bản: XP, Level, Badges đơn giản

### Giai đoạn 2: Mở rộng

| Sprint | Thời gian | Trọng tâm     | Deliverables / Bàn giao          |
| ------ | --------- | ------------- | -------------------------------- |
| S5-S6  | Post-MVP  | Tournament    | Giải đấu, Bảng xếp hạng Realtime |
| S7     | Post-MVP  | Advanced Game | Advanced Badges, Store           |

**Expansion Scope:**

- Hệ thống Tournament (Giải đấu)
- Thi đấu & Bảng xếp hạng Real-time
- Gamification nâng cao: Cửa hàng (Store), Advanced Badges
- Tính năng Cộng đồng (Social)

### Các mốc quan trọng

| Cột Mốc             | Thời gian | Sprint  | Tiêu chí                    |
| ------------------- | --------- | ------- | --------------------------- |
| M1 - Foundation     | 02/02     | S1      | Hoàn thành hạ tầng, DB      |
| M2 - Auth MVP       | 16/02     | S2      | Đăng nhập/Đăng ký hoạt động |
| M3 - Learning MVP   | 02/03     | S3      | Luồng học tập hoàn chỉnh    |
| M4 - Feature Freeze | 15/03     | S4      | Chốt tính năng, chỉ fix bug |
| M5 - Release        | 22/03     | Release | Go live Production          |
