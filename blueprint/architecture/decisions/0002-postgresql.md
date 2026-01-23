---
id: adr-002
title: 'ADR-002: PostgreSQL as Primary Database'
sidebar_label: '002: PostgreSQL'
sidebar_position: 2
---

# ADR-002: PostgreSQL as Primary Database

Cần database với **ACID transactions** và schema linh hoạt.

---

## Decision

Sử dụng **PostgreSQL 14+**.

---

## Rationale

JSONB support cho AI data, transactions mạnh cho scoring, sẵn sàng partitioning.
