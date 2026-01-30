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

| Khía cạnh     | Mẫu                       | Mô tả                                                   | SSoT                                                   |
| ------------- | ------------------------- | ------------------------------------------------------- | ------------------------------------------------------ |
| Kiến trúc     | Modular Monolith          | Phân module rõ ràng, dễ bảo trì                         | [`TC-ARCH-01`](../product/constraints.md#architecture) |
| Multi-tenancy | Data Isolation            | Mỗi tenant có không gian dữ liệu riêng                  | [`TC-ARCH-06`](../product/constraints.md#architecture) |
| Communication | Event-Driven              | Các module giao tiếp qua events (Redis Pub/Sub)         | [`TC-ARCH-03`](../product/constraints.md#architecture) |
| Realtime      | Socket.IO + Redis Adapter | Redis adapter để mở rộng (scaling)                      | [`TC-ARCH-05`](../product/constraints.md#architecture) |
| Bảo mật       | RBAC                      | Roles động theo tenant và permissions cứng cho hệ thống | [`NFR-SEC-01`](../product/constraints.md#security)     |

```d2
direction: right
# SSoT: TC-ARCH-01 (Modular Monolith) | TC-ARCH-06 (Data Isolation)

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
  SeaweedFS: SeaweedFS Storage {
    shape: cylinder
  }
}

Web -> App
Web -> WSGateway: {style.stroke-dash: 5}
Web -> Data Layer.SeaweedFS: Presigned URL Upload {style.stroke-dash: 5}

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
App -> Data Layer.SeaweedFS: Generate Presigned URL
```

---

## Components

### Giao tiếp hệ thống

- **GraphQL**: API chính cho queries/mutations
- **Redis Pub/Sub**: Event broadcasting
- **WebSocket**: Socket.IO với cơ chế rooms
- **Presigned URL**: Upload file trực tiếp lên Storage

### Nguyên tắc thiết kế

- **Single Responsibility**: Mỗi module một phạm vi
- **Dependency Injection**: Dễ dàng testing
- **Data Isolation**: Dữ liệu độc lập
- **Room-based**: Tổ chức theo phòng ảo
- **Soft Delete**: Chỉ áp dụng cho entity chính
