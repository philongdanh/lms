---
id: 0021-nextjs
title: '0021: Next.js'
sidebar_label: '0021: Next.js'
sidebar_position: 21
---

# 0021: Next.js

Cần một Frontend Framework mạnh mẽ, hỗ trợ SEO và performance tốt.

> Dựa trên [0020: React](0020-react.md).

---

## Decision

Sử dụng **Next.js 14+** với **App Router**.

---

## Rationale

- **SSR/SSG**: Tối ưu cho SEO và initial load time.
- **Server Components**: Giảm bundle size gửi xuống client.
- **Routing**: File-system based routing trực quan.
- **Ecosystem**: Cộng đồng lớn, Vercel support.
