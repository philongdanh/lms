---
id: 0011-winston
title: '0011: Winston'
sidebar_label: '0011: Winston'
sidebar_position: 11
---

# 0011: Winston

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
