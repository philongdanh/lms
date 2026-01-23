---
id: adr-007
title: 'ADR-007: Multi-tenant via tenant_id'
sidebar_label: '007: Multi-tenant'
sidebar_position: 7
---

# ADR-007: Multi-tenant via tenant_id

## Context

Cần multi-tenant strategy cho nhiều trường.

## Decision

**Shared Database với `tenant_id` column**.

## Rationale

Vận hành đơn giản, tiết kiệm chi phí, dễ filtering.
