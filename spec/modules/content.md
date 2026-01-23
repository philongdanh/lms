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
| Create Structure | Tạo cây cấu trúc môn học | Admin/Teacher | Topic/Lesson được tạo         |
| Bulk Import      | Import câu hỏi từ file   | Teacher       | Câu hỏi được import           |
| Publish Content  | Phê duyệt và publish     | Admin         | Nội dung visible cho students |
| Upload Media     | Upload video/image       | Teacher       | Media được lưu trữ            |

### Rules & Constraints

- Lesson phải thuộc về một Topic (hierarchy)
- Teacher tạo draft, Admin publish
- File upload được scan malware (ClamAV)
- Hỗ trợ format: `xlsx`, `docx`, `pdf` cho import
- Max file size: 500MB cho video

### State Machine

```d2
direction: right

Start: {
  shape: circle
  style.fill: black
  label: ""
  width: 20
  height: 20
}

End: {
  shape: circle
  style.fill: black
  label: ""
  width: 20
  height: 20
}

Start -> DRAFT: create
DRAFT -> PENDING_REVIEW: submit
PENDING_REVIEW -> PUBLISHED: approve
PENDING_REVIEW -> DRAFT: reject
PUBLISHED -> ARCHIVED: archive
ARCHIVED -> End
```

---

## Data Model

### Schema & Entities

| Entity   | Fields chính                                    | Mô tả      |
| -------- | ----------------------------------------------- | ---------- |
| Subject  | `id`, `name`, `grade`, `curriculum`             | Môn học    |
| Topic    | `id`, `subject_id`, `name`, `order`             | Chủ đề     |
| Lesson   | `id`, `topic_id`, `title`, `content`, `status`  | Bài học    |
| Question | `id`, `lesson_id`, `type`, `content`, `answers` | Câu hỏi    |
| Media    | `id`, `type`, `url`, `size`, `metadata`         | File media |

### Relations

| Relation          | Mô tả                            |
| ----------------- | -------------------------------- |
| Subject → Topic   | `1:N` - Môn học có nhiều chủ đề  |
| Topic → Lesson    | `1:N` - Chủ đề có nhiều bài học  |
| Lesson → Question | `1:N` - Bài học có nhiều câu hỏi |
| Lesson → Media    | `N:M` - Bài học dùng nhiều media |

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
| `Mutation` | `publishLesson`   | Publish bài học   | ✅ Admin   | 50/min     |

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

| ID         | Requirement         | Điều kiện                    |
| ---------- | ------------------- | ---------------------------- |
| FR-CONT-01 | Validate hierarchy  | Không tạo Lesson thiếu Topic |
| FR-CONT-02 | Import format check | Từ chối file không hỗ trợ    |
| FR-CONT-03 | Media playback      | Video chạy trên mọi device   |

### Edge Cases

| Case                         | Xử lý                              |
| ---------------------------- | ---------------------------------- |
| Import file corrupt          | Trả về `Invalid File Format`       |
| Partial import failure       | Bỏ qua dòng lỗi, ghi log, tiếp tục |
| Malware detected             | Reject upload, alert admin         |
| Chỉnh sửa content người khác | 403 Forbidden                      |

---
