---
id: 22-zustand
title: '22: Zustand'
sidebar_label: '22: Zustand'
sidebar_position: 22
---

# 22: Zustand

Giải pháp quản lý state đơn giản, nhẹ và hiệu quả

---

## Decision

**zustand**

---

## Rationale

- **Minimal boilerplate**: Ít code hơn Redux rất nhiều
- **No Context Provider Wrapper**: Không cần wrap App trong provider, tránh
  re-render không cần thiết
- **Small footprint**: Rất nhẹ (< 2kB)
- **Flexible**: Dễ dàng tích hợp với Immer, Persist middleware
