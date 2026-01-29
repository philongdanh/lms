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

| Phần mềm       | Phiên bản | Mục đích          |
| -------------- | --------- | ----------------- |
| Node.js        | 20.x+     | Môi trường chạy   |
| Docker         | 20.10+    | Container         |
| Docker Compose | v2.0+     | Điều phối         |
| Git            | 2.30+     | Quản lý phiên bản |
| VS Code        | Mới nhất  | IDE (khuyên dùng) |

### Quyền truy cập

| Tài nguyên     | Yêu cầu               |
| -------------- | --------------------- |
| Git Repository | Quyền truy cập Clone  |
| NPM Registry   | Quyền truy cập Read   |
| Docker Hub     | Quyền truy cập Pull   |
| Cloud (nếu có) | Quyền truy cập Deploy |

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

| Biến           | Mô tả              | Giá trị Dev                                             |
| -------------- | ------------------ | ------------------------------------------------------- |
| `DATABASE_URL` | Kết nối PostgreSQL | `postgresql://postgres:postgres@localhost:5432/lms_dev` |
| `REDIS_URL`    | Kết nối Redis      | `redis://localhost:6379`                                |
| `JWT_SECRET`   | Khóa ký JWT        | `dev-secret-key`                                        |

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
