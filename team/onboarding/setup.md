---
id: setup
title: Setup Guide
sidebar_label: Setup
sidebar_position: 1
---

# Setup Guide

Hướng dẫn cài đặt và thiết lập môi trường phát triển.

---

## Prerequisites

### Yêu cầu môi trường

| Software       | Version | Purpose           |
| -------------- | ------- | ----------------- |
| Node.js        | 20.x+   | Runtime           |
| Docker         | 20.10+  | Container         |
| Docker Compose | v2.0+   | Orchestration     |
| Git            | 2.30+   | Version control   |
| VS Code        | Latest  | IDE (khuyên dùng) |

### Access rights

| Resource              | Requirement   |
| --------------------- | ------------- |
| Git Repository        | Clone access  |
| NPM Registry          | Read access   |
| Docker Hub            | Pull access   |
| Cloud (if applicable) | Deploy access |

---

## Installation

### Các bước cài đặt

**1. Clone repo:**

```bash
git clone <repository_url>
cd lms-project
git checkout develop
```

**2. Cấu hình biến môi trường:**

```bash
cp .env.example .env
```

| Variable       | Description           | Dev Value                                               |
| -------------- | --------------------- | ------------------------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection | `postgresql://postgres:postgres@localhost:5432/lms_dev` |
| `REDIS_URL`    | Redis connection      | `redis://localhost:6379`                                |
| `JWT_SECRET`   | JWT signing key       | `dev-secret-key`                                        |

**3. Khởi động infrastructure:**

```bash
docker-compose up -d postgres redis
docker-compose ps
```

**4. Cài đặt dependencies:**

```bash
npm install
npx prisma generate
```

**5. Khởi tạo database:**

```bash
npx prisma migrate dev
npx prisma db seed
```

**6. Chạy development server:**

```bash
npm run start:dev
```

**7. Xác minh cài đặt:**

```bash
curl http://localhost:3000/health
# Expected: {"status": "ok", "database": "connected", "redis": "connected"}
```

---
