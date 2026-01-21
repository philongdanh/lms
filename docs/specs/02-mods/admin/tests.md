
# Admin & Tenant Management - Test Cases
 
Kịch bản kiểm thử quy trình quản trị và thiết lập.


## Test Categories

### 1. Kiểm thử chức năng

#### Business Logic

| Test ID        | Description           | Rules        | Expected Result               | Priority |
| -------------- | --------------------- | ------------ | ----------------------------- | -------- |
| TC-ADM-FUN-001 | Tạo Tenant            | BR-ADMIN-001 | Thành công nếu mã là duy nhất | P0       |
| TC-ADM-FUN-002 | Mã Tenant trùng lặp   | BR-ADMIN-001 | Lỗi "Code Exists"             | P1       |
| TC-ADM-FUN-003 | Giới hạn Import Users | BR-ADMIN-004 | Lỗi nếu > 500 dòng            | P1       |

### 2. Kiểm thử tích hợp

| Test ID        | Description          | Components   | Result          |
| -------------- | -------------------- | ------------ | --------------- |
| TC-ADM-INT-001 | Tạo Tenant gửi email | Admin, Email | Email nhận được |

### 4. Kiểm thử bảo mật

| Test ID        | Aspect                            | Method        | Result        |
| -------------- | --------------------------------- | ------------- | ------------- |
| TC-ADM-SEC-001 | Tenant Admin không thể tạo Tenant | POST /tenants | 403 Forbidden |


# Performance Requirements


## Performance Targets

### Thời gian phản hồi

| Operation          | P50   | P95   | P99   | Max | Measurement    |
| ------------------ | ----- | ----- | ----- | --- | -------------- |
| Create Tenant      | 500ms | 1s    | 2s    | 5s  | API End-to-end |
| Import Users (500) | 2s    | 5s    | 8s    | 15s | Job Duration   |
| List Tenants       | 50ms  | 100ms | 300ms | 1s  | DB Query       |

### Yêu cầu thông lượng

| Scenario         | Requests/sec | Concurrent Users | Data Volume |
| ---------------- | ------------ | ---------------- | ----------- |
| Admin Operations | 50           | 20 (Root Admins) | Thấp        |


## Resource Utilization Limits

| Resource          | Warning Threshold | Critical Threshold | Required Action  |
| ----------------- | ----------------- | ------------------ | ---------------- |
| CSV Parser Memory | 500MB             | 1GB                | Từ chối file lớn |


## Validation Checklist

- [ ] Xác minh việc thực thi giới hạn kích thước file tối đa

