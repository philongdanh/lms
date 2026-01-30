---
id: 14-jwt
title: '14: JWT Refresh Token'
sidebar_label: '14: JWT'
sidebar_position: 14
---

# 08: JWT Refresh Token

Stateless auth cho multi-device support

---

## Decision

**JWT** (15-30min) + **Refresh token** (7 ngày, hash trong DB) + **Redis
blacklist**

---

## Rationale

Stateless scaling, hỗ trợ logout đa thiết bị, lưu trữ token an toàn
