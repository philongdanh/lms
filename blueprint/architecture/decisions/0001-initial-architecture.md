---
id: decisions
title: Decisions
sidebar_label: Decisions
sidebar_position: 6
---

# Decisions

Lịch sử các quyết định kiến trúc và kỹ thuật quan trọng.

---

## Decision Index

| ID                                                      | Title                               | Date       |
| ------------------------------------------------------- | ----------------------------------- | ---------- |
| [ADR-001](#adr-001-modular-monolith)                    | Modular Monolith                    | 2024-05-20 |
| [ADR-002](#adr-002-postgresql-as-primary-database)      | PostgreSQL as Primary DB            | 2024-05-21 |
| [ADR-003](#adr-003-jwt-with-refresh-token-blacklisting) | JWT with Refresh Token Blacklisting | 2024-05-22 |
| [ADR-004](#adr-004-redis-for-cache-and-pubsub)          | Redis for Cache and Pub/Sub         | 2024-05-23 |
| [ADR-005](#adr-005-socketio-with-redis-adapter)         | Socket.IO with Redis Adapter        | 2024-05-24 |
| [ADR-006](#adr-006-prisma-orm)                          | Prisma ORM                          | 2024-05-25 |
| [ADR-007](#adr-007-multi-tenant-via-tenant_id)          | Multi-tenant via tenant_id          | 2024-05-26 |
| [ADR-008](#adr-008-rbac-with-5-seed-roles)              | RBAC with 5 Seed Roles              | 2024-05-27 |
| [ADR-009](#adr-009-cascade-delete-strategy)             | Cascade Delete Strategy             | 2024-05-28 |

---

## Decision Details

### ADR-001: Modular Monolith

| Feature          | Content                                                                                                                   |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------ |
| **Context**      | Cần một kiến trúc phù hợp với team nhỏ nhưng có khả năng mở rộng.                                                         |
| **Decision**     | Xây dựng **Modular Monolith** (các module Auth, Tournament, Learning).                                                    |
| **Rationale**    | Triển khai đơn giản, debug dễ dàng, độ phức tạp vận hành thấp.                                                            |
| **Consequences** | **Ưu điểm**: Triển khai đơn giản, debug dễ, code chia sẻ.<br/>**Nhược điểm**: Scale toàn bộ app, single point of failure. |

### ADR-002: PostgreSQL as Primary Database

| Feature       | Content                                                                          |
| :------------ | :------------------------------------------------------------------------------- |
| **Context**   | Cần database với ACID transactions và schema linh hoạt.                          |
| **Decision**  | Sử dụng **PostgreSQL 14+**.                                                      |
| **Rationale** | JSONB support cho AI data, transactions mạnh cho scoring, sẵn sàng partitioning. |

### ADR-003: JWT with Refresh Token Blacklisting

| Feature       | Content                                                                               |
| :------------ | :------------------------------------------------------------------------------------ |
| **Context**   | Cần stateless auth cho multi-device support.                                          |
| **Decision**  | **JWT** (15-30min) + **Refresh token** (7 ngày, hash trong DB) + **Redis blacklist**. |
| **Rationale** | Stateless scaling, hỗ trợ logout đa thiết bị, lưu trữ token an toàn.                  |

### ADR-004: Redis for Cache and Pub/Sub

| Feature       | Content                                                                   |
| :------------ | :------------------------------------------------------------------------ |
| **Context**   | Cần caching và real-time messaging.                                       |
| **Decision**  | **Redis** cho session storage, token blacklist, cache, và Pub/Sub events. |
| **Rationale** | Sub-millisecond latency, native Pub/Sub, cluster mode cho HA.             |

### ADR-005: Socket.IO with Redis Adapter

| Feature       | Content                                                  |
| :------------ | :------------------------------------------------------- |
| **Context**   | Cần WebSocket cho real-time tournament và notifications. |
| **Decision**  | **Socket.IO** với **Redis Adapter** để sync đa instance. |
| **Rationale** | Fallback support, built-in rooms, horizontal scaling.    |

### ADR-006: Prisma ORM

| Feature       | Content                                               |
| :------------ | :---------------------------------------------------- |
| **Context**   | Cần type-safe ORM cho NestJS.                         |
| **Decision**  | **Prisma 7** làm ORM chính.                           |
| **Rationale** | Generated types, declarative schema, auto migrations. |

### ADR-007: Multi-tenant via tenant_id

| Feature       | Content                                             |
| :------------ | :-------------------------------------------------- |
| **Context**   | Cần multi-tenant strategy cho nhiều trường.         |
| **Decision**  | **Shared Database với tenant_id column**.           |
| **Rationale** | Vận hành đơn giản, tiết kiệm chi phí, dễ filtering. |

### ADR-008: RBAC with 5 Seed Roles

| Feature       | Content                                                                             |
| :------------ | :---------------------------------------------------------------------------------- |
| **Context**   | Cần authorization model linh hoạt.                                                  |
| **Decision**  | **RBAC** với 5 roles: `root-admin`, `tenant-admin`, `teacher`, `parent`, `student`. |
| **Rationale** | Permission-based, hierarchy rõ ràng, dễ mở rộng.                                    |

### ADR-009: Cascade Delete Strategy

| Feature       | Content                                                                                  |
| :------------ | :--------------------------------------------------------------------------------------- |
| **Context**   | Cần data deletion strategy cho tenant/user lifecycle.                                    |
| **Decision**  | **Soft Delete** (User, Topic, Exam...) + **Hard Delete CASCADE** (Sessions, Answers...). |
| **Rationale** | Data recovery trong grace period, referential integrity, audit trail.                    |

---

## References

- [System Design](../system-design.md)
- [Data Model](../database.md)
- [Tech Stack](../stack.md)
