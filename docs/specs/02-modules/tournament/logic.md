---
id: logic
title: Business Logic
sidebar_label: Logic
sidebar_position: 2
---

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

- [ ] Tính điểm chính xác theo thời gian.
- [ ] Leaderboard cập nhật đúng thứ tự.
- [ ] Load balancing giữa các room thi đấu hoạt động tốt.


# Workflows


## Workflow Summary

| Workflow ID | Tên Workflow     | Trigger        | Actors       | Status |
| ----------- | ---------------- | -------------- | ------------ | ------ |
| WF-TOUR-001 | Join Competition | User nhấn Join | User, System | Active |
| WF-TOUR-002 | Realtime Scoring | User trả lời   | User, System | Active |

config:
  themeVariables:
    fontFamily: "EB Garamond"
config:
  themeVariables:
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

- [Overview](../../00-planning/stories.md)
