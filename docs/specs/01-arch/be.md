---
id: be
title: Backend
sidebar_label: BE
sidebar_position: 3
---

# Backend Architecture

Thiết kế API, cấu trúc database và tham chiếu công cụ.

---

## External References

| Tool               | Purpose           | Link       |
| ------------------ | ----------------- | ---------- |
| OpenAPI            | API Specification |            |
| Postman            | API Testing       |            |
| Apidog             | API Documentation |            |
| GraphQL Playground | GraphQL Explorer  | `/graphql` |

---

## Tech Stack

| Layer         | Tech                    | Version |
| ------------- | ----------------------- | ------- |
| Runtime       | Node.js                 | 20.x    |
| Framework     | NestJS                  | latest  |
| API           | GraphQL (Apollo Server) | 4.x     |
| Database      | PostgreSQL              | 15.x    |
| Cache         | Redis                   | latest  |
| Message Queue | RabbitMQ                | latest  |
| Search        | Elasticsearch           | latest  |
| ORM           | Prisma                  | latest  |

---

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

---

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

---

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

---

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

> For complete error codes and response format, see
> [API Contracts](../../api/contracts.md).

---

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

## References

- [System Design](./design.md)
- [Tech Stack](./stack.md)
- [Data Model](./data.md)
- [API Contracts](../../api/contracts.md)
