---
id: stack
title: Tech Stack
sidebar_label: Tech Stack
sidebar_position: 2
---

# Tech Stack

Lựa chọn công nghệ và tiêu chuẩn kỹ thuật cho hệ thống.

---

| Layer | Tech | Version | Mục đích chính | Phù hợp với ràng buộc |
|-------|------|---------|----------------|----------------------|
| **Frontend** | Next.js + React + TypeScript | Latest | Web UI với SSR/SSG, SEO tốt | Web responsive (BC-003) |
| **Backend** | NestJS + Node.js | Node 20+, NestJS latest | API Server, WebSocket Gateway, Module hóa | Monolithic modular (TC-ARCH-01) |
| **Database** | PostgreSQL | 15+ | Lưu trữ dữ liệu chính, ACID compliance | JSONB support, mature |
| **Cache & Pub/Sub** | Redis | 7+ | Session cache, real-time Pub/Sub, leaderboard | Độ trễ thấp (NFR-PERF-05) |
| **Container** | Docker + Docker Compose | Latest | Đóng gói và triển khai nhất quán | On-premise deployment (BC-006) |
| **AI/ML** | Python microservice + OpenAI API | - | Phân tích học tập, đề xuất cá nhân hóa | Sử dụng bên thứ ba (BC-015) |
| **File Storage** | Local storage | - | Lưu trữ video bài giảng, tài liệu | Self-hosted (BC-008) |

---

## Layer Details

### FE

| Component | Tech | Lý do lựa chọn | Đáp ứng yêu cầu |
|-----------|------------|----------------|----------------|
| **Framework** | Next.js 14+ với App Router | SSR/SSG tốt, performance cao, SEO friendly | Responsive web (BC-003) |
| **UI Library** | React 18+ với TypeScript | Type-safe, ecosystem lớn, hỗ trợ tốt real-time | - |
| **State Management** | Zustand + React Context | Đơn giản, nhẹ, đủ cho use case multi-tenant | - |
| **Styling** | TailwindCSS 3.x | Utility-first, design system nhất quán | Customizable UI (FR-AUTH-04) |
| **Component Library** | HeroUI (custom) | Tái sử dụng component, phù hợp giáo dục | - |
| **Real-time Client** | Socket.IO Client 4.x | Kết nối WebSocket ổn định, tự động reconnect | Thi đấu real-time (FR-COMP-04) |
| **Charts & Visualization** | Recharts | Nhẹ, tương thích React | Báo cáo trực quan (FR-REP-01) |
| **PDF Generation** | @react-pdf/renderer | Tạo báo cáo PDF phía client | Báo cáo PDF (FR-REP-02) |

### BE

| Component | Tech | Lý do lựa chọn | Đáp ứng yêu cầu |
|-----------|------------|----------------|----------------|
| **Runtime** | Node.js 20+ LTS | Hiệu năng cao, non-blocking I/O, TypeScript native | Hiệu năng (NFR-PERF series) |
| **Framework** | NestJS 10+ | Module hóa tốt, Dependency Injection, enterprise-ready | Monolithic modular (TC-ARCH-01) |
| **ORM/Database** | Prisma 5+ | Type-safe, migration tốt, hỗ trợ PostgreSQL tốt | PostgreSQL 14+ (TC-ARCH-02) |
| **Real-time** | Socket.IO Server + Redis adapter | Room-based, auto-reconnect, scaling với Redis | WebSocket scaling (NFR-PERF-05) |
| **Authentication** | Passport.js + JWT | Linh hoạt strategy, hỗ trợ multi-tenant | RBAC 5 roles (NFR-SEC-01) |
| **Queue/Jobs** | BullMQ + Redis | Xử lý bất đồng bộ, scheduled jobs | Background tasks |
| **Validation** | class-validator + class-transformer | Decorator-based, tích hợp tốt NestJS | Request validation |
| **File Upload** | Multer + custom storage | Xử lý video, hình ảnh | Self-hosted video (FR-CONT-02) |
| **Caching** | Redis (ioredis) | Cache nhiều lớp, session storage | Performance (NFR-PERF-01) |

### Database & Storage

| Component | Tech | Chi tiết | Đáp ứng yêu cầu |
|-----------|------|----------|----------------|
| **Primary DB** | PostgreSQL 15+ | ACID compliance, JSONB support, row-level security | Data isolation (TC-ARCH-06) |
| **Cache & Pub/Sub** | Redis 7+ Cluster | Cache, session storage, real-time messaging | Real-time events (NFR-PERF-06) |
| **File Storage** | Local filesystem + Nginx | Lưu trữ video, tài liệu, backup | On-premise (BC-006) |
| **Backup** | pg_dump + cron | Backup tự động hàng ngày | Disaster recovery (NFR-REL-02) |

### AI/ML & Xử lý nâng cao

