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

| Component     | Tech              | Description         |
| ------------- | ----------------- | ------------------- |
| Application   | NestJS (Node 18+) | Stateless container |
| Database      | PostgreSQL 14+    | Multi-tenant data   |
| Cache         | Redis 6+          | Session, Pub/Sub    |
| Load Balancer | Nginx             | SSL, WebSocket      |
| File Storage  | Local/S3          | Video, images       |

---

## Docker Compose

### Requirements

| Requirement    | Min Version |
| -------------- | ----------- |
| Docker Engine  | 20.10+      |
| Docker Compose | v2.0+       |
| RAM            | 4GB+        |
| Storage        | 20GB+       |

### Services

| Service  | Image                | Port |
| -------- | -------------------- | ---- |
| app      | `node:18-alpine`     | 3000 |
| postgres | `postgres:14-alpine` | 5432 |
| redis    | `redis:6-alpine`     | 6379 |

---

## Deployment Process

### Zero-Downtime

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

### Database Backup

```bash
# Daily automated backup
docker-compose exec -T postgres pg_dump -U postgres lms_db | gzip > backup.sql.gz
```

### Restore

```bash
docker-compose stop app
cat backup.sql | docker-compose exec -T postgres psql -U postgres lms_db
docker-compose start app
```

---

## Health Checks

| Endpoint        | Purpose               |
| --------------- | --------------------- |
| `/health`       | Liveness check        |
| `/health/ready` | Readiness check       |
| `/health/db`    | Database connectivity |
| `/health/redis` | Redis connectivity    |

---
