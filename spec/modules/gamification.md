---
id: gamification
title: Gamification
sidebar_label: Gamification
sidebar_position: 7
---

# Gamification

Module quản lý phần thưởng, điểm số và bảng xếp hạng.

---

## Business Logic

### Process EXP

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

### Award Badge

Trao huy hiệu khi đạt đủ điều kiện.

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

### Reward Redemption

Đổi coin lấy phần thưởng.

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

### Update Leaderboard

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

### Rules & Constraints

- Công thức level: ngưỡng EXP có thể cấu hình
- Transaction atomic: không trừ coin nếu không có reward
- Bảng xếp hạng dùng Redis Sorted Sets
- Chỉ trigger EXP khi hoàn thành lần đầu
- Async processing: độ trễ queue < 1s

---

## Data Model

> **SSoT**: [Database Blueprint](../../blueprint/architecture/database.md)

---

## API & Integration

### GraphQL Operations

> **SSoT**: [schema.graphql](../api/graphql/gamification/schema.graphql) |
> [operations.graphql](../api/graphql/gamification/operations.graphql)

```graphql
type Query {
  """
  Thông tin EXP và Level
  """
  userProfile: UserProfile! @auth @rateLimit(limit: 200, window: "1m")

  """
  Danh sách huy hiệu
  """
  badges: [Badge!]! @auth @rateLimit(limit: 100, window: "1m")

  """
  Bảng xếp hạng
  """
  leaderboard(type: LeaderboardType!, limit: Int): [LeaderboardEntry!]!
    @auth
    @rateLimit(limit: 100, window: "1m")

  """
  Danh sách phần thưởng
  """
  rewards: [Reward!]! @auth @rateLimit(limit: 100, window: "1m")

  """
  Thông tin streak
  """
  streaks: StreakInfo! @auth @rateLimit(limit: 200, window: "1m")
}

type Mutation {
  """
  Đổi coin lấy phần thưởng
  """
  redeemReward(rewardId: ID!): RewardRedemption!
    @auth
    @rateLimit(limit: 20, window: "1m")
}

type UserProfile {
  userId: ID!
  exp: Int!
  level: Int!
  coins: Int!
  expToNextLevel: Int!
}

type LeaderboardEntry {
  rank: Int!
  userId: ID!
  username: String!
  score: Int!
  avatarUrl: String
}

enum LeaderboardType {
  WEEKLY
  MONTHLY
  ALL_TIME
}
```

### Events & Webhooks

| Sự kiện          | Kích hoạt          | Payload                        |
| ---------------- | ------------------ | ------------------------------ |
| `level.up`       | User tăng cấp      | `{ userId, newLevel, reward }` |
| `badge.earned`   | User nhận huy hiệu | `{ userId, badgeId }`          |
| `streak.updated` | Streak thay đổi    | `{ userId, currentStreak }`    |

---

## Acceptance Criteria

### Functional Requirements

| ID        | Yêu cầu                  | Điều kiện                     |
| --------- | ------------------------ | ----------------------------- |
| `LMS-016` | Tăng cấp chính xác       | EXP vượt ngưỡng               |
| `LMS-065` | Đổi thưởng transactional | Trừ coin atomic + trao thưởng |
| `LMS-024` | Bảng xếp hạng real-time  | Cập nhật < 50ms               |

### Edge Cases

| Trường hợp          | Xử lý                   |
| ------------------- | ----------------------- |
| Không đủ coin       | Trả lỗi, không trừ coin |
| Redis memory cao    | Xóa keys cũ, alert ops  |
| EXP event trùng lặp | Xử lý idempotent        |

---
