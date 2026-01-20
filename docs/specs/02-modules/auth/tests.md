---
id: auth-tests
title: Auth Test Cases
sidebar_label: Tests
sidebar_position: 5
---

# Auth - Test Cases

---

## Overview

Test cases được derive từ specifications của module Auth

---

## Test Coverage Matrix

| Specification  | Test Cases | Covered | Status      |
| -------------- | ---------- | ------- | ----------- |
| Business Logic | 15         | 80%     | In Progress |
| API Endpoints  | 12         | 90%     | Done        |
| Workflows      | 8          | 70%     | In Progress |

---

## Test Categories

### 1. Functional Tests

#### Business Logic Tests

| Test ID         | Description             | Preconditions               | Test Steps                           | Expected Result                       | Priority |
| --------------- | ----------------------- | --------------------------- | ------------------------------------ | ------------------------------------- | -------- |
| TC-AUTH-FUN-001 | Đăng ký email hợp lệ    | Email chưa tồn tại          | 1. POST /register với email/password | User được tạo, email verification gửi | P0       |
| TC-AUTH-FUN-002 | Đăng ký email trùng     | Email đã tồn tại            | 1. POST /register với email đã có    | Trả về lỗi CONFLICT                   | P0       |
| TC-AUTH-FUN-003 | Đăng nhập thành công    | Account verified            | 1. POST /login với credentials đúng  | Trả về JWT + refresh token            | P0       |
| TC-AUTH-FUN-004 | Đăng nhập sai password  | Account tồn tại             | 1. POST /login với password sai      | Trả về lỗi UNAUTHORIZED               | P0       |
| TC-AUTH-FUN-005 | Rate limiting login     | -                           | 1. Gọi login sai 6 lần trong 1 phút  | Lần 6 trả về 429                      | P1       |
| TC-AUTH-FUN-006 | Password validation     | -                           | 1. Đăng ký với password yếu          | Trả về lỗi PASSWORD_TOO_WEAK          | P1       |
| TC-AUTH-FUN-007 | Multi-device session    | User đã login trên device A | 1. Login từ device B                 | Cả 2 sessions đều active              | P1       |
| TC-AUTH-FUN-008 | Logout invalidate token | User đã login               | 1. POST /logout                      | refreshToken bị revoke                | P1       |

#### API Tests

| Test ID         | Endpoint                       | Method | Test Data             | Expected Response  | Status Code |
| --------------- | ------------------------------ | ------ | --------------------- | ------------------ | ----------- |
| TC-AUTH-API-001 | `/graphql` (registerWithEmail) | POST   | email, password, role | user + accessToken | 200         |
| TC-AUTH-API-002 | `/graphql` (login)             | POST   | email, password       | accessToken + user | 200         |
| TC-AUTH-API-003 | `/graphql` (refreshToken)      | POST   | refreshToken cookie   | new accessToken    | 200         |
| TC-AUTH-API-004 | `/graphql` (logout)            | POST   | Authorization header  | success: true      | 200         |
| TC-AUTH-API-005 | `/graphql` (me)                | POST   | Authorization header  | user profile       | 200         |
| TC-AUTH-API-006 | `/graphql` (resetPassword)     | POST   | email                 | success: true      | 200         |

### 2. Integration Tests

| Test ID         | Description             | Components            | Test Scenario                     | Expected Result        |
| --------------- | ----------------------- | --------------------- | --------------------------------- | ---------------------- |
| TC-AUTH-INT-001 | Email verification flow | Auth + Email Service  | Đăng ký → Nhận email → Click link | Account được verify    |
| TC-AUTH-INT-002 | Google OAuth flow       | Auth + Google OAuth   | Click Google login → Redirect     | Account được tạo/link  |
| TC-AUTH-INT-003 | Parent-Student link     | Auth + User Service   | Parent nhập code của student      | Accounts được link     |
| TC-AUTH-INT-004 | Multi-tenant isolation  | Auth + Tenant Service | Login vào tenant A                | Chỉ thấy data tenant A |

### 3. Performance Tests

| Test ID          | Scenario             | Load Profile              | Success Criteria         |
| ---------------- | -------------------- | ------------------------- | ------------------------ |
| TC-AUTH-PERF-001 | Login spike          | 1000 concurrent logins    | P95 < 200ms, 0% errors   |
| TC-AUTH-PERF-002 | Token refresh storm  | 5000 concurrent refreshes | P95 < 100ms, 0% errors   |
| TC-AUTH-PERF-003 | Sustained login load | 100 req/s for 10 min      | CPU < 70%, Memory stable |

### 4. Security Tests

| Test ID         | Security Aspect        | Test Method                   | Expected Result            |
| --------------- | ---------------------- | ----------------------------- | -------------------------- |
| TC-AUTH-SEC-001 | SQL Injection          | Gửi payload trong email field | Input được sanitize        |
| TC-AUTH-SEC-002 | JWT tampering          | Modify JWT payload            | Token bị reject            |
| TC-AUTH-SEC-003 | Brute force protection | 10 login attempts sai         | Account temporarily locked |
| TC-AUTH-SEC-004 | XSS in username        | Script tag trong name         | HTML được escape           |
| TC-AUTH-SEC-005 | CSRF protection        | Request không có CSRF token   | Request bị reject          |

---

## Test Data Requirements

### Data Sets

