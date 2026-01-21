---
id: journeys
title: User Journeys
sidebar_label: Journeys
sidebar_position: 2
---

# User Journeys

Hành trình và tương tác người dùng.

---

## Core Journeys

### Journey 1: Học tập của học sinh

**Persona**: Phi Long (Học sinh Tiểu học)  
**Mục tiêu**: Hoàn thành bài học hàng ngày và nhận phần thưởng.  
**Kịch bản**: Phi Long mở ứng dụng sau giờ ăn tối, học 30 phút theo lộ trình AI gợi ý.

#### Journey Phases

| Giai đoạn | Hành động                  | Suy nghĩ                     | Cảm xúc | Cơ hội                            |
| --------- | -------------------------- | ---------------------------- | ------- | --------------------------------- |
| Đăng nhập | Mở ứng dụng, thấy chuỗi học tập| "Mình đang giữ phong độ tốt!"|         | Trò chơi hóa ngay từ màn hình đầu |
| Khám phá  | Xem bài học được gợi ý     | "Hôm nay học Toán nhé"       |         | AI gợi ý dựa trên lỗ hổng kiến thức|
| Học tập   | Xem video 5 phút           | "Video ngắn, dễ hiểu"        |         | Nội dung nhỏ gọn, thanh tiến độ   |
| Luyện tập | Làm bài trắc nghiệm 10 câu | "Sao mình sai câu này?"      |         | Giải thích ngay khi làm sai       |
| Thưởng    | Nhận 50 XP và 1 sao        | "Yeah! Sắp mở được huy hiệu rồi!"|      | Hiệu ứng chúc mừng sinh động      |

#### Journey Flow

```d2
direction: right

Open App -> Dashboard
Dashboard -> Select Lesson
Select Lesson -> Watch Video
Watch Video -> Take Quiz
Take Quiz -> Passed?: {
  shape: diamond
}
Passed? -> Get Reward: Score >= 70%
Passed? -> Review Lesson: Score < 70%
Review Lesson -> Watch Video
Get Reward -> Continuous Learning +1
```

**Chỉ số chính**:

- Tỉ lệ hoàn thành: 85%
- Thời gian mỗi phiên: 25-35 phút
- Điểm đứt gãy: Thất bại ở Quiz → phải xem lại video

### Journey 2: Giám sát của phụ huynh

**Persona**: Nhựt Linh (Phụ huynh)  
**Mục tiêu**: Xem báo cáo tuần của con mà không cần hỏi trực tiếp.  
**Kịch bản**: Tối Chủ nhật, Nhựt Linh mở ứng dụng để xem xét tiến độ học tập của con trong tuần.

| Giai đoạn | Hành động               | Điểm chạm                   | Khó khăn                | Giải pháp                  |
| --------- | ----------------------- | --------------------------- | ----------------------- | -------------------------- |
| Truy cập  | Mở từ thông báo         | Thông báo đẩy hàng tuần     | Quên kiểm tra báo cáo   | Nhắc nhở tự động 20h Chủ nhật|
| Tổng quan | Xem bảng điều khiển     | Bảng điều khiển phụ huynh   | Quá nhiều số liệu       | Làm nổi bật 3 chỉ số chính |
| Chi tiết  | Xem môn học còn yếu     | Phân tích môn học           | Không hiểu ý nghĩa %    | So sánh với tuần trước     |
| Hành động | Đặt mục tiêu tuần tới   | Đặt mục tiêu                | Chưa biết mục tiêu phù hợp| Gợi ý mục tiêu dựa trên dữ liệu|
| Chia sẻ   | Khen ngợi con qua app   | Tin nhắn trong ứng dụng     | Ngại khen trực tiếp     | Các mẫu tin nhắn có sẵn    |

**Chỉ số chính**:

- Phụ huynh hoạt động hàng tuần: 60%
- Thời gian xem báo cáo bình quân: 3 phút
- Tỉ lệ đặt mục tiêu: 40%

### Journey 3: Thi đấu giải đấu

**Persona**: Minh Lưng (Học sinh THCS)  
**Mục tiêu**: Thi đấu Toán với bạn cùng trường vào cuối tuần.  
**Kịch bản**: Chiều Thứ 7, Minh Lưng tham gia giải đấu do trường tổ chức.

