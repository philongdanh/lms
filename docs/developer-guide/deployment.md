---
id: deployment
title: Deployment Guide
sidebar_label: Deployment
sidebar_position: 3
---

# Deployment Guide

Mô tả quy trình triển khai LMS Platform lên production. Hệ thống triển khai dưới
dạng container với Docker, hỗ trợ on-premise và cloud. Kiến trúc stateless cho
phép horizontal scaling và zero-downtime deployment.

---

## Infrastructure Architecture

### Các thành phần chính

| Component         | Tech              | Description                                       |
| ----------------- | ----------------- | ------------------------------------------------- |
| **Application**   | NestJS (Node 18+) | Stateless container, có thể scale horizontally    |
| **Database**      | PostgreSQL 14+    | Lưu trữ dữ liệu chính với hỗ trợ đa thực thể (multi-tenant) |
| **Cache**         | Redis 6+          | Lưu trữ session, blacklisting token, Pub/Sub      |
| **Load Balancer** | Nginx             | Reverse proxy, SSL termination, hỗ trợ WebSocket  |
| **File Storage**  | Local/S3          | Lưu trữ tệp tin (video, hình ảnh, tài liệu)       |

### Sơ đồ hạ tầng

```d2

---

# Infrastructure Architecture
Client: Clients

LB: Load Balancer {
  Nginx: Nginx (SSL + LB)
}

App: Application Tier {
  App1: App Instance 1
  App2: App Instance 2
  AppN: App Instance N
}

Data: Data Tier {
  Redis: Redis Cluster { shape: cylinder }
  PG: PostgreSQL { shape: cylinder }
  Storage: File Storage { shape: cylinder }
}

Client -> LB.Nginx
LB.Nginx -> App.App1
LB.Nginx -> App.App2
LB.Nginx -> App.AppN

App.App1 -> Data.Redis
App.App1 -> Data.PG
App.App1 -> Data.Storage
App.App2 -> Data.Redis
App.App2 -> Data.PG
App.AppN -> Data.Redis
```

    AppN --> PG

````

---

## Docker Compose Deployment

### Yêu cầu hệ thống

| Requirement | Min Version     | Notes |
|-------------|-----------------|-------|
| Docker Engine | 20.10+ | Hỗ trợ multi-stage builds |
| Docker Compose | v2.0+ | Compose v2 syntax |
| RAM | 4GB+ | Tối thiểu cho development |
| Storage | 20GB+ | Database + Files |

### Cấu hình Docker Compose

File `docker-compose.yml` định nghĩa các services:

| Service | Image | Port | Volumes |
|---------|-------|------|---------|
| **app** | `node:18-alpine` | 3000 | Source code, node_modules |
| **postgres** | `postgres:14-alpine` | 5432 | Data directory (persistent) |
| **redis** | `redis:6-alpine` | 6379 | AOF persistence enabled |

### Cấu hình Nginx WebSocket

Nginx cần được cấu hình để hỗ trợ WebSocket connections cho real-time features (thi đấu, thông báo):

```nginx
upstream app_servers {
    server app:3000;

---

    # Thêm server khi scale
}

server {
    listen 80;
    listen 443 ssl http2;

---

    # SSL Configuration
    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;

---

    # HTTP to HTTPS redirect
    if ($scheme = http) {
        return 301 https://$host$request_uri;
    }

---

    # REST API và Static files
    location / {
        proxy_pass http://app_servers;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

---

    # WebSocket connections
    location /socket.io/ {
        proxy_pass http://app_servers;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

---

        # WebSocket timeout
        proxy_read_timeout 86400;
        proxy_send_timeout 86400;
    }
}
````

---

## Deployment Process

### Triển khai không gián đoạn (Zero-Downtime)

Để đạt được zero-downtime deployment, thực hiện theo các bước sau:

1. **Pull Latest Code**:

   ```bash
   git pull origin main
   ```

2. **Build New Images**:

   ```bash
   docker-compose build --no-cache app
   ```

3. **Run Database Migrations**:

   ```bash
   docker-compose exec app npx prisma migrate deploy
   ```

4. **Rolling Update**:
   ```bash
   docker-compose up -d --no-deps --scale app=2 app
   ```

---

# Đợi new instance healthy

docker-compose up -d --no-deps --scale app=1 app

````

### Triển khai Blue-Green (Production)

Cho môi trường production với yêu cầu cao về availability:

```d2

