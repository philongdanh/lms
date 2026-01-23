---
id: adr-003
title: "ADR-003: JWT with Refresh Token Blacklisting"
sidebar_label: "003: JWT Auth"
sidebar_position: 3
---

# ADR-003: JWT with Refresh Token Blacklisting

## Context

Cần stateless auth cho multi-device support.

## Decision

**JWT** (15-30min) + **Refresh token** (7 ngày, hash trong DB) + **Redis blacklist**.

## Rationale

Stateless scaling, hỗ trợ logout đa thiết bị, lưu trữ token an toàn.
