---
id: adr-010
title: 'ADR-010: Next.js 14+ (App Router)'
sidebar_label: '010: Next.js'
sidebar_position: 10
---

# ADR-010: Next.js 14+ (App Router)

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
