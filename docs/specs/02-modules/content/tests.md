---
id: tests
title: Test Cases
sidebar_label: Tests
sidebar_position: 40
---

# Content & Question Bank - Test Cases
 
Kịch bản kiểm thử hệ thống quản lý nội dung.
import/export workflows.


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

