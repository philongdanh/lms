---
id: adr-0008
title: 'ADR-0008: JWT with Refresh Token Blacklisting'
sidebar_label: '0008: JWT Auth'
sidebar_position: 8
---

# ADR-0008: JWT with Refresh Token Blacklisting

Cần stateless auth cho multi-device support.

---

## Decision

**JWT** (15-30min) + **Refresh token** (7 ngày, hash trong DB) + **Redis
blacklist**.

---

## Rationale

Stateless scaling, hỗ trợ logout đa thiết bị, lưu trữ token an toàn.
