---
id: tournament-api
title: Tournament API Endpoints
sidebar_label: API
---

# Tournament API Endpoints

## Overview
Tài liệu HTTP API và WebSocket events cho Competition.

## Base Information
- **Base URL**: `/api/v1/tournaments`
- **Version**: 1.0
- **Authentication**: Bearer Token

## Endpoints Summary
| Method | Endpoint | Mô tả | Auth Required | Rate Limit |
|--------|----------|-------------|---------------|-----------|
| GET | `/` | Danh sách cuộc thi | ✅ | 60/min |
| GET | `/{id}` | Chi tiết cuộc thi | ✅ | 60/min |
| POST | `/rounds/{id}/join` | Đăng ký tham gia round | ✅ | 10/min |
| GET | `/rounds/{id}/leaderboard` | Lấy leaderboard (Snapshot) | ✅ | 120/min |

## Endpoint Details

### Endpoint: POST `/rounds/{id}/join`
**Description**: Đăng ký tham gia vòng thi. Nếu thành công, Client sẽ nhận thông tin để kết nối qua WebSocket.

#### Request
```http
POST /api/v1/tournaments/rounds/{id}/join
Authorization: Bearer {token}

{
  "invite_code": "VIP123" // Optional
}
```

#### Response
**Success (200 OK)**:
```json
{
  "data": {
    "participant_id": "uuid",
    "room_id": "uuid",
    "socket_namespace": "/tournament",
    "status": "WAITING"
  }
}
```

## WebSocket Protocol

### Client -> Server Events
| Event | Payload | Mô tả |
|-------|---------|-------------|
| `room:join` | `{room_id}` | Tham gia room thi đấu |
| `answer:submit` | `{question_id, answer_index, time_ms}` | Gửi câu trả lời |

### Server -> Client Events
| Event | Payload | Mô tả |
|-------|---------|-------------|
| `question:next` | `{id, content, time_limit}` | Câu hỏi mới |
| `leaderboard:update` | `[{user, score, rank}]` | Cập nhật leaderboard |
| `round:end` | `{my_rank, total_score}` | Round kết thúc |

## Error Responses
| Code | HTTP | Mô tả |
|------|------|-------------|
| `TOUR_FULL` | 400 | Room thi đấu đã đầy |
| `TOUR_CLOSED` | 403 | Ngoài khung thời gian thi đấu |

## Performance Requirements
- **Join API**: < 200ms (Validation + Phân phối Room).
- **WS Latency**: < 50ms (Mạng nội bộ).

## Security Requirements
- [ ] Xác thực invite code nghiêm ngặt.
- [ ] Bắt buộc một kết nối cho mỗi user ID.

---

## Validation Checklist
- [ ] Độ ổn định kết nối WS dưới tải cao
