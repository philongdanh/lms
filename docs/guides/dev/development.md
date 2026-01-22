---
id: development
title: Development Guide
sidebar_label: Development
sidebar_position: 2
---

# Development Guide
 
Tiêu chuẩn và quy trình phát triển phần mềm.

---

## Code Standards

### Danh sách công nghệ (Tech Stack)

| Layer         | Tech                  | Purpose                            |
| ------------- | --------------------- | ---------------------------------- |
| **Backend**   | NestJS + TypeScript   | Business logic, API                |
| **Frontend**  | Next.js + TypeScript  | Giao diện người dùng (UI), SSR/SSG |
| **Database**  | PostgreSQL + Prisma 7 | Lưu trữ dữ liệu, ORM               |
| **Cache**     | Redis                 | Session, caching, Pub/Sub          |
| **Real-time** | Socket.IO             | Kết nối WebSocket                  |

### Công cụ chất lượng code

Dự án sử dụng các công cụ sau để đảm bảo chất lượng code:

| Tool            | Purpose              | Config File    |
| --------------- | -------------------- | -------------- |
| **ESLint**      | Static code analysis | `.eslintrc.js` |
| **Prettier**    | Code formatting      | `.prettierrc`  |
| **Husky**       | Git hooks            | `.husky/`      |
| **lint-staged** | Pre-commit linting   | `package.json` |

**Các quy tắc quan trọng**:

- **KHÔNG** disable ESLint rules mà không có lý do cụ thể và được approve trong
  code review
- Mọi commit phải pass lint check (enforced by pre-commit hook)
- Code coverage tối thiểu: 80% cho critical modules

### Quy ước đặt tên (Naming Conventions)

| Type                 | Convention | Example                          |
| -------------------- | ---------- | -------------------------------- |
| Variables, Functions | camelCase  | `getUserById`, `isActive`        |
| Classes, Interfaces  | PascalCase | `UserService`, `IUserRepository` |
| DB Tables, Columns   | snake_case | `user_session`, `created_at`     |
| Constants            | UPPER_CASE | `MAX_DEVICES`, `JWT_EXPIRY`      |
| Files (Backend)      | kebab-case | `user-session.service.ts`        |
| Files (Frontend)     | PascalCase | `UserProfile.tsx`                |

---

## Project Structure

### Backend Structure (Modular Monolith)

```
src/
├── common/                 # Shared utilities và helpers
│   ├── decorators/         # Custom decorators
│   ├── filters/            # Exception filters
│   ├── guards/             # Auth guards
│   ├── interceptors/       # Request/Response interceptors
│   └── pipes/              # Validation pipes
├── config/                 # Configuration module
│   ├── database.config.ts
│   ├── redis.config.ts
│   └── jwt.config.ts
├── modules/                # Feature modules (domains)
│   ├── auth/               # Authentication & Authorization
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── dto/
│   │   └── auth.module.ts
│   ├── tournament/         # Tournament system
│   ├── learning/           # Learning module
│   └── ...
├── database/               # Prisma setup
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── seed.ts
├── websocket/              # WebSocket gateway
│   ├── gateways/
│   └── services/
└── main.ts                 # Application entry point
```

### Module Structure Pattern

Mỗi module tuân theo cấu trúc chuẩn:

```
modules/[module-name]/
├── controllers/            # HTTP request handlers
│   └── [name].controller.ts
├── services/               # Business logic
│   └── [name].service.ts
├── repositories/           # Data access layer
│   └── [name].repository.ts
├── dto/                    # Data Transfer Objects
│   ├── create-[name].dto.ts
│   └── update-[name].dto.ts
├── entities/               # Prisma models/types
│   └── [name].entity.ts
├── guards/                 # Module-specific guards
├── interfaces/             # TypeScript interfaces
└── [name].module.ts        # Module definition
```

---

## Development Workflow

### Feature Development Flow

```
Analyze Requirements --> Database Design --> Run Migration --> Implement Backend
      --> Write Unit Tests --> Implement Frontend --> Integration Test --> Code Review --> Merge
```

### Các bước phát triển

1. **Analyze**: Đọc và hiểu requirements từ specs. Clarify với Product Owner nếu
   cần.

2. **Database Design**: Cập nhật `schema.prisma` với các models mới. Tuân thủ
   naming conventions và data rules trong schema.md.

3. **Migration**: Tạo và apply migration:

   ```bash
   npx prisma migrate dev --name <feature-name>
   ```

4. **Implement**: Viết code theo pattern Controller → Service → Repository. Đảm
   bảo separation of concerns.

5. **Test**: Unit tests bắt buộc cho services. Coverage target: 80%+.
   ```bash
   npm run test:cov
   ```

---

## Commit Convention

### Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types

| Type       | Purpose                 | Example                                      |
| ---------- | ----------------------- | -------------------------------------------- |
| `feat`     | New feature             | `feat(auth): add multi-device logout`        |
| `fix`      | Bug fix                 | `fix(tournament): correct score calculation` |
| `docs`     | Documentation           | `docs(api): update auth endpoints`           |
| `refactor` | Code restructuring      | `refactor(user): extract validation logic`   |
| `test`     | Add/update tests        | `test(auth): add session service tests`      |
| `chore`    | Config/build changes    | `chore(deps): update prisma to v7`           |
| `perf`     | Performance improvement | `perf(query): add index for user lookup`     |

### Scope

Scope là tên module hoặc component: `auth`, `tournament`, `learning`, `api`,
`db`, `ui`, etc.

---

## Code Review Guidelines

### Danh sách kiểm tra (Checklist) cho người Review

- ✅ Code tuân thủ coding standards
- ✅ Logic chính xác và xử lý edge cases
- ✅ Có unit tests với coverage đủ
- ✅ Không hardcode secrets hoặc credentials
- ✅ Performance không bị ảnh hưởng tiêu cực
- ✅ Documentation được cập nhật (nếu cần)
- ✅ Migration an toàn và reversible

### Merge Criteria

- Ít nhất 1 approval từ team member
- Tất cả CI checks passed
- Không có unresolved comments
- Branch up-to-date với develop

---

## Environment Variables

### Các biến bắt buộc

| Variable               | Description                  | Example                                     |
| ---------------------- | ---------------------------- | ------------------------------------------- |
| `DATABASE_URL`         | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/lms` |
| `REDIS_URL`            | Redis connection string      | `redis://localhost:6379`                    |
| `JWT_SECRET`           | JWT signing secret           | `<secure-random-string>`                    |
| `JWT_EXPIRY`           | Access token expiry          | `15m`                                       |
| `REFRESH_TOKEN_EXPIRY` | Refresh token expiry         | `7d`                                        |

### Ghi chú bảo mật

- **KHÔNG** commit `.env` file
- Sử dụng `.env.example` làm template
- Production secrets phải được quản lý qua secret manager

---

## References

-   [Setup Guide](./setup.md)
-   [Deployment Guide](./deployment.md)
-   [System Design](../../specs/01-architecture/design.md)
-   [Data Model](../../specs/01-architecture/database.md)
-   [Team Handbook](./contributing.md)
