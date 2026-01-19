---
id: monitoring
title: Monitoring
sidebar_label: Monitoring
---

# Monitoring & Observability

Giám sát hệ thống, logging và alerting.

---

## Overview

### Three Pillars

| Pillar | Tool | Mục đích |
|--------|------|----------|
| Metrics | [Prometheus/DataDog] | System metrics |
| Logging | [ELK/Loki] | Log aggregation |
| Tracing | [Jaeger/Zipkin] | Distributed tracing |

---

## Metrics

### System Metrics

| Metric | Description | Alert Threshold |
|--------|-------|-----------------|
| CPU Usage | CPU utilization | > 80% |
| Memory Usage | Memory utilization | > 85% |
| Disk Usage | Disk utilization | > 90% |
| Network I/O | Network throughput | Anomaly |

### Application Metrics

| Metric | Description | Target | Alert |
|--------|-------|--------|-------|
| Request Rate | Requests/second | - | Anomaly |
| Error Rate | Errors/total requests | < 1% | > 5% |
| Response Time (P50) | Median latency | < 100ms | > 200ms |
| Response Time (P95) | 95th percentile | < 200ms | > 500ms |
| Response Time (P99) | 99th percentile | < 500ms | > 1s |

### Business Metrics

| Metric | Description | Measurement |
|--------|-------|-------------|
| Active Users | Concurrent users | Real-time |
| Transactions | Business transactions | Per minute |
| Conversion Rate | [Business KPI] | Hourly |

---

## Logging

### Log Levels

| Level | Usage | Example |
|-------|---------|-------|
| ERROR | Lỗi cần chú ý | Exception, operation thất bại |
| WARN | Vấn đề tiềm ẩn | Deprecated usage, retry |
| INFO | Hoạt động bình thường | Request start/end |
| DEBUG | Debug chi tiết | Variable values |

### Log Format

```json
{
  "timestamp": "2024-01-01T00:00:00Z",
  "level": "INFO",
  "service": "api",
  "requestId": "uuid",
  "userId": "uuid",
  "message": "Request completed",
  "duration": 123,
  "metadata": {}
}
```

### What to Log

| Event | Level | Fields |
|-------|-------|--------|
| Request Start | INFO | method, path, userId |
| Request End | INFO | status, duration |
| Error | ERROR | error, stack, context |
| Authentication | INFO | userId, result |
| Business Event | INFO | event, data |

### What NOT to Log

- Passwords hoặc secrets
- Full credit card numbers
- Thông tin sức khỏe cá nhân
- Raw PII (mask hoặc hash)

---

## Tracing

### Trace Context

| Field | Description |
|-------|-------------|
| Trace ID | Unique ID for request chain |
| Span ID | Unique ID for operation |
| Parent Span ID | Parent operation |

### Key Spans

| Span | Description |
|------|-------------|
| HTTP Request | Incoming/outgoing HTTP |
| Database Query | SQL queries |
| Cache Operation | Redis/cache access |
| External Service | Third-party calls |

---

## Alerting

### Alert Priorities

| Priority | Response Time | Notification |
|----------|---------------|--------------|
| P1 Critical | Immediate | PagerDuty + Phone |
| P2 High | < 15 min | Slack + Email |
| P3 Medium | < 1 hour | Slack |
| P4 Low | Next business day | Email |

### Alert Rules

| Alert | Condition | Priority | Action |
|-------|-----------|----------|--------|
| High Error Rate | Error rate > 5% for 5min | P1 | Page on-call |
| Slow Response | P95 > 1s for 10min | P2 | Notify team |
| High CPU | CPU > 90% for 15min | P2 | Scale up |
| Service Down | Health check fails 3x | P1 | Page on-call |

---

## Dashboards

### Overview Dashboard

- Request rate and error rate
- Response time percentiles
- Active users
- System resources

### Service Dashboard

- Per-service metrics
- Dependency health
- Error breakdown
- Top endpoints

---

## References

- [Performance](./performance.md)
- [Error Handling](./error-handling.md)
