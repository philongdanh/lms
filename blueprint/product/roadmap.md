---
id: plan
title: Roadmap
sidebar_label: Roadmap
sidebar_position: 2
---

# Roadmap

Kế hoạch phát triển và các cột mốc quan trọng.

---

## Timeline

### Phase 1: MVP

| Sprint | Timeline | Focus | Deliverables |
| ------ | -------- | ----- | ------------ |
| S1 | Week 1-2 | Foundation | Monorepo, CI/CD, DB schema, GraphQL |
| S2 | Week 3-4 | Auth Core | Registration, OTP, Subject listing |
| S3 | Week 5-6 | Auth + Learning | Login, Session, Learning path |
| S4 | Week 7-8 | Learning Core | Quiz, Progress, Points, Levels |

**MVP Scope:**
- Authentication & Authorization
- Content browsing
- Basic learning flow
- Progress tracking
- Points & levels

### Phase 2: Expansion

| Sprint | Timeline | Focus | Deliverables |
| ------ | -------- | ----- | ------------ |
| S5-6 | Week 9-12 | Tournament | Competitions, Leaderboard, Realtime |
| S7 | Week 13-14 | Polish | Bug fixes, Performance, Docs |

**Expansion Scope:**
- Tournament system
- Real-time competitions
- Badges & achievements
- Beta release

---

## Milestones

### Key Dates

| Milestone | Target Date | Sprint | Criteria |
| --------- | ----------- | ------ | -------- |
| M1 - Foundation | 07/02/2026 | S1 | Infra complete, GraphQL live |
| M2 - Auth MVP | 21/02/2026 | S2 | Login/Register working |
| M3 - Learning MVP | 07/03/2026 | S3-4 | Full learning flow |
| M4 - Tournament MVP | 15/03/2026 | S5-6 | Competition working |
| M5 - Beta Release | 15/03/2026 | S6 | All P0 bugs fixed |
| M6 - Production | 22/03/2026 | Post-MVP | Go live |

### Timeline Diagram

```d2
"Sprint 1" -> "M1 (Foundation)"
"Sprint 2" -> "M2 (Auth)"
"Sprint 3-4" -> "M3 (Learning)"
"Sprint 5-6" -> "M4 (Tournament)" -> "M5 (Beta/MVP)"
```

---
