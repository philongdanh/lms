---
id: api
title: API Endpoints
sidebar_label: API
sidebar_position: 1
---

# Gamification - API Endpoints
 
Các giao diện lập trình cho hệ thống thành tích và khen thưởng.


## Endpoints Summary

| Method | Endpoint              | Description           | Auth Required | Rate Limit |
| ------ | --------------------- | --------------------- | ------------- | ---------- |
| GET    | `/profile`            | Thông tin EXP/Level   | ✅            | 200/min    |
| GET    | `/badges`             | Danh sách badges      | ✅            | 100/min    |
| GET    | `/leaderboard`        | Bảng xếp hạng         | ✅            | 100/min    |
| GET    | `/rewards`            | Danh sách phần thưởng | ✅            | 100/min    |
| POST   | `/rewards/:id/redeem` | Đổi phần thưởng       | ✅            | 20/min     |
| GET    | `/streaks`            | Thông tin streak      | ✅            | 200/min    |

