---
id: stories
title: Stories
sidebar_label: Stories
sidebar_position: 3
---

# Stories

Danh sách các User Stories chi tiết của hệ thống.

---

## Overview

### Hành trình học tập

| US ID | Epic | User Story | Tiêu chí chấp nhận |
| :--- | :--- | :--- | :--- |
| **US-LEARN-001** | Hành trình học tập | **Với tư cách là** học sinh<br/>**Tôi muốn** xem lộ trình học tập được AI gợi ý<br/>**Để** tôi có thể học tập theo nhu cầu cá nhân | - AI phân tích điểm mạnh và điểm yếu.<br/>- Gợi ý các bài học phù hợp.<br/>- Cập nhật dựa trên tiến độ học tập. |
| **US-LEARN-002** | Hành trình học tập | **Với tư cách là** học sinh<br/>**Tôi muốn** duyệt nội dung theo Môn → Khối lớp → Chủ đề → Bài học<br/>**Để** tôi có thể tìm thấy các tài liệu học tập phù hợp | - Điều hướng hoạt động chính xác.<br/>- Áp dụng bộ lọc theo học kỳ.<br/>- Nội dung hiển thị đúng định dạng. |
| **US-LEARN-003** | Hành trình học tập | **Với tư cách là** học sinh<br/>**Tôi muốn** được đề xuất bài ôn tập dựa trên lịch sử làm bài sai<br/>**Để** cải thiện điểm yếu của mình hiệu quả | - Hệ thống phân tích lịch sử sai.<br/>- Đề xuất bài ôn tập có chủ đích.<br/>- Tiến độ ôn tập được theo dõi. |

### Gamification

| US ID | Epic | User Story | Tiêu chí chấp nhận |
| :--- | :--- | :--- | :--- |
| **US-LEARN-004** | Gamification | **Với tư cách là** học sinh<br/>**Tôi muốn** xem bảng thành tích (leaderboard) để thi đua<br/>**Để** tăng thêm động lực học tập và thi đấu | - Bảng xếp hạng cập nhật thời gian thực.<br/>- Hiển thị đa cấp (lớp/trường/toàn hệ thống).<br/>- Cá nhân hóa vị trí của tôi. |
| **US-LEARN-005** | Gamification | **Với tư cách là** học sinh<br/>**Tôi muốn** duy trì streak học tập để nhận huy hiệu<br/>**Để** tạo thói quen học tập đều đặn | - Hệ thống ghi nhận streak chính xác.<br/>- Thông báo khi đạt cột mốc (ví dụ: 7 ngày).<br/>- Huy hiệu được hiển thị trong hồ sơ. |

### Giải đấu (Tournament)

| US ID | Epic | User Story | Tiêu chí chấp nhận |
| :--- | :--- | :--- | :--- |
| **US-COMP-001** | Giải đấu (Tournament) | **Với tư cách là** học sinh<br/>**Tôi muốn** thi đấu thời gian thực với các học sinh khác<br/>**Để** tôi có thêm động lực học tập | - Hiển thị đếm ngược trong các vòng đấu.<br/>- Điểm số được cập nhật tức thì.<br/>- Bảng xếp hạng cập nhật thời gian thực. |
| **US-COMP-002** | Giải đấu (Tournament) | **Với tư cách là** học sinh<br/>**Tôi muốn** đăng ký tham gia các giải đấu<br/>**Để** tôi có thể tham gia tranh tài | - Đăng ký thành công.<br/>- Các nút Xem và Tham gia hoạt động đúng.<br/>- Mã mời được xác thực chính xác. |
| **US-COMP-003** | Giải đấu (Tournament) | **Với tư cách là** giáo viên/quản trị viên<br/>**Tôi muốn** cấu hình vòng thi (số câu, thời gian, loại câu hỏi)<br/>**Để** tạo giải đấu linh hoạt theo nhu cầu | - Giao diện cấu hình trực quan.<br/>- Lưu và áp dụng cấu hình thành công.<br/>- Hỗ trợ chọn tiêu chí xếp hạng (Top X/Điểm số). |
| **US-COMP-004** | Giải đấu (Tournament) | **Với tư cách là** học sinh<br/>**Tôi muốn** thách đấu bạn bè với cấu hình tùy chỉnh<br/>**Để** thi đấu vui mà không ảnh hưởng xếp hạng chính | - Tạo phòng thách đấu thành công.<br/>- Kết quả không tính vào leaderboard chính.<br/>- Có thể tùy chỉnh số câu và thời gian. |

