---
id: analytics
title: Analytics
sidebar_label: Analytics
sidebar_position: 5
---

# Analytics

Module phân tích dữ liệu học tập và báo cáo thống kê.

---

## Business Logic

### Workflow chính

| Workflow          | Mô tả                            | Actor         | Kết quả                |
| ----------------- | -------------------------------- | ------------- | ---------------------- |
| ETL Pipeline      | Xử lý sự kiện từ Learning module | System        | Knowledge Map cập nhật |
| Generate Report   | Tạo báo cáo theo yêu cầu         | Teacher/Admin | Báo cáo PDF/JSON       |
| Daily Aggregation | Tổng hợp dữ liệu hàng ngày       | System        | Daily stats sẵn sàng   |

### Rules & Constraints

- ETL latency < 5s từ event
- Phân quyền: Teacher chỉ xem lớp được gán
- Cache báo cáo trong Redis (TTL 5 phút)
- Retention: Raw logs 90 ngày, Daily stats 5 năm

### State Machine

N/A - Analytics là module read-only, không có state machine.

---

## Data Model

### Schema & Entities

| Entity       | Fields chính                                 | Mô tả                     |
| ------------ | -------------------------------------------- | ------------------------- |
| KnowledgeMap | user_id, topic_id, mastery_score             | Mức độ nắm vững kiến thức |
| DailyStats   | user_id, date, lessons_completed, time_spent | Thống kê hàng ngày        |
| ReportCache  | report_id, params_hash, data, expires_at     | Cache báo cáo             |

### Relations

| Relation             | Mô tả                                  |
| -------------------- | -------------------------------------- |
| User → KnowledgeMap  | 1:N - Mỗi user có map cho nhiều topics |
| Analytics ← Learning | Consumes - Nhận events từ Learning     |
| Analytics ← Auth     | Consumes - Lấy thông tin user/role     |

---

## API & Integration

### Endpoints

| Method | Endpoint                | Mô tả                      | Auth       | Rate Limit |
| ------ | ----------------------- | -------------------------- | ---------- | ---------- |
| GET    | `/progress/overview`    | Tổng quan tiến độ          | ✅         | 100/min    |
| GET    | `/progress/subject/:id` | Tiến độ theo môn học       | ✅         | 100/min    |
| GET    | `/knowledge-map`        | Bản đồ kiến thức           | ✅         | 50/min     |
| GET    | `/daily-stats`          | Thống kê học tập hàng ngày | ✅         | 100/min    |
| GET    | `/reports/class/:id`    | Báo cáo lớp học            | ✅ Teacher | 50/min     |

### Events & Webhooks

| Event                        | Trigger                        | Payload             |
| ---------------------------- | ------------------------------ | ------------------- |
| `analytics.report.generated` | Báo cáo lớn hoàn thành (async) | `{ reportId, url }` |

---

## Acceptance Criteria

### Functional Requirements

| ID        | Requirement                   | Điều kiện                       |
| --------- | ----------------------------- | ------------------------------- |
| FR-ANA-01 | Mastery calculation chính xác | Công thức đúng                  |
| FR-ANA-02 | Daily aggregation đúng        | Tổng khớp với logs              |
| FR-ANA-03 | Phân quyền hoạt động          | Teacher không xem được lớp khác |

### Edge Cases

| Case                           | Xử lý                              |
| ------------------------------ | ---------------------------------- |
| Báo cáo quá lớn (> 1 năm data) | Async processing, trả về report ID |
| Cache miss                     | Query DB, cache result             |
| No data for period             | Trả về empty result với metadata   |

---
