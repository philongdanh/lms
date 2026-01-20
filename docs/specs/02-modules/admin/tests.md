---
id: admin-tests
title: Admin Test Cases
sidebar_label: Tests
---

# Admin & Tenant Management - Test Cases

## Overview
Các test case cho module Admin.

## Test Coverage Matrix
| Specification | Test Cases | Coverage | Status |
|---------------|------------|---------|--------|
| Business Logic | 4 | 100% | Planned |
| API Endpoints | 4 | 100% | Planned |
| Workflows | 2 | 100% | Planned |

## Test Categories

### 1. Functional Tests
#### Business Logic
| Test ID | Description | Rules | Expected Result | Priority |
|---------|-------------|-------|-----------------|----------|
| TC-ADM-FUN-001 | Tạo Tenant | BR-ADMIN-001 | Thành công nếu mã là duy nhất | P0 |
| TC-ADM-FUN-002 | Mã Tenant trùng lặp | BR-ADMIN-001 | Lỗi "Code Exists" | P1 |
| TC-ADM-FUN-003 | Giới hạn Import Users | BR-ADMIN-004 | Lỗi nếu > 500 dòng | P1 |

### 2. Integration Tests
| Test ID | Description | Components | Result |
|---------|-------------|------------|--------|
| TC-ADM-INT-001 | Tạo Tenant gửi email | Admin, Email | Email nhận được |

### 4. Security Tests
| Test ID | Aspect | Method | Result |
|---------|--------|--------|--------|
| TC-ADM-SEC-001 | Tenant Admin không thể tạo Tenant | POST /tenants | 403 Forbidden |


## Validation Checklist
- [ ] Kiểm tra quyền hạn cho tất cả endpoints


---

# Performance Requirements

## Overview
Các thông số hiệu năng cho module Admin.

## Performance Targets

### Response Times
| Operation | P50 | P95 | P99 | Max | Measurement |
|-----------|-----|-----|-----|-----|-------------|
| Create Tenant | 500ms | 1s | 2s | 5s | API End-to-end |
| Import Users (500) | 2s | 5s | 8s | 15s | Job Duration |
| List Tenants | 50ms | 100ms | 300ms | 1s | DB Query |

### Throughput Requirements
| Scenario | Requests/sec | Concurrent Users | Data Volume |
|----------|--------------|------------------|-------------|
| Admin Operations | 50 | 20 (Root Admins) | Thấp |

## Scalability Requirements
### Horizontal Scaling
- **Admin Service**: Scale dựa trên tải, thường có lưu lượng thấp.

## Resource Utilization Limits
| Resource | Warning Threshold | Critical Threshold | Required Action |
|----------|-------------------|--------------------|-----------------|
| CSV Parser Memory | 500MB | 1GB | Từ chối file lớn |

## Load Testing Scenarios
### Scenario 1: Bulk Import
**Description**: Nhiều Tenant Admin import user đồng thời.
**Success Criteria**:
- [ ] Không có DB Deadlocks
- [ ] Email queue xử lý ổn định


## Validation Checklist
- [ ] Xác minh việc thực thi giới hạn kích thước file tối đa

## References

- [Overview](./overview.md)
