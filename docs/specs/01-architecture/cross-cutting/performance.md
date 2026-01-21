---
id: performance
title: Performance
sidebar_label: Performance
sidebar_position: 5
---

# Performance Guidelines

Tiêu chuẩn hiệu năng và chiến lược tối ưu hóa.

---

## Performance Targets

### Response Time

| Percentile | Target  | Threshold | Alert |
| ---------- | ------- | --------- | ----- |
| P50        | < 100ms | 200ms     | Không |
| P95        | < 200ms | 500ms     | Có    |
| P99        | < 500ms | 1000ms    | Có    |

### Throughput

| Metric               | Target | Ghi chú        |
| -------------------- | ------ | -------------- |
| Requests/second      | 1000   | Normal load    |
| Peak Requests/second | 5000   | Peak load      |
| Concurrent Users     | 10,000 | Max concurrent |

### Availability

| Metric | Target    |
| ------ | --------- |
| Uptime | 99.9%     |
| MTTR   | < 30 phút |
| MTBF   | > 30 ngày |

---

## Caching Strategy

### Cache Layers

| Layer       | Tool                    | TTL       | Use Case         |
| ----------- | ----------------------- | --------- | ---------------- |
| CDN         | [CloudFlare/CloudFront] | 1 giờ     | Static assets    |
| Application | Redis                   | 5-15 phút | API responses    |
| Database    | Query cache             | 1 phút    | Frequent queries |

### Cache Patterns

| Pattern       | Description        | Use Case        |
| ------------- | ------------------ | --------------- |
| Cache-Aside   | App quản lý cache  | General use     |
| Write-Through | Ghi vào cache + DB | Cần consistency |
| Write-Behind  | Ghi DB async       | High throughput |

### Cache Invalidation

| Strategy      | Description               |
| ------------- | ------------------------- |
| TTL           | Hết hạn theo thời gian    |
| Event-based   | Invalidate khi update     |
| Version-based | Cache key bao gồm version |

---

## Database Optimization

### Query Guidelines

| Guideline               | Description                 |
| ----------------------- | --------------------------- |
| Use indexes             | Index các columns hay query |
| Avoid N+1               | Sử dụng eager loading       |
| Limit results           | Luôn phân trang             |
| Select specific columns | Tránh SELECT \*             |

### Connection Pooling

| Setting         | Value   | Ghi chú             |
| --------------- | ------- | ------------------- |
| Min connections | 5       | Baseline            |
| Max connections | 20      | Per instance        |
| Idle timeout    | 10 phút | Release idle        |
| Max lifetime    | 30 phút | Refresh connections |

---

## API Optimization

### Response Optimization

| Technique       | Description              |
| --------------- | ------------------------ |
| Pagination      | Giới hạn response size   |
| Field selection | Chỉ trả fields cần thiết |
| Compression     | gzip responses           |
| ETags           | Conditional requests     |

### Request Optimization

| Technique        | Description                       |
| ---------------- | --------------------------------- |
| Batch requests   | Combine related requests          |
| GraphQL          | Query exactly what needed         |
| Async operations | Return immediately, process async |

---

## Load Testing

### Test Scenarios

| Scenario | Users | Duration | Goal          |
| -------- | ----- | -------- | ------------- |
| Smoke    | 10    | 1 min    | Baseline      |
| Load     | 100   | 10 min   | Normal load   |
| Stress   | 500   | 30 min   | Find limits   |
| Spike    | 1000  | 5 min    | Peak handling |
| Soak     | 100   | 4 hours  | Memory leaks  |

### Success Criteria

| Metric      | Pass        | Fail       |
| ----------- | ----------- | ---------- |
| Error Rate  | < 1%        | > 5%       |
| P95 Latency | < 500ms     | > 1000ms   |
| Throughput  | > 100 req/s | < 50 req/s |

---

## Monitoring

### Key Metrics

| Metric            | Alert Condition   |
| ----------------- | ----------------- |
| Response Time P95 | > 500ms for 5 min |
| Error Rate        | > 5% for 5 min    |
| CPU Usage         | > 80% for 10 min  |
| Memory Usage      | > 85% for 10 min  |
| Connection Pool   | > 90% utilized    |

---

## References

- [Monitoring](./monitoring.md)
- [System Design](../system-design.md)
