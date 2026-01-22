---
id: design
title: System Design
sidebar_label: Design
sidebar_position: 1
---

# System Design

Tổng quan kiến trúc hệ thống.

---

## High-Level Architecture

Hệ thống áp dụng **kiến trúc monolithic có module hóa rõ ràng**, hỗ trợ **multi-tenant** với cơ chế cách ly dữ liệu hoàn toàn giữa các trường.

```d2
direction: right

Web: Web Application
App: Application

Auth: Auth & RBAC Module
Tournament: Tournament Module
OtherModules: ... other modules

WSGateway: WebSocket Gateway
Realtime: Real-time Service
MsgQueue: Message Queue

Data Layer: {
  DB: Database {
    shape: cylinder
  }
  Redis: Redis Cache & Pub/Sub {
    shape: cylinder
  }
  Storage: File Storage
}

Web -> App
Web -> WSGateway: {style.stroke-dash: 5}

App -> Auth
App -> Tournament
App -> OtherModules

Auth -> Data Layer.DB
Tournament -> Data Layer.DB
OtherModules -> Data Layer.DB

Tournament -> Realtime
WSGateway -> Realtime
Realtime -> MsgQueue
MsgQueue -> Data Layer.Redis

App -> Data Layer.Redis
```

### Đặc điểm chính

1. **Modular Monolith**: Ứng dụng được tổ chức thành các module nghiệp vụ độc lập, dễ bảo trì và phát triển.
2. **Multi-Tenancy với Data Isolation**: Mỗi tenant (trường học) có không gian dữ liệu riêng, đảm bảo bảo mật và riêng tư.
3. **RBAC nghiêm ngặt**: 5 vai trò mặc định với quyền hạn được kiểm soát chặt chẽ.
4. **Kiến trúc hướng sự kiện**: Các module giao tiếp qua event, giảm phụ thuộc trực tiếp.
5. **Hỗ trợ thời gian thực**: WebSocket với Redis Pub/Sub cho thi đấu, thông báo, cập nhật bảng xếp hạng.
6. **Quản lý session đa thiết bị**: Hỗ trợ đăng xuất từ xa và theo dõi thiết bị.
7. **Chiến lược xóa dữ liệu linh hoạt**: Hỗ trợ cả hard delete và soft delete cascade.

### Sơ đồ luồng dữ liệu chính

- **Luồng học tập**: Tích hợp AI để đề xuất lộ trình cá nhân hóa.

```d2
shape: sequence_diagram

direction: right

HọcSinh: Học sinh
App: Web App
Learning: Learning Module
AI: AI Service
Cache: Redis Cache
DB: Database

HọcSinh -> App: Truy cập Dashboard
App -> Learning: GET /learning/path
Learning -> Cache: Kiểm tra cache lộ trình
Cache -> Learning: Cache miss
Learning -> DB: Lấy lịch sử học tập
DB -> Learning: Trả về dữ liệu học sinh
Learning -> AI: Gửi dữ liệu phân tích
AI -> Learning: Đề xuất lộ trình cá nhân hóa
Learning -> Cache: Lưu cache lộ trình
Learning -> App: Trả về lộ trình
App -> HọcSinh: Hiển thị lộ trình học tập
```

- **Luồng thi đấu**: Thời gian thực từ đăng ký đến công bố kết quả.

