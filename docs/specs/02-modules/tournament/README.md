---
id: tournament-overview
title: Tournament Overview
sidebar_label: Overview
sidebar_position: 1
---

# Tournament & Competition - Business Logic

Chi tiết đặc tả cho module Tournament & Competition - Business Logic.

---

## Business Context

- **Module**: Tournament & Competition
- **Version**: 1.0
- **Status**: Approved
- **Last Updated**: 2026-01-14

---

## Overview

Module quản lý thi đấu trực tuyến, hỗ trợ: Tournament, Round, Room, và Real-time
Leaderboard.

---

## Use Cases

| Use Case ID | Name                | Description                    | Priority | Status  |
| ----------- | ------------------- | ------------------------------ | -------- | ------- |
| UC-TOUR-001 | Create Tournament   | Tạo cuộc thi mới (Admin)       | P1       | Planned |
| UC-TOUR-002 | Join Round          | Đăng ký tham gia vòng thi      | P0       | Planned |
| UC-TOUR-003 | Compete (Real-time) | Thi real-time qua WebSocket    | P0       | Planned |
| UC-TOUR-004 | View Leaderboard    | Xem bảng xếp hạng vòng thi     | P0       | Planned |
| UC-TOUR-005 | Invite Users        | Mời người chơi qua invite code | P2       | Planned |

### UC-TOUR-003: Compete

**Actor**: Student **Preconditions**: Đã tham gia round và kết nối qua
WebSocket. **Main Flow**:

1. Server gửi câu hỏi.
2. Student trả lời.
3. Server chấm điểm ngay (base score + time bonus).
4. Server cập nhật Real-time leaderboard.
5. Server gửi câu hỏi tiếp theo (nếu có).

---

## Business Rules

| Rule ID     | Name          | Description                         | Condition                | Action                     | Exception |
| ----------- | ------------- | ----------------------------------- | ------------------------ | -------------------------- | --------- |
| BR-TOUR-001 | Time Window   | Chỉ tham gia được trong time window | Now < start OR Now > end | Block Join                 | -         |
| BR-TOUR-002 | Room Capacity | Giới hạn số user mỗi room           | Users >= Max             | Create New Round or Reject | -         |

---

## References

- [Logic](./logic.md)
- [Data Model](./data.md)
- [API](./api.md)
- [Tests](./tests.md)
