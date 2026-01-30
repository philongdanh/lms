---
id: tech
title: Tech Stack
sidebar_label: Tech
sidebar_position: 2
---

# Tech Stack

Lựa chọn công nghệ và tiêu chuẩn kỹ thuật cho hệ thống.

---

## Backend

| Thành phần | Công nghệ                 | Lý do lựa chọn                                                                                                                                             | SSoT                                                   |
| ---------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Runtime    | Node.js 20+ LTS           | [0003: Node.js](decisions/0003-nodejs.md)                                                                                                                  | [`NFR-PERF-01`](../product/constraints.md#performance) |
| Framework  | NestJS 10+                | [0001: Modular Monolith](decisions/0001-modular-monolith.md)                                                                                               | [`TC-ARCH-01`](../product/constraints.md#architecture) |
| ORM        | Prisma 5+                 | [0005: Prisma](decisions/0005-prisma.md), [0006: Cascade Delete](decisions/0006-cascade-delete.md)                                                         | [`TC-ARCH-02`](../product/constraints.md#architecture) |
| Database   | PostgreSQL 15+            | [0004: PostgreSQL](decisions/0004-postgresql.md)                                                                                                           | [`TC-ARCH-02`](../product/constraints.md#architecture) |
| Cache      | Redis 7+                  | [0007: Redis](decisions/0007-redis.md)                                                                                                                     | [`TC-ARCH-03`](../product/constraints.md#architecture) |
| Realtime   | Socket.IO + Redis adapter | [0010: Socket.IO](decisions/0010-socketio.md)                                                                                                              | [`TC-ARCH-05`](../product/constraints.md#architecture) |
| Auth       | Passport.js + JWT         | [0008: JWT Refresh Token](decisions/0008-jwt-refresh-token.md), [0002: Multi Tenant](decisions/0002-multi-tenant.md), [0009: RBAC](decisions/0009-rbac.md) | [`NFR-SEC-03`](../product/constraints.md#security)     |

## Frontend

| Thành phần | Công nghệ                  | Lý do lựa chọn                                | SSoT                                                       |
| ---------- | -------------------------- | --------------------------------------------- | ---------------------------------------------------------- |
| Framework  | Next.js 14+ với App Router | [0020: Next.js](decisions/0020-nextjs.md)     | [`NFR-PERF-04`](../product/constraints.md#performance)     |
| UI Library | React 18+ với TypeScript   | [0021: React](decisions/0021-react.md)        | [`BC-005`](../product/constraints.md#business-constraints) |
| State      | Zustand + React Context    | [0022: Zustand](decisions/0022-zustand.md)    | [`BC-005`](../product/constraints.md#business-constraints) |
| Styling    | TailwindCSS 3.x            | [0023: Tailwind](decisions/0023-tailwind.md)  | [`NFR-PERF-04`](../product/constraints.md#performance)     |
| Components | RetroUI                    | [0024: RetroUI](decisions/0024-retroui.md)    | [`BC-005`](../product/constraints.md#business-constraints) |
| Realtime   | Socket.IO Client 4.x       | [0010: Socket.IO](decisions/0010-socketio.md) | [`TC-ARCH-05`](../product/constraints.md#architecture)     |

## Infrastructure

| Thành phần    | Công nghệ                | Mô tả                                                      | SSoT                                                       |
| ------------- | ------------------------ | ---------------------------------------------------------- | ---------------------------------------------------------- |
| Container     | Docker 24+               | [0030: Docker](decisions/0030-docker.md)                   | [`TC-ARCH-04`](../product/constraints.md#architecture)     |
| Orchestration | Docker Compose           | [0030: Docker](decisions/0030-docker.md)                   | [`TC-ARCH-04`](../product/constraints.md#architecture)     |
| Load Balancer | Nginx                    | [0032: Nginx](decisions/0032-nginx.md)                     | [`NFR-PERF-01`](../product/constraints.md#performance)     |
| CI/CD         | GitHub Actions           | [0031: Github Actions](decisions/0031-github-actions.md)   | [`BC-005`](../product/constraints.md#business-constraints) |
| File Storage  | Local + Nginx            | [0032: Nginx](decisions/0032-nginx.md) (Phục vụ file tĩnh) | [`BC-006`](../product/constraints.md#business-constraints) |
| Monitoring    | Winston + custom metrics | [0012: Winston](decisions/0012-winston.md)                 | [`BC-005`](../product/constraints.md#business-constraints) |
