---
id: 23-tailwind
title: '23: Tailwind'
sidebar_label: '23: Tailwind'
sidebar_position: 23
---

# 23: Tailwind

Giải pháp styling nhanh, nhất quán và dễ bảo trì

---

## Decision

**tailwindcss 3.x**

---

## Rationale

- **Utility-first**: Code style nhanh, không cần đặt tên class phức tạp
- **Design System**: Dễ dàng cấu hình theme (colors, spacing) để đảm bảo tính
  nhất quán
- **Performance**: PurgeCSS loại bỏ CSS thừa, file output nhỏ
- **Responsive**: Mobile-first prefixes trực quan
