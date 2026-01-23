---
id: gamification
title: Gamification
sidebar_label: Gamification
sidebar_position: 7
---

# Gamification

Gamification module managing rewards, points, and leaderboards.

---

## Business Logic

### Main Workflows

| Workflow            | Description            | Actor   | Result                           |
| ------------------- | ---------------------- | ------- | -------------------------------- |
| Process EXP         | Process EXP gain event | `System`| User gains EXP, may level up     |
| Award `Badge`       | Award badge to user    | `System`| `Badge` awarded                  |
| `Reward` Redemption | Redeem coins for reward| `Student`| Coins deducted, reward granted  |
| Update Leaderboard  | Update leaderboard     | `System`| Realtime leaderboard             |

#### Detailed Flows

##### Process EXP

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

##### Award Badge

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

##### Reward Redemption

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

##### Update Leaderboard

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

- Level formula: EXP thresholds configurable
- Atomic transactions: no coin deduction without reward
- Leaderboard uses Redis Sorted Sets
- Only trigger EXP if first-time completion
- Async processing: queue lag < 1s

### State Machine

N/A - Gamification events are transactional, no persistent state machine.

---

## Data Model

### Schema & Entities

| Entity             | Main Fields                                  | Description            |
| ------------------ | --------------------------------------------- | ----------------------- |
| `UserProfile`      | `user_id`, `exp`, `level`, `coins`            | User game info          |
| `Badge`            | `id`, `name`, `criteria`, `icon`              | Badge definition        |
| `UserBadge`        | `user_id`, `badge_id`, `earned_at`            | Earned `Badge`          |
| `Reward`           | `id`, `name`, `cost`, `type`                  | Redeemable reward       |
| `RewardRedemption` | `id`, `user_id`, `reward_id`, `status`        | Redemption history      |
| `Streak`           | `user_id`, `current_streak`, `longest_streak` | Consecutive days streak |

### Relations

| `Relation`                  | Description                        |
| --------------------------- | ----------------------------------- |
| `User` → `UserProfile`      | `1:1` - Each user has 1 profile     |
| `User` → `UserBadge`        | `1:N` - User has many badges        |
| `Gamification` ← `Learning`   | Consumes - Receives completion events |
| `Gamification` ← `Tournament` | Consumes - Receives win/loss events |

---

## API & Integration

### GraphQL Operations

| Type       | Operation      | Description       | Auth | Rate Limit |
| ---------- | -------------- | ----------------- | ---- | ---------- |
| `Query`    | `userProfile`  | EXP/Level info    | ✅   | 200/min    |
| `Query`    | `badges`       | Badge list        | ✅   | 100/min    |
| `Query`    | `leaderboard`  | Leaderboard       | ✅   | 100/min    |
| `Query`    | `rewards`      | Reward list       | ✅   | 100/min    |
| `Mutation` | `redeemReward` | Redeem reward     | ✅   | 20/min     |
| `Query`    | `streaks`      | Streak info       | ✅   | 200/min    |

### Events & Webhooks

| Event            | Trigger          | Payload                        |
| ---------------- | ---------------- | ------------------------------ |
| `level.up`       | User levels up   | `{ userId, newLevel, reward }` |
| `badge.earned`   | User earns badge | `{ userId, badgeId }`          |
| `streak.updated` | `Streak` changes | `{ userId, currentStreak }`    |

---

## Acceptance Criteria

### Functional Requirements

| ID           | Requirement          | Condition                   |
| ------------ | -------------------- | --------------------------- |
| `FR-GAME-01` | Accurate level up    | EXP exceeds threshold       |
| `FR-GAME-02` | Transactional redeem | Atomic coin deduct + reward |
| `FR-GAME-03` | Realtime leaderboard | Update < 50ms               |

### Edge Cases

| Case                | Handling                   |
| ------------------- | -------------------------- |
| Insufficient coins  | Return error, no deduction |
| High Redis memory   | Delete old keys, alert ops |
| Duplicate EXP event | Idempotent processing      |

---
