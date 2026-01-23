---
id: realtime
title: Realtime
sidebar_label: Realtime
sidebar_position: 8
---

# Realtime

Module giao tiếp real-time qua WebSocket.

---

## Business Logic

### Workflow chính

| Workflow            | Mô tả                   | Actor  | Kết quả                 |
| ------------------- | ----------------------- | ------ | ----------------------- |
| WebSocket Handshake | Client kết nối với JWT  | Client | Connection established  |
| Broadcast Event     | Gửi message tới room    | System | Clients nhận message    |
| Presence Tracking   | Theo dõi online/offline | System | Presence store updated  |
| Room Management     | Join/leave rooms        | Client | Room membership updated |

### Rules & Constraints

- JWT required cho connection
- Redis Pub/Sub adapter cho multi-node
- Max 10k connections per node
- Handshake time < 100ms
- Message delivery < 50ms P50

### State Machine

```d2
direction: right

Start: {
  shape: circle
  style.fill: black
  label: ""
  width: 20
  height: 20
}

End: {
  shape: circle
  style.fill: black
  label: ""
  width: 20
  height: 20
}

Start -> CONNECTING: connect
CONNECTING -> AUTHENTICATED: jwt_valid
CONNECTING -> REJECTED: jwt_invalid
AUTHENTICATED -> CONNECTED: handshake_complete
CONNECTED -> DISCONNECTED: disconnect
DISCONNECTED -> End
```

---

## Data Model

### Schema & Entities

| Entity       | Fields chính                                  | Mô tả                  |
| ------------ | --------------------------------------------- | ---------------------- |
| Notification | `id`, `user_id`, `type`, `content`, `read_at` | Thông báo              |
| Presence     | `user_id`, `socket_id`, `last_seen`           | Trạng thái online      |
| Room         | `room_id`, `type`, `members[]`                | Phòng chat/competition |

### Relations

| Relation            | Mô tả                                 |
| ------------------- | ------------------------------------- |
| User → Notification | `1:N` - User có nhiều notifications   |
| User → Presence     | `1:1` - Mỗi user có trạng thái online |
| Realtime ← Auth     | Depends - Xác thực JWT                |
| Realtime → Redis    | Uses - `Pub/Sub`, Presence store      |

---

## API & Integration

### Endpoints

| Method   | Endpoint                  | Mô tả                | Auth | Rate Limit |
| -------- | ------------------------- | -------------------- | ---- | ---------- |
| `GET`    | `/notifications`          | Danh sách thông báo  | ✅   | 100/min    |
| `PUT`    | `/notifications/:id/read` | Đánh dấu đã đọc      | ✅   | 200/min    |
| `DELETE` | `/notifications/:id`      | Xóa thông báo        | ✅   | 100/min    |
| `WS`     | `/ws`                     | WebSocket connection | ✅   | -          |

### Events & Webhooks

| Event               | Direction     | Payload                |
| ------------------- | ------------- | ---------------------- |
| `notification.new`  | Server→Client | `{ type, content }`    |
| `progress.updated`  | Server→Client | `{ lessonId, status }` |
| `tournament.start`  | Server→Client | `{ tournamentId }`     |
| `match.update`      | Server→Client | `{ matchId, scores }`  |
| `socket.connect`    | Internal      | `{ userId, socketId }` |
| `socket.disconnect` | Internal      | `{ userId, reason }`   |

---

## Acceptance Criteria

### Functional Requirements

| ID       | Requirement                | Điều kiện                |
| -------- | -------------------------- | ------------------------ |
| FR-RT-01 | Connect với valid token    | `JWT` hợp lệ             |
| FR-RT-02 | Broadcast hoạt động        | Redis adapter configured |
| FR-RT-03 | 10k concurrent connections | Load test passed         |

### Edge Cases

| Case                        | Xử lý                               |
| --------------------------- | ----------------------------------- |
| Token hết hạn khi connected | Force disconnect, require reconnect |
| Redis failover              | Auto-reconnect to new master        |
| Room đầy                    | Reject join với error               |
| Network hiccup              | Auto-reconnect với backoff          |

---
