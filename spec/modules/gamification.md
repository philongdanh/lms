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

### Schema & Entities

```d2
direction: right

UserProfile: {
  shape: sql_table
  user_id: string {constraint: primary_key}
  exp: int
  level: int
  coins: int
  current_level_exp: int
  next_level_exp: int
  updated_at: timestamp
}

Badge: {
  shape: sql_table
  id: string {constraint: primary_key}
  name: string
  criteria: json
  icon_url: string
  description: string
  code: string {constraint: unique}
}

UserBadge: {
  shape: sql_table
  id: string {constraint: primary_key}
  user_id: string {constraint: foreign_key}
  badge_id: string {constraint: foreign_key}
  awarded_at: timestamp
}

Reward: {
  shape: sql_table
  id: string {constraint: primary_key}
  name: string
  cost: int
  type: enum
  is_active: boolean
}

RewardRedemption: {
  shape: sql_table
  id: string {constraint: primary_key}
  user_id: string {constraint: foreign_key}
  reward_id: string {constraint: foreign_key}
  status: enum
  redeemed_at: timestamp
}

Streak: {
  shape: sql_table
  user_id: string {constraint: primary_key}
  current_streak: int
  longest_streak: int
  last_active: date
}

User -> UserProfile: 1:1
User -> UserBadge: 1:N
Badge -> UserBadge: 1:N
User -> RewardRedemption: 1:N
Reward -> RewardRedemption: 1:N
User -> Streak: 1:1
```

---

## API & Integration

### GraphQL Operations

> **SSoT**: [schema.graphql](../interface/graphql/gamification/schema.graphql) |
> [operations.graphql](../interface/graphql/gamification/operations.graphql)

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

| Event            | Trigger            | Payload                        |
| ---------------- | ------------------ | ------------------------------ |
| `level.up`       | User tăng cấp      | `{ userId, newLevel, reward }` |
| `badge.earned`   | User nhận huy hiệu | `{ userId, badgeId }`          |
| `streak.updated` | Streak thay đổi    | `{ userId, currentStreak }`    |

---

## Acceptance Criteria

### Functional Requirements

| ID           | Yêu cầu                  | Điều kiện                     |
| ------------ | ------------------------ | ----------------------------- |
| `FR-GAME-01` | Tăng cấp chính xác       | EXP vượt ngưỡng               |
| `FR-GAME-02` | Đổi thưởng transactional | Trừ coin atomic + trao thưởng |
| `FR-GAME-03` | Bảng xếp hạng real-time  | Cập nhật < 50ms               |

### Edge Cases

| Case                | Xử lý                   |
| ------------------- | ----------------------- |
| Không đủ coin       | Trả lỗi, không trừ coin |
| Redis memory cao    | Xóa keys cũ, alert ops  |
| EXP event trùng lặp | Xử lý idempotent        |

---
