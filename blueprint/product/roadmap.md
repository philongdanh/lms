---
id: roadmap
title: Roadmap
sidebar_label: Roadmap
sidebar_position: 2
---

# Roadmap

Kế hoạch phát triển và các cột mốc quan trọng.

---

## Timeline Diagram

```d2
classes: {
  sprint: {
    shape: package
    style.border-radius: 5
  }
  milestone: {
    shape: rectangle
    style.fill: "#f0f0f0"
    style.stroke-dash: 3
  }
}

Phase 1: Phase 1: MVP {
  S1: S1: Foundation\n(Week 1-2) {class: sprint}
  S2: S2: Auth Core\n(Week 3-4) {class: sprint}
  S3: S3: Auth + Learning\n(Week 5-6) {class: sprint}
  S4: S4: Learning Core\n(Week 7-8) {class: sprint}

  S1 -> S2 -> S3 -> S4
}

Phase 2: Phase 2: Expansion {
  S5_6: S5-6: Tournament\n(Week 9-12) {class: sprint}
  S7: S7: Polish\n(Week 13-14) {class: sprint}

  S5_6 -> S7
}

Phase 1 -> Phase 2

# Connect Sprints to Milestones
M1: M1 - Foundation\n(07/02) {class: milestone}
M2: M2 - Auth MVP\n(21/02) {class: milestone}
M3: M3 - Learning MVP\n(07/03) {class: milestone}
M4: M4 - Tournament MVP\n(15/03) {class: milestone}
M5: M5 - Beta Release\n(15/03) {class: milestone}
M6: M6 - Production\n(22/03) {class: milestone}

Phase 1.S1 -> M1
Phase 1.S2 -> M2
Phase 1.S4 -> M3
Phase 2.S5_6 -> M4
Phase 2.S5_6 -> M5
Phase 2.S7 -> M6
```

---

## Details

### Phase 1: MVP

| Sprint | Timeline | Focus           | Bàn giao                            |
| ------ | -------- | --------------- | ----------------------------------- |
| S1     | Week 1-2 | Foundation      | Monorepo, CI/CD, DB schema, GraphQL |
| S2     | Week 3-4 | Auth Core       | Registration, OTP, Subject listing  |
| S3     | Week 5-6 | Auth + Learning | Login, Session, Learning path       |
| S4     | Week 7-8 | Learning Core   | Quiz, Progress, Points, Levels      |

**MVP Scope:**

- Authentication & Authorization
- Content browsing
- Basic learning flow
- Progress tracking
- Points & levels

### Phase 2: Expansion

| Sprint | Timeline   | Focus      | Bàn giao                            |
| ------ | ---------- | ---------- | ----------------------------------- |
| S5-6   | Week 9-12  | Tournament | Competitions, Leaderboard, Realtime |
| S7     | Week 13-14 | Polish     | Bug fixes, Performance, Docs        |

**Expansion Scope:**

- Tournament system
- Real-time competitions
- Badges & achievements
- Beta release

### Key Dates

| Cột Mốc             | Ngày       | Sprint   | Tiêu chí                     |
| ------------------- | ---------- | -------- | ---------------------------- |
| M1 - Foundation     | 07/02/2026 | S1       | Infra complete, GraphQL live |
| M2 - Auth MVP       | 21/02/2026 | S2       | Login/Register working       |
| M3 - Learning MVP   | 07/03/2026 | S3-4     | Full learning flow           |
| M4 - Tournament MVP | 15/03/2026 | S5-6     | Competition working          |
| M5 - Beta Release   | 15/03/2026 | S6       | All P0 bugs fixed            |
| M6 - Production     | 22/03/2026 | Post-MVP | Go live                      |
