
# Auth - Test Cases
 
Kịch bản và chỉ số kiểm thử cho hệ thống xác thực.


## Test Categories

### 1. Kiểm thử chức năng

#### Kiểm thử logic nghiệp vụ

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

#### Kiểm thử API

| Test ID         | Endpoint                       | Method | Test Data             | Expected Response  | Status Code |
| --------------- | ------------------------------ | ------ | --------------------- | ------------------ | ----------- |
| TC-AUTH-API-001 | `/graphql` (registerWithEmail) | POST   | email, password, role | user + accessToken | 200         |
| TC-AUTH-API-002 | `/graphql` (login)             | POST   | email, password       | accessToken + user | 200         |
| TC-AUTH-API-003 | `/graphql` (refreshToken)      | POST   | refreshToken cookie   | new accessToken    | 200         |
| TC-AUTH-API-004 | `/graphql` (logout)            | POST   | Authorization header  | success: true      | 200         |
| TC-AUTH-API-005 | `/graphql` (me)                | POST   | Authorization header  | user profile       | 200         |
| TC-AUTH-API-006 | `/graphql` (resetPassword)     | POST   | email                 | success: true      | 200         |

### 2. Kiểm thử tích hợp

| Test ID         | Description             | Components            | Test Scenario                     | Expected Result        |
| --------------- | ----------------------- | --------------------- | --------------------------------- | ---------------------- |
| TC-AUTH-INT-001 | Email verification flow | Auth + Email Service  | Đăng ký → Nhận email → Click link | Account được verify    |
| TC-AUTH-INT-002 | Google OAuth flow       | Auth + Google OAuth   | Click Google login → Redirect     | Account được tạo/link  |
| TC-AUTH-INT-003 | Parent-Student link     | Auth + User Service   | Parent nhập code của student      | Accounts được link     |
| TC-AUTH-INT-004 | Multi-tenant isolation  | Auth + Tenant Service | Login vào tenant A                | Chỉ thấy data tenant A |

### 3. Kiểm thử hiệu năng

| Test ID          | Scenario             | Load Profile              | Success Criteria         |
| ---------------- | -------------------- | ------------------------- | ------------------------ |
| TC-AUTH-PERF-001 | Login spike          | 1000 concurrent logins    | P95 < 200ms, 0% errors   |
| TC-AUTH-PERF-002 | Token refresh storm  | 5000 concurrent refreshes | P95 < 100ms, 0% errors   |
| TC-AUTH-PERF-003 | Sustained login load | 100 req/s for 10 min      | CPU < 70%, Memory stable |

### 4. Kiểm thử bảo mật

| Test ID         | Security Aspect        | Test Method                   | Expected Result            |
| --------------- | ---------------------- | ----------------------------- | -------------------------- |
| TC-AUTH-SEC-001 | SQL Injection          | Gửi payload trong email field | Input được sanitize        |
| TC-AUTH-SEC-002 | JWT tampering          | Modify JWT payload            | Token bị reject            |
| TC-AUTH-SEC-003 | Brute force protection | 10 login attempts sai         | Account temporarily locked |
| TC-AUTH-SEC-004 | XSS in username        | Script tag trong name         | HTML được escape           |
| TC-AUTH-SEC-005 | CSRF protection        | Request không có CSRF token   | Request bị reject          |


## Test Automation

### Framework

- **UI Tests**: Playwright
- **API Tests**: Vitest + Supertest
- **Performance Tests**: k6

### CI/CD Integration

- [x] Tests chạy khi PR
- [x] Tests chạy khi merge to main
- [ ] Tests chạy hàng đêm (performance)


## Validation Checklist

- [x] Test coverage matrix complete
- [x] All specs have test cases
- [x] Test data requirements defined
- [x] Automation strategy specified



## Scalability Requirements

### Mở rộng theo chiều dọc

- **CPU**: Max 8 cores
- **Memory**: Max 16 GB
- **Storage**: Max 100 GB (logs + sessions)

### Mở rộng theo chiều ngang

- **Min Instances**: 2
- **Max Instances**: 10
- **Auto-scaling**: CPU > 70% for 2 min → scale up


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


## Infrastructure Requirements

### Production

- **Database**: PostgreSQL 15, 4 vCPU, 16GB RAM
- **Cache**: Redis 7, 2 vCPU, 8GB RAM
- **Session Store**: Redis Cluster

### Staging/Testing

- PostgreSQL 15, 2 vCPU, 4GB RAM
- Redis 7, 1 vCPU, 2GB RAM


## References

- [Overview](/specs)
