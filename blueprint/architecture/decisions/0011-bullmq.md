---
id: 0011-bullmq
title: '0011: BullMQ'
sidebar_label: '0011: BullMQ'
sidebar_position: 11
---

# 0011: BullMQ

Cần thư viện xử lý Background Jobs và Message Queue đáng tin cậy.

---

## Decision

Sử dụng **BullMQ**.

---

## Rationale

- **Redis-based**: Tận dụng hạ tầng Redis có sẵn, không cần setup thêm message
  broker phức tạp (như RabbitMQ/Kafka) ở giai đoạn đầu.
- **Features**: Hỗ trợ priority, delayed jobs, repeatable jobs, rate limiting.
- **Modern**: Là phiên bản viết lại bằng TypeScript của thư viện Bull nổi tiếng,
  hiệu năng tốt hơn.
