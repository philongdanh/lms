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
| **US-LEARN-003** | Hành trình học tập | **Với tư cách là** học sinh<br/>**Tôi muốn** được đề xuất bài ôn tập dựa trên lịch sử làm bài sai<br/>**Để** cải thiện điểm yếu của mình hiệu quả | - Hệ thống phân tích lịch sử sai.<br/>- Đề xuất bài ôn tập có chủ đích.<br/>- Tiến độ ôn tập được theo dõi. |
| **US-LEARN-004** | Gamification | **Với tư cách là** học sinh<br/>**Tôi muốn** xem bảng thành tích (leaderboard) để thi đua<br/>**Để** tăng thêm động lực học tập và thi đấu | - Bảng xếp hạng cập nhật thời gian thực.<br/>- Hiển thị đa cấp (lớp/trường/toàn hệ thống).<br/>- Cá nhân hóa vị trí của tôi. |
| **US-LEARN-005** | Gamification | **Với tư cách là** học sinh<br/>**Tôi muốn** duy trì streak học tập để nhận huy hiệu<br/>**Để** tạo thói quen học tập đều đặn | - Hệ thống ghi nhận streak chính xác.<br/>- Thông báo khi đạt cột mốc (ví dụ: 7 ngày).<br/>- Huy hiệu được hiển thị trong hồ sơ. |
| **US-COMP-001** | Giải đấu (Tournament) | **Với tư cách là** học sinh<br/>**Tôi muốn** thi đấu thời gian thực với các học sinh khác<br/>**Để** tôi có thêm động lực học tập | - Hiển thị đếm ngược trong các vòng đấu.<br/>- Điểm số được cập nhật tức thì.<br/>- Bảng xếp hạng cập nhật thời gian thực. |
| **US-COMP-002** | Giải đấu (Tournament) | **Với tư cách là** học sinh<br/>**Tôi muốn** đăng ký tham gia các giải đấu<br/>**Để** tôi có thể tham gia tranh tài | - Đăng ký thành công.<br/>- Các nút Xem và Tham gia hoạt động đúng.<br/>- Mã mời được xác thực chính xác. |
| **US-COMP-003** | Giải đấu (Tournament) | **Với tư cách là** giáo viên/quản trị viên<br/>**Tôi muốn** cấu hình vòng thi (số câu, thời gian, loại câu hỏi)<br/>**Để** tạo giải đấu linh hoạt theo nhu cầu | - Giao diện cấu hình trực quan.<br/>- Lưu và áp dụng cấu hình thành công.<br/>- Hỗ trợ chọn tiêu chí xếp hạng (Top X/Điểm số). |
| **US-COMP-004** | Giải đấu (Tournament) | **Với tư cách là** học sinh<br/>**Tôi muốn** thách đấu bạn bè với cấu hình tùy chỉnh<br/>**Để** thi đấu vui mà không ảnh hưởng xếp hạng chính | - Tạo phòng thách đấu thành công.<br/>- Kết quả không tính vào leaderboard chính.<br/>- Có thể tùy chỉnh số câu và thời gian. |
| **US-PARENT-001** | Theo dõi của phụ huynh | **Với tư cách là** phụ huynh<br/>**Tôi muốn** theo dõi tiến độ học tập của con mình<br/>**Để** tôi có thể hỗ trợ việc học của con | - Xem được các báo cáo chi tiết.<br/>- Nhận thông báo thời gian thực.<br/>- Quyền truy cập báo cáo 4 cấp độ. |
| **US-PARENT-002** | Báo cáo | **Với tư cách là** phụ huynh<br/>**Tôi muốn** nhận báo cáo PDF định kỳ (tuần/tháng)<br/>**Để** theo dõi xu hướng học tập của con | - PDF được tự động tạo và gửi.<br/>- Đầy đủ thông tin: tiến độ, điểm số, streak.<br/>- Giao diện PDF chuyên nghiệp, dễ đọc. |
| **US-TEACH-001** | Quản lý nội dung | **Với tư cách là** giáo viên<br/>**Tôi muốn** đóng góp câu hỏi/bài giảng vào hệ thống<br/>**Để** chia sẻ kiến thức và mở rộng ngân hàng đề thi | - Giao diện tải lên/thêm mới dễ dùng.<br/>- Trạng thái "chờ phê duyệt" rõ ràng.<br/>- Được thông báo khi nội dung được duyệt/từ chối. |
| **US-ADMIN-001** | Quản trị đa thực thể | **Với tư cách là** super admin<br/>**Tôi muốn** xem dữ liệu tổng hợp của tất cả trường<br/>**Để** có cái nhìn toàn cảnh về hoạt động nền tảng | - Truy cập được dashboard tổng hợp.<br/>- Dữ liệu được tổng hợp đa chiều (học tập, thi đấu).<br/>- Có thể lọc theo thời gian, trường, khối lớp. |
| **US-ADMIN-002** | Tùy chỉnh giao diện | **Với tư cách là** quản trị viên trường<br/>**Tôi muốn** tùy chỉnh logo và màu sắc giao diện cho trường tôi<br/>**Để** tạo bản sắc riêng và nhận diện thương hiệu | - Giao diện cài đặt cho phép upload logo, chọn màu.<br/>- Thay đổi được áp dụng ngay lập tức.<br/>- Hỗ trợ định dạng ảnh và palette màu chuẩn. |
| **US-ADMIN-003** | Quản lý thiết bị | **Với tư cách là** người dùng<br/>**Tôi muốn** đăng xuất từ xa tất cả các thiết bị khác<br/>**Để** bảo vệ tài khoản nếu bị mất thiết bị | - Tính năng "Đăng xuất tất cả thiết bị" dễ tìm.<br/>- Xác nhận hành động rõ ràng.<br/>- Tất cả phiên đăng nhập khác bị chấm dứt. |

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

