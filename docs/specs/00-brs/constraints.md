---
id: constraints
title: Constraints
sidebar_label: Constraints
sidebar_position: 5
---

# Constraints

Các ràng buộc kỹ thuật và nghiệp vụ.

---

## Business Constraints

### Timeline Constraints
| ID         | Constraint                                | Impact                        | Rationale                                      |
| ---------- | ----------------------------------------- | ----------------------------- | ---------------------------------------------- |
| **BC-001** | Timeline cố định: 25/01/2026 - 15/03/2026 | Không thể extend timeline     | Đã cam kết với stakeholders                    |
| **BC-002** | MVP phải hoàn thành trước 15/02/2026      | Tính năng giai đoạn 2 bị ảnh hưởng nếu delay | Release plan cố định                            |
| **BC-003** | Giai đoạn 1 chỉ tập trung vào web         | Mobile app delay đến giai đoạn 2 | Ưu tiên nền tảng web responsive trước          |

### Budget Constraints
| ID         | Constraint                                | Impact                        | Rationale                                      |
| ---------- | ----------------------------------------- | ----------------------------- | ---------------------------------------------- |
| **BC-004** | Ngân sách phát triển có hạn               | Ưu tiên tính năng P0, P1      | Tối ưu chi phí phát triển                      |
| **BC-005** | Sử dụng công nghệ nguồn mở                | Giảm chi phí license          | Phù hợp với startup                            |
| **BC-006** | Triển khai tại chỗ (on-premise)           | Giảm chi phí đám mây          | Phù hợp với trường học Việt Nam                |

### Scope Constraints
| ID         | Constraint                                | Impact                        | Rationale                                      |
| ---------- | ----------------------------------------- | ----------------------------- | ---------------------------------------------- |
| **BC-007** | Chỉ hỗ trợ 3 môn học chính (Toán, Tiếng Việt, Toán tiếng Anh) | Phạm vi ban đầu giới hạn      | Tập trung vào môn học cốt lõi                  |
| **BC-008** | Không tích hợp video từ nền tảng bên ngoài (YouTube, Vimeo) | Phải tự host toàn bộ video    | Đảm bảo bản quyền và tốc độ tải (FR-CONT-02)   |
| **BC-009** | Báo cáo không thể tùy chỉnh                | Người dùng phải dùng mẫu cố định | Giảm độ phức tạp phát triển                   |
| **BC-010** | Chưa hỗ trợ mobile app native             | Chỉ web responsive trong giai đoạn 1 | Tập trung phát triển web trước                |

### Regulatory Constraints
| ID         | Constraint                                | Impact                        | Rationale                                      |
| ---------- | ----------------------------------------- | ----------------------------- | ---------------------------------------------- |
| **BC-011** | Tuân thủ Luật An ninh mạng Việt Nam       | Dữ liệu phải lưu trữ trong nước | Yêu cầu pháp lý bắt buộc                       |
| **BC-012** | Tuân thủ Luật Bảo vệ quyền trẻ em         | Hạn chế thu thập dữ liệu nhạy cảm | Bảo vệ thông tin học sinh                      |
| **BC-013** | Tuân thủ GDPR cho người dùng quốc tế      | Cơ chế xóa dữ liệu theo yêu cầu | Mở rộng thị trường quốc tế                     |

### Resource Constraints
| ID         | Constraint                                | Impact                        | Rationale                                      |
| ---------- | ----------------------------------------- | ----------------------------- | ---------------------------------------------- |
| **BC-014** | Đội ngũ nhỏ (dưới 10 lập trình viên)      | Ưu tiên đơn giản hóa kiến trúc | Tối ưu năng suất đội nhỏ                       |
| **BC-015** | Không có chuyên gia AI full-time          | Sử dụng AI services bên thứ ba | Giảm độ phức tạp phát triển AI                |

---

## Technical Constraints

### Performance Constraints
| ID         | Constraint                                | Metric                  | Source             |
| ---------- | ----------------------------------------- | ----------------------- | ------------------ |
| **TC-PERF-01** | Hỗ trợ 10,000 người dùng đồng thời        | Concurrent users        | NFR-PERF-01        |
| **TC-PERF-02** | Độ trễ thi đấu &lt;100ms                     | Latency                 | NFR-PERF-02        |
| **TC-PERF-03** | Thời gian phản hồi API &lt;200ms             | API response time       | NFR-PERF-03        |
| **TC-PERF-04** | Thời gian tải trang &lt;3 giây               | Page load time          | NFR-PERF-04        |
| **TC-PERF-05** | Kết nối WebSocket &lt;500ms                  | WebSocket latency       | NFR-PERF-05        |
| **TC-PERF-06** | Sự kiện thời gian thực &lt;50ms              | Real-time event latency | NFR-PERF-06        |

