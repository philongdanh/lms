---
id: tests
title: Test Cases
sidebar_label: Tests
sidebar_position: 4
---

# Learning & Personalization - Test Cases
 
Kịch bản kiểm thử hệ thống học tập và cá nhân hóa.


## Test Categories

### 1. Kiểm thử chức năng

#### Kiểm thử logic nghiệp vụ

| Test ID          | Description                      | Preconditions       | Test Steps               | Expected Result                       | Priority |
| ---------------- | -------------------------------- | ------------------- | ------------------------ | ------------------------------------- | -------- |
| TC-LEARN-FUN-001 | Xác minh logic Personalized Path | User có lịch sử     | 1. Gọi Get Path          | Trả về danh sách phù hợp với điểm yếu | P0       |
| TC-LEARN-FUN-002 | Tính điểm Quiz                   | Session đang active | 1. Submit Correct Answer | Điểm tăng, trả về is_correct=true     | P0       |

#### Kiểm thử API

| Test ID          | Endpoint           | Method | Test Data        | Expected Result | Status Code |
| ---------------- | ------------------ | ------ | ---------------- | --------------- | ----------- |
| TC-LEARN-API-001 | `/path`            | GET    | Token hợp lệ     | JSON với path   | 200         |
| TC-LEARN-API-002 | `/practice/submit` | POST   | Câu trả lời đúng | JSON result     | 200         |
| TC-LEARN-API-003 | `/practice/submit` | POST   | Session hết hạn  | Error JSON      | 400         |

### 2. Kiểm thử tích hợp

| Test ID          | Description                    | Components          | Test Scenario                           | Expected Result                     |
| ---------------- | ------------------------------ | ------------------- | --------------------------------------- | ----------------------------------- |
| TC-LEARN-INT-001 | Tiến độ cập nhật Knowledge Map | Learning, Analytics | Submit Answer -> Kiểm tra Knowledge Map | Knowledge Map mastery được cập nhật |

### 3. Kiểm thử hiệu năng

| Test ID           | Scenario                | Load Profile | Tiêu chí thành công |
| ----------------- | ----------------------- | ------------ | ------------------- |
| TC-LEARN-PERF-001 | Submit Answer High Load | 2000 RPS     | P95 < 200ms         |

### 4. Kiểm thử bảo mật

| Test ID          | Security Aspect  | Test Method            | Expected Result |
| ---------------- | ---------------- | ---------------------- | --------------- |
| TC-LEARN-SEC-001 | IDOR on Progress | Get path của user khác | 403 Forbidden   |


## Test Automation

### Framework

- **API Tests**: Jest / Supertest
- **Performance Tests**: k6


## Validation Checklist

- [ ] Test coverage matrix hoàn chỉnh
- [ ] Security tests được bao gồm



## Scalability Requirements

### Mở rộng theo chiều dọc

- **CPU**: Tối ưu cho single-core logic (Node.js) nhưng tính toán nặng trên AI
  Service.
- **Memory**: Sử dụng cache nhiều (Redis).

### Mở rộng theo chiều ngang

- **Learning Service**: Stateless, scale auto (min 2, max 20).
- **AI Service**: Scale consumer workers dựa trên queue lag.


## Load Testing Scenarios

### Scenario 1: Mass Examination

**Description**: 20,000 students nộp bài thi đồng thời trong 15 phút. **Test
Parameters**:

- Duration: 15 phút
- Ramp-up: 5000 users/phút
- Peak: 20000 concurrent users

**Tiêu chí thành công**:

- [ ] P95 response time < 300ms
- [ ] Error rate < 0.1%
- [ ] Không mất dữ liệu (progress saves)


## Validation Checklist

- [ ] Tất cả performance targets được định lượng
- [ ] Các load testing scenarios được tạo cho Peak Load

