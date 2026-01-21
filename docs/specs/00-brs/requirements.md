---
id: requirements
title: Requirements
sidebar_label: Requirements
sidebar_position: 2
---

# Requirements

Yêu cầu nghiệp vụ và kỹ thuật.

---

## Functional Requirements

### Phân hệ Học tập

| ID       | Requirement                                       | Priority |
| -------- | ------------------------------------------------- | -------- |
| FR-HS-01 | Hiển thị lộ trình học tập AI                      | P0       |
| FR-HS-02 | Duyệt nội dung: Môn → Khối lớp → Chủ đề → Bài học | P0       |
| FR-HS-03 | Lọc nội dung theo học kỳ                          | P1       |
| FR-HS-04 | Video bài giảng và bài tập tương tác              | P0       |
| FR-HS-05 | Nhật ký học tập                                   | P1       |

### Phân hệ Tournament

| ID         | Requirement                  | Priority |
| ---------- | ---------------------------- | -------- |
| FR-COMP-01 | Đăng ký tham gia giải đấu    | P0       |
| FR-COMP-02 | Nút Xem lại và Tham gia      | P0       |
| FR-COMP-03 | Mã mời cho các vòng thi      | P1       |
| FR-COMP-04 | Thi đấu thời gian thực       | P0       |
| FR-COMP-05 | Thăng hạng tự động           | P1       |
| FR-COMP-06 | Thách đấu trực tiếp          | P2       |
| FR-COMP-07 | Bảng xếp hạng thời gian thực | P0       |

### Phân hệ Auth

| ID         | Requirement                    | Priority |
| ---------- | ------------------------------ | -------- |
| FR-AUTH-01 | Đăng ký với các vai trò        | P0       |
| FR-AUTH-02 | Liên kết phụ huynh và học sinh | P1       |
| FR-AUTH-03 | RBAC với 5 vai trò             | P0       |
| FR-AUTH-04 | Cách ly đa thực thể            | P0       |
| FR-AUTH-05 | Quản lý thiết bị               | P1       |
| FR-AUTH-06 | Đăng xuất từ xa                | P1       |

---

## Non-Functional Requirements

### Hiệu năng

| ID          | Requirement                   | Metric            |
| ----------- | ----------------------------- | ----------------- |
| NFR-PERF-01 | Khả năng người dùng đồng thời | 10,000 người dùng |
| NFR-PERF-02 | Độ trễ thi đấu                | < 100ms           |
| NFR-PERF-03 | Thời gian phản hồi API        | < 200ms           |
| NFR-PERF-04 | Thời gian tải trang           | < 3 giây          |
| NFR-PERF-05 | Kết nối WebSocket             | < 500ms           |
| NFR-PERF-06 | Sự kiện thời gian thực        | < 50ms            |

### Bảo mật

| ID         | Requirement                      | Metric                    |
| ---------- | -------------------------------- | ------------------------- |
| NFR-SEC-01 | Thực thi RBAC                    | 5 vai trò mặc định        |
| NFR-SEC-02 | Mã hóa dữ liệu                   | TLS 1.3                   |
| NFR-SEC-03 | Xác thực JWT                     | Chặn mã thông báo làm mới |
| NFR-SEC-04 | Xác thực 2 lớp cho quản trị viên | Hỗ trợ TOTP               |
| NFR-SEC-05 | Quản lý đa thiết bị              | Đăng xuất từ xa           |

### Độ tin cậy

| ID         | Requirement           | Metric                                             |
| ---------- | --------------------- | -------------------------------------------------- |
| NFR-REL-01 | Độ khả dụng           | 99.9% thời gian hoạt động                          |
| NFR-REL-02 | Sao lưu dữ liệu       | Hàng ngày với khả năng khôi phục tại một thời điểm |
| NFR-REL-03 | Phục hồi sau thảm họa | RTO < 4 giờ                                        |

---

## Traceability Matrix

| Requirement | Use Case     | Module     | Test Case    |
| ----------- | ------------ | ---------- | ------------ |
| FR-AUTH-01  | UC-AUTH-001  | Auth       | TC-AUTH-001  |
| FR-AUTH-03  | UC-AUTH-002  | Auth       | TC-AUTH-002  |
| FR-HS-01    | UC-LEARN-001 | Learning   | TC-LEARN-001 |
| FR-COMP-01  | UC-COMP-001  | Tournament | TC-COMP-001  |

---

## References

- [Overview](/specs)
- [Use Cases](./cases.md)
- [System Design](../01-arch/design.md)
