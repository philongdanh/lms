---
id: 01-monolith
title: '01: Monolith'
sidebar_label: '01: monolith'
sidebar_position: 1
---

# 01: Monolith

Một kiến trúc phù hợp với team nhỏ nhưng có khả năng mở rộng

---

## Decision

Xây dựng **Modular Monolith** (module Auth, Tournament, Learning)

---

## Rationale

Triển khai đơn giản, debug dễ dàng, độ phức tạp vận hành thấp

---

## Consequences

**Ưu điểm**: Triển khai đơn giản, debug dễ, code chia sẻ

**Nhược điểm**: Scale toàn bộ app, single point of failure
