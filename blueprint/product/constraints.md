---
id: constraints
title: Constraints
sidebar_label: Constraints
sidebar_position: 2
---

# Constraints

Các ràng buộc dự án và tiêu chuẩn chất lượng

---

## Business Constraints

| ID       | Ràng buộc               | Tác động                  | Lý do                   |
| :------- | :---------------------- | :------------------------ | :---------------------- |
| `BC-001` | 20/01 - 22/03/2026      | Không thể gia hạn         | Hard Deadline           |
| `BC-002` | Fixed Scope (MVP)       | Ảnh hưởng phase 2         | Budget/Timeline cố định |
| `BC-003` | Web Responsive (No App) | Mobile UX giới hạn        | Tối ưu chi phí          |
| `BC-004` | Ngân sách giới hạn      | Ưu tiên P0, P1            | Startup Runway          |
| `BC-005` | Open Source             | Giảm chi phí license      | Tối ưu OpEx             |
| `BC-006` | On-premise (Self-host)  | Không dùng CDN thuê ngoài | Bảo mật / Pháp lý       |
| `BC-007` | 3 Môn (Toán, TV, TA)    | Ràng buộc Content         | Nguồn lực SME           |
| `BC-008` | Email-first Auth        | Chưa có Social Login      | Giảm phức tạp pháp lý   |

---

## Technical Constraints

| ID       | Thuộc tính | Ràng buộc                  | Metric                 |
| :------- | :--------- | :------------------------- | :--------------------- |
| `TC-001` | Hiệu năng  | Xử lý Concurrent Users     | 10,000 CCU             |
| `TC-002` | Hiệu năng  | Độ trễ thi đấu             | < 100ms (99th)         |
| `TC-003` | Hiệu năng  | API Response Time          | < 200ms (avg)          |
| `TC-004` | Hiệu năng  | Page Load Time             | < 3s (FCP)             |
| `TC-005` | Hiệu năng  | WS Connect Time            | < 500ms                |
| `TC-006` | Bảo mật    | RBAC (5 roles)             | Strict Least Privilege |
| `TC-007` | Bảo mật    | TLS 1.3                    | A+ SSL Labs Rating     |
| `TC-008` | Bảo mật    | JWT & Refresh Token        | Standard Security      |
| `TC-009` | Bảo mật    | Admin 2FA (TOTP)           | Mandatory for Admin    |
| `TC-010` | Bảo mật    | Multi-device Session       | Max 3 active sessions  |
| `TC-011` | Bảo mật    | Rate Limiting & Anti-cheat | WAF & App Logic        |

---

## Assumptions

| ID       | Giả định           | Rủi ro nếu sai | Biện pháp giảm thiểu                   |
| :------- | :----------------- | :------------- | :------------------------------------- |
| `AS-001` | Mạng ổn định       | Không học/thi  | Caching, tải dần nội dung              |
| `AS-002` | Trường có IT admin | Khó vận hành   | Đào tạo, hỗ trợ 24/7                   |
| `AS-003` | Email hợp lệ       | Chặn đăng ký   | Hướng dẫn kiểm tra Spam / Hỗ trợ Admin |
| `AS-004` | Docker có sẵn      | Không deploy   | Thay thế bằng VM image                 |

---
