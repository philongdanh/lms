---
id: 0002-multi-tenant
title: '0002: Multi Tenant'
sidebar_label: '0002: Multi Tenant'
sidebar_position: 2
---

# 0002: Multi Tenant

Cần multi-tenant strategy cho nhiều trường.

> SSoT: [`TC-ARCH-006`](../design.md#architecture)

---

## Decision

Shared Database với `tenant_id` column.

---

## Rationale

Vận hành đơn giản, tiết kiệm chi phí, dễ filtering.
