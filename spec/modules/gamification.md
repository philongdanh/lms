---
id: gamification
title: Gamification
sidebar_label: Gamification
sidebar_position: 7
---

# Gamification

Module trò chơi hóa, quản lý điểm thưởng và bảng xếp hạng.

---

## Business Logic

### Workflow chính

| Workflow            | Mô tả                  | Actor   | Kết quả                        |
| ------------------- | ---------------------- | ------- | ------------------------------ |
| Process EXP         | Xử lý sự kiện nhận EXP | System  | User nhận EXP, có thể level up |
| Award `Badge`       | Gán badge cho user     | System  | `Badge` được gán               |
| `Reward` Redemption | Đổi xu lấy phần thưởng | Student | Xu trừ, reward được cấp        |
| Update Leaderboard  | Cập nhật bảng xếp hạng | System  | Leaderboard realtime           |

### Rules & Constraints

- Công thức Level: EXP thresholds configurable
- Transaction atomic: không trừ xu mà không có reward
- Leaderboard dùng Redis Sorted Sets
- Chỉ trigger EXP nếu là lần hoàn thành đầu tiên
- Async processing: queue lag < 1s

### State Machine

N/A - Gamification events are transactional, no persistent state machine.

---

## Data Model

### Schema & Entities

| Entity             | Fields chính                                  | Mô tả                   |
| ------------------ | --------------------------------------------- | ----------------------- |
| `UserProfile`      | `user_id`, `exp`, `level`, `coins`            | Thông tin game của user |
| `Badge`            | `id`, `name`, `criteria`, `icon`              | Định nghĩa badge        |
| `UserBadge`        | `user_id`, `badge_id`, `earned_at`            | `Badge` đã nhận         |
| `Reward`           | `id`, `name`, `cost`, `type`                  | Phần thưởng có thể đổi  |
| `RewardRedemption` | `id`, `user_id`, `reward_id`, `status`        | Lịch sử đổi thưởng      |
| `Streak`           | `user_id`, `current_streak`, `longest_streak` | Chuỗi ngày học liên tục |

### Relations

| `Relation`                  | Mô tả                                 |
| --------------------------- | ------------------------------------- |
| `User` → `UserProfile`      | `1:1` - Mỗi user có 1 profile         |
| `User` → `UserBadge`        | `1:N` - User có nhiều badges          |
| `Gamification ← Learning`   | Consumes - Nhận events hoàn thành bài |
| `Gamification ← Tournament` | Consumes - Nhận events thắng thua     |

---

## API & Integration

### GraphQL Operations

| Type       | Operation      | Mô tả                 | Auth | Rate Limit |
| ---------- | -------------- | --------------------- | ---- | ---------- |
| `Query`    | `userProfile`  | Thông tin EXP/Level   | ✅   | 200/min    |
| `Query`    | `badges`       | Danh sách badges      | ✅   | 100/min    |
| `Query`    | `leaderboard`  | Bảng xếp hạng         | ✅   | 100/min    |
| `Query`    | `rewards`      | Danh sách phần thưởng | ✅   | 100/min    |
| `Mutation` | `redeemReward` | Đổi phần thưởng       | ✅   | 20/min     |
| `Query`    | `streaks`      | Thông tin streak      | ✅   | 200/min    |

### Events & Webhooks

| Event            | Trigger           | Payload                        |
| ---------------- | ----------------- | ------------------------------ |
| `level.up`       | User lên cấp      | `{ userId, newLevel, reward }` |
| `badge.earned`   | User nhận badge   | `{ userId, badgeId }`          |
| `streak.updated` | `Streak` thay đổi | `{ userId, currentStreak }`    |

---

## Acceptance Criteria

### Functional Requirements

| ID           | Requirement          | Điều kiện                  |
| ------------ | -------------------- | -------------------------- |
| `FR-GAME-01` | Level up chính xác   | EXP vượt threshold         |
| `FR-GAME-02` | Redeem transactional | Atomic trừ xu + cấp reward |
| `FR-GAME-03` | Leaderboard realtime | Update < 50ms              |

### Edge Cases

| Case                | Xử lý                      |
| ------------------- | -------------------------- |
| Không đủ coins      | Trả về lỗi, không trừ tiền |
| Redis memory cao    | Xóa old keys, alert ops    |
| Duplicate EXP event | Idempotent processing      |

---
