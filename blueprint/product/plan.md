---
id: plan
title: Plan
sidebar_label: Plan
sidebar_position: 4
---

# Plan

Kế hoạch triển khai chi tiết theo Sprint

---

## Point System

| Points   | Description                 |
| :------- | :-------------------------- |
| **8-13** | **P0**: Nghiêm trọng        |
| **5-8**  | **P1**: Cao - Phải có       |
| **3-5**  | **P2**: Trung bình - Nên có |
| **1-3**  | **P3**: Thấp - Có thì tốt   |

---

## Sprint 2: Auth & Users

> **Focus**: Xây dựng nền tảng Identity, Security và quản lý Sessions

| ID       | User Story                                    | Points | Acceptance Criteria                                                                                                                                                                                                                         |
| :------- | :-------------------------------------------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `US-001` | **Đăng ký**: Tạo tài khoản mới bằng Email     | 8      | - Nhập Email, Mật khẩu, Xác nhận mật khẩu<br/>- Validate định dạng email và độ mạnh mật khẩu<br/>- Gửi OTP về email. Tài khoản chỉ kích hoạt sau khi xác thực xong<br/>- **Constraint**: Chỉ hỗ trợ đăng ký bằng Email (chưa có Social/SĐT) |
| `US-002` | **Xác thực OTP**: Verify danh tính            | 8      | - Nhập 6 chữ số. Countdown timer (60s) gửi lại<br/>- Logic kiểm tra mã với Redis/DB<br/>- Khóa tạm thời sau 3 lần nhập sai liên tiếp                                                                                                        |
| `US-003` | **Đăng nhập**: Email/Pass vào dashboard       | 8      | - Hỗ trợ đăng nhập Email/Password<br/>- Trả về JWT Access Token & Refresh Token<br/>- Xử lý bảo mật các case "Tài khoản bị khóa" hoặc "Sai mật khẩu"                                                                                        |
| `US-004` | **Quên mật khẩu**: Reset qua email            | 5      | - Nhập email nhận link reset hoặc OTP<br/>- Xác minh token bảo mật hợp lệ trước khi cho đổi pass<br/>- Vô hiệu hóa session cũ ngay sau khi đổi thành công                                                                                   |
| `US-005` | **Đăng xuất**: Thoát an toàn                  | 5      | - Thu hồi Refresh Token trong Database/Redis<br/>- Xóa Cookies / LocalStorage phía client<br/>- Redirect về trang chủ Public                                                                                                                |
| `US-006` | **Session**: Admin quản lý user session       | 8      | - Danh sách active sessions lưu trong Redis<br/>- Cơ chế xoay vòng (rotation) Refresh Token<br/>- Giới hạn tối đa 3 thiết bị đồng thời                                                                                                      |
| `US-007` | **Protected Routes**: Chặn truy cập chưa auth | 8      | - Middleware kiểm tra JWT hợp lệ mỗi request<br/>- Redirect về trang Login nếu token thiếu/hết hạn<br/>- Phân quyền access dựa trên Role (Admin/Student)                                                                                    |

## Sprint 3: Learning Core

> **Focus**: Tính năng LMS cốt lõi - Subjects, Lessons và Quizzes

| ID       | User Story                             | Points | Acceptance Criteria                                                                                                                                  |
| :------- | :------------------------------------- | :----- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| `US-008` | **Danh sách môn**: Xem môn học         | 5      | - Hiển thị danh sách 3 môn: Toán, Tiếng Việt, Tiếng Anh<br/>- Bộ lọc theo Khối lớp và Cấp độ<br/>- Skeleton loading khi đang fetch dữ liệu           |
| `US-009` | **Lộ trình**: Xem cây bài học          | 8      | - Hiển thị bài học dạng cây (Tree) hoặc Timeline<br/>- Trạng thái rõ ràng: Locked, Unlocked, Completed<br/>- Chặn click vào các bài đang bị khóa     |
| `US-010` | **Bài học**: Xem nội dung (Text/Video) | 8      | - Hỗ trợ nội dung Rich Text, Hình ảnh, Embed Video<br/>- Điều hướng bài trước/sau thuận tiện<br/>- Tối ưu load time &lt;3s (FCP)                     |
| `US-011` | **Quiz**: Trắc nghiệm                  | 8      | - Hiển thị câu hỏi + 4 lựa chọn trả lời<br/>- Client-side validation (chế độ luyện tập) cho phản hồi nhanh<br/>- Submit kết quả lên API để tính điểm |
| `US-012` | **Tiến độ**: Ghi nhận kết quả          | 8      | - Lưu vị trí "Học lần cuối" (Last Watched)<br/>- Đánh dấu "Hoàn thành" khi đủ điều kiện (ví dụ: pass quiz)<br/>- Cập nhật % tiến độ tổng của môn học |

