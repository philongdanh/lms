---
id: tests
title: Test Cases
sidebar_label: Tests
sidebar_position: 40
---

# Gamification & Rewards - Test Cases
 
Kịch bản kiểm thử hệ thống thành tích và khen thưởng.


## Test Categories

### 1. Kiểm thử chức năng

#### Business Logic

| Test ID         | Description        | Rules       | Expected Result             | Priority |
| --------------- | ------------------ | ----------- | --------------------------- | -------- |
| TC-GAME-FUN-001 | Tính toán Level Up | BR-GAME-001 | Level tăng khi EXP > ngưỡng | P0       |
| TC-GAME-FUN-002 | Trừ Coin           | BR-GAME-002 | Coins giảm, Order được tạo  | P0       |
| TC-GAME-FUN-003 | Không đủ Coins     | BR-GAME-002 | Trả về lỗi, không trừ tiền  | P1       |

### 2. Kiểm thử tích hợp

| Test ID         | Description                  | Components     | Result              |
| --------------- | ---------------------------- | -------------- | ------------------- |
| TC-GAME-INT-001 | Hoàn thành học kích hoạt EXP | Learning, Game | Người dùng nhận EXP |

### 3. Kiểm thử hiệu năng

| Test ID          | Scenario        | Load     | Result |
| ---------------- | --------------- | -------- | ------ |
| TC-GAME-PERF-001 | Đọc Leaderboard | 1000 RPS | < 50ms |


# Performance Requirements


## Performance Targets

### Thời gian phản hồi

| Operation       | P50   | P95   | P99   | Max   | Measurement    |
| --------------- | ----- | ----- | ----- | ----- | -------------- |
| Get Profile     | 30ms  | 100ms | 300ms | 1s    | DB Read        |
| Get Leaderboard | 20ms  | 50ms  | 100ms | 500ms | Redis Read     |
| Redeem Reward   | 100ms | 300ms | 500ms | 2s    | DB Transaction |

### Yêu cầu thông lượng

| Scenario         | Requests/sec | Concurrent Users | Data Volume |
| ---------------- | ------------ | ---------------- | ----------- |
| Event Processing | 1000         | N/A (Async)      | 50MB/giờ    |


## Resource Utilization Limits

| Resource     | Warning Threshold | Critical Threshold | Required Action       |
| ------------ | ----------------- | ------------------ | --------------------- |
| Redis Memory | 70%               | 90%                | Xóa key cũ / Scale up |


## Validation Checklist

- ✅ Cụm Redis được cấu hình để có tính sẵn sàng cao

