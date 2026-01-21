
# Content & Question Bank - Business Logic
 
Quy tắc nghiệp vụ quản lý và phân phối nội dung.


## Dependencies

### Phụ thuộc nội bộ

- ❌ Không có - Content là module nền tảng (Core).

### Phụ thuộc bên ngoài

- ✅ File Storage (S3/MinIO) - Lưu trữ Videos, Images, Documents.
- ✅ Search Engine (Elasticsearch) - Tìm kiếm câu hỏi và bài học.


## Validation Criteria

- [ ] Cây cấu trúc nội dung hiển thị đúng phân cấp.
- [ ] Quy trình import chạy đúng với file template và file lỗi.
- [ ] Media upload phát được trên tất cả thiết bị.
- [ ] Quyền Teacher (tạo draft) và Admin (publish) hoạt động đúng.


# Workflows


## Workflow Details

### WF-CONT-002: Bulk Import Questions

**Description**: Quy trình import câu hỏi từ file bên ngoài vào hệ thống.

#### Flow Diagram

```d2
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
```

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

```d2
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
```


## Error Handling

| Error Scenario         | Detection   | Recovery Action                           | Escalation |
| ---------------------- | ----------- | ----------------------------------------- | ---------- |
| Import File Corrupt    | Parse Error | Trả về "Invalid File Format"              | -          |
| Partial Import Failure | Row Error   | Bỏ qua dòng, ghi log vào report, tiếp tục | -          |


## Security Requirements

- [ ] Quét file upload để phát hiện malware (tích hợp VirusTotal hoặc ClamAV)


## References

- [Overview](/specs)
