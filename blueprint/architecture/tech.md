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

| Thành phần | Công nghệ                 | Lý do lựa chọn                                                                                                                                             | SSoT                                                        |
| ---------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Runtime    | Node.js 20+ LTS           | [0003: Node.js](decisions/0003-nodejs.md)                                                                                                                  | [`TC-001`](../product/constraints.md#technical-constraints) |
| Framework  | NestJS 10+                | [0001: Modular Monolith](decisions/0001-modular-monolith.md)                                                                                               | [`TC-ARCH-001`](design.md#architecture)                     |
| ORM        | Prisma 7                  | [0005: Prisma](decisions/0005-prisma.md), [0006: Cascade Delete](decisions/0006-cascade-delete.md)                                                         | [`TC-ARCH-002`](design.md#architecture)                     |
| Database   | PostgreSQL 15+            | [0004: PostgreSQL](decisions/0004-postgresql.md)                                                                                                           | [`TC-ARCH-002`](design.md#architecture)                     |
| Cache      | Redis 7+                  | [0007: Redis](decisions/0007-redis.md)                                                                                                                     | [`TC-ARCH-003`](design.md#architecture)                     |
| Realtime   | Socket.IO + Redis adapter | [0010: Socket.IO](decisions/0010-socketio.md)                                                                                                              | [`TC-ARCH-005`](design.md#architecture)                     |
| Auth       | Passport.js + JWT         | [0008: JWT Refresh Token](decisions/0008-jwt-refresh-token.md), [0002: Multi Tenant](decisions/0002-multi-tenant.md), [0009: RBAC](decisions/0009-rbac.md) | [`TC-008`](../product/constraints.md#technical-constraints) |

## Frontend

| Thành phần | Công nghệ                  | Lý do lựa chọn                                | SSoT                                                        |
| ---------- | -------------------------- | --------------------------------------------- | ----------------------------------------------------------- |
| UI Library | React 18+ với TypeScript   | [0020: React](decisions/0020-react.md)        | [`BC-005`](../product/constraints.md#business-constraints)  |
| Framework  | Next.js 14+ với App Router | [0021: Next.js](decisions/0021-nextjs.md)     | [`TC-004`](../product/constraints.md#technical-constraints) |
| State      | Zustand + React Context    | [0022: Zustand](decisions/0022-zustand.md)    | [`BC-005`](../product/constraints.md#business-constraints)  |
| Styling    | TailwindCSS 3.x            | [0023: Tailwind](decisions/0023-tailwind.md)  | [`TC-004`](../product/constraints.md#technical-constraints) |
| Components | RetroUI                    | [0024: RetroUI](decisions/0024-retroui.md)    | [`BC-005`](../product/constraints.md#business-constraints)  |
| Realtime   | Socket.IO Client 4.x       | [0010: Socket.IO](decisions/0010-socketio.md) | [`TC-ARCH-005`](design.md#architecture)                     |

## Infrastructure

| Thành phần    | Công nghệ                | Mô tả                                                    | SSoT                                                        |
| ------------- | ------------------------ | -------------------------------------------------------- | ----------------------------------------------------------- |
| Container     | Docker 24+               | [0030: Docker](decisions/0030-docker.md)                 | [`TC-ARCH-004`](design.md#architecture)                     |
| Orchestration | Docker Compose           | [0030: Docker](decisions/0030-docker.md)                 | [`TC-ARCH-004`](design.md#architecture)                     |
| Load Balancer | Nginx                    | [0032: Nginx](decisions/0032-nginx.md)                   | [`TC-001`](../product/constraints.md#technical-constraints) |
| CI/CD         | GitHub Actions           | [0031: Github Actions](decisions/0031-github-actions.md) | [`BC-005`](../product/constraints.md#business-constraints)  |
| File Storage  | SeaweedFS                | [0033: SeaweedFS](decisions/0033-seaweedfs.md)           | [`BC-006`](../product/constraints.md#business-constraints)  |
| Monitoring    | Winston + custom metrics | [0011: Winston](decisions/0011-winston.md)               | [`BC-005`](../product/constraints.md#business-constraints)  |
