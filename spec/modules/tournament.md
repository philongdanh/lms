---
id: tournament
title: Tournament
sidebar_label: Tournament
sidebar_position: 4
---

# Tournament

Module giải đấu và thi đấu real-time.

---

## Business Logic

### Create Tournament

Tạo giải đấu mới với cấu hình rounds và thời gian.

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

### Join Competition

Đăng ký tham gia giải đấu trước khi bắt đầu.

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

### Realtime Scoring

Tính điểm real-time và cập nhật bảng xếp hạng.

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

### End Round

Kết thúc round và phân loại thí sinh đi tiếp.

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

- Chỉ có thể tham gia trước khi round bắt đầu
- Điểm = độ chính xác × bonus tốc độ
- Bảng xếp hạng dùng `Redis` `ZSET` để đảm bảo hiệu suất
- Độ trễ broadcast < 500ms cho 10k users
- Tối đa 100k concurrent users mỗi sự kiện

### Lifecycle Sequence

Vòng đời giải đấu từ tạo đến hoàn thành.

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

```d2
direction: right

Tournament: {
  shape: sql_table
  id: string {constraint: primary_key}
  tenant_id: string {constraint: foreign_key}
  name: string
  status: enum
  max_participants: int
  starts_at: timestamp
  ends_at: timestamp
  created_by: string
  created_at: timestamp
}

CompetitionRound: {
  shape: sql_table
  id: string {constraint: primary_key}
  tournament_id: string {constraint: foreign_key}
  round_number: int
  starts_at: timestamp
  ends_at: timestamp
  questions: json
}

Participant: {
  shape: sql_table
  id: string {constraint: primary_key}
  round_id: string {constraint: foreign_key}
  user_id: string {constraint: foreign_key}
  score: int
  rank: int
  finished_at: timestamp
  joined_at: timestamp
}

Tournament -> CompetitionRound: 1:N
CompetitionRound -> Participant: 1:N
```

---

## API & Integration

### GraphQL Operations

> **SSoT**: [schema.graphql](../interface/graphql/tournament/schema.graphql) |
> [operations.graphql](../interface/graphql/tournament/operations.graphql)

```graphql
type Query {
  """
  Danh sách giải đấu
  """
  tournaments(status: TournamentStatus): [Tournament!]!
    @auth
    @rateLimit(limit: 100, window: "1m")

  """
  Chi tiết giải đấu
  """
  tournament(id: ID!): Tournament! @auth @rateLimit(limit: 100, window: "1m")

  """
  Danh sách trận đấu
  """
  matches(tournamentId: ID!): [Match!]!
    @auth
    @rateLimit(limit: 100, window: "1m")

  """
  Bảng xếp hạng
  """
  tournamentLeaderboard(tournamentId: ID!, limit: Int): [LeaderboardEntry!]!
    @auth
    @rateLimit(limit: 100, window: "1m")
}

type Mutation {
  """
  Tham gia giải đấu
  """
  joinTournament(tournamentId: ID!): Participant!
    @auth
    @rateLimit(limit: 20, window: "1m")

  """
  Nộp câu trả lời
  """
  submitMatch(input: SubmitMatchInput!): MatchResult!
    @auth
    @rateLimit(limit: 50, window: "1m")

  """
  Tạo giải đấu mới (Admin)
  """
  createTournament(input: CreateTournamentInput!): Tournament!
    @auth(role: ADMIN)
    @rateLimit(limit: 10, window: "1m")
}

input SubmitMatchInput {
  roundId: ID!
  questionId: ID!
  answer: String!
}

type LeaderboardEntry {
  userId: ID!
  username: String!
  score: Int!
  rank: Int!
}
```

### Events & Webhooks

| Event                  | Trigger           | Payload                              |
| ---------------------- | ----------------- | ------------------------------------ |
| `round.started`        | Round bắt đầu     | `{ tournamentId, roundId }`          |
| `round.ended`          | Round kết thúc    | `{ tournamentId, roundId, results }` |
| `leaderboard.updated`  | Điểm thay đổi     | `{ tournamentId, top10 }`            |
| `tournament.completed` | Giải đấu kết thúc | `{ tournamentId, winners }`          |

---

## Acceptance Criteria

### Functional Requirements

| ID           | Yêu cầu                        | Điều kiện               |
| ------------ | ------------------------------ | ----------------------- |
| `FR-TOUR-01` | Chỉ tham gia trước khi bắt đầu | Status = `REGISTRATION` |
| `FR-TOUR-02` | Tính điểm chính xác            | Khớp với công thức      |
| `FR-TOUR-03` | Bảng xếp hạng real-time        | Cập nhật < 500ms        |

### Edge Cases

| Case                          | Xử lý                          |
| ----------------------------- | ------------------------------ |
| Tham gia muộn (sau khi start) | Chặn, trả về lỗi               |
| Mất kết nối giữa trận         | Tự động reconnect, giữ session |
| `Redis` failover              | Cluster tự động chuyển đổi     |
| 100k concurrent users         | Load balance qua rooms         |

---
