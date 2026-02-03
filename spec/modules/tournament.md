---
id: tournament
title: Tournament
sidebar_label: Tournament
sidebar_position: 6
---

# Tournament

Module **Tournament** tổ chức giải đấu và thi đấu real-time.

---

## Business Logic

### Tạo Giải đấu

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

### Tham gia thi đấu

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

### Tính điểm Realtime

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

### Kết thúc vòng đấu

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

### Quy tắc & Ràng buộc

- Chỉ có thể tham gia trước khi round bắt đầu
- Điểm = độ chính xác × bonus tốc độ
- Bảng xếp hạng dùng Redis `ZSET` để đảm bảo hiệu suất
- Độ trễ broadcast < 500ms cho 10k users
- Tối đa 100k concurrent users mỗi sự kiện

### Tournament Lifecycle

Vòng đời giải đấu từ tạo đến hoàn thành.

```d2
direction: right

DRAFT: {
  style.fill: "#e5e7eb"
}
REGISTRATION: {
  style.fill: "#dbeafe"
}
IN_PROGRESS: {
  style.fill: "#fef3c7"
}
COMPLETED: {
  style.fill: "#d1fae5"
}
CANCELLED: {
  style.fill: "#fee2e2"
  style.stroke-dash: 3
}

DRAFT -> REGISTRATION: open_registration()
REGISTRATION -> IN_PROGRESS: start_tournament()
REGISTRATION -> CANCELLED: cancel()
IN_PROGRESS -> COMPLETED: end_tournament()
IN_PROGRESS -> CANCELLED: force_cancel()
```

**Triggers:**

- `DRAFT` → `REGISTRATION`: Scheduler mở đăng ký theo cấu hình
- `REGISTRATION` → `IN_PROGRESS`: Bắt đầu theo lịch
- `IN_PROGRESS` → `COMPLETED`: Hết thời gian + finalize kết quả
- Any → `CANCELLED`: Admin hủy giải

---

## API & Integration

### Sự kiện & Webhooks

| Sự kiện                | Kích hoạt         | Payload                              |
| ---------------------- | ----------------- | ------------------------------------ |
| `round.started`        | Round bắt đầu     | `{ tournamentId, roundId }`          |
| `round.ended`          | Round kết thúc    | `{ tournamentId, roundId, results }` |
| `leaderboard.updated`  | Điểm thay đổi     | `{ tournamentId, top10 }`            |
| `tournament.completed` | Giải đấu kết thúc | `{ tournamentId, winners }`          |

---

## Acceptance Criteria

### Yêu cầu chức năng

| ID       | Yêu cầu                        | Điều kiện                 |
| -------- | ------------------------------ | ------------------------- |
| `US-017` | Chỉ tham gia trước khi bắt đầu | `Status` = `REGISTRATION` |
| `US-018` | Tính điểm chính xác            | Khớp với công thức        |
| `US-019` | Bảng xếp hạng real-time        | Cập nhật < 500ms          |

### Các Edge Cases

| Trường hợp                    | Xử lý                          |
| ----------------------------- | ------------------------------ |
| Tham gia muộn (sau khi start) | Chặn, lỗi                      |
| Mất kết nối giữa trận         | Tự động reconnect, giữ session |
| Redis failover                | Cluster tự động chuyển đổi     |
| 100k concurrent users         | Load balance qua rooms         |

---
