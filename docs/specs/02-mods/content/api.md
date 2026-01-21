---
id: content-api
title: Content API Endpoints
sidebar_label: API
sidebar_position: 1
---

# Content & Question Bank - API Endpoints
 
Các giao diện lập trình quản lý nội dung và ngân hàng câu hỏi.

---

## Base Information

- **Base URL**: `/api/v1/content`
- **Version**: 1.0
- **Format**: JSON
- **Authentication**: Bearer Token (Teacher/Admin cho Write, Student cho Read)

---

## Endpoints Summary

| Method | Endpoint               | Description       | Auth Required | Rate Limit |
| ------ | ---------------------- | ----------------- | ------------- | ---------- |
| GET    | `/subjects`            | Danh sách môn học | ❌            | 200/min    |
| GET    | `/topics`              | Danh sách chủ đề  | ❌            | 200/min    |
| GET    | `/lessons/:id`         | Chi tiết bài học  | ✅            | 200/min    |
| POST   | `/questions/import`    | Import câu hỏi    | ✅ Teacher    | 10/min     |
| GET    | `/questions/search`    | Tìm kiếm câu hỏi  | ✅ Teacher    | 100/min    |
| POST   | `/lessons`             | Tạo bài học mới   | ✅ Teacher    | 50/min     |
| PUT    | `/lessons/:id/publish` | Publish bài học   | ✅ Admin      | 50/min     |

---

## References

- [Business Logic](./logic.md)
- [Data Model](./data.md)
- [Test Cases](./tests.md)
