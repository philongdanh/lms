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

## Sprint 1: Foundation & Public

> **Focus**: Xây dựng nền tảng UI cơ bản và trang công khai

| ID       | User Story                                     | Points | Acceptance Criteria                                                                                                                                                                   |
| :------- | :--------------------------------------------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `US-001` | **Landing Page**: Trang chủ công khai          | 5      | - Hero section với tagline và CTA đăng ký<br/>- Showcase các tính năng chính của platform<br/>- Responsive design cho mobile/tablet/desktop<br/>- Load time &lt;2s (LCP)             |
| `US-002` | **Dashboard Overview**: Tổng quan cá nhân      | 5      | - Hiển thị stats: XP, Streak, Rank, Badges<br/>- Section "Tiếp tục học" với bài học gần nhất<br/>- Preview các giải đấu sắp diễn ra<br/>- Quick actions: Học ngay, Thi đấu            |
| `US-003` | **Dashboard Statistics**: Thống kê chi tiết    | 5      | - Biểu đồ tiến độ học tập theo thời gian<br/>- Chart hoạt động tuần (weekly activity)<br/>- Phân bố thời gian theo môn học<br/>- Thống kê thắng/thua tournament                       |
| `US-004` | **Activity Feed**: Timeline hoạt động          | 5      | - Danh sách hoạt động theo thứ tự thời gian<br/>- Các loại: Hoàn thành bài, Thắng/Thua giải, Streak, Đổi thưởng, Huy hiệu<br/>- Infinite scroll hoặc pagination<br/>- Filter theo loại |

---

## Sprint 2: Auth & Users

> **Focus**: Xây dựng nền tảng Identity, Security và quản lý Sessions

| ID       | User Story                                    | Points | Acceptance Criteria                                                                                                                                                                                                                         |
| :------- | :-------------------------------------------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `US-005` | **Đăng ký**: Tạo tài khoản mới bằng Email     | 8      | - Nhập Email, Mật khẩu, Xác nhận mật khẩu<br/>- Validate định dạng email và độ mạnh mật khẩu<br/>- Gửi OTP về email. Tài khoản chỉ kích hoạt sau khi xác thực xong<br/>- **Constraint**: Chỉ hỗ trợ đăng ký bằng Email (chưa có Social/SĐT) |
| `US-006` | **Xác thực OTP**: Verify danh tính            | 8      | - Nhập 6 chữ số. Countdown timer (60s) gửi lại<br/>- Logic kiểm tra mã với Redis/DB<br/>- Khóa tạm thời sau 3 lần nhập sai liên tiếp                                                                                                        |
| `US-007` | **Đăng nhập**: Email/Pass vào dashboard       | 8      | - Hỗ trợ đăng nhập Email/Password<br/>- Trả về JWT Access Token & Refresh Token<br/>- Xử lý bảo mật các case "Tài khoản bị khóa" hoặc "Sai mật khẩu"                                                                                        |
| `US-008` | **Quên mật khẩu**: Reset qua email            | 5      | - Nhập email nhận link reset hoặc OTP<br/>- Xác minh token bảo mật hợp lệ trước khi cho đổi pass<br/>- Vô hiệu hóa session cũ ngay sau khi đổi thành công                                                                                   |
| `US-009` | **Đăng xuất**: Thoát an toàn                  | 5      | - Thu hồi Refresh Token trong Database/Redis<br/>- Xóa Cookies / LocalStorage phía client<br/>- Redirect về trang chủ Public                                                                                                               |
| `US-010` | **Session**: Admin quản lý user session       | 8      | - Danh sách active sessions lưu trong Redis<br/>- Cơ chế xoay vòng (rotation) Refresh Token<br/>- Giới hạn tối đa 3 thiết bị đồng thời                                                                                                      |
| `US-011` | **Protected Routes**: Chặn truy cập chưa auth | 8      | - Middleware kiểm tra JWT hợp lệ mỗi request<br/>- Redirect về trang Login nếu token thiếu/hết hạn<br/>- Phân quyền access dựa trên Role (Admin/Student)                                                                                    |

