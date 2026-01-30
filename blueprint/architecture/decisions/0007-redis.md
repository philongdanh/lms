---
id: 0007-redis
title: '0007: Redis'
sidebar_label: '0007: Redis'
sidebar_position: 7
---

# 0007: Redis

Cần caching và real-time messaging.

> SSoT: [`TC-ARCH-03`](../../product/constraints.md#architecture)

---

## Decision

**Redis** cho session storage, token blacklist, cache, và Pub/Sub events.

---

## Rationale

Sub-millisecond latency, native Pub/Sub, cluster mode cho HA.
