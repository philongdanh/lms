---
id: 0032-nginx
title: '0032: Nginx'
sidebar_label: '0032: Nginx'
sidebar_position: 32
---

# 0032: Nginx

Cần Reverse Proxy và Web Server hiệu năng cao.

---

## Decision

Sử dụng **Nginx**.

---

## Rationale

- **Reverse Proxy**: Load balancing, SSL termination, giấu IP backend.
- **Integration**: Dễ dàng tích hợp với Docker Compose.
- **WebSocket Support**: Hỗ trợ tốt upgrade header cho Socket.IO.

> **Note**: File storage sử dụng [SeaweedFS](0033-seaweedfs.md) với Presigned
> URL.
