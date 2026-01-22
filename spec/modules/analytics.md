# Analytics Module Specification

# Analytics - Business Logic

Quy tắc nghiệp vụ tính toán báo cáo và phân tích dữ liệu.

## Dependencies

### Phụ thuộc nội bộ

- ✅ Learning Module - Nguồn dữ liệu bài tập/tiến độ.
- ✅ Auth Module - Thông tin người dùng/vai trò.

### Phụ thuộc bên ngoài

- ✅ PostgreSQL - Lưu trữ time-series (thông qua partitioning).
- ✅ Redis - Caching báo cáo.

## Validation Criteria

- ✅ Dữ liệu báo cáo khớp với dữ liệu gốc (Tính chính xác dữ liệu).
- ✅ Tính năng phân quyền hoạt động đúng (Giáo viên lớp A không thể xem lớp B).
- ✅ Hiệu suất ổn định với dữ liệu lớn.

# Workflows

## Workflow Summary

| Workflow ID | Workflow Name   | Trigger           | Actors       | Status         |
| ----------- | --------------- | ----------------- | ------------ | -------------- |
| WF-ANA-001  | ETL Pipeline    | User Action Event | System       | Đang hoạt động |
| WF-ANA-002  | Generate Report | UI Request        | User, System | Đang hoạt động |

config: themeVariables: fontFamily: "EB Garamond" config: themeVariables:
fontFamily: "EB Garamond"

## Events

### Sự kiện hệ thống

| Event Name                   | Description                    | Payload            | Emitted By    |
| ---------------------------- | ------------------------------ | ------------------ | ------------- |
| `analytics.report.generated` | Báo cáo lớn hoàn thành (async) | `{report_id, url}` | Analytics Svc |

## Performance Requirements

- **ETL Latency**: Cập nhật thời gian thực (Knowledge Map) < 5s độ trễ từ event.

## References

---

# Analytics - API Endpoints

Các giao diện lập trình cho hệ thống báo cáo và thống kê.

## Endpoints Summary

| Method | Endpoint                | Description                | Auth Required | Rate Limit |
| ------ | ----------------------- | -------------------------- | ------------- | ---------- |
| GET    | `/progress/overview`    | Tổng quan tiến độ          | ✅            | 100/min    |
| GET    | `/progress/subject/:id` | Tiến độ theo môn học       | ✅            | 100/min    |
| GET    | `/knowledge-map`        | Bản đồ kiến thức           | ✅            | 50/min     |
| GET    | `/daily-stats`          | Thống kê học tập hàng ngày | ✅            | 100/min    |
| GET    | `/reports/class/:id`    | Báo cáo lớp học            | ✅ Teacher    | 50/min     |

---

# Analytics - Data Model

Cấu trúc dữ liệu cho phân tích và theo dõi tiến độ.

config: themeVariables: fontFamily: "EB Garamond"

## References

-
-
- ***

# Analytics - Test Cases

Kịch bản kiểm thử hệ thống báo cáo và thống kê.

## Test Categories

### 1. Kiểm thử chức năng

#### Business Logic

| Test ID        | Description        | Rules            | Expected Result     | Priority |
| -------------- | ------------------ | ---------------- | ------------------- | -------- |
| TC-ANA-FUN-001 | Tính toán Mastery  | BR-ANALYTICS-001 | Công thức chính xác | P0       |
| TC-ANA-FUN-002 | Tổng hợp hàng ngày | BR-ANALYTICS-002 | Tổng khớp với logs  | P0       |

### 2. Kiểm thử tích hợp

| Test ID        | Description      | Components          | Result                                    |
| -------------- | ---------------- | ------------------- | ----------------------------------------- |
| TC-ANA-INT-001 | Event đến Report | Learning, Analytics | Bài học hoàn thành hiển thị trong báo cáo |

### 3. Kiểm thử hiệu năng

| Test ID         | Scenario     | Load         | Result |
| --------------- | ------------ | ------------ | ------ |
| TC-ANA-PERF-001 | Báo cáo nặng | Khoảng 1 năm | < 2s   |

# Performance Requirements

## Performance Targets

### Thời gian phản hồi

| Operation                   | P50   | P95   | P99   | Max | Measurement   |
| --------------------------- | ----- | ----- | ----- | --- | ------------- |
| Knowledge Map Load          | 50ms  | 100ms | 300ms | 1s  | DB/Cache Read |
| Report Generation (30 ngày) | 200ms | 500ms | 1s    | 3s  | Agg Query     |
| Admin Overview (Trường)     | 1s    | 3s    | 5s    | 10s | Heavy Query   |

### Yêu cầu thông lượng

| Scenario        | Requests/sec | Concurrent Users | Data Volume |
| --------------- | ------------ | ---------------- | ----------- |
| Event Ingestion | 5000         | N/A              | 1GB/giờ     |

## Storage

- **Retention Policy**:
  - Raw Logs: 90 ngày.
  - Daily Stats: 5 năm.

## Validation Checklist

- ✅ Đã bật nén PostgreSQL

---
