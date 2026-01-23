---
id: realtime
title: Realtime
sidebar_label: Realtime
sidebar_position: 8
---

# Realtime

Real-time communication module via `WebSocket`.

---

## Business Logic

### Main Workflows

| Workflow            | Description             | Actor  | Result                    |
| ------------------- | ----------------------- | ------ | ------------------------- |
| `WebSocket` Handshake | Client connects with JWT | Client | Connection established    |
| Broadcast Event     | Send message to room    | `System` | Clients receive message   |
| `Presence` Tracking | Track online/offline    | `System` | `Presence` store updated  |
| `Room` Management   | Join/leave rooms        | Client | `Room` membership updated |

#### Detailed Flows

##### WebSocket Handshake

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

##### Broadcast Event

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

##### Presence Tracking

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

##### Room Management

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

### Rules & Constraints

- JWT required for connection
- Redis Pub/Sub adapter for multi-node
- Max 10k connections per node
- Handshake time < 100ms
- Message delivery < 50ms P50

### Lifecycle Sequence

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

### Schema & Entities

| Entity         | Main Fields                                  | Description            |
| -------------- | --------------------------------------------- | ---------------------- |
| `Notification` | `id`, `user_id`, `type`, `content`, `read_at` | Notification           |
| `Presence`     | `user_id`, `socket_id`, `last_seen`           | Online status          |
| `Room`         | `room_id`, `type`, `members[]`                | Chat/competition room  |

### Relations

| `Relation`              | Description                        |
| ----------------------- | ---------------------------------- |
| `User` → `Notification` | `1:N` - User has many notifications |
| `User` → `Presence`     | `1:1` - Each user has online status |
| `Realtime` ← `Auth`     | Depends - JWT authentication       |
| `Realtime` → Redis      | Uses - Pub/Sub, `Presence` store   |

---

## API & Integration

### GraphQL Operations

| Type       | Operation              | Description         | Auth | Rate Limit |
| ---------- | ---------------------- | ------------------- | ---- | ---------- |
| `Query`    | `notifications`        | Notification list   | ✅   | 100/min    |
| `Mutation` | `markNotificationRead` | Mark as read        | ✅   | 200/min    |
| `Mutation` | `deleteNotification`   | Delete notification | ✅   | 100/min    |

### WebSocket

- Endpoint: `/ws`
- Auth: JWT in Query Param or Header

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

| ID         | Requirement                | Condition                |
| ---------- | -------------------------- | ------------------------ |
| `FR-RT-01` | Connect with valid token   | Valid JWT                |
| `FR-RT-02` | Broadcast works            | Redis adapter configured |
| `FR-RT-03` | 10k concurrent connections | Load test passed         |

### Edge Cases

| Case                        | Handling                            |
| --------------------------- | ----------------------------------- |
| Token expires when connected| Force disconnect, require reconnect |
| Redis failover              | Auto-reconnect to new master        |
| `Room` full                 | Reject join with error              |
| Network hiccup              | Auto-reconnect with backoff         |

---
