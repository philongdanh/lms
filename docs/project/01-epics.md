---
id: epics
title: Epics
sidebar_label: Epics
---

# Epics

Epic breakdown with feature grouping and sprint allocation.

---

## Overview

Epics are large bodies of work that can be broken down into features and user stories. Each epic represents a significant product capability.

---

## Priority Legend

| Priority | Color | Description |
|----------|-------|-------------|
| P0 - Critical | `#DC2626` | Must have for MVP |
| P1 - High | `#F97316` | Should have for MVP |
| P2 - Medium | `#EAB308` | Nice to have |
| P3 - Low | `#22C55E` | Future consideration |

---

## Epic List

| ID | Epic | Priority | Sprints | Points |
|----|------|----------|---------|--------|
| E01 | Foundation & Infrastructure | `#DC2626` P0 | S1 | 30 |
| E02 | Authentication | `#DC2626` P0 | S2-S4 | 45 |
| E03 | Learning Core | `#DC2626` P0 | S4-S5 | 50 |
| E04 | Tournament | `#F97316` P1 | S5-S6 | 55 |
| E05 | Gamification | `#F97316` P1 | S5-S6 | 25 |
| E06 | Parent Dashboard | `#EAB308` P2 | S7-S8 | 25 |

---

## MVP Scope

MVP focuses on 3 main modules:

1. **Authentication** - Registration, login, session management
2. **Learning** - Lessons, quizzes, progress tracking
3. **Tournament** - Competition participation

---

## E01: Foundation & Infrastructure

| Attribute | Value |
|-----------|-------|
| Priority | `#DC2626` P0 Critical |
| Sprints | Sprint 1 |
| Total Points | 30 |
| Status | ✅ Completed |

### Features

| ID | Feature | Points | Status |
|----|---------|--------|--------|
| F01.1 | Project setup (monorepo) | 5 | ✅ Done |
| F01.2 | CI/CD pipeline | 8 | ✅ Done |
| F01.3 | Design system foundation | 5 | ✅ Done |
| F01.4 | Database schema v1 | 5 | ✅ Done |
| F01.5 | GraphQL server setup | 5 | ✅ Done |
| F01.6 | Frontend scaffolding | 2 | ✅ Done |

---

## E02: Authentication

| Attribute | Value |
|-----------|-------|
| Priority | `#DC2626` P0 Critical |
| Sprints | Sprint 2 - Sprint 4 |
| Total Points | 45 |
| Status | 🔄 In Progress |

### Features

| ID | Feature | Points | Status |
|----|---------|--------|--------|
| F02.1 | Registration (email) | 5 | ✅ Done |
| F02.2 | Registration (phone) | 5 | ✅ Done |
| F02.3 | OTP verification | 5 | ✅ Done |
| F02.4 | Login flow | 5 | 🔄 In Progress |
| F02.5 | Password reset | 3 | ⬜ Not Started |
| F02.6 | Session management | 8 | ⬜ Not Started |
| F02.7 | Protected routes | 5 | ⬜ Not Started |
| F02.8 | Logout | 2 | ⬜ Not Started |
| F02.9 | Social login (Google) | 5 | ⬜ P2 |

**Progress:** 43% (15/35 core points)

---

## E03: Learning Core

| Attribute | Value |
|-----------|-------|
| Priority | `#DC2626` P0 Critical |
| Sprints | Sprint 4 - Sprint 5 |
| Total Points | 50 |
| Status | 📋 Not Started |

### Features

| ID | Feature | Points | Status |
|----|---------|--------|--------|
| F03.1 | Subject listing | 3 | ✅ Done |
| F03.2 | Learning path view | 5 | ⬜ S4 |
| F03.3 | Lesson content viewer | 5 | ⬜ S4 |
| F03.4 | Quiz exercises | 8 | ⬜ S4 |
| F03.5 | Progress tracking | 5 | ⬜ S4 |
| F03.6 | Points system | 5 | ⬜ S5 |
| F03.7 | Level up | 5 | ⬜ S5 |
| F03.8 | Learning streak | 5 | ⬜ S5 |
| F03.9 | Recommendations | 8 | ⬜ P2 |

**Progress:** 12% (3/50 points)

---

## E04: Tournament

| Attribute | Value |
|-----------|-------|
| Priority | `#F97316` P1 High |
| Sprints | Sprint 5 - Sprint 6 |
| Total Points | 55 |
| Status | 📋 Not Started |

### Features

| ID | Feature | Points | Status |
|----|---------|--------|--------|
| F04.1 | Tournament listing | 5 | ⬜ S5 |
| F04.2 | Tournament details | 5 | ⬜ S5 |
| F04.3 | Registration flow | 3 | ⬜ S5 |
| F04.4 | Countdown | 3 | ⬜ S5 |
| F04.5 | Match gameplay | 13 | ⬜ S6 |
| F04.6 | Real-time leaderboard | 8 | ⬜ S6 |
| F04.7 | Results & scoring | 5 | ⬜ S6 |
| F04.8 | Prize distribution | 5 | ⬜ S6 |
| F04.9 | Share results | 3 | ⬜ P2 |

**Progress:** 0%

---

## E05: Gamification

| Attribute | Value |
|-----------|-------|
| Priority | `#F97316` P1 High |
| Sprints | Sprint 5 - Sprint 6 |
| Total Points | 25 |
| Status | 📋 Not Started |

### Features

| ID | Feature | Points | Status |
|----|---------|--------|--------|
| F05.1 | Badges & achievements | 8 | ⬜ S6 |
| F05.2 | User profile | 5 | ⬜ S6 |
| F05.3 | Leaderboard (overall) | 5 | ⬜ S6 |
| F05.4 | Rewards shop | 8 | ⬜ P2 |

---

## Epic Summary by Module

| Module | Epics | Total Points |
|--------|-------|--------------|
| Infrastructure | E01 | 30 |
| Authentication | E02 | 45 |
| Learning | E03 | 50 |
| Tournament | E04 | 55 |
| Gamification | E05 | 25 |
| **Total** | 5 | 205 |

---

## References

- [Sprint Plan](./02-sprint-plan.md)
- [Backlog](./03-backlog.md)
