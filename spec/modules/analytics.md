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

#### Detailed Flows

##### ETL Pipeline

```d2
shape: sequence_diagram
"Learning Service"
"Event Bus"
"ETL Worker"
Database
"Analysis Engine"

"Learning Service" -> "Event Bus": publish(lesson_completed)
"Event Bus" -> "ETL Worker": consume_event
"ETL Worker" -> Database: raw_event_log
"ETL Worker" -> "Analysis Engine": calculate_mastery
"Analysis Engine" -> Database: update_knowledge_map
```

##### Generate Report

```d2
shape: sequence_diagram
Teacher
"Analytics Service"
Redis
Database
"PDF Engine"
Storage

Teacher -> "Analytics Service": request_report(class_id)
"Analytics Service" -> Redis: check_cache
Redis -> "Analytics Service": miss
"Analytics Service" -> Database: aggregate_data
Database -> "Analytics Service": heavy_result_set
"Analytics Service" -> "PDF Engine": render_pdf
"PDF Engine" -> Storage: save_file
"Analytics Service" -> Redis: set_cache
"Analytics Service" -> Teacher: report_url
```

##### Daily Aggregation

```d2
shape: sequence_diagram
Scheduler
"Analytics Service"
Database
Aggregator
Storage

Scheduler -> "Analytics Service": trigger_daily_job
"Analytics Service" -> Database: fetch_raw_logs(yesterday)
"Analytics Service" -> Aggregator: summarize_by_user
Aggregator -> Database: insert_daily_stats
"Analytics Service" -> Storage: flush_old_logs_to_s3
```

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

| Entity         | Fields chính                                         | Mô tả                     |
| -------------- | ---------------------------------------------------- | ------------------------- |
| `KnowledgeMap` | `user_id`, `topic_id`, `mastery_score`               | Mức độ nắm vững kiến thức |
| `DailyStats`   | `user_id`, `date`, `lessons_completed`, `time_spent` | Thống kê hàng ngày        |
| `ReportCache`  | `report_id`, `params_hash`, `data`, `expires_at`     | Cache báo cáo             |

### Relations

| `Relation`              | Mô tả                                    |
| ----------------------- | ---------------------------------------- |
| `User` → `KnowledgeMap` | `1:N` - Mỗi user có map cho nhiều topics |
| `Analytics ← Learning`  | Consumes - Nhận events từ Learning       |
| `Analytics ← Auth`      | Consumes - Lấy thông tin user/role       |

---

## API & Integration

### GraphQL Operations

| Type    | Operation          | Mô tả                      | Auth       | Rate Limit |
| ------- | ------------------ | -------------------------- | ---------- | ---------- |
| `Query` | `progressOverview` | Tổng quan tiến độ          | ✅         | 100/min    |
| `Query` | `subjectProgress`  | Tiến độ theo môn học       | ✅         | 100/min    |
| `Query` | `knowledgeMap`     | Bản đồ kiến thức           | ✅         | 50/min     |
| `Query` | `dailyStats`       | Thống kê học tập hàng ngày | ✅         | 100/min    |
| `Query` | `classReport`      | Báo cáo lớp học            | ✅ Teacher | 50/min     |

### Events & Webhooks

| Event                        | Trigger                        | Payload             |
| ---------------------------- | ------------------------------ | ------------------- |
| `analytics.report.generated` | Báo cáo lớn hoàn thành (async) | `{ reportId, url }` |

---

## Acceptance Criteria

### Functional Requirements

| ID          | Requirement                   | Điều kiện                       |
| ----------- | ----------------------------- | ------------------------------- |
| `FR-ANA-01` | Mastery calculation chính xác | Công thức đúng                  |
| `FR-ANA-02` | Daily aggregation đúng        | Tổng khớp với logs              |
| `FR-ANA-03` | Phân quyền hoạt động          | Teacher không xem được lớp khác |

### Edge Cases

| Case                           | Xử lý                              |
| ------------------------------ | ---------------------------------- |
| Báo cáo quá lớn (> 1 năm data) | Async processing, trả về report ID |
| Cache miss                     | Query DB, cache result             |
| No data for period             | Trả về empty result với metadata   |

---
