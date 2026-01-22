---
id: team
title: Team
sidebar_label: Team
sidebar_position: 5
---

# Team

Vai trò, onboarding và giao tiếp trong dự án.

---

## Team Structure

```
┌─────────────────────────────────────────────┐
│                Product Owner                 │
└──────────────────────┬──────────────────────┘
                       │
┌──────────────────────┴──────────────────────┐
│                Scrum Master                  │
└──────────────────────┬──────────────────────┘
                       │
    ┌─────────────┬────┴────┬─────────────┐
    │             │         │             │
┌───┴───┐   ┌─────┴────┐ ┌──┴──┐   ┌──────┴─────┐
│Frontend│   │ Backend  │ │ QA  │   │ UI/UX      │
│  Team  │   │   Team   │ │Team │   │ Designer   │
└────────┘   └──────────┘ └─────┘   └────────────┘
```

---

## Roles & Responsibilities

| Role | Focus | Key Responsibilities |
|------|-------|---------------------|
| **Product Owner** | Product vision, backlog | Định nghĩa user stories, prioritize backlog, accept deliverables |
| **Scrum Master** | Process, productivity | Facilitate ceremonies, remove blockers, coach Agile |
| **Frontend Dev** | UI/UX implementation | React components, state, API integration |
| **Backend Dev** | APIs, business logic | GraphQL, database, authentication, performance |
| **QA Engineer** | Quality assurance | Test planning, E2E automation, regression |
| **UI/UX Designer** | User experience | Wireframes, design system, accessibility |

---

## RACI Matrix

| Activity | PO | SM | Dev | QA | Design |
|----------|----|----|-----|-----|--------|
| Sprint Planning | A | R | C | C | I |
| Story Writing | R | C | C | C | C |
| Development | I | I | R | I | C |
| Code Review | I | I | R | I | I |
| Testing | I | I | C | R | I |
| Deployment | I | R | A | C | I |

**R** = Responsible, **A** = Accountable, **C** = Consulted, **I** = Informed

---

## Onboarding

### Checklist ngày đầu
- [ ] GitHub organization access
- [ ] Slack workspace
- [ ] Jira/Linear project
- [ ] Dev environment setup

### Kỳ vọng tuần đầu
| Week | Expectation |
|------|-------------|
| Week 1 | Complete 1-2 starter tasks |
| Week 2 | Contribute to sprint items |
| Week 3 | Pick up regular stories |
| Week 4 | Independent contributor |

---

## Communication

### Các kênh liên lạc

| Channel | Purpose | Response Time |
|---------|---------|---------------|
| #lms-general | Announcements | < 4 hours |
| #lms-dev | Technical discussions | < 2 hours |
| #lms-urgent | Critical issues | < 30 mins |

### Lịch họp

| Meeting | When | Duration |
|---------|------|----------|
| Daily Standup | 9:00 AM daily | 15 min |
| Sprint Planning | Mon (start) | 2 hours |
| Backlog Refinement | Wed | 1 hour |
| Sprint Review | Fri (end) | 1 hour |
| Retrospective | Fri (end) | 1 hour |

### Định dạng Standup
1. **Hôm qua** làm được gì?
2. **Hôm nay** sẽ làm gì?
3. **Blockers** nào cần giải quyết?

---

## References

- [Setup](./setup.md)
- [Contributing](./contributing.md)
