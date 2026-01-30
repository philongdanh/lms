---
id: 16-winston
title: '16: Winston'
sidebar_label: '16: Winston'
sidebar_position: 16
---

# 11: Winston

Giải pháp ghi log tập trung, có cấu trúc

---

## Decision

**winston** (kết hợp custom metrics)

---

## Rationale

- **Structured Logging**: Log dạng JSON, dễ dàng parse và query sau này
- **Transports**: Hỗ trợ ghi ra console, file, và các service log (ELK, Datadog)
  dễ dàng
- **Levels**: Quản lý log level (info, error, debug, warn) rõ ràng
