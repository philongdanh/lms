---
id: backlog
title: Plan
sidebar_label: Plan
sidebar_position: 4
---

# Plan

Kế hoạch triển khai chi tiết theo Sprint.

---

## Point System

| Points   | Description                                                                    |
| :------- | :----------------------------------------------------------------------------- |
| **8-13** | Nghiêm trọng - Chặn (Blocker). Phải làm ngay (Priority P0).                    |
| **5-8**  | Cao - Phải có (Must have). Cần thiết cho Release (Priority P1).                |
| **3-5**  | Trung bình - Nên có (Should have). Quan trọng nhưng có thể hoãn (Priority P2). |
| **1-3**  | Thấp - Có thì tốt (Nice to have). Làm khi rảnh (Priority P3).                  |

---

## Sprint 2: Auth & Users

> **Focus**: Foundation of Identity, Security, and Sessions.

| ID       | User Story (Role - Action - Benefit)                             | Points | Acceptance Criteria                                                                                                                                                                                                                             |
| :------- | :--------------------------------------------------------------- | :----- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `US-001` | **Đăng ký**: Người dùng mới đăng ký bằng email để tạo tài khoản. | 8      | - Nhập Email, Mật khẩu, Xác nhận mật khẩu.<br/>- Validate định dạng email và độ mạnh mật khẩu.<br/>- Gửi OTP về email. Tài khoản chỉ kích hoạt sau khi xác thực xong.<br/>- **Constraint**: Chỉ hỗ trợ đăng ký bằng Email (chưa có Social/SĐT). |
| `US-002` | **Xác thực OTP**: Nhập mã OTP từ email để xác minh danh tính.    | 8      | - Input 6 chữ số. Countdown timer (60s) gửi lại.<br/>- Logic kiểm tra mã với Redis/DB.<br/>- Khóa tạm thời sau 3 lần nhập sai liên tiếp.                                                                                                        |
| `US-003` | **Đăng nhập**: Đăng nhập bằng Email/Pass để vào dashboard.       | 8      | - Hỗ trợ đăng nhập Email/Password.<br/>- Trả về JWT Access Token & Refresh Token.<br/>- Xử lý bảo mật các case "Tài khoản bị khóa" hoặc "Sai mật khẩu".                                                                                         |
| `US-004` | **Quên mật khẩu**: Reset mật khẩu qua email.                     | 5      | - Nhập email nhận link reset hoặc OTP.<br/>- Xác minh token bảo mật hợp lệ trước khi cho đổi pass.<br/>- Vô hiệu hóa session cũ ngay sau khi đổi thành công.                                                                                    |
| `US-005` | **Đăng xuất**: Thoát tài khoản an toàn trên thiết bị.            | 5      | - Thu hồi Refresh Token trong Database/Redis.<br/>- Xóa Cookies / LocalStorage phía client.<br/>- Redirect về trang chủ Public.                                                                                                                 |
| `US-006` | **Quản lý Session**: Admin quản lý user session để bảo mật.      | 8      | - Danh sách active sessions lưu trong Redis.<br/>- Cơ chế xoay vòng (rotation) Refresh Token.<br/>- Giới hạn tối đa 3 thiết bị đồng thời.                                                                                                       |
| `US-007` | **Protected Routes**: Chặn truy cập chưa xác thực ở Frontend.    | 8      | - Middleware kiểm tra JWT hợp lệ mỗi request.<br/>- Redirect về trang Login nếu token thiếu/hết hạn.<br/>- Phân quyền access dựa trên Role (Admin/Student).                                                                                     |

## Sprint 3: Learning Core

> **Focus**: Core LMS features - Subjects, Lessons, Quizzes.

