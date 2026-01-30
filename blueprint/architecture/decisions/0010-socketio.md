---
id: 0010-socketio
title: '0010: Socket.IO'
sidebar_label: '0010: Socket.IO'
sidebar_position: 10
---

# 0010: Socket.IO

Cần WebSocket cho real-time tournament và notifications.

> SSoT: [`TC-ARCH-005`](../design.md#architecture)

---

## Decision

**Socket.IO** với **Redis Adapter** để sync đa instance.

---

## Rationale

Fallback support, built-in rooms, horizontal scaling.