### Security Constraints
| ID         | Constraint                                | Metric                  | Source             |
| ---------- | ----------------------------------------- | ----------------------- | ------------------ |
| **TC-SEC-01** | Thực thi RBAC với 5 vai trò               | Role-based access       | NFR-SEC-01         |
| **TC-SEC-02** | Mã hóa dữ liệu với TLS 1.3                | Encryption standard     | NFR-SEC-02         |
| **TC-SEC-03** | Xác thực JWT với chặn refresh token       | Authentication method   | NFR-SEC-03         |
| **TC-SEC-04** | 2FA cho admin với TOTP                    | Two-factor auth         | NFR-SEC-04         |
| **TC-SEC-05** | Quản lý đa thiết bị với đăng xuất từ xa   | Device management       | NFR-SEC-05, FR-AUTH-06 |

### Reliability Constraints
| ID         | Constraint                                | Metric                  | Source             |
| ---------- | ----------------------------------------- | ----------------------- | ------------------ |
| **TC-REL-01** | Độ khả dụng 99.9%                         | Uptime SLA              | NFR-REL-01         |
| **TC-REL-02** | Sao lưu dữ liệu hàng ngày                 | Backup frequency        | NFR-REL-02         |
| **TC-REL-03** | Phục hồi sau thảm họa trong &lt;4 giờ        | Recovery Time Objective | NFR-REL-03         |

### Architecture Constraints
| ID         | Constraint                                | Rationale                      |
| ---------- | ----------------------------------------- | ------------------------------ |
| **TC-ARCH-01** | Monolithic với modularization             | Đội ngũ nhỏ, triển khai đơn giản |
| **TC-ARCH-02** | PostgreSQL 14+ với Prisma 7               | Hỗ trợ JSONB, giao dịch mạnh    |
| **TC-ARCH-03** | Redis 6+ cho cache và Pub/Sub             | Độ trễ thấp cho real-time       |
| **TC-ARCH-04** | Docker containerization                   | Triển khai nhất quán            |
| **TC-ARCH-05** | Socket.IO với Redis adapter               | Mở rộng ngang WebSocket         |
| **TC-ARCH-06** | Multi-tenancy với data isolation hoàn toàn | FR-AUTH-04                     |
| **TC-ARCH-07** | Self-hosted video, không third-party      | FR-CONT-02                     |
| **TC-ARCH-08** | Shared question bank giữa các trường      | FR-CONT-03                     |

### Integration Constraints
| ID         | Constraint                                | Rationale                      |
| ---------- | ----------------------------------------- | ------------------------------ |
| **TC-INT-01** | Không tích hợp với nền tảng video bên thứ ba | Tuân thủ bản quyền (FR-CONT-02) |
| **TC-INT-02** | Phải tự host toàn bộ nội dung media       | Kiểm soát chất lượng và tốc độ  |
| **TC-INT-03** | Email notification bắt buộc               | Thông báo quan trọng đến người dùng |
| **TC-INT-04** | PDF report generation hàng tuần/tháng     | FR-REP-02                      |

---

## Assumptions

| ID         | Assumption                          | Risk if False        | Mitigation                   |
| ---------- | ----------------------------------- | -------------------- | ---------------------------- |
| **AS-001** | Người dùng có kết nối mạng ổn định  | Không thể học/thi đấu | Cải tiến progressive loading, cache |
| **AS-002** | Trường có quản trị viên CNTT cơ bản | Khó vận hành         | Tài liệu đào tạo và hỗ trợ 24/7 |
| **AS-003** | Email hợp lệ để đăng ký             | Chặn đăng ký         | SMS OTP backup               |
| **AS-004** | Môi trường Docker có sẵn tại trường | Không thể triển khai | Cung cấp VM image alternative |
| **AS-005** | Học sinh có thiết bị hỗ trợ web hiện đại | Không thể truy cập   | Progressive enhancement, fallback |
| **AS-006** | Phụ huynh có email để nhận báo cáo  | Không gửi được báo cáo | In-app notification, SMS backup |

---

## References

- [Business Overview](/specs)
- [Requirements](./requirements.md)
- [Roadmap](./roadmap.md)
- [Success Metrics](./metrics.md)
- [System Design](../01-arch/design.md)