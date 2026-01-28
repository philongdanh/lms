---
id: tech
title: Tech Stack
sidebar_label: Tech
sidebar_position: 2
---

# Tech Stack

Lựa chọn công nghệ và tiêu chuẩn kỹ thuật cho hệ thống.

---

## BE

| Component | Technology                | Lý do lựa chọn                                                                                                                    |
| --------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Runtime   | Node.js 20+ LTS           | [ADR-003: Node.js 20+ LTS](decisions/0003-nodejs.md)                                                                              |
| Framework | NestJS 10+                | [ADR-001: Modular Monolith](decisions/0001-modular-monolith.md)                                                                   |
| ORM       | Prisma 5+                 | [ADR-005: Prisma ORM](decisions/0005-prisma.md), [ADR-006: Cascade Delete](decisions/0006-cascade-delete.md)                      |
| Database  | PostgreSQL 15+            | [ADR-004: PostgreSQL as Primary Database](decisions/0004-postgresql.md)                                                           |
| Cache     | Redis 7+                  | [ADR-007: Redis for Cache and Pub/Sub](decisions/0007-redis.md)                                                                   |
| Realtime  | Socket.IO + Redis adapter | [ADR-010: Socket.IO with Redis Adapter](decisions/0010-socketio.md)                                                               |
| Auth      | Passport.js + JWT         | [ADR-008: JWT](decisions/0008-jwt-refresh-token.md), [ADR-002](decisions/0002-multi-tenant.md), [ADR-009](decisions/0009-rbac.md) |
| Queue     | BullMQ + Redis            | [ADR-011: BullMQ](decisions/0011-bullmq.md), [ADR-007: Redis](decisions/0007-redis.md)                                            |

## FE

| Component  | Technology                 | Lý do lựa chọn                                     |
| ---------- | -------------------------- | -------------------------------------------------- |
| Framework  | Next.js 14+ với App Router | [ADR-020: Next.js](decisions/0020-nextjs.md)       |
| UI Library | React 18+ với TypeScript   | [ADR-021: React 18+](decisions/0021-react.md)      |
| State      | Zustand + React Context    | [ADR-022: Zustand](decisions/0022-zustand.md)      |
| Styling    | TailwindCSS 3.x            | [ADR-023: TailwindCSS](decisions/0023-tailwind.md) |
| Components | HeroUI                     | [ADR-024: HeroUI](decisions/0024-heroui.md)        |
| Realtime   | Socket.IO Client 4.x       | [ADR-010: Socket.IO](decisions/0010-socketio.md)   |
| Charts     | Recharts                   | [ADR-025: Recharts](decisions/0025-recharts.md)    |

## Infra

| Component     | Technology               | Mô tả                                                           |
| ------------- | ------------------------ | --------------------------------------------------------------- |
| Container     | Docker 24+               | [ADR-030: Docker & Docker Compose](decisions/0030-docker.md)    |
| Orchestration | Docker Compose           | [ADR-030: Docker & Docker Compose](decisions/0030-docker.md)    |
| Load Balancer | Nginx                    | [ADR-032: Nginx](decisions/0032-nginx.md)                       |
| CI/CD         | GitHub Actions           | [ADR-031: GitHub Actions](decisions/0031-github-actions.md)     |
| File Storage  | Local + Nginx            | [ADR-032: Nginx](decisions/0032-nginx.md) (Static File Serving) |
| Monitoring    | Winston + custom metrics | [ADR-012: Winston](decisions/0012-winston.md)                   |

---

## Technology Adoption Roadmap

| Giai đoạn | Timeline      | Focus                                           |
| --------- | ------------- | ----------------------------------------------- |
| Phase 1   | 25/01 - 15/02 | Core stack: Next.js, NestJS, PostgreSQL, Prisma |
| Phase 2   | 16/02 - 01/03 | Gamification, Python AI, Winston logging        |
| Phase 3   | 02/03 - 15/03 | AI personalization, Redis cluster, 2FA          |

---
