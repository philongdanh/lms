---
id: development
title: Development Guide
sidebar_label: Development
sidebar_position: 2
---

# Development Guide

Tiêu chuẩn và quy trình phát triển.

---

## Tech stack

See [Technology Stack](../../blueprint/architecture/tech.md) for full details.

---

## Code standards

### Quality tools

| Tool       | Purpose         | Config         |
| ---------- | --------------- | -------------- |
| `ESLint`   | Static analysis | `.eslintrc.js` |
| `Prettier` | Formatting      | `.prettierrc`  |
| `Husky`    | Git hooks       | `.husky/`      |

### Naming conventions

| Type                 | Convention | Example                   |
| -------------------- | ---------- | ------------------------- |
| Variables, Functions | camelCase  | `getUserById`             |
| Classes, Interfaces  | PascalCase | `UserService`             |
| DB Tables, Columns   | snake_case | `user_session`            |
| Constants            | UPPER_CASE | `MAX_DEVICES`             |
| Files (Backend)      | kebab-case | `user-session.service.ts` |
| Files (Frontend)     | PascalCase | `UserProfile.tsx`         |

---

## Project structure

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

## Development flow

```
Analyze → Database Design → Migration → Implement → Test → Review → Merge
```

### Key steps

1. **Analyze**: Đọc requirements từ specs
2. **Database**: Cập nhật `schema.prisma`
3. **Migration**: `npx prisma migrate dev`
4. **Implement**: Controller → Service → Repository
5. **Test**: Unit tests, 80%+ coverage

---
