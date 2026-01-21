---
id: cases
title: Cases
sidebar_label: Cases
sidebar_position: 3
---

# Use Cases

Kịch bản và sơ đồ luồng nghiệp vụ.

---

## User Stories

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

### UC-LEARN-001: Xem lộ trình học tập AI

| Trường thông tin     | Giá trị                                                                                             |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| Tác nhân             | Học sinh                                                                                            |
| Điều kiện tiên quyết | Đăng nhập với vai trò Học sinh                                                                      |
| Tác nhân kích hoạt   | Người dùng mở bảng điều khiển học tập                                                               |
| Luồng chính          | Tải hồ sơ người dùng → AI phân tích lịch sử học tập → Tạo lộ trình cá nhân hóa → Hiển thị các gợi ý |
| Điều kiện sau        | Lộ trình học tập AI được hiển thị                                                                   |
| Ngoại lệ             | E1: Chưa có lịch sử học tập, E2: Dịch vụ AI không khả dụng                                          |

**Sơ đồ luồng gợi ý lộ trình AI:**

```d2
direction: right

Dashboard -> AI_Service: Load Student Profile
AI_Service -> Analysis: Process History
Analysis -> PathGen: Generate Recommendations
PathGen -> Dashboard: Display AI Path
```

### UC-COMP-001: Tham gia giải đấu

| Trường thông tin     | Giá trị                                                                        |
| -------------------- | ------------------------------------------------------------------------------ |
| Tác nhân             | Học sinh                                                                       |
| Điều kiện tiên quyết | Đã đăng nhập, giải đấu đang khả dụng                                           |
| Tác nhân kích hoạt   | Người dùng nhấn "Tham gia giải đấu"                                            |
| Luồng chính          | Chọn giải đấu → Xác thực điều kiện tham gia → Xác nhận đăng ký → Vào phòng chờ |
| Điều kiện sau        | Người dùng đã đăng ký tham gia giải đấu                                        |
| Ngoại lệ             | E1: Không đủ điều kiện, E2: Giải đấu đã đầy                                    |

**Sơ đồ luồng tham gia thi đấu:**

```d2
direction: right

Dashboard -> Tournament: View Competitions
Tournament -> Register: Click Register
Register -> Waiting: Join Room
Waiting -> Battle: Game Starts
Battle -> Result: Finish
Result -> Leaderboard: See Ranking
```

### UC-LEARN-002: Duyệt nội dung học tập

| Trường thông tin     | Giá trị                                                                        |
| -------------------- | ------------------------------------------------------------------------------ |
| Tác nhân             | Học sinh                                                                       |
| Điều kiện tiên quyết | Đã đăng nhập                                                                   |
| Tác nhân kích hoạt   | Người dùng chọn "Duyệt nội dung"                                               |
| Luồng chính          | Chọn Môn → Chọn Khối lớp → Chọn Chủ đề → Chọn Bài học → Hiển thị nội dung      |
| Điều kiện sau        | Nội dung bài học được hiển thị                                                 |
| Ngoại lệ             | E1: Không có nội dung cho bộ lọc đã chọn                                       |

**Sơ đồ luồng duyệt nội dung:**

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

### UC-PARENT-001: Theo dõi tiến độ học tập

| Trường thông tin     | Giá trị                                                                        |
| -------------------- | ------------------------------------------------------------------------------ |
| Tác nhân             | Phụ huynh                                                                      |
| Điều kiện tiên quyết | Đã đăng nhập và liên kết với học sinh                                          |
| Tác nhân kích hoạt   | Phụ huynh mở bảng điều khiển phụ huynh                                         |
| Luồng chính          | Tải danh sách học sinh liên kết → Chọn học sinh → Tải báo cáo → Hiển thị biểu đồ |
| Điều kiện sau        | Báo cáo tiến độ được hiển thị                                                  |
| Ngoại lệ             | E1: Chưa liên kết học sinh, E2: Dữ liệu báo cáo chưa sẵn sàng                  |

**Sơ đồ luồng giám sát của phụ huynh:**

```d2
direction: right

Dashboard -> StudentList: Select Child
StudentList -> Report: View Statistics
Report -> Detail: View Subject Proficiency
Detail -> Goal: Set Weekly Goal
```

---

## References

- [Overview](/specs)
- [Requirements](./requirements.md)
- [Glossary](./glossary.md)
