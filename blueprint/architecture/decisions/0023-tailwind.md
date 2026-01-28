---
id: adr-0023
title: 'ADR-0023: TailwindCSS'
sidebar_label: '0023: TailwindCSS'
sidebar_position: 23
---

# ADR-0023: TailwindCSS

Cần giải pháp styling nhanh, nhất quán và dễ bảo trì.

---

## Decision

Sử dụng **TailwindCSS 3.x**.

---

## Rationale

- **Utility-first**: Code style nhanh, không cần đặt tên class phức tạp.
- **Design System**: Dễ dàng cấu hình theme (colors, spacing) để đảm bảo tính
  nhất quán.
- **Performance**: PurgeCSS loại bỏ CSS thừa, file output nhỏ.
- **Responsive**: Mobile-first prefixes trực quan.