### Phụ huynh & Báo cáo

| US ID | Epic | User Story | Tiêu chí chấp nhận |
| :--- | :--- | :--- | :--- |
| **US-PARENT-001** | Theo dõi của phụ huynh | **Với tư cách là** phụ huynh<br/>**Tôi muốn** theo dõi tiến độ học tập của con mình<br/>**Để** tôi có thể hỗ trợ việc học của con | - Xem được các báo cáo chi tiết.<br/>- Nhận thông báo thời gian thực.<br/>- Quyền truy cập báo cáo 4 cấp độ. |
| **US-PARENT-002** | Báo cáo | **Với tư cách là** phụ huynh<br/>**Tôi muốn** nhận báo cáo PDF định kỳ (tuần/tháng)<br/>**Để** theo dõi xu hướng học tập của con | - PDF được tự động tạo và gửi.<br/>- Đầy đủ thông tin: tiến độ, điểm số, streak.<br/>- Giao diện PDF chuyên nghiệp, dễ đọc. |

### Giáo viên & Nội dung

| US ID | Epic | User Story | Tiêu chí chấp nhận |
| :--- | :--- | :--- | :--- |
| **US-TEACH-001** | Quản lý nội dung | **Với tư cách là** giáo viên<br/>**Tôi muốn** đóng góp câu hỏi/bài giảng vào hệ thống<br/>**Để** chia sẻ kiến thức và mở rộng ngân hàng đề thi | - Giao diện tải lên/thêm mới dễ dùng.<br/>- Trạng thái "chờ phê duyệt" rõ ràng.<br/>- Được thông báo khi nội dung được duyệt/từ chối. |

### Quản trị & Cài đặt

| US ID | Epic | User Story | Tiêu chí chấp nhận |
| :--- | :--- | :--- | :--- |
| **US-ADMIN-001** | Quản trị đa thực thể | **Với tư cách là** super admin<br/>**Tôi muốn** xem dữ liệu tổng hợp của tất cả trường<br/>**Để** có cái nhìn toàn cảnh về hoạt động nền tảng | - Truy cập được dashboard tổng hợp.<br/>- Dữ liệu được tổng hợp đa chiều (học tập, thi đấu).<br/>- Có thể lọc theo thời gian, trường, khối lớp. |
| **US-ADMIN-002** | Tùy chỉnh giao diện | **Với tư cách là** quản trị viên trường<br/>**Tôi muốn** tùy chỉnh logo và màu sắc giao diện cho trường tôi<br/>**Để** tạo bản sắc riêng và nhận diện thương hiệu | - Giao diện cài đặt cho phép upload logo, chọn màu.<br/>- Thay đổi được áp dụng ngay lập tức.<br/>- Hỗ trợ định dạng ảnh và palette màu chuẩn. |
| **US-ADMIN-003** | Quản lý thiết bị | **Với tư cách là** người dùng<br/>**Tôi muốn** đăng xuất từ xa tất cả các thiết bị khác<br/>**Để** bảo vệ tài khoản nếu bị mất thiết bị | - Tính năng "Đăng xuất tất cả thiết bị" dễ tìm.<br/>- Xác nhận hành động rõ ràng.<br/>- Tất cả phiên đăng nhập khác bị chấm dứt. |

---

## References

- [Use Cases](./use-cases/uc-auth-001-register.md)
