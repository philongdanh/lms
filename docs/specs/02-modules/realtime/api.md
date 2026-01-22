---
id: api
title: API Endpoints
sidebar_label: API
sidebar_position: 10
---

# Realtime - API Endpoints
 
Các giao diện kết nối thời gian thực và thông báo trực tiếp.


## Endpoints Summary

| Method | Endpoint                  | Description          | Auth Required | Rate Limit |
| ------ | ------------------------- | -------------------- | ------------- | ---------- |
| GET    | `/notifications`          | Danh sách thông báo  | ✅            | 100/min    |
| PUT    | `/notifications/:id/read` | Đánh dấu đã đọc      | ✅            | 200/min    |
| DELETE | `/notifications/:id`      | Xóa thông báo        | ✅            | 100/min    |
| WS     | `/ws`                     | WebSocket connection | ✅            | -          |

## WebSocket Events

| Event              | Direction     | Description       |
| ------------------ | ------------- | ----------------- |
| `notification.new` | Server→Client | Thông báo mới     |
| `progress.updated` | Server→Client | Cập nhật tiến độ  |
| `tournament.start` | Server→Client | Giải đấu bắt đầu  |
| `match.update`     | Server→Client | Cập nhật trận đấu |

