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

### Pattern áp dụng

| Aspect        | Pattern             | Mô tả                                  |
| ------------- | ------------------- | -------------------------------------- |
| Tổng quan     | Modular Monolith    | Module hóa rõ ràng, dễ bảo trì         |
| Multi-tenancy | Data Isolation      | Mỗi tenant có không gian dữ liệu riêng |
| Communication | Event-Driven        | Các module giao tiếp qua event         |
| Realtime      | WebSocket + Pub/Sub | Redis adapter cho scaling              |
| Security      | RBAC                | 5 vai trò với quyền hạn kiểm soát      |

### Diagram tổng quan

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

| Loại     | Pattern       | Mô tả                           |
| -------- | ------------- | ------------------------------- |
| Sync     | GraphQL       | API chính cho queries/mutations |
| Sync     | REST          | Webhooks, file uploads          |
| Async    | Redis Pub/Sub | Event broadcasting              |
| Realtime | WebSocket     | Socket.IO với rooms             |

### Data Flow

**Luồng học tập:**

```d2
shape: sequence_diagram
direction: right

Student -> App: Truy cập Dashboard
App -> Learning: GET /learning/path
Learning -> Cache: Kiểm tra cache
Learning -> AI: Gửi dữ liệu phân tích
AI -> Learning: Đề xuất lộ trình
Learning -> App: Trả về lộ trình
App -> Student: Hiển thị
```

**Luồng thi đấu:**

```d2
shape: sequence_diagram
direction: right

Student -> WS: Kết nối WebSocket
WS -> Tournament: Xác thực
Tournament -> WS: Duyệt kết nối
Student -> WS: Gửi câu trả lời
WS -> Tournament: Xử lý
Tournament -> Redis: Cập nhật leaderboard
Redis -> WS: Broadcast tới room
```

### API Design

| Endpoint          | Method | Mô tả             | Auth     |
| ----------------- | ------ | ----------------- | -------- |
| `/graphql`        | POST   | GraphQL API       | Optional |
| `/api/upload`     | POST   | File upload       | Required |
| `/api/webhooks/*` | POST   | External webhooks | API Key  |
| `/health`         | GET    | Health check      | No       |

### Core Principles

| Category | Principle             | Mô tả                  |
| -------- | --------------------- | ---------------------- |
| Dev      | Single Responsibility | Mỗi module một phạm vi |
| Dev      | Dependency Injection  | Dễ testing             |
| Security | Least Privilege       | Quyền tối thiểu        |
| Security | Tenant Isolation      | Dữ liệu độc lập        |
| Realtime | Room-based            | Tổ chức phòng ảo       |
| Data     | Selective Soft Delete | Chỉ cho entities chính |

---
