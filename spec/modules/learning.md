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

| Workflow               | Mô tả                      | Actor          | Kết quả                        |
| ---------------------- | -------------------------- | -------------- | ------------------------------ |
| Submit Exercise        | Nộp câu trả lời bài tập    | Student        | Chấm điểm, cập nhật tiến độ    |
| Generate Learning Path | Tạo lộ trình học thích ứng | System         | Danh sách bài học được đề xuất |
| Complete Lesson        | Hoàn thành bài học         | Student        | Tiến độ cập nhật, rewards gửi  |
| Track Progress         | Theo dõi tiến độ học tập   | Student/Parent | Dashboard hiển thị             |

#### Detailed Flows

##### Submit Exercise

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

##### Generate Learning Path

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

##### Complete Lesson

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

##### Track Progress

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

### Rules & Constraints

- Điểm tối thiểu để pass: configurable per lesson (default 70%)
- Anti-cheat: kiểm tra thời gian làm bài hợp lý
- Chỉ trigger rewards nếu là lần hoàn thành đầu tiên
- Session timeout: 30 phút không hoạt động
- Rate limiting theo user

### Lifecycle Sequence

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

Student -> "Learning Service": start_lesson()
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

## Data Model

### Schema & Entities

| Entity              | Fields chính                                              | Mô tả                 |
| ------------------- | --------------------------------------------------------- | --------------------- |
| `LearningPath`      | `id`, `user_id`, `subject_id`, `lessons[]`                | Lộ trình học của user |
| `LessonProgress`    | `id`, `user_id`, `lesson_id`, `status`, `score`           | Tiến độ từng bài      |
| `ExerciseSession`   | `id`, `user_id`, `lesson_id`, `started_at`, `answers[]`   | Session làm bài       |
| `SubmissionHistory` | `id`, `session_id`, `question_id`, `answer`, `is_correct` | Lịch sử trả lời       |

### Relations

| `Relation`                           | Mô tả                                    |
| ------------------------------------ | ---------------------------------------- |
| `User` → `LearningPath`              | `1:N` - User có nhiều learning paths     |
| `User` → `LessonProgress`            | `1:N` - Tiến độ từng bài                 |
| `LessonProgress` → `ExerciseSession` | `1:N` - Nhiều lần làm bài                |
| `Learning → Content`                 | Depends - Lấy nội dung từ Content module |
| `Learning → Analytics`               | Depends - Gửi dữ liệu cho Knowledge Map  |
| `Learning → Gamification`            | Depends - Trigger rewards                |

---

## API & Integration

### GraphQL Operations

| Type       | Operation          | Mô tả                   | Auth | Rate Limit |
| ---------- | ------------------ | ----------------------- | ---- | ---------- |
| `Query`    | `learningProgress` | Tiến độ tổng quan       | ✅   | 200/min    |
| `Query`    | `lessonContent`    | Nội dung bài học        | ✅   | 200/min    |
| `Mutation` | `completeLesson`   | Đánh dấu hoàn thành     | ✅   | 100/min    |
| `Query`    | `lessonExercise`   | Lấy bài tập             | ✅   | 100/min    |
| `Mutation` | `submitExercise`   | Nộp câu trả lời         | ✅   | 100/min    |
| `Query`    | `recommendations`  | Gợi ý bài học tiếp theo | ✅   | 50/min     |

### Events & Webhooks

| Event                | Trigger                | Payload                           |
| -------------------- | ---------------------- | --------------------------------- |
| `lesson.completed`   | Hoàn thành bài học     | `{ userId, lessonId, score }`     |
| `exercise.submitted` | Nộp bài tập            | `{ userId, exerciseId, results }` |
| `path.updated`       | Lộ trình được cập nhật | `{ userId, pathId, lessons }`     |

---

## Acceptance Criteria

### Functional Requirements

| ID            | Requirement                  | Điều kiện                    |
| ------------- | ---------------------------- | ---------------------------- |
| `FR-LEARN-01` | Personalized path generation | Dựa trên lịch sử và điểm yếu |
| `FR-LEARN-02` | Chấm điểm chính xác          | Trả về `is_correct` đúng     |
| `FR-LEARN-03` | Progress tracking real-time  | Cập nhật ngay sau submit     |

### Edge Cases

| Case                    | Xử lý                                 |
| ----------------------- | ------------------------------------- |
| AI Model timeout (> 2s) | Trả về Default Path theo Curriculum   |
| DB Write fail           | Trả lỗi cho client, retry client-side |
| Session hết hạn         | Trả lỗi 400, yêu cầu tạo session mới  |
| IDOR attempt            | Trả về 403 Forbidden                  |

---
