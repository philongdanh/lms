---
id: sprint-plan
title: Sprint Plan
sidebar_label: Sprint Plan
---

# Sprint Plan

Sprint-level planning with deliverables and capacity allocation.

> **Scope**: This document covers sprint planning and execution. For product-level roadmap, see [Product Roadmap](../specs/00-business/product-roadmap.md).

---

## Overview

This roadmap defines all sprints from project start to completion, with clear deliverables and milestone mappings.

---

## Project Timeline

| Attribute | Value |
|-----------|-------|
| Project Start | 2024-01-01 |
| Project End | 2024-04-08 |
| Total Duration | 14 weeks |
| Sprint Duration | 2 weeks |
| Total Sprints | 6 (MVP) |

---

## Milestone Summary

| Milestone | Target Date | Sprints | Status |
|-----------|-------------|---------|--------|
| M1 - Foundation | 2024-01-15 | S1 | ✅ Completed |
| M2 - Auth MVP | 2024-01-29 | S2-S3 | 🔄 In Progress |
| M3 - Learning MVP | 2024-02-12 | S4 | 📋 Not Started |
| M4 - Tournament MVP | 2024-02-26 | S5 | 📋 Not Started |
| M5 - Beta Release | 2024-03-11 | S6 | 📋 Not Started |
| M6 - Production | 2024-04-08 | Post-MVP | 📋 Not Started |

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

## Velocity Tracking

| Sprint | Committed | Completed | Velocity |
|--------|-----------|-----------|----------|
| Sprint 1 | 30 | 25 | 25 |
| Sprint 2 | 28 | 28 | 28 |
| Sprint 3 | 35 | 30 | 30 |
| Sprint 4 | 39 | - | (in progress) |

**Average Velocity:** 28 points/sprint

---

## Sprint Allocation

### Sprint 1: Foundation ✅

| Attribute | Value |
|-----------|-------|
| Date | 2024-01-01 — 2024-01-14 |
| Goal | Project setup and infrastructure |
| Capacity | 30 story points |
| Status | ✅ Completed |

| Epic | Features | Points |
|------|----------|--------|
| E01 | F01.1-F01.6 (All) | 30 |
| **Total** | | 30 |

**Deliverables:**
- ✅ Monorepo structure
- ✅ CI/CD pipeline
- ✅ Design system foundation
- ✅ Database schema v1
- ✅ GraphQL server setup

---

### Sprint 2: Auth Core

| Attribute | Value |
|-----------|-------|
| Date | 2024-01-15 — 2024-01-26 |
| Goal | Registration and verification flows |
| Capacity | 28 story points |
| Status | ✅ Completed |

| Epic | Features | Points |
|------|----------|--------|
| E02 | F02.1-F02.3 | 15 |
| E03 | F03.1 | 3 |
| **Total** | | 18 |

**Deliverables:**
- ✅ Registration with email
- ✅ Registration with phone
- ✅ OTP verification
- ✅ Subject listing

---

### Sprint 3-4: Auth Complete & Learning Start

| Attribute | Value |
|-----------|-------|
| Date | 2024-01-27 — 2024-02-09 |
| Goal | Complete auth, start learning |
| Capacity | 35 story points |
| Status | 🔄 In Progress |
| Milestone | M2 - Auth MVP |

| Epic | Features | Points |
|------|----------|--------|
| E02 | F02.4-F02.8 | 23 |
| E03 | F03.2-F03.3 | 10 |
| **Total** | | 33 |

**Deliverables:**
- 🔄 Login flow
- ⬜ Password reset
- ⬜ Session management
- ⬜ Protected routes
- ⬜ Learning path view
- ⬜ Lesson content viewer

---

### Sprint 4-5: Learning Core

| Attribute | Value |
|-----------|-------|
| Date | 2024-02-10 — 2024-02-23 |
| Goal | Complete learning module |
| Capacity | 35 story points |
| Milestone | M3 - Learning MVP |

| Epic | Features | Points |
|------|----------|--------|
| E03 | F03.4-F03.8 | 28 |
| E04 | F04.1 | 5 |
| **Total** | | 33 |

**Deliverables:**
- Quiz exercises
- Progress tracking
- Points system
- Level up
- Learning streak

---

### Sprint 5-6: Tournament MVP

| Attribute | Value |
|-----------|-------|
| Date | 2024-02-24 — 2024-03-08 |
| Goal | Tournament and competition |
| Capacity | 35 story points |
| Milestone | M4 - Tournament MVP |

| Epic | Features | Points |
|------|----------|--------|
| E04 | F04.2-F04.8 | 42 |
| E05 | F05.1-F05.3 | 18 |
| **Total** | | 60 (2 sprints) |

**Deliverables:**
- Tournament listing & details
- Registration flow
- Match gameplay
- Real-time leaderboard
- Results & prizes
- Badges & achievements

---

### Sprint 6: Beta Polish

| Attribute | Value |
|-----------|-------|
| Date | 2024-03-09 — 2024-03-22 |
| Goal | MVP completion and polish |
| Capacity | 30 story points |
| Milestone | M5 - Beta Release |

| Epic | Features | Points |
|------|----------|--------|
| - | Bug fixes, polish | 15 |
| - | Performance optimization | 8 |
| - | Documentation | 5 |
| **Total** | | 28 |

**Deliverables:**
- All P0 bugs fixed
- Performance targets met
- User documentation complete
- Beta release deployed

---

## Team Capacity

| Member | Role | Capacity (pts/sprint) |
|--------|------|----------------------|
| Dev A | Frontend | 15 |
| Dev B | Frontend | 15 |
| Dev C | Backend | 12 |
| Dev D | QA | - |

**Total Team Capacity:** 42 points/sprint

---

## References

- [Epics](./01-epics.md)
- [Backlog](./03-backlog.md)
- [Product Roadmap](../specs/00-business/product-roadmap.md)
