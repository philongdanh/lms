# Gamification Module Specification

# Gamification & Rewards - Business Logic

Quy tắc nghiệp vụ hệ thống thi đua và trò chơi hóa.

## Dependencies

### Phụ thuộc nội bộ

- ✅ Learning Module - Kích hoạt sự kiện khi hoàn thành bài học.
- ✅ Tournament Module - Kích hoạt sự kiện khi thắng giải đấu.

### Phụ thuộc bên ngoài

- ✅ Redis - Cache bảng xếp hạng (Sorted Sets).

## Validation Criteria

- ✅ Công thức tính Level hoạt động chính xác.
- ✅ Giao dịch đổi xu đảm bảo Atomicity (không trừ tiền mà không có phần
  thưởng).
- ✅ Bảng xếp hạng cập nhật realtime.

# Workflows

## Workflow Summary

| Workflow ID | Workflow Name     | Trigger            | Actors         | Status |
| ----------- | ----------------- | ------------------ | -------------- | ------ |
| WF-GAME-001 | Process EXP Event | Hoàn thành học/thi | System (Async) | Active |
| WF-GAME-002 | Reward Redemption | Kết nối tới Store  | Student, Admin | Active |

config: themeVariables: fontFamily: "EB Garamond" config: themeVariables:
fontFamily: "EB Garamond"

## Events

### Sự kiện hệ thống

| Event Name     | Description           | Payload                        | Emitted By |
| -------------- | --------------------- | ------------------------------ | ---------- |
| `level.up`     | Người dùng lên cấp    | `{user_id, new_level, reward}` | Game Svc   |
| `badge.earned` | Người dùng nhận badge | `{user_id, badge_id}`          | Game Svc   |

## Performance Requirements

- **Async Processing**: Độ trễ hàng đợi event < 1s.

## Validation Checklist

- ✅ Việc trừ phần thưởng có tính transactional

---

# Gamification - API Endpoints

Các giao diện lập trình cho hệ thống thành tích và khen thưởng.

## Endpoints Summary

| Method | Endpoint              | Description           | Auth Required | Rate Limit |
| ------ | --------------------- | --------------------- | ------------- | ---------- |
| GET    | `/profile`            | Thông tin EXP/Level   | ✅            | 200/min    |
| GET    | `/badges`             | Danh sách badges      | ✅            | 100/min    |
| GET    | `/leaderboard`        | Bảng xếp hạng         | ✅            | 100/min    |
| GET    | `/rewards`            | Danh sách phần thưởng | ✅            | 100/min    |
| POST   | `/rewards/:id/redeem` | Đổi phần thưởng       | ✅            | 20/min     |
| GET    | `/streaks`            | Thông tin streak      | ✅            | 200/min    |

---

# Gamification - Data Model

Cấu trúc dữ liệu cho điểm kinh nghiệm, danh hiệu và phần thưởng.

config: themeVariables: fontFamily: "EB Garamond"

## References

-
-
-

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

---
