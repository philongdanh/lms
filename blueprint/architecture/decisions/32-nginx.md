---
id: 32-nginx
title: '32: Nginx'
sidebar_label: '32: Nginx'
sidebar_position: 32
---

# 32: Nginx

Reverse proxy và web server hiệu năng cao

---

## Decision

**nginx**

---

## Rationale

- **Reverse Proxy**: Load balancing, SSL termination, giấu IP backend
- **Integration**: Dễ dàng tích hợp với Docker Compose
- **WebSocket Support**: Hỗ trợ tốt upgrade header cho Socket.IO

> **Note**: File storage sử dụng [SeaweedFS](0033-seaweedfs.md) với Presigned
> URL
