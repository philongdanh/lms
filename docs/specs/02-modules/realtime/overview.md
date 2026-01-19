---
id: realtime-overview
title: Realtime Overview
sidebar_label: Overview
---

# Real-time Communication - Business Logic

## Business Context
- **Module**: Real-time Communication
- **Version**: 1.0
- **Status**: Approved
- **Last Updated**: 2026-01-14

## Overview
Module này cung cấp hạ tầng WebSocket để hỗ trợ các tính năng tương tác thời gian thực như: Thông báo, Chat, Trạng thái Online (Presence), và Cập nhật Tournament trực tiếp.

## Use Cases
| Use Case ID | Use Case Name | Description | Priority | Status |
|------------|--------------|-------|----------|--------|
| UC-RT-001 | Establish Connection | Kết nối WebSocket và xác thực | P0 | Planned |
| UC-RT-002 | Join Room | Tham gia kênh/phòng chat | P0 | Planned |
| UC-RT-003 | Track Presence | Theo dõi trạng thái Online/Offline | P1 | Planned |
| UC-RT-004 | Broadcast Event | Gửi sự kiện đến nhiều người dùng | P0 | Planned |
| UC-RT-005 | Receive Notification | Nhận thông báo hệ thống | P1 | Planned |

### UC-RT-001: Establish Connection
**Actor**: Web/Mobile Client
**Preconditions**: Có Access Token hợp lệ.
**Main Flow**:
1. Client mở kết nối Socket đến Server.
2. Server xác thực Token.
3. Nếu hợp lệ, Server chấp nhận kết nối và lưu session.
4. Client nhận sự kiện `connect_success`.

## Business Rules
| Rule ID | Rule Name | Description | Condition | Action | Exception |
|---------|----------|-------|------------|---------|------------|
| BR-RT-001 | Auth Required | Tất cả kết nối phải có Token | Handshake không có token hợp lệ | Ngắt kết nối (401) | - |
| BR-RT-002 | Sticky Session | Hỗ trợ HTTP polling fallback | Client kết nối lại | Định tuyến đến cùng node (Load Balancer level) | - |
| BR-RT-003 | Room Limits | Giới hạn người dùng trong phòng | Users > MaxRoomSize | Từ chối tham gia | - |
