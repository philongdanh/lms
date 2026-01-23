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

| Workflow | Mô tả | Actor | Kết quả |
| -------- | ----- | ----- | ------- |
| Create Tournament | Tạo giải đấu mới | Admin/Teacher | Tournament được tạo |
| Join Competition | User đăng ký tham gia | Student | User join room thi đấu |
| Realtime Scoring | Chấm điểm real-time | System | Leaderboard cập nhật |
| End Round | Kết thúc round thi đấu | System | Kết quả được finalize |

### Rules & Constraints

- Chỉ join được trước khi round bắt đầu
- Điểm = accuracy × speed bonus
- Leaderboard dùng Redis ZSET cho performance
- Latency broadcast < 500ms cho 10k users
- Max 100k concurrent users per event

### State Machine

```d2
direction: right
[*] --> SCHEDULED : create
SCHEDULED --> REGISTRATION : open_registration
REGISTRATION --> IN_PROGRESS : start_time
IN_PROGRESS --> COMPLETED : end_time
COMPLETED --> [*] : archive
```

---

## Data Model

### Schema & Entities

| Entity | Fields chính | Mô tả |
| ------ | ------------ | ----- |
| Tournament | id, name, type, status, start_time, end_time | Thông tin giải đấu |
| Round | id, tournament_id, order, start_time, questions[] | Các round thi đấu |
| Participant | id, tournament_id, user_id, score, rank | Người tham gia |
| MatchResult | id, round_id, user_id, answers[], score, time_ms | Kết quả chi tiết |

### Relations

| Relation | Mô tả |
| -------- | ----- |
| Tournament → Round | 1:N - Giải đấu có nhiều rounds |
| Tournament → Participant | 1:N - Nhiều người tham gia |
| Round → MatchResult | 1:N - Kết quả từng round |
| Tournament → Realtime | Depends - WebSocket gateway |
| Tournament → Gamification | Depends - Trigger rewards |
| Tournament → Content | Depends - Lấy câu hỏi |

---

## API & Integration

### Endpoints

| Method | Endpoint | Mô tả | Auth | Rate Limit |
| ------ | -------- | ----- | ---- | ---------- |
| GET | `/` | Danh sách giải đấu | ✅ | 100/min |
| GET | `/:id` | Chi tiết giải đấu | ✅ | 100/min |
| POST | `/:id/join` | Đăng ký tham gia | ✅ | 20/min |
| GET | `/:id/matches` | Danh sách trận đấu | ✅ | 100/min |
| POST | `/matches/:id/submit` | Nộp câu trả lời | ✅ | 50/min |
| GET | `/:id/leaderboard` | Bảng xếp hạng | ✅ | 100/min |
| POST | `/` | Tạo giải đấu mới | ✅ Admin | 10/min |

### Events & Webhooks

| Event | Trigger | Payload |
| ----- | ------- | ------- |
| `round.started` | Round bắt đầu | `{ tournamentId, roundId }` |
| `round.ended` | Round kết thúc | `{ tournamentId, roundId, results }` |
| `leaderboard.updated` | Điểm thay đổi | `{ tournamentId, top10 }` |
| `tournament.completed` | Giải đấu kết thúc | `{ tournamentId, winners }` |

---

## Acceptance Criteria

### Functional Requirements

| ID | Requirement | Điều kiện |
| -- | ----------- | --------- |
| FR-TOUR-01 | Join trước khi bắt đầu | Status = REGISTRATION |
| FR-TOUR-02 | Điểm chính xác | Khớp công thức tính |
| FR-TOUR-03 | Leaderboard real-time | Update < 500ms |

### Edge Cases

| Case | Xử lý |
| ---- | ----- |
| Join muộn (sau start) | Bị chặn, trả lỗi |
| Disconnect giữa chừng | Auto-reconnect, giữ session |
| Redis failover | Cluster tự động switch |
| 100k concurrent users | Load balance qua rooms |

---
