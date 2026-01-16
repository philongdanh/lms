---
id: system-design
title: System Design
sidebar_label: System Design
---

# System Design

Kiến trúc nền tảng LMS - hệ thống quản lý học tập multi-tenant có khả năng mở rộng cao.

---

## High-Level Architecture

### Architecture Diagram

Hệ thống sử dụng **kiến trúc monolithic** với hỗ trợ **multi-tenant** - mỗi trường là một tenant độc lập, đảm bảo cách ly dữ liệu hoàn toàn.

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

### 2.2. Key Architecture Features

1. **Monolithic với Clear Modularization**: Ứng dụng được tổ chức thành các module nghiệp vụ độc lập, mỗi module xử lý một nhóm chức năng cụ thể, giúp bảo trì và phát triển dễ dàng.

2. **Multi-Tenant với Data Isolation**: Mỗi trường (tenant) có không gian dữ liệu riêng biệt. Dữ liệu được tách biệt thông qua cơ chế `tenant_id` trong tất cả các bảng quan trọng, đảm bảo quyền riêng tư và bảo mật.

3. **RBAC Authorization nghiêm ngặt**: Hệ thống áp dụng mô hình Role-Based Access Control với 5 roles được seed sẵn: `root-admin`, `tenant-admin`, `teacher`, `parent`, `student`. Loại người dùng được xác định hoàn toàn thông qua RBAC roles.

4. **Event-Driven Architecture**: Các module giao tiếp với nhau thông qua hệ thống event nội bộ, giảm thiểu phụ thuộc trực tiếp và tăng tính linh hoạt.

5. **Real-time Architecture**: Kiến trúc real-time mạnh mẽ hỗ trợ thi đấu, thông báo, và cập nhật bảng xếp hạng tức thì.

6. **Cascade Delete Strategy**: Hỗ trợ cả hard delete cascade (database level) và soft delete cascade (application level) cho quản lý vòng đời dữ liệu.

7. **Multi-device Session Management**: Quản lý session đa thiết bị với khả năng đăng xuất từ xa và bảo mật cao.

8. **Scalable WebSocket Architecture**: Kiến trúc WebSocket có khả năng mở rộng với Redis adapter cho hỗ trợ cluster.

## Technology Stack

### 3.1. Client Layer
- **Framework**: Next.js with React, SSR/SSG
- **Language**: TypeScript
- **Component Library**: HeroUI with custom design system
- **Primary Font**: Nunito
- **Real-time**: Socket.IO client
- **State Management**: React Context + Zustand
- **Styling**: TailwindCSS với CSS modules

### 3.2. Application Layer
- **Framework**: NestJS
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Cache**: Redis
- **Authentication**: JWT với refresh token blacklisting
- **Real-time**: WebSocket (Socket.IO) với Redis adapter
- **Message Queue**: Redis Pub/Sub cho real-time events
- **Logging**: Structured logging với centralized storage
- **2FA**: TOTP implementation cho admin accounts

### 3.3. Development & Operations
- **Containerization**: Docker với multi-stage builds
- **Orchestration**: Docker Compose
- **Version Control**: Git
- **Code Quality**: ESLint, Prettier
- **Testing**: Jest, Supertest, Testing Library
- **CI/CD**: Automated deployment với rollback capability
- **Load Balancer**: Nginx với WebSocket support

### 3.4. Supporting Technologies
- **AI Service**: Python microservice for advanced analytics
- **File Storage**: Local storage for on-premise
- **Logging Stack**: Centralized logging with query and analysis
- **Background Jobs**: Bull queue with Redis for delayed tasks

## Core Components

### 4.1. Client Layer
- **Component**: Single Page Application (SPA) with server-side rendering
- **Target Users**: All users (Students, Parents, Teachers, Administrators)
- **Key Features**: 
  - Interactive interface for learning and competitions
  - Multi-role dashboard with real-time updates
  - Real-time updates for competitions and leaderboards via WebSocket
  - Gamification interface with integrated reward store
  - Real-time notifications and presence indicators
  - Login device management and session management
  - Responsive design for mobile, tablet, desktop

### 4.2. Application Layer

#### 4.2.1. Các Module Nghiệp Vụ (Business Modules)

| Module | Main Functions | Corresponding FR | Technology Stack |
|--------|-----------------|------------------|------------------|
| **Auth & RBAC Module** | User management, RBAC authorization, multi-device sessions, parent-student linking, 2FA | FR-AUTH-01 to FR-AUTH-09 | NestJS, JWT, Redis, Prisma |
| **Tournament Module** | Competition and multi-level arena organization, real-time competition | FR-COMP-01 to FR-COMP-09 | NestJS, Socket.IO, Redis Pub/Sub |
| **... other modules** | Learning, Analytics, Content, Admin, Gamification, Notification | Various FRs | Various technologies |

