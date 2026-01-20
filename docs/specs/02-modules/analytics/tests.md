---
id: analytics-tests
title: Analytics Test Cases
sidebar_label: Tests
sidebar_position: 5
---

# Analytics & Reporting - Test Cases

---

## Overview

Các test case cho module Analytics.

---

## Test Coverage Matrix

| Specification  | Test Cases | Coverage | Status          |
| -------------- | ---------- | -------- | --------------- |
| Business Logic | 5          | 100%     | Đã lên kế hoạch |
| API Endpoints  | 4          | 100%     | Đã lên kế hoạch |
| Workflows      | 2          | 100%     | Đã lên kế hoạch |

---

## Test Categories

### 1. Functional Tests

#### Business Logic

| Test ID        | Description        | Rules            | Expected Result     | Priority |
| -------------- | ------------------ | ---------------- | ------------------- | -------- |
| TC-ANA-FUN-001 | Tính toán Mastery  | BR-ANALYTICS-001 | Công thức chính xác | P0       |
| TC-ANA-FUN-002 | Tổng hợp hàng ngày | BR-ANALYTICS-002 | Tổng khớp với logs  | P0       |

### 2. Integration Tests

| Test ID        | Description      | Components          | Result                                    |
| -------------- | ---------------- | ------------------- | ----------------------------------------- |
| TC-ANA-INT-001 | Event đến Report | Learning, Analytics | Bài học hoàn thành hiển thị trong báo cáo |

### 3. Performance Tests

| Test ID         | Scenario     | Load         | Result |
| --------------- | ------------ | ------------ | ------ |
| TC-ANA-PERF-001 | Báo cáo nặng | Khoảng 1 năm | < 2s   |

---

## Validation Checklist

- [ ] Xác minh tính nhất quán dữ liệu (Raw vs Agg)

---

# Performance Requirements

---

## Overview

Các thông số hiệu suất cho module Analytics.

---

## Performance Targets

### Response Times

| Operation                   | P50   | P95   | P99   | Max | Measurement   |
| --------------------------- | ----- | ----- | ----- | --- | ------------- |
| Knowledge Map Load          | 50ms  | 100ms | 300ms | 1s  | DB/Cache Read |
| Report Generation (30 ngày) | 200ms | 500ms | 1s    | 3s  | Agg Query     |
| Admin Overview (Trường)     | 1s    | 3s    | 5s    | 10s | Heavy Query   |

### Throughput Requirements

| Scenario        | Requests/sec | Concurrent Users | Data Volume |
| --------------- | ------------ | ---------------- | ----------- |
| Event Ingestion | 5000         | N/A              | 1GB/giờ     |

---

## Scalability Requirements

### Vertical Scaling

- **DB**: Bộ nhớ cao cho PostgreSQL chunk caching.

### Horizontal Scaling

- **Consumer**: Các consumer song song cho event bus.

---

## Storage

- **Retention Policy**:
  - Raw Logs: 90 ngày.
  - Daily Stats: 5 năm.

---

## Load Testing Scenarios

### Scenario 1: End of Month Reporting

**Description**: Phụ huynh xem báo cáo cùng lúc. **Tiêu chí thành công**:

- [ ] P95 < 1s cho Report Detail API

---

## Validation Checklist

- [ ] Đã bật nén PostgreSQL

---

## References

- [Overview](/specs)
