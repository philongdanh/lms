---
id: adr-0007
title: 'ADR-0007: Redis for Cache and Pub/Sub'
sidebar_label: '0007: Redis'
sidebar_position: 7
---

# ADR-0007: Redis for Cache and Pub/Sub

Cần caching và real-time messaging.

---

## Decision

**Redis** cho session storage, token blacklist, cache, và Pub/Sub events.

---

## Rationale

Sub-millisecond latency, native Pub/Sub, cluster mode cho HA.
