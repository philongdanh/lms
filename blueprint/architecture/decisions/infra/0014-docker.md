---
id: adr-014
title: 'ADR-014: Docker & Docker Compose'
sidebar_label: '014: Docker'
sidebar_position: 14
---

# ADR-014: Docker & Docker Compose

Cần giải pháp đóng gói và triển khai ứng dụng nhất quán.

---

## Decision

Sử dụng **Docker** và **Docker Compose**.

---

## Rationale

- **Consistency**: "Build once, run anywhere". Đảm bảo môi trường dev, staging,
  prod giống nhau.
- **On-premise friendly**: Dễ dàng triển khai trên hạ tầng riêng của khách hàng
  bằng `docker-compose up`.
- **Isolation**: Mỗi service chạy trong container riêng biệt.
