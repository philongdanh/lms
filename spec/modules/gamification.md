---
id: gamification
title: Gamification
sidebar_label: Gamification
sidebar_position: 5
---

# Gamification

Module **Gamification** quản lý phần thưởng, điểm số và bảng xếp hạng.

> **SSoT**: [Backlog](../../blueprint/product/plan.md) |
> [Database](../../blueprint/architecture/database.md) |
> [13: Redis](../../blueprint/architecture/decisions/13-redis.md)

---

## Business Logic

### Xử lý EXP

Xử lý sự kiện nhận EXP và tăng cấp.

```d2
shape: sequence_diagram
"Learning Service"
"Gamification Service"
Database
Engine
"Event Bus"

"Learning Service" -> "Gamification Service": event(lesson_complete)
"Gamification Service" -> Database: get_user_profile
"Gamification Service" -> Engine: calculate_exp_gain
Engine -> "Gamification Service": exp_amount
"Gamification Service" -> Database: update_exp_coins
"Gamification Service" -> Engine: check_level_up
Engine -> "Gamification Service": new_level
"Gamification Service" -> Database: update_level
"Gamification Service" -> "Event Bus": publish(level.up)
```

### Cập nhật Streak

Cập nhật chuỗi hoạt động hằng ngày.

```d2
shape: sequence_diagram
"Learning Service"
"Gamification Service"
Database

"Learning Service" -> "Gamification Service": event(lesson_complete)
"Gamification Service" -> Database: get_streak(user_id)
Database -> "Gamification Service": current_streak
"Gamification Service" -> "Gamification Service": is_today_first_activity?
"Gamification Service" -> Database: update_streak(current + 1, longest)
"Gamification Service" -> "Event Bus": publish(streak.updated)
```

### Trao huy hiệu

Trao huy hiệu khi đạt đủ điều kiện.

> [!NOTE] **Phase 2 Feature**: Tính năng này thuộc **Sprint 8** (US-024). Không
> triển khai trong MVP Core.

```d2
shape: sequence_diagram
"Event Worker"
"Gamification Service"
Database
"Notification Service"

"Event Worker" -> "Gamification Service": check_badge_criteria(user_activity)
"Gamification Service" -> Database: find_applicable_badges
Database -> "Gamification Service": new_badges
"Gamification Service" -> Database: insert_user_badge
"Gamification Service" -> "Notification Service": notify_user(badge_earned)
```

### Đổi thưởng

Đổi coin lấy phần thưởng.

> [!NOTE] **Future / Backlog**: Tính năng này thuộc danh sách **Could Have**
> (US-032). Chưa ưu tiên triển khai.

```d2
shape: sequence_diagram
Student
"Gamification Service"
Database

Student -> "Gamification Service": redeem(reward_id)
"Gamification Service" -> Database: transaction_start
"Gamification Service" -> Database: check_balance
Database -> "Gamification Service": sufficient
"Gamification Service" -> Database: deduct_coins
"Gamification Service" -> Database: create_redemption_record
"Gamification Service" -> Database: transaction_commit
"Gamification Service" -> Student: success
```

### Cập nhật Leaderboard

Làm mới bảng xếp hạng định kỳ.

```d2
shape: sequence_diagram
Scheduler
"Gamification Service"
Database
Redis
"Realtime Service"

Scheduler -> "Gamification Service": refresh_leaderboards
"Gamification Service" -> Database: aggregate_top_users
"Gamification Service" -> Redis: zadd_batch
"Gamification Service" -> "Realtime Service": broadcast(leaderboard_refresh)
```

### Quy tắc & Ràng buộc

- Công thức level: ngưỡng EXP có thể cấu hình
- Transaction atomic: không trừ coin nếu không có reward
- Bảng xếp hạng dùng Redis Sorted Sets
- Chỉ trigger EXP khi hoàn thành lần đầu
- Async processing: độ trễ queue < 1s

---

## API & Integration

> **SSoT**: [schema.graphql](../api/graphql/gamification/schema.graphql) |
> [operations.graphql](../api/graphql/gamification/operations.graphql)

### Sự kiện & Webhooks

| Sự kiện          | Kích hoạt          | Payload                        |
| ---------------- | ------------------ | ------------------------------ |
| `level.up`       | User tăng cấp      | `{ userId, newLevel, reward }` |
| `badge.earned`   | User nhận huy hiệu | `{ userId, badgeId }`          |
| `streak.updated` | Streak thay đổi    | `{ userId, currentStreak }`    |

---

## Acceptance Criteria

### Yêu cầu chức năng

| ID       | Yêu cầu                  | Điều kiện                     |
| -------- | ------------------------ | ----------------------------- |
| `US-014` | Tăng cấp chính xác       | EXP vượt ngưỡng               |
| `US-032` | Đổi thưởng transactional | Trừ coin atomic + trao thưởng |
| `US-019` | Bảng xếp hạng real-time  | Cập nhật < 50ms               |

### Các Edge Cases

| Trường hợp          | Xử lý                  |
| ------------------- | ---------------------- |
| Không đủ coin       | Lỗi, không trừ coin    |
| Redis memory cao    | Xóa keys cũ, alert ops |
| EXP event trùng lặp | Xử lý idempotent       |

---
