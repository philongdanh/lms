---
id: benchmarks
title: Performance Benchmarks
sidebar_label: Benchmarks
---

# Performance Benchmarks

Performance targets và đo lường.


## Response Time Benchmarks

### API Endpoints

| Endpoint Category | P50 | P95 | P99 | Max |
|-------------------|-----|-----|-----|-----|
| Read (GET) | 50ms | 100ms | 200ms | 500ms |
| Write (POST/PUT) | 100ms | 200ms | 500ms | 1s |
| Search | 200ms | 500ms | 1s | 2s |
| Report | 500ms | 2s | 5s | 10s |

### Database Operations

| Operation | Target | Threshold |
|-----------|--------|-----------|
| Simple query | < 10ms | 50ms |
| Join query | < 50ms | 200ms |
| Aggregation | < 200ms | 1s |
| Write | < 20ms | 100ms |

### Cache Operations

| Operation | Target | Threshold |
|-----------|--------|-----------|
| Read | < 5ms | 20ms |
| Write | < 10ms | 50ms |
| Miss + DB | < 100ms | 500ms |


## Throughput Benchmarks

### Requests Per Second

| Scenario | Target | Threshold |
|----------|--------|-----------|
| Normal load | 1,000 | 500 |
| Peak load | 5,000 | 2,000 |
| Burst | 10,000 | 5,000 |

### Concurrent Users

| Scenario | Target | Threshold |
|----------|--------|-----------|
| Normal | 10,000 | 5,000 |
| Peak | 50,000 | 25,000 |

### Data Volume

| Metric | Target | Threshold |
|--------|--------|-----------|
| Requests/hour | 3.6M | 1.8M |
| Data transfer/hour | 10GB | 5GB |


## Resource Benchmarks

### Application

| Resource | Normal | Alert | Critical |
|----------|--------|-------|----------|
| CPU | < 50% | 70% | 90% |
| Memory | < 60% | 80% | 90% |
| Threads | < 100 | 200 | 500 |

### Database

| Resource | Normal | Alert | Critical |
|----------|--------|-------|----------|
| Connections | < 50% | 80% | 95% |
| CPU | < 40% | 60% | 80% |
| Storage | < 70% | 85% | 95% |
| IOPS | < 50% | 75% | 90% |

### Cache

| Resource | Normal | Alert | Critical |
|----------|--------|-------|----------|
| Memory | < 70% | 85% | 95% |
| Hit rate | > 90% | < 80% | < 60% |
| Connections | < 50% | 80% | 95% |


## Load Testing Scenarios

### Smoke Test

| Parameter | Value |
|-----------|-------|
| Duration | 1 minute |
| Users | 10 |
| Ramp-up | Immediate |
| Purpose | Verify system works |

### Load Test

| Parameter | Value |
|-----------|-------|
| Duration | 30 minutes |
| Users | 100-500 |
| Ramp-up | 5 min |
| Purpose | Normal load behavior |

### Stress Test

| Parameter | Value |
|-----------|-------|
| Duration | 1 hour |
| Users | 1000+ |
| Ramp-up | 10 min |
| Purpose | Find breaking point |

### Spike Test

| Parameter | Value |
|-----------|-------|
| Duration | 15 minutes |
| Users | 0 → 1000 → 0 |
| Ramp-up | 1 min spike |
| Purpose | Sudden load handling |

### Soak Test

| Parameter | Value |
|-----------|-------|
| Duration | 4-8 hours |
| Users | 100 |
| Ramp-up | 5 min |
| Purpose | Memory leaks, degradation |


## Benchmark Script

```javascript
// k6 load test example
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5m', target: 100 },  // Ramp up
    { duration: '30m', target: 100 }, // Steady
    { duration: '5m', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<200'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const res = http.get('http://api.example.com/resource');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });
  sleep(1);
}
```


## Reporting

### Metrics to Track

| Metric | Description | Target |
|--------|-------------|--------|
| Throughput | Requests/second | > 1000 |
| Error Rate | Failed/total | < 1% |
| P95 Latency | 95th percentile | < 200ms |
| P99 Latency | 99th percentile | < 500ms |
| Apdex | User satisfaction | > 0.9 |

### Report Frequency

| Report | Frequency | Audience |
|--------|-----------|----------|
| CI Results | Per build | Dev team |
| Weekly Summary | Weekly | Team lead |
| Trend Analysis | Monthly | Management |


## References

- [Test Strategy](./test-strategy.md)
- [Performance](../01-architecture/cross-cutting/performance.md)
- [Monitoring](../01-architecture/cross-cutting/monitoring.md)
