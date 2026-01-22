---
id: glossary
title: Glossary
sidebar_label: Glossary
sidebar_position: 7
---

# Glossary

Thuật ngữ và định nghĩa chuyên ngành.

---

## Education & Platform Terms

| Term | Definition | Context |
|------|------------|---------|
| **Adaptive Learning (Học tập thích ứng)** | Hệ thống tự động điều chỉnh nội dung và độ khó dựa trên năng lực và tiến độ của người học. | AI Learning Paths |
| **AI Learning Paths (Lộ trình học tập AI)** | Lộ trình học tập được cá nhân hóa bằng AI, đề xuất bài học và bài tập dựa trên điểm mạnh/yếu của học sinh. | FR-HS-01 |
| **Báo cáo 4 cấp** | Báo cáo chi tiết ở 4 cấp độ: Học sinh → Lớp → Trường → Toàn hệ thống. | FR-REP-03 |
| **Chủ đề (Topic)** | Nhóm kiến thức con thuộc một môn học và khối lớp cụ thể. | FR-HS-02 |
| **Gamification (Trò chơi hóa)** | Ứng dụng các yếu tố trò chơi (điểm, huy hiệu, bảng xếp hạng) vào bối cảnh học tập để tăng động lực. | Overview - Vision |
| **Học kỳ** | Khoảng thời gian học tập được quy định bởi nhà trường, thường là một nửa năm học. | FR-HS-03 |
| **Khối lớp (Grade)** | Cấp độ lớp học theo chương trình giáo dục (ví dụ: Lớp 1, Lớp 2, ... Lớp 12). | FR-HS-02 |
| **Kiến thức (Knowledge)** | Tổng hợp thông tin, lý thuyết và kỹ năng trong một lĩnh vực học tập. | FR-HS-06 |
| **Lộ trình học tập (Learning Path)** | Chuỗi các bài học và hoạt động được sắp xếp theo trình tự để đạt mục tiêu học tập. | FR-HS-01 |
| **Môn học (Subject)** | Lĩnh vực học tập chính, ví dụ: Toán, Tiếng Việt, Toán tiếng Anh. | FR-HS-02 |
| **Multi-tenant (Đa thực thể)** | Kiến trúc cho phép nhiều tổ chức (trường học) dùng chung ứng dụng với dữ liệu hoàn toàn tách biệt. | FR-AUTH-04 |
| **Ngân hàng câu hỏi (Question Bank)** | Kho lưu trữ tập trung các câu hỏi có thể được gắn thẻ và chia sẻ. | FR-CONT-03 |
| **Nhật ký học tập (Learning Log)** | Bản ghi chi tiết các hoạt động học tập, tiến độ và kết quả của người học. | FR-HS-05 |
| **Streak** | Chuỗi ngày học tập liên tiếp. Hệ thống khen thưởng khi duy trì streak (ví dụ: 7 ngày). | FR-HS-08 |
| **Tournament (Giải đấu)** | Hình thức thi đấu thời gian thực giữa các học sinh, có thể theo vòng và có bảng xếp hạng. | FR-COMP-04 |
| **Bài học (Lesson)** | Đơn vị nội dung học tập nhỏ nhất, bao gồm video bài giảng và/hoặc bài tập tương tác. | FR-HS-04 |

---

## Technical & System Terms

