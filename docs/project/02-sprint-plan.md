---
id: sprint-plan
title: Sprint Plan
sidebar_label: Sprint Plan
sidebar_position: 2
---

# Sprint Plan

Sprint-level planning with deliverables and capacity allocation.

> **Scope**: This document covers sprint planning and execution. For
> product-level roadmap, see
> [Product Roadmap](../specs/00-business/product-roadmap.md).

---

## Overview

This roadmap defines all sprints from project start to completion, with clear
deliverables and milestone mappings.

---

## Project Timeline

| Attribute       | Value        |
| --------------- | ------------ |
| Project Start   | [YYYY-MM-DD] |
| Project End     | [YYYY-MM-DD] |
| Total Duration  | 14 weeks     |
| Sprint Duration | 2 weeks      |
| Total Sprints   | 6 (MVP)      |

---

## Milestone Summary

| Milestone           | Target Date | Sprints  |
| ------------------- | ----------- | -------- |
| M1 - Foundation     | [TBD]       | S1       |
| M2 - Auth MVP       | [TBD]       | S2-S3    |
| M3 - Learning MVP   | [TBD]       | S4       |
| M4 - Tournament MVP | [TBD]       | S5       |
| M5 - Beta Release   | [TBD]       | S6       |
| M6 - Production     | [TBD]       | Post-MVP |

---

## Timeline Diagram

```
Sprint 1 → Sprint 2 → Sprint 3 → M2 (Auth)
                                   ↓
                              Sprint 4 → M3 (Learning)
                                   ↓
                              Sprint 5 → M4 (Tournament)
                                   ↓
                              Sprint 6 → M5 (Beta/MVP)
```

---

## Sprint Allocation

### Sprint 1: Foundation

| Attribute | Value                            |
| --------- | -------------------------------- |
| Date      | [Week 1-2]                       |
| Goal      | Project setup and infrastructure |
| Capacity  | 30 story points                  |
| Focus     | Infrastructure                   |

| Epic      | Features          | Points |
| --------- | ----------------- | ------ |
| E01       | F01.1-F01.6 (All) | 30     |
| **Total** |                   | 30     |

**Deliverables:**

- Monorepo structure
- CI/CD pipeline
- Design system foundation
- Database schema v1
- GraphQL server setup

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

**Deliverables:**

- Registration with email
- Registration with phone
- OTP verification
- Subject listing

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

**Deliverables:**

- Login flow
- Password reset
- Session management
- Protected routes
- Learning path view
- Lesson content viewer

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

**Deliverables:**

- Quiz exercises
- Progress tracking
- Points system
- Level up
- Learning streak

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

**Deliverables:**

- Tournament listing & details
- Registration flow
- Match gameplay
- Real-time leaderboard
- Results & prizes
- Badges & achievements

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

**Deliverables:**

- All P0 bugs fixed
- Performance targets met
- User documentation complete
- Beta release deployed

---

## Team Capacity

| Member | Role     | Capacity (pts/sprint) |
| ------ | -------- | --------------------- |
| Dev A  | Frontend | 15                    |
| Dev B  | Frontend | 15                    |
| Dev C  | Backend  | 12                    |
| Dev D  | QA       | -                     |

**Total Team Capacity:** 42 points/sprint

---

## References

- [Epics](./01-epics.md)
- [Backlog](./03-backlog.md)
- [Product Roadmap](../specs/00-business/product-roadmap.md)
