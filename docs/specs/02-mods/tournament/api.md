---
id: api
title: API Endpoints
sidebar_label: API
sidebar_position: 1
---

# Tournament - API Endpoints
 
Các giao diện lập trình cho quản lý giải đấu và bảng xếp hạng.


## Endpoints Summary

| Method | Endpoint              | Description              | Auth Required | Rate Limit |
| ------ | --------------------- | ------------------------ | ------------- | ---------- |
| GET    | `/`                   | Danh sách giải đấu       | ✅            | 100/min    |
| GET    | `/:id`                | Chi tiết giải đấu        | ✅            | 100/min    |
| POST   | `/:id/join`           | Đăng ký tham gia         | ✅            | 20/min     |
| GET    | `/:id/matches`        | Danh sách trận đấu       | ✅            | 100/min    |
| POST   | `/matches/:id/submit` | Nộp câu trả lời trận đấu | ✅            | 50/min     |
| GET    | `/:id/leaderboard`    | Bảng xếp hạng giải đấu   | ✅            | 100/min    |
| POST   | `/`                   | Tạo giải đấu mới         | ✅ Admin      | 10/min     |

