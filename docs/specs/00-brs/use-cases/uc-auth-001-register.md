---
id: uc-auth-001
title: UC-AUTH-001 Đăng ký
sidebar_label: UC-AUTH-001 Đăng ký
sidebar_position: 1
---

# UC-AUTH-001: Đăng ký người dùng

| Field                | Value                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| Tác nhân             | Người dùng khách                                                                                |
| Điều kiện tiên quyết | Người dùng chưa đăng nhập                                                                       |
| Tác nhân kích hoạt   | Người dùng nhấn "Đăng ký"                                                                       |
| Luồng chính          | Nhập email/SĐT, mật khẩu, tên → Gửi biểu mẫu → Nhận mã OTP → Xác thực OTP → Kích hoạt tài khoản |
| Điều kiện sau        | Tài khoản người dùng được tạo và kích hoạt                                                      |
| Ngoại lệ             | E1: Email đã tồn tại, E2: Mã OTP không hợp lệ                                                   |
