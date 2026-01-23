---
id: content
title: Content
sidebar_label: Content
sidebar_position: 6
---

# Content

Learning content management and question bank module.

---

## Business Logic

### Main Workflows

| Workflow         | Description              | Actor         | Result                        |
| ---------------- | ------------------------ | ------------- | ----------------------------- |
| Create Structure | Create subject tree      | `Admin`/`Teacher` | `Topic`/`Lesson` created      |
| Bulk Import      | Import questions from file | `Teacher`   | Questions imported            |
| Publish Content  | Review and publish       | `Admin`       | Content visible to students   |
| Upload `Media`   | Upload video/image       | `Teacher`     | `Media` stored                |

#### Detailed Flows

##### Create Structure

```d2
shape: sequence_diagram
Teacher
"Content Service"
Database

Teacher -> "Content Service": create_structure(subject_id, structure)
"Content Service" -> Database: validate_hierarchy
Database -> "Content Service": valid
"Content Service" -> Database: batch_insert_topics_lessons
"Content Service" -> Teacher: success
```

##### Bulk Import

```d2
shape: sequence_diagram
Teacher
"Content Service"
"Parser Service"
Database

Teacher -> "Content Service": import_questions(file, lesson_id)
"Content Service" -> "Parser Service": parse_file(xlsx/docx)
"Parser Service" -> "Content Service": list_of_questions
"Content Service" -> Database: batch_insert_questions
"Content Service" -> Teacher: report(success_count, errors)
```

##### Publish Content

```d2
shape: sequence_diagram
Admin
"Content Service"
Database
"Event Bus"

Admin -> "Content Service": publish_lesson(lesson_id)
"Content Service" -> Database: update_status(PUBLISHED)
"Content Service" -> "Event Bus": publish(content.published)
"Content Service" -> Admin: success
```

##### Upload Media

```d2
shape: sequence_diagram
Teacher
"Content Service"
S3
"AV Scanner"
Database

Teacher -> "Content Service": get_upload_url(filename)
"Content Service" -> S3: generate_presigned_url
S3 -> "Content Service": url
"Content Service" -> Teacher: url
Teacher -> S3: upload_file_binary
S3 -> "Content Service": webhook_upload_complete
"Content Service" -> "AV Scanner": scan_file
"AV Scanner" -> "Content Service": safe
"Content Service" -> Database: create_media_record
```

### Rules & Constraints

- `Lesson` must belong to a `Topic` (hierarchy)
- `Teacher` creates draft, `Admin` publishes
- File upload scanned for malware (ClamAV)
- Supported formats: `xlsx`, `docx`, `pdf` for import
- Max file size: 500MB for video

### Lifecycle Sequence

```d2
shape: sequence_diagram
Teacher
"Content Service"
Database
Notification
Admin
"Event Bus"

Teacher -> "Content Service": create_lesson()
"Content Service" -> Database: insert(status=DRAFT)

Teacher -> "Content Service": submit_for_review()
"Content Service" -> Database: update(status=PENDING_REVIEW)
"Content Service" -> Notification: notify_admin()

Admin -> "Content Service": approve()
"Content Service" -> Database: update(status=PUBLISHED)
"Content Service" -> "Event Bus": publish(content.published)

Admin -> "Content Service": reject()
"Content Service" -> Database: update(status=DRAFT)
"Content Service" -> Notification: notify_teacher(feedback)

Admin -> "Content Service": archive()
"Content Service" -> Database: update(status=ARCHIVED)
```

---

## Data Model

### Schema & Entities

| Entity     | Main Fields                                    | Description |
| ---------- | ----------------------------------------------- | ---------- |
| `Subject`  | `id`, `name`, `grade`, `curriculum`             | Subject    |
| `Topic`    | `id`, `subject_id`, `name`, `order`             | Topic      |
| `Lesson`   | `id`, `topic_id`, `title`, `content`, `status`  | Lesson     |
| `Question` | `id`, `lesson_id`, `type`, `content`, `answers` | Question   |
| `Media`    | `id`, `type`, `url`, `size`, `metadata`         | Media file |

### Relations

| `Relation`            | Description                          |
| --------------------- | ------------------------------------ |
| `Subject` → `Topic`   | `1:N` - Subject has many topics      |
| `Topic` → `Lesson`    | `1:N` - Topic has many lessons       |
| `Lesson` → `Question` | `1:N` - Lesson has many questions    |
| `Lesson` → `Media`    | `N:M` - Lesson uses multiple media   |

---

## API & Integration

### GraphQL Operations

| Type       | Operation         | Description       | Auth       | Rate Limit |
| ---------- | ----------------- | ----------------- | ---------- | ---------- |
| `Query`    | `subjects`        | Subject list      | ❌         | 200/min    |
| `Query`    | `topics`          | Topic list        | ❌         | 200/min    |
| `Query`    | `lesson`          | Lesson details    | ✅         | 200/min    |
| `Mutation` | `importQuestions` | Import questions  | ✅ `Teacher` | 10/min     |
| `Query`    | `searchQuestions` | Search questions  | ✅ `Teacher` | 100/min    |
| `Mutation` | `createLesson`    | Create new lesson | ✅ `Teacher` | 50/min     |
| `Mutation` | `publishLesson`   | Publish lesson    | ✅ `Admin` | 50/min     |

### REST Endpoints

| Method | Endpoint      | Description | Auth       |
| ------ | ------------- | ----------- | ---------- |
| `POST` | `/api/upload` | Upload file | ✅ `Teacher` |

### Events & Webhooks

| Event               | Trigger           | Payload                       |
| ------------------- | ----------------- | ----------------------------- |
| `content.published` | Lesson published  | `{ lessonId, publishedBy }`   |
| `import.completed`  | Import completed  | `{ success, failed, report }` |

---

## Acceptance Criteria

### Functional Requirements

| ID           | Requirement         | Condition                        |
| ------------ | ------------------- | -------------------------------- |
| `FR-CONT-01` | Validate hierarchy  | Cannot create `Lesson` without `Topic` |
| `FR-CONT-02` | Import format check | Reject unsupported files         |
| `FR-CONT-03` | `Media` playback    | Video plays on all devices       |

### Edge Cases

| Case                         | Handling                           |
| ---------------------------- | ---------------------------------- |
| Import corrupt file          | Return `Invalid File Format`       |
| Partial import failure       | Skip error rows, log, continue     |
| Malware detected             | Reject upload, alert admin         |
| Edit others' content         | 403 Forbidden                      |

---
