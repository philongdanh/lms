---
id: 0023-tailwind
title: '0023: Tailwind'
sidebar_label: '0023: Tailwind'
sidebar_position: 23
---

# 0023: Tailwind

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
