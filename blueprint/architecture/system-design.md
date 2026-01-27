---
id: system-design
title: System Design
sidebar_label: System Design
sidebar_position: 1
---

# System Design

Thiết kế kiến trúc hệ thống và các thành phần chính.

---

## Architecture Style

### Applied Patterns

| Aspect        | Pattern               | Description                            |
| ------------- | --------------------- | -------------------------------------- |
| Overview      | Modular Monolith      | Phân module rõ ràng, dễ bảo trì        |
| Multi-tenancy | Data Isolation        | Mỗi tenant có không gian dữ liệu riêng |
| Communication | Event-Driven          | Các module giao tiếp qua events        |
| Realtime      | `WebSocket` + Pub/Sub | Redis adapter để scaling               |
| Security      | RBAC                  | 5 roles với phân quyền chặt chẽ        |

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

| Type     | Pattern       | Description                     |
| -------- | ------------- | ------------------------------- |
| Sync     | `GraphQL`     | API chính cho queries/mutations |
| Sync     | `REST`        | Webhooks, file uploads          |
| Async    | Redis Pub/Sub | Event broadcasting              |
| Realtime | `WebSocket`   | Socket.IO với cơ chế rooms      |

**See detailed flows:**

- Learning Flow:
  [Learning Module Spec](../../spec/modules/learning.md#business-logic)
- Tournament Flow:
  [Tournament Module Spec](../../spec/modules/tournament.md#business-logic)

See [API Gateway Spec](../../spec/interface/gateway.md) for endpoint design.

### Core Principles

| Category | Principle             | Description                  |
| -------- | --------------------- | ---------------------------- |
| Dev      | Single Responsibility | Mỗi module một phạm vi       |
| Dev      | Dependency Injection  | Dễ dàng testing              |
| Security | Least Privilege       | Quyền hạn tối thiểu          |
| Security | Tenant Isolation      | Dữ liệu độc lập              |
| Realtime | Room-based            | Tổ chức theo phòng ảo        |
| Data     | Selective Soft Delete | Chỉ áp dụng cho entity chính |

---