## Sprint 4: Polish & Gamification

> **Focus**: Hệ thống Scoring, Leveling và Polish cho bản phát hành MVP

| ID       | User Story                      | Points | Acceptance Criteria                                                                                                                     |
| :------- | :------------------------------ | :----- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `US-013` | **Tính điểm**: Thưởng hoạt động | 5      | - Công thức: Điểm cơ bản + Bonus (tốc độ/streak)<br/>- Lưu lịch sử làm bài chi tiết<br/>- Rate limit submissions để chống spam/gian lận |
| `US-014` | **Level Up**: Lên cấp theo XP   | 5      | - Logic tính XP và các mốc Level (ví dụ: Lvl 1 = 100xp)<br/>- Hiệu ứng/Thông báo chúc mừng khi lên cấp                                  |

## Sprint 5-6: Tournament

> **Focus**: Tính năng Realtime, WebSockets, Leaderboards (Mở rộng Post-MVP)

| ID       | User Story                              | Points | Acceptance Criteria                                                                                                                                                                        |
| :------- | :-------------------------------------- | :----- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `US-015` | **Danh sách giải**: Live/Upcoming/Ended | 5      | - Phân loại: Đang diễn ra, Sắp diễn ra, Đã kết thúc<br/>- Metadata: Thời gian, Giải thưởng, Số lượng user<br/>- Hỗ trợ hiển thị tốt với lượng truy cập cao                                 |
| `US-016` | **Chi tiết giải**: Luật & Thưởng        | 5      | - Hiển thị mô tả chi tiết, luật lệ thi đấu<br/>- Preview bảng xếp hạng tạm thời (nếu đang diễn ra)                                                                                         |
| `US-017` | **Đăng ký**: Join giải đấu              | 5      | - Kiểm tra điều kiện: Level tối thiểu, Vé tham dự<br/>- Trừ vé/phí (nếu có) và thêm user vào danh sách<br/>- Chặn đăng ký nếu đã full slot hoặc quá hạn                                    |
| `US-018` | **Gameplay**: Thi đấu realtime          | 13     | - WebSocket đồng bộ câu hỏi cho tất cả người chơi<br/>- Giới hạn thời gian trả lời (ví dụ: 10s). Feedback Đúng/Sai ngay lập tức<br/>- Độ trễ thấp (&lt;100ms), xử lý mất kết nối/reconnect |
| `US-019` | **Rank Realtime**: BXH trực tiếp        | 8      | - Ranking bằng Redis Sorted Set (ZSET)<br/>- Broadcast Top 10 + Hạng cá nhân sau mỗi câu hỏi<br/>- Chịu tải cao (10,000 CCU)                                                               |
| `US-020` | **Kết quả**: Chốt giải                  | 8      | - Chốt bảng xếp hạng final khi giải kết thúc<br/>- Lưu lịch sử thi đấu vào DB chính<br/>- Trigger job trả thưởng (async)                                                                   |

## Sprint 7: Advanced Features

> **Focus**: Các tính năng Retention nâng cao và công cụ cho Parent

