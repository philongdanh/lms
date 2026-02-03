---
id: content
title: Content
sidebar_label: Content
sidebar_position: 3
---

# Content

Module quản lý nội dung học tập và ngân hàng câu hỏi.

---

## Business Logic

### Quản lý Subject/Semester

Tạo cấu trúc môn học và học kỳ.

```d2
shape: sequence_diagram
Admin
"Content Service"
Database

Admin -> "Content Service": create_subject(tenant_id, name, grade)
"Content Service" -> Database: check_order_sequence
"Content Service" -> Database: insert_subject
"Content Service" -> Admin: subject_id

Admin -> "Content Service": create_semester(tenant_id, name)
"Content Service" -> Database: insert_semester
"Content Service" -> Admin: semester_id
```

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

Upload video/hình ảnh sử dụng Presigned URL.

### Quy tắc & Ràng buộc

- `Lesson` phải thuộc một `Topic` (phân cấp)
- Teacher tạo draft, Admin xuất bản
- Định dạng hỗ trợ: `xlsx`, `docx`, `pdf`
- Dung lượng tối đa: 500MB cho video

### Content Lifecycle

Vòng đời nội dung từ draft đến xuất bản.

```d2
direction: right

DRAFT: {
  style.fill: "#e5e7eb"
}
PENDING_REVIEW: {
  style.fill: "#fef3c7"
}
PUBLISHED: {
  style.fill: "#d1fae5"
}
ARCHIVED: {
  style.fill: "#f3e8ff"
}

DRAFT -> PENDING_REVIEW: submit_for_review()
PENDING_REVIEW -> PUBLISHED: approve()
PENDING_REVIEW -> DRAFT: reject()
PUBLISHED -> ARCHIVED: archive()
```

**Triggers:**

- `DRAFT` → `PENDING_REVIEW`: Teacher gửi duyệt
- `PENDING_REVIEW` → `PUBLISHED`: Admin duyệt
- `PENDING_REVIEW` → `DRAFT`: Admin từ chối (kèm feedback)
- `PUBLISHED` → `ARCHIVED`: Admin ẩn nội dung

---

## API & Integration

### File Upload (Presigned URL)

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
| Import file lỗi         | `Invalid File Format`          |
| Import lỗi một phần     | Bỏ qua dòng lỗi, log, tiếp tục |
| Sửa nội dung người khác | `403 Forbidden`                |
