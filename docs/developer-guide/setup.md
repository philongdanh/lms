---
id: setup
title: Setup Guide
sidebar_label: Setup
---

# Setup Guide

Hướng dẫn cài đặt môi trường phát triển cho LMS Platform. Kết quả: môi trường development hoàn chỉnh với tất cả dependencies cần thiết.


## System Requirements

### Required Software

| Software | Version | Purpose | Download |
|----------|---------|---------|----------|
| **Node.js** | 18.x+ | JavaScript runtime | [nodejs.org](https://nodejs.org) |
| **Docker** | 20.10+ | Containerization | [docker.com](https://docker.com) |
| **Docker Compose** | v2.0+ | Multi-container orchestration | Included with Docker Desktop |
| **Git** | 2.30+ | Version control | [git-scm.com](https://git-scm.com) |
| **VS Code** | Latest | IDE (recommended) | [code.visualstudio.com](https://code.visualstudio.com) |

### Recommended Extensions

| Extension | Purpose |
|-----------|---------|
| ESLint | Linting integration |
| Prettier | Code formatting |
| Prisma | Prisma schema highlighting |
| GitLens | Git integration |
| Thunder Client | API testing |


## Environment Setup

### Clone Repository

```bash
# Clone repository
git clone <repository_url>
cd lms-project

# Checkout develop branch
git checkout develop
```

### Configure Environment Variables

Copy file `.env.example` thành `.env` và cập nhật các giá trị:

```bash
cp .env.example .env
```

**Các biến cần cấu hình**:

| Variable | Description | Development Value |
|----------|-------------|-------------------|
| `DATABASE_URL` | PostgreSQL connection | `postgresql://postgres:postgres@localhost:5432/lms_dev` |
| `REDIS_URL` | Redis connection | `redis://localhost:6379` |
| `JWT_SECRET` | JWT signing key | `dev-secret-key-change-in-production` |
| `JWT_EXPIRY` | Access token TTL | `15m` |
| `REFRESH_TOKEN_EXPIRY` | Refresh token TTL | `7d` |
| `MAX_DEVICES_PER_USER` | Device limit | `3` |

### Start Infrastructure

Khởi động PostgreSQL và Redis bằng Docker Compose:

```bash
# Start database và cache services
docker-compose up -d postgres redis

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
# Install Node.js dependencies
npm install

# Generate Prisma client
npx prisma generate
```

### Initialize Database

Chạy migrations và seed data:

```bash
# Run database migrations
npx prisma migrate dev

# Seed initial data (roles, permissions, subjects, grades)
npx prisma db seed
```

**Seed Data bao gồm**:
- 5 Roles: `root-admin`, `tenant-admin`, `teacher`, `parent`, `student`
- Permission groups: `user:*`, `content:*`, `exam:*`, `tournament:*`, etc.
- Subjects: Toán, Tiếng Việt, Toán Tiếng Anh
- Grades: 1-12
- Sample badges


## Running the Application

### Development Mode

```bash
# Start NestJS in watch mode
npm run start:dev
```

**Endpoints**:

| URL | Description |
|-----|-------------|
| `http://localhost:3000` | API Server |
| `http://localhost:3000/api/docs` | Swagger API Documentation |
| `http://localhost:3000/health` | Health Check |

### Frontend Development Mode

```bash
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


## Troubleshooting

### Database Connection Issues

**Symptom**: `Can't reach database server`

**Solution**:
```bash
# Kiểm tra postgres container
docker-compose ps postgres

# Restart nếu cần
docker-compose restart postgres

# Kiểm tra logs
docker-compose logs postgres
```

### Prisma Client Out of Sync

**Symptom**: `Unknown field` hoặc `Property does not exist`

**Solution**:
```bash
# Regenerate Prisma client
npx prisma generate

# Restart development server
npm run start:dev
```

### Port Already in Use

**Symptom**: `EADDRINUSE: address already in use`

**Solution**:
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Redis Connection Failed

**Symptom**: `ECONNREFUSED 127.0.0.1:6379`

**Solution**:
```bash
# Kiểm tra Redis container
docker-compose ps redis

# Restart Redis
docker-compose restart redis
```


## Common Commands

| Command | Purpose |
|---------|---------|
| `docker-compose up -d` | Start all services |
| `docker-compose down` | Stop all services |
| `docker-compose logs -f` | View logs (follow) |
| `docker-compose ps` | List running containers |
| `docker-compose restart <service>` | Restart specific service |
| `docker-compose exec postgres psql -U postgres` | Access PostgreSQL shell |
| `docker-compose exec redis redis-cli` | Access Redis CLI |


## References

- [Development Guide](./development.md)
- [Deployment Guide](./deployment.md)
- [System Design](/specs/architecture/system-design)
- [Data Model](/specs/architecture/data-model)
