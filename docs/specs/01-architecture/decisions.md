---
id: decisions
title: Architecture Decisions
sidebar_label: Decisions
sidebar_position: 6
---

# Architecture Decision Records

Ghi chép các quyết định kỹ thuật quan trọng trong nền tảng LMS.

---

## Decision Index

| ID | Title | Status | Date |
|----|---------|------------|------|
| **ADR-001** | Modular Monolith | ✅ Accepted | 2024-05-20 |
| **ADR-002** | PostgreSQL as Primary DB | ✅ Accepted | 2024-05-21 |
| **ADR-003** | JWT with Refresh Token Blacklisting | ✅ Accepted | 2024-05-22 |
| **ADR-004** | Redis for Cache and Pub/Sub | ✅ Accepted | 2024-05-23 |
| **ADR-005** | Socket.IO with Redis Adapter | ✅ Accepted | 2024-05-24 |
| **ADR-006** | Prisma ORM | ✅ Accepted | 2024-05-25 |
| **ADR-007** | Multi-tenant via tenant_id | ✅ Accepted | 2024-05-26 |
| **ADR-008** | RBAC with 5 Seed Roles | ✅ Accepted | 2024-05-27 |
| **ADR-009** | Cascade Delete Strategy | ✅ Accepted | 2024-05-28 |

---

## Decision Details

### ADR-001: Modular Monolith

**Context**: Cần một kiến trúc phù hợp với team nhỏ nhưng có khả năng mở rộng.

**Decision**: Xây dựng **Modular Monolith** (các module Auth, Tournament, Learning).

**Rationale**: Triển khai đơn giản, debug dễ dàng, độ phức tạp vận hành thấp.

**Ưu điểm**: ✅ Triển khai đơn giản, debug dễ, code chia sẻ.  
**Nhược điểm**: Scale toàn bộ app, single point of failure.


### ADR-002: PostgreSQL as Primary Database

**Context**: Cần database với ACID transactions và schema linh hoạt.

**Decision**: Sử dụng **PostgreSQL 14+**.

**Rationale**: JSONB support cho AI data, transactions mạnh cho scoring, sẵn sàng partitioning.


### ADR-003: JWT with Refresh Token Blacklisting

**Context**: Cần stateless auth cho multi-device support.

**Decision**: **JWT** (15-30min) + **Refresh token** (7 ngày, hash trong DB) + **Redis blacklist**.

**Rationale**: Stateless scaling, hỗ trợ logout đa thiết bị, lưu trữ token an toàn.


### ADR-004: Redis for Cache and Pub/Sub

**Context**: Cần caching và real-time messaging.

**Decision**: **Redis** cho session storage, token blacklist, cache, và Pub/Sub events.

**Rationale**: Sub-millisecond latency, native Pub/Sub, cluster mode cho HA.


### ADR-005: Socket.IO with Redis Adapter

**Context**: Cần WebSocket cho real-time tournament và notifications.

**Decision**: **Socket.IO** với **Redis Adapter** để sync đa instance.

**Rationale**: Fallback support, built-in rooms, horizontal scaling.


### ADR-006: Prisma ORM

**Context**: Cần type-safe ORM cho NestJS.

**Decision**: **Prisma 7** làm ORM chính.

**Rationale**: Generated types, declarative schema, auto migrations.


### ADR-007: Multi-tenant via tenant_id

**Context**: Cần multi-tenant strategy cho nhiều trường.

**Decision**: **Shared Database với tenant_id column**.

**Rationale**: Vận hành đơn giản, tiết kiệm chi phí, dễ filtering.


### ADR-008: RBAC with 5 Seed Roles

**Context**: Cần authorization model linh hoạt.

**Decision**: **RBAC** với 5 roles: `root-admin`, `tenant-admin`, `teacher`, `parent`, `student`.

**Rationale**: Permission-based, hierarchy rõ ràng, dễ mở rộng.


### ADR-009: Cascade Delete Strategy

**Context**: Cần data deletion strategy cho tenant/user lifecycle.

**Decision**: **Soft Delete** (User, Topic, Exam...) + **Hard Delete CASCADE** (Sessions, Answers...).

**Rationale**: Data recovery trong grace period, referential integrity, audit trail.

---

## ADR Template

### ADR-XXX: [Decision Title]

**Date**: YYYY-MM-DD
**Status**: Proposed / Accepted / Deprecated / Superseded by ADR-XXX

#### Context

[Mô tả vấn đề hoặc issue dẫn đến quyết định này.]

#### Decision

[Mô tả quyết định được đưa ra. Cụ thể và rõ ràng.]

#### Rationale

[Tại sao chọn quyết định này? Đã xem xét những phương án nào?]

#### Consequences

**Lợi ích**:
- [Lợi ích 1]

**Nhược điểm**:
- [Nhược điểm 1]

---

## References

- [System Design](./system-design.md)
- [Data Model](./data-model.md)
- [Tech Stack](./tech-stack.md)