| ID       | User Story                        | Points | Acceptance Criteria                                                                                                                                       |
| :------- | :-------------------------------- | :----- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `US-021` | **Video Player**: Streaming       | 5      | - Tích hợp Video Player (stream từ cloud storage)<br/>- Controls: Play, Pause, Seek, Volume<br/>- Lưu timestamp đang xem dở                               |
| `US-022` | **Streak**: Chuỗi học tập         | 5      | - Đếm số ngày liên tiếp có hoạt động học<br/>- Hiển thị bộ đếm Streak nổi bật trên Dashboard<br/>- Cảnh báo/Nhắc nhở khi chuỗi sắp bị ngắt                |
| `US-023` | **Hồ sơ**: Edit Profile           | 5      | - Upload ảnh Avatar cá nhân<br/>- Cập nhật Tên hiển thị<br/>- Xem thống kê: Ngày tham gia, Tổng XP, Rank                                                  |
| `US-024` | **Huy hiệu**: Badges              | 5      | - Trao huy hiệu theo tiêu chí (ví dụ: "7 ngày liên tiếp", "100 điểm")<br/>- Tab "Thành tích" trong profile<br/>- Popup chúc mừng khi mở khóa huy hiệu mới |
| `US-025` | **Liên kết con**: Parent Link     | 5      | - Tạo mã mời (Invite Code) từ tài khoản Con<br/>- Phụ huynh nhập mã để gửi yêu cầu liên kết<br/>- Xác thực 2 chiều để tránh liên kết trái phép            |
| `US-026` | **Báo cáo con**: Parent Dashboard | 5      | - Dashboard phụ huynh hiển thị hoạt động của con<br/>- Biểu đồ thời gian học, XP tuần<br/>- Cảnh báo nếu con không hoạt động trong X ngày                 |

---

## Backlog (Future)

| ID       | User Story                       | Points | Acceptance Criteria                                                                                                                                                                                                                                                   |
| :------- | :------------------------------- | :----- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `US-027` | **Đăng ký SĐT**: Mobile phone    | 3      | - Nhập số điện thoại Việt Nam (+84/0...). Validate format<br/>- Gửi OTP qua SMS (tích hợp mock hoặc provider thật)<br/>- Countdown 60s cho phép gửi lại<br/>- Tự động tạo tài khoản nếu SĐT chưa tồn tại<br/>- Yêu cầu thiết lập mật khẩu sau khi xác thực thành công |
| `US-028` | **Dark Mode**: Theme toggle      | 3      | - Toggle Switch chuyển đổi Light/Dark trong Header hoặc Settings<br/>- Lưu preference vào localStorage (cho guest) và DB (cho user)<br/>- Tự động detect system preference (OS theme) lần đầu<br/>- UI components phải có dark variant tương phản tốt                 |
| `US-029` | **Offline Mode**: Học không mạng | 3      | - Cho phép người dùng chọn "Tải về" bài học/quiz cụ thể<br/>- Lưu trữ dữ liệu (Video/Text/Quiz) vào IndexedDB<br/>- Service Worker cache assets (JS/CSS/Images)<br/>- Tự động đồng bộ tiến độ (Sync) lên server khi có mạng trở lại                                   |
| `US-030` | **Push Notify**: Browser Noti    | 3      | - Xin quyền (Request Permission) từ trình duyệt<br/>- Cài đặt bật/tắt nhận thông báo cho từng loại: Giải đấu, Nhắc học tập<br/>- Gửi thông báo kể cả khi App đang tắt (Background sync/Push)<br/>- Deep link vào đúng màn hình khi click thông báo                    |
| `US-031` | **Social Login**: Google         | 3      | - Nút "Đăng nhập bằng Google"<br/>- Sử dụng OAuth 2.0 flow<br/>- Tự động lấy Email + Avatar + Name từ Google Profile<br/>- Nếu Email đã tồn tại: Link account. Nếu chưa: Tạo mới<br/>- Xử lý lỗi khi user từ chối quyền truy cập                                      |
| `US-032` | **Shop**: Đổi vật phẩm           | 3      | - Hiển thị danh sách vật phẩm (Rate grid: Icon, Tên, Giá Coin)<br/>- Phân loại: Avatar, Khung viền, Giao diện (Theme)<br/>- Mua vật phẩm: Kiểm tra số dư Coin > Trừ Coin > Thêm vào Inventory<br/>- Hiển thị dialog xác nhận trước khi mua                            |