#### 4.2.2. Real-time & WebSocket Module
- **WebSocket Gateway**: Entry point for all WebSocket connections, handling authentication and routing
- **Message Queue**: Redis Pub/Sub for synchronizing events across application instances
- **Presence Service**: Tracking user online/offline status, managing rooms for competitions
- **Real-time Cache**: Optimized Redis cache for real-time data (leaderboards, session data)
- **Event Bus**: Internal event system for real-time communication between modules
- **Graceful Degradation**: Fallback to polling when WebSocket is unavailable

### 4.3. Data Layer

#### 4.3.1. Primary Database
- **Role**: Store primary business data
- **Multi-tenant Strategy**:
  - Using `tenant_id` to separate data between schools
  - Row-level security for sensitive data
  - Optimized indexing for analytical queries
  - Database sharding by tenant when scaling large
- **Content Structure**:
  - Organized as: Subject → Grade → Topic (with visibility status) → Lesson (by semester)
  - `topics` table has `is_active` field to manage visibility status
- **Soft Delete Strategy**:
  - Only apply `deleted_at` for: User, Topic, QuestionBank, Question, Exam, Tournament, Reward
  - Cascade delete at application level for soft delete tables
- **Tenant Lifecycle Management**:
  - Tenant status: ACTIVE, SUSPENDED, PENDING_DEACTIVATION
  - 30-day grace period before complete deletion

#### 4.3.2. Cache System
- **Role**: Improve performance and support real-time features
- **Main Applications**:
  - Store login sessions and user permissions
  - Cache leaderboards and competition results
  - Cache frequently accessed content (content, questions)
  - Token blacklisting for JWT refresh tokens
  - Real-time presence tracking and room management
  - Rate limiting storage
- **Redis Cluster**: For high availability and scalability

## Data Flow

### 5.1. Learning Flow

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

### 5.2. Real-time Competition Flow

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

### 5.3. Multi-device Session Management Flow

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

### 5.4. Parent-Student Link and Monitoring Flow

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

## Design Principles

### 6.1. Development Principles
1. **Single Responsibility**: Each module handles only a specific business scope
2. **Dependency Injection**: Flexible dependency management and easy testing
3. **Repository Pattern**: Separation of business logic and data access
4. **Event-Driven Communication**: Reduce coupling between modules through events

### 6.2. Security Principles
1. **Principle of Least Privilege**: Each role has only the minimum necessary permissions
2. **Tenant Isolation**: Data between tenants is completely independent with no cross-access
3. **Defense in Depth**: Multiple layers of protection for sensitive data
4. **Audit Logging**: Record all important activities for traceability
5. **2FA for Admin Accounts**: Multi-factor authentication for high-level admin accounts
6. **WebSocket Security**: Authentication and authorization for all WebSocket connections
7. **Token Security**: Refresh token stored as hash in database only, not plain text

### 6.3. Real-time Principles
1. **Connection Management**: Efficient WebSocket connection pooling and reconnection handling
2. **Room-based Architecture**: Virtual rooms for each competition, class with presence tracking
3. **Event-driven Updates**: Pub/Sub pattern for real-time updates with Redis
4. **Presence Tracking**: Track user status in real-time
5. **Graceful Degradation**: Fallback to polling when WebSocket is unavailable

### 6.4. Data Management Principles
1. **Selective Soft Delete**: Only apply `deleted_at` for tables: User, Topic, QuestionBank, Question, Exam, Tournament, Reward
2. **Cascade Delete Strategy**: 
   - Hard delete cascade at database level for tables that don't need soft delete
   - Soft delete cascade at application level for tables with `deleted_at`
3. **Tenant Lifecycle**: Full support for tenant lifecycle with states: ACTIVE, SUSPENDED, PENDING_DEACTIVATION
4. **Data Retention Policy**: Automatic data deletion according to defined retention policy
5. **RBAC Implementation**: User type is determined through Role, not stored directly in User

### 6.5. Scalability Principles
1. **Horizontal Scaling Ready**: Stateless application, can scale by adding instances
2. **Database Scalability**: Design supports sharding by tenant when needed, read replicas
3. **Future Microservices Ready**: Clear modularization for easy separation into microservices later
4. **WebSocket Scaling**: Redis adapter for WebSocket cluster scaling
5. **Cache Strategy**: Multi-level caching with Redis cluster

## Requirements Mapping

### 7.1. Business Requirements Mapping

