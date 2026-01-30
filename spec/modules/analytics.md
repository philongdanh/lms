---
id: analytics
title: Analytics
sidebar_label: Analytics
sidebar_position: 7
---

# Analytics

Module phân tích dữ liệu học tập và báo cáo thống kê.

> **SSoT**: [Backlog](../../blueprint/product/backlog.md) |
> [Database](../../blueprint/architecture/database.md)

---

## Business Logic

### ETL Pipeline

Xử lý events từ module Learning để cập nhật Knowledge Map.

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

### Tạo báo cáo

Tạo báo cáo theo yêu cầu với caching.

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

### Tổng hợp hàng ngày

Tổng hợp dữ liệu hàng ngày tự động.

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

### Quy tắc & Ràng buộc

- ETL latency < 5s từ event
- Authorization: `Teacher` chỉ xem được lớp được gán
- Cache báo cáo trong Redis (TTL 5 phút)
- Lưu trữ: Raw logs 90 ngày, Daily stats 5 năm

---

## API & Integration

> **SSoT**: [schema.graphql](../api/graphql/analytics/schema.graphql) |
> [operations.graphql](../api/graphql/analytics/operations.graphql)

### Sự kiện & Webhooks

| Sự kiện                      | Kích hoạt                      | Payload             |
| ---------------------------- | ------------------------------ | ------------------- |
| `analytics.report.generated` | Báo cáo lớn hoàn thành (async) | `{ reportId, url }` |

---

## Acceptance Criteria

### Yêu cầu chức năng

| ID          | Yêu cầu                  | Điều kiện                        |
| ----------- | ------------------------ | -------------------------------- |
| `FR-ANA-01` | Tính mastery chính xác   | Đúng công thức                   |
| `FR-ANA-02` | Tổng hợp daily chính xác | Tổng khớp với logs               |
| `FR-ANA-03` | Authorization hoạt động  | `Teacher` không thể xem lớp khác |

### Edge Cases

| Trường hợp                            | Xử lý                      |
| ------------------------------------- | -------------------------- |
| Báo cáo quá lớn (>1 năm data)         | Xử lý async, report ID     |
| Cache miss                            | Query DB, cache kết quả    |
| Không có dữ liệu cho khoảng thời gian | Kết quả trống với metadata |

---
