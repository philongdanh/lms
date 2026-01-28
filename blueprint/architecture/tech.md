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
| Runtime   | Node.js 20+ LTS           | [ADR-016: Node.js 20+ LTS](decisions/0016-nodejs.md)                                                                              |
| Framework | NestJS 10+                | [ADR-001: Modular Monolith](decisions/0001-modular-monolith.md)                                                                   |
| ORM       | Prisma 5+                 | [ADR-006: Prisma ORM](decisions/0006-prisma.md), [ADR-009: Cascade Delete](decisions/0009-cascade-delete.md)                      |
| Database  | PostgreSQL 15+            | [ADR-002: PostgreSQL as Primary Database](decisions/0002-postgresql.md)                                                           |
| Cache     | Redis 7+                  | [ADR-004: Redis for Cache and Pub/Sub](decisions/0004-redis.md)                                                                   |
| Realtime  | Socket.IO + Redis adapter | [ADR-005: Socket.IO with Redis Adapter](decisions/0005-socketio.md)                                                               |
| Auth      | Passport.js + JWT         | [ADR-003: JWT](decisions/0003-jwt-refresh-token.md), [ADR-007](decisions/0007-multi-tenant.md), [ADR-008](decisions/0008-rbac.md) |
| Queue     | BullMQ + Redis            | [ADR-021: BullMQ](decisions/0021-bullmq.md), [ADR-004: Redis](decisions/0004-redis.md)                                            |

## FE

| Component  | Technology                 | Lý do lựa chọn                                     |
| ---------- | -------------------------- | -------------------------------------------------- |
| Framework  | Next.js 14+ với App Router | [ADR-010: Next.js](decisions/0010-nextjs.md)       |
| UI Library | React 18+ với TypeScript   | [ADR-020: React 18+](decisions/0020-react.md)      |
| State      | Zustand + React Context    | [ADR-011: Zustand](decisions/0011-zustand.md)      |
| Styling    | TailwindCSS 3.x            | [ADR-012: TailwindCSS](decisions/0012-tailwind.md) |
| Components | HeroUI                     | [ADR-013: HeroUI](decisions/0013-heroui.md)        |
| Realtime   | Socket.IO Client 4.x       | [ADR-005: Socket.IO](decisions/0005-socketio.md)   |
| Charts     | Recharts                   | [ADR-017: Recharts](decisions/0017-recharts.md)    |

## Infra

| Component     | Technology               | Mô tả                                                           |
| ------------- | ------------------------ | --------------------------------------------------------------- |
| Container     | Docker 24+               | [ADR-014: Docker & Docker Compose](decisions/0014-docker.md)    |
| Orchestration | Docker Compose           | [ADR-014: Docker & Docker Compose](decisions/0014-docker.md)    |
| Load Balancer | Nginx                    | [ADR-018: Nginx](decisions/0018-nginx.md)                       |
| CI/CD         | GitHub Actions           | [ADR-015: GitHub Actions](decisions/0015-github-actions.md)     |
| File Storage  | Local + Nginx            | [ADR-018: Nginx](decisions/0018-nginx.md) (Static File Serving) |
| Monitoring    | Winston + custom metrics | [ADR-019: Winston](decisions/0019-winston.md)                   |

---

## Technology Adoption Roadmap

| Giai đoạn | Timeline      | Focus                                           |
| --------- | ------------- | ----------------------------------------------- |
| Phase 1   | 25/01 - 15/02 | Core stack: Next.js, NestJS, PostgreSQL, Prisma |
| Phase 2   | 16/02 - 01/03 | Gamification, Python AI, Winston logging        |
| Phase 3   | 02/03 - 15/03 | AI personalization, Redis cluster, 2FA          |

---
