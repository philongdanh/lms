---
id: content-tests
title: Content Test Cases
sidebar_label: Tests
sidebar_position: 5
---

# Content & Question Bank - Test Cases

---

## Overview
Các test cases cho module Content.

---

## Test Coverage Matrix
| Specification | Test Cases | Coverage | Status |
|---------------|------------|---------|--------|
| Business Logic | 7 | 100% | Planned |
| API Endpoints | 6 | 100% | Planned |
| Workflows | 3 | 100% | Planned |

---

## Test Categories

### 1. Functional Tests
#### Business Logic
| Test ID | Description | Rules | Expected Result | Priority |
|---------|-------------|-------|-----------------|----------|
| TC-CONT-FUN-001 | Validate Hierarchy | BR-CONT-001 | Ngăn tạo Lesson không có Topic | P0 |
| TC-CONT-FUN-002 | Import Format Check | BR-CONT-005 | Từ chối file .exe | P1 |

### 2. Integration Tests
| Test ID | Description | Components | Result |
|---------|-------------|------------|--------|
| TC-CONT-INT-001 | Sự kiện Publish kích hoạt thông báo | Content, Notification | Thông báo được gửi |

### 4. Security Tests
| Test ID | Aspect | Method | Result |
|---------|--------|--------|--------|
| TC-CONT-SEC-001 | Chỉnh sửa nội dung của người khác | PUT /questions/`{id}` | 403 Forbidden |

---

## Validation Checklist
- [ ] Các edge cases của Import Parsing (dòng trống, ký tự lỗi)

---

# Performance Requirements

---

## Overview
Performance specifications cho module Content.

---

## Performance Targets

### Response Times
| Operation | P50 | P95 | P99 | Max | Measurement |
|-----------|-----|-----|-----|-----|-------------|
| Get Topic Tree | 50ms | 100ms | 300ms | 1s | Tải full tree |
| Search Questions | 100ms | 300ms | 800ms | 2s | Tìm kiếm fulltext |
| Import Process (100 rows) | 2s | 5s | 10s | 30s | Thời gian task |

### Throughput Requirements
| Scenario | Requests/sec | Concurrent Users | Data Volume |
|----------|--------------|------------------|-------------|
| Normal Browsing | 2000 | 10000 | 100MB/giờ |

---

## Scalability Requirements
### Horizontal Scaling
- **Content Service**: Scale stateless pods tự do.
- **Import Workers**: Pool worker riêng cho việc parsing file.

---

## Storage
- **Database**: 500GB/năm (Dữ liệu text ngân hàng câu hỏi).
- **File Storage**: 10TB/năm (Videos, Images).

---

## Load Testing Scenarios
### Scenario 1: Teacher Bulk Upload
**Description**: 50 giáo viên upload file import đồng thời vào đầu năm học.
**Success Criteria**:
- [ ] Không có timeout khi upload
- [ ] Import hoàn tất trong vòng 30s cho file tiêu chuẩn

---

## Validation Checklist
- [ ] Autoscaling worker pool đã được cấu hình
- [ ] Đã bật S3 upload acceleration (nếu cần)

---

## References

- [Overview](./README.md)