| Component | Tech | Mục đích | Tích hợp |
|-----------|------|----------|----------|
| **AI Service** | Python + FastAPI | Xử lý phân tích học tập, đề xuất cá nhân hóa | REST API giao tiếp với NestJS |
| **ML Libraries** | scikit-learn, pandas | Phân tích dữ liệu, clustering | Xử lý nội bộ |
| **External AI** | OpenAI API | Đề xuất nội dung, phân tích văn bản | Dùng khi cần (Phase 3) |

### Infrastructure & DevOps

| Component | Tech | Mục đích | Đáp ứng ràng buộc |
|-----------|------|----------|-------------------|
| **Containerization** | Docker 24+ với multi-stage builds | Đóng gói ứng dụng, môi trường nhất quán | Triển khai đơn giản (TC-ARCH-04) |
| **Orchestration** | Docker Compose | Quản lý multi-service development | On-premise (BC-006) |
| **Load Balancer** | Nginx với WebSocket support | Reverse proxy, load balancing, SSL termination | WebSocket support (NFR-PERF-05) |
| **CI/CD** | GitHub Actions | Build, test, deploy tự động | Timeline cố định (BC-001) |
| **Testing** | Jest + Supertest + Testing Library | Unit test, integration test, e2e test | Chất lượng code |
| **Code Quality** | ESLint + Prettier + Husky | Đảm bảo code style nhất quán | Đội ngũ nhỏ (BC-014) |
| **Monitoring** | Winston + custom metrics | Structured logging, application metrics | Giám sát hiệu năng |

---

## Security & Compliance

| Lĩnh vực | Công nghệ/Phương pháp | Mục đích | Đáp ứng yêu cầu |
|----------|----------------------|----------|----------------|
| **Authentication** | JWT + Refresh Token (hashed in DB) | Xác thực stateless | Xác thực an toàn (NFR-SEC-03) |
| **Authorization** | RBAC với 5 roles | Phân quyền chi tiết | RBAC (NFR-SEC-01) |
| **2FA** | TOTP (Time-based One-Time Password) | Xác thực 2 lớp cho admin | 2FA admin (NFR-SEC-04) |
| **Encryption** | TLS 1.3, mã hóa dữ liệu nhạy cảm | Bảo vệ dữ liệu truyền tải | TLS 1.3 (NFR-SEC-02) |
| **Data Isolation** | Multi-tenant với tenant_id | Cách ly dữ liệu giữa các trường | Data isolation (TC-ARCH-06) |
| **Compliance** | Tuân thủ Luật An ninh mạng VN | Dữ liệu lưu trữ trong nước | Regulatory (BC-011) |
| **GDPR** | Cơ chế xóa dữ liệu theo yêu cầu | Hỗ trợ người dùng quốc tế | GDPR (BC-013) |

---

## Tech Decision Matrix

| Quyết định | Lựa chọn khả thi | Công nghệ chọn | Lý do chính |
|------------|------------------|----------------|-------------|
| **Backend Framework** | Express, Fastify, NestJS | NestJS | Module hóa tốt, TypeScript first, phù hợp enterprise |
| **ORM** | TypeORM, Prisma, Sequelize | Prisma | Type-safe tuyệt đối, migration mạnh, DX tốt |
| **Frontend Framework** | React SPA, Vue, Angular | Next.js + React | SSR tích hợp, SEO tốt, phù hợp content-based |
| **Real-time Solution** | Socket.IO, ws, Pusher | Socket.IO + Redis adapter | Fallback tự động, room support, scaling tốt |
| **Database** | PostgreSQL, MySQL, MongoDB | PostgreSQL | ACID compliance, JSONB, phù hợp structured data |
| **Cache & Pub/Sub** | Redis, Memcached, RabbitMQ | Redis | All-in-one: cache, session, pub/sub, queue |
| **Container Orchestration** | Docker Compose, Kubernetes | Docker Compose | Đơn giản, phù hợp on-premise và đội ngũ nhỏ |
| **AI Integration** | In-house ML, Third-party API | Kết hợp Python service + OpenAI API | Linh hoạt, không cần chuyên gia AI full-time |

---

## Technology Adoption Roadmap

### Giai đoạn 1 (25/01 - 15/02/2026)
- **Frontend**: Next.js + React + TailwindCSS
- **Backend**: NestJS + PostgreSQL + Prisma
- **Real-time**: Socket.IO cơ bản
- **Deployment**: Docker + Docker Compose

### Giai đoạn 2 (16/02 - 01/03/2026)
- **Gamification**: Bull queue cho xử lý reward
- **Advanced Analytics**: Python microservice tích hợp
- **Monitoring**: Winston structured logging

### Giai đoạn 3 (02/03 - 15/03/2026)
- **AI Personalization**: OpenAI API integration
- **Optimization**: Redis cluster, query optimization
- **Security**: 2FA TOTP, audit logging

---

## References

- [System Design](./design.md)
- [ADRs](./decisions.md)
- [BE](./backend.md)
- [FE](./frontend.md)
- [Data](./database.md)