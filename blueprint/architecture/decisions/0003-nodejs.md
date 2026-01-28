---
id: adr-0003
title: 'ADR-0003: Node.js 20+ LTS'
sidebar_label: '0003: Node.js'
sidebar_position: 3
---

# ADR-0003: Node.js 20+ LTS

Cần môi trường chạy cho Backend đảm bảo hiệu năng và đồng bộ ngôn ngữ với
Frontend.

---

## Decision

Sử dụng **Node.js 20+ LTS**.

---

## Rationale

- **Non-blocking I/O**: Xử lý tốt các tác vụ concurrent cao (I/O heavy) của LMS.
- **Unified Language**: Dùng TypeScript cho cả BE và FE, chia sẻ được DTO/Type.
- **Ecosystem**: NPM ecosystem khổng lồ.
- **LTS**: Bản 20+ được support dài hạn, ổn định cho production.
