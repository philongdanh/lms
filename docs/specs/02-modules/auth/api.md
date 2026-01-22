---
id: api
title: API Endpoints
sidebar_label: API
sidebar_position: 1
---

# Auth - API Endpoints
 
Các giao diện lập trình cho hệ thống xác thực và phân quyền.


## Endpoints Summary

| Method | Endpoint        | Description        | Auth Required | Rate Limit |
| ------ | --------------- | ------------------ | ------------- | ---------- |
| POST   | `/login`        | Đăng nhập          | ❌            | 10/min     |
| POST   | `/register`     | Đăng ký            | ❌            | 5/min      |
| POST   | `/refresh`      | Refresh Token      | ✅ (Refresh)  | 20/min     |
| POST   | `/logout`       | Đăng xuất          | ✅            | 50/min     |
| GET    | `/sessions`     | Danh sách sessions | ✅            | 100/min    |
| DELETE | `/sessions/:id` | Thu hồi session    | ✅            | 50/min     |
| POST   | `/parents/link` | Liên kết phụ huynh | ✅            | 10/min     |


## Test Cases

| Test Case       | Description   | Request     | Expected Response |
| --------------- | ------------- | ----------- | ----------------- |
| TC-API-AUTH-001 | Login Valid   | Valid creds | 200 + tokens      |
| TC-API-AUTH-002 | Login Invalid | Wrong pass  | 401               |
| TC-API-AUTH-003 | Refresh Valid | Valid token | 200 + new tokens  |


## Security Requirements

- [x] Yêu cầu authentication
- [x] Input validation (Email format)
- [x] Rate limiting theo IP
- [x] Secure Headers


## References

- [Overview](/specs)
