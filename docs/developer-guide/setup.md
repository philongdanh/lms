---
id: setup
title: Setup Guide
sidebar_label: Setup
sidebar_position: 1
---

# Setup Guide

Hướng dẫn cài đặt môi trường phát triển cho LMS Platform. Kết quả: môi trường
development hoàn chỉnh với tất cả dependencies cần thiết.

---

## System Requirements

### Required Software

| Software           | Version | Purpose                              | Download                                               |
| ------------------ | ------- | ------------------------------------ | ------------------------------------------------------ |
| **Node.js**        | 18.x+   | Môi trường chạy JavaScript (Runtime) | [nodejs.org](https://nodejs.org)                       |
| **Docker**         | 20.10+  | Container hóa                        | [docker.com](https://docker.com)                       |
| **Docker Compose** | v2.0+   | Điều phối đa container               | Có sẵn trong Docker Desktop                            |
| **Git**            | 2.30+   | Quản lý phiên bản                    | [git-scm.com](https://git-scm.com)                     |
| **VS Code**        | Latest  | IDE (Khuyên dùng)                    | [code.visualstudio.com](https://code.visualstudio.com) |

### Recommended Extensions

| Extension      | Purpose                    |
| -------------- | -------------------------- |
| ESLint         | Tích hợp Linting           |
| Prettier       | Định dạng code (Formatter) |
| Prisma         | Highlight Prisma schema    |
| GitLens        | Tích hợp Git               |
| Thunder Client | Testing API                |

---

## Environment Setup

### Clone Repository

```bash

---

# Clone repository
git clone <repository_url>
cd lms-project

---

# Checkout develop branch
git checkout develop
```

### Configure Environment Variables

Copy file `.env.example` thành `.env` và cập nhật các giá trị:

```bash
cp .env.example .env
```

**Variables to configure**:

| Variable               | Description            | Development Value                                       |
| ---------------------- | ---------------------- | ------------------------------------------------------- |
| `DATABASE_URL`         | Kết nối PostgreSQL     | `postgresql://postgres:postgres@localhost:5432/lms_dev` |
| `REDIS_URL`            | Kết nối Redis          | `redis://localhost:6379`                                |
| `JWT_SECRET`           | Khóa ký JWT            | `dev-secret-key-change-in-production`                   |
| `JWT_EXPIRY`           | Thời hạn Access token  | `15m`                                                   |
| `REFRESH_TOKEN_EXPIRY` | Thời hạn Refresh token | `7d`                                                    |
| `MAX_DEVICES_PER_USER` | Giới hạn thiết bị      | `3`                                                     |

### Start Infrastructure

Khởi động PostgreSQL và Redis bằng Docker Compose:

```bash

---

# Start database và cache services
docker-compose up -d postgres redis

---

# Verify services are running
docker-compose ps
```

**Expected output**:

```
NAME                SERVICE    STATUS    PORTS
lms-postgres        postgres   running   0.0.0.0:5432->5432/tcp
lms-redis           redis      running   0.0.0.0:6379->6379/tcp
```

### Install Dependencies

```bash

---

# Install Node.js dependencies
npm install

---

# Generate Prisma client
npx prisma generate
```

### Initialize Database

Chạy migrations và seed data:

```bash

---

# Run database migrations
npx prisma migrate dev

---

# Seed initial data (roles, permissions, subjects, grades)
npx prisma db seed
```

**Seed Data includes**:

- 5 Roles: `root-admin`, `tenant-admin`, `teacher`, `parent`, `student`
- Permission groups: `user:*`, `content:*`, `exam:*`, `tournament:*`, etc.
- Subjects: Toán, Tiếng Việt, Toán Tiếng Anh
- Grades: 1-12
- Sample badges

---

## Running the Application

### Development Mode

```bash

---

# Start NestJS in watch mode
npm run start:dev
```

**Endpoints**:

| URL                              | Description               |
| -------------------------------- | ------------------------- |
| `http://localhost:3000`          | API Server                |
| `http://localhost:3000/api/docs` | Swagger API Documentation |
| `http://localhost:3000/health`   | Health Check              |

### Frontend Development Mode

```bash

---

# In frontend directory
cd frontend
npm install
npm run dev
```

**URL**: `http://localhost:3001`

### Verify Installation

Kiểm tra hệ thống hoạt động bằng cách gọi health check:

```bash
curl http://localhost:3000/health
```

**Expected response**:

```json
{
  "status": "ok",
  "database": "connected",
  "redis": "connected"
}
```

---

## Troubleshooting

### Database Connection Issues

**Triệu chứng**: `Can't reach database server`

**Giải pháp**:

```bash

---

# Check postgres container
docker-compose ps postgres

---

# Restart if needed
docker-compose restart postgres

---

# Check logs
docker-compose logs postgres
```

### Prisma Client Out of Sync

**Triệu chứng**: `Unknown field` hoặc `Property does not exist`

**Giải pháp**:

```bash

---

# Regenerate Prisma client
npx prisma generate

---

# Restart development server
npm run start:dev
```

### Port Already in Use

**Triệu chứng**: `EADDRINUSE: address already in use`

**Giải pháp**:

```bash

---

# Find process using port 3000
lsof -i :3000

---

# Kill process
kill -9 <PID>
```

### Redis Connection Failed

**Triệu chứng**: `ECONNREFUSED 127.0.0.1:6379`

**Giải pháp**:

```bash

---

# Check Redis container
docker-compose ps redis

---

# Restart Redis
docker-compose restart redis
```

---

## Common Commands

| Command                                         | Purpose                      |
| ----------------------------------------------- | ---------------------------- |
| `docker-compose up -d`                          | Khởi động tất cả services    |
| `docker-compose down`                           | Dừng tất cả services         |
| `docker-compose logs -f`                        | Xem logs (theo dõi)          |
| `docker-compose ps`                             | Liệt kê container đang chạy  |
| `docker-compose restart <service>`              | Khởi động lại service cụ thể |
| `docker-compose exec postgres psql -U postgres` | Truy cập PostgreSQL shell    |
| `docker-compose exec redis redis-cli`           | Truy cập Redis CLI           |

---

## References

- [Development Guide](./development.md)
- [Deployment Guide](./deployment.md)
- [System Design](../specs/01-architecture/system-design.md)
- [Data Model](../specs/01-architecture/data-model.md)