| Data Set         | Purpose           | Size         | Refresh Frequency |
| ---------------- | ----------------- | ------------ | ----------------- |
| Test Users       | Functional tests  | 100 users    | Per test run      |
| Load Test Users  | Performance tests | 10,000 users | Weekly            |
| Edge Case Emails | Email validation  | 50 records   | Monthly           |

### Test Users

| Role    | Username            | Password | Permissions                  |
| ------- | ------------------- | -------- | ---------------------------- |
| Student | student@test.lms.vn | Test@123 | learning:\*, tournament:join |
| Parent  | parent@test.lms.vn  | Test@123 | reports:view, children:\*    |
| Teacher | teacher@test.lms.vn | Test@123 | class:\*, content:create     |
| Admin   | admin@test.lms.vn   | Test@123 | school:_, users:_            |
| Root    | root@test.lms.vn    | Test@123 | _:_                          |

---

## Test Automation

### Framework

- **UI Tests**: Playwright
- **API Tests**: Vitest + Supertest
- **Performance Tests**: k6

### CI/CD Integration

- [x] Tests chạy khi PR
- [x] Tests chạy khi merge to main
- [ ] Tests chạy hàng đêm (performance)

---

## Reporting Requirements

### Test Results Format

```json
{
  "test_id": "TC-AUTH-001",
  "status": "pass/fail",
  "duration": "ms",
  "environment": "staging/prod",
  "timestamp": "ISO8601"
}
```

### Metrics to Monitor

- Test pass rate
- Defect density
- Test execution time
- Test coverage

---

## Validation Checklist

- [x] Test coverage matrix complete
- [x] All specs have test cases
- [x] Test data requirements defined
- [x] Automation strategy specified

---

# Performance Requirements

---

## Overview

Performance specifications cho module Auth

---

## Performance Targets

### Response Times

| Operation     | P50   | P95   | P99   | Max   | Measurement |
| ------------- | ----- | ----- | ----- | ----- | ----------- |
| Login         | 50ms  | 150ms | 300ms | 500ms | End-to-end  |
| Token Refresh | 20ms  | 50ms  | 100ms | 200ms | End-to-end  |
| Register      | 100ms | 250ms | 400ms | 800ms | End-to-end  |
| Get Profile   | 30ms  | 80ms  | 150ms | 300ms | End-to-end  |

### Throughput Requirements

| Scenario                 | Requests/sec | Concurrent Users | Data Volume |
| ------------------------ | ------------ | ---------------- | ----------- |
| Normal Load              | 500          | 2000             | 100MB/hour  |
| Peak Load                | 2000         | 10000            | 500MB/hour  |
| Spike (Tournament start) | 5000         | 25000            | 1GB/hour    |

---

## Scalability Requirements

### Vertical Scaling

- **CPU**: Max 8 cores
- **Memory**: Max 16 GB
- **Storage**: Max 100 GB (logs + sessions)

### Horizontal Scaling

- **Min Instances**: 2
- **Max Instances**: 10
- **Auto-scaling**: CPU > 70% for 2 min → scale up

---

## Resource Utilization Limits

| Resource          | Warning Threshold | Critical Threshold | Required Action        |
| ----------------- | ----------------- | ------------------ | ---------------------- |
| CPU Usage         | 70%               | 90%                | Scale up               |
| Memory Usage      | 75%               | 90%                | Add memory             |
| Redis Connections | 80%               | 95%                | Scale Redis            |
| DB Connections    | 70%               | 85%                | Connection pool resize |

---

## Load Testing Scenarios

### Scenario 1: Peak Login (Tournament Start)

**Description**: Mô phỏng spike khi tournament bắt đầu, nhiều user login cùng
lúc **Test Parameters**:

- Duration: 10 phút
- Ramp-up: 500 users/minute
- Peak: 5000 concurrent users

**Success Criteria**:

- [x] P95 response time < 200ms
- [x] Error rate < 0.5%
- [x] Throughput > 2000 req/sec

### Scenario 2: Sustained Load (School Hours)

**Description**: Load ổn định trong giờ học (8AM-5PM) **Test Parameters**:

- Duration: 60 phút
- Steady: 1000 concurrent users

**Success Criteria**:

- [x] P95 response time < 150ms
- [x] Error rate < 0.1%
- [x] Memory leak: 0

---

## Monitoring & Alerting

### Metrics to Monitor

- [x] Response time percentiles
- [x] Error rates by endpoint
- [x] Throughput
- [x] JWT validation failures
- [x] Rate limit triggers

### Alerting Rules

| Metric              | Warning   | Critical  | Notification Channel |
| ------------------- | --------- | --------- | -------------------- |
| P95 Response Time   | > 150ms   | > 300ms   | Slack #alerts        |
| Error Rate          | > 0.5%    | > 2%      | PagerDuty            |
| Rate Limit Triggers | > 100/min | > 500/min | Slack #security      |

---

## Infrastructure Requirements

### Production

- **Database**: PostgreSQL 15, 4 vCPU, 16GB RAM
- **Cache**: Redis 7, 2 vCPU, 8GB RAM
- **Session Store**: Redis Cluster

### Staging/Testing

- PostgreSQL 15, 2 vCPU, 4GB RAM
- Redis 7, 1 vCPU, 2GB RAM

---

## Validation Checklist

- [x] All performance targets quantified
- [x] Scalability requirements specified
- [x] Monitoring metrics defined
- [x] Load testing scenarios created

---

## References

- [Overview](/specs)
