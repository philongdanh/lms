---
id: benchmarks
title: Performance Benchmarks
sidebar_label: Benchmarks
sidebar_position: 4
---

# Performance Benchmarks

Các chỉ số mục tiêu và phương pháp đo lường hiệu năng.

---

## Response Time Targets

### API Endpoints

| Danh mục             | P50   | P95   | P99   | Max   |
| -------------------- | ----- | ----- | ----- | ----- |
| Read (`GET`)         | 50ms  | 100ms | 200ms | 500ms |
| Write (`POST`/`PUT`) | 100ms | 200ms | 500ms | 1s    |
| Search               | 200ms | 500ms | 1s    | 2s    |
| Report               | 500ms | 2s    | 5s    | 10s   |

### Database Operations

| Thao tác     | Mục tiêu | Ngưỡng |
| ------------ | -------- | ------ |
| Simple query | < 10ms   | 50ms   |
| Join query   | < 50ms   | 200ms  |
| Aggregation  | < 200ms  | 1s     |
| Write        | < 20ms   | 100ms  |

---

## Throughput Targets

| Kịch bản    | Mục tiêu   | Ngưỡng |
| ----------- | ---------- | ------ |
| Normal load | 1,000 RPS  | 500    |
| Peak load   | 5,000 RPS  | 2,000  |
| Burst       | 10,000 RPS | 5,000  |

### Concurrent Users

| Kịch bản | Mục tiêu | Ngưỡng |
| -------- | -------- | ------ |
| Normal   | 10,000   | 5,000  |
| Peak     | 50,000   | 25,000 |

---

## Load Testing Scenarios

| Kịch bản | Thời lượng | Users    | Mục đích           |
| -------- | ---------- | -------- | ------------------ |
| Smoke    | 1 min      | 10       | Kiểm tra hệ thống  |
| Load     | 30 min     | 100-500  | Tải bình thường    |
| Stress   | 1 hour     | 1000+    | Tìm giới hạn       |
| Spike    | 15 min     | 0→1000→0 | Xử lý tải đột ngột |
| Soak     | 4-8 hours  | 100      | Memory leaks       |

---

## Resource Limits

| Tài nguyên     | Normal | Alert | Critical |
| -------------- | ------ | ----- | -------- |
| CPU            | < 50%  | 70%   | 90%      |
| Memory         | < 60%  | 80%   | 90%      |
| DB Connections | < 50%  | 80%   | 95%      |
| Cache Hit Rate | > 90%  | < 80% | < 60%    |

---

## Security Tests

> **Validates**:
> [NFR-SEC-01 to NFR-SEC-05](../blueprint/product/constraints.md#security)

| ID     | Test               | Mục tiêu      | Phương pháp          |
| ------ | ------------------ | ------------- | -------------------- |
| SEC-01 | RBAC enforcement   | 5 roles       | Thử access chéo role |
| SEC-02 | TLS verification   | TLS 1.3       | SSL Labs scan        |
| SEC-03 | JWT token security | Expiry 15min  | Token inspection     |
| SEC-04 | 2FA for admin      | TOTP required | Admin login attempt  |
| SEC-05 | Multi-device limit | Max 3 devices | Session creation     |

---

## KPI Metrics

> **Validates**:
> [Success Metrics](../blueprint/product/vision.md#success-metrics)

| KPI                      | Mục tiêu       | Phương pháp đo      |
| ------------------------ | -------------- | ------------------- |
| Daily Active Users       | 60% registered | Analytics query     |
| Lesson Completion Rate   | > 80%          | Progress tracking   |
| Average Session Time     | > 15 min       | Session duration    |
| Tournament Participation | > 40%          | Event registrations |
| Parent Engagement        | > 50% weekly   | Login frequency     |

---
