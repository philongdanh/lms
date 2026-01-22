# System Design Blueprint

## High-Level Architecture

Hệ thống áp dụng **kiến trúc monolithic có module hóa rõ ràng**, hỗ trợ
**multi-tenant** với cơ chế cách ly dữ liệu hoàn toàn giữa các trường.

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

1. **Modular Monolith**: Ứng dụng được tổ chức thành các module nghiệp vụ độc
   lập, dễ bảo trì và phát triển.
2. **Multi-Tenancy với Data Isolation**: Mỗi tenant (trường học) có không gian
   dữ liệu riêng, đảm bảo bảo mật và riêng tư.
3. **RBAC nghiêm ngặt**: 5 vai trò mặc định với quyền hạn được kiểm soát chặt
   chẽ.
4. **Kiến trúc hướng sự kiện**: Các module giao tiếp qua event, giảm phụ thuộc
   trực tiếp.
5. **Hỗ trợ thời gian thực**: WebSocket với Redis Pub/Sub cho thi đấu, thông
   báo, cập nhật bảng xếp hạng.
6. **Quản lý session đa thiết bị**: Hỗ trợ đăng xuất từ xa và theo dõi thiết bị.
7. **Chiến lược xóa dữ liệu linh hoạt**: Hỗ trợ cả hard delete và soft delete
   cascade.

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

- **Luồng liên kết phụ huynh - học sinh**: Xác thực OTP và chia sẻ dữ liệu an
  toàn.

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

user: "User"
device1: "Chrome"
device2: "iPhone"
app: "Application"
auth: "Auth Module"
session_svc: "Session Service"
redis: "Redis Cache"
db: "Database"
ws_server: "WebSocket Server"

user -> device1: "Login on Chrome"
device1 -> app: "POST /auth/login"
app -> auth: "Validate credentials"
auth -> db: "Create UserSession"
auth -> redis: "Store refresh token"
auth -> app: "Return tokens"
app -> device1: "Login success"

user -> device2: "Login on iPhone"
device2 -> app: "POST /auth/login"
app -> auth: "Validate credentials"
auth -> session_svc: "Check device limit"
session_svc -> db: "Count active sessions"
session_svc -> db: "Find oldest session"
db -> session_svc: "Oldest session"
session_svc -> db: "Revoke old session"
session_svc -> redis: "Blacklist old token"
auth -> db: "Create new UserSession"
auth -> app: "Return new tokens"
app -> device2: "Login success"

user -> device1: "View active sessions"
device1 -> app: "GET /auth/sessions"
app -> session_svc: "Get all sessions"
session_svc -> db: "Query UserSession"
db -> session_svc: "Session list"
session_svc -> app: "Session details"
app -> device1: "Display session list"

