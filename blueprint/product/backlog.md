---
id: backlog
title: Backlog
sidebar_label: Backlog
sidebar_position: 3
---

# Backlog

Kho dự trữ yêu cầu sản phẩm (Product Backlog) và thứ tự ưu tiên triển khai để
tối ưu hóa giá trị.

---

## Priority Legend

| Độ ưu tiên | Mô tả                             | Điểm     |
| ---------- | --------------------------------- | -------- |
| P0         | Nghiêm trọng - Chặn (Blocker)     | 8-13 pts |
| P1         | Cao - Phải có (Must have)         | 5-8 pts  |
| P2         | Trung bình - Nên có (Should have) | 3-5 pts  |
| P3         | Thấp - Có thì tốt (Nice to have)  | 1-3 pts  |

---

## Backlog Summary

| Độ ưu tiên     | Số lượng | Điểm | % Tổng |
| -------------- | -------- | ---- | ------ |
| P0             | 24       | 120  | 48%    |
| P1             | 18       | 85   | 34%    |
| P2             | 12       | 45   | 18%    |
| **Tổng (MVP)** | 54       | 250  | 100%   |

---

## Must Have (MVP)

> **Lưu ý**: Các item dưới đây đã được chi tiết hóa thành User Story để sẵn sàng
> cho Sprint Planning.

### Xác thực

| ID          | Nội dung (User Story)                                                                                                                                | Thông tin                                             | Tiêu chí nghiệm thu                                                                                                                                                                                                                                                                                    |
| :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **LMS-001** | **Đăng ký bằng Email**<br/>Là **Người dùng mới**, tôi muốn **đăng ký bằng email**, để **tạo tài khoản truy cập LMS**.                                | **Sprint**: S2<br/>**Points**: 5<br/>**Priority**: P0 | - Người dùng nhập Email, Mật khẩu, và Xác nhận mật khẩu.<br/>- Hệ thống validate định dạng email và độ mạnh mật khẩu (tối thiểu 8 ký tự, 1 ký tự đặc biệt).<br/>- Hệ thống kiểm tra email đã tồn tại chưa; trả về lỗi thân thiện nếu trùng.<br/>- Xác minh tạo thành công trong Database (PostgreSQL). |
| **LMS-002** | **Đăng ký bằng Số điện thoại**<br/>Là **Người dùng mới**, tôi muốn **đăng ký bằng số điện thoại**, để **tạo tài khoản dễ dàng trên mobile**.         | **Sprint**: S2<br/>**Points**: 5<br/>**Priority**: P0 | - Người dùng nhập Số điện thoại.<br/>- Hệ thống validate định dạng số điện thoại (VN).<br/>- Hệ thống trigger tạo mã OTP (mock hoặc thật).<br/>- Tài khoản chỉ được tạo sau khi xác thực OTP.                                                                                                          |
| **LMS-003** | **Xác thực OTP**<br/>Là **Người dùng**, tôi muốn **nhập mã OTP gửi về thiết bị**, để **xác minh danh tính**.                                         | **Sprint**: S2<br/>**Points**: 5<br/>**Priority**: P0 | - Input field chấp nhận mã 6 chữ số.<br/>- Countdown timer (ví dụ: 60s) cho việc gửi lại.<br/>- Logic xác thực kiểm tra với Redis/DB.<br/>- Fail sau 3 lần nhập sai.                                                                                                                                   |
| **LMS-004** | **Luồng Đăng nhập**<br/>Là **Người dùng đã đăng ký**, tôi muốn **đăng nhập**, để **truy cập dashboard cá nhân**.                                     | **Sprint**: S4<br/>**Points**: 5<br/>**Priority**: P0 | - Hỗ trợ đăng nhập bằng cả Email và Số điện thoại.<br/>- Trả về JWT Access Token và Refresh Token khi thành công.<br/>- Xử lý các case "Tài khoản bị khóa" hoặc "Sai mật khẩu" một cách bảo mật.                                                                                                       |
| **LMS-005** | **Quên mật khẩu**<br/>Là **Người dùng**, tôi muốn **đặt lại mật khẩu**, để **lấy lại quyền truy cập nếu quên**.                                      | **Sprint**: S5<br/>**Points**: 3<br/>**Priority**: P1 | - Nhập email/sđt để nhận link reset/OTP.<br/>- Xác minh token bảo mật trước khi cho phép đổi mật khẩu.<br/>- Vô hiệu hóa các session cũ sau khi reset.                                                                                                                                                 |
| **LMS-006** | **Đăng xuất**<br/>Là **Người dùng**, tôi muốn **đăng xuất**, để **bảo mật tài khoản trên thiết bị dùng chung**.                                      | **Sprint**: S4<br/>**Points**: 2<br/>**Priority**: P1 | - Thu hồi Refresh Token trong database/Redis.<br/>- Xóa cookies/storage phía client.<br/>- Redirect về trang chủ Public.                                                                                                                                                                               |
| **LMS-007** | **Quản lý Session**<br/>Là **System Admin**, tôi muốn **quản lý user session**, để **đảm bảo bảo mật và giới hạn thiết bị**.                         | **Sprint**: S4<br/>**Points**: 8<br/>**Priority**: P0 | - Lưu active sessions trong Redis.<br/>- Triển khai xoay vòng (rotation) Refresh Token.<br/>- Hỗ trợ Blacklist cho các token bị thu hồi.                                                                                                                                                               |
| **LMS-008** | **Protected Routes**<br/>Là **Developer**, tôi muốn **bảo vệ các route frontend**, để **người dùng chưa xác thực không thể truy cập trang hạn chế**. | **Sprint**: S4<br/>**Points**: 5<br/>**Priority**: P0 | - Middleware kiểm tra JWT hợp lệ.<br/>- Redirect về trang Login nếu token thiếu hoặc hết hạn.<br/>- Phân quyền dựa trên Role (ví dụ: Admin vs Student).                                                                                                                                                |