```d2
shape: sequence_diagram

direction: right

HọcSinh: Học sinh
WS: WebSocket Client
WSServer: WebSocket Server
Tournament: Tournament Module
Redis: Redis Pub/Sub
Presence: Presence Service
DB: Database

HọcSinh -> WS: Kết nối WebSocket
WS -> WSServer: Authentication
WSServer -> Tournament: Xác thực token
Tournament -> DB: Kiểm tra session
DB -> Tournament: Xác thực thành công
Tournament -> WSServer: Duyệt kết nối
WSServer -> Presence: Đăng ký online
WSServer -> WS: Kết nối thành công
HọcSinh -> WS: Tham gia phòng thi đấu
WS -> WSServer: joinRoom command
WSServer -> Tournament: Kiểm tra quyền
Tournament -> DB: Kiểm tra trạng thái giải đấu
DB -> Tournament: Giải đấu đang hoạt động
Tournament -> WSServer: Cho phép vào phòng
WSServer -> Presence: Thêm vào phòng
WSServer -> Redis: Broadcast user_joined
HọcSinh -> WS: Gửi câu trả lời
WS -> WSServer: submitAnswer
WSServer -> Tournament: Xử lý câu trả lời
Tournament -> DB: Lưu điểm
DB -> Tournament: Cập nhật thành công
Tournament -> Redis: Cập nhật bảng xếp hạng
Tournament -> Redis: Publish score_update
Redis -> WSServer: Broadcast tới phòng
WSServer -> WS: Cập nhật điểm cho tất cả
Tournament -> DB: Kết thúc giải đấu
DB -> Tournament: Lưu kết quả cuối
Tournament -> Redis: Publish competition_end
Tournament -> Presence: Xóa phòng
WSServer -> WS: Hiển thị kết quả cuối
```

- **Luồng liên kết phụ huynh - học sinh**: Xác thực OTP và chia sẻ dữ liệu an toàn.

```d2
shape: sequence_diagram

PhụHuynh: Phụ huynh
HọcSinh: Học sinh
App: Application
Auth: Auth Module
ParentLink: ParentLink Service
DB: Database
Analytics: Analytics Module

PhụHuynh -> App: Yêu cầu liên kết với học sinh
App -> Auth: Xác thực role phụ huynh
Auth -> ParentLink: Khởi tạo liên kết
ParentLink -> DB: Kiểm tra học sinh & tenant
DB -> ParentLink: Học sinh hợp lệ

ParentLink -> PhụHuynh: Gửi OTP qua email
PhụHuynh -> App: Nhập OTP
App -> ParentLink: Xác thực OTP
ParentLink -> DB: Tạo ParentStudentLink
DB -> ParentLink: Liên kết thành công
ParentLink -> Auth: Cập nhật quyền truy cập

PhụHuynh -> App: Xem dashboard học sinh
App -> Analytics: GET /analytics/student
Analytics -> DB: Lấy dữ liệu học tập
DB -> Analytics: Tiến độ và điểm số
Analytics -> Analytics: Tạo báo cáo
Analytics -> App: Trả về analytics
App -> PhụHuynh: Hiển thị dashboard
```

- **Luồng quản lý session**: Kiểm soát đa thiết bị và đăng xuất từ xa.

```d2
shape: sequence_diagram

NgườiDùng: Người dùng
Device1: Chrome
Device2: iPhone
App: Application
Auth: Auth Module
Session: Session Service
Redis: Redis Cache
DB: Database
WSServer: WebSocket Server

NgườiDùng -> Device1: Đăng nhập trên Chrome
Device1 -> App: POST /auth/login
App -> Auth: Xác thực thông tin
Auth -> DB: Tạo UserSession
Auth -> Redis: Lưu refresh token
Auth -> App: Trả về tokens
App -> Device1: Đăng nhập thành công

NgườiDùng -> Device2: Đăng nhập trên iPhone
Device2 -> App: POST /auth/login
App -> Auth: Xác thực thông tin
Auth -> Session: Kiểm tra giới hạn thiết bị
Session -> DB: Đếm session đang hoạt động
Session -> DB: Tìm session cũ nhất (vượt giới hạn)
DB -> Session: Session cũ nhất
Session -> DB: Thu hồi session cũ
Session -> Redis: Blacklist token cũ
Auth -> DB: Tạo UserSession mới
Auth -> App: Trả về tokens mới
App -> Device2: Đăng nhập thành công

NgườiDùng -> Device1: Xem session đang hoạt động
Device1 -> App: GET /auth/sessions
App -> Session: Lấy tất cả session
Session -> DB: Truy vấn UserSession
DB -> Session: Danh sách session
Session -> App: Chi tiết session
App -> Device1: Hiển thị danh sách session

NgườiDùng -> Device1: Đăng xuất iPhone từ xa
Device1 -> App: DELETE /auth/sessions/{id}
App -> Session: Thu hồi session cụ thể
Session -> DB: Cập nhật session
Session -> Redis: Thêm vào blacklist
Session -> WSServer: Gửi force_logout
WSServer -> Device2: Ép đăng xuất
Device2 -> NgườiDùng: Tự động đăng xuất
```