---

# Blue-Green Deployment Sequence
direction: right

LB: Load Balancer
Blue: Blue Environment
Green: Green Environment
DB: Database { shape: cylinder }

---

# Current state
LB -> Blue: "1. Current active"

---

# Deployment steps
Green -> DB: "2. Run migrations"
Green: "3. Deploy new version" {
style.stroke: green
}

---

# Switch traffic
LB -> Green: "4. Switch traffic" {
style.stroke-dash: 3
}

---

# Cleanup
Blue: "5. Keep for rollback (30 min), then shutdown" {
style.opacity: 0.5
}
````

---

## Backup & Recovery

### Sao lưu Database (Backup)

**Automated Daily Backup**:

```bash

---

# Cron job: 0 2 * * *
#!/bin/bash
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
FILENAME="lms_db_${DATE}.sql.gz"

docker-compose exec -T postgres pg_dump -U postgres lms_db | gzip > ${BACKUP_DIR}/${FILENAME}

---

# Cleanup backups older than 30 days
find ${BACKUP_DIR} -name "lms_db_*.sql.gz" -mtime +30 -delete
```

**Manual Backup**:

```bash
docker-compose exec postgres pg_dump -U postgres lms_db > backup_$(date +%F).sql
```

### Phục hồi Database (Restore)

```bash

---

# Stop application
docker-compose stop app

---

# Restore database
cat backup_file.sql | docker-compose exec -T postgres psql -U postgres lms_db

---

# Restart application
docker-compose start app
```

### Tính bền vững của Redis (Persistence)

Redis được cấu hình với AOF persistence để đảm bảo data durability:

- **AOF**: Append Only File với fsync every second
- **RDB**: Snapshot mỗi 1 giờ hoặc 1000 changes

---

## Monitoring & Logging

### Kiểm tra sức khỏe hệ thống (Health Checks)

Hệ thống expose các health check endpoints:

| Endpoint        | Purpose               | Response              |
| --------------- | --------------------- | --------------------- |
| `/health`       | Liveness check        | `200 OK`              |
| `/health/ready` | Readiness check       | `200 OK` with details |
| `/health/db`    | Database connectivity | `200 OK`              |
| `/health/redis` | Redis connectivity    | `200 OK`              |

### Quản lý Log tập trung (Centralized Logging)

Application logs được structured và gửi đến centralized logging stack:

- **Format**: JSON structured logs
- **Fields**: timestamp, level, message, request_id, tenant_id, user_id
- **Retention**: 30 ngày cho production logs

---

## Scaling Strategy

### Mở rộng quy mô theo chiều ngang (Horizontal Scaling)

| Tier            | Strategy        | Trigger                     |
| --------------- | --------------- | --------------------------- |
| **Application** | Scale instances | CPU > 70% hoặc memory > 80% |
| **Redis**       | Cluster mode    | > 10k connections           |
| **Database**    | Read replicas   | Query latency > 100ms       |

### Mở rộng quy quy mô theo chiều dọc (Vertical Scaling)

| Component     | Min Spec           | Recommended    | High Load      |
| ------------- | ------------------ | -------------- | -------------- |
| App Container | 512MB RAM, 0.5 CPU | 1GB RAM, 1 CPU | 2GB RAM, 2 CPU |
| PostgreSQL    | 2GB RAM            | 4GB RAM        | 8GB+ RAM       |
| Redis         | 512MB RAM          | 1GB RAM        | 2GB RAM        |

---

## Rollback Procedure

Khi deployment gặp vấn đề, thực hiện rollback:

```bash

---

# 1. Rollback application
docker-compose down app
docker-compose up -d app --force-recreate

---

# 2. Nếu cần rollback database migration
docker-compose exec app npx prisma migrate resolve --rolled-back <migration_name>
```

---

## References

- [Setup Guide](./setup.md)
- [Development Guide](./development.md)
- [System Design](../specs/01-architecture/system-design.md)
- [Data Model](../specs/01-architecture/data-model.md)
- [API Standards](../specs/01-architecture/cross-cutting/api-gateway.md)
