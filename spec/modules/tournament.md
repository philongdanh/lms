---
id: tournament
title: Tournament
sidebar_label: Tournament
sidebar_position: 4
---

# Tournament

Real-time tournament and competition module.

---

## Business Logic

### Main Workflows

| Workflow          | Description           | Actor             | Result                     |
| ----------------- | --------------------- | ----------------- | -------------------------- |
| Create Tournament | Create new tournament | `Admin`/`Teacher` | `Tournament` created       |
| Join Competition  | User registration     | `Student`         | User joins tournament room |
| Realtime Scoring  | Real-time scoring     | `System`          | Leaderboard updated        |
| End Round         | End tournament round  | `System`          | Results finalized          |

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

- Can only join before round starts
- Score = accuracy × speed bonus
- Leaderboard uses Redis ZSET for performance
- Broadcast latency < 500ms for 10k users
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

| Entity        | Main Fields                                                  | Description       |
| ------------- | ------------------------------------------------------------ | ----------------- |
| `Tournament`  | `id`, `name`, `type`, `status`, `start_time`, `end_time`     | Tournament info   |
| `Round`       | `id`, `tournament_id`, `order`, `start_time`, `questions[]`  | Tournament rounds |
| `Participant` | `id`, `tournament_id`, `user_id`, `score`, `rank`            | Participants      |
| `MatchResult` | `id`, `round_id`, `user_id`, `answers[]`, `score`, `time_ms` | Detailed results  |

### Relations

| `Relation`                    | Description                        |
| ----------------------------- | ---------------------------------- |
| `Tournament` → `Round`        | `1:N` - Tournament has many rounds |
| `Tournament` → `Participant`  | `1:N` - Many participants          |
| `Round` → `MatchResult`       | `1:N` - Results per round          |
| `Tournament` → `Realtime`     | Depends - `WebSocket` gateway      |
| `Tournament` → `Gamification` | Depends - Trigger rewards          |
| `Tournament` → `Content`      | Depends - Fetch questions          |

---

## API & Integration

### GraphQL Operations

| Type       | Operation               | Description           | Auth       | Rate Limit |
| ---------- | ----------------------- | --------------------- | ---------- | ---------- |
| `Query`    | `tournaments`           | Tournament list       | ✅         | 100/min    |
| `Query`    | `tournament`            | Tournament details    | ✅         | 100/min    |
| `Mutation` | `joinTournament`        | Join tournament       | ✅         | 20/min     |
| `Query`    | `matches`               | Match list            | ✅         | 100/min    |
| `Mutation` | `submitMatch`           | Submit answer         | ✅         | 50/min     |
| `Query`    | `tournamentLeaderboard` | Leaderboard           | ✅         | 100/min    |
| `Mutation` | `createTournament`      | Create new tournament | ✅ `Admin` | 10/min     |

### Events & Webhooks

| Event                  | Trigger         | Payload                              |
| ---------------------- | --------------- | ------------------------------------ |
| `round.started`        | Round starts    | `{ tournamentId, roundId }`          |
| `round.ended`          | Round ends      | `{ tournamentId, roundId, results }` |
| `leaderboard.updated`  | Score changes   | `{ tournamentId, top10 }`            |
| `tournament.completed` | Tournament ends | `{ tournamentId, winners }`          |

---

## Acceptance Criteria

### Functional Requirements

| ID           | Requirement            | Condition               |
| ------------ | ---------------------- | ----------------------- |
| `FR-TOUR-01` | Join before start only | Status = `REGISTRATION` |
| `FR-TOUR-02` | Accurate scoring       | Matches formula         |
| `FR-TOUR-03` | Real-time leaderboard  | Update < 500ms          |

### Edge Cases

| Case                    | Handling                     |
| ----------------------- | ---------------------------- |
| Join late (after start) | Blocked, return error        |
| Disconnect mid-match    | Auto-reconnect, keep session |
| Redis failover          | Cluster auto-switch          |
| 100k concurrent users   | Load balance via rooms       |

---
