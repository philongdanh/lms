# Content Module Specification

# Content & Question Bank - Business Logic

Quy tắc nghiệp vụ quản lý và phân phối nội dung.

## Dependencies

### Phụ thuộc nội bộ

- ❌ Không có - Content là module nền tảng (Core).

### Phụ thuộc bên ngoài

- ✅ File Storage (S3/MinIO) - Lưu trữ Videos, Images, Documents.
- ✅ Search Engine (Elasticsearch) - Tìm kiếm câu hỏi và bài học.

## Validation Criteria

- ✅ Cây cấu trúc nội dung hiển thị đúng phân cấp.
- ✅ Quy trình import chạy đúng với file template và file lỗi.
- ✅ Media upload phát được trên tất cả thiết bị.
- ✅ Quyền Teacher (tạo draft) và Admin (publish) hoạt động đúng.

# Workflows

## Workflow Details

### WF-CONT-002: Bulk Import Questions

**Description**: Quy trình import câu hỏi từ file bên ngoài vào hệ thống.

#### Flow Diagram

````d2
```d2
shape: sequence_diagram

User
API
ImportService
DB
FileStorage

User -> API: Upload File (questions.xlsx)
API -> ImportService: Process File
ImportService -> FileStorage: Save temp file
ImportService -> ImportService: Validate Rules (Loop)
ImportService -> ImportService: Parse & Insert (if Valid)
ImportService -> DB: Insert Question
DB -> ImportService: New ID
ImportService -> API: Summary (Success/Fail)
API -> User: Display Report
````

#### Steps

| Step | Description      | Actor  | System Action                    | Exit Condition   |
| ---- | ---------------- | ------ | -------------------------------- | ---------------- |
| 1    | Upload File      | User   | Nhận & Lưu Temp                  | File đã lưu      |
| 2    | Parse & Validate | System | Đọc các dòng, kiểm tra định dạng | Parsing hoàn tất |
| 3    | Insert DB        | System | Insert các câu hỏi hợp lệ        | -                |
| 4    | Generate Report  | System | Tạo báo cáo tổng hợp             | Report sẵn sàng  |

### WF-CONT-001: Create Content Structure

**Description**: Tạo cây cấu trúc môn học.

#### Flow Diagram

````d2
```d2
direction: down

A: Teacher/Admin
B: Choose Action {
  shape: diamond
}
C: Create Topic
D: Assign Subject & Grade
E: Set Active Status
F: Create Lesson in Topic
G: Upload Learning Materials
H: Video/Slide/Doc

A -> B
B -> C: Manage Structure
C -> D
D -> E
B -> F: Manage Lesson
F -> G
G -> H
````

## Error Handling

| Error Scenario         | Detection   | Recovery Action                           | Escalation |
| ---------------------- | ----------- | ----------------------------------------- | ---------- |
| Import File Corrupt    | Parse Error | Trả về "Invalid File Format"              | -          |
| Partial Import Failure | Row Error   | Bỏ qua dòng, ghi log vào report, tiếp tục | -          |

## Security Requirements

- ✅ Quét file upload để phát hiện malware (tích hợp VirusTotal hoặc ClamAV)

## References

- [Overview](/specs)

---

# Content & Question Bank - API Endpoints

Các giao diện lập trình quản lý nội dung và ngân hàng câu hỏi.

## Endpoints Summary

| Method | Endpoint               | Description       | Auth Required | Rate Limit |
| ------ | ---------------------- | ----------------- | ------------- | ---------- |
| GET    | `/subjects`            | Danh sách môn học | ❌            | 200/min    |
| GET    | `/topics`              | Danh sách chủ đề  | ❌            | 200/min    |
| GET    | `/lessons/:id`         | Chi tiết bài học  | ✅            | 200/min    |
| POST   | `/questions/import`    | Import câu hỏi    | ✅ Teacher    | 10/min     |
| GET    | `/questions/search`    | Tìm kiếm câu hỏi  | ✅ Teacher    | 100/min    |
| POST   | `/lessons`             | Tạo bài học mới   | ✅ Teacher    | 50/min     |
| PUT    | `/lessons/:id/publish` | Publish bài học   | ✅ Admin      | 50/min     |

---

# Content & Question Bank - Data Model

Cấu trúc dữ liệu cho nội dung học tập và kho câu hỏi.

config: themeVariables: fontFamily: "EB Garamond"

## References

-
-
-

---

# Content & Question Bank - Test Cases

Kịch bản kiểm thử hệ thống quản lý nội dung. import/export workflows.

## Test Categories

### 1. Kiểm thử chức năng

#### Business Logic

| Test ID         | Description         | Rules       | Expected Result                | Priority |
| --------------- | ------------------- | ----------- | ------------------------------ | -------- |
| TC-CONT-FUN-001 | Validate Hierarchy  | BR-CONT-001 | Ngăn tạo Lesson không có Topic | P0       |
| TC-CONT-FUN-002 | Import Format Check | BR-CONT-005 | Từ chối file .exe              | P1       |

### 2. Kiểm thử tích hợp

| Test ID         | Description                         | Components            | Result             |
| --------------- | ----------------------------------- | --------------------- | ------------------ |
| TC-CONT-INT-001 | Sự kiện Publish kích hoạt thông báo | Content, Notification | Thông báo được gửi |

### 4. Kiểm thử bảo mật

| Test ID         | Aspect                            | Method                | Result        |
| --------------- | --------------------------------- | --------------------- | ------------- |
| TC-CONT-SEC-001 | Chỉnh sửa nội dung của người khác | PUT /questions/`{id}` | 403 Forbidden |

# Performance Requirements

## Performance Targets

### Thời gian phản hồi

| Operation                 | P50   | P95   | P99   | Max | Measurement       |
| ------------------------- | ----- | ----- | ----- | --- | ----------------- |
| Get Topic Tree            | 50ms  | 100ms | 300ms | 1s  | Tải full tree     |
| Search Questions          | 100ms | 300ms | 800ms | 2s  | Tìm kiếm fulltext |
| Import Process (100 rows) | 2s    | 5s    | 10s   | 30s | Thời gian task    |

### Yêu cầu thông lượng

| Scenario        | Requests/sec | Concurrent Users | Data Volume |
| --------------- | ------------ | ---------------- | ----------- |
| Normal Browsing | 2000         | 10000            | 100MB/giờ   |

## Storage

- **Database**: 500GB/năm (Dữ liệu text ngân hàng câu hỏi).
- **File Storage**: 10TB/năm (Videos, Images).

## Validation Checklist

- ✅ Autoscaling worker pool đã được cấu hình
- ✅ Đã bật S3 upload acceleration (nếu cần)

---
