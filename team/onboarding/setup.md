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

### Environment Requirements

| Software       | Version | Purpose           |
| -------------- | ------- | ----------------- |
| Node.js        | 20.x+   | Runtime           |
| Docker         | 20.10+  | Container         |
| Docker Compose | v2.0+   | Orchestration     |
| Git            | 2.30+   | Version control   |
| VS Code        | Latest  | IDE (khuyên dùng) |

### Access Rights

| Resource              | Requirement   |
| --------------------- | ------------- |
| Git Repository        | Clone access  |
| NPM Registry          | Read access   |
| Docker Hub            | Pull access   |
| Cloud (if applicable) | Deploy access |

---

## Installation

### Quy trình Cài đặt (Step-by-Step)

**1. Clone Source Code:**

```bash
git clone <repository_url>
cd lms-project
git checkout develop
```

**2. Thiết lập Biến môi trường (Environment Variables):**

```bash
cp .env.example .env
```

| Variable       | Description           | Dev Value                                               |
| -------------- | --------------------- | ------------------------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection | `postgresql://postgres:postgres@localhost:5432/lms_dev` |
| `REDIS_URL`    | Redis connection      | `redis://localhost:6379`                                |
| `JWT_SECRET`   | JWT signing key       | `dev-secret-key`                                        |

**3. Khởi chạy Hạ tầng (Infrastructure):**

```bash
docker-compose up -d postgres redis
docker-compose ps
```

**4. Cài đặt Thư viện phụ thuộc (Dependencies):**

```bash
npm install
npx prisma generate
```

**5. Khởi tạo & Seed Database:**

```bash
npx prisma migrate dev
npx prisma db seed
```

**6. Khởi chạy Development Server:**

```bash
npm run start:dev
```

**7. Kiểm tra Trạng thái hệ thống (Health Check):**

```bash
curl http://localhost:3000/health
# Expected: {"status": "ok", "database": "connected", "redis": "connected"}
```

---
