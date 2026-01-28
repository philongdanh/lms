---
id: adr-0004
title: 'ADR-0004: PostgreSQL as Primary Database'
sidebar_label: '0004: PostgreSQL'
sidebar_position: 4
---

# ADR-0004: PostgreSQL as Primary Database

Cần database với **ACID transactions** và schema linh hoạt.

---

## Decision

Sử dụng **PostgreSQL 14+**.

---

## Rationale

JSONB support cho AI data, transactions mạnh cho scoring, sẵn sàng partitioning.