### Module Học tập

| ID          | Nội dung (User Story)                                                                                                                         | Thông tin                                             | Tiêu chí nghiệm thu                                                                                                                                                                                       |
| :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **LMS-010** | **Danh sách môn học**<br/>Là **Học viên**, tôi muốn **xem danh sách môn học**, để **chọn nội dung muốn học**.                                 | **Sprint**: S2<br/>**Points**: 3<br/>**Priority**: P1 | - Hiển thị danh sách môn học với icon/hình ảnh.<br/>- Lọc theo Khối lớp/Cấp độ.<br/>- Trạng thái Skeleton loading trong khi fetch dữ liệu.                                                                |
| **LMS-011** | **Xem Lộ trình học**<br/>Là **Học viên**, tôi muốn **xem cây bài học (roadmap)**, để **theo dõi tiến độ của mình**.                           | **Sprint**: S4<br/>**Points**: 5<br/>**Priority**: P0 | - Hiển thị dạng cây hoặc timeline các bài học.<br/>- Chỉ thị trạng thái: Đang khóa (Locked), Mở khóa (Unlocked), Hoàn thành (Completed).<br/>- Chặn click vào các bài đang khóa.                          |
| **LMS-012** | **Xem nội dung bài học**<br/>Là **Học viên**, tôi muốn **xem tài liệu bài học**, để **học kiến thức**.                                        | **Sprint**: S4<br/>**Points**: 5<br/>**Priority**: P0 | - Hỗ trợ Rich Text, Hình ảnh, và embed Video cơ bản.<br/>- Điều hướng "Bài trước/Bài sau".                                                                                                                |
| **LMS-013** | **Quiz/Bài tập**<br/>Là **Học viên**, tôi muốn **làm bài trắc nghiệm**, để **kiểm tra kiến thức**.                                            | **Sprint**: S4<br/>**Points**: 8<br/>**Priority**: P0 | - Hiển thị câu hỏi và 4 lựa chọn.<br/>- Client-side validation cho phản hồi tức thì (nếu là chế độ luyện tập).<br/>- Submit câu trả lời lên backend API.<br/>- Hiển thị tổng kết điểm sau khi hoàn thành. |
| **LMS-014** | **Theo dõi tiến độ**<br/>Là **Hệ thống**, tôi muốn **ghi nhận tiến độ người dùng**, để **các tính năng như học tiếp và tính điểm hoạt động**. | **Sprint**: S4<br/>**Points**: 5<br/>**Priority**: P0 | - Lưu vị trí "Học lần cuối" (Last Watched).<br/>- Đánh dấu bài học là "Hoàn thành" khi đủ điều kiện (ví dụ: qua bài quiz).<br/>- Cập nhật % tiến độ tổng của Môn học.                                     |
| **LMS-015** | **Hệ thống tính điểm**<br/>Là **Hệ thống**, tôi muốn **tính điểm**, để **thưởng cho học viên**.                                               | **Sprint**: S5<br/>**Points**: 5<br/>**Priority**: P1 | - Định nghĩa công thức: Điểm cơ bản + Bonus (tốc độ/streak).<br/>- Lưu lịch sử các lần làm bài.<br/>- Chống gian lận (rate limit submissions).                                                            |
| **LMS-016** | **Hệ thống Level Up**<br/>Là **Học viên**, tôi muốn **lên cấp dựa trên XP**, để **cảm thấy sự tiến bộ**.                                      | **Sprint**: S5<br/>**Points**: 5<br/>**Priority**: P2 | - Logic tính toán XP dựa trên điểm số/hoạt động.<br/>- Các mốc Level (ví dụ: Lvl 1: 0-100xp).<br/>- Thông báo/Hiệu ứng khi lên cấp.                                                                       |

