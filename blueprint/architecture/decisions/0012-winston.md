---
id: adr-0012
title: 'ADR-0012: Winston Logging'
sidebar_label: '0012: Winston'
sidebar_position: 12
---

# ADR-0012: Winston Logging

Cần giải pháp ghi log tập trung, có cấu trúc.

---

## Decision

Sử dụng **Winston** (kết hợp custom metrics).

---

## Rationale

- **Structured Logging**: Log dạng JSON, dễ dàng parse và query sau này.
- **Transports**: Hỗ trợ ghi ra console, file, và các service log (ELK, Datadog)
  dễ dàng.
- **Levels**: Quản lý log level (info, error, debug, warn) rõ ràng.
