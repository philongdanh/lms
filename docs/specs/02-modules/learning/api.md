---
id: learning-api
title: Learning API Endpoints
sidebar_label: API
---

# Learning & Personalization - API Endpoints

## Overview
Các API endpoints cho module Learning, cung cấp truy cập vào lộ trình học tập cá nhân hóa, theo dõi tiến độ và tính năng luyện tập.

## Base Information
- **Base URL**: `/api/v1/learning`
- **Version**: 1.0
- **Format**: JSON
- **Authentication**: Bearer Token

## Endpoints Summary
| Method | Endpoint | Description | Auth Required | Rate Limit |
|--------|----------|-------------|---------------|------------|
| GET | `/path` | Lấy lộ trình học tập cá nhân hóa | ✅ | 60/min |
| GET | `/knowledge-map` | Lấy bản đồ kiến thức | ✅ | 60/min |
| GET | `/lessons/{id}` | Lấy chi tiết bài học và tiến độ | ✅ | 100/min |
| POST | `/progress` | Cập nhật tiến độ học tập (video, content) | ✅ | 100/min |
| POST | `/practice/start` | Bắt đầu phiên bài tập/quiz | ✅ | 20/min |
| POST | `/practice/submit` | Nộp câu trả lời bài tập | ✅ | 100/min |

## Endpoint Details

### Endpoint: GET `/path`
**Description**: Lấy danh sách bài học được đề xuất dựa trên AI và lịch sử học tập.

#### Request
```http
GET /api/v1/learning/path?subject_id={uuid}
Authorization: Bearer {token}
```

**Query Parameters**:
| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------||
| subject_id | UUID | ❌ | Lọc theo môn học | `123e4567-e89b...` |

#### Response
**Success (200 OK)**:
```json
{
  "status": "success",
  "data": {
    "current_level": {
      "grade": "Grade 5",
      "overall_mastery": 72
    },
    "recommended_topics": [
      {
        "id": "uuid",
        "name": "Fractions",
        "subject": "Math",
        "reason": "Weakness needs improvement",
        "mastery_level": 45,
        "estimated_time": 30
      }
    ],
    "daily_goal": {
      "lessons_target": 3,
      "lessons_completed": 1,
      "streak_days": 5
    }
  }
}
```

### Endpoint: GET `/lessons/{id}`
**Description**: Lấy thông tin chi tiết bài học, bao gồm danh sách video/quiz và trạng thái hoàn thành của user.

#### Request
```http
GET /api/v1/learning/lessons/{id}
Authorization: Bearer {token}
```

#### Response
**Success (200 OK)**:
```json
{
  "status": "success",
  "data": {
    "id": "uuid",
    "title": "Addition within 10",
    "my_progress": {
        "completion_percent": 60,
        "status": "IN_PROGRESS",
        "last_accessed_at": "2024-01-15T10:30:00Z"
    },
    "contents": [
      {
        "id": "uuid",
        "type": "VIDEO",
        "title": "Lecture video",
        "duration": 600,
        "is_completed": true
      }
    ]
  }
}
```

### Endpoint: POST `/progress`
**Description**: Cập nhật tiến độ học tập cho một content item (video hoặc kiểm tra bài học).

#### Request
```http
POST /api/v1/learning/progress
Authorization: Bearer {token}

{
  "lesson_id": "uuid",
  "content_id": "uuid",
  "progress_percent": 100,
  "time_spent_seconds": 450,
  "status": "COMPLETED"
}
```

#### Response
**Success (200 OK)**:
```json
{
  "status": "success",
  "data": {
    "updated": true,
    "lesson_completed": true,
    "rewards_earned": {
        "exp": 50
    }
  }
}
```

### Endpoint: POST `/practice/submit`
**Description**: Nộp câu trả lời cho một câu hỏi trong phiên luyện tập.

#### Request
```http
POST /api/v1/learning/practice/submit
Authorization: Bearer {token}

{
  "session_id": "uuid",
  "question_id": "uuid",
  "answer": "B",
  "time_taken_ms": 5200
}
```

#### Response
**Success (200 OK)**:
```json
{
  "status": "success",
  "data": {
    "is_correct": true,
    "correct_answer": "B",
    "explanation": "1 plus 1 equals 2",
    "points_earned": 10
  }
}
```

## Error Responses
| Code | Error | Description |
|------|-------|-------------|
| 404 | `LEARN_LESSON_NOT_FOUND` | Bài học không tồn tại |
| 403 | `LEARN_CONTENT_LOCKED` | Nội dung bị khóa (điều kiện tiên quyết chưa đạt) |
| 400 | `LEARN_PREREQUISITE_MISSING` | Bài học tiên quyết chưa hoàn thành |
| 400 | `LEARN_SESSION_EXPIRED` | Phiên làm bài đã hết hạn |
| 429 | `RATE_LIMITED` | Gửi requests quá nhanh (anti-spam) |

## Performance Requirements
- **Thời gian phản hồi**: API `/practice/submit` phải < 200ms P95 để đảm bảo trải nghiệm real-time.
- **Availability**: 99.9%

## Security Requirements
- [ ] Yêu cầu Authentication (Bearer Token)
- [ ] Input validation (progress range 0-100, valid UUIDs)
- [ ] Rate limiting trên submit answer endpoint

---

## Validation Checklist
- [ ] Tất cả endpoints được document
- [ ] Các ví dụ request/response được cung cấp
- [ ] Các error codes được định nghĩa
