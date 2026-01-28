---
id: adr-0032
title: 'ADR-0032: Nginx'
sidebar_label: '0032: Nginx'
sidebar_position: 32
---

# ADR-0032: Nginx

Cần Reverse Proxy và Web Server hiệu năng cao.

---

## Decision

Sử dụng **Nginx**.

---

## Rationale

- **Reverse Proxy**: Load balancing, SSL termination, giấu IP backend.
- **Static File Serving**: Phục vụ file tĩnh (video, docs uploads) cực nhanh.
- **Integration**: Dễ dàng tích hợp với Docker Compose.
- **WebSocket Support**: Hỗ trợ tốt upgrade header cho Socket.IO.
