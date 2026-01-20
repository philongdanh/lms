---
id: analytics-api
title: Analytics API Endpoints
sidebar_label: API
---

# Analytics & Reporting - API Endpoints

## Overview
API để truy xuất báo cáo và thông tin Analytics.

## Base Information
- **Base URL**: `/api/v1/analytics`
- **Version**: 1.0
- **Authentication**: Bearer Token

## Endpoints Summary
| Method | Endpoint | Description | Auth Required | Rate Limit |
|--------|----------|-------------|---------------|------------|
| GET | `/knowledge-map/{student_id}` | Lấy bản đồ kiến thức | ✅ | 60/min |
| GET | `/reports/learning` | Lấy báo cáo cá nhân | ✅ | 30/min |
| GET | `/reports/class/{class_id}` | Lấy báo cáo lớp (Giáo viên) | ✅ | 20/min |
| GET | `/admin/overview` | Lấy tổng quan hệ thống (Admin) | ✅ | 10/min |

## Endpoint Details

### Endpoint: GET `/knowledge-map/{student_id}`
**Description**: Lấy dữ liệu thành thạo của học sinh theo chủ đề.

#### Request
```http
GET /api/v1/analytics/knowledge-map/{student_id}
Authorization: Bearer {token}
```

#### Response
**Success (200 OK)**:
```json
{
  "data": {
    "student_id": "uuid",
    "overall_mastery": 0.75,
    "topics": [
      {
        "id": "uuid",
        "name": "Algebra",
        "mastery": 0.8,
        "status": "MASTERED"
      }
    ]
  }
}
```

### Endpoint: GET `/reports/learning`
**Description**: Lấy báo cáo hoạt động học tập theo khoảng thời gian.

#### Request
```http
GET /api/v1/analytics/reports/learning?from=2024-01-01&to=2024-01-31
Authorization: Bearer {token}
```

#### Response
**Success (200 OK)**:
```json
{
  "data": {
    "total_time_seconds": 36000,
    "completed_lessons": 10,
    "daily_activity": [
      { "date": "2024-01-01", "time": 1200, "lessons": 1 }
    ]
  }
}
```

## Error Responses
| Code | Error | Description |
|------|-------|-------------|
| 403 | `ANALYTICS_ACCESS_DENIED` | Không có quyền xem báo cáo của người dùng này |
| 400 | `ANALYTICS_INVALID_RANGE` | Khoảng thời gian quá lớn (> 90 ngày) |

## Performance Requirements
- **Report Generation**: < 500ms cho báo cáo cá nhân, < 2s cho báo cáo lớp.
- **Cache Hit Rate**: > 80% cho các yêu cầu trùng lặp.

## Security Requirements
- [ ] Kiểm tra quyền sở hữu tài nguyên (Phụ huynh xem con, Học sinh xem bản thân).


## Validation Checklist
- [ ] Độ phủ kiểm thử kiểm soát truy cập

## References

- [Overview](./overview.md)
