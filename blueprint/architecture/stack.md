---
id: stack
title: Technology Stack
sidebar_label: Tech Stack
sidebar_position: 2
---

# Technology Stack

Lựa chọn công nghệ và tiêu chuẩn kỹ thuật cho hệ thống.

---

## Overview

### Frontend Tech

| Component | Technology | Lý do lựa chọn |
| --------- | ---------- | -------------- |
| Framework | Next.js 14+ với App Router | SSR/SSG tốt, SEO friendly |
| UI Library | React 18+ với TypeScript | Type-safe, ecosystem lớn |
| State | Zustand + React Context | Đơn giản, nhẹ |
| Styling | TailwindCSS 3.x | Utility-first, nhất quán |
| Components | HeroUI | Tái sử dụng, phù hợp giáo dục |
| Realtime | Socket.IO Client 4.x | WebSocket ổn định, auto reconnect |
| Charts | Recharts | Nhẹ, tương thích React |

### Backend Tech

| Component | Technology | Lý do lựa chọn |
| --------- | ---------- | -------------- |
| Runtime | Node.js 20+ LTS | Non-blocking I/O, TypeScript native |
| Framework | NestJS 10+ | Module hóa, DI, enterprise-ready |
| ORM | Prisma 5+ | Type-safe, migration tốt |
| Database | PostgreSQL 15+ | ACID, JSONB, row-level security |
| Cache | Redis 7+ | Cache, session, pub/sub |
| Realtime | Socket.IO + Redis adapter | Room-based, scaling |
| Auth | Passport.js + JWT | Multi-tenant, RBAC |
| Queue | BullMQ + Redis | Async jobs, scheduled tasks |

### Infrastructure

| Component | Technology | Mô tả |
| --------- | ---------- | ----- |
| Container | Docker 24+ | Multi-stage builds |
| Orchestration | Docker Compose | On-premise deployment |
| Load Balancer | Nginx | Reverse proxy, WebSocket support |
| CI/CD | GitHub Actions | Build, test, deploy tự động |
| File Storage | Local + Nginx | On-premise video/docs |
| Monitoring | Winston + custom metrics | Structured logging |

---

## Decisions

### Lý do chọn lựa

| Quyết định | Lựa chọn khả thi | Đã chọn | Lý do |
| ---------- | ---------------- | ------- | ----- |
| Backend Framework | Express, Fastify, NestJS | NestJS | Module hóa tốt, TypeScript first |
| ORM | TypeORM, Prisma, Sequelize | Prisma | Type-safe, DX tốt |
| Frontend | React SPA, Vue, Angular | Next.js | SSR, SEO tốt |
| Realtime | Socket.IO, ws, Pusher | Socket.IO | Fallback tự động, room support |
| Database | PostgreSQL, MySQL, MongoDB | PostgreSQL | ACID, JSONB, structured data |
| Cache | Redis, Memcached | Redis | All-in-one: cache, pub/sub, queue |
| Orchestration | Docker Compose, K8s | Docker Compose | Đơn giản, phù hợp on-premise |

### Technology Adoption Roadmap

| Giai đoạn | Timeline | Focus |
| --------- | -------- | ----- |
| Phase 1 | 25/01 - 15/02 | Core stack: Next.js, NestJS, PostgreSQL, Prisma |
| Phase 2 | 16/02 - 01/03 | Gamification, Python AI, Winston logging |
| Phase 3 | 02/03 - 15/03 | AI personalization, Redis cluster, 2FA |

---
