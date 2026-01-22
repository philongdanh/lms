---
id: overview
title: Overview
sidebar_label: Overview
sidebar_position: 1
---

# Business Overview

Tầm nhìn, phạm vi và bối cảnh chiến lược.

---

## Vision

Nền tảng học tập thông minh tích hợp AI và gamification, hỗ trợ cá nhân hóa trải nghiệm học tập và tăng cường động lực thông qua cơ chế thi đấu.

---

## Problem Statement

| Aspect     | Description                                             |
| ---------- | ------------------------------------------------------- |
| Vấn đề     | Học sinh thiếu động lực và lộ trình học tập cá nhân hóa |
| Ảnh hưởng  | Học sinh từ lớp 1-12, phụ huynh, giáo viên              |
| Hiện trạng | Học tập truyền thống không cá nhân hóa                  |
| Cơ hội     | Kết hợp AI và gamification để tối ưu trải nghiệm        |

---

## Solution

| Aspect            | Description                                               |
| ----------------- | --------------------------------------------------------- |
| Tiếp cận          | Nền tảng học tập số toàn diện với AI và gamification      |
| Tính năng cốt lõi | AI Learning Paths, Tournament, Gamification, Multi-tenant |
| Điểm khác biệt    | Cá nhân hóa AI và cơ chế thi đấu                          |

---

## High-Level Scope

> **Chi tiết phạm vi và ràng buộc cụ thể: xem [Constraints](./constraints.md)**

### Trong phạm vi
- Nền tảng học tập số tích hợp AI và gamification
- 3 môn học chính (Toán, Tiếng Việt, Toán tiếng Anh)
- Hệ thống thi đấu thời gian thực
- Báo cáo 4 cấp cho phụ huynh và nhà trường
- Multi-tenancy với tùy chỉnh giao diện

### Ngoài phạm vi (Giai đoạn 1)
- Ứng dụng di động native
- Chế độ học tập offline
- Tích hợp video từ nền tảng bên thứ ba

---

## Stakeholders

| Role          | Responsibility         | Involvement          |
| ------------- | ---------------------- | -------------------- |
| Product Owner | Tầm nhìn và ưu tiên    | Định hướng sản phẩm  |
| Tech Lead     | Quyết định kỹ thuật    | Kiến trúc hệ thống   |
| UX Designer   | Thiết kế UX/UI         | Trải nghiệm người dùng |
| Sponsor       | Ngân sách và nguồn lực | Phê duyệt và hỗ trợ  |

---

## Target Users

| User Segment | Role | Core Needs | Key Pain Points |
| :--- | :--- | :--- | :--- |
| **Học sinh Tiểu học** | Phi Long (7-11 tuổi) | Học tập vui vẻ, tích điểm, thi đấu | Mất tập trung, áp lực so sánh, chán nản nếu bài dài |
| **Học sinh THCS** | Minh Lưng (12-15 tuổi) | Cải thiện điểm số, tự học, biết điểm yếu | Không biết ôn gì, bài tập quá tải, thiếu feedback nhanh |
| **Phụ huynh** | Nhựt Linh | Theo dõi tiến độ, nhận thông báo | Ít thời gian, không nắm được chương trình mới, lo con chơi game |
| **Giáo viên** | Giáo viên | Quản lý lớp, tạo đề nhanh, theo dõi học sinh | Soạn đề thủ công lâu, khó theo sát từng em |
| **Trường học** | Admin | Quản lý tổng quan, báo cáo, tổ chức thi | Nhập liệu phức tạp, khó tổng hợp báo cáo |

---

## Value Proposition

- **Cho học sinh**: Lộ trình học AI cá nhân hóa, thi đấu hấp dẫn, bảng thành tích, hệ thống streak và phần thưởng.
- **Cho phụ huynh**: Báo cáo chi tiết 4 cấp, biểu đồ tiến độ, báo cáo PDF định kỳ.
- **Cho giáo viên**: Bộ công cụ quản lý toàn diện, ngân hàng câu hỏi chia sẻ.
- **Cho trường học**: Cách ly đa thực thể, tổ chức giải đấu, dữ liệu tổng hợp.

---

## High-Level Timeline

> **Chi tiết timeline và deadlines: xem [Roadmap](./roadmap.md) và [Constraints](./constraints.md#timeline-constraints)**

### Giai đoạn 1 (25/01 - 15/02/2026)
- MVP: Học tập cốt lõi và thi đấu
- Nền tảng web responsive

### Giai đoạn 2 (16/02 - 01/03/2026)
- Tính năng nâng cao và gamification

### Giai đoạn 3 (02/03 - 15/03/2026)
- AI Personalization và hoàn thiện toàn bộ tính năng

---

## Success Criteria

| Criteria             | Target                      | Measurement        |
| -------------------- | --------------------------- | ------------------ |
| Tương tác người dùng | 70% DAU/MAU                 | Theo dõi phân tích |
| Hoàn thành bài học   | 80% khóa học                | Theo dõi tiến độ   |
| Tham gia thi đấu     | 50% người dùng đủ điều kiện | Chỉ số giải đấu    |
| Duy trì streak       | 30% người dùng đạt streak 7+ ngày | Hệ thống gamification |

---

## References

- [Requirements](./requirements.md)
- [Product Roadmap](./roadmap.md)
- [Constraints](./constraints.md)
- [Metrics](./metrics.md)