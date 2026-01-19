---
id: backlog
title: Backlog
sidebar_label: Backlog
---

# Backlog

Complete backlog with priority, difficulty, and sprint allocation.

---

## Overview

This document contains all tickets (user stories, tasks, bugs) organized by priority and sprint.

---

## Legend

### Priority

| Priority | Color | Description |
|----------|-------|-------------|
| P0 | `#DC2626` | Critical - Blocker |
| P1 | `#F97316` | High - Must have |
| P2 | `#EAB308` | Medium - Should have |
| P3 | `#22C55E` | Low - Nice to have |

### Difficulty

| Difficulty | Color | Points Range |
|------------|-------|--------------|
| Easy | `#22C55E` | 1-2 pts |
| Medium | `#F59E0B` | 3-5 pts |
| Hard | `#EF4444` | 8-13 pts |

### Type

| Type | Color | Description |
|------|-------|-------------|
| Frontend | `#3B82F6` FE | UI/UX implementation |
| Backend | `#8B5CF6` BE | API/Database work |
| Full-stack | `#6366F1` FS | Both FE and BE |
| DevOps | `#14B8A6` DO | Infrastructure |

---

## Backlog Summary

| Priority | Items | Points | % of Total |
|----------|-------|--------|------------|
| `#DC2626` P0 | 24 | 120 | 48% |
| `#F97316` P1 | 18 | 85 | 34% |
| `#EAB308` P2 | 12 | 45 | 18% |
| `#22C55E` P3 | 8 | 40 | - |
| **Total (MVP)** | 54 | 250 | 100% |

---

## Must Have (MVP) 🔴

### Authentication

| ID | Title | Type | Points | Sprint | Status |
|----|-------|------|--------|--------|--------|
| LMS-001 | Register with email | FS | 5 | S2 | ✅ Done |
| LMS-002 | Register with phone | FS | 5 | S2 | ✅ Done |
| LMS-003 | OTP verification | FS | 5 | S2 | ✅ Done |
| LMS-004 | Login flow | FS | 5 | S4 | 🔄 60% |
| LMS-005 | Password reset | FS | 3 | S5 | ⬜ |
| LMS-006 | Logout | FE | 2 | S4 | ⬜ |
| LMS-007 | Session management | BE | 8 | S4 | ⬜ |
| LMS-008 | Protected routes | FE | 5 | S4 | ⬜ |

### Learning

| ID | Title | Type | Points | Sprint | Status |
|----|-------|------|--------|--------|--------|
| LMS-010 | Subject listing | FE | 3 | S2 | ✅ Done |
| LMS-011 | Learning path view | FS | 5 | S4 | 🔄 40% |
| LMS-012 | Lesson content viewer | FE | 5 | S4 | ⬜ |
| LMS-013 | Quiz exercises | FS | 8 | S4 | ⬜ |
| LMS-014 | Progress tracking | FS | 5 | S4 | ⬜ |
| LMS-015 | Points system | BE | 5 | S5 | ⬜ |
| LMS-016 | Level up | FS | 5 | S5 | ⬜ |

### Tournament

| ID | Title | Type | Points | Sprint | Status |
|----|-------|------|--------|--------|--------|
| LMS-020 | Tournament listing | FE | 5 | S5 | ⬜ |
| LMS-021 | Tournament details | FE | 5 | S5 | ⬜ |
| LMS-022 | Registration flow | FS | 3 | S5 | ⬜ |
| LMS-023 | Match gameplay | FS | 13 | S6 | ⬜ |
| LMS-024 | Real-time leaderboard | FS | 8 | S6 | ⬜ |
| LMS-025 | Results & scoring | BE | 5 | S6 | ⬜ |
| LMS-026 | Prize distribution | BE | 5 | S6 | ⬜ |

---

## Should Have 🟡

### Learning Enhancements

| ID | Title | Type | Points | Sprint | Status |
|----|-------|------|--------|--------|--------|
| LMS-030 | Video lessons | FE | 8 | S7 | ⬜ |
| LMS-031 | Fill-in-blank exercises | FS | 5 | S7 | ⬜ |
| LMS-032 | Matching exercises | FS | 5 | S7 | ⬜ |
| LMS-033 | Learning streak | FS | 5 | S7 | ⬜ |
| LMS-034 | Lesson recommendations | BE | 8 | S8 | ⬜ |

### Social Features

| ID | Title | Type | Points | Sprint | Status |
|----|-------|------|--------|--------|--------|
| LMS-040 | User profile | FS | 5 | S8 | ⬜ |
| LMS-041 | Badges & achievements | FS | 8 | S8 | ⬜ |
| LMS-042 | Friend list | FS | 5 | S9 | ⬜ |
| LMS-043 | Challenge friends | FS | 8 | S9 | ⬜ |

### Parent Features

| ID | Title | Type | Points | Sprint | Status |
|----|-------|------|--------|--------|--------|
| LMS-050 | Link child account | FS | 5 | S8 | ⬜ |
| LMS-051 | View child progress | FE | 5 | S8 | ⬜ |
| LMS-052 | Learning reports | FS | 8 | S9 | ⬜ |

---

## Could Have 🟢

| ID | Title | Type | Points | Sprint | Status |
|----|-------|------|--------|--------|--------|
| LMS-060 | Dark mode | FE | 3 | TBD | ⬜ |
| LMS-061 | Offline mode | FS | 13 | TBD | ⬜ |
| LMS-062 | Push notifications | FS | 5 | TBD | ⬜ |
| LMS-063 | Social login (Google) | FS | 5 | TBD | ⬜ |
| LMS-064 | Social login (Facebook) | FS | 5 | TBD | ⬜ |
| LMS-065 | Rewards shop | FS | 8 | TBD | ⬜ |

---

## Current Sprint (Sprint 4)

### Sprint Goals

- [ ] 🎯 User can register and login
- [ ] 🎯 User can select subject and view lessons
- [ ] 🎯 User can complete exercises after lessons
- [ ] 🎯 Progress and points tracking

### In Progress 🔄

| ID | Title | Assignee | Points | Progress |
|----|-------|----------|--------|----------|
| LMS-004 | Login flow | Dev A | 5 | 60% |
| LMS-011 | Learning path UI | Dev B | 5 | 40% |

### To Do 📋

| ID | Title | Assignee | Points |
|----|-------|----------|--------|
| LMS-012 | Lesson content viewer | Dev B | 5 |
| LMS-013 | Quiz exercises | Dev C | 8 |
| LMS-014 | Progress tracking | Dev A | 5 |

### Done ✅

| ID | Title | Points |
|----|-------|--------|
| LMS-001 | Register with email | 5 |
| LMS-002 | Register with phone | 5 |
| LMS-003 | OTP verification | 5 |
| LMS-010 | Subject listing | 3 |

---

## Ticket Template

| Field | Required | Description |
|-------|----------|-------------|
| ID | ✅ | Unique identifier (LMS-XXX) |
| Title | ✅ | Clear, action-oriented title |
| Type | ✅ | FE/BE/FS/DO |
| Priority | ✅ | P0/P1/P2/P3 |
| Difficulty | ✅ | Easy/Medium/Hard |
| Points | ✅ | Story points (1,2,3,5,8,13) |
| Epic | ✅ | Parent epic ID |
| Sprint | ✅ | Target sprint |
| Assignee | ❌ | Assigned developer |

---

## References

- [Epics](./01-epics.md)
- [Sprint Plan](./02-sprint-plan.md)
