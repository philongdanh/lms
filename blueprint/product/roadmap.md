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

```d2
classes: {
  sprint: {
    shape: package
    style.border-radius: 5
  }
  milestone: {
    shape: rectangle
    style.fill: "#f0f0f0"
    style.stroke-dash: 3
  }
}

Phase 1: Phase 1: MVP {
  S1: S1: Foundation\n(Week 1-2) {class: sprint}
  S2: S2: Auth Core\n(Week 3-4) {class: sprint}
  S3: S3: Auth + Learning\n(Week 5-6) {class: sprint}
  S4: S4: Learning Core\n(Week 7-8) {class: sprint}

  S1 -> S2 -> S3 -> S4
}

Phase 2: Phase 2: Expansion {
  S5_6: S5-6: Tournament\n(Week 9-12) {class: sprint}
  S7: S7: Polish\n(Week 13-14) {class: sprint}

  S5_6 -> S7
}

Phase 1 -> Phase 2

# Connect Sprints to Milestones
M1: M1 - Foundation\n(07/02) {class: milestone}
M2: M2 - Auth MVP\n(21/02) {class: milestone}
M3: M3 - Learning MVP\n(07/03) {class: milestone}
M4: M4 - Tournament MVP\n(15/03) {class: milestone}
M5: M5 - Beta Release\n(15/03) {class: milestone}
M6: M6 - Production\n(22/03) {class: milestone}

Phase 1.S1 -> M1
Phase 1.S2 -> M2
Phase 1.S4 -> M3
Phase 2.S5_6 -> M4
Phase 2.S5_6 -> M5
Phase 2.S7 -> M6
```

---

## Details

### Giai đoạn 1: MVP

| Sprint | Thời gian | Trọng tâm       | Deliverables / Bàn giao             |
| ------ | --------- | --------------- | ----------------------------------- |
| S1     | Tuần 1-2  | Foundation      | Monorepo, CI/CD, DB schema, GraphQL |
| S2     | Tuần 3-4  | Auth Core       | Đăng ký, OTP, Danh sách môn học     |
| S3     | Tuần 5-6  | Auth + Learning | Đăng nhập, Session, Lộ trình học    |
| S4     | Tuần 7-8  | Learning Core   | Quiz, Tiến độ, Điểm thưởng, Cấp độ  |

**MVP Scope:**

- Xác thực & Phân quyền
- Duyệt nội dung
- Luồng học tập cơ bản
- Theo dõi tiến độ
- Điểm thưởng & Level

### Giai đoạn 2: Mở rộng

| Sprint | Thời gian  | Trọng tâm  | Deliverables / Bàn giao           |
| ------ | ---------- | ---------- | --------------------------------- |
| S5-6   | Tuần 9-12  | Tournament | Giải đấu, Bảng xếp hạng, Realtime |
| S7     | Tuần 13-14 | Polish     | Sửa lỗi, Hiệu năng, Tài liệu      |

**Expansion Scope:**

- Hệ thống Tournament
- Thi đấu Real-time
- Badges & Thành tích
- Phát hành Beta

### Các mốc quan trọng

| Cột Mốc             | Ngày       | Sprint   | Tiêu chí                    |
| ------------------- | ---------- | -------- | --------------------------- |
| M1 - Foundation     | 07/02/2026 | S1       | Hoàn thành hạ tầng, GraphQL |
| M2 - Auth MVP       | 21/02/2026 | S2       | Đăng nhập/Đăng ký hoạt động |
| M3 - Learning MVP   | 07/03/2026 | S3-4     | Luồng học tập hoàn chỉnh    |
| M4 - Tournament MVP | 15/03/2026 | S5-6     | Giải đấu hoạt động          |
| M5 - Beta Release   | 15/03/2026 | S6       | Sửa hết lỗi P0              |
| M6 - Production     | 22/03/2026 | Post-MVP | Go live                     |
