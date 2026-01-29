---
id: 0030-docker
title: '0030: Docker'
sidebar_label: '0030: Docker'
sidebar_position: 30
---

# 0030: Docker

Cần giải pháp đóng gói và triển khai ứng dụng nhất quán.

Enforces: [`TC-ARCH-04`](../../product/constraints.md#architecture)

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
