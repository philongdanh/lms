# Realtime Module Specification

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

config: themeVariables: fontFamily: "EB Garamond" config: themeVariables:
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

---

# Realtime - API Endpoints

Các giao diện kết nối thời gian thực và thông báo trực tiếp.

## Endpoints Summary

| Method | Endpoint                  | Description          | Auth Required | Rate Limit |
| ------ | ------------------------- | -------------------- | ------------- | ---------- |
| GET    | `/notifications`          | Danh sách thông báo  | ✅            | 100/min    |
| PUT    | `/notifications/:id/read` | Đánh dấu đã đọc      | ✅            | 200/min    |
| DELETE | `/notifications/:id`      | Xóa thông báo        | ✅            | 100/min    |
| WS     | `/ws`                     | WebSocket connection | ✅            | -          |

## WebSocket Events

| Event              | Direction     | Description       |
| ------------------ | ------------- | ----------------- |
| `notification.new` | Server→Client | Thông báo mới     |
| `progress.updated` | Server→Client | Cập nhật tiến độ  |
| `tournament.start` | Server→Client | Giải đấu bắt đầu  |
| `match.update`     | Server→Client | Cập nhật trận đấu |

---

# Realtime - Data Model

Cấu trúc dữ liệu cho trạng thái kết nối và thông báo.

config: themeVariables: fontFamily: "EB Garamond"

## References

-
-
-

---

# Real-time Communication - Test Cases

Kịch bản kiểm thử hệ thống giao tiếp thời gian thực.

## Test Categories

### 1. Kiểm thử chức năng

#### Business Logic

| Test ID       | Description             | Rules     | Expected Result | Priority |
| ------------- | ----------------------- | --------- | --------------- | -------- |
| TC-RT-FUN-001 | Kết nối với Token       | BR-RT-001 | Thành công      | P0       |
| TC-RT-FUN-002 | Kết nối không Token     | BR-RT-001 | Thất bại 401    | P0       |
| TC-RT-FUN-003 | Giới hạn tham gia phòng | BR-RT-003 | Từ chối nếu đầy | P1       |

### 2. Kiểm thử tích hợp

| Test ID       | Description   | Components     | Result               |
| ------------- | ------------- | -------------- | -------------------- |
| TC-RT-INT-001 | Gửi broadcast | API, Redis, WS | Client nhận được msg |

### 3. Kiểm thử hiệu năng

| Test ID        | Scenario    | Load       | Result    |
| -------------- | ----------- | ---------- | --------- |
| TC-RT-PERF-001 | 10k kết nối | Ramp up 1m | Không lỗi |

# Performance Requirements

## Performance Targets

### Thời gian phản hồi

| Operation         | P50  | P95   | P99   | Max   | Cách đo      |
| ----------------- | ---- | ----- | ----- | ----- | ------------ |
| Connect Handshake | 50ms | 100ms | 300ms | 1s    | Xử lý Server |
| Message Delivery  | 20ms | 50ms  | 100ms | 500ms | End-to-end   |
| Presence Query    | 5ms  | 10ms  | 20ms  | 50ms  | Redis Read   |

### Yêu cầu thông lượng

| Scenario                | Requests/sec    | Concurrent Users | Data Volume |
| ----------------------- | --------------- | ---------------- | ----------- |
| Broadcast (Competition) | 10,000 msgs/sec | 50,000           | 1MB/sec     |

## Resource Utilization Limits

| Resource        | Warning Threshold | Critical Threshold | Required Action |
| --------------- | ----------------- | ------------------ | --------------- |
| Open Files (FD) | 100,000           | 500,000            | Tăng ulimit     |

## Validation Checklist

- ✅ Tinh chỉnh Kernel cho đồng thời cao (sysctl)

---
