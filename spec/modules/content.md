---
id: content
title: Content
sidebar_label: Content
sidebar_position: 6
---

# Content

Module quản lý nội dung học tập và ngân hàng câu hỏi.

---

## Business Logic

### Workflow chính

| Workflow         | Mô tả                    | Actor         | Kết quả                       |
| ---------------- | ------------------------ | ------------- | ----------------------------- |
| Create Structure | Tạo cây cấu trúc môn học | Admin/Teacher | `Topic`/`Lesson` được tạo     |
| Bulk Import      | Import câu hỏi từ file   | Teacher       | Câu hỏi được import           |
| Publish Content  | Phê duyệt và publish     | `Admin`       | Nội dung visible cho students |
| Upload `Media`   | Upload video/image       | Teacher       | `Media` được lưu trữ          |

####Detailed Flows

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

- `Lesson` phải thuộc về một `Topic` (hierarchy)
- Teacher tạo draft, Admin publish
- File upload được scan malware (ClamAV)
- Hỗ trợ format: `xlsx`, `docx`, `pdf` cho import
- Max file size: 500MB cho video

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

| Entity     | Fields chính                                    | Mô tả      |
| ---------- | ----------------------------------------------- | ---------- |
| `Subject`  | `id`, `name`, `grade`, `curriculum`             | Môn học    |
| `Topic`    | `id`, `subject_id`, `name`, `order`             | Chủ đề     |
| `Lesson`   | `id`, `topic_id`, `title`, `content`, `status`  | Bài học    |
| `Question` | `id`, `lesson_id`, `type`, `content`, `answers` | Câu hỏi    |
| `Media`    | `id`, `type`, `url`, `size`, `metadata`         | File media |

### Relations

| `Relation`            | Mô tả                            |
| --------------------- | -------------------------------- |
| `Subject` → `Topic`   | `1:N` - Môn học có nhiều chủ đề  |
| `Topic` → `Lesson`    | `1:N` - Chủ đề có nhiều bài học  |
| `Lesson` → `Question` | `1:N` - Bài học có nhiều câu hỏi |
| `Lesson` → `Media`    | `N:M` - Bài học dùng nhiều media |

---

## API & Integration

### GraphQL Operations

| Type       | Operation         | Mô tả             | Auth       | Rate Limit |
| ---------- | ----------------- | ----------------- | ---------- | ---------- |
| `Query`    | `subjects`        | Danh sách môn học | ❌         | 200/min    |
| `Query`    | `topics`          | Danh sách chủ đề  | ❌         | 200/min    |
| `Query`    | `lesson`          | Chi tiết bài học  | ✅         | 200/min    |
| `Mutation` | `importQuestions` | Import câu hỏi    | ✅ Teacher | 10/min     |
| `Query`    | `searchQuestions` | Tìm kiếm câu hỏi  | ✅ Teacher | 100/min    |
| `Mutation` | `createLesson`    | Tạo bài học mới   | ✅ Teacher | 50/min     |
| `Mutation` | `publishLesson`   | Publish bài học   | ✅ `Admin` | 50/min     |

### REST Endpoints

| Method | Endpoint      | Mô tả       | Auth       |
| ------ | ------------- | ----------- | ---------- |
| `POST` | `/api/upload` | Upload file | ✅ Teacher |

### Events & Webhooks

| Event               | Trigger              | Payload                       |
| ------------------- | -------------------- | ----------------------------- |
| `content.published` | Bài học được publish | `{ lessonId, publishedBy }`   |
| `import.completed`  | Import hoàn tất      | `{ success, failed, report }` |

---

## Acceptance Criteria

### Functional Requirements

| ID           | Requirement         | Điều kiện                        |
| ------------ | ------------------- | -------------------------------- |
| `FR-CONT-01` | Validate hierarchy  | Không tạo `Lesson` thiếu `Topic` |
| `FR-CONT-02` | Import format check | Từ chối file không hỗ trợ        |
| `FR-CONT-03` | `Media` playback    | Video chạy trên mọi device       |

### Edge Cases

| Case                         | Xử lý                              |
| ---------------------------- | ---------------------------------- |
| Import file corrupt          | Trả về `Invalid File Format`       |
| Partial import failure       | Bỏ qua dòng lỗi, ghi log, tiếp tục |
| Malware detected             | Reject upload, alert admin         |
| Chỉnh sửa content người khác | 403 Forbidden                      |

---
