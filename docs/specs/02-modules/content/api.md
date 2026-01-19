---
id: content-api
title: Content API Endpoints
sidebar_label: API
---

# Content & Question Bank - API Endpoints

## Overview
API quản lý nội dung: Subjects, Grades, Topics, Lessons, Content, Question Banks.

## Base Information
- **Base URL**: `/api/v1/content`
- **Version**: 1.0
- **Authentication**: Bearer Token (Teacher/Admin cho Write, Student cho Read)

## Endpoints Summary
| Method | Endpoint | Description | Auth Required | Rate Limit |
|--------|----------|-------------|---------------|-----------|
| GET | `/structure` | Lấy cây cấu trúc chương trình học | ✅ | 100/min |
| POST | `/topics` | Tạo Topic mới | ✅ | 20/min |
| POST | `/lessons` | Tạo Lesson mới | ✅ | 20/min |
| POST | `/lessons/{id}/contents` | Upload/Thêm nội dung vào bài học | ✅ | 20/min |
| POST | `/questions` | Tạo câu hỏi (đơn lẻ) | ✅ | 50/min |
| POST | `/import` | Import hàng loạt câu hỏi từ file | ✅ | 5/min |

## Endpoint Details

### Endpoint: GET `/structure`
**Description**: Lấy toàn bộ hoặc một phần cây cấu trúc nội dung (Subject -> Grade -> Topic).

#### Request
```http
GET /api/v1/content/structure?subject_id={uuid}&grade_id={uuid}
Authorization: Bearer {token}
```

#### Response
**Success (200 OK)**:
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Toán",
      "grades": [
        {
          "id": "uuid",
          "name": "Lớp 1",
          "topics": [
            { "id": "uuid", "name": "Số tự nhiên", "order": 1 }
          ]
        }
      ]
    }
  ]
}
```

### Endpoint: POST `/import`
**Description**: Upload file Excel/Word để import hàng loạt câu hỏi.

#### Request
```http
POST /api/v1/content/import
Authorization: Bearer {token}
Content-Type: multipart/form-data

file: (binary)
bank_id: uuid
```

#### Response
**Success (200 OK)**:
```json
{
  "status": "success",
  "data": {
    "total_rows": 50,
    "success_count": 48,
    "error_count": 2,
    "report_url": "https://storage.../report.xlsx"
  }
}
```

### Endpoint: POST `/questions`
**Description**: Tạo câu hỏi mới trong ngân hàng câu hỏi.

#### Request
```http
POST /api/v1/content/questions
Authorization: Bearer {token}

{
  "bank_id": "uuid",
  "type": "MULTIPLE_CHOICE",
  "content": "1 + 1 = ?",
  "options": [
    { "id": "A", "text": "1", "is_correct": false },
    { "id": "B", "text": "2", "is_correct": true }
  ],
  "difficulty": "EASY",
  "points": 10
}
```

#### Response
**Success (201 Created)**:
```json
{
  "data": { "id": "uuid" }
}
```

## Error Responses
| Code | Error | Description |
|------|-------|-------------|
| 404 | `CONTENT_TOPIC_NOT_FOUND` | Topic/Lesson cha không tồn tại |
| 400 | `CONTENT_INVALID_FILE` | File import sai định dạng hoặc quá lớn |
| 400 | `CONTENT_PARSE_ERROR` | Lỗi cú pháp khi parse nội dung câu hỏi |

## Performance Requirements
- **Import Speed**: Xử lý file import 100 câu hỏi < 5s.
- **Tree Load**: API `/structure` response < 100ms (cached).

## Security Requirements
- [ ] Teacher chỉ có thể chỉnh sửa nội dung mình tạo (hoặc Shared Bank).
- [ ] Admin có thể chỉnh sửa mọi thứ.
- [ ] Student chỉ có thể đọc nội dung Active.

---

## Validation Checklist
- [ ] RBAC (Role Based Access Control) đã được xác minh
- [ ] Logic validation import đã được test với các edge cases (bad formatting)
