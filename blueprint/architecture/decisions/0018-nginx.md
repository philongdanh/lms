---
id: adr-018
title: 'ADR-018: Nginx'
sidebar_label: '018: Nginx'
sidebar_position: 18
---

# ADR-018: Nginx

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
