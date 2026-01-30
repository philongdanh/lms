---
id: 02-multi-tenant
title: '02: Multi Tenant'
sidebar_label: '02: Multi Tenant'
sidebar_position: 2
---

# 02: Multi Tenant

Multi-tenant strategy cho nhiều trường

---

## Decision

Shared Database với `tenant_id` column

---

## Rationale

Vận hành đơn giản, tiết kiệm chi phí, dễ filtering
