---
id: system-design
title: System Design
sidebar_label: Design
sidebar_position: 1
---

# System Design

Thiết kế kiến trúc hệ thống và các thành phần chính.

---

## Architecture

| Khía cạnh     | Mẫu                       | Mô tả                                                   | Ref ID       |
| ------------- | ------------------------- | ------------------------------------------------------- | ------------ |
| Kiến trúc     | Modular Monolith          | Phân module rõ ràng, dễ bảo trì                         | `TC-ARCH-01` |
| Multi-tenancy | Data Isolation            | Mỗi tenant có không gian dữ liệu riêng                  | `TC-ARCH-06` |
| Communication | Event-Driven              | Các module giao tiếp qua events (Redis Pub/Sub)         | `TC-ARCH-03` |
| Realtime      | Socket.IO + Redis Adapter | Redis adapter để mở rộng (scaling)                      | `TC-ARCH-05` |
| Bảo mật       | RBAC                      | Roles động theo tenant và permissions cứng cho hệ thống | `NFR-SEC-01` |

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

### Giao tiếp hệ thống

- **GraphQL**: API chính cho queries/mutations
- **REST**: Webhooks, file uploads
- **Redis Pub/Sub**: Event broadcasting
- **WebSocket**: Socket.IO với cơ chế rooms

### Nguyên tắc thiết kế

- **Single Responsibility**: Mỗi module một phạm vi
- **Dependency Injection**: Dễ dàng testing
- **Data Isolation**: Dữ liệu độc lập
- **Room-based**: Tổ chức theo phòng ảo
- **Soft Delete**: Chỉ áp dụng cho entity chính
