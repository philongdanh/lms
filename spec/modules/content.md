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

### Tạo cấu trúc Content

Tạo cấu trúc môn học với chủ đề và bài học.

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

### Bulk Import

Import câu hỏi từ file Excel/Word.

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

### Xuất bản Content

Duyệt và xuất bản nội dung cho học sinh.

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

### Upload Media

Upload video/hình ảnh với kiểm tra malware.

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

### Quy tắc & Ràng buộc

- `Lesson` phải thuộc một `Topic` (phân cấp)
- `Teacher` tạo draft, `Admin` xuất bản
- File upload được quét malware (ClamAV)
- Định dạng hỗ trợ: `xlsx`, `docx`, `pdf`
- Dung lượng tối đa: 500MB cho video

### Lifecycle Sequence

Vòng đời nội dung từ draft đến xuất bản.

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

> **SSoT**: [Database Blueprint](../../blueprint/architecture/database.md)

---

## API & Integration

### Các thao tác GraphQL

> **SSoT**: [schema.graphql](../api/graphql/content/schema.graphql) |
> [operations.graphql](../api/graphql/content/operations.graphql)

```graphql
type Query {
  """
  Danh sách môn học
  """
  subjects(grade: Int): [Subject!]! @rateLimit(limit: 200, window: "1m")

  """
  Danh sách chủ đề
  """
  topics(subjectId: ID!): [Topic!]! @rateLimit(limit: 200, window: "1m")

  """
  Chi tiết bài học
  """
  lesson(id: ID!): Lesson! @auth @rateLimit(limit: 200, window: "1m")

  """
  Tìm kiếm câu hỏi
  """
  searchQuestions(query: String!, lessonId: ID): [Question!]!
    @auth(role: TEACHER)
    @rateLimit(limit: 100, window: "1m")
}

type Mutation {
  """
  Import câu hỏi từ file
  """
  importQuestions(file: Upload!, lessonId: ID!): ImportResult!
    @auth(role: TEACHER)
    @rateLimit(limit: 10, window: "1m")

  """
  Tạo bài học mới
  """
  createLesson(input: CreateLessonInput!): Lesson!
    @auth(role: TEACHER)
    @rateLimit(limit: 50, window: "1m")

  """
  Xuất bản bài học
  """
  publishLesson(lessonId: ID!): Lesson!
    @auth(role: ADMIN)
    @rateLimit(limit: 50, window: "1m")
}

type ImportResult {
  successCount: Int!
  errorCount: Int!
  errors: [ImportError!]!
}

type ImportError {
  row: Int!
  message: String!
}
```

### REST Endpoints

```
POST /api/upload
  - Auth: Teacher
  - Body: multipart/form-data
  - Response: { uploadUrl, mediaId }
```

### Sự kiện & Webhooks

| Sự kiện             | Kích hoạt             | Payload                       |
| ------------------- | --------------------- | ----------------------------- |
| `content.published` | Bài học được xuất bản | `{ lessonId, publishedBy }`   |
| `import.completed`  | Import hoàn tất       | `{ success, failed, report }` |

---

## Acceptance Criteria

### Yêu cầu chức năng

| ID           | Yêu cầu                   | Điều kiện                               |
| ------------ | ------------------------- | --------------------------------------- |
| `FR-CONT-01` | Validate phân cấp         | Không thể tạo `Lesson` không có `Topic` |
| `FR-CONT-02` | Kiểm tra định dạng import | Từ chối file không hỗ trợ               |
| `FR-CONT-03` | Phát video media          | Video chơi được trên mọi thiết bị       |

### Các Edge Cases

| Trường hợp              | Xử lý                          |
| ----------------------- | ------------------------------ |
| Import file lỗi         | Trả về `Invalid File Format`   |
| Import lỗi một phần     | Bỏ qua dòng lỗi, log, tiếp tục |
| Phát hiện malware       | Từ chối upload, alert admin    |
| Sửa nội dung người khác | 403 Forbidden                  |

---