### UC-LEARN-003: Nhận đề xuất ôn tập AI

| Trường thông tin     | Giá trị                                                                                             |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| Tác nhân             | Học sinh                                                                                            |
| Điều kiện tiên quyết | Đã có lịch sử làm bài tập                                                                           |
| Tác nhân kích hoạt   | Hệ thống tự động đề xuất hoặc người dùng nhấn "Ôn tập"                                              |
| Luồng chính          | Phân tích lịch sử sai → Xác định chủ đề yếu → Lấy bài tập liên quan từ ngân hàng câu hỏi → Hiển thị |
| Điều kiện sau        | Danh sách bài ôn tập được hiển thị                                                                  |
| Ngoại lệ             | E1: Chưa có lịch sử sai, E2: Ngân hàng câu hỏi chưa có nội dung phù hợp                             |

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

### UC-COMP-002: Cấu hình giải đấu (dành cho Giáo viên/Quản trị viên)

| Trường thông tin     | Giá trị                                                                                             |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| Tác nhân             | Giáo viên, Quản trị viên trường                                                                     |
| Điều kiện tiên quyết | Đăng nhập với quyền tạo/cấu hình giải đấu                                                           |
| Tác nhân kích hoạt   | Người dùng nhấn "Tạo giải đấu mới" hoặc "Cấu hình giải đấu"                                         |
| Luồng chính          | Nhập thông tin cơ bản → Cấu hình vòng thi (số câu, thời gian, loại câu hỏi) → Chọn tiêu chí xếp hạng (Top X/Điểm số) → Lưu cấu hình |
| Điều kiện sau        | Giải đấu được tạo/cấu hình thành công và sẵn sàng cho đăng ký                                       |
| Ngoại lệ             | E1: Thiếu thông tin bắt buộc, E2: Cấu hình không hợp lệ (ví dụ: thời gian âm)                       |

### UC-AUTH-003: Quản lý phiên đăng nhập & đăng xuất từ xa

| Trường thông tin     | Giá trị                                                                                             |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| Tác nhân             | Người dùng đã đăng nhập                                                                             |
| Điều kiện tiên quyết | Đang đăng nhập trên ít nhất một thiết bị                                                            |
| Tác nhân kích hoạt   | Người dùng truy cập trang "Quản lý thiết bị" và nhấn "Đăng xuất tất cả thiết bị khác"               |
| Luồng chính          | Hiển thị danh sách các thiết bị đang đăng nhập → Xác nhận hành động → Hủy tất cả phiên JWT khác → Thông báo thành công |
| Điều kiện sau        | Tất cả phiên đăng nhập trên các thiết bị khác bị chấm dứt                                            |
| Ngoại lệ             | E1: Chỉ có một thiết bị đang đăng nhập, E2: Lỗi kết nối khi gửi lệnh hủy                            |

### UC-REP-001: Xem báo cáo 4 cấp và biểu đồ tiến độ

| Trường thông tin     | Giá trị                                                                                             |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| Tác nhân             | Phụ huynh, Giáo viên, Quản trị viên trường                                                          |
| Điều kiện tiên quyết | Đăng nhập và có quyền xem báo cáo                                                                   |
| Tác nhân kích hoạt   | Người dùng truy cập mục "Báo cáo"                                                                   |
| Luồng chính          | Chọn cấp báo cáo (học sinh/lớp/trường/toàn hệ thống) → Chọn khoảng thời gian → Hệ thống tạo biểu đồ và số liệu → Hiển thị |
| Điều kiện sau        | Báo cáo và biểu đồ được hiển thị                                                                    |
| Ngoại lệ             | E1: Không có dữ liệu trong khoảng thời gian đã chọn, E2: Người dùng không có quyền xem cấp đã chọn  |

### UC-CONT-001: Đóng góp nội dung (Giáo viên)

| Trường thông tin     | Giá trị                                                                                             |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| Tác nhân             | Giáo viên                                                                                           |
| Điều kiện tiên quyết | Đăng nhập với vai trò Giáo viên và được cấp quyền đóng góp                                          |
| Tác nhân kích hoạt   | Giáo viên nhấn "Đóng góp nội dung"                                                                  |
| Luồng chính          | Chọn loại nội dung (câu hỏi/bài giảng) → Nhập thông tin và tải lên → Gửi chờ phê duyệt → Nhận thông báo trạng thái |
| Điều kiện sau        | Nội dung được lưu với trạng thái "Chờ phê duyệt"                                                    |
| Ngoại lệ             | E1: Tệp video không đúng định dạng hoặc quá lớn, E2: Thiếu thông tin bắt buộc                       |

### UC-ADMIN-001: Super admin xem dữ liệu tổng hợp toàn hệ thống

| Trường thông tin     | Giá trị                                                                                             |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| Tác nhân             | Super Admin (Root Admin)                                                                            |
| Điều kiện tiên quyết | Đăng nhập với vai trò Super Admin                                                                   |
| Tác nhân kích hoạt   | Truy cập "Dashboard Tổng hợp"                                                                       |
| Luồng chính          | Tải dữ liệu từ tất cả các trường → Tổng hợp theo chỉ số (số người dùng, bài học hoàn thành, lượt thi đấu,...) → Hiển thị dashboard với biểu đồ và bảng số liệu |
| Điều kiện sau        | Dashboard tổng hợp được hiển thị                                                                     |
| Ngoại lệ             | E1: Lỗi kết nối cơ sở dữ liệu, E2: Không có dữ liệu để hiển thị                                    |

---

## References

- [Overview](/specs)
- [Requirements](./requirements.md)
- [Glossary](./glossary.md)