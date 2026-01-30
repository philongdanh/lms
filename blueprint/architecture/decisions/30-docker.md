---
id: 30-docker
title: '30: Docker'
sidebar_label: '30: Docker'
sidebar_position: 30
---

# 30: Docker

Giải pháp đóng gói và triển khai ứng dụng nhất quán

---

## Decision

**docker 24+** và **docker compose**

---

## Rationale

- **Consistency**: "Build once, run anywhere". Đảm bảo môi trường dev, staging,
  prod giống nhau
- **On-premise friendly**: Dễ dàng triển khai trên hạ tầng riêng của khách hàng
  bằng `docker-compose up`
- **Isolation**: Mỗi service chạy trong container riêng biệt
