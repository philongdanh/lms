---
id: adr-004
title: "ADR-004: Redis for Cache and Pub/Sub"
sidebar_label: "004: Redis"
sidebar_position: 4
---

# ADR-004: Redis for Cache and Pub/Sub

## Context

Cần caching và real-time messaging.

## Decision

**Redis** cho session storage, token blacklist, cache, và Pub/Sub events.

## Rationale

Sub-millisecond latency, native Pub/Sub, cluster mode cho HA.
