---
id: epics
title: Epics
sidebar_label: Epics
sidebar_position: 10
---

# Epics
 
Các nhóm tính năng lớn và lộ trình triển khai theo giai đoạn.

---

## Priority Legend

| Priority      | Description              |
| ------------- | ------------------------ |
| P0 - Critical | Bắt buộc cho MVP         |
| P1 - High     | Nên có cho MVP           |
| P2 - Medium   | Nên có (không bắt buộc)  |
| P3 - Low      | Cân nhắc trong tương lai |

---

## Epic List

| ID  | Epic                        | Priority | Sprints | Points |
| --- | --------------------------- | -------- | ------- | ------ |
| E01 | Foundation & Infrastructure | P0       | S1      | 30     |
| E02 | Authentication              | P0       | S2-S4   | 45     |
| E03 | Learning Core               | P0       | S4-S5   | 50     |
| E04 | Tournament                  | P1       | S5-S6   | 55     |
| E05 | Gamification                | P1       | S5-S6   | 25     |
| E06 | Parent Dashboard            | P2       | S7-S8   | 25     |

---

## MVP Scope

MVP tập trung vào 3 module chính:

1. **Authentication** - Đăng ký, đăng nhập, quản lý phiên
2. **Learning** - Bài học, bài kiểm tra, theo dõi tiến độ
3. **Tournament** - Tham gia thi đấu

---

## E01: Foundation & Infrastructure

### Tính năng

| ID    | Feature                  | Points | Sprint |
| ----- | ------------------------ | ------ | ------ |
| F01.1 | Project setup (monorepo) | 5      | S1     |
| F01.2 | CI/CD pipeline           | 8      | S1     |
| F01.3 | Design system foundation | 5      | S1     |
| F01.4 | Database schema v1       | 5      | S1     |
| F01.5 | GraphQL server setup     | 5      | S1     |
| F01.6 | Frontend scaffolding     | 2      | S1     |

### Tiêu chí chấp nhận

- ✅ Monorepo structure hoàn chỉnh với NestJS + Next.js
- ✅ CI/CD pipeline với GitHub Actions
- ✅ Design system foundation với Tailwind CSS
- ✅ Database schema và migrations
- ✅ GraphQL server với Apollo

---

## E02: Authentication

| Attribute    | Value                 |
| ------------ | --------------------- |
| Priority     | P0 Critical         |
| Sprints      | Sprint 2 - Sprint 4   |
| Total Points | 45                    |
| Owner        | [Assign]              |

### Tính năng

| ID    | Feature               | Points | Sprint |
| ----- | --------------------- | ------ | ------ |
| F02.1 | Registration (email)  | 5      | S2     |
| F02.2 | Registration (phone)  | 5      | S2     |
| F02.3 | OTP verification      | 5      | S2     |
| F02.4 | Login flow            | 5      | S3     |
| F02.5 | Password reset        | 3      | S3     |
| F02.6 | Session management    | 8      | S3     |
| F02.7 | Protected routes      | 5      | S4     |
| F02.8 | Logout                | 2      | S4     |
| F02.9 | Social login (Google) | 5      | P2     |

### Tiêu chí chấp nhận

- ✅ Đăng ký với email và phone
- ✅ Xác thực OTP
- ✅ Login flow với JWT
- ✅ Session management đa thiết bị
- ✅ Protected routes với guards

---

## E03: Learning Core

| Attribute    | Value                 |
| ------------ | --------------------- |
| Priority     | P0 Critical         |
| Sprints      | Sprint 4 - Sprint 5   |
| Total Points | 50                    |
| Owner        | [Assign]              |

### Tính năng

| ID    | Feature               | Points | Sprint |
| ----- | --------------------- | ------ | ------ |
| F03.1 | Subject listing       | 3      | S4     |
| F03.2 | Learning path view    | 5      | S4     |
| F03.3 | Lesson content viewer | 5      | S4     |
| F03.4 | Quiz exercises        | 8      | S4     |
| F03.5 | Progress tracking     | 5      | S4     |
| F03.6 | Points system         | 5      | S5     |
| F03.7 | Level up              | 5      | S5     |
| F03.8 | Learning streak       | 5      | S5     |
| F03.9 | Recommendations       | 8      | P2     |

### Tiêu chí chấp nhận

- ✅ Hiển thị danh sách môn học
- ✅ Learning path view với progress
- ✅ Lesson content viewer với media
- ✅ Quiz exercises với scoring
- ✅ Progress tracking real-time

---

## E04: Tournament

| Attribute    | Value               |
| ------------ | ------------------- |
| Priority     | P1 High             |
| Sprints      | Sprint 5 - Sprint 6 |
| Total Points | 55                  |
| Owner        | [Assign]            |

### Tính năng

| ID    | Feature               | Points | Sprint |
| ----- | --------------------- | ------ | ------ |
| F04.1 | Tournament listing    | 5      | S5     |
| F04.2 | Tournament details    | 5      | S5     |
| F04.3 | Registration flow     | 3      | S5     |
| F04.4 | Countdown             | 3      | S5     |
| F04.5 | Match gameplay        | 13     | S6     |
| F04.6 | Real-time leaderboard | 8      | S6     |
| F04.7 | Results & scoring     | 5      | S6     |
| F04.8 | Prize distribution    | 5      | S6     |
| F04.9 | Share results         | 3      | P2     |

### Tiêu chí chấp nhận

- ✅ Danh sách tournament với filter
- ✅ Chi tiết tournament và đăng ký
- ✅ Match gameplay real-time
- ✅ Leaderboard live update
- ✅ Results và scoring system

---

## E05: Gamification

| Attribute    | Value               |
| ------------ | ------------------- |
| Priority     | P1 High             |
| Sprints      | Sprint 5 - Sprint 6 |
| Total Points | 25                  |
| Owner        | [Assign]            |

### Tính năng

| ID    | Feature               | Points | Sprint |
| ----- | --------------------- | ------ | ------ |
| F05.1 | Badges & achievements | 8      | S6     |
| F05.2 | User profile          | 5      | S6     |
| F05.3 | Leaderboard (overall) | 5      | S6     |
| F05.4 | Rewards shop          | 8      | P2     |

### Tiêu chí chấp nhận

- ✅ Badges và achievements system
- ✅ User profile với stats
- ✅ Leaderboard theo nhiều tiêu chí
- ✅ Rewards shop với virtual currency

---

## Epic Summary by Module

| Module         | Epics | Total Points |
| -------------- | ----- | ------------ |
| Infrastructure | E01   | 30           |
| Authentication | E02   | 45           |
| Learning       | E03   | 50           |
| Tournament     | E04   | 55           |
| Gamification   | E05   | 25           |
| **Total**      | 5     | 205          |

---

## References

- [Plan](./plan.md)
- [Backlog](./backlog.md)
- [Stories](./stories.md)
