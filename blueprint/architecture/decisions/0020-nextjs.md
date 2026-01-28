---
id: 0020-nextjs
title: '0020: Next.js'
sidebar_label: '0020: Next.js'
sidebar_position: 20
---

# 0020: Next.js

Cần một Frontend Framework mạnh mẽ, hỗ trợ SEO và performance tốt.

---

## Decision

Sử dụng **Next.js 14+** với **App Router**.

---

## Rationale

- **SSR/SSG**: Tối ưu cho SEO và initial load time.
- **Server Components**: Giảm bundle size gửi xuống client.
- **Routing**: File-system based routing trực quan.
- **Ecosystem**: Cộng đồng lớn, Vercel support.
