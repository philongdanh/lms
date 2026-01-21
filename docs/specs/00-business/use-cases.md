---
id: use-cases
title: Use Cases
sidebar_label: Use Cases
sidebar_position: 3
---

# Use Cases

Kịch bản và sơ đồ luồng nghiệp vụ.

---

## User Stories

### Epic: Hành trình học tập

#### US-LEARN-001: Lộ trình học tập AI

**Với tư cách là** học sinh  
**Tôi muốn** xem lộ trình học tập được AI gợi ý  
**Để** tôi có thể học tập theo nhu cầu cá nhân

**Tiêu chí chấp nhận**:

- [ ] AI phân tích điểm mạnh và điểm yếu.
- [ ] Gợi ý các bài học phù hợp.
- [ ] Cập nhật dựa trên tiến độ học tập.

#### US-LEARN-002: Duyệt nội dung học tập

**Với tư cách là** học sinh  
**Tôi muốn** duyệt nội dung theo Môn, Khối lớp, Chủ đề và Bài học  
**Để** tôi có thể tìm thấy các tài liệu học tập phù hợp

**Tiêu chí chấp nhận**:

- [ ] Điều hướng hoạt động chính xác.
- [ ] Áp dụng bộ lọc theo học kỳ.
- [ ] Nội dung hiển thị đúng định dạng.

### Epic: Giải đấu (Tournament)

#### US-COMP-001: Thi đấu thời gian thực

**Với tư cách là** học sinh  
**Tôi muốn** thi đấu thời gian thực với các học sinh khác  
**Để** tôi có thêm động lực học tập

**Tiêu chí chấp nhận**:

- [ ] Hiển thị đếm ngược trong các vòng đấu.
- [ ] Điểm số được cập nhật tức thì.
- [ ] Bảng xếp hạng cập nhật thời gian thực.

#### US-COMP-002: Đăng ký giải đấu

**Với tư cách là** học sinh  
**Tôi muốn** đăng ký tham gia các giải đấu  
**Để** tôi có thể tham gia tranh tài

**Tiêu chí chấp nhận**:

- [ ] Đăng ký thành công.
- [ ] Các nút Xem và Tham gia hoạt động đúng.
- [ ] Mã mời được xác thực chính xác.

### Epic: Theo dõi của phụ huynh

#### US-PARENT-001: Theo dõi tiến độ

**Với tư cách là** phụ huynh  
**Tôi muốn** theo dõi tiến độ học tập của con mình  
**Để** tôi có thể hỗ trợ việc học của con

**Tiêu chí chấp nhận**:

- [ ] Xem được các báo cáo chi tiết.
- [ ] Nhận thông báo thời gian thực.
- [ ] Quyền truy cập báo cáo 4 cấp độ.

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
direction: down

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
