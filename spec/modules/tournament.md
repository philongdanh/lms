---
id: tournament
title: Tournament
sidebar_label: Tournament
sidebar_position: 4
---

# Tournament

Module tổ chức giải đấu và thi đấu real-time.

---

## Business Logic

### Workflow chính

| Workflow          | Mô tả                  | Actor         | Kết quả                |
| ----------------- | ---------------------- | ------------- | ---------------------- |
| Create Tournament | Tạo giải đấu mới       | Admin/Teacher | `Tournament` được tạo  |
| Join Competition  | User đăng ký tham gia  | Student       | User join room thi đấu |
| Realtime Scoring  | Chấm điểm real-time    | System        | Leaderboard cập nhật   |
| End Round         | Kết thúc round thi đấu | System        | Kết quả được finalize  |

#### Detailed Flows

##### Create Tournament

```d2
shape: sequence_diagram
Admin
"Tournament Service"
Database
Redis

Admin -> "Tournament Service": create(config)
"Tournament Service" -> Database: insert_tournament
"Tournament Service" -> Database: create_rounds
"Tournament Service" -> Redis: init_leaderboard
"Tournament Service" -> Admin: tournament_id
```

##### Join Competition

```d2
shape: sequence_diagram
Student
"Tournament Service"
Redis
Database

Student -> "Tournament Service": join(tournamentId)
"Tournament Service" -> Redis: check_status(REGISTRATION)
Redis -> "Tournament Service": OPEN
"Tournament Service" -> Database: check_eligibility
Database -> "Tournament Service": ok
"Tournament Service" -> Database: create_participant
"Tournament Service" -> Redis: pub(user.joined)
"Tournament Service" -> Student: success
```

##### Realtime Scoring

```d2
shape: sequence_diagram
Student
"Tournament Service"
"Scoring Engine"
Redis
Database
"Realtime Service"
Students

Student -> "Tournament Service": submit_answer(q_id, ans)
"Tournament Service" -> "Scoring Engine": calculate(ans, time)
"Scoring Engine" -> "Tournament Service": score
"Tournament Service" -> Redis: zadd_leaderboard(score)
"Tournament Service" -> Database: save_match_result
"Tournament Service" -> "Realtime Service": broadcast(leaderboard_update)
"Realtime Service" -> Students: updated_scores
```

##### End Round

```d2
shape: sequence_diagram
Scheduler
"Tournament Service"
Redis
Database
"Realtime Service"
Gamification

Scheduler -> "Tournament Service": end_round_trigger
"Tournament Service" -> Redis: lock_submissions
"Tournament Service" -> Database: finalize_scores
"Tournament Service" -> Database: advance_qualifiers
"Tournament Service" -> "Realtime Service": broadcast(round_ended)
"Tournament Service" -> Gamification: award_points
```

### Rules & Constraints

- Chỉ join được trước khi round bắt đầu
- Điểm = accuracy × speed bonus
- Leaderboard dùng Redis ZSET cho performance
- Latency broadcast < 500ms cho 10k users
- Max 100k concurrent users per event

### Lifecycle Sequence

```d2
shape: sequence_diagram
Admin
"Tournament Service"
Database
"Event Bus"
Scheduler
Student
Realtime
Gamification

Admin -> "Tournament Service": create_tournament()
"Tournament Service" -> Database: insert(status=SCHEDULED)
"Tournament Service" -> Admin: tournament_id

Scheduler -> "Tournament Service": trigger_open_registration()
"Tournament Service" -> Database: update(status=REGISTRATION)
"Tournament Service" -> "Event Bus": publish(registration.opened)

Student -> "Tournament Service": join_tournament()
"Tournament Service" -> Database: create_participant()

Scheduler -> "Tournament Service": check_start_time()
"Tournament Service" -> Database: update(status=IN_PROGRESS)
"Tournament Service" -> Realtime: broadcast(tournament.started)

Student -> "Tournament Service": submit_answer()
"Tournament Service" -> Realtime: update_leaderboard()

Scheduler -> "Tournament Service": check_end_time()
"Tournament Service" -> Database: update(status=COMPLETED)
"Tournament Service" -> Database: finalize_results()
"Tournament Service" -> Gamification: award_winners()
```

---

## Data Model

### Schema & Entities

| Entity        | Fields chính                                                 | Mô tả              |
| ------------- | ------------------------------------------------------------ | ------------------ |
| `Tournament`  | `id`, `name`, `type`, `status`, `start_time`, `end_time`     | Thông tin giải đấu |
| `Round`       | `id`, `tournament_id`, `order`, `start_time`, `questions[]`  | Các round thi đấu  |
| `Participant` | `id`, `tournament_id`, `user_id`, `score`, `rank`            | Người tham gia     |
| `MatchResult` | `id`, `round_id`, `user_id`, `answers[]`, `score`, `time_ms` | Kết quả chi tiết   |

### Relations

| `Relation`                   | Mô tả                            |
| ---------------------------- | -------------------------------- |
| `Tournament` → `Round`       | `1:N` - Giải đấu có nhiều rounds |
| `Tournament` → `Participant` | `1:N` - Nhiều người tham gia     |
| `Round` → `MatchResult`      | `1:N` - Kết quả từng round       |
| `Tournament` → Realtime      | Depends - `WebSocket` gateway    |
| `Tournament` → Gamification  | Depends - Trigger rewards        |
| `Tournament` → Content       | Depends - Lấy câu hỏi            |

---

## API & Integration

### GraphQL Operations

| Type       | Operation               | Mô tả              | Auth       | Rate Limit |
| ---------- | ----------------------- | ------------------ | ---------- | ---------- |
| `Query`    | `tournaments`           | Danh sách giải đấu | ✅         | 100/min    |
| `Query`    | `tournament`            | Chi tiết giải đấu  | ✅         | 100/min    |
| `Mutation` | `joinTournament`        | Đăng ký tham gia   | ✅         | 20/min     |
| `Query`    | `matches`               | Danh sách trận đấu | ✅         | 100/min    |
| `Mutation` | `submitMatch`           | Nộp câu trả lời    | ✅         | 50/min     |
| `Query`    | `tournamentLeaderboard` | Bảng xếp hạng      | ✅         | 100/min    |
| `Mutation` | `createTournament`      | Tạo giải đấu mới   | ✅ `Admin` | 10/min     |

### Events & Webhooks

| Event                  | Trigger           | Payload                              |
| ---------------------- | ----------------- | ------------------------------------ |
| `round.started`        | `Round` bắt đầu   | `{ tournamentId, roundId }`          |
| `round.ended`          | `Round` kết thúc  | `{ tournamentId, roundId, results }` |
| `leaderboard.updated`  | Điểm thay đổi     | `{ tournamentId, top10 }`            |
| `tournament.completed` | Giải đấu kết thúc | `{ tournamentId, winners }`          |

---

## Acceptance Criteria

### Functional Requirements

| ID           | Requirement            | Điều kiện               |
| ------------ | ---------------------- | ----------------------- |
| `FR-TOUR-01` | Join trước khi bắt đầu | Status = `REGISTRATION` |
| `FR-TOUR-02` | Điểm chính xác         | Khớp công thức tính     |
| `FR-TOUR-03` | Leaderboard real-time  | Update < 500ms          |

### Edge Cases

| Case                  | Xử lý                       |
| --------------------- | --------------------------- |
| Join muộn (sau start) | Bị chặn, trả lỗi            |
| Disconnect giữa chừng | Auto-reconnect, giữ session |
| Redis failover        | Cluster tự động switch      |
| 100k concurrent users | Load balance qua rooms      |

---
