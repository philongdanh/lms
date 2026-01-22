---
id: plan
title: Plan
sidebar_label: Roadmap
sidebar_position: 2
---

# Plan

Kế hoạch chi tiết và phân bổ nguồn lực theo từng giai đoạn.

---

## Project Timeline

| Attribute       | Value      |
| --------------- | ---------- |
| Project Start   | 25/01/2026 |
| Project End     | 15/03/2026 |
| Total Duration  | 7 tuần     |
| Sprint Duration | 2 tuần     |
| Total Sprints   | 4 (MVP)    |

---

## Milestone Summary

| Milestone           | Target Date | Sprints  |
| ------------------- | ----------- | -------- |
| M1 - Foundation     | 07/02/2026  | S1       |
| M2 - Auth MVP       | 21/02/2026  | S2       |
| M3 - Learning MVP   | 07/03/2026  | S3       |
| M4 - Tournament MVP | 15/03/2026  | S4       |
| M5 - Beta Release   | 15/03/2026  | S4       |
| M6 - Production     | 22/03/2026  | Post-MVP |

---

## Timeline Diagram

```d2
"Sprint 1" -> "M1 (Foundation)"
"Sprint 2" -> "M2 (Auth)"
"Sprint 3" -> "M3 (Learning)"
"Sprint 4" -> "M4 (Tournament)" -> "M5 (Beta/MVP)"
```

---

## Sprint Allocation

### Sprint 1: Foundation

| Attribute | Value                            |
| --------- | -------------------------------- |
| Date      | [Week 1-2]                       |
| Goal      | Thiết lập dự án và cơ sở hạ tầng |
| Capacity  | 30 story points                  |
| Focus     | Infrastructure (Cơ sở hạ tầng)   |

| Epic      | Features          | Points |
| --------- | ----------------- | ------ |
| E01       | F01.1-F01.6 (All) | 30     |
| **Total** |                   | 30     |

**Sản phẩm bàn giao:**

- ✅ Monorepo structure
- ✅ CI/CD pipeline
- ✅ Design system foundation
- ✅ Database schema v1
- ✅ GraphQL server setup

### Sprint 2: Auth Core

| Attribute | Value                               |
| --------- | ----------------------------------- |
| Date      | [Week 3-4]                          |
| Goal      | Registration and verification flows |
| Capacity  | 28 story points                     |
| Focus     | Authentication                      |

| Epic      | Features    | Points |
| --------- | ----------- | ------ |
| E02       | F02.1-F02.3 | 15     |
| E03       | F03.1       | 3      |
| **Total** |             | 18     |

**Sản phẩm bàn giao:**

- ✅ Registration with email
- ✅ Registration with phone
- ✅ OTP verification
- ✅ Subject listing

### Sprint 3-4: Auth Complete & Learning Start

| Attribute | Value                         |
| --------- | ----------------------------- |
| Date      | [Week 5-8]                    |
| Goal      | Complete auth, start learning |
| Capacity  | 35 story points               |
| Focus     | Authentication, Learning      |
| Milestone | M2 - Auth MVP                 |

| Epic      | Features    | Points |
| --------- | ----------- | ------ |
| E02       | F02.4-F02.8 | 23     |
| E03       | F03.2-F03.3 | 10     |
| **Total** |             | 33     |

**Sản phẩm bàn giao:**

- ✅ Login flow
- ✅ Password reset
- ✅ Session management
- ✅ Protected routes
- ✅ Learning path view
- ✅ Lesson content viewer

### Sprint 4-5: Learning Core

| Attribute | Value                    |
| --------- | ------------------------ |
| Date      | [Week 9-10]              |
| Goal      | Complete learning module |
| Capacity  | 35 story points          |
| Milestone | M3 - Learning MVP        |

| Epic      | Features    | Points |
| --------- | ----------- | ------ |
| E03       | F03.4-F03.8 | 28     |
| E04       | F04.1       | 5      |
| **Total** |             | 33     |

**Sản phẩm bàn giao:**

- ✅ Quiz exercises
- ✅ Progress tracking
- ✅ Points system
- ✅ Level up
- ✅ Learning streak

### Sprint 5-6: Tournament MVP

| Attribute | Value                      |
| --------- | -------------------------- |
| Date      | [Week 11-12]               |
| Goal      | Tournament and competition |
| Capacity  | 35 story points            |
| Milestone | M4 - Tournament MVP        |

| Epic      | Features    | Points         |
| --------- | ----------- | -------------- |
| E04       | F04.2-F04.8 | 42             |
| E05       | F05.1-F05.3 | 18             |
| **Total** |             | 60 (2 sprints) |

**Sản phẩm bàn giao:**

- ✅ Tournament listing & details
- ✅ Registration flow
- ✅ Match gameplay
- ✅ Real-time leaderboard
- ✅ Results & prizes
- ✅ Badges & achievements

### Sprint 6: Beta Polish

| Attribute | Value                     |
| --------- | ------------------------- |
| Date      | [Week 13-14]              |
| Goal      | MVP completion and polish |
| Capacity  | 30 story points           |
| Milestone | M5 - Beta Release         |

| Epic      | Features                 | Points |
| --------- | ------------------------ | ------ |
| -         | Bug fixes, polish        | 15     |
| -         | Performance optimization | 8      |
| -         | Documentation            | 5      |
| **Total** |                          | 28     |

**Sản phẩm bàn giao:**

- ✅ Tất cả bug P0 đã được sửa
- ✅ Đạt các chỉ số hiệu năng
- ✅ Tài liệu người dùng hoàn chỉnh
- ✅ Beta release được deploy

---

## Team Capacity

| Member | Role     | Capacity (pts/sprint) |
| ------ | -------- | --------------------- |
| Dev A  | Frontend | 15                    |
| Dev B  | Frontend | 15                    |
| Dev C  | Backend  | 12                    |
| Dev D  | QA       | -                     |

**Tổng năng lực team:** 42 points/sprint

---

## References

- [Backlog](./backlog.md)
