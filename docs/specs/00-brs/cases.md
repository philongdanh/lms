---
id: cases
title: Cases
sidebar_label: Cases
sidebar_position: 3
---

# Use Cases

Kịch bản và sơ đồ luồng nghiệp vụ.

---

| US ID | Epic | User Story | Tiêu chí chấp nhận |
| :--- | :--- | :--- | :--- |
| **US-LEARN-001** | Hành trình học tập | **Với tư cách là** học sinh<br/>**Tôi muốn** xem lộ trình học tập được AI gợi ý<br/>**Để** tôi có thể học tập theo nhu cầu cá nhân | - AI phân tích điểm mạnh và điểm yếu.<br/>- Gợi ý các bài học phù hợp.<br/>- Cập nhật dựa trên tiến độ học tập. |
| **US-LEARN-002** | Hành trình học tập | **Với tư cách là** học sinh<br/>**Tôi muốn** duyệt nội dung theo Môn → Khối lớp → Chủ đề → Bài học<br/>**Để** tôi có thể tìm thấy các tài liệu học tập phù hợp | - Điều hướng hoạt động chính xác.<br/>- Áp dụng bộ lọc theo học kỳ.<br/>- Nội dung hiển thị đúng định dạng. |
| **US-COMP-001** | Giải đấu (Tournament) | **Với tư cách là** học sinh<br/>**Tôi muốn** thi đấu thời gian thực với các học sinh khác<br/>**Để** tôi có thêm động lực học tập | - Hiển thị đếm ngược trong các vòng đấu.<br/>- Điểm số được cập nhật tức thì.<br/>- Bảng xếp hạng cập nhật thời gian thực. |
| **US-COMP-002** | Giải đấu (Tournament) | **Với tư cách là** học sinh<br/>**Tôi muốn** đăng ký tham gia các giải đấu<br/>**Để** tôi có thể tham gia tranh tài | - Đăng ký thành công.<br/>- Các nút Xem và Tham gia hoạt động đúng.<br/>- Mã mời được xác thực chính xác. |
| **US-PARENT-001** | Theo dõi của phụ huynh | **Với tư cách là** phụ huynh<br/>**Tôi muốn** theo dõi tiến độ học tập của con mình<br/>**Để** tôi có thể hỗ trợ việc học của con | - Xem được các báo cáo chi tiết.<br/>- Nhận thông báo thời gian thực.<br/>- Quyền truy cập báo cáo 4 cấp độ. |

---

## Use Case Catalog

### UC-AUTH-001: Đăng ký người dùng

| Field                | Value                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| Tác nhân             | Người dùng khách                                                                                |
| Điều kiện tiên quyết | Người dùng chưa đăng nhập                                                                       |
| Tác nhân kích hoạt   | Người dùng nhấn "Đăng ký"                                                                       |
| Luồng chính          | Nhập email/SĐT, mật khẩu, tên → Gửi biểu mẫu → Nhận mã OTP → Xác thực OTP → Kích hoạt tài khoản |
| Điều kiện sau        | Tài khoản người dùng được tạo và kích hoạt                                                      |
| Ngoại lệ             | E1: Email đã tồn tại, E2: Mã OTP không hợp lệ                                                   |

### UC-AUTH-002: Đăng nhập người dùng

| Field                | Value                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------- |
| Tác nhân             | Người dùng đã đăng ký                                                                     |
| Điều kiện tiên quyết | Tài khoản đã tồn tại và được xác thực                                                     |
| Tác nhân kích hoạt   | Người dùng nhấn "Đăng nhập"                                                               |
| Luồng chính          | Nhập thông tin đăng nhập → Xác thực → Cấp mã thông báo → Chuyển hướng đến bảng điều khiển |
| Điều kiện sau        | Người dùng đã được xác thực                                                               |
| Ngoại lệ             | E1: Thông tin không hợp lệ, E2: Tài khoản bị khóa                                         |

### UC-LEARN-001: Xem lộ trình học tập AI

| Trường thông tin     | Giá trị                                                                                             |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| Tác nhân             | Học sinh                                                                                            |
| Điều kiện tiên quyết | Đăng nhập với vai trò Học sinh                                                                      |
| Tác nhân kích hoạt   | Người dùng mở bảng điều khiển học tập                                                               |
| Luồng chính          | Tải hồ sơ người dùng → AI phân tích lịch sử học tập → Tạo lộ trình cá nhân hóa → Hiển thị các gợi ý |
| Điều kiện sau        | Lộ trình học tập AI được hiển thị                                                                   |
| Ngoại lệ             | E1: Chưa có lịch sử học tập, E2: Dịch vụ AI không khả dụng                                          |

### UC-COMP-001: Tham gia giải đấu

| Trường thông tin     | Giá trị                                                                        |
| -------------------- | ------------------------------------------------------------------------------ |
| Tác nhân             | Học sinh                                                                       |
| Điều kiện tiên quyết | Đã đăng nhập, giải đấu đang khả dụng                                           |
| Tác nhân kích hoạt   | Người dùng nhấn "Tham gia giải đấu"                                            |
| Luồng chính          | Chọn giải đấu → Xác thực điều kiện tham gia → Xác nhận đăng ký → Vào phòng chờ |
| Điều kiện sau        | Người dùng đã đăng ký tham gia giải đấu                                        |
| Ngoại lệ             | E1: Không đủ điều kiện, E2: Giải đấu đã đầy                                    |

---

## User Flow Diagrams

### Authentication Flow

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

### Learning Flow

```d2
direction: right

Dashboard -> Browse: View Content
Browse -> Subject: Select Subject
Subject -> Grade: Select Grade
Grade -> Topic: Select Topic
Topic -> Lesson: Start Lesson
Lesson -> Complete: Finish
Complete -> Dashboard: Progress Updated
```

---

## References

- [Overview](/specs)
- [Requirements](./requirements.md)
- [Glossary](./glossary.md)
