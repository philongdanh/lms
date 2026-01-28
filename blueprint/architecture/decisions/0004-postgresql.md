---
id: 0004-postgresql
title: '0004: PostgreSQL'
sidebar_label: '0004: PostgreSQL'
sidebar_position: 4
---

# 0004: PostgreSQL

Cần database với **ACID transactions** và schema linh hoạt.

---

## Decision

Sử dụng **PostgreSQL 14+**.

---

## Rationale

JSONB support cho AI data, transactions mạnh cho scoring, sẵn sàng partitioning.