### Tournament

| ID          | Nội dung (User Story)                                                                                                                  | Thông tin                                              | Tiêu chí nghiệm thu                                                                                                                                                                           |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **LMS-020** | **Danh sách giải đấu**<br/>Là **Học viên**, tôi muốn **xem các giải đấu khả dụng**, để **tham gia tranh tài**.                         | **Sprint**: S5<br/>**Points**: 5<br/>**Priority**: P1  | - Liệt kê giải Đang diễn ra, Sắp diễn ra, và Đã kết thúc.<br/>- Hiển thị metadata: Thời gian bắt đầu, Giải thưởng, Số lượng tham gia.                                                         |
| **LMS-021** | **Chi tiết giải đấu**<br/>Là **Học viên**, tôi muốn **xem luật và giải thưởng**, để **quyết định có tham gia hay không**.              | **Sprint**: S5<br/>**Points**: 5<br/>**Priority**: P1  | - Hiển thị đầy đủ mô tả và luật lệ.<br/>- Hiển thị preview bảng xếp hạng nếu đang diễn ra.                                                                                                    |
| **LMS-022** | **Luồng đăng ký**<br/>Là **Học viên**, tôi muốn **đăng ký giải đấu**, để **được tham gia**.                                            | **Sprint**: S5<br/>**Points**: 3<br/>**Priority**: P1  | - Kiểm tra điều kiện (ví dụ: Level tối thiểu, Số dư vé).<br/>- Trừ vé/phí nếu có.<br/>- Thêm user vào danh sách tham gia.                                                                     |
| **LMS-023** | **Match Gameplay**<br/>Là **Người tham gia**, tôi muốn **trả lời câu hỏi realtime**, để **thi đấu với người khác**.                    | **Sprint**: S6<br/>**Points**: 13<br/>**Priority**: P0 | - Kết nối WebSocket để đồng bộ câu hỏi.<br/>- Gửi câu trả lời trong giới hạn thời gian (ví dụ: 10s).<br/>- Phản hồi realtime (Đúng/Sai) sau khi hết giờ.<br/>- Xử lý mất kết nối/kết nối lại. |
| **LMS-024** | **Bảng xếp hạng realtime**<br/>Là **Người tham gia**, tôi muốn **thấy hạng của mình cập nhật trực tiếp**, để **biết vị trí hiện tại**. | **Sprint**: S6<br/>**Points**: 8<br/>**Priority**: P0  | - Redis Sorted Set (ZSET) cho ranking.<br/>- Broadcast top 10 và hạng của user sau mỗi câu hỏi.<br/>- Tối ưu cho lượng truy cập cao (high concurrency).                                       |
| **LMS-025** | **Kết quả & Tính toán**<br/>Là **Hệ thống**, tôi muốn **chốt kết quả sau khi giải đấu kết thúc**, để **trao thưởng**.                  | **Sprint**: S6<br/>**Points**: 5<br/>**Priority**: P0  | - Chốt bảng xếp hạng cuối cùng.<br/>- Ghi lại lịch sử đấu.<br/>- Trigger phát thưởng (async job).                                                                                             |

---

## Should Have (Future Sprints)

