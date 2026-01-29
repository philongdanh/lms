---
id: constraints
title: Constraints
sidebar_label: Constraints
sidebar_position: 4
---

# Constraints

Các ràng buộc kỹ thuật và nghiệp vụ.

---

## Business Constraints

| ID     | Ràng buộc                     | Tác động             | Lý do                    |
| ------ | ----------------------------- | -------------------- | ------------------------ |
| BC-001 | Timeline: 25/01 - 15/03/2026  | Không thể gia hạn    | Cam kết các bên          |
| BC-002 | MVP trước 15/02/2026          | Ảnh hưởng phase 2    | Kế hoạch release cố định |
| BC-003 | Chỉ web phase 1               | Mobile delay         | Ưu tiên responsive web   |
| BC-004 | Ngân sách giới hạn            | Ưu tiên P0, P1       | Tối ưu chi phí           |
| BC-005 | Công nghệ open source         | Giảm chi phí license | Phù hợp startup          |
| BC-006 | On-premise deployment         | Giảm chi phí cloud   | Phù hợp trường học VN    |
| BC-007 | 3 môn học (Toán, TV, Toán TA) | Giới hạn phạm vi     | Tập trung core           |
| BC-008 | Tự host video                 | Không YouTube/Vimeo  | Bản quyền, tốc độ        |

---

## Technical Constraints

### Performance

| ID          | Ràng buộc           | Mục tiêu |
| ----------- | ------------------- | -------- |
| NFR-PERF-01 | Concurrent users    | 10,000   |
| NFR-PERF-02 | Competition latency | < 100ms  |
| NFR-PERF-03 | API response time   | < 200ms  |
| NFR-PERF-04 | Page load time      | < 3s     |
| NFR-PERF-05 | WebSocket connect   | < 500ms  |

### Security

| ID         | Ràng buộc               | Chỉ số            |
| ---------- | ----------------------- | ----------------- |
| NFR-SEC-01 | RBAC with 5 roles       | Role-based access |
| NFR-SEC-02 | TLS 1.3 encryption      | Data security     |
| NFR-SEC-03 | JWT with refresh token  | Auth              |
| NFR-SEC-04 | 2FA for admin (TOTP)    | Admin security    |
| NFR-SEC-05 | Multi-device management | Session control   |

### Architecture

| ID         | Ràng buộc                   | Lý do                    |
| ---------- | --------------------------- | ------------------------ |
| TC-ARCH-01 | Modular Monolith            | Đội nhỏ, deploy đơn giản |
| TC-ARCH-02 | PostgreSQL 14+ / Prisma     | JSONB, transactions      |
| TC-ARCH-03 | Redis 6+                    | Cache, Pub/Sub           |
| TC-ARCH-04 | Docker containerization     | Deployment nhất quán     |
| TC-ARCH-05 | Socket.IO + Redis adapter   | Mở rộng WebSocket        |
| TC-ARCH-06 | Multi-tenant data isolation | Bảo mật                  |

---

## Assumptions

| ID     | Giả định           | Rủi ro nếu sai | Biện pháp giảm thiểu      |
| ------ | ------------------ | -------------- | ------------------------- |
| AS-001 | Mạng ổn định       | Không học/thi  | Caching, tải dần nội dung |
| AS-002 | Trường có IT admin | Khó vận hành   | Đào tạo, hỗ trợ 24/7      |
| AS-003 | Email hợp lệ       | Chặn đăng ký   | SMS OTP dự phòng          |
| AS-004 | Docker có sẵn      | Không deploy   | Thay thế bằng VM image    |

---