---

## Core Design Principles

### Phát triển
- **Single Responsibility**: Mỗi module chỉ đảm nhận một phạm vi nghiệp vụ.
- **Dependency Injection**: Dễ dàng testing và thay thế thành phần.
- **Repository Pattern**: Tách biệt logic nghiệp vụ và truy cập dữ liệu.
- **Event-Driven Communication**: Giảm coupling giữa các module.

### Bảo mật
- **Least Privilege**: Người dùng chỉ có quyền tối thiểu cần thiết.
- **Tenant Isolation**: Dữ liệu giữa các trường hoàn toàn độc lập.
- **Defense in Depth**: Nhiều lớp bảo vệ cho dữ liệu nhạy cảm.
- **Audit Logging**: Ghi lại đầy đủ hoạt động quan trọng.

### Thời gian thực
- **Connection Management**: Quản lý kết nối WebSocket hiệu quả.
- **Room-based Architecture**: Tổ chức phòng ảo cho thi đấu và lớp học.
- **Event-driven Updates**: Cập nhật real-time qua Redis Pub/Sub.
- **Graceful Degradation**: Fallback về polling khi WebSocket không khả dụng.

### Quản lý dữ liệu
- **Selective Soft Delete**: Chỉ áp dụng soft delete cho các thực thể chính.
- **Cascade Delete Strategy**: Kết hợp hard delete (DB) và soft delete (app).
- **Tenant Lifecycle**: Hỗ trợ đầy đủ trạng thái tenant (ACTIVE, SUSPENDED, PENDING_DEACTIVATION).
- **RBAC via Roles**: Loại người dùng được xác định qua role, không lưu trực tiếp.

---

## Requirements Mapping

Kiến trúc được thiết kế để đáp ứng toàn bộ yêu cầu nghiệp vụ (BR) và chức năng (FR) từ tài liệu đặc tả. Các module chính bao gồm:
- **Auth & RBAC**: Đăng ký, xác thực, phân quyền, multi-tenancy.
- **Learning**: Lộ trình AI, nội dung học, video bài giảng, bài tập.
- **Tournament**: Thi đấu thời gian thực, giải đấu, bảng xếp hạng.
- **Content**: Quản lý nội dung, ngân hàng câu hỏi, đóng góp của giáo viên.
- **Reporting**: Báo cáo 4 cấp, PDF định kỳ, biểu đồ tiến độ.
- **Gamification**: Huy hiệu, streak, phần thưởng, cửa hàng đổi thưởng.

---

## Deployment & Operations

Hệ thống được thiết kế để triển khai **on-premise** tại các trường học, hỗ trợ **multi-tenant** trên một instance. Các nguyên tắc triển khai bao gồm:
- **Container-based**: Docker với Docker Compose.
- **CI/CD Pipeline**: Triển khai tự động với khả năng rollback.
- **High Availability**: Cluster Redis, load balancer hỗ trợ WebSocket.
- **Monitoring**: Giám sát ứng dụng, log tập trung, metric nghiệp vụ.
- **Disaster Recovery**: Backup tự động, phục hồi nhanh (RTO < 4 giờ).

---

## References

- [Business Overview](../00-planning/stories.md)
- [Requirements](../00-planning/stories.md)
- [Constraints](../00-planning/constraints.md)
- [Roadmap](../00-planning/stories.md)
- [BE](./backend.md)
- [FE](./frontend.md)
- [Data](./database.md)
- [Stack](./tech-stack.md)