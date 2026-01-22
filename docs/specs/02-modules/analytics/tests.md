---
id: tests
title: Test Cases
sidebar_label: Tests
sidebar_position: 40
---

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