| Term | Definition | Context |
|------|------------|---------|
| **API (Application Programming Interface)** | Giao diện lập trình ứng dụng cho phép các thành phần hệ thống giao tiếp với nhau. | NFR-PERF-03 |
| **Concurrent Users (Người dùng đồng thời)** | Số lượng người dùng tương tác với hệ thống tại cùng một thời điểm. | NFR-PERF-01 |
| **Containerization (Đóng gói container)** | Phương pháp đóng gói ứng dụng và các phụ thuộc vào một container nhẹ, có thể triển khai nhất quán. | TC-ARCH-04 |
| **Dashboard (Bảng điều khiển)** | Giao diện trực quan hiển thị tổng quan dữ liệu và số liệu quan trọng. | UC-ADMIN-001 |
| **Data Isolation (Cách ly dữ liệu)** | Cơ chế đảm bảo dữ liệu của các thực thể (trường học) độc lập và không thể truy cập chéo. | FR-AUTH-04 |
| **JWT (JSON Web Token)** | Tiêu chuẩn mã thông báo bảo mật dùng để xác thực và ủy quyền. | NFR-SEC-03 |
| **Latency (Độ trễ)** | Thời gian trễ từ khi gửi yêu cầu đến khi nhận được phản hồi. | NFR-PERF-02 |
| **Monolithic Architecture (Kiến trúc nguyên khối)** | Kiến trúc phần mềm trong đó tất cả thành phần được xây dựng và triển khai như một đơn vị duy nhất. | TC-ARCH-01 |
| **MVP (Minimum Viable Product)** | Sản phẩm khả dụng tối thiểu với các tính năng cốt lõi để thu thập phản hồi sớm. | Roadmap - Phase 1 |
| **NFR (Non-Functional Requirement)** | Yêu cầu phi chức năng, liên quan đến chất lượng hệ thống (hiệu năng, bảo mật, độ tin cậy). | Requirements |
| **OTP (One-Time Password)** | Mật khẩu dùng một lần, thường gửi qua SMS hoặc email để xác thực. | UC-AUTH-001 |
| **Pub/Sub (Publish-Subscribe)** | Mẫu kiến trúc truyền thông không đồng bộ, nơi người gửi (publisher) đưa tin nhắn mà không biết người nhận (subscriber). | TC-ARCH-03 |
| **RBAC (Role-Based Access Control)** | Kiểm soát truy cập dựa trên vai trò, gán quyền theo vai trò người dùng. | NFR-SEC-01 |
| **Real-time (Thời gian thực)** | Khả năng xử lý và phản hồi ngay lập tức, không có độ trễ đáng kể. | FR-COMP-04 |
| **RTO (Recovery Time Objective)** | Mục tiêu thời gian tối đa cho phép để khôi phục hệ thống sau sự cố. | NFR-REL-03 |
| **SLA (Service Level Agreement)** | Thỏa thuận mức dịch vụ, cam kết về độ khả dụng và hiệu suất. | NFR-REL-01 |
| **Socket.IO** | Thư viện JavaScript cho giao tiếp thời gian thực, hai chiều giữa client và server. | TC-ARCH-05 |
| **TLS (Transport Layer Security)** | Giao thức bảo mật mã hóa dữ liệu truyền qua mạng. | NFR-SEC-02 |
| **TOTP (Time-Based One-Time Password)** | Mật khẩu dùng một lần dựa trên thời gian, thường dùng cho xác thực hai yếu tố (2FA). | NFR-SEC-04 |
| **WebSocket** | Giao thức truyền thông hai chiều, bất đồng bộ qua một kết nối TCP duy nhất. | NFR-PERF-05 |
| **XP (Experience Points)** | Điểm kinh nghiệm, một loại điểm số ảo trong hệ thống gamification. | US-LEARN-001 |

---

## Business & Product Terms

| Term | Definition | Context |
|------|------------|---------|
| **DAU/MAU** | Tỷ lệ người dùng hoạt động hàng ngày trên tổng số người dùng hoạt động hàng tháng, đo lường mức độ gắn bó. | Success Criteria |
| **Epic** | Nhóm lớn các user story liên quan đến một tính năng hoặc mục tiêu kinh doanh chung. | Cases - User Stories |
| **KPI (Key Performance Indicator)** | Chỉ số hiệu suất chính dùng để đo lường thành công. | Metrics |
| **Leaderboard (Bảng xếp hạng)** | Bảng hiển thị thứ hạng của người tham gia dựa trên điểm số hoặc thành tích. | FR-HS-07 |
| **NPS (Net Promoter Score)** | Chỉ số đo lường mức độ sẵn sàng giới thiệu sản phẩm của khách hàng. | Metrics |
| **Persona** | Hồ sơ người dùng điển hình, đại diện cho một nhóm người dùng với đặc điểm, mục tiêu và hành vi chung. | Personas |
| **Product Roadmap (Lộ trình sản phẩm)** | Tài liệu chiến lược thể hiện kế hoạch phát triển sản phẩm theo thời gian. | Roadmap |
| **Stakeholder** | Cá nhân hoặc nhóm có quan tâm, ảnh hưởng hoặc chịu ảnh hưởng bởi dự án/sản phẩm. | Overview - Stakeholders |
| **SUS (System Usability Scale)** | Thang đo khả năng sử dụng hệ thống thông qua bảng câu hỏi tiêu chuẩn. | UX - Testing Methods |
| **Tenant** | Một thực thể độc lập (ví dụ: trường học) trong hệ thống multi-tenant. | Glossary (trước) |
| **Use Case** | Mô tả chi tiết về cách người dùng tương tác với hệ thống để đạt mục tiêu cụ thể. | Cases |
| **User Story** | Mô tả đơn giản, ngắn gọn về một tính năng từ góc độ người dùng cuối. | Cases - User Stories |
| **Value Proposition (Đề xuất giá trị)** | Lời hứa về giá trị mà sản phẩm/dịch vụ mang lại cho một nhóm khách hàng cụ thể. | Overview - Value Proposition |

---

## References

- [Business Overview](./overview.md)
- [Requirements](./requirements.md)