| BR ID | Main Module | Architecture Component | Implementation Description |
|-------|-------------|---------------------|------------------|
| **BR-01** | Learning, Analytics | AI Service, KnowledgeMap | AI analyzes learning history to suggest personalized paths |
| **BR-02** | Tournament | Tournament Module, WebSocket | Multi-level arena system with real-time competition |
| **BR-03** | Analytics, Learning | Analytics Module, StudentAnswer | 4-level reporting from learning and competition data |
| **BR-04** | Content, Admin | Content Management, Exam, QuestionBank | Complete toolset for teachers to manage and create tests |
| **BR-05** | Tournament, Learning | Gamification Service, UserExp, Badge | Experience points system, badges, reward redemption store |
| **BR-06** | Learning, Content | Content Module, Topic, Lesson | Learning content repository organized by Subject→Grade→Topic→Lesson |
| **BR-07** | Auth, Admin, All Modules | Multi-tenant Architecture, Tenant Management | Architecture supporting multiple tenants with cascade delete and lifecycle management |
| **BR-08** | Auth Module | Session Service, Device Management | Multi-device session management with remote logout capability |
| **BR-09** | Real-time Module | WebSocket Gateway, Redis Pub/Sub | Real-time support for competitions and notifications |
| **BR-10** | Admin Module | Cascade Delete Service, Tenant Lifecycle Manager | Cascade delete strategy for tenant lifecycle management |

### 7.2. Functional Requirements Mapping

| Module | FR IDs | Architecture Component | Applied Technology |
|--------|--------|---------------------|------------------|
| **Learning** | FR-HS-01 to FR-HS-05 | Learning Module, AI Service | React, NestJS, PostgreSQL, AI Python |
| **Competition** | FR-COMP-01 to FR-COMP-09 | Tournament Module, WebSocket | Socket.IO, Redis Pub/Sub, Real-time Cache |
| **Assessment** | FR-ANAL-01 to FR-ANAL-05 | Analytics Module, KnowledgeMap | Data Aggregation, PostgreSQL Analytics |
| **Parent** | FR-PAR-01 to FR-PAR-04 | Auth Module, Analytics Module | ParentStudentLink, Shared Dashboard |
| **Teacher** | FR-TEACH-01 to FR-TEACH-07 | Content Management, Tournament Module | Exam, QuestionBank, InviteCode System |
| **Admin** | FR-ADMIN-01 to FR-ADMIN-09 | Admin Module, Content Management | RBAC, Tenant Lifecycle, Cascade Delete |
| **Authentication** | FR-AUTH-01 to FR-AUTH-09 | Auth Module, User Management | JWT, Redis Token Blacklist, Multi-tenant |
| **Real-time** | FR-RT-01 to FR-RT-06 | Real-time Module, WebSocket Gateway | Socket.IO, Redis Adapter, Presence Tracking |

## Integration & Extension

### 8.1. API First Design
- RESTful APIs với documentation đầy đủ
- Versioning API để đảm bảo tương thích ngược
- WebSocket API cho real-time features (thi đấu, thông báo)
- GraphQL optional cho complex queries

### 8.2. Potential Integration Points
1. **School Management System (SIS)**: Synchronize student lists, classes
2. **Payment Gateway**: Support paid learning packages
3. **CDN Services**: High-performance video and document distribution
4. **Third-party Analytics**: User behavior tracking
5. **Push Notification Services**: Firebase Cloud Messaging, OneSignal

## Deployment & Operations

### 9.1. Deployment Model
- **On-premise**: Direct deployment on school infrastructure
- **Multi-tenant**: One software instance serving multiple independent schools
- **Container-based**: Application packaged in containers for consistent deployment
- **CI/CD Pipeline**: Automated deployment with rollback capability
- **WebSocket Load Balancing**: Sticky sessions or Redis adapter

### 9.2. Monitoring and Maintenance
- **Application Monitoring**: Performance monitoring and issue detection
- **Business Metrics**: Measuring important business indicators
- **Automated Backup**: Periodic automatic data backup
- **Centralized Logging**: Log collection, analysis, and visualization
- **Real-time Monitoring**: WebSocket connections, message throughput, latency
- **Tenant Health Monitoring**: Monitoring status and resource usage of each tenant

### 9.3. Deployment Process
1. **Development**: Developers commit code to feature branches
2. **Testing**: Automated tests run unit tests, integration tests, WebSocket tests
3. **Staging**: Automatic deployment to staging environment after merge
4. **Production**: Manual approval → deploy to production with blue-green deployment strategy
5. **Rollback**: Automatic rollback if health check fails after deployment
6. **WebSocket Migration**: Graceful connection migration when deploying new version

### 9.4. Scaling Strategy
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

### 9.5. Disaster Recovery
1. **Database Backup**: Automated daily backups with point-in-time recovery
2. **Redis Persistence**: RDB and AOF persistence for cache recovery
3. **Tenant Isolation**: Failure of one tenant does not affect other tenants
4. **Graceful Degradation**: System continues operating with basic functions when auxiliary services encounter issues

## References

- [Product Vision](../00-business/vision.md)
- [Data Model](./data-model.md)
- [Cross-Cutting](../03-cross-cutting/README.md)