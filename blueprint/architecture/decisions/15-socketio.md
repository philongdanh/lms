---
id: 15-socketio
title: '15: Socket.IO'
sidebar_label: '15: Socket.IO'
sidebar_position: 15
---

# 10: Socket.IO

Websocket cho real-time tournament và notifications

---

## Decision

**Socket.IO** với **Redis Adapter** để sync đa instance

---

## Rationale

Fallback support, built-in rooms, horizontal scaling
