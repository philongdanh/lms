---
id: analytics-tests
title: Analytics Test Cases
sidebar_label: Tests
---

# Analytics & Reporting - Test Cases

## Overview
Các test case cho module Analytics.

## Test Coverage Matrix
| Đặc tả | Test Cases | Độ phủ | Trạng thái |
|---------------|------------|---------|--------|
| Business Logic | 5 | 100% | Đã lên kế hoạch |
| API Endpoints | 4 | 100% | Đã lên kế hoạch |
| Workflows | 2 | 100% | Đã lên kế hoạch |

## Test Categories

### 1. Functional Tests
#### Business Logic
| Test ID | Mô tả | Rules | Kết quả mong đợi | Độ ưu tiên |
|---------|-------------|-------|-----------------|----------|
| TC-ANA-FUN-001 | Tính toán Mastery | BR-ANALYTICS-001 | Công thức chính xác | P0 |
| TC-ANA-FUN-002 | Tổng hợp hàng ngày | BR-ANALYTICS-002 | Tổng khớp với logs | P0 |

### 2. Integration Tests
| Test ID | Mô tả | Components | Kết quả |
|---------|-------------|------------|--------|
| TC-ANA-INT-001 | Event đến Report | Learning, Analytics | Bài học hoàn thành hiển thị trong báo cáo |

### 3. Performance Tests
| Test ID | Kịch bản | Load | Kết quả |
|---------|----------|------|--------|
| TC-ANA-PERF-001 | Báo cáo nặng | Khoảng 1 năm | < 2s |

---

## Validation Checklist
- [ ] Xác minh tính nhất quán dữ liệu (Raw vs Agg)


---

# Performance Requirements

## Overview
Các thông số hiệu suất cho module Analytics.

## Performance Targets

### Response Times
| Thao tác | P50 | P95 | P99 | Max | Phương pháp đo |
|-----------|-----|-----|-----|-----|-------------|
| Knowledge Map Load | 50ms | 100ms | 300ms | 1s | DB/Cache Read |
| Report Generation (30 ngày) | 200ms | 500ms | 1s | 3s | Agg Query |
| Admin Overview (Trường) | 1s | 3s | 5s | 10s | Heavy Query |

### Throughput Requirements
| Kịch bản | Requests/sec | Người dùng đồng thời | Khối lượng dữ liệu |
|----------|--------------|------------------|-------------|
| Event Ingestion | 5000 | N/A | 1GB/giờ |

## Scalability Requirements
### Vertical Scaling
- **DB**: Bộ nhớ cao cho PostgreSQL chunk caching.

### Horizontal Scaling
- **Consumer**: Các consumer song song cho event bus.

## Storage
- **Retention Policy**:
  - Raw Logs: 90 ngày.
  - Daily Stats: 5 năm.

## Load Testing Scenarios
### Scenario 1: End of Month Reporting
**Mô tả**: Phụ huynh xem báo cáo cùng lúc.
**Tiêu chí thành công**:
- [ ] P95 < 1s cho Report Detail API

---

## Validation Checklist
- [ ] Đã bật nén PostgreSQL
