---
id: gamification-overview
title: Gamification Overview
sidebar_label: Overview
---

# Gamification & Rewards - Business Logic

## Business Context
- **Module**: Gamification & Rewards
- **Version**: 1.0
- **Status**: Approved
- **Last Updated**: 2026-01-14

## Overview
Module quản lý hệ thống phần thưởng, bao gồm Điểm Kinh nghiệm (EXP), Cấp độ, Badge, và Cửa hàng Phần thưởng để tăng cường sự gắn kết của người dùng.

## Use Cases
| Use Case ID | Use Case Name | Mô tả | Độ ưu tiên | Trạng thái |
|------------|--------------|-------|----------|--------|
| UC-GAME-001 | Earn EXP & Coins | Nhận điểm/xu khi hoàn thành nhiệm vụ | P0 | Planned |
| UC-GAME-002 | Level Up | Tăng cấp độ khi tích lũy đủ EXP | P0 | Planned |
| UC-GAME-003 | View Leaderboard | Xem bảng xếp hạng thi đua | P1 | Planned |
| UC-GAME-004 | Browse Reward Store | Xem danh sách phần thưởng có sẵn | P1 | Planned |
| UC-GAME-005 | Redeem Reward | Đổi điểm/xu lấy phần thưởng | P0 | Planned |
| UC-GAME-006 | Receive Badge | Nhận huy hiệu khi đạt các cột mốc | P1 | Planned |

### UC-GAME-005: Redeem Reward
**Actor**: Học viên
**Preconditions**: Có đủ số dư Coins.
**Main Flow**:
1. Học viên chọn một phần thưởng trong Cửa hàng.
2. Hệ thống kiểm tra số dư.
3. Hệ thống trừ Coins.
4. Hệ thống tạo yêu cầu đổi thưởng (nếu là vật lý) hoặc cấp phần thưởng ngay (nếu là ảo).
5. Hệ thống gửi thông báo thành công.

## Business Rules
| Rule ID | Rule Name | Mô tả | Điều kiện | Hành động | Ngoại lệ |
|---------|----------|-------|------------|---------|------------|
| BR-GAME-001 | Level Formula | Công thức tính Level | EXP tích lũy | Level = $100 \times N^{1.5}$ | - |
