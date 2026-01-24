---
id: system-design
title: System Design
sidebar_label: System Design
sidebar_position: 1
---

# System Design

System architecture design and main components.

---

## Architecture Style

### Applied Patterns

| Aspect        | Pattern               | Description                            |
| ------------- | --------------------- | -------------------------------------- |
| Overview      | Modular Monolith      | Clear modularization, easy maintenance |
| Multi-tenancy | Data Isolation        | Each tenant has separate data space    |
| Communication | Event-Driven          | Modules communicate via events         |
| Realtime      | `WebSocket` + Pub/Sub | Redis adapter for scaling              |
| Security      | RBAC                  | 5 roles with controlled permissions    |

### Overview Diagram

```d2
direction: right

Web: Web Application
App: Application

Auth: Auth & RBAC Module
Tournament: Tournament Module
OtherModules: ... other modules

WSGateway: WebSocket Gateway
Realtime: Real-time Service
MsgQueue: Message Queue

Data Layer: {
  DB: Database {
    shape: cylinder
  }
  Redis: Redis Cache & Pub/Sub {
    shape: cylinder
  }
  Storage: File Storage
}

Web -> App
Web -> WSGateway: {style.stroke-dash: 5}

App -> Auth
App -> Tournament
App -> OtherModules

Auth -> Data Layer.DB
Tournament -> Data Layer.DB
OtherModules -> Data Layer.DB

Tournament -> Realtime
WSGateway -> Realtime
Realtime -> MsgQueue
MsgQueue -> Data Layer.Redis

App -> Data Layer.Redis
```

---

## Components

### System Communication

| Type     | Pattern       | Description                       |
| -------- | ------------- | --------------------------------- |
| Sync     | `GraphQL`     | Primary API for queries/mutations |
| Sync     | `REST`        | Webhooks, file uploads            |
| Async    | Redis Pub/Sub | Event broadcasting                |
| Realtime | `WebSocket`   | Socket.IO with rooms              |

### Data Flow

**Learning Flow:**

```d2
shape: sequence_diagram
direction: right

Student -> App: Access Dashboard
App -> Learning: query learningPath
Learning -> Cache: Check cache
Learning -> AI: Send analytics data
AI -> Learning: Recommend path
Learning -> App: Return learning path
App -> Student: Display
```

**Tournament Flow:**

```d2
shape: sequence_diagram
direction: right

Student -> WS: Connect WebSocket
WS -> Tournament: Authenticate
Tournament -> WS: Approve connection
Student -> WS: Submit answer
WS -> Tournament: Process
Tournament -> Redis: Update leaderboard
Redis -> WS: Broadcast to room
```

### API Design

| Endpoint          | Method | Description       | Auth     |
| ----------------- | ------ | ----------------- | -------- |
| `/graphql`        | `POST` | `GraphQL` API     | Optional |
| `/api/upload`     | `POST` | File upload       | Required |
| `/api/webhooks/*` | `POST` | External webhooks | API Key  |
| `/health`         | `GET`  | Health check      | No       |

### Core Principles

| Category | Principle             | Description               |
| -------- | --------------------- | ------------------------- |
| Dev      | Single Responsibility | Each module one scope     |
| Dev      | Dependency Injection  | Easy testing              |
| Security | Least Privilege       | Minimum permissions       |
| Security | Tenant Isolation      | Independent data          |
| Realtime | Room-based            | Virtual room organization |
| Data     | Selective Soft Delete | Only for main entities    |

---