---

## Sprint 3: Admin Module

> **Focus**: Công cụ quản trị hệ thống cho Admin

| ID       | User Story                                   | Points | Acceptance Criteria                                                                                                                                                          |
| :------- | :------------------------------------------- | :----- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `US-012` | **Admin Dashboard**: Tổng quan hệ thống      | 8      | - Hiển thị stats: Tổng users, Active users, New signups<br/>- Biểu đồ tăng trưởng user theo thời gian<br/>- Danh sách users mới đăng ký gần đây<br/>- Panel cảnh báo hệ thống |
| `US-013` | **User Management**: Quản lý người dùng      | 8      | - Danh sách users với search và filter (role, status, date)<br/>- Xem chi tiết profile từng user<br/>- Actions: Activate, Deactivate, Reset password<br/>- Bulk actions      |
| `US-014` | **Add/Edit User**: Tạo và sửa user           | 5      | - Form tạo user mới với role assignment<br/>- Edit thông tin user hiện có<br/>- Validate email unique, required fields<br/>- Gửi email welcome cho user mới                  |
| `US-015` | **Content Management**: Quản lý nội dung     | 8      | - CRUD cho Lessons: Tạo, sửa, xóa bài học<br/>- CRUD cho Questions: Quản lý ngân hàng câu hỏi<br/>- Upload và quản lý tài liệu (Documents)<br/>- Preview content trước publish |
| `US-016` | **System Settings**: Cấu hình hệ thống       | 5      | - General settings: Tên app, Logo, Timezone<br/>- Notification settings: Email templates, triggers<br/>- Security settings: Password policy, session timeout                 |
| `US-017` | **System Alerts**: Giám sát cảnh báo         | 3      | - Danh sách alerts theo severity (Error, Warning, Info)<br/>- Mark as resolved / Dismiss<br/>- Filter theo loại và thời gian<br/>- Notification khi có alert mới              |

---

## Sprint 4: Learning Core

> **Focus**: Tính năng LMS cốt lõi - Subjects, Lessons và Quizzes

| ID       | User Story                               | Points | Acceptance Criteria                                                                                                                                  |
| :------- | :--------------------------------------- | :----- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| `US-018` | **Danh sách môn**: Xem môn học           | 5      | - Hiển thị danh sách 3 môn: Toán, Tiếng Việt, Tiếng Anh<br/>- Bộ lọc theo Khối lớp, Chủ đề, Học kì<br/>- Skeleton loading khi đang fetch dữ liệu     |
| `US-019` | **Lộ trình**: Xem cây bài học            | 8      | - Hiển thị bài học dạng cây (Tree) hoặc Timeline<br/>- Trạng thái rõ ràng: Locked, Unlocked, Completed<br/>- Chặn click vào các bài đang bị khóa     |
| `US-020` | **Bài học**: Xem nội dung (Text/Video)   | 8      | - Hỗ trợ nội dung Rich Text, Hình ảnh, Embed Video<br/>- Điều hướng bài trước/sau thuận tiện<br/>- Tối ưu load time &lt;3s (FCP)                     |
| `US-021` | **Quiz**: Trắc nghiệm                    | 8      | - Hiển thị câu hỏi + 4 lựa chọn trả lời<br/>- Client-side validation (chế độ luyện tập) cho phản hồi nhanh<br/>- Submit kết quả lên API để tính điểm |
| `US-022` | **Tiến độ**: Ghi nhận kết quả            | 8      | - Lưu vị trí "Học lần cuối" (Last Watched)<br/>- Đánh dấu "Hoàn thành" khi đủ điều kiện (ví dụ: pass quiz)<br/>- Cập nhật % tiến độ tổng của môn học |
| `US-023` | **In-Progress**: Khóa học đang học       | 5      | - Danh sách courses đang trong tiến trình<br/>- Progress bar cho mỗi course<br/>- Nút "Tiếp tục" vào bài học tiếp theo<br/>- Sort theo last activity  |
| `US-024` | **Completed**: Khóa học đã hoàn thành    | 5      | - Danh sách courses đã hoàn thành<br/>- Hiển thị điểm số, thời gian hoàn thành<br/>- Download/View certificate (nếu có)<br/>- Option để học lại       |
| `US-025` | **AI Recommendations**: Gợi ý cá nhân hóa | 5      | - Gợi ý courses dựa trên lịch sử học<br/>- Match score (%) cho mỗi recommendation<br/>- Giải thích lý do gợi ý<br/>- Refresh recommendations          |

