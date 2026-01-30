---
id: 21-nextjs
title: '21: Next.js'
sidebar_label: '21: Next.js'
sidebar_position: 21
---

# 21: Next.js

Một frontend framework mạnh mẽ, hỗ trợ seo và performance tốt

> Dựa trên [0020: React](0020-react.md)

---

## Decision

**next.js 14+** với **app router**

---

## Rationale

- **SSR/SSG**: Tối ưu cho SEO và initial load time
- **Server Components**: Giảm bundle size gửi xuống client
- **Routing**: File-system based routing trực quan
- **Ecosystem**: Cộng đồng lớn, Vercel support
