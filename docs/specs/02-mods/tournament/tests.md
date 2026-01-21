---
id: tournament-tests
title: Tournament Test Cases
sidebar_label: Tests
sidebar_position: 4
---

# Tournament & Competition - Test Cases

Test cases cho module Tournament: kiểm thử joining, scoring, leaderboard,
real-time matches.

---

## Test Coverage Matrix

| Specification  | Test Cases | Coverage | Status  |
| -------------- | ---------- | -------- | ------- |
| Business Logic | 5          | 100%     | Planned |
| API Endpoints  | 4          | 100%     | Planned |
| Workflows      | 2          | 100%     | Planned |

---

## Test Categories

### 1. Kiểm thử chức năng

#### Business Logic

| Test ID         | Description            | Rules       | Expected Result     | Priority |
| --------------- | ---------------------- | ----------- | ------------------- | -------- |
| TC-TOUR-FUN-001 | Join trước khi bắt đầu | BR-TOUR-001 | Cho phép (Waiting)  | P0       |
| TC-TOUR-FUN-002 | Join muộn              | BR-TOUR-001 | Bị chặn             | P1       |
| TC-TOUR-FUN-003 | Điểm chính xác         | BR-TOUR-003 | Điểm khớp công thức | P0       |

### 2. Kiểm thử tích hợp

| Test ID         | Description           | Components | Result         |
| --------------- | --------------------- | ---------- | -------------- |
| TC-TOUR-INT-001 | User thắng nhận Badge | Tour, Game | Badge được gán |

### 3. Kiểm thử hiệu năng

| Test ID          | Scenario        | Load        | Result          |
| ---------------- | --------------- | ----------- | --------------- |
| TC-TOUR-PERF-001 | 100k Concurrent | Start Event | Latency < 200ms |

---

## Validation Checklist

- [ ] Xử lý gửi bài đồng thời

---

# Performance Requirements

---

---

## Performance Targets

### Thời gian phản hồi

| Operation           | P50   | P95   | P99   | Max   | Đo lường         |
| ------------------- | ----- | ----- | ----- | ----- | ---------------- |
| Join Round          | 200ms | 500ms | 1s    | 3s    | DB Write + Logic |
| Submit Answer (WS)  | 50ms  | 100ms | 200ms | 500ms | Server Ack       |
| Leaderboard Refresh | 100ms | 200ms | 500ms | 1s    | Broadcast        |

### Yêu cầu thông lượng

| Scenario    | Requests/sec       | Concurrent Users |
| ----------- | ------------------ | ---------------- |
| Sự kiện lớn | 50,000 Answers/sec | 100,000          |

---

## Scalability Requirements

### Mở rộng theo chiều ngang

- **WebSocket Cluster**: Auto-scale dựa trên CPU/Connections.
- **Room Sharding**: Phân phối room trên các node.

---

## Resource Utilization Limits

| Resource  | Warning Threshold | Critical Threshold |
| --------- | ----------------- | ------------------ |
| Redis CPU | 60%               | 85%                |

---

## Load Testing Scenarios

### Scenario 1: Big Rush

**Description**: 100k users tham gia trong 1 phút. **Success Criteria**:

- [ ] Không có DB Deadlock
- [ ] Tỷ lệ kết nối thành công > 99.9%

---

## Validation Checklist

- [ ] Đã xác minh Redis Cluster failover

---

## References

- [Overview](/specs)
