---
id: 0008-jwt-refresh-token
title: '0008: JWT Refresh Token'
sidebar_label: '0008: JWT Refresh Token'
sidebar_position: 8
---

# 0008: JWT Refresh Token

Cần stateless auth cho multi-device support.

> SSoT: [`TC-008`](../../product/constraints.md#security)

---

## Decision

**JWT** (15-30min) + **Refresh token** (7 ngày, hash trong DB) + **Redis
blacklist**.

---

## Rationale

Stateless scaling, hỗ trợ logout đa thiết bị, lưu trữ token an toàn.
