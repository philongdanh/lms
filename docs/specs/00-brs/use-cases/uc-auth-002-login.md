---
id: uc-auth-002
title: UC-AUTH-002 Đăng nhập
sidebar_label: UC-AUTH-002 Đăng nhập
sidebar_position: 2
---

# UC-AUTH-002: Đăng nhập người dùng

| Field                | Value                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------- |
| Tác nhân             | Người dùng đã đăng ký                                                                     |
| Điều kiện tiên quyết | Tài khoản đã tồn tại và được xác thực                                                     |
| Tác nhân kích hoạt   | Người dùng nhấn "Đăng nhập"                                                               |
| Luồng chính          | Nhập thông tin đăng nhập → Xác thực → Cấp mã thông báo → Chuyển hướng đến bảng điều khiển |
| Ngoại lệ             | E1: Thông tin không hợp lệ, E2: Tài khoản bị khóa                                         |

**Sơ đồ luồng xác thực:**

```d2
direction: right

Guest -> Register: Click Register
Register -> OTP: Submit Form
OTP -> Active: Verify Code
Active -> Dashboard: Login

Guest -> Login: Click Login
Login -> Dashboard: Valid Credentials
Login -> Locked: 5 Failed Attempts
```
