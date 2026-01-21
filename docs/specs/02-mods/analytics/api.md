---
id: analytics-api
title: Analytics API Endpoints
sidebar_label: API
sidebar_position: 1
---

# Analytics - API Endpoints
 
Các giao diện lập trình cho hệ thống báo cáo và thống kê.

---

## Base Information

- **Base URL**: `/api/v1/analytics`
- **Version**: 1.0
- **Format**: JSON
- **Authentication**: Bearer Token

---

## Endpoints Summary

| Method | Endpoint                | Description                | Auth Required | Rate Limit |
| ------ | ----------------------- | -------------------------- | ------------- | ---------- |
| GET    | `/progress/overview`    | Tổng quan tiến độ          | ✅            | 100/min    |
| GET    | `/progress/subject/:id` | Tiến độ theo môn học       | ✅            | 100/min    |
| GET    | `/knowledge-map`        | Bản đồ kiến thức           | ✅            | 50/min     |
| GET    | `/daily-stats`          | Thống kê học tập hàng ngày | ✅            | 100/min    |
| GET    | `/reports/class/:id`    | Báo cáo lớp học            | ✅ Teacher    | 50/min     |

---

## References

- [Business Logic](./logic.md)
- [Data Model](./data.md)
- [Test Cases](./tests.md)