| ID       | User Story (Role - Action - Benefit)                     | Points | Acceptance Criteria                                                                                                                                     |
| :------- | :------------------------------------------------------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `US-008` | **Danh sách môn**: Học viên xem môn học (Toán, TV, TA).  | 5      | - Hiển thị danh sách 3 môn: Toán, Tiếng Việt, Tiếng Anh.<br/>- Bộ lọc theo Khối lớp và Cấp độ.<br/>- Skeleton loading khi đang fetch dữ liệu.           |
| `US-009` | **Xem Lộ trình**: Xem cây bài học để theo dõi tiến độ.   | 8      | - Hiển thị bài học dạng cây (Tree) hoặc Timeline.<br/>- Trạng thái rõ ràng: Locked, Unlocked, Completed.<br/>- Chặn click vào các bài đang bị khóa.     |
| `US-010` | **Xem bài học**: Xem nội dung (Rich text, Video, Image). | 8      | - Hỗ trợ nội dung Rich Text, Hình ảnh, Embed Video.<br/>- Điều hướng bài trước/sau thuận tiện.<br/>- Tối ưu load time &lt;3s (FCP).                     |
| `US-011` | **Quiz**: Làm trắc nghiệm để kiểm tra kiến thức.         | 8      | - Hiển thị câu hỏi + 4 lựa chọn trả lời.<br/>- Client-side validation (chế độ luyện tập) cho phản hồi nhanh.<br/>- Submit kết quả lên API để tính điểm. |
| `US-012` | **Tiến độ**: Hệ thống ghi nhận tiến độ để học tiếp.      | 8      | - Lưu vị trí "Học lần cuối" (Last Watched).<br/>- Đánh dấu "Hoàn thành" khi đủ điều kiện (ví dụ: pass quiz).<br/>- Cập nhật % tiến độ tổng của môn học. |

## Sprint 4: Polish & Gamification

> **Focus**: Scoring system, Leveling, and Polish for MVP Release.

| ID       | User Story (Role - Action - Benefit)                    | Points | Acceptance Criteria                                                                                                                        |
| :------- | :------------------------------------------------------ | :----- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `US-013` | **Tính điểm**: Tính điểm thưởng hoạt động cho học viên. | 5      | - Công thức: Điểm cơ bản + Bonus (tốc độ/streak).<br/>- Lưu lịch sử làm bài chi tiết.<br/>- Rate limit submissions để chống spam/gian lận. |
| `US-014` | **Level Up**: Lên cấp dựa trên XP tích lũy.             | 5      | - Logic tính XP và các mốc Level (ví dụ: Lvl 1 = 100xp).<br/>- Hiệu ứng/Thông báo chúc mừng khi lên cấp.                                   |

## Sprint 5-6: Tournament

> **Focus**: Realtime features, WebSockets, Leaderboards (Post-MVP Expansion).

| ID       | User Story (Role - Action - Benefit)                        | Points | Acceptance Criteria                                                                                                                                                                           |
| :------- | :---------------------------------------------------------- | :----- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `US-015` | **Danh sách giải**: Xem giải đấu (Đang/Sắp/Đã) để tham gia. | 5      | - Phân loại: Đang diễn ra, Sắp diễn ra, Đã kết thúc.<br/>- Metadata: Thời gian, Giải thưởng, Số lượng user.<br/>- Hỗ trợ hiển thị tốt với lượng truy cập cao.                                 |
| `US-016` | **Chi tiết giải**: Xem luật và giải thưởng.                 | 5      | - Hiển thị mô tả chi tiết, luật lệ thi đấu.<br/>- Preview bảng xếp hạng tạm thời (nếu đang diễn ra).                                                                                          |
| `US-017` | **Đăng ký giải**: Tham gia vào danh sách thi đấu.           | 5      | - Kiểm tra điều kiện: Level tối thiểu, Vé tham dự.<br/>- Trừ vé/phí (nếu có) và thêm user vào danh sách.<br/>- Chặn đăng ký nếu đã full slot hoặc quá hạn.                                    |
| `US-018` | **Gameplay**: Trả lời câu hỏi realtime để thi đấu.          | 13     | - WebSocket đồng bộ câu hỏi cho tất cả người chơi.<br/>- Giới hạn thời gian trả lời (ví dụ: 10s). Feedback Đúng/Sai ngay lập tức.<br/>- Độ trễ thấp (&lt;100ms), xử lý mất kết nối/reconnect. |
| `US-019` | **Rank Realtime**: Thấy thứ hạng cập nhật trực tiếp.        | 8      | - Ranking bằng Redis Sorted Set (ZSET).<br/>- Broadcast Top 10 + Hạng cá nhân sau mỗi câu hỏi.<br/>- Chịu tải cao (10,000 CCU).                                                               |
| `US-020` | **Kết quả**: Chốt bảng xếp hạng và trao thưởng.             | 8      | - Chốt bảng xếp hạng final khi giải kết thúc.<br/>- Lưu lịch sử thi đấu vào DB chính.<br/>- Trigger job trả thưởng (async).                                                                   |

