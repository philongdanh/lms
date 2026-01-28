---
id: adr-019
title: 'ADR-019: Winston Logging'
sidebar_label: '019: Winston'
sidebar_position: 19
---

# ADR-019: Winston Logging

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
