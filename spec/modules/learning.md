---
id: learning
title: Learning
sidebar_label: Learning
sidebar_position: 4
---

# Learning

Module **Học tập** là trái tim của hệ thống LMS, tập trung vào việc **cá nhân
hóa trải nghiệm học tập** thông qua AI và tạo động lực bền vững cho học sinh.

> **SSoT**: [Backlog](../../blueprint/product/plan.md) |
> [Database](../../blueprint/architecture/database.md) | [Content](content.md)

---

## Business Logic

### Submit Exercise

Nộp bài tập và nhận kết quả chấm điểm tự động.

```d2
shape: sequence_diagram
Student
"Learning Service"
Database
"Grading Engine"
"Event Bus"

Student -> "Learning Service": submit_answers(session_id, answers)
"Learning Service" -> Database: get_correct_answers
"Learning Service" -> "Grading Engine": calculate_score
"Grading Engine" -> "Learning Service": score, result
"Learning Service" -> Database: save_submission
"Learning Service" -> "Learning Service": check_pass_condition
"Learning Service" -> "Event Bus": publish(exercise.submitted)
"Learning Service" -> Student: result_feedback
```

### Adaptive Path

Tạo lộ trình học tập thích ứng dựa trên lịch sử và điểm yếu.

```d2
shape: sequence_diagram
System
"AI Service"
Database
"AI Model"

System -> "AI Service": generate_path(user_profile)
"AI Service" -> Database: fetch_history_and_gaps
Database -> "AI Service": user_data
"AI Service" -> "AI Model": predict_next_modules
"AI Model" -> "AI Service": recommended_modules
"AI Service" -> Database: create_learning_path
"AI Service" -> System: path_ready
```

### Resume Lesson

Hoàn thành bài học và kích hoạt phần thưởng.

```d2
shape: sequence_diagram
Student
"Learning Service"
Database
"Event Bus"
Gamification

Student -> "Learning Service": finish_lesson(lesson_id)
"Learning Service" -> Database: update_progress(COMPLETED)
"Learning Service" -> "Event Bus": publish(lesson.completed)
"Learning Service" -> Gamification: trigger_reward_check
"Learning Service" -> Student: success
```

### Track Progress

Theo dõi tiến độ học tập của học sinh.

```d2
shape: sequence_diagram
Parent
"Learning Service"
Database

Parent -> "Learning Service": get_child_progress(child_id)
"Learning Service" -> Database: aggregate_stats
Database -> "Learning Service": stats
"Learning Service" -> Parent: dashboard_data
```

### Quy tắc & Ràng buộc

- Điểm đạt tối thiểu: cấu hình theo bài học (mặc định 70%)
- Chống gian lận: kiểm tra thời gian hoàn thành hợp lý
- Chỉ trao thưởng khi hoàn thành lần đầu
- Timeout session: 30 phút không hoạt động
- Rate limiting theo user

### Lifecycle Sequence

Vòng đời trạng thái bài học từ mở khóa đến hoàn thành.

```d2
shape: sequence_diagram
System
"Learning Service"
Database
Student
Analytics
Gamification

System -> "Learning Service": new_lesson_available()
"Learning Service" -> Database: create_progress(status=LOCKED)

System -> "Learning Service": check_prerequisites()
"Learning Service" -> Database: update(status=AVAILABLE)
"Learning Service" -> Student: notify_new_lesson()

Student -> "Learning Service": Start session()
"Learning Service" -> Database: update(status=IN_PROGRESS)
"Learning Service" -> Analytics: track_start()

Student -> "Learning Service": submit_exercise(score)
"Learning Service" -> "Learning Service": check_threshold()

"Learning Service" -> Database: update(status=COMPLETED)
"Learning Service" -> Gamification: trigger_rewards()

"Learning Service" -> Database: keep(status=IN_PROGRESS)
"Learning Service" -> Student: retry_feedback()

Student -> "Learning Service": re_learn()
"Learning Service" -> Database: update(status=REVIEW)
```

---

## API & Integration

> **SSoT**: [schema.graphql](../api/graphql/learning/schema.graphql) |
> [operations.graphql](../api/graphql/learning/operations.graphql)

### Sự kiện & Webhooks

| Sự kiện              | Kích hoạt             | Payload                           |
| -------------------- | --------------------- | --------------------------------- |
| `lesson.completed`   | Hoàn thành bài học    | `{ userId, lessonId, score }`     |
| `exercise.submitted` | Nộp bài tập           | `{ userId, exerciseId, results }` |
| `path.updated`       | Cập nhật lộ trình học | `{ userId, pathId, lessons }`     |

---

## Acceptance Criteria

### Yêu cầu chức năng

| ID       | Yêu cầu                    | Điều kiện                     |
| -------- | -------------------------- | ----------------------------- |
| `US-009` | Tạo lộ trình cá nhân hóa   | Dựa trên lịch sử và điểm yếu  |
| `US-013` | Chấm điểm chính xác        | Trả về `is_correct` đúng      |
| `US-012` | Theo dõi tiến độ real-time | Cập nhật ngay sau khi nộp bài |

### Các Edge Cases

| Trường hợp               | Xử lý                               |
| ------------------------ | ----------------------------------- |
| `AI Model` timeout (>2s) | Lộ trình mặc định theo chương trình |
| DB Write fail            | Lỗi cho client, retry phía client   |
| Session hết hạn          | `400`, yêu cầu tạo session mới      |
| `IDOR` attempt           | `403 Forbidden`                     |

---