---

## Sprint 5: Gamification & Rewards

> **Focus**: Hệ thống Scoring, Leveling và Rewards

| ID       | User Story                              | Points | Acceptance Criteria                                                                                                                                      |
| :------- | :-------------------------------------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `US-026` | **Tính điểm**: Thưởng hoạt động         | 5      | - Công thức: Điểm cơ bản + Bonus (tốc độ/streak)<br/>- Lưu lịch sử làm bài chi tiết<br/>- Rate limit submissions để chống spam/gian lận                  |
| `US-027` | **Level Up**: Lên cấp theo XP           | 5      | - Logic tính XP và các mốc Level (ví dụ: Lvl 1 = 100xp)<br/>- Hiệu ứng/Thông báo chúc mừng khi lên cấp                                                   |
| `US-028` | **Shop**: Cửa hàng đổi thưởng           | 5      | - Hiển thị danh sách vật phẩm (Grid: Icon, Tên, Giá Coin)<br/>- Phân loại: Clothes, Vouchers, Courses, Stickers<br/>- Mua: Check số dư → Trừ → Add inventory |
| `US-029` | **Coin Balance**: Quản lý xu            | 5      | - Hiển thị số dư coin hiện tại<br/>- Lịch sử giao dịch: Earned, Spent<br/>- Biểu đồ earning theo thời gian<br/>- Breakdown nguồn coin (quiz, streak, tournament) |
| `US-030` | **Redeemed Items**: Vật phẩm đã đổi     | 3      | - Danh sách items đã redeem<br/>- Status: Active, Applied, Expired<br/>- Apply/Use item từ inventory<br/>- Filter theo status và category                |
| `US-031` | **Medals**: Huy chương giải đấu         | 5      | - Hiển thị medals earned từ tournaments<br/>- Rarity tiers: Bronze, Silver, Gold, Platinum, Diamond<br/>- Chi tiết: Tournament name, date, achievement   |

---

## Sprint 6: News & Communications

> **Focus**: Hệ thống thông báo và truyền thông

| ID       | User Story                               | Points | Acceptance Criteria                                                                                                                                 |
| :------- | :--------------------------------------- | :----- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| `US-032` | **News Feed**: Bảng tin                  | 5      | - Danh sách bài viết với thumbnail, title, excerpt<br/>- Categories: Events, Features, Courses, Promotions<br/>- Click vào xem chi tiết<br/>- Pagination |
| `US-033` | **Announcements**: Thông báo hệ thống    | 5      | - Danh sách announcements với priority levels<br/>- Types: Warning, Info, Success<br/>- Pinned announcements hiển thị trên đầu<br/>- Mark as read   |
| `US-034` | **Events Calendar**: Lịch sự kiện        | 5      | - Calendar view các events sắp tới<br/>- Event types: Competitions, Workshops, Special<br/>- Register/Unregister cho events<br/>- Reminder settings |
| `US-035` | **Notification Settings**: Cài đặt thông báo | 3  | - Toggle on/off cho từng loại notification<br/>- Email preferences: Digest frequency<br/>- Tournament alerts, Learning reminders<br/>- Save preferences |

---

## Sprint 7-8: Tournament

