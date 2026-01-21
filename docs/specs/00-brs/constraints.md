---
id: constraints
title: Constraints
sidebar_label: Constraints
sidebar_position: 6
---

# Constraints

Các ràng buộc kỹ thuật và nghiệp vụ.

---

## Technical Constraints

| ID         | Constraint                    | Impact                              | Rationale                                    |
| ---------- | ----------------------------- | ----------------------------------- | -------------------------------------------- |
| **TC-001** | Monolithic với modularization | Triển khai đơn giản, gỡ lỗi dễ dàng | Đội ngũ nhỏ, cần đơn giản trong vận hành     |
| **TC-002** | PostgreSQL 14+ với Prisma 7   | Hỗ trợ JSONB, giao dịch mạnh        | Cần tính toàn vẹn dữ liệu cho điểm số        |
| **TC-003** | Redis 6+ cho cache và Pub/Sub | Độ trễ dưới mili giây               | Tính năng thời gian thực yêu cầu độ trễ thấp |
| **TC-004** | Docker containerization       | Triển khai nhất quán                | Hỗ trợ triển khai tại chỗ                    |
| **TC-005** | Socket.IO với Redis adapter   | Mở rộng ngang cho WebSocket         | Hỗ trợ đa tiến trình thời gian thực          |

### Hạ tầng

- Yêu cầu Docker và Docker Compose.
- Nginx làm cân bằng tải với hỗ trợ WebSocket.
- Lưu trữ tệp tin cục bộ (có thể mở rộng sang S3).

### Công nghệ

- NestJS Framework với TypeScript.
- Next.js với TypeScript cho giao diện người dùng.
- Xác thực JWT với cơ chế chặn mã thông báo làm mới.

### Tích hợp

- Dịch vụ email (SMTP hoặc bên thứ ba).
- Dịch vụ AI cho phân tích nâng cao.
- Dịch vụ CDN tùy chọn cho truyền tải video.

---

## Business Constraints

| ID         | Constraint                                | Impact                        | Rationale                                      |
| ---------- | ----------------------------------------- | ----------------------------- | ---------------------------------------------- |
| **BC-001** | Chỉ hỗ trợ 3 môn học                      | Phạm vi ban đầu giới hạn      | Tập trung vào Toán, Tiếng Việt, Toán tiếng Anh |
| **BC-002** | Nền tảng chỉ trình duyệt web              | Không có ứng dụng di động gốc | Thiết kế đáp ứng thay thế                      |
| **BC-003** | Quản lý theo khối lớp, không theo lớp học | Đơn giản hóa mô hình dữ liệu  | Phù hợp mô hình giáo dục Việt Nam              |

### Ngân sách

- Triển khai tại chỗ để giảm chi phí đám mây.
- Sử dụng công nghệ nguồn mở.

### Tiến độ

- MVP trong 1.5 tháng (tháng 1 & tháng 2/2026).
- Tính năng đầy đủ trong 2 tháng.

### Nguồn lực

- Đội ngũ nhỏ (dưới 10 lập trình viên).
- Cần sự đơn giản trong vận hành.

---

## Assumptions

| ID         | Assumption                          | Risk if False        | Mitigation                   |
| ---------- | ----------------------------------- | -------------------- | ---------------------------- |
| **AS-001** | Người dùng có kết nối mạng ổn định  | Không thể học        | Cải tiến lũy tiến            |
| **AS-002** | Trường có quản trị viên CNTT cơ bản | Khó vận hành         | Tài liệu đào tạo và hỗ trợ   |
| **AS-003** | Email hợp lệ để đăng ký             | Chặn đăng ký         | Tùy chọn xác thực thay thế   |
| **AS-004** | Môi trường Docker có sẵn            | Không thể triển khai | Tài liệu triển khai chi tiết |

---

## References

- [Business Overview](/specs)
- [Success Metrics](./metrics.md)
- [System Design](../01-architecture/system-design.md)
