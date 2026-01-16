---
id: vision
title: Product Vision
sidebar_label: Vision
---

# Product Vision

Tầm nhìn sản phẩm, yêu cầu, và user stories cho nền tảng LMS.

## Vision Statement

Hệ thống LMS thông minh hướng đến cá nhân hóa giáo dục cho học sinh từ lớp 1-12. Điểm khác biệt cốt lõi là sự kết hợp **AI Learning Paths** và **Cơ chế thi đấu (Gamification)** để tăng động lực học tập.

## Mission

Cung cấp nền tảng học tập số toàn diện, kết hợp AI và gamification để tối ưu trải nghiệm học tập cá nhân hóa cho học sinh Việt Nam.

---

## Target Users

| User Segment | Description | Primary Needs |
|--------------|-------------|---------------|
| **Student** | Học sinh lớp 1-12 | Học tập cá nhân hóa, thi đấu vui, gamification |
| **Parent** | Phụ huynh học sinh | Theo dõi tiến độ, báo cáo chi tiết |
| **Teacher** | Giáo viên trường học | Công cụ quản lý, tạo đề thi |
| **School** | Quản trị viên trường | Tổng quan học sinh, tổ chức thi đấu |

## Value Proposition

- **Cho học sinh**: Lộ trình học AI cá nhân hóa, thi đấu hấp dẫn, hệ thống phần thưởng
- **Cho phụ huynh**: Báo cáo chi tiết 4 cấp, theo dõi real-time
- **Cho giáo viên**: Bộ công cụ quản lý toàn diện, ngân hàng câu hỏi
- **Cho trường học**: Cách ly multi-tenant, tổ chức tournament

---

## Business Requirements (BR)

### Requirements List

| ID | Requirement Description | Priority | Stakeholders |
|----|------------------------|----------|--------------|
| **BR-01** | Lộ trình học cá nhân hóa tự động (AI-driven) | P0 | Student, Parent |
| **BR-02** | Tournament thi đấu trí tuệ đa cấp | P0 | Student, School |
| **BR-03** | Báo cáo & phân tích 4 cấp | P1 | Parent, Teacher |
| **BR-04** | Bộ công cụ cho trường/giáo viên | P1 | Teacher, School |
| **BR-05** | Gamification toàn diện | P2 | Student |
| **BR-06** | Kho nội dung học tập số | P1 | Student |
| **BR-07** | Quản lý multi-tenant | P1 | Root Admin |
| **BR-08** | Quản lý session đa thiết bị | P1 | All |
| **BR-09** | WebSocket real-time | P1 | Student, Teacher |
| **BR-10** | Chiến lược cascade delete | P1 | Root Admin, Tenant Admin |

### Stakeholder Map

```d2
direction: down

RootAdmin: Root Admin
System: LMS Platform {
  shape: circle
}
Student: Student
Teacher: Teacher
Parent: Parent
SchoolAdmin: School Admin

RootAdmin -> System: Quản trị hệ thống
System -> Student: Cung cấp bài học/thi đấu
System -> Teacher: Công cụ quản lý
System -> Parent: Báo cáo tiến độ
System -> SchoolAdmin: Quản lý tổng thể

Teacher -> Student: Giao bài/Hỗ trợ
Parent -> Student: Giám sát
SchoolAdmin -> Teacher: Tổ chức
RootAdmin -> SchoolAdmin: Quản lý
```

---

## Functional Requirements (FR)

### Module: Learning

| FR ID | Description | Acceptance Criteria |
|-------|-------------|---------------------|
| **FR-HS-01** | Hiển thị lộ trình học AI | AI gợi ý lộ trình cá nhân hóa |
| **FR-HS-02** | Duyệt nội dung: Môn → Lớp → Chủ đề → Bài | Navigation hoạt động đúng |
| **FR-HS-03** | Lọc nội dung theo học kỳ | Filter áp dụng cho bài học |
| **FR-HS-04** | Video bài giảng, bài tập tương tác | Nội dung hiển thị đúng |
| **FR-HS-05** | Nhật ký học tập | Lịch sử có thể truy cập |

### Module: Tournament

| FR ID | Description | Acceptance Criteria |
|-------|-------------|---------------------|
| **FR-COMP-01** | Đăng ký tham gia tournament | Đăng ký thành công |
| **FR-COMP-02** | Nút Xem lại và Tham gia | Cả hai chức năng hoạt động |
| **FR-COMP-03** | Mã mời cho các vòng thi | Xác thực mã hoạt động |
| **FR-COMP-04** | Thi đấu real-time | Độ trễ < 100ms |
| **FR-COMP-05** | Thăng hạng tự động | Logic thăng hạng đúng |
| **FR-COMP-06** | Thách đấu 1vs1 | P2P matching hoạt động |
| **FR-COMP-07** | Bảng xếp hạng real-time | Cập nhật < 50ms |

### Module: Auth

| FR ID | Description | Acceptance Criteria |
|-------|-------------|---------------------|
| **FR-AUTH-01** | Đăng ký với roles | Gán role đúng |
| **FR-AUTH-02** | Liên kết phụ huynh-học sinh | ParentStudentLink hoạt động |
| **FR-AUTH-03** | RBAC với 5 roles | Permissions được enforce |
| **FR-AUTH-04** | Cách ly multi-tenant | Data tách biệt |
| **FR-AUTH-05** | Quản lý thiết bị | Danh sách thiết bị có thể truy cập |
| **FR-AUTH-06** | Đăng xuất từ xa | Remote logout hoạt động |

---

## Non-Functional Requirements (NFR)

### Performance

| ID | Requirement | Metric |
|----|-------------|--------|
| **NFR-PERF-01** | Đồng thời | 10,000 concurrent users |
| **NFR-PERF-02** | Độ trễ thi đấu | < 100ms |
| **NFR-PERF-03** | API response (P95) | < 200ms |
| **NFR-PERF-04** | Page load | < 3s |
| **NFR-PERF-05** | WebSocket connection | < 500ms |
| **NFR-PERF-06** | Real-time events | < 50ms |

### Security

| ID | Requirement | Metric |
|----|-------------|--------|
| **NFR-SEC-01** | RBAC enforcement | 5 seeded roles |
| **NFR-SEC-02** | Mã hóa dữ liệu | TLS 1.3 |
| **NFR-SEC-03** | JWT authentication | Refresh token blacklisting |
| **NFR-SEC-04** | 2FA cho admins | Hỗ trợ TOTP |
| **NFR-SEC-05** | Quản lý đa thiết bị | Remote logout |

### Reliability

- Availability: 99.9% uptime
- Backup: Hàng ngày với point-in-time recovery
- Disaster Recovery: RTO < 4 giờ

---

## User Stories

### Epic: Learning Journey

#### Story: AI Learning Path

**As a** student  
**I want** xem lộ trình học do AI gợi ý  
**So that** tôi có thể học theo nhu cầu cá nhân

**Acceptance Criteria**:
- [ ] AI phân tích điểm mạnh/yếu
- [ ] Gợi ý bài học phù hợp
- [ ] Cập nhật dựa trên tiến độ

### Epic: Tournament

#### Story: Real-time Competition

**As a** student  
**I want** thi đấu real-time với học sinh khác  
**So that** tôi có động lực học tập

**Acceptance Criteria**:
- [ ] Đếm ngược trong các vòng thi
- [ ] Điểm số cập nhật tức thì
- [ ] Bảng xếp hạng real-time

---

## References

- [Constraints](./constraints.md)
- [Success Metrics](./metrics.md)
- [System Design](../01-architecture/system-design.md)
