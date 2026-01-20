---
id: constraints
title: Constraints
sidebar_label: Constraints
sidebar_position: 5
---

# Constraints

Các ràng buộc kỹ thuật và nghiệp vụ định hình thiết kế hệ thống.

---

## Technical Constraints

| ID         | Constraint                    | Impact                           | Rationale                               |
| ---------- | ----------------------------- | -------------------------------- | --------------------------------------- |
| **TC-001** | Monolithic với modularization | Deploy đơn giản, debug dễ dàng   | Team nhỏ, cần đơn giản trong vận hành   |
| **TC-002** | PostgreSQL 14+ với Prisma 7   | Hỗ trợ JSONB, transactions mạnh  | Cần ACID cho scoring và data integrity  |
| **TC-003** | Redis 6+ cho cache và Pub/Sub | Độ trễ dưới millisecond          | Tính năng real-time yêu cầu low latency |
| **TC-004** | Docker containerization       | Deploy nhất quán                 | Hỗ trợ on-premise deployment            |
| **TC-005** | Socket.IO với Redis adapter   | Horizontal scaling cho WebSocket | Hỗ trợ real-time multi-instance         |

### Infrastructure

- Yêu cầu Docker và Docker Compose
- Nginx làm load balancer với hỗ trợ WebSocket
- Lưu trữ file local (có thể mở rộng sang S3)

### Technology

- NestJS Framework với TypeScript
- Next.js (React) với TypeScript cho frontend
- JWT authentication với refresh token blacklisting

### Integration

- Email service (SMTP hoặc third-party)
- AI service (Python microservice) cho advanced analytics
- CDN services tùy chọn cho video streaming

---

## Business Constraints

| ID         | Constraint                                | Impact                     | Rationale                                      |
| ---------- | ----------------------------------------- | -------------------------- | ---------------------------------------------- |
| **BC-001** | Chỉ hỗ trợ 3 môn học                      | Phạm vi ban đầu giới hạn   | Tập trung vào Toán, Tiếng Việt, Toán tiếng Anh |
| **BC-002** | Nền tảng chỉ web                          | Không có native mobile app | Thiết kế responsive thay thế                   |
| **BC-003** | Quản lý theo khối lớp, không theo lớp học | Đơn giản hóa data model    | Phù hợp mô hình giáo dục Việt Nam              |

### Budget

- On-premise deployment để giảm chi phí cloud
- Sử dụng công nghệ open-source

### Timeline

- MVP trong 3 tháng
- Full feature trong 6 tháng

### Resources

- Team nhỏ (< 10 developers)
- Cần đơn giản trong vận hành

---

## Assumptions

| ID         | Assumption                     | Risk if Wrong    | Mitigation                 |
| ---------- | ------------------------------ | ---------------- | -------------------------- |
| **AS-001** | Người dùng có Internet ổn định | Không thể học    | Progressive enhancement    |
| **AS-002** | Trường có IT admin cơ bản      | Khó vận hành     | Tài liệu đào tạo và hỗ trợ |
| **AS-003** | Email hợp lệ để đăng ký        | Chặn đăng ký     | Tùy chọn auth thay thế     |
| **AS-004** | Môi trường Docker có sẵn       | Không thể deploy | Tài liệu deploy chi tiết   |

---

## References

- [Business Overview](/specs)
- [Success Metrics](./metrics.md)
- [System Design](../01-architecture/system-design.md)