user -> device1: "Remote logout iPhone"
device1 -> app: "DELETE /auth/sessions/{id}"
app -> session_svc: "Revoke specific session"
session_svc -> db: "Update session"
session_svc -> redis: "Add to blacklist"
session_svc -> ws_server: "Send force_logout"
ws_server -> device2: "Force logout"
device2 -> user: "Auto logout"
```

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
- **Tenant Lifecycle**: Hỗ trợ đầy đủ trạng thái tenant (ACTIVE, SUSPENDED,
  PENDING_DEACTIVATION).
- **RBAC via Roles**: Loại người dùng được xác định qua role, không lưu trực
  tiếp.

## Requirements Mapping

Kiến trúc được thiết kế để đáp ứng toàn bộ yêu cầu nghiệp vụ (BR) và chức năng
(FR) từ tài liệu đặc tả. Các module chính bao gồm:

- **Auth & RBAC**: Đăng ký, xác thực, phân quyền, multi-tenancy.
- **Learning**: Lộ trình AI, nội dung học, video bài giảng, bài tập.
- **Tournament**: Thi đấu thời gian thực, giải đấu, bảng xếp hạng.
- **Content**: Quản lý nội dung, ngân hàng câu hỏi, đóng góp của giáo viên.
- **Reporting**: Báo cáo 4 cấp, PDF định kỳ, biểu đồ tiến độ.
- **Gamification**: Huy hiệu, streak, phần thưởng, cửa hàng đổi thưởng.

## Deployment & Operations

Hệ thống được thiết kế để triển khai **on-premise** tại các trường học, hỗ trợ
**multi-tenant** trên một instance. Các nguyên tắc triển khai bao gồm:

- **Container-based**: Docker với Docker Compose.
- **CI/CD Pipeline**: Triển khai tự động với khả năng rollback.
- **High Availability**: Cluster Redis, load balancer hỗ trợ WebSocket.
- **Monitoring**: Giám sát ứng dụng, log tập trung, metric nghiệp vụ.
- **Disaster Recovery**: Backup tự động, phục hồi nhanh (RTO < 4 giờ).

---

# Backend Architecture

Thiết kế API, cấu trúc database và tham chiếu công cụ.

## External References

| Tool               | Purpose           | Link       |
| ------------------ | ----------------- | ---------- |
| OpenAPI            | API Specification |            |
| Postman            | API Testing       |            |
| Apidog             | API Documentation |            |
| GraphQL Playground | GraphQL Explorer  | `/graphql` |

> Xem chi tiết Technology Stack tại [Tech Stack](./stack.md).

## API Design

### API Style

| Aspect     | Choice                   |
| ---------- | ------------------------ |
| Chính      | GraphQL                  |
| Phụ        | REST (webhooks, uploads) |
| Định dạng  | JSON                     |
| Versioning | Schema versioning        |
| Auth       | Bearer token (JWT)       |

### Endpoint Summary

| Endpoint          | Method | Description       | Auth     |
| ----------------- | ------ | ----------------- | -------- |
| `/graphql`        | POST   | GraphQL API       | Optional |
| `/api/upload`     | POST   | File upload       | Required |
| `/api/webhooks/*` | POST   | External webhooks | API Key  |
| `/health`         | GET    | Health check      | No       |

## GraphQL Schema Conventions

### Naming

| Component | Rule                      | Example                          |
| --------- | ------------------------- | -------------------------------- |
| Query     | camelCase                 | `learningPath`, `tournaments`    |
| Mutation  | camelCase, verb prefix    | `createUser`, `updateLesson`     |
| Type      | PascalCase                | `User`, `LearningPath`           |
| Input     | PascalCase + Input suffix | `CreateUserInput`                |
| Enum      | UPPER_SNAKE_CASE          | `USER_ROLE`, `TOURNAMENT_STATUS` |

### Query Pattern

```graphql
type Query {
  # Single entity
  user(id: ID!): User

  # List with pagination
  users(first: Int, after: String, filter: UserFilter): UserConnection!

  # Current user
  me: User
}
```

### Mẫu Mutation

```graphql
type Mutation {
  createUser(input: CreateUserInput!): CreateUserPayload!
  updateUser(id: ID!, input: UpdateUserInput!): UpdateUserPayload!
  deleteUser(id: ID!): DeleteUserPayload!
}

type CreateUserPayload {
  user: User
  errors: [Error!]
}
```

## Pagination

### Con trỏ (Khuyến nghị)

```graphql
type UserConnection {
  edges: [UserEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type UserEdge {
  node: User!
  cursor: String!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}
```

## Error Handling

### Loại lỗi

```graphql
type Error {
  code: ErrorCode!
  message: String!
  field: String
}

enum ErrorCode {
  VALIDATION_ERROR
  NOT_FOUND
  UNAUTHORIZED
  FORBIDDEN
  CONFLICT
  INTERNAL_ERROR
}
```

> Xem danh sách đầy đủ mã lỗi và định dạng phản hồi tại
> [API Contracts](../../spec/interface/ui-system.md). (Check new location)

## Database Design

### Thông tin cơ sở dữ liệu

| Aspect    | Value               |
| --------- | ------------------- |
| DBMS      | PostgreSQL 15       |
| Charset   | UTF-8               |
| Collation | en_US.UTF-8         |
| Tiện ích  | uuid-ossp, pgcrypto |

### Quy tắc đặt tên

| Component   | Rule                    | Example                   |
| ----------- | ----------------------- | ------------------------- |
| Table       | snake_case, plural      | `users`, `learning_paths` |
| Column      | snake_case              | `created_at`, `user_id`   |
| Primary Key | `id`                    | `id UUID`                 |
| Foreign Key | `{table_singular}_id`   | `user_id`                 |
| Index       | `idx_{table}_{columns}` | `idx_users_email`         |
| Unique      | `uq_{table}_{columns}`  | `uq_users_email`          |

### Các cột chung

All tables include:

| Column       | Data Type   | Description              |
| ------------ | ----------- | ------------------------ |
| `id`         | UUID        | Primary key              |
| `created_at` | TIMESTAMPTZ | Thời gian tạo            |
| `updated_at` | TIMESTAMPTZ | Lần cập nhật cuối        |
| `deleted_at` | TIMESTAMPTZ | Xóa mềm (không bắt buộc) |

### Bảng cốt lõi

| Table         | Description           | Main Columns                    |
| ------------- | --------------------- | ------------------------------- |
| `users`       | Tài khoản người dùng  | id, email, role, tenant_id      |
| `subjects`    | Môn học               | id, name, slug, icon            |
| `topics`      | Chủ đề trong môn học  | id, subject_id, grade_id, name  |
| `lessons`     | Bài học trong chủ đề  | id, topic_id, title, content    |
| `exercises`   | Bài tập trong bài học | id, lesson_id, type, difficulty |
| `tournaments` | Định nghĩa giải đấu   | id, name, status, start_time    |

### Sơ đồ quan hệ thực thể

```d2
direction: right

USERS: {
  shape: sql_table
}
LEARNING_PROGRESS: {
  shape: sql_table
}
EXERCISE_ATTEMPTS: {
  shape: sql_table
}
TOURNAMENT_PARTICIPATIONS: {
  shape: sql_table
}
USER_BADGES: {
  shape: sql_table
}

SUBJECTS: {
  shape: sql_table
}
TOPICS: {
  shape: sql_table
}
LESSONS: {
  shape: sql_table
}
EXERCISES: {
  shape: sql_table
}

TOURNAMENTS: {
  shape: sql_table
}
MATCHES: {
  shape: sql_table
}

USERS -> LEARNING_PROGRESS: has
USERS -> EXERCISE_ATTEMPTS: makes
USERS -> TOURNAMENT_PARTICIPATIONS: joins
USERS -> USER_BADGES: earns

SUBJECTS -> TOPICS: contains
TOPICS -> LESSONS: contains
LESSONS -> EXERCISES: has

TOURNAMENTS -> TOURNAMENT_PARTICIPATIONS: has
TOURNAMENTS -> MATCHES: contains
```

---

# Frontend Architecture

Kiến trúc thành phần, quản lý trạng thái và điều phối giao diện.

## External References

| Tool      | Purpose           | Link |
| --------- | ----------------- | ---- |
| Figma     | UI/UX Design      |      |
| Storybook | Component Library |      |
| Chromatic | Visual Testing    |      |

> Xem chi tiết Technology Stack tại [Tech Stack](./stack.md).

## Component Architecture

### Danh mục Component

| Category | Path                       | Purpose                   |
| -------- | -------------------------- | ------------------------- |
| UI       | `src/components/ui/`       | shadcn/ui primitives      |
| Layout   | `src/components/layout/`   | Page layouts, navigation  |
| Features | `src/components/features/` | Business logic components |
| Shared   | `src/components/shared/`   | Reusable utilities        |

### Phân cấp Component

```
src/components/
├── ui/                    # Base UI components (shadcn/ui)
│   ├── button/
│   ├── input/
│   ├── modal/
│   ├── card/
│   └── ...
├── layout/                # Layout components
│   ├── Header/
│   ├── Sidebar/
│   ├── Footer/
│   └── PageLayout/
├── features/              # Feature-specific components
│   ├── auth/              # Authentication
│   ├── learning/          # Learning module
│   ├── tournament/        # Tournament module
│   └── gamification/      # Gamification module
└── shared/                # Shared components
    ├── forms/
    ├── tables/
    └── charts/
```

### Quy tắc đặt tên

| Type      | Convention                  | Example                |
| --------- | --------------------------- | ---------------------- |
| Component | PascalCase                  | `UserProfile.tsx`      |
| Hook      | camelCase with `use` prefix | `useAuth.ts`           |
| Utility   | camelCase                   | `formatDate.ts`        |
| Type      | PascalCase                  | `User.types.ts`        |
| Test      | Same name + `.test`         | `UserProfile.test.tsx` |

### Component UI

| Component | Description   | Props                         |
| --------- | ------------- | ----------------------------- |
| `Button`  | Action button | `variant`, `size`, `onClick`  |
| `Input`   | Input field   | `type`, `value`, `onChange`   |
| `Modal`   | Dialog modal  | `open`, `onClose`, `children` |
| `Card`    | Content card  | `title`, `children`           |
| `Avatar`  | User avatar   | `src`, `fallback`             |
| `Badge`   | Label/badge   | `variant`, `children`         |

### Component tính năng

| Module       | Components                                                     |
| ------------ | -------------------------------------------------------------- |
| Auth         | `LoginForm`, `RegisterForm`, `ForgotPasswordForm`              |
| Learning     | `LearningPath`, `LessonCard`, `ExercisePlayer`, `QuizQuestion` |
| Tournament   | `TournamentList`, `MatchCard`, `Leaderboard`, `BattleArena`    |
| Gamification | `PointsDisplay`, `BadgeGrid`, `LevelProgress`, `RewardModal`   |

## State Management

### Danh mục trạng thái

| Category          | Scope        | Storage         | Example            |
| ----------------- | ------------ | --------------- | ------------------ |
| **Server State**  | Remote data  | TanStack Query  | API responses      |
| **GraphQL State** | GraphQL data | Apollo Client   | Queries, mutations |
| **Client State**  | UI state     | React Context   | Modal open/close   |
| **Form State**    | Form data    | React Hook Form | Input values       |
| **URL State**     | Navigation   | React Router    | Query params       |

### Mẫu trạng thái

| Pattern          | Tool           | Description                                     |
| ---------------- | -------------- | ----------------------------------------------- |
| Query            | TanStack Query | Fetch with `queryKey` and `queryFn`             |
| Mutation         | TanStack Query | Mutate with `mutationFn`, invalidate on success |
| GraphQL Query    | Apollo         | Use `useQuery` with variables                   |
| GraphQL Mutation | Apollo         | Use `useMutation` with `refetchQueries`         |
| Context          | React Context  | Create context, provider, and custom hook       |

### State toàn cục với Context

```typescript
// contexts/AuthContext.tsx
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthState>(initialState);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

## Routing

### Cấu trúc Route

| Path                  | Component              | Auth  | Description       |
| --------------------- | ---------------------- | ----- | ----------------- |
| `/`                   | `HomePage`             | No    | Landing page      |
| `/login`              | `LoginPage`            | No    | Login             |
| `/register`           | `RegisterPage`         | No    | Registration      |
| `/dashboard`          | `DashboardPage`        | Yes   | Main dashboard    |
| `/learning`           | `LearningPage`         | Yes   | Learning path     |
| `/learning/:lessonId` | `LessonPage`           | Yes   | Lesson detail     |
| `/tournaments`        | `TournamentListPage`   | Yes   | Tournament list   |
| `/tournaments/:id`    | `TournamentDetailPage` | Yes   | Tournament detail |
| `/profile`            | `ProfilePage`          | Yes   | User profile      |
| `/admin/*`            | `AdminRoutes`          | Admin | Admin panel       |
| `*`                   | `NotFoundPage`         | No    | 404               |

### Route Guards

| Guard          | Purpose                | Behavior                                  |
| -------------- | ---------------------- | ----------------------------------------- |
| ProtectedRoute | Require authentication | Redirect to `/login` if not authenticated |
| RoleGuard      | Require specific role  | Redirect to `/403` if role mismatch       |
| GuestRoute     | Authenticated redirect | Redirect to `/dashboard` if authenticated |

### Lazy Loading

| Strategy    | Description                 |
| ----------- | --------------------------- |
| Route-based | Lazy load page components   |
| Suspense    | Show skeleton while loading |
| Prefetch    | Preload on hover/focus      |

## Folder Structure

| Path                       | Purpose              |
| -------------------------- | -------------------- |
| `src/components/ui/`       | shadcn/ui components |
| `src/components/layout/`   | Layouts, navigation  |
| `src/components/features/` | Feature components   |
| `src/components/shared/`   | Common components    |
| `src/hooks/`               | Custom hooks         |
| `src/contexts/`            | React contexts       |
| `src/lib/`                 | Utilities            |
| `src/pages/`               | Page components      |
| `src/graphql/`             | GraphQL operations   |
| `src/types/`               | TypeScript types     |
| `src/assets/`              | Static assets        |

## Component Guidelines

### Nên làm

- Keep components small and focused
- Use composition over inheritance
- Extract reusable logic into hooks
- Define prop types clearly
- Write unit tests for complex logic
- Use React.memo for heavy components

### Không nên làm

- Don't use inline styles (use Tailwind)
- Don't hardcode strings (use i18n)
- Don't mutate props
- Don't use `any` type
- Don't skip error handling
- Don't create oversized components (> 200 lines)
