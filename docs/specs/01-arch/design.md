---
id: design
title: Design
sidebar_label: Design
sidebar_position: 1
---

# System Design

Tổng quan kiến trúc hệ thống và luồng dữ liệu.

---

## High-Level Architecture

### Sơ đồ kiến trúc

Hệ thống sử dụng **kiến trúc monolithic** với hỗ trợ **multi-tenant** - mỗi
trường học là một tenant độc lập, đảm bảo cách ly dữ liệu hoàn toàn.

```d2
direction: down

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

### Tính năng kiến trúc chính

1. **Monolithic với Clear Modularization**: Ứng dụng được tổ chức thành các
   module nghiệp vụ độc lập, mỗi module xử lý một nhóm chức năng cụ thể, giúp
   bảo trì và phát triển dễ dàng.

2. **Multi-Tenant với Data Isolation**: Mỗi trường (tenant) có không gian dữ
   liệu riêng biệt. Dữ liệu được tách biệt thông qua cơ chế `tenant_id` trong
   tất cả các bảng quan trọng, đảm bảo quyền riêng tư và bảo mật.

3. **RBAC Authorization nghiêm ngặt**: Hệ thống áp dụng mô hình Role-Based
   Access Control với 5 roles được seed sẵn: `root-admin`, `tenant-admin`,
   `teacher`, `parent`, `student`. Loại người dùng được xác định hoàn toàn thông
   qua RBAC roles.

4. **Event-Driven Architecture**: Các module giao tiếp với nhau thông qua hệ
   thống event nội bộ, giảm thiểu phụ thuộc trực tiếp và tăng tính linh hoạt.

5. **Real-time Architecture**: Kiến trúc real-time mạnh mẽ hỗ trợ thi đấu, thông
   báo, và cập nhật bảng xếp hạng tức thì.

6. **Cascade Delete Strategy**: Hỗ trợ cả hard delete cascade (database level)
   và soft delete cascade (application level) cho quản lý vòng đời dữ liệu.

7. **Multi-device Session Management**: Quản lý session đa thiết bị với khả năng
   đăng xuất từ xa và bảo mật cao.

8. **Scalable WebSocket Architecture**: Kiến trúc WebSocket có khả năng mở rộng
   với Redis adapter cho hỗ trợ cluster.

---

## Technology Stack

### Lớp Client

- **Framework**: Next.js with React, SSR/SSG
- **Language**: TypeScript
- **Component Library**: HeroUI with custom design system
- **Primary Font**: Nunito
- **Real-time**: Socket.IO client
- **State Management**: React Context + Zustand
- **Styling**: TailwindCSS với CSS modules

### Lớp Ứng dụng

- **Framework**: NestJS
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Cache**: Redis
- **Authentication**: JWT với refresh token blacklisting
- **Real-time**: WebSocket (Socket.IO) với Redis adapter
- **Message Queue**: Redis Pub/Sub cho real-time events
- **Logging**: Structured logging với centralized storage
- **2FA**: TOTP implementation cho admin accounts

### Phát triển & Vận hành

- **Containerization**: Docker với multi-stage builds
- **Orchestration**: Docker Compose
- **Version Control**: Git
- **Code Quality**: ESLint, Prettier
- **Testing**: Jest, Supertest, Testing Library
- **CI/CD**: Automated deployment với rollback capability
- **Load Balancer**: Nginx với WebSocket support

### Công nghệ hỗ trợ

- **AI Service**: Python microservice for advanced analytics
- **File Storage**: Local storage for on-premise
- **Logging Stack**: Centralized logging with query and analysis
- **Background Jobs**: Bull queue with Redis for delayed tasks

---

## Core Components

### Lớp Client

- **Thành phần**: Single Page Application (SPA) với server-side rendering
- **Người dùng mục tiêu**: Tất cả người dùng (Học sinh, Phụ huynh, Giáo viên,
  Quản trị viên)
- **Các tính năng chính**:
  - Giao diện tương tác cho học tập và thi đấu
  - Dashboard đa vai trò với cập nhật thời gian thực
  - Cập nhật thời gian thực cho các cuộc thi và bảng xếp hạng qua WebSocket
  - Giao diện Gamification với cửa hàng đổi thưởng tích hợp
  - Thông báo thời gian thực và trạng thái hiện diện
  - Quản lý thiết bị đăng nhập và quản lý session
  - Thiết kế Responsive cho mobile, tablet, desktop

### Lớp Ứng dụng

#### Module nghiệp vụ

| Module                 | Main Functions                                                                             | Corresponding FR         | Tech Stack                       |
| ---------------------- | ------------------------------------------------------------------------------------------ | ------------------------ | -------------------------------- |
| **Auth & RBAC Module** | Quản lý người dùng, phân quyền RBAC, session đa thiết bị, liên kết phụ huynh-học sinh, 2FA | FR-AUTH-01 to FR-AUTH-09 | NestJS, JWT, Redis, Prisma       |
| **Tournament Module**  | Tổ chức thi đấu và đấu trường đa cấp, thi đấu thời gian thực                               | FR-COMP-01 to FR-COMP-09 | NestJS, Socket.IO, Redis Pub/Sub |
| **... other modules**  | Học tập, Phân tích, Nội dung, Admin, Gamification, Thông báo                               | Các FR khác              | Nhiều công nghệ khác             |

#### Module Real-time & WebSocket

- **WebSocket Gateway**: Điểm truy cập cho tất cả kết nối WebSocket, xử lý xác
  thực và định tuyến
- **Message Queue**: Redis Pub/Sub để đồng bộ sự kiện giữa các instance ứng dụng
- **Presence Service**: Theo dõi trạng thái online/offline của người dùng, quản
  lý phòng thi đấu
- **Real-time Cache**: Cache Redis tối ưu cho dữ liệu thời gian thực (bảng xếp
  hạng, dữ liệu session)
- **Event Bus**: Hệ thống sự kiện nội bộ cho giao tiếp thời gian thực giữa các
  module
- **Graceful Degradation**: Fallback về polling khi WebSocket không khả dụng

### Lớp Dữ liệu

#### Cơ sở dữ liệu chính

- **Vai trò**: Lưu trữ dữ liệu nghiệp vụ chính
- **Chiến lược Multi-tenant**:
  - Sử dụng `tenant_id` để tách biệt dữ liệu giữa các trường
  - Row-level security cho dữ liệu nhạy cảm
  - Indexing tối ưu cho các truy vấn phân tích
  - Database sharding theo tenant khi mở rộng lớn
- **Cấu trúc nội dung**:
  - Tổ chức theo: Môn học (Subject) → Khối lớp (Grade) → Chủ đề (Topic) (có
    trạng thái hiển thị) → Bài học (Lesson) (theo học kỳ)
  - Bảng `topics` có trường `is_active` để quản lý trạng thái hiển thị
- **Chiến lược Soft Delete**:
  - Chỉ áp dụng `deleted_at` cho: User, Topic, QuestionBank, Question, Exam,
    Tournament, Reward
  - Cascade delete ở cấp ứng dụng cho các bảng soft delete
- **Quản lý vòng đời Tenant**:
  - Trạng thái Tenant: ACTIVE, SUSPENDED, PENDING_DEACTIVATION
  - Thời gian ân hạn 30 ngày trước khi xóa hoàn toàn

#### Hệ thống Cache

- **Vai trò**: Cải thiện hiệu năng và hỗ trợ các tính năng thời gian thực
- **Ứng dụng chính**:
  - Lưu trữ session đăng nhập và quyền người dùng
  - Cache bảng xếp hạng và kết quả thi đấu
  - Cache nội dung truy cập thường xuyên (nội dung, câu hỏi)
  - Token blacklisting cho JWT refresh token
  - Theo dõi hiện diện thời gian thực và quản lý phòng
  - Lưu trữ Rate limiting
- **Redis Cluster**: Cho tính sẵn sàng cao và khả năng mở rộng

---

## Data Flow

### Luồng học tập

```d2
shape: sequence_diagram

Student: Student
App: Application
Learning: Learning Module
AI: AI Service
DB: Database
Cache: Redis Cache

Student -> App: Access personalized learning path
App -> Learning: GET /learning/path
Learning -> Cache: Check cached learning path
Cache -> Learning: Return cached path (Cache Hit) {
  style.stroke-dash: 5
}
Learning -> DB: Get learning history (Cache Miss)
DB -> Learning: Return student data {
  style.stroke-dash: 5
}
Learning -> AI: Send analysis data
AI -> Learning: Return personalized recommendations {
  style.stroke-dash: 5
}
Learning -> Cache: Cache learning path
Learning -> App: Personalized learning path {
  style.stroke-dash: 5
}
App -> Student: Display learning interface {
  style.stroke-dash: 5
}
```

### Luồng thi đấu thời gian thực

```d2
shape: sequence_diagram

Student: Student
WS: WebSocket Client
WSServer: WebSocket Server
Tournament: Tournament Module
Redis: Redis Cache/PubSub
DB: Database
Presence: Presence Service

Student -> WS: Connect WebSocket with JWT
WS -> WSServer: Authentication and connection
WSServer -> Tournament: Verify token & permissions
Tournament -> DB: Validate session
DB -> Tournament: Validation successful {
  style.stroke-dash: 5
}
Tournament -> WSServer: Connection approved {
  style.stroke-dash: 5
}
WSServer -> Presence: Register user online
WSServer -> WS: Connection established {
  style.stroke-dash: 5
}

Student -> WS: Join competition room
WS -> WSServer: joinRoom command
WSServer -> Tournament: Validate room access
Tournament -> DB: Check competition status
DB -> Tournament: Competition active {
  style.stroke-dash: 5
}
Tournament -> WSServer: Room join approved {
  style.stroke-dash: 5
}
WSServer -> Presence: Add user to room
WSServer -> Redis: Publish user_joined event

Student -> WS: Submit answer
WS -> WSServer: submitAnswer command
WSServer -> Tournament: Process answer
Tournament -> DB: Save answer & calculate score
DB -> Tournament: Score calculated {
  style.stroke-dash: 5
}
Tournament -> Redis: Update real-time leaderboard
Tournament -> Redis: Publish score_update event
Redis -> WSServer: Broadcast to room
WSServer -> WS: Update scores for all clients

Tournament -> DB: Finalize competition results
DB -> Tournament: Results saved {
  style.stroke-dash: 5
}
Tournament -> Redis: Publish competition_end event
Tournament -> Presence: Clear room
WSServer -> WS: Show final results
```

### Luồng quản lý phiên đa thiết bị

```d2
shape: sequence_diagram

User: User
Device1: Device 1
Device2: Device 2
App: Application
Auth: Auth Module
Session: Session Service
Redis: Redis Cache
DB: Database

User -> Device1: Login on Chrome
Device1 -> App: POST /auth/login
App -> Auth: Authenticate credentials
Auth -> DB: Create UserSession
Auth -> Redis: Store refresh token
Auth -> App: Return tokens {
  style.stroke-dash: 5
}
App -> Device1: Login successful {
  style.stroke-dash: 5
}

User -> Device2: Login on iPhone
Device2 -> App: POST /auth/login
App -> Auth: Authenticate credentials
Auth -> Session: Check device limit
Session -> DB: Count active sessions

Session -> DB: Find oldest session (Over limit)
DB -> Session: Oldest session {
  style.stroke-dash: 5
}
Session -> DB: Revoke oldest session
Session -> Redis: Blacklist old token
Auth -> DB: Create new UserSession
Auth -> App: Return tokens {
  style.stroke-dash: 5
}
App -> Device2: Login successful {
  style.stroke-dash: 5
}

User -> Device1: View active sessions
Device1 -> App: GET /auth/sessions
App -> Session: Get all active sessions
Session -> DB: Query UserSession
DB -> Session: List of sessions {
  style.stroke-dash: 5
}
Session -> App: Session details {
  style.stroke-dash: 5
}
App -> Device1: Display sessions {
  style.stroke-dash: 5
}

User -> Device1: Logout iPhone remotely
Device1 -> App: DELETE /auth/sessions/{id}
App -> Session: Revoke specific session
Session -> DB: Update session
Session -> Redis: Add to blacklist
Session -> WSServer: Send force_logout
WSServer -> Device2: Force logout {
  style.stroke-dash: 5
}
Device2 -> User: Automatically logged out {
  style.stroke-dash: 5
}
```

### Luồng liên kết & giám sát phụ huynh-học sinh

```d2
shape: sequence_diagram

Parent: Parent
Student: Student
App: Application
Auth: Auth Module
parentLink: ParentLink Service
DB: Database
Analytics: Analytics Module

Parent -> App: Request to link with student
App -> Auth: Verify parent role
Auth -> parentLink: Initiate linking
parentLink -> DB: Check student and tenant
DB -> parentLink: Student verified {
  style.stroke-dash: 5
}

parentLink -> Parent: Send OTP email (Email verification)
Parent -> App: Enter OTP
App -> parentLink: Verify OTP
parentLink -> DB: Create ParentStudentLink

DB -> parentLink: Link created {
  style.stroke-dash: 5
}
parentLink -> Auth: Update permissions

Parent -> App: View student dashboard
App -> Analytics: GET /analytics/student
Analytics -> DB: Get student data
DB -> Analytics: Progress and scores {
  style.stroke-dash: 5
}
Analytics -> Analytics: Generate report
Analytics -> App: Complete analytics {
  style.stroke-dash: 5
}
App -> Parent: Display dashboard {
  style.stroke-dash: 5
}
```

---

## Design Principles

### Nguyên tắc phát triển

1. **Single Responsibility**: Mỗi module chỉ xử lý một phạm vi nghiệp vụ cụ thể
2. **Dependency Injection**: Quản lý dependency linh hoạt và dễ dàng kiểm thử
3. **Repository Pattern**: Tách biệt business logic và truy cập dữ liệu
4. **Event-Driven Communication**: Giảm sự phụ thuộc giữa các module thông qua
   sự kiện

### Nguyên tắc bảo mật

1. **Principale of Least Privilege**: Mỗi role chỉ có quyền hạn tối thiểu cần
   thiết
2. **Tenant Isolation**: Dữ liệu giữa các tenant hoàn toàn độc lập, không truy
   cập chéo
3. **Defense in Depth**: Nhiều lớp bảo vệ cho dữ liệu nhạy cảm
4. **Audit Logging**: Ghi lại tất cả hoạt động quan trọng để truy vết
5. **2FA for Admin Accounts**: Xác thực đa yếu tố cho tài khoản admin cấp cao
6. **WebSocket Security**: Xác thực và ủy quyền cho tất cả kết nối WebSocket
7. **Token Security**: Refresh token được lưu dưới dạng hash trong database,
   không lưu plain text

### Nguyên tắc thời gian thực

1. **Connection Management**: Quản lý connection pooling WebSocket hiệu quả và
   xử lý kết nối lại
2. **Room-based Architecture**: Phòng ảo cho mỗi cuộc thi, lớp học với theo dõi
   hiện diện
3. **Event-driven Updates**: Mô hình Pub/Sub cho cập nhật thời gian thực với
   Redis
4. **Presence Tracking**: Theo dõi trạng thái người dùng theo thời gian thực
5. **Graceful Degradation**: Fallback về polling khi WebSocket không khả dụng

### Nguyên tắc quản lý dữ liệu

1. **Selective Soft Delete**: Chỉ áp dụng `deleted_at` cho các bảng: User,
   Topic, QuestionBank, Question, Exam, Tournament, Reward
2. **Cascade Delete Strategy**:
   - Hard delete cascade ở cấp database cho các bảng không cần soft delete
   - Soft delete cascade ở cấp ứng dụng cho các bảng có `deleted_at`
3. **Tenant Lifecycle**: Hỗ trợ đầy đủ vòng đời tenant với các trạng thái:
   ACTIVE, SUSPENDED, PENDING_DEACTIVATION
4. **Data Retention Policy**: Xóa dữ liệu tự động theo chính sách lưu trữ được
   định nghĩa
5. **RBAC Implementation**: Loại người dùng được xác định qua Role, không lưu
   trực tiếp trong User

### Nguyên tắc mở rộng

1. **Horizontal Scaling Ready**: Ứng dụng Stateless, có thể mở rộng bằng cách
   thêm instance
2. **Database Scalability**: Thiết kế hỗ trợ sharding theo tenant khi cần, read
   replicas
3. **Future Microservices Ready**: Module hóa rõ ràng để dễ dàng tách thành
   microservices sau này
4. **WebSocket Scaling**: Redis adapter cho mở rộng cluster WebSocket
5. **Cache Strategy**: Caching đa cấp với Redis cluster

---

## Requirements Mapping

### Ánh xạ yêu cầu nghiệp vụ

| BR ID     | Main Module              | Architecture Component                           | Description                                                       |
| --------- | ------------------------ | ------------------------------------------------ | ----------------------------------------------------------------- |
| **BR-01** | Learning, Analytics      | AI Service, KnowledgeMap                         | AI phân tích lịch sử học tập để đề xuất lộ trình cá nhân hóa      |
| **BR-02** | Tournament               | Tournament Module, WebSocket                     | Hệ thống đấu trường đa cấp với thi đấu thời gian thực             |
| **BR-03** | Analytics, Learning      | Analytics Module, StudentAnswer                  | Báo cáo 4 cấp độ từ dữ liệu học tập và thi đấu                    |
| **BR-04** | Content, Admin           | Content Management, Exam, QuestionBank           | Bộ công cụ hoàn chỉnh cho giáo viên quản lý và tạo bài kiểm tra   |
| **BR-05** | Tournament, Learning     | Gamification Service, UserExp, Badge             | Hệ thống điểm kinh nghiệm, danh hiệu, cửa hàng đổi thưởng         |
| **BR-06** | Learning, Content        | Content Module, Topic, Lesson                    | Kho nội dung học tập tổ chức theo Môn → Khối → Chủ đề → Bài học   |
| **BR-07** | Auth, Admin, All Modules | Multi-tenant Architecture, Tenant Management     | Kiến trúc hỗ trợ nhiều tenant với quản lý vòng đời và xóa cascade |
| **BR-08** | Auth Module              | Session Service, Device Management               | Quản lý session đa thiết bị với khả năng đăng xuất từ xa          |
| **BR-09** | Real-time Module         | WebSocket Gateway, Redis Pub/Sub                 | Hỗ trợ thời gian thực cho thi đấu và thông báo                    |
| **BR-10** | Admin Module             | Cascade Delete Service, Tenant Lifecycle Manager | Chiến lược xóa cascade cho quản lý vòng đời tenant                |

### Ánh xạ yêu cầu chức năng

| Module             | FR IDs                     | Architecture Component                | Tech                                        |
| ------------------ | -------------------------- | ------------------------------------- | ------------------------------------------- |
| **Learning**       | FR-HS-01 to FR-HS-05       | Learning Module, AI Service           | React, NestJS, PostgreSQL, AI Python        |
| **Competition**    | FR-COMP-01 to FR-COMP-09   | Tournament Module, WebSocket          | Socket.IO, Redis Pub/Sub, Real-time Cache   |
| **Assessment**     | FR-ANAL-01 to FR-ANAL-05   | Analytics Module, KnowledgeMap        | Data Aggregation, PostgreSQL Analytics      |
| **Parent**         | FR-PAR-01 to FR-PAR-04     | Auth Module, Analytics Module         | ParentStudentLink, Shared Dashboard         |
| **Teacher**        | FR-TEACH-01 to FR-TEACH-07 | Content Management, Tournament Module | Exam, QuestionBank, InviteCode System       |
| **Admin**          | FR-ADMIN-01 to FR-ADMIN-09 | Admin Module, Content Management      | RBAC, Tenant Lifecycle, Cascade Delete      |
| **Authentication** | FR-AUTH-01 to FR-AUTH-09   | Auth Module, User Management          | JWT, Redis Token Blacklist, Multi-tenant    |
| **Real-time**      | FR-RT-01 to FR-RT-06       | Real-time Module, WebSocket Gateway   | Socket.IO, Redis Adapter, Presence Tracking |

---

## Integration & Extension

### Thiết kế API First

- RESTful APIs với documentation đầy đủ
- Versioning API để đảm bảo tương thích ngược
- WebSocket API cho real-time features (thi đấu, thông báo)
- GraphQL optional cho complex queries

### Điểm tích hợp tiềm năng

1. **School Management System (SIS)**: Đồng bộ danh sách học sinh, lớp học
2. **Payment Gateway**: Hỗ trợ các gói học tập trả phí
3. **CDN Services**: Phân phối video và tài liệu hiệu năng cao
4. **Third-party Analytics**: Theo dõi hành vi người dùng
5. **Push Notification Services**: Firebase Cloud Messaging, OneSignal

---

## Deployment & Operations

### Mô hình triển khai

- **On-premise**: Triển khai trực tiếp trên hạ tầng của trường
- **Multi-tenant**: Một instance phần mềm phục vụ nhiều trường độc lập
- **Container-based**: Ứng dụng đóng gói trong container cho việc triển khai
  nhất quán
- **CI/CD Pipeline**: Triển khai tự động với khả năng rollback
- **WebSocket Load Balancing**: Sticky sessions hoặc Redis adapter

### Giám sát và bảo trì

- **Application Monitoring**: Giám sát hiệu năng và phát hiện sự cố
- **Business Metrics**: Đo lường các chỉ số doanh nghiệp quan trọng
- **Automated Backup**: Sao lưu dữ liệu tự động định kỳ
- **Centralized Logging**: Thu thập, phân tích và trực quan hóa log
- **Real-time Monitoring**: Giám sát kết nối WebSocket, thông lượng tin nhắn, độ
  trễ
- **Tenant Health Monitoring**: Giám sát trạng thái và sử dụng tài nguyên của
  từng tenant

### Quy trình triển khai

1. **Development**: Developer commit code vào feature branches
2. **Testing**: Test tự động chạy unit tests, integration tests, WebSocket tests
3. **Staging**: Deploy tự động lên môi trường staging sau khi merge
4. **Production**: Phê duyệt thủ công → deploy lên production với chiến lược
   blue-green
5. **Rollback**: Rollback tự động nếu health check thất bại sau khi deploy
6. **WebSocket Migration**: Di chuyển kết nối graceful khi deploy phiên bản mới

### Chiến lược mở rộng

1. **Application Tier**:
   - Stateless design, scale horizontally
   - Load balancer with WebSocket support
   - Session storage in Redis
2. **WebSocket Tier**:
   - Redis Pub/Sub for cross-instance communication
   - Sticky sessions or Redis adapter
3. **Database Tier**:
   - Read replicas for reporting
   - Sharding by tenant when needed
4. **Cache Tier**:
   - Redis cluster for high availability
   - Cache warming strategy

### Khôi phục thảm họa

1. **Database Backup**: Sao lưu hàng ngày tự động với point-in-time recovery
2. **Redis Persistence**: RDB và AOF persistence cho phục hồi cache
3. **Tenant Isolation**: Sự cố của một tenant không ảnh hưởng đến tenant khác
4. **Graceful Degradation**: Hệ thống tiếp tục hoạt động với chức năng cơ bản
   khi các dịch vụ phụ gặp sự cố

---

## References

- [Business Overview](../00-brs/overview.md)
- [Data Model](./data.md)
- [Cross-Cutting](/specs)