> **Focus**: Tính năng Realtime, WebSockets, Leaderboards

| ID       | User Story                              | Points | Acceptance Criteria                                                                                                                                                                        |
| :------- | :-------------------------------------- | :----- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `US-036` | **Danh sách giải**: Live/Upcoming/Ended | 5      | - Phân loại: Đang diễn ra, Sắp diễn ra, Đã kết thúc<br/>- Metadata: Thời gian, Giải thưởng, Số lượng user<br/>- Hỗ trợ hiển thị tốt với lượng truy cập cao                                 |
| `US-037` | **Chi tiết giải**: Luật & Thưởng        | 5      | - Hiển thị mô tả chi tiết, luật lệ thi đấu<br/>- Preview bảng xếp hạng tạm thời (nếu đang diễn ra)                                                                                         |
| `US-038` | **Đăng ký**: Join giải đấu              | 5      | - Kiểm tra điều kiện: Level tối thiểu, Vé tham dự<br/>- Trừ vé/phí (nếu có) và thêm user vào danh sách<br/>- Chặn đăng ký nếu đã full slot hoặc quá hạn                                    |
| `US-039` | **Gameplay**: Thi đấu realtime          | 13     | - WebSocket đồng bộ câu hỏi cho tất cả người chơi<br/>- Giới hạn thời gian trả lời (ví dụ: 10s). Feedback Đúng/Sai ngay lập tức<br/>- Độ trễ thấp (&lt;100ms), xử lý mất kết nối/reconnect |
| `US-040` | **Rank Realtime**: BXH trực tiếp        | 8      | - Ranking bằng Redis Sorted Set (ZSET)<br/>- Broadcast Top 10 + Hạng cá nhân sau mỗi câu hỏi<br/>- Chịu tải cao (10,000 CCU)                                                               |
| `US-041` | **Kết quả**: Chốt giải                  | 8      | - Chốt bảng xếp hạng final khi giải kết thúc<br/>- Lưu lịch sử thi đấu vào DB chính<br/>- Trigger job trả thưởng (async)                                                                   |
| `US-042` | **Tournament Schedule**: Lịch thi đấu   | 5      | - Calendar view các tournaments<br/>- Filter: Registered, Available, Past<br/>- Quick register từ calendar<br/>- Sync với personal calendar (ics)                                          |
| `US-043` | **Match History**: Lịch sử thi đấu      | 5      | - Danh sách matches đã tham gia<br/>- Chi tiết: Opponent, Score, Result (Win/Loss)<br/>- Performance chart theo thời gian<br/>- Filter theo tournament type                                 |

---

## Sprint 9: Advanced Features

> **Focus**: Các tính năng Retention nâng cao và công cụ cho Parent

| ID       | User Story                        | Points | Acceptance Criteria                                                                                                                                       |
| :------- | :-------------------------------- | :----- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `US-044` | **Video Player**: Streaming       | 5      | - Tích hợp Video Player (stream từ cloud storage)<br/>- Controls: Play, Pause, Seek, Volume<br/>- Lưu timestamp đang xem dở                               |
| `US-045` | **Streak**: Chuỗi học tập         | 5      | - Đếm số ngày liên tiếp có hoạt động học<br/>- Hiển thị bộ đếm Streak nổi bật trên Dashboard<br/>- Cảnh báo/Nhắc nhở khi chuỗi sắp bị ngắt                |
| `US-046` | **Hồ sơ**: Edit Profile           | 5      | - Upload ảnh Avatar cá nhân<br/>- Cập nhật Tên hiển thị<br/>- Xem thống kê: Ngày tham gia, Tổng XP, Rank                                                  |
| `US-047` | **Huy hiệu**: Badges              | 5      | - Trao huy hiệu theo tiêu chí (ví dụ: "7 ngày liên tiếp", "100 điểm")<br/>- Tab "Thành tích" trong profile<br/>- Popup chúc mừng khi mở khóa huy hiệu mới |
| `US-048` | **Liên kết con**: Parent Link     | 5      | - Tạo mã mời (Invite Code) từ tài khoản Con<br/>- Phụ huynh nhập mã để gửi yêu cầu liên kết<br/>- Xác thực 2 chiều để tránh liên kết trái phép            |
| `US-049` | **Báo cáo con**: Parent Dashboard | 5      | - Dashboard phụ huynh hiển thị hoạt động của con<br/>- Biểu đồ thời gian học, XP tuần<br/>- Cảnh báo nếu con không hoạt động trong X ngày                 |
| `US-050` | **Account Deletion**: Xóa tài khoản | 5    | - Nút xóa tài khoản trong Settings<br/>- Confirm dialog với warning về data loss<br/>- Soft delete với grace period (30 ngày)<br/>- GDPR compliance: Export data trước khi xóa |

