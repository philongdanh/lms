---
id: backlog
title: Backlog
sidebar_label: Backlog
sidebar_position: 3
---

# Backlog

Backlog hoàn chỉnh với mức độ ưu tiên, độ khó và phân bổ sprint.

---

## Overview

Tài liệu này chứa tất cả các ticket (user stories, tasks, bugs) được tổ chức theo mức độ ưu tiên và sprint.

---

## Legend

### Priority

| Priority | Color     | Description          |
| -------- | --------- | -------------------- |
| P0       | `#DC2626` | Critical - Blocker (Nghiêm trọng - Chặn) |
| P1       | `#F97316` | High - Must have (Cao - Phải có)         |
| P2       | `#EAB308` | Medium - Should have (Trung bình - Nên có) |
| P3       | `#22C55E` | Low - Nice to have (Thấp - Nên có)       |

### Difficulty

| Difficulty | Color     | Points Range |
| ---------- | --------- | ------------ |
| Easy       | `#22C55E` | 1-2 pts      |
| Medium     | `#F59E0B` | 3-5 pts      |
| Hard       | `#EF4444` | 8-13 pts     |

### Type

| Type       | Color        | Description          |
| ---------- | ------------ | -------------------- |
| Frontend   | `#3B82F6` FE | Triển khai UI/UX     |
| Backend    | `#8B5CF6` BE | Công việc API/Database |
| Full-stack | `#6366F1` FS | Cả FE và BE          |
| DevOps     | `#14B8A6` DO | Cơ sở hạ tầng        |

---

## Backlog Summary

| Priority        | Số lượng | Điểm   | % Tổng số  |
| --------------- | ----- | ------ | ---------- |
| `#DC2626` P0    | 24    | 120    | 48%        |
| `#F97316` P1    | 18    | 85     | 34%        |
| `#EAB308` P2    | 12    | 45     | 18%        |
| `#22C55E` P3    | 8     | 40     | -          |
| **Total (MVP)** | 54    | 250    | 100%       |

---

## Must Have (MVP)

### Authentication

| ID      | Title               | Type | Points | Sprint |
| ------- | ------------------- | ---- | ------ | ------ |
| LMS-001 | Đăng ký với email   | FS   | 5      | S2     |
| LMS-002 | Đăng ký với SĐT     | FS   | 5      | S2     |
| LMS-003 | Xác thực OTP        | FS   | 5      | S2     |
| LMS-004 | Login flow          | FS   | 5      | S4     |
| LMS-005 | Khôi phục mật khẩu  | FS   | 3      | S5     |
| LMS-006 | Đăng xuất           | FE   | 2      | S4     |
| LMS-007 | Quản lý phiên       | BE   | 8      | S4     |
| LMS-008 | Protected routes    | FE   | 5      | S4     |

### Learning

| ID      | Title                 | Type | Points | Sprint |
| ------- | --------------------- | ---- | ------ | ------ |
| LMS-010 | Danh sách môn học     | FE   | 3      | S2     |
| LMS-011 | Xem lộ trình học      | FS   | 5      | S4     |
| LMS-012 | Xem nội dung bài học  | FE   | 5      | S4     |
| LMS-013 | Bài tập trắc nghiệm   | FS   | 8      | S4     |
| LMS-014 | Theo dõi tiến độ      | FS   | 5      | S4     |
| LMS-015 | Hệ thống điểm         | BE   | 5      | S5     |
| LMS-016 | Lên cấp (Level up)    | FS   | 5      | S5     |

### Tournament

| ID      | Title                 | Type | Points | Sprint |
| ------- | --------------------- | ---- | ------ | ------ |
| LMS-020 | Danh sách giải đấu    | FE   | 5      | S5     |
| LMS-021 | Chi tiết giải đấu     | FE   | 5      | S5     |
| LMS-022 | Quy trình đăng ký     | FS   | 3      | S5     |
| LMS-023 | Match gameplay        | FS   | 13     | S6     |
| LMS-024 | Leaderboard thời gian thực | FS   | 8      | S6     |
| LMS-025 | Kết quả & tính điểm   | BE   | 5      | S6     |
| LMS-026 | Phân phối giải thưởng | BE   | 5      | S6     |

---

## Should Have

### Learning Enhancements

| ID      | Title                   | Type | Points | Sprint |
| ------- | ----------------------- | ---- | ------ | ------ |
| LMS-030 | Video lessons           | FE   | 8      | S7     |
| LMS-031 | Fill-in-blank exercises | FS   | 5      | S7     |
| LMS-032 | Matching exercises      | FS   | 5      | S7     |
| LMS-033 | Learning streak         | FS   | 5      | S7     |
| LMS-034 | Lesson recommendations  | BE   | 8      | S8     |

### Social Features

| ID      | Title                 | Type | Points | Sprint |
| ------- | --------------------- | ---- | ------ | ------ |
| LMS-040 | User profile          | FS   | 5      | S8     |
| LMS-041 | Badges & achievements | FS   | 8      | S8     |
| LMS-042 | Friend list           | FS   | 5      | S9     |
| LMS-043 | Challenge friends     | FS   | 8      | S9     |

### Parent Features

| ID      | Title               | Type | Points | Sprint |
| ------- | ------------------- | ---- | ------ | ------ |
| LMS-050 | Link child account  | FS   | 5      | S8     |
| LMS-051 | View child progress | FE   | 5      | S8     |
| LMS-052 | Learning reports    | FS   | 8      | S9     |

---

## Could Have

| ID      | Title                   | Type | Points | Sprint |
| ------- | ----------------------- | ---- | ------ | ------ |
| LMS-060 | Dark mode               | FE   | 3      | TBD    |
| LMS-061 | Offline mode            | FS   | 13     | TBD    |
| LMS-062 | Push notifications      | FS   | 5      | TBD    |
| LMS-063 | Social login (Google)   | FS   | 5      | TBD    |
| LMS-064 | Social login (Facebook) | FS   | 5      | TBD    |
| LMS-065 | Rewards shop            | FS   | 8      | TBD    |

---

## Sprint Planning Template

### Sprint Goals

- [ ] [Goal 1]
- [ ] [Goal 2]
- [ ] [Goal 3]

### Sprint Backlog

| ID      | Title   | Type | Points | Assignee |
| ------- | ------- | ---- | ------ | -------- |
| LMS-XXX | [Title] | FS   | [N]    | [Name]   |

---

## Ticket Template

| Field      | Required | Description                  |
| ---------- | -------- | ---------------------------- |
| ID         | ✅       | Unique identifier (LMS-XXX)  |
| Title      | ✅       | Tiêu đề rõ ràng, hướng hành động |
| Type       | ✅       | FE/BE/FS/DO                  |
| Priority   | ✅       | P0/P1/P2/P3                  |
| Difficulty | ✅       | Easy/Medium/Hard             |
| Points     | ✅       | Story points (1,2,3,5,8,13)  |
| Epic       | ✅       | Parent epic ID               |
| Sprint     | ✅       | Target sprint                |
| Assignee   | ❌       | Developer được phân công     |

---

## References

- [Epics](./01-epics.md)
- [Sprint Plan](./02-sprint-plan.md)
