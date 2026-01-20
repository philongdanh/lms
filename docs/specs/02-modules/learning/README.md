---
id: learning-overview
title: Learning Overview
sidebar_label: Overview
sidebar_position: 1
---

# Learning & Personalization - Business Logic

Chi tiết đặc tả cho module Learning & Personalization - Business Logic.

---

## Business Context

- **Module**: Learning & Personalization
- **Version**: 1.0
- **Status**: Approved
- **Cập nhật lần cuối**: 2026-01-14

---

## Overview

Module cốt lõi cho Students, chịu trách nhiệm về Adaptive Learning Path,
Progress Tracking và Knowledge Map. Cung cấp tính năng học tập thích ứng dựa
trên AI để cá nhân hóa trải nghiệm học tập.

---

## Use Cases

| Use Case ID  | Use Case Name          | Description                                            | Priority | Status  |
| ------------ | ---------------------- | ------------------------------------------------------ | -------- | ------- |
| UC-LEARN-001 | Get Personalized Path  | Lấy lộ trình học tập cá nhân hóa dựa trên phân tích AI | P0       | Planned |
| UC-LEARN-002 | View Knowledge Map     | Xem bản đồ kiến thức và các lỗ hổng kiến thức          | P1       | Planned |
| UC-LEARN-003 | View Lesson Details    | Xem chi tiết bài học và tài liệu học tập               | P0       | Planned |
| UC-LEARN-004 | Track Progress         | Ghi nhận tiến độ học tập (video, quiz)                 | P0       | Planned |
| UC-LEARN-005 | Start Practice Session | Bắt đầu phiên luyện tập bài tập                        | P1       | Planned |
| UC-LEARN-006 | Submit Answer          | Nộp câu trả lời và nhận kết quả ngay lập tức           | P0       | Planned |

### UC-LEARN-001: Get Personalized Path

**Actor**: Student **Preconditions**: Student đã đăng nhập và có dữ liệu lịch sử
học tập (hoặc mặc định). **Luồng chính**:

1. Student truy cập Dashboard.
2. System gọi Path Service.
3. Service lấy dữ liệu từ Knowledge Map và History.
4. AI Model phân tích và đề xuất danh sách bài học.
5. System hiển thị lộ trình học tập.

**Hậu điều kiện**: Lộ trình học tập được hiển thị. **Ngoại lệ**: Lỗi AI Service
-> Fallback về lộ trình mặc định.

### UC-LEARN-006: Submit Answer

---

## References

- [Logic](./logic.md)
- [Data Model](./data.md)
- [API](./api.md)
- [Tests](./tests.md)