---

## Backlog (Future)

| ID       | User Story                       | Points | Acceptance Criteria                                                                                                                                                                                                                                                   |
| :------- | :------------------------------- | :----- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `US-051` | **Đăng ký SĐT**: Mobile phone    | 3      | - Nhập số điện thoại Việt Nam (+84/0...). Validate format<br/>- Gửi OTP qua SMS (tích hợp mock hoặc provider thật)<br/>- Countdown 60s cho phép gửi lại<br/>- Tự động tạo tài khoản nếu SĐT chưa tồn tại<br/>- Yêu cầu thiết lập mật khẩu sau khi xác thực thành công |
| `US-052` | **Dark Mode**: Theme toggle      | 3      | - Toggle Switch chuyển đổi Light/Dark trong Header hoặc Settings<br/>- Lưu preference vào localStorage (cho guest) và DB (cho user)<br/>- Tự động detect system preference (OS theme) lần đầu<br/>- UI components phải có dark variant tương phản tốt                 |
| `US-053` | **Offline Mode**: Học không mạng | 3      | - Cho phép người dùng chọn "Tải về" bài học/quiz cụ thể<br/>- Lưu trữ dữ liệu (Video/Text/Quiz) vào IndexedDB<br/>- Service Worker cache assets (JS/CSS/Images)<br/>- Tự động đồng bộ tiến độ (Sync) lên server khi có mạng trở lại                                   |
| `US-054` | **Push Notify**: Browser Noti    | 3      | - Xin quyền (Request Permission) từ trình duyệt<br/>- Cài đặt bật/tắt nhận thông báo cho từng loại: Giải đấu, Nhắc học tập<br/>- Gửi thông báo kể cả khi App đang tắt (Background sync/Push)<br/>- Deep link vào đúng màn hình khi click thông báo                    |
| `US-055` | **Social Login**: Google         | 3      | - Nút "Đăng nhập bằng Google"<br/>- Sử dụng OAuth 2.0 flow<br/>- Tự động lấy Email + Avatar + Name từ Google Profile<br/>- Nếu Email đã tồn tại: Link account. Nếu chưa: Tạo mới<br/>- Xử lý lỗi khi user từ chối quyền truy cập                                      |
| `US-056` | **Referral Program**: Mời bạn    | 3      | - Generate unique referral code/link<br/>- Track referrals và status (pending, completed)<br/>- Reward cho cả người mời và người được mời<br/>- Leaderboard top referrers                                                                                             |
| `US-057` | **XP Boosters**: Tăng XP tạm thời | 3     | - Activate booster từ inventory (2x XP, 7 days)<br/>- Countdown timer hiển thị thời gian còn lại<br/>- Stack rules: Không cho phép stack nhiều boosters<br/>- Visual indicator khi booster active                                                                       |
| `US-058` | **Team Challenges**: Thi đấu nhóm | 5     | - Tạo/Join team với invite code<br/>- Team leaderboard trong challenges<br/>- Aggregate score từ members<br/>- Team chat (basic)                                                                                                                                        |
