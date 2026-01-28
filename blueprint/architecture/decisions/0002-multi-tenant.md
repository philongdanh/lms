---
id: adr-0002
title: 'ADR-0002: Multi-tenant via tenant_id'
sidebar_label: '0002: Multi-tenant'
sidebar_position: 2
---

# ADR-0002: Multi-tenant via tenant_id

Cần multi-tenant strategy cho nhiều trường.

---

## Decision

Shared Database với `tenant_id` column.

---

## Rationale

Vận hành đơn giản, tiết kiệm chi phí, dễ filtering.
