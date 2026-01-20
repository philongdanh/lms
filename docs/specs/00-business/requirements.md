---
id: requirements
title: Requirements
sidebar_label: Requirements
sidebar_position: 2
---

# Requirements

Product requirements specification (FR & NFR).

---

## Overview

This document defines both functional requirements (FR) and non-functional
requirements (NFR) for the system.

---

## Functional Requirements

### Requirement ID Format

```
FR-{MODULE}-{NUMBER}
```

### Learning Module

| ID       | Requirement                              | Priority | Status |
| -------- | ---------------------------------------- | -------- | ------ |
| FR-HS-01 | Hiển thị lộ trình học AI                 | P0       |        |
| FR-HS-02 | Duyệt nội dung: Môn → Lớp → Chủ đề → Bài | P0       |        |
| FR-HS-03 | Lọc nội dung theo học kỳ                 | P1       |        |
| FR-HS-04 | Video bài giảng, bài tập tương tác       | P0       |        |
| FR-HS-05 | Nhật ký học tập                          | P1       |        |

### Tournament Module

| ID         | Requirement                 | Priority | Status |
| ---------- | --------------------------- | -------- | ------ |
| FR-COMP-01 | Đăng ký tham gia tournament | P0       |        |
| FR-COMP-02 | Nút Xem lại và Tham gia     | P0       |        |
| FR-COMP-03 | Mã mời cho các vòng thi     | P1       |        |
| FR-COMP-04 | Thi đấu real-time           | P0       |        |
| FR-COMP-05 | Thăng hạng tự động          | P1       |        |
| FR-COMP-06 | Thách đấu 1vs1              | P2       |        |
| FR-COMP-07 | Bảng xếp hạng real-time     | P0       |        |

### Auth Module

| ID         | Requirement                 | Priority | Status |
| ---------- | --------------------------- | -------- | ------ |
| FR-AUTH-01 | Đăng ký với roles           | P0       |        |
| FR-AUTH-02 | Liên kết phụ huynh-học sinh | P1       |        |
| FR-AUTH-03 | RBAC với 5 roles            | P0       |        |
| FR-AUTH-04 | Cách ly multi-tenant        | P0       |        |
| FR-AUTH-05 | Quản lý thiết bị            | P1       |        |
| FR-AUTH-06 | Đăng xuất từ xa             | P1       |        |

---

## Non-Functional Requirements

### Requirement ID Format

```
NFR-{CATEGORY}-{NUMBER}
```

### Performance

| ID          | Requirement               | Metric                  |
| ----------- | ------------------------- | ----------------------- |
| NFR-PERF-01 | Concurrent users capacity | 10,000 concurrent users |
| NFR-PERF-02 | Competition latency       | < 100ms                 |
| NFR-PERF-03 | API response time (P95)   | < 200ms                 |
| NFR-PERF-04 | Page load time            | < 3s                    |
| NFR-PERF-05 | WebSocket connection      | < 500ms                 |
| NFR-PERF-06 | Real-time events          | < 50ms                  |

### Security

| ID         | Requirement             | Metric                     |
| ---------- | ----------------------- | -------------------------- |
| NFR-SEC-01 | RBAC enforcement        | 5 seeded roles             |
| NFR-SEC-02 | Data encryption         | TLS 1.3                    |
| NFR-SEC-03 | JWT authentication      | Refresh token blacklisting |
| NFR-SEC-04 | 2FA for admins          | TOTP support               |
| NFR-SEC-05 | Multi-device management | Remote logout              |

### Reliability

| ID         | Requirement       | Metric                            |
| ---------- | ----------------- | --------------------------------- |
| NFR-REL-01 | Availability      | 99.9% uptime                      |
| NFR-REL-02 | Backup            | Daily with point-in-time recovery |
| NFR-REL-03 | Disaster Recovery | RTO < 4 hours                     |

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
- [Use Cases](./use-cases.md)
- [System Design](../01-architecture/system-design.md)
