---
id: development
title: Development Guide
sidebar_label: Development
sidebar_position: 2
---

# Development Guide

Tiêu chuẩn và quy trình phát triển.

---

## Tech Stack

| Layer     | Tech                     | Purpose             |
| --------- | ------------------------ | ------------------- |
| Backend   | `NestJS` + `TypeScript`  | Business logic, API |
| Frontend  | `Next.js` + `TypeScript` | UI, SSR/SSG         |
| Database  | `PostgreSQL` + `Prisma`  | Data, ORM           |
| Cache     | `Redis`                  | Session, caching    |
| Real-time | `Socket.IO`              | WebSocket           |

---

## Code Standards

### Quality Tools

| Tool       | Purpose         | Config         |
| ---------- | --------------- | -------------- |
| `ESLint`   | Static analysis | `.eslintrc.js` |
| `Prettier` | Formatting      | `.prettierrc`  |
| `Husky`    | Git hooks       | `.husky/`      |

### Naming Conventions

| Type                 | Convention | Example                   |
| -------------------- | ---------- | ------------------------- |
| Variables, Functions | camelCase  | `getUserById`             |
| Classes, Interfaces  | PascalCase | `UserService`             |
| DB Tables, Columns   | snake_case | `user_session`            |
| Constants            | UPPER_CASE | `MAX_DEVICES`             |
| Files (Backend)      | kebab-case | `user-session.service.ts` |
| Files (Frontend)     | PascalCase | `UserProfile.tsx`         |

---

## Project Structure

```
src/
├── common/         # Shared utilities
├── config/         # Configuration
├── modules/        # Feature modules
│   ├── auth/
│   ├── learning/
│   └── tournament/
├── database/       # Prisma setup
├── websocket/      # WebSocket gateway
└── main.ts
```

---

## Development Flow

```
Analyze → Database Design → Migration → Implement → Test → Review → Merge
```

### Key Steps

1. **Analyze**: Đọc requirements từ specs
2. **Database**: Cập nhật `schema.prisma`
3. **Migration**: `npx prisma migrate dev`
4. **Implement**: Controller → Service → Repository
5. **Test**: Unit tests, 80%+ coverage

---

## Environment Variables

| Variable       | Description               |
| -------------- | ------------------------- |
| `DATABASE_URL` | PostgreSQL connection     |
| `REDIS_URL`    | Redis connection          |
| `JWT_SECRET`   | JWT signing secret        |
| `JWT_EXPIRY`   | Access token expiry (15m) |

> ⚠️ **KHÔNG** commit `.env` file

---
