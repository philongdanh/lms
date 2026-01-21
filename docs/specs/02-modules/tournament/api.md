---
id: tournament-api
title: Tournament API Endpoints
sidebar_label: API
sidebar_position: 2
---

# Tournament - API Endpoints

API endpoints cho module Tournament: giải đấu, trận đấu, bảng xếp hạng.

---

## Base Information

- **Base URL**: `/api/v1/tournaments`
- **Version**: 1.0
- **Format**: JSON
- **Authentication**: Bearer Token

---

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

---

## References

- [Business Logic](./logic.md)
- [Data Model](./data.md)
- [Test Cases](./tests.md)
