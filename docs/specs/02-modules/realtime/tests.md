---
id: tests
title: Test Cases
sidebar_label: Tests
sidebar_position: 40
---

# Real-time Communication - Test Cases

Kịch bản kiểm thử hệ thống giao tiếp thời gian thực.


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


# Performance Requirements


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


## Resource Utilization Limits

| Resource        | Warning Threshold | Critical Threshold | Required Action |
| --------------- | ----------------- | ------------------ | --------------- |
| Open Files (FD) | 100,000           | 500,000            | Tăng ulimit     |


## Validation Checklist

- ✅ Tinh chỉnh Kernel cho đồng thời cao (sysctl)

