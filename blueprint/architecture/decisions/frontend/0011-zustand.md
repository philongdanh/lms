---
id: adr-011
title: 'ADR-011: Zustand for State Management'
sidebar_label: '011: Zustand'
sidebar_position: 11
---

# ADR-011: Zustand for State Management

Cần giải pháp quản lý state đơn giản, nhẹ và hiệu quả.

---

## Decision

Sử dụng **Zustand**.

---

## Rationale

- **Minimal boilerplate**: Ít code hơn Redux rất nhiều.
- **No Context Provider Wrapper**: Không cần wrap App trong provider, tránh
  re-render không cần thiết.
- **Small footprint**: Rất nhẹ (< 2kB).
- **Flexible**: Dễ dàng tích hợp với Immer, Persist middleware.
