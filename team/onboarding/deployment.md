---
id: deployment
title: Deployment Guide
sidebar_label: Deployment
sidebar_position: 3
---

# Deployment Guide

Hướng dẫn triển khai hệ thống.

---

## Infrastructure

| Thành phần    | Công nghệ             | Mô tả               |
| ------------- | --------------------- | ------------------- |
| Application   | `NestJS` (`Node` 20+) | Stateless container |
| Database      | `PostgreSQL` 14+      | Multi-tenant data   |
| Cache         | `Redis` 6+            | Session, Pub/Sub    |
| Load Balancer | `Nginx`               | SSL, WebSocket      |
| File Storage  | Local/S3              | Video, hình ảnh     |

---

## Docker Compose

### Yêu cầu

| Yêu cầu        | Phiên bản tối thiểu |
| -------------- | ------------------- |
| Docker Engine  | 20.10+              |
| Docker Compose | v2.0+               |
| RAM            | 4GB+                |
| Storage        | 20GB+               |

### Dịch vụ

| Dịch vụ  | Image                | Cổng |
| -------- | -------------------- | ---- |
| app      | `node:20-alpine`     | 3000 |
| postgres | `postgres:14-alpine` | 5432 |
| redis    | `redis:6-alpine`     | 6379 |

---

## Deployment Process

### Triển khai Zero-Downtime

```bash
# 1. Pull code
git pull origin main

# 2. Build
docker-compose build --no-cache app

# 3. Migrate
docker-compose exec app npx prisma migrate deploy

# 4. Rolling update
docker-compose up -d --no-deps --scale app=2 app
# Wait for healthy, then scale back
docker-compose up -d --no-deps --scale app=1 app
```

---

## Backup & Recovery

### Sao lưu Database

```bash
# Daily automated backup
docker-compose exec -T postgres pg_dump -U postgres lms_db | gzip > backup.sql.gz
```

### Khôi phục

```bash
docker-compose stop app
cat backup.sql | docker-compose exec -T postgres psql -U postgres lms_db
docker-compose start app
```

---

## Health Checks

| Endpoint        | Mục đích                      |
| --------------- | ----------------------------- |
| `/health`       | Kiểm tra sống (Liveness)      |
| `/health/ready` | Kiểm tra sẵn sàng (Readiness) |
| `/health/db`    | Kết nối Database              |
| `/health/redis` | Kết nối Redis                 |

---
