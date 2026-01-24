---
id: learning
title: Learning
sidebar_label: Learning
sidebar_position: 3
---

# Learning

Learning module with AI-powered personalized learning paths.

---

## Business Logic

### Main Workflows

| Workflow               | Description                   | Actor              | Result                              |
| ---------------------- | ----------------------------- | ------------------ | ----------------------------------- |
| Submit Exercise        | Submit exercise answers       | `Student`          | Graded, progress updated            |
| Generate Learning Path | Create adaptive learning path | `System`           | Recommended lesson list             |
| Complete Lesson        | Complete lesson               | `Student`          | Progress updated, rewards triggered |
| Track Progress         | Track learning progress       | `Student`/`Parent` | Dashboard displayed                 |

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

- Minimum score to pass: configurable per lesson (default 70%)
- Anti-cheat: check reasonable completion time
- Only trigger rewards if first-time completion
- Session timeout: 30 minutes of inactivity
- Rate limiting per user

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

| Entity              | Main Fields                                               | Description                |
| ------------------- | --------------------------------------------------------- | -------------------------- |
| `LearningPath`      | `id`, `user_id`, `subject_id`, `lessons[]`                | User learning path         |
| `LessonProgress`    | `id`, `user_id`, `lesson_id`, `status`, `score`           | Individual lesson progress |
| `ExerciseSession`   | `id`, `user_id`, `lesson_id`, `started_at`, `answers[]`   | Exercise session           |
| `SubmissionHistory` | `id`, `session_id`, `question_id`, `answer`, `is_correct` | Answer history             |

### Relations

| `Relation`                           | Description                                 |
| ------------------------------------ | ------------------------------------------- |
| `User` → `LearningPath`              | `1:N` - User has multiple learning paths    |
| `User` → `LessonProgress`            | `1:N` - Progress for each lesson            |
| `LessonProgress` → `ExerciseSession` | `1:N` - Multiple attempts per lesson        |
| `Learning` → `Content`               | Depends - Fetch content from Content module |
| `Learning` → `Analytics`             | Depends - Send data for Knowledge Map       |
| `Learning` → `Gamification`          | Depends - Trigger rewards                   |

---

## API & Integration

### GraphQL Operations

| Type       | Operation          | Description                 | Auth | Rate Limit |
| ---------- | ------------------ | --------------------------- | ---- | ---------- |
| `Query`    | `learningProgress` | Overall progress            | ✅   | 200/min    |
| `Query`    | `lessonContent`    | Lesson content              | ✅   | 200/min    |
| `Mutation` | `completeLesson`   | Mark as completed           | ✅   | 100/min    |
| `Query`    | `lessonExercise`   | Get exercise                | ✅   | 100/min    |
| `Mutation` | `submitExercise`   | Submit answers              | ✅   | 100/min    |
| `Query`    | `recommendations`  | Get next lesson suggestions | ✅   | 50/min     |

### Events & Webhooks

| Event                | Trigger               | Payload                           |
| -------------------- | --------------------- | --------------------------------- |
| `lesson.completed`   | Lesson completed      | `{ userId, lessonId, score }`     |
| `exercise.submitted` | Exercise submitted    | `{ userId, exerciseId, results }` |
| `path.updated`       | Learning path updated | `{ userId, pathId, lessons }`     |

---

## Acceptance Criteria

### Functional Requirements

| ID            | Requirement                  | Condition                       |
| ------------- | ---------------------------- | ------------------------------- |
| `FR-LEARN-01` | Personalized path generation | Based on history and weaknesses |
| `FR-LEARN-02` | Accurate grading             | Return correct `is_correct`     |
| `FR-LEARN-03` | Real-time progress tracking  | Update immediately after submit |

### Edge Cases

| Case                   | Handling                                  |
| ---------------------- | ----------------------------------------- |
| AI Model timeout (>2s) | Return default path per curriculum        |
| DB Write fail          | Return error to client, retry client-side |
| Session expired        | Return 400 error, request new session     |
| IDOR attempt           | Return 403 Forbidden                      |

---
