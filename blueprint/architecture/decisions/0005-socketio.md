---
id: adr-005
title: 'ADR-005: Socket.IO with Redis Adapter'
sidebar_label: '005: Socket.IO'
sidebar_position: 5
---

# ADR-005: Socket.IO with Redis Adapter

## Context

Cần WebSocket cho real-time tournament và notifications.

## Decision

**Socket.IO** với **Redis Adapter** để sync đa instance.

## Rationale

Fallback support, built-in rooms, horizontal scaling.
