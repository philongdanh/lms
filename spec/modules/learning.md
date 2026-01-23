---
id: learning
title: Learning
sidebar_label: Learning
sidebar_position: 3
---

# Learning

Module học tập và cá nhân hóa lộ trình dựa trên AI.

---

## Business Logic

### Workflow chính

| Workflow | Mô tả | Actor | Kết quả |
| -------- | ----- | ----- | ------- |
| Submit Exercise | Nộp câu trả lời bài tập | Student | Chấm điểm, cập nhật tiến độ |
| Generate Learning Path | Tạo lộ trình học thích ứng | System | Danh sách bài học được đề xuất |
| Complete Lesson | Hoàn thành bài học | Student | Tiến độ cập nhật, rewards gửi |
| Track Progress | Theo dõi tiến độ học tập | Student/Parent | Dashboard hiển thị |

### Rules & Constraints

- ✅ Điểm tối thiểu để pass: configurable per lesson (default 70%)
- ✅ Anti-cheat: kiểm tra thời gian làm bài hợp lý
- ✅ Chỉ trigger rewards nếu là lần hoàn thành đầu tiên
- ✅ Session timeout: 30 phút không hoạt động
- ✅ Rate limiting theo user

### State Machine

```d2
direction: right
LOCKED --> AVAILABLE : prerequisite_met
AVAILABLE --> IN_PROGRESS : started
IN_PROGRESS --> COMPLETED : score >= threshold
IN_PROGRESS --> IN_PROGRESS : score < threshold
COMPLETED --> REVIEW : re_learning
```

---

## Data Model

### Schema & Entities

| Entity | Fields chính | Mô tả |
| ------ | ------------ | ----- |
| LearningPath | id, user_id, subject_id, lessons[] | Lộ trình học của user |
| LessonProgress | id, user_id, lesson_id, status, score | Tiến độ từng bài |
| ExerciseSession | id, user_id, lesson_id, started_at, answers[] | Session làm bài |
| SubmissionHistory | id, session_id, question_id, answer, is_correct | Lịch sử trả lời |

### Relations

| Relation | Mô tả |
| -------- | ----- |
| User → LearningPath | 1:N - User có nhiều learning paths |
| User → LessonProgress | 1:N - Tiến độ từng bài |
| LessonProgress → ExerciseSession | 1:N - Nhiều lần làm bài |
| Learning → Content | Depends - Lấy nội dung từ Content module |
| Learning → Analytics | Depends - Gửi dữ liệu cho Knowledge Map |
| Learning → Gamification | Depends - Trigger rewards |

---

## API & Integration

### Endpoints

| Method | Endpoint | Mô tả | Auth | Rate Limit |
| ------ | -------- | ----- | ---- | ---------- |
| GET | `/progress` | Tiến độ tổng quan | ✅ | 200/min |
| GET | `/lessons/:id/content` | Nội dung bài học | ✅ | 200/min |
| POST | `/lessons/:id/complete` | Đánh dấu hoàn thành | ✅ | 100/min |
| GET | `/lessons/:id/exercise` | Lấy bài tập | ✅ | 100/min |
| POST | `/exercises/:id/submit` | Nộp câu trả lời | ✅ | 100/min |
| GET | `/recommendations` | Gợi ý bài học tiếp theo | ✅ | 50/min |

### Events & Webhooks

| Event | Trigger | Payload |
| ----- | ------- | ------- |
| `lesson.completed` | Hoàn thành bài học | `{ userId, lessonId, score }` |
| `exercise.submitted` | Nộp bài tập | `{ userId, exerciseId, results }` |
| `path.updated` | Lộ trình được cập nhật | `{ userId, pathId, lessons }` |

---

## Acceptance Criteria

### Functional Requirements

| ID | Requirement | Điều kiện |
| -- | ----------- | --------- |
| FR-LEARN-01 | Personalized path generation | Dựa trên lịch sử và điểm yếu |
| FR-LEARN-02 | Chấm điểm chính xác | Trả về is_correct đúng |
| FR-LEARN-03 | Progress tracking real-time | Cập nhật ngay sau submit |

### Edge Cases

| Case | Xử lý |
| ---- | ----- |
| AI Model timeout (> 2s) | Trả về Default Path theo Curriculum |
| DB Write fail | Trả lỗi cho client, retry client-side |
| Session hết hạn | Trả lỗi 400, yêu cầu tạo session mới |
| IDOR attempt | Trả về 403 Forbidden |

---
