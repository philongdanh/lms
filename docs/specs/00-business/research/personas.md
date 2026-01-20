---
id: personas
title: User Personas
sidebar_label: Personas
sidebar_position: 1
---

# User Personas

Chân dung người dùng cho thiết kế sản phẩm.

---

## Primary Personas

### Persona 1: Minh - Học sinh Tiểu học

**Demographics**:
| Attribute | Value |
|-----------|-------|
| Age | 7-11 tuổi |
| Role | Student |
| Experience | Mới làm quen với công nghệ |
| Location | Thành phố lớn (Hà Nội, TP.HCM) |

**Goals**:
- Học tập vui vẻ, không nhàm chán
- Thu thập huy hiệu và phần thưởng
- Thi đấu với bạn bè

**Pain Points**:
- Dễ mất tập trung khi bài học quá dài
- Không biết mình đang tiến bộ như thế nào
- Cảm thấy áp lực khi so sánh với bạn bè

**Behaviors**:
- Thích video ngắn, màu sắc tươi sáng
- Hay hỏi "Con được bao nhiêu sao rồi?"
- Thích khoe thành tích với bạn bè và bố mẹ

**Quote**:
> "Con muốn học như chơi game, có thưởng và lên level!"

**Key Scenarios**:
1. Học bài buổi tối sau giờ cơm (30-45 phút)
2. Thi đấu Tournament cuối tuần với bạn cùng lớp
3. Xem lại video bài giảng khi không hiểu


### Persona 2: Lan - Học sinh THCS

**Demographics**:
| Attribute | Value |
|-----------|-------|
| Age | 12-15 tuổi |
| Role | Student |
| Experience | Quen thuộc với smartphone và máy tính |
| Location | Thành phố và tỉnh lẻ |

**Goals**:
- Đạt điểm cao trong các kỳ thi
- Học theo tốc độ riêng, không bị áp đặt
- Biết điểm yếu để cải thiện

**Pain Points**:
- Không biết nên tập trung ôn môn nào
- Bài tập quá nhiều, không có thời gian giải trí
- Không được phản hồi ngay khi làm sai

**Behaviors**:
- Học tập trung vào buổi tối và cuối tuần
- Thích xem giải thích chi tiết khi làm sai
- So sánh thứ hạng với bạn bè thường xuyên

**Quote**:
> "Em muốn biết chính xác mình yếu ở đâu để tập trung ôn."

**Key Scenarios**:
1. Ôn thi cuối kỳ với đề thi thử
2. Học bù các chủ đề khó vào cuối tuần
3. Theo dõi tiến độ so với kế hoạch


### Persona 3: Hoa - Phụ huynh

**Demographics**:
| Attribute | Value |
|-----------|-------|
| Age | 35-50 tuổi |
| Role | Parent |
| Experience | Sử dụng smartphone cơ bản |
| Location | Toàn quốc |

**Goals**:
- Theo dõi con học tập mà không cần hỏi liên tục
- Biết con đang tiến bộ hay tụt hậu
- Nhận thông báo khi con bỏ học

**Pain Points**:
- Không có thời gian ngồi cùng con học
- Không hiểu nội dung chương trình mới
- Lo lắng con chơi game thay vì học

**Behaviors**:
- Check báo cáo hàng tuần vào Chủ nhật
- Quan tâm đến thời gian học và số bài hoàn thành
- So sánh con với các học sinh khác cùng lớp

**Quote**:
> "Tôi muốn biết con học như thế nào mà không phải hỏi liên tục."

**Key Scenarios**:
1. Xem báo cáo tuần vào tối Chủ nhật
2. Nhận thông báo khi con không học 3 ngày liên tiếp
3. Đặt mục tiêu học tập cho con theo tuần

---

## Secondary Personas

### Persona 4: Thầy Hùng - Giáo viên

**Demographics**:
| Attribute | Value |
|-----------|-------|
| Age | 30-55 tuổi |
| Role | Teacher |
| Experience | Vừa phải với công nghệ |

**Goals**:
- Quản lý lớp học hiệu quả
- Tạo đề thi nhanh từ ngân hàng câu hỏi
- Theo dõi tiến độ từng học sinh

**Pain Points**:
- Mất thời gian soạn đề thủ công
- Khó phát hiện học sinh yếu kém
- Không có thời gian phản hồi từng em


### Persona 5: Cô Mai - Admin Trường học

**Demographics**:
| Attribute | Value |
|-----------|-------|
| Age | 35-50 tuổi |
| Role | School Admin |
| Experience | Thành thạo Excel, vừa phải với hệ thống |

**Goals**:
- Quản lý tài khoản giáo viên và học sinh
- Xem tổng quan hoạt động học tập của trường
- Tổ chức Tournament giữa các lớp

**Pain Points**:
- Import danh sách học sinh đầu năm mất nhiều thời gian
- Báo cáo thủ công cho Ban giám hiệu
- Khó đánh giá hiệu quả sử dụng hệ thống

---

## Persona Usage

| Design Decision | Primary Persona | Consideration |
|-----------------|-----------------|---------------|
| Gamification nổi bật | Minh (Tiểu học) | Huy hiệu, sao, animation celebrate |
| Báo cáo chi tiết | Lan (THCS), Hoa (Parent) | Analytics gap analysis, comparison |
| UI đơn giản | Hoa (Parent) | Mobile-first, big buttons, clear labels |
| Bulk import | Cô Mai (Admin) | CSV upload, template download |
| Quiz builder | Thầy Hùng (Teacher) | Drag-drop, ngân hàng câu hỏi có sẵn |

---

## References

- [User Journeys](./journeys.md)
- [Usability Guidelines](./usability.md)

---

## References

- [Journeys](./journeys.md)
- [Vision](/specs/business/overview)
