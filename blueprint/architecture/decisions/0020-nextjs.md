---
id: adr-0020
title: 'ADR-0020: Next.js 14+ (App Router)'
sidebar_label: '0020: Next.js'
sidebar_position: 20
---

# ADR-0020: Next.js 14+ (App Router)

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
