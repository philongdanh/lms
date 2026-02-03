---
id: system-design
title: System Design
sidebar_label: Design
sidebar_position: 1
---

# System Design

Thiết kế kiến trúc hệ thống và các thành phần chính

---

## Architecture

```d2
direction: right

Web: Web Application
App: Application

Auth: Auth & RBAC Module
Tournament: Tournament Module
OtherModules: ... other modules

WSGateway: WebSocket Gateway
Realtime: Real-time Service
MsgQueue: Message Queue

DataLayer: Data Layer {
  DB: Database {shape: cylinder}
  Redis: Redis Cache & Pub/Sub {shape: cylinder}
  SeaweedFS: SeaweedFS Storage {shape: cylinder}
}

Web -> App
Web -> WSGateway: {style.stroke-dash: 3}
Web -> DataLayer.SeaweedFS: Presigned URL Upload {style.stroke-dash: 3}

App -> Auth
App -> Tournament
App -> OtherModules

Auth -> DataLayer.DB
Tournament -> DataLayer.DB
OtherModules -> DataLayer.DB

Tournament -> Realtime
WSGateway -> Realtime
Realtime -> MsgQueue
MsgQueue -> DataLayer.Redis

App -> DataLayer.Redis
App -> DataLayer.SeaweedFS: Generate Presigned URL
```

---

## Concepts

### Communication

- **GraphQL**: API chính cho queries/mutations
- **Redis Pub/Sub**: Event broadcasting
- **WebSocket**: Socket.IO với cơ chế rooms
- **Presigned URL**: Upload file trực tiếp lên Storage

### Principles

- **Single Responsibility**: Mỗi module một phạm vi
- **Dependency Injection**: Dễ dàng testing
- **Data Isolation**: Dữ liệu độc lập
- **Room-based**: Tổ chức theo phòng ảo
- **Soft Delete**: Chỉ áp dụng cho entity chính

---

## Tech Stack

### BE

| Item      | Tech                      | ADR                                                                                                                |
| --------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Runtime   | Node.js 20+ LTS           | [10: Node.js](decisions/10-nodejs.md)                                                                              |
| Framework | NestJS 10+                | [01: Modular Monolith](decisions/01-monolith.md)                                                                   |
| ORM       | Prisma 7                  | [12: Prisma](decisions/12-prisma.md), [04: Cascade Delete](decisions/04-cascade-delete.md)                         |
| Database  | PostgreSQL 15+            | [11: PostgreSQL](decisions/11-postgresql.md)                                                                       |
| Cache     | Redis 7+                  | [13: Redis](decisions/13-redis.md)                                                                                 |
| Realtime  | Socket.IO + Redis adapter | [15: Socket.IO](decisions/15-socketio.md)                                                                          |
| Auth      | Passport.js + JWT         | [14: JWT](decisions/14-jwt.md), [02: Multi Tenant](decisions/02-multi-tenant.md), [03: RBAC](decisions/03-rbac.md) |

### FE

| Item       | Tech                       | ADR                                       |
| ---------- | -------------------------- | ----------------------------------------- |
| UI Library | React 18+ với TypeScript   | [20: React](decisions/20-react.md)        |
| Framework  | Next.js 14+ với App Router | [21: Next.js](decisions/21-nextjs.md)     |
| State      | Zustand + React Context    | [22: Zustand](decisions/22-zustand.md)    |
| Styling    | TailwindCSS 3.x            | [23: Tailwind](decisions/23-tailwind.md)  |
| Components | RetroUI                    | [24: RetroUI](decisions/24-retroui.md)    |
| Realtime   | Socket.IO Client 4.x       | [15: Socket.IO](decisions/15-socketio.md) |

### Infra

| Item          | Tech                     | ADR                                        |
| ------------- | ------------------------ | ------------------------------------------ |
| Container     | Docker 24+               | [30: Docker](decisions/30-docker.md)       |
| Orchestration | Docker Compose           | [30: Docker](decisions/30-docker.md)       |
| Load Balancer | Nginx                    | [32: Nginx](decisions/32-nginx.md)         |
| CI/CD         | GitHub Actions           | [31: Actions](decisions/31-actions.md)     |
| File Storage  | SeaweedFS                | [33: SeaweedFS](decisions/33-seaweedfs.md) |
| Monitoring    | Winston + custom metrics | [16: Winston](decisions/16-winston.md)     |
