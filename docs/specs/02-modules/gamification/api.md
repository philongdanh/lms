---
id: gamification-api
title: Gamification API Endpoints
sidebar_label: API
---

# Gamification & Rewards - API Endpoints

## Overview
API để truy cập thông tin Gamification: Hồ sơ Thành tích, Bảng xếp hạng, và Cửa hàng Phần thưởng.

## Base Information
- **Base URL**: `/api/v1/gamification`
- **Version**: 1.0
- **Authentication**: Bearer Token

## Endpoints Summary
| Method | Endpoint | Mô tả | Auth Required | Rate Limit |
|--------|----------|-------------|---------------|------------|
| GET | `/profile` | Lấy thông tin EXP, Level, Ví | ✅ | 60/min |
| GET | `/leaderboard` | Lấy bảng xếp hạng | ✅ | 60/min |
| GET | `/badges` | Lấy danh sách badge của tôi | ✅ | 60/min |
| GET | `/rewards` | Lấy danh sách phần thưởng trong cửa hàng | ✅ | 60/min |
| POST | `/rewards/redeem` | Đổi phần thưởng | ✅ | 10/min |

## Endpoint Details

### Endpoint: GET `/profile`
**Description**: Lấy hồ sơ gamification của người dùng hiện tại.

#### Request
```http
GET /api/v1/gamification/profile
Authorization: Bearer {token}
```

#### Response
**Success (200 OK)**:
```json
{
  "data": {
    "exp": 1250,
    "level": 5,
    "next_level_exp": 1500,
    "coins": 300,
    "badges_count": 3
  }
}
```

### Endpoint: GET `/leaderboard`
**Description**: Lấy bảng xếp hạng người dùng theo tuần/tháng/toàn thời gian.

#### Request
```http
GET /api/v1/gamification/leaderboard?period=weekly&limit=10
Authorization: Bearer {token}
```

#### Response
**Success (200 OK)**:
```json
{
  "data": [
    {
      "rank": 1,
      "user_id": "uuid",
      "name": "Nguyen Van A",
      "avatar": "url",
      "exp": 5000
    },
    {
      "rank": 2,
      ...
    }
  ]
}
```

### Endpoint: POST `/rewards/redeem`
**Description**: Thực hiện đổi phần thưởng.

#### Request
```http
POST /api/v1/gamification/rewards/redeem
Authorization: Bearer {token}

{
  "reward_id": "uuid",
  "quantity": 1
}
```

#### Response
**Success (200 OK)**:
```json
{
  "status": "success",
  "data": {
    "order_id": "uuid",
    "status": "PENDING",
    "remaining_coins": 200,
    "message": "Đổi thưởng thành công, vui lòng chờ phê duyệt."
  }
}
```

## Error Responses
| Code | Error | Mô tả |
|------|-------|-------------|
| 400 | `GAME_INSUFFICIENT_COINS` | Số dư xu không đủ |
| 400 | `GAME_OUT_OF_STOCK` | Phần thưởng đã hết hàng |
| 409 | `GAME_CONCURRENT_TRANSACTION` | Lỗi xử lý giao dịch đồng thời |

## Performance Requirements
- **Leaderboard**: Phản hồi < 50ms (từ Redis).
- **Redeem**: Giao dịch < 500ms.

## Security Requirements
- [ ] Xác thực tồn kho và số dư một cách atomic.
- [ ] Chống gian lận: Giới hạn tốc độ đổi thưởng (ví dụ: tối đa 5 món/ngày).

---

## Validation Checklist
- [ ] Đã xác minh đồng bộ Redis cho Bảng xếp hạng.
- [ ] Đã kiểm tra tính toàn vẹn giao dịch dưới tải.
