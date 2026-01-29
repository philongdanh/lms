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

### WebSocket Handshake

Client kết nối với JWT authentication.

```d2
shape: sequence_diagram
Client
"Realtime Service"
"Auth Service"
Redis

Client -> "Realtime Service": connect(jwt_token)
"Realtime Service" -> "Auth Service": validate_token(jwt)
"Auth Service" -> "Realtime Service": valid
"Realtime Service" -> Redis: store_socket_mapping(user_id, socket_id)
"Realtime Service" -> Client: connected
```

### Sự kiện Broadcast

Gửi message đến room/channel.

```d2
shape: sequence_diagram
"Internal System"
"Realtime Service"
Redis
"Realtime Service Nodes"
Clients

"Internal System" -> "Realtime Service": publish(channel, message)
"Realtime Service" -> Redis: publish_to_channel
Redis -> "Realtime Service Nodes": distribute_message
"Realtime Service Nodes" -> Clients: push_message
```

### Theo dõi Presence

Theo dõi trạng thái online/offline.

```d2
shape: sequence_diagram
Client
"Realtime Service"
Redis
Scheduler
"Event Bus"

Client -> "Realtime Service": heartbeat
"Realtime Service" -> Redis: update_presence_ttl(user_id)

Scheduler -> "Realtime Service": check_offline_users
"Realtime Service" -> Redis: get_expired_presence
"Realtime Service" -> "Event Bus": publish(user.offline)
```

### Quản lý phòng (Room Management)

Quản lý tham gia/rời khỏi room.

```d2
shape: sequence_diagram
Client
"Realtime Service"
Redis
"Other Clients"

Client -> "Realtime Service": join_room(room_id)
"Realtime Service" -> Redis: sadd_room_members(room_id, user_id)
"Realtime Service" -> Redis: publish(room_user_joined)
"Realtime Service" -> "Other Clients": notify_join
```

### Quy tắc & Ràng buộc

- JWT bắt buộc để kết nối
- Redis Pub/Sub adapter cho multi-node
- Tối đa 10k connections mỗi node
- Thời gian handshake < 100ms
- Message delivery < 50ms P50

### Lifecycle Sequence

Vòng đời kết nối WebSocket.

```d2
shape: sequence_diagram
Client
"Realtime Service"
"Auth Service"
Redis

Client -> "Realtime Service": connect()
"Realtime Service" -> "Realtime Service": transition(CONNECTING)

"Realtime Service" -> "Auth Service": validate_jwt(token)
"Auth Service" -> "Realtime Service": valid
"Realtime Service" -> "Realtime Service": transition(AUTHENTICATED)

"Auth Service" -> "Realtime Service": invalid_token
"Realtime Service" -> Client: reject(REJECTED)

"Realtime Service" -> Redis: register_socket()
"Realtime Service" -> Client: handshake_complete(CONNECTED)

Client -> "Realtime Service": disconnect()
"Realtime Service" -> Redis: cleanup_socket()
"Realtime Service" -> "Realtime Service": transition(DISCONNECTED)
```

---

## Data Model

> **SSoT**: [Database Blueprint](../../blueprint/architecture/database.md)

---

## API & Integration

### Các thao tác GraphQL

> **SSoT**: [schema.graphql](../api/graphql/realtime/schema.graphql) |
> [operations.graphql](../api/graphql/realtime/operations.graphql)

```graphql
type Query {
  """
  Danh sách thông báo
  """
  notifications(unreadOnly: Boolean): [Notification!]!
    @auth
    @rateLimit(limit: 100, window: "1m")
}

type Mutation {
  """
  Đánh dấu đã đọc
  """
  markNotificationRead(id: ID!): Notification!
    @auth
    @rateLimit(limit: 200, window: "1m")

  """
  Xóa thông báo
  """
  deleteNotification(id: ID!): Boolean!
    @auth
    @rateLimit(limit: 100, window: "1m")
}

type Notification {
  id: ID!
  type: NotificationType!
  content: JSON!
  readAt: DateTime
  createdAt: DateTime!
}

enum NotificationType {
  LESSON_COMPLETE
  BADGE_EARNED
  TOURNAMENT_START
  SYSTEM
}
```

### Các sự kiện WebSocket

```
Endpoint: /ws
Auth: JWT trong Query Param hoặc Header

# Server → Client
notification.new    { type, content }
progress.updated    { lessonId, status }
tournament.start    { tournamentId }
match.update        { matchId, scores }

# Internal Events
socket.connect      { userId, socketId }
socket.disconnect   { userId, reason }
```

### Sự kiện & Webhooks

| Sự kiện            | Chiều         | Payload                |
| ------------------ | ------------- | ---------------------- |
| `notification.new` | Server→Client | `{ type, content }`    |
| `progress.updated` | Server→Client | `{ lessonId, status }` |
| `tournament.start` | Server→Client | `{ tournamentId }`     |
| `match.update`     | Server→Client | `{ matchId, scores }`  |

---

## Acceptance Criteria

### Yêu cầu chức năng

| ID         | Yêu cầu                    | Điều kiện                 |
| ---------- | -------------------------- | ------------------------- |
| `FR-RT-01` | Kết nối với token hợp lệ   | JWT valid                 |
| `FR-RT-02` | Broadcast hoạt động        | Redis adapter đã cấu hình |
| `FR-RT-03` | 10k concurrent connections | Load test passed          |

### Các Edge Cases

| Trường hợp                     | Xử lý                               |
| ------------------------------ | ----------------------------------- |
| Token hết hạn khi đang kết nối | Force disconnect, yêu cầu reconnect |
| Redis failover                 | Tự động reconnect đến master mới    |
| Room đầy                       | Từ chối join với lỗi                |
| Network hiccup                 | Auto-reconnect với backoff          |
