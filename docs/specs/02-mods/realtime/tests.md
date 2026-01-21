---
id: realtime-tests
title: Realtime Test Cases
sidebar_label: Tests
sidebar_position: 4
---

# Real-time Communication - Test Cases

Kịch bản kiểm thử hệ thống giao tiếp thời gian thực.

---

## Test Coverage Matrix

| Specification  | Test Cases | Coverage | Status  |
| -------------- | ---------- | -------- | ------- |
| Business Logic | 4          | 100%     | Planned |
| API Endpoints  | 4          | 100%     | Planned |
| Workflows      | 2          | 100%     | Planned |

---

## Test Categories

### 1. Kiểm thử chức năng

#### Business Logic

| Test ID       | Description             | Rules     | Expected Result | Priority |
| ------------- | ----------------------- | --------- | --------------- | -------- |
| TC-RT-FUN-001 | Kết nối với Token       | BR-RT-001 | Thành công      | P0       |
| TC-RT-FUN-002 | Kết nối không Token     | BR-RT-001 | Thất bại 401    | P0       |
| TC-RT-FUN-003 | Giới hạn tham gia phòng | BR-RT-003 | Từ chối nếu đầy | P1       |

### 2. Kiểm thử tích hợp

| Test ID       | Description   | Components     | Result               |
| ------------- | ------------- | -------------- | -------------------- |
| TC-RT-INT-001 | Gửi broadcast | API, Redis, WS | Client nhận được msg |

### 3. Kiểm thử hiệu năng

| Test ID        | Scenario    | Load       | Result    |
| -------------- | ----------- | ---------- | --------- |
| TC-RT-PERF-001 | 10k kết nối | Ramp up 1m | Không lỗi |

---

## Validation Checklist

- [ ] Tuân thủ WebSocket Protocol (v4)

---

# Performance Requirements

---

---

## Performance Targets

### Thời gian phản hồi

| Operation         | P50  | P95   | P99   | Max   | Cách đo      |
| ----------------- | ---- | ----- | ----- | ----- | ------------ |
| Connect Handshake | 50ms | 100ms | 300ms | 1s    | Xử lý Server |
| Message Delivery  | 20ms | 50ms  | 100ms | 500ms | End-to-end   |
| Presence Query    | 5ms  | 10ms  | 20ms  | 50ms  | Redis Read   |

### Yêu cầu thông lượng

| Scenario                | Requests/sec    | Concurrent Users | Data Volume |
| ----------------------- | --------------- | ---------------- | ----------- |
| Broadcast (Competition) | 10,000 msgs/sec | 50,000           | 1MB/sec     |

---

## Scalability Requirements

### Mở rộng theo chiều ngang

- **WebSocket Servers**: Yêu cầu sticky session load balancing.
- **Redis**: Cluster mode cho thông lượng Pub/Sub.

---

## Resource Utilization Limits

| Resource        | Warning Threshold | Critical Threshold | Required Action |
| --------------- | ----------------- | ------------------ | --------------- |
| Open Files (FD) | 100,000           | 500,000            | Tăng ulimit     |

---

## Load Testing Scenarios

### Scenario 1: Live Tournament

**Description**: 50k người dùng tham gia phòng và nhận câu hỏi đồng thời.
**Success Criteria**:

- [ ] Độ trễ gửi < 200ms cho 99% người dùng
- [ ] Không có kết nối bị ngắt

---

## Validation Checklist

- [ ] Tinh chỉnh Kernel cho đồng thời cao (sysctl)

---

## References

- [Overview](/specs)
