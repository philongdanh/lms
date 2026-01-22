---
id: logic
title: Business Logic
sidebar_label: Logic
sidebar_position: 20
---

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

config:
  themeVariables:
    fontFamily: "EB Garamond"
config:
  themeVariables:
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

