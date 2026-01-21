---
id: product-roadmap
title: Product Roadmap
sidebar_label: Product Roadmap
sidebar_position: 7
---

# Product Roadmap

Lộ trình và các cột mốc chiến lược.

> [!NOTE]
> Tài liệu này mô tả lộ trình cấp sản phẩm. Xem [Sprint Plan](../../project/02-sprint-plan.md) để biết kế hoạch chi tiết cho từng giai đoạn phát triển ngắn hạn.

---

## Phase 1: MVP Foundation

**Thời hạn**: 20/01/2026 - 05/02/2026  
**Mục tiêu**: Ra mắt nền tảng học tập cốt lõi với các phân hệ xác thực, nội dung và học tập.

### Milestones

| Milestone           | Target Date   | Deliverable                               |
| ------------------- | ------------- | ----------------------------------------- |
| M1 - Nền tảng       | 22/01/2026    | Monorepo, CI/CD, Design System, GraphQL   |
| M2 - Xác thực MVP   | 26/01/2026    | Xác thực đa thực thể, RBAC, JWT           |
| M3 - Học tập MVP    | 30/01/2026    | Content CMS, Lộ trình học tập, Trình phát video |
| M4 - Thi đấu MVP    | 02/02/2026    | Quiz thời gian thực, Ghép cặp, Bảng xếp hạng |
| M5 - Bản thử nghiệm | 05/02/2026    | Gamification, Báo cáo phụ huynh, Tinh chỉnh |

### Features

| Feature            | Module    | Priority | Effort     |
| ------------------ | -------- | ------- | ------ |
| Xác thực đa thực thể| Auth     | P0      | Cao    |
| RBAC (5 vai trò)   | Auth     | P0      | Trung bình |
| Quản lý nội dung   | Content  | P0      | Cao    |
| Bài học video      | Học tập  | P0      | Trung bình |
| Công cụ Quiz       | Học tập  | P0      | Cao    |
| Theo dõi tiến độ   | Học tập  | P1      | Trung bình |

---

## Phase 2: Engagement & Gamification

**Thời hạn**: 06/02/2026 - 20/02/2026  
**Mục tiêu**: Tăng cường tương tác người dùng với các tính năng thi đấu, trò chơi hóa và phân tích nâng cao.

### Milestones

| Milestone              | Target Date   | Deliverable                             |
| ---------------------- | ------------- | --------------------------------------- |
| M6 - Thi đấu V2        | 10/02/2026    | Thi đấu đội, Giải đấu tùy chỉnh         |
| M7 - Trò chơi hóa toàn diện| 15/02/2026 | Huy hiệu, Chuỗi ngày học, Chợ phần thưởng |
| M8 - Phân tích V2      | 20/02/2026    | Phân tích dự báo, Thông tin học tập     |

### Features

| Feature              | Module        | Priority | Effort     |
| -------------------- | ------------ | ------- | ------ |
| Thi đấu đồng đội     | Tournament   | P0      | Cao    |
| Hệ thống huy hiệu    | Gamification | P0      | Trung bình |
| Chợ phần thưởng      | Gamification | P1      | Cao    |
| Phân tích dự báo     | Analytics    | P1      | Cao    |

---

## Phase 3: AI Personalization

**Thời hạn**: 21/02/2026 - 28/02/2026  
**Mục tiêu**: Tích hợp trí tuệ nhân tạo để cá nhân hóa lộ trình học tập và gợi ý nội dung.

### Features

| Feature                    | Module    | Priority | Effort     |
| -------------------------- | --------- | ------- | ------ |
| Lộ trình học tập AI        | Học tập   | P0      | Rất cao|
| Gợi ý nội dung             | Content   | P1      | Cao    |
| Đánh giá thích ứng         | Học tập   | P1      | Cao    |
| Theo dõi mức độ thành thạo | Analytics | P1      | Trung bình |

---

## Dependencies

### External Dependencies

| Dependency           | Owner      | Required By     |
| -------------------- | ---------- | --------------- |
| Google OAuth         | Google     | Phase 1 Auth    |
| OpenAI API           | OpenAI     | Phase 3 AI      |
| Cổng thanh toán      | VNPay/Momo | Phase 2 Rewards |

### Internal Dependencies

| Feature              | Depends On      | Impact if Delayed                   |
| -------------------- | --------------- | ----------------------------------- |
| Lộ trình học tập AI  | Phân tích V2    | Thiếu dữ liệu để huấn luyện mô hình |
| Chợ phần thưởng      | Cổng thanh toán | Không thể đổi phần thưởng vật lý    |
| Thi đấu đồng đội     | Tournament V1   | Cần hạ tầng thời gian thực ổn định  |

---

## Risks

| Risk                     | Probability | Impact    | Mitigation                                          |
| ------------------------ | -------- | --------- | --------------------------------------------------- |
| Mô hình AI chất lượng thấp| Trung bình| Cao       | Thử nghiệm quy mô nhỏ trước khi triển khai diện rộng|
| Khả năng mở rộng thực tế | Trung bình| Cao       | Kiểm tra tải sớm, cơ chế dự phòng khi quá tải       |
| Nội dung thiếu đa dạng   | Thấp     | Trung bình| Hợp tác với các đối tác nội dung giáo dục uy tín    |
| Tốc độ chấp nhận thấp    | Trung bình| Cao       | Trò chơi hóa, chương trình giới thiệu, hợp tác trường học |

---

## Release Plan

| Release   | Version | Date       | Main Features       | Notes                |
| --------- | ------- | ---------- | ------------------- | -------------------- |
| Alpha     | 0.1.0   | 20/01/2026 | Nền tảng            | Thử nghiệm nội bộ    |
| Beta      | 0.5.0   | 05/02/2026 | Hoàn thiện MVP      | Giới hạn một số trường|
| GA        | 1.0.0   | 10/02/2026 | Sản phẩm chính thức | Thử nghiệm 10 trường |
| v1.5      | 1.5.0   | 20/02/2026 | Trò chơi hóa        | Phát hành công khai  |
| v2.0      | 2.0.0   | 28/02/2026 | Cá nhân hóa AI      | Các tính năng cao cấp|

---

## References

- [Overview](/specs)
- [Metrics](./metrics.md)
- [Constraints](./constraints.md)
