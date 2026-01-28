---
id: adr-0001
title: 'ADR-0001: Modular Monolith'
sidebar_label: '0001: Modular Monolith'
sidebar_position: 1
---

# ADR-0001: Modular Monolith

Cần một kiến trúc phù hợp với team nhỏ nhưng có khả năng mở rộng.

---

## Decision

Xây dựng **Modular Monolith** (các module `Auth`, `Tournament`, `Learning`).

---

## Rationale

Triển khai đơn giản, debug dễ dàng, độ phức tạp vận hành thấp.

---

## Consequences

**Ưu điểm**: Triển khai đơn giản, debug dễ, code chia sẻ.

**Nhược điểm**: Scale toàn bộ app, single point of failure.
