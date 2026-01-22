---
id: logic
title: Business Logic
sidebar_label: Logic
sidebar_position: 20
---

# Real-time Communication - Business Logic
 
Quy tắc nghiệp vụ xử lý giao tiếp thời gian thực.


## Dependencies

### Phụ thuộc nội bộ

- ✅ Auth Module - Xác thực JWT.
- ✅ Redis - Pub/Sub Adapter & Presence Store.

### Phụ thuộc bên ngoài

- ❌ Không có - Self-hosted Socket.IO cluster.


## Validation Criteria

- ✅ Kết nối thành công với JWT hợp lệ.
- ✅ Tính năng Broadcast hoạt động trên nhiều server nodes (Redis Adapter).
- ✅ Xử lý 10k kết nối đồng thời.


# Workflows


## Workflow Summary

| Workflow ID | Workflow Name       | Trigger           | Actors         | Status |
| ----------- | ------------------- | ----------------- | -------------- | ------ |
| WF-RT-001   | WebSocket Handshake | Client kết nối    | Client, Server | Active |
| WF-RT-002   | Broadcast Event     | Internal API Call | System, Redis  | Active |

config:
  themeVariables:
    fontFamily: "EB Garamond"
config:
  themeVariables:
    fontFamily: "EB Garamond"

## Events

### Sự kiện hệ thống

| Event Name          | Description           | Payload                | Emitted By |
| ------------------- | --------------------- | ---------------------- | ---------- |
| `socket.connect`    | Người dùng mới online | `{user_id, socket_id}` | WS Server  |
| `socket.disconnect` | Người dùng offline    | `{user_id, reason}`    | WS Server  |


## Performance Requirements

- **Handshake Time**: < 100ms.


## Validation Checklist

- ✅ Kiểm tra Redis Failover