| ID          | Nội dung (User Story)                                                                                                      | Thông tin                                             | Tiêu chí nghiệm thu                                                                                                                                                                              |
| :---------- | :------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **LMS-030** | **Video bài học**<br/>Là **Học viên**, tôi muốn **xem video bài giảng**, để **hiểu rõ các chủ đề phức tạp**.               | **Sprint**: S7<br/>**Points**: 8<br/>**Priority**: P2 | - Tích hợp Video player (ví dụ: stream từ cloud storage hoặc YouTube embed).<br/>- Các controls: Play, Pause, Seek.<br/>- Lưu timestamp "Xem lần cuối".                                          |
| **LMS-031** | **Chuỗi học tập (Streak)**<br/>Là **Học viên**, tôi muốn **duy trì chuỗi học hàng ngày**, để **có động lực học mỗi ngày**. | **Sprint**: S7<br/>**Points**: 5<br/>**Priority**: P2 | - Theo dõi chuỗi ngày liên tiếp có ít nhất một hoạt động hoàn thành.<br/>- Hiển thị bộ đếm streak trên dashboard.<br/>- Thông báo/Cảnh báo khi chuỗi sắp bị ngắt.                                |
| **LMS-040** | **Hồ sơ người dùng**<br/>Là **Người dùng**, tôi muốn **chỉnh sửa hồ sơ**, để **cá nhân hóa tài khoản**.                    | **Sprint**: S8<br/>**Points**: 5<br/>**Priority**: P2 | - Đổi Avatar (upload ảnh).<br/>- Cập nhật Tên hiển thị.<br/>- Xem thống kê tài khoản (Ngày tham gia, tổng XP).                                                                                   |
| **LMS-041** | **Huy hiệu & Thành tích**<br/>Là **Học viên**, tôi muốn **đạt được các huy hiệu**, để **khoe thành tích của mình**.        | **Sprint**: S8<br/>**Points**: 8<br/>**Priority**: P2 | - Hệ thống trao huy hiệu dựa trên tiêu chí (ví dụ: "100% Điểm đầu tiên", "Chuỗi 7 ngày").<br/>- Tab "Thành tích" trong Hồ sơ để xem huy hiệu đã đạt.<br/>- Popup thông báo khi mở khóa huy hiệu. |
| **LMS-050** | **Liên kết tài khoản con**<br/>Là **Phụ huynh**, tôi muốn **liên kết tài khoản của con**, để **giám sát việc học**.        | **Sprint**: S8<br/>**Points**: 5<br/>**Priority**: P2 | - Tạo mã mời từ tài khoản Con.<br/>- Phụ huynh nhập mã để liên kết.<br/>- Phương thức xác thực để ngăn chặn liên kết trái phép.                                                                  |
| **LMS-051** | **Xem tiến độ của con**<br/>Là **Phụ huynh**, tôi muốn **xem báo cáo về con**, để **biết con có học tốt không**.           | **Sprint**: S8<br/>**Points**: 5<br/>**Priority**: P2 | - Dashboard hiển thị hoạt động gần đây của con.<br/>- Biểu đồ tóm tắt tuần (Thời gian học, XP đạt được).<br/>- Cảnh báo phụ huynh nếu con không học trong X ngày.                                |

---

## Could Have (Backlog)

| ID          | Nội dung (User Story)                                                                                                         | Thông tin                                                   | Tiêu chí nghiệm thu                                                                                                                                                                   |
| :---------- | :---------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **LMS-060** | **Dark Mode**<br/>Là **Người dùng**, tôi muốn **chuyển sang chế độ tối**, để **giảm mỏi mắt vào ban đêm**.                    | **Sprint**: Backlog<br/>**Points**: 3<br/>**Priority**: P3  | - Toggle switch trong Cài đặt / Navbar.<br/>- Lưu preference vào LocalStorage hoặc User Settings DB.<br/>- Tất cả UI components hỗ trợ màu sắc dark theme.                            |
| **LMS-061** | **Chế độ Offline**<br/>Là **Học viên**, tôi muốn **tải bài học**, để **học khi không có mạng**.                               | **Sprint**: Backlog<br/>**Points**: 13<br/>**Priority**: P3 | - Nút "Tải xuống" cho bài học/quiz.<br/>- Cơ chế caching cục bộ (ví dụ: IndexedDB / PWA Service Worker).<br/>- Đồng bộ tiến độ khi có mạng trở lại.                                   |
| **LMS-062** | **Thông báo đẩy (Push)**<br/>Là **Người dùng**, tôi muốn **nhận thông báo**, để **không lỡ các cập nhật quan trọng**.         | **Sprint**: Backlog<br/>**Points**: 5<br/>**Priority**: P3  | - Yêu cầu quyền Browser Push Notification.<br/>- Gửi thông báo cho: Giải đấu mới, Nhắc nhở hàng ngày, Hoạt động bạn bè.<br/>- Cài đặt để bật/tắt các loại thông báo cụ thể.           |
| **LMS-063** | **Đăng nhập Social (Google)**<br/>Là **Người dùng**, tôi muốn **đăng nhập bằng Google**, để **không phải nhớ thêm mật khẩu**. | **Sprint**: Backlog<br/>**Points**: 5<br/>**Priority**: P3  | - Nút "Tiếp tục với Google" trên trang Đăng nhập/Đăng ký.<br/>- Kiểm tra nếu email đã tồn tại; nếu chưa, tự động đăng ký.<br/>- Liên kết tài khoản Google với tài khoản email sẵn có. |
| **LMS-065** | **Cửa hàng đổi thưởng**<br/>Là **Học viên**, tôi muốn **tiêu xu (coins)**, để **mua khung avatar hoặc giao diện**.            | **Sprint**: Backlog<br/>**Points**: 8<br/>**Priority**: P3  | - Giao diện Shop liệt kê vật phẩm và giá.<br/>- Logic giao dịch "Mua" (trừ số dư, thêm vật phẩm vào kho).<br/>- "Kho đồ" để xem và trang bị vật phẩm.                                 |
