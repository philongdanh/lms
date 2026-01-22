# Tournament Module Specification

# Tournament & Competition - Business Logic

Quy tắc nghiệp vụ tổ chức và điều hành giải đấu.

## Dependencies

### Phụ thuộc nội bộ

- ✅ Realtime Module - Hạ tầng WebSocket.
- ✅ Content Module - Nguồn câu hỏi.
- ✅ Gamification Module - Phần thưởng sau thi đấu.

### Phụ thuộc bên ngoài

- ✅ Redis - Leaderboard (ZSET).

## Validation Criteria

- ✅ Tính điểm chính xác theo thời gian.
- ✅ Leaderboard cập nhật đúng thứ tự.
- ✅ Load balancing giữa các room thi đấu hoạt động tốt.

# Workflows

## Workflow Summary

| Workflow ID | Tên Workflow     | Trigger        | Actors       | Status |
| ----------- | ---------------- | -------------- | ------------ | ------ |
| WF-TOUR-001 | Join Competition | User nhấn Join | User, System | Active |
| WF-TOUR-002 | Realtime Scoring | User trả lời   | User, System | Active |

config: themeVariables: fontFamily: "EB Garamond" config: themeVariables:
fontFamily: "EB Garamond"

## Events

### Sự kiện hệ thống

| Event Name      | Description    | Payload      | Emitted By |
| --------------- | -------------- | ------------ | ---------- |
| `round.started` | Round bắt đầu  | `{round_id}` | Scheduler  |
| `round.ended`   | Round kết thúc | `{round_id}` | Scheduler  |

## Performance Requirements

- **Broadcast**: < 500ms latency đến 10k users.

## References

---

# Tournament - API Endpoints

Các giao diện lập trình cho quản lý giải đấu và bảng xếp hạng.

## Endpoints Summary

| Method | Endpoint              | Description              | Auth Required | Rate Limit |
| ------ | --------------------- | ------------------------ | ------------- | ---------- |
| GET    | `/`                   | Danh sách giải đấu       | ✅            | 100/min    |
| GET    | `/:id`                | Chi tiết giải đấu        | ✅            | 100/min    |
| POST   | `/:id/join`           | Đăng ký tham gia         | ✅            | 20/min     |
| GET    | `/:id/matches`        | Danh sách trận đấu       | ✅            | 100/min    |
| POST   | `/matches/:id/submit` | Nộp câu trả lời trận đấu | ✅            | 50/min     |
| GET    | `/:id/leaderboard`    | Bảng xếp hạng giải đấu   | ✅            | 100/min    |
| POST   | `/`                   | Tạo giải đấu mới         | ✅ Admin      | 10/min     |

---

# Tournament - Data Model

Cấu trúc dữ liệu cho các cuộc thi và kết quả thi đấu.

config: themeVariables: fontFamily: "EB Garamond"

## References

-
-
-

---

# Tournament & Competition - Test Cases

Kịch bản kiểm thử hệ thống thi đấu và xếp hạng.

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

# Performance Requirements

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

## Resource Utilization Limits

| Resource  | Warning Threshold | Critical Threshold |
| --------- | ----------------- | ------------------ |
| Redis CPU | 60%               | 85%                |

## Validation Checklist

- ✅ Đã xác minh Redis Cluster failover

---
