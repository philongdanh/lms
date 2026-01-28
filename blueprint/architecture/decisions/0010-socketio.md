---
id: adr-0010
title: 'ADR-0010: Socket.IO with Redis Adapter'
sidebar_label: '0010: Socket.IO'
sidebar_position: 10
---

# ADR-0010: Socket.IO with Redis Adapter

Cần WebSocket cho real-time tournament và notifications.

---

## Decision

**Socket.IO** với **Redis Adapter** để sync đa instance.

---

## Rationale

Fallback support, built-in rooms, horizontal scaling.