## Sprint 7: Advanced Features

> **Focus**: Advanced retention features and Parent tools.

| ID       | User Story                                          | Points | Acceptance Criteria                                                                                                                                          |
| :------- | :-------------------------------------------------- | :----- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `US-021` | **Video bài học**: Streaming video player.          | 5      | - Tích hợp Video Player (stream từ cloud storage).<br/>- Controls: Play, Pause, Seek, Volume.<br/>- Lưu timestamp đang xem dở.                               |
| `US-022` | **Streak**: Chuỗi học tập hàng ngày.                | 5      | - Đếm số ngày liên tiếp có hoạt động học.<br/>- Hiển thị bộ đếm Streak nổi bật trên Dashboard.<br/>- Cảnh báo/Nhắc nhở khi chuỗi sắp bị ngắt.                |
| `US-023` | **Hồ sơ**: Chỉnh sửa Avatar, Tên, xem Stats.        | 5      | - Upload ảnh Avatar cá nhân.<br/>- Cập nhật Tên hiển thị.<br/>- Xem thống kê: Ngày tham gia, Tổng XP, Rank.                                                  |
| `US-024` | **Huy hiệu**: Hệ thống thành tích (Badges).         | 5      | - Trao huy hiệu theo tiêu chí (ví dụ: "7 ngày liên tiếp", "100 điểm").<br/>- Tab "Thành tích" trong profile.<br/>- Popup chúc mừng khi mở khóa huy hiệu mới. |
| `US-025` | **Liên kết con**: Phụ huynh liên kết tài khoản con. | 5      | - Tạo mã mời (Invite Code) từ tài khoản Con.<br/>- Phụ huynh nhập mã để gửi yêu cầu liên kết.<br/>- Xác thực 2 chiều để tránh liên kết trái phép.            |
| `US-026` | **Báo cáo con**: Phụ huynh xem tiến độ của con.     | 5      | - Dashboard phụ huynh hiển thị hoạt động của con.<br/>- Biểu đồ thời gian học, XP tuần.<br/>- Cảnh báo nếu con không hoạt động trong X ngày.                 |

---

## Backlog (Future)

| ID       | User Story                                    | Points | Acceptance Criteria                                                                                                            |
| :------- | :-------------------------------------------- | :----- | :----------------------------------------------------------------------------------------------------------------------------- |
| `US-027` | **Đăng ký SĐT**: Đăng ký qua mobile phone.    | 3      | - Nhập SĐT, Validate đầu số VN.<br/>- Gửi OTP qua SMS.<br/>- Tạo tài khoản sau khi verify OTP.                                 |
| `US-028` | **Dark Mode**: Giao diện tối.                 | 3      | - Toggle Switch chuyển đổi Light/Dark theme.<br/>- Lưu preference vào LocalStorage/DB.<br/>- UI Component thích ứng màu sắc.   |
| `US-029` | **Offline Mode**: Tải bài học để học offline. | 3      | - Nút "Tải xuống" bài học/quiz.<br/>- Cache local (IndexedDB / Service Worker).<br/>- Sync tiến độ lên server khi có mạng lại. |
| `US-030` | **Push Notify**: Thông báo trình duyệt.       | 3      | - Xin quyền Browser Notification.<br/>- Gửi noti: Có giải đấu mới, Nhắc học bài.<br/>- Cài đặt Bật/Tắt từng loại thông báo.    |
| `US-031` | **Social Login**: Login Google.               | 3      | - Nút "Tiếp tục với Google" (OAuth2).<br/>- Auto-register nếu email chưa tồn tại.<br/>- Link với tài khoản email cũ nếu trùng. |
| `US-032` | **Shop**: Đổi xu lấy vật phẩm/avatar.         | 3      | - Danh sách vật phẩm + Giá (Coins).<br/>- Logic mua: Trừ tiền, Thêm item vào kho.<br/>- Giao diện "Kho đồ" để trang bị item.   |
