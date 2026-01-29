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

| ID       | Ràng buộc                           | Tác động             | Lý do                    |
| -------- | ----------------------------------- | -------------------- | ------------------------ |
| `BC-001` | Timeline theo [Roadmap](roadmap.md) | Không thể gia hạn    | Cam kết các bên          |
| `BC-002` | MVP theo Milestone M5 (Release)     | Ảnh hưởng phase 2    | Kế hoạch release cố định |
| `BC-003` | Chỉ web phase 1                     | Mobile delay         | Ưu tiên responsive web   |
| `BC-004` | Ngân sách giới hạn                  | Ưu tiên P0, P1       | Tối ưu chi phí           |
| `BC-005` | Công nghệ open source               | Giảm chi phí license | Phù hợp startup          |
| `BC-006` | On-premise deployment               | Giảm chi phí cloud   | Phù hợp trường học VN    |
| `BC-007` | 3 môn học (Toán, TV, Toán TA)       | Giới hạn phạm vi     | Tập trung core           |
| `BC-008` | Tự host video                       | Không YouTube/Vimeo  | Bản quyền, tốc độ        |

---

## Technical Constraints

### Hiệu năng {#performance}

| ID            | Ràng buộc                    | Mục tiêu |
| :------------ | :--------------------------- | :------- |
| `NFR-PERF-01` | Xử lý Concurrent Users       | 10,000   |
| `NFR-PERF-02` | Độ trễ (Latency) khi thi đấu | < 100ms  |
| `NFR-PERF-03` | Thời gian phản hồi API       | < 200ms  |
| `NFR-PERF-04` | Thời gian tải trang          | < 3s     |
| `NFR-PERF-05` | Thời gian kết nối WebSocket  | < 500ms  |

### Bảo mật {#security}

| ID           | Ràng buộc                     | Chỉ số            |
| :----------- | :---------------------------- | :---------------- |
| `NFR-SEC-01` | Phân quyền RBAC (5 roles)     | Role-based access |
| `NFR-SEC-02` | Mã hóa TLS 1.3                | Data security     |
| `NFR-SEC-03` | Xác thực JWT & Refresh Token  | Auth              |
| `NFR-SEC-04` | Xác thực 2FA cho Admin (TOTP) | Admin security    |
| `NFR-SEC-05` | Quản lý Multi-device Session  | Session control   |

### Kiến trúc {#architecture}

| ID           | Ràng buộc                              | Lý do                    |
| :----------- | :------------------------------------- | :----------------------- |
| `TC-ARCH-01` | Kiến trúc Modular Monolith             | Đội nhỏ, deploy đơn giản |
| `TC-ARCH-02` | Database PostgreSQL 14+ / Prisma       | JSONB, transactions      |
| `TC-ARCH-03` | Caching với Redis 6+                   | Cache, Pub/Sub           |
| `TC-ARCH-04` | Container hóa với Docker               | Deployment nhất quán     |
| `TC-ARCH-05` | Realtime với Socket.IO + Redis Adapter | Mở rộng WebSocket        |
| `TC-ARCH-06` | Cô lập dữ liệu Multi-tenant            | Bảo mật                  |

---

## Assumptions

| ID       | Giả định           | Rủi ro nếu sai | Biện pháp giảm thiểu                   |
| :------- | :----------------- | :------------- | :------------------------------------- |
| `AS-001` | Mạng ổn định       | Không học/thi  | Caching, tải dần nội dung              |
| `AS-002` | Trường có IT admin | Khó vận hành   | Đào tạo, hỗ trợ 24/7                   |
| `AS-003` | Email hợp lệ       | Chặn đăng ký   | Hướng dẫn kiểm tra Spam / Hỗ trợ Admin |
| `AS-004` | Docker có sẵn      | Không deploy   | Thay thế bằng VM image                 |

---
