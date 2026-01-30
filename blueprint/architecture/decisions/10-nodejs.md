---
id: 10-nodejs
title: '10: Node.js'
sidebar_label: '10: Node.js'
sidebar_position: 10
---

# 03: Node.js

Môi trường chạy cho backend đảm bảo hiệu năng và đồng bộ ngôn ngữ với Frontend

---

## Decision

**node.js 20+ lts**

---

## Rationale

- **Non-blocking I/O**: Xử lý tốt các tác vụ concurrent cao (I/O heavy) của LMS
- **Unified Language**: Dùng TypeScript cho cả BE và FE, chia sẻ được DTO/Type
- **Ecosystem**: NPM ecosystem khổng lồ
- **LTS**: Bản 20+ được support dài hạn, ổn định cho production
