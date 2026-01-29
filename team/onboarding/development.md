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

See [Technology Stack](../../blueprint/architecture/tech.md) for full details.

---

## Code Standards

### Quality Tools

| Công cụ    | Mục đích       | Cấu hình       |
| ---------- | -------------- | -------------- |
| `ESLint`   | Phân tích tĩnh | `.eslintrc.js` |
| `Prettier` | Định dạng      | `.prettierrc`  |
| `Husky`    | Git hooks      | `.husky/`      |

### Quy tắc đặt tên

| Loại                | Quy tắc    | Ví dụ                     |
| ------------------- | ---------- | ------------------------- |
| Biến, Hàm           | camelCase  | `getUserById`             |
| Classes, Interfaces | PascalCase | `UserService`             |
| Bảng CSDL, Cột      | snake_case | `user_session`            |
| Hằng số             | UPPER_CASE | `MAX_DEVICES`             |
| Files (Backend)     | kebab-case | `user-session.service.ts` |
| Files (Frontend)    | PascalCase | `UserProfile.tsx`         |

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

### Các bước chính

1. **Analyze**: Đọc requirements từ specs
2. **Database**: Cập nhật `schema.prisma`
3. **Migration**: `npx prisma migrate dev`
4. **Implement**: Controller → Service → Repository
5. **Test**: Unit tests, 80%+ coverage

---