| Giai đoạn | Hành động                 | Điểm chạm            | Khó khăn            | Giải pháp                           |
| --------- | ------------------------- | -------------------- | ------------------- | ----------------------------------- |
| Khám phá  | Nhận thông báo giải đấu   | Thông báo + Banner   | Không biết có sự kiện| Nhắc nhở trước 24 giờ và 1 giờ      |
| Đăng ký   | Đăng ký tham gia          | Sảnh giải đấu        | Sợ kết quả không tốt| Tùy chọn hiển thị ẩn danh           |
| Chờ đợi   | Chờ ghép cặp              | Phòng chờ            | Thời gian chờ nhàm chán| Trò chơi nhỏ trong lúc chờ          |
| Thi đấu   | Trả lời 10 câu thời gian thực| Màn hình thi đấu  | Gián đoạn kết nối   | Tự động kết nối lại, tạm dừng đếm ngược|
| Kết quả   | Xem kết quả, thứ hạng     | Bảng xếp hạng        | Kết quả thấp gây nản| Làm nổi bật sự cải thiện so với trước|

#### Journey Flow

```d2
direction: right

Receive Notification -> Register
Register -> Waiting Room
Waiting Room -> Matchmaking
Matchmaking -> Battle 10 Questions
Battle 10 Questions -> Result
Result -> Top 3?: {
  shape: diamond
}
Top 3? -> Badge & Rewards: Yes
Top 3? -> XP & Encourage: No
```

**Chỉ số chính**:

- Tỉ lệ đăng ký: 70% từ thông báo
- Tỉ lệ hoàn thành: 90%
- Tỉ lệ tham gia lại: 65% cho các giải đấu tiếp theo

### Journey 4: Giáo viên tạo đề đánh giá

**Persona**: Thầy Tùng (Giáo viên)  
**Mục tiêu**: Tạo đề thi 15 phút cho lớp từ ngân hàng câu hỏi.  
**Kịch bản**: Tối Thứ 5, Thầy Tùng cần tạo đề kiểm tra cho tiết học ngày mai.

| Giai đoạn | Hành động                  | Điểm chạm      | Khó khăn                    | Giải pháp                 |
| --------- | -------------------------- | -------------- | --------------------------- | ------------------------- |
| Truy cập  | Đăng nhập cổng giáo viên   | Cổng Web       | Quên mật khẩu               | Xác thực qua tài khoản Google |
| Lựa chọn  | Chọn lớp và môn học        | Chọn lớp       | Nhiều lớp, khó tìm          | Đưa các lớp gần đây lên đầu |
| Xây dựng  | Chọn câu hỏi từ ngân hàng  | Ngân hàng câu hỏi| Mất thời gian chọn từng câu| AI gợi ý dựa trên chủ đề  |
| Đánh giá  | Xem xem trước đề thi       | Chế độ xem trước| Không thấy được góc nhìn HS| Xem trước dưới tư cách học sinh|
| Giao bài  | Giao đề cho lớp            | Giao bài       | Quên thiết lập hạn chót     | Gợi ý hạn chót tự động    |

**Chỉ số chính**:

- Thời gian tạo đề trung bình: < 10 phút
- Tỉ trọng câu hỏi từ ngân hàng: 80%
- Câu hỏi tự biên soạn: 20%

---

## Journey Insights

### Pain Point Summary

| Hành trình            | Khó khăn chính                   | Ưu tiên |
| --------------------- | -------------------------------- | ------- |
| Học tập học sinh      | Thất bại ở Quiz gây nản lòng     | Cao     |
| Giám sát phụ huynh    | Quá nhiều dữ liệu, khó hành động | Cao     |
| Giải đấu              | Gián đoạn kết nối khi thi đấu    | Cao     |
| Đánh giá của giáo viên| Mất thời gian chọn lựa câu hỏi   | Trung bình|

### Opportunity Areas

| Cơ hội                            | Ảnh hưởng | Nỗ lực | Ưu tiên |
| --------------------------------- | --------- | ------ | ------- |
| AI gợi ý bài học bù đắp kiến thức | Cao       | Cao    | P0      |
| Thông báo báo cáo tuần cho phụ huynh| Cao     | Thấp   | P0      |
| Kết nối lại ổn định cho giải đấu  | Cao       | Trung bình| P1    |
| Mẫu đề thi theo chủ đề            | Trung bình| Thấp   | P1      |
| Trò chơi hóa cho phụ huynh        | Trung bình| Trung bình| P2    |

---

## References

- [Personas](./personas.md)
- [Usability](./usability.md)
