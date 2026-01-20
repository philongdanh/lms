---
id: contributing
title: Contributing Guide
sidebar_label: Contributing
sidebar_position: 4
---

# Contributing Guide

Rules and workflow for the LMS Platform development team.

---

## Roles and Responsibilities

### Key Roles

| Role              | Main Responsibility                                                    |
| ----------------- | ---------------------------------------------------------------------- |
| **Product Owner** | Product direction, feature prioritization, approve business logic      |
| **Tech Lead**     | Architecture decisions, spec review, code quality assurance            |
| **Developer**     | Implement from specifications, write tests, participate in code review |
| **QA Engineer**   | Create test plans, execute testing, report bugs                        |

### Coordination Matrix

| Activity | PO   | Lead    | Dev    | QA     |
| -------- | ---- | ------- | ------ | ------ |
| Spec     | Lead | Approve | Draft  | Review |
| Code     | -    | Review  | Create | -      |
| Test     | UAT  | -       | Unit   | Lead   |

---

## Workflow (Trunk Based Development)

### Branching Model

| Branch      | Purpose                            | Protection | Lifespan  |
| ----------- | ---------------------------------- | ---------- | --------- |
| `main`      | Source of truth, always deployable | Protected  | Permanent |
| `feature/*` | Short-lived feature branches       | None       | < 1 day   |

> **Important**:
>
> - All developers commit to `main` frequently
> - Feature branches must be short-lived (< 1 day, max 2-3 days)
> - No long-lived branches (`develop`, `release/*`, `hotfix/*`)

### TBD Principles

1. **Small, frequent commits** - Multiple times per day
2. **Feature flags** - Hide unfinished features in production
3. **Comprehensive CI** - All commits must pass tests before merge
4. **No code freeze** - Always ready to deploy

### Code Review Process

```
Branch from main --> Code --> Pull Request --> CI Checks --> Review --> Merge to main
```

### Commit Convention

Format: `<type>(<scope>): <subject>`

| Type       | Description          |
| ---------- | -------------------- |
| `feat`     | New feature          |
| `fix`      | Bug fix              |
| `docs`     | Documentation update |
| `style`    | Formatting           |
| `refactor` | Refactoring          |
| `test`     | Add tests            |
| `chore`    | Maintenance          |

---

## Sprint Process

### Sprint Information

- **Duration**: 2 weeks
- **Planning**: Monday, 9:00 AM
- **Review**: Friday, 2:00 PM (week 2)
- **Retrospective**: Friday, 3:00 PM (week 2)

### Sprint Ceremonies

| Ceremony          | Timing         | Duration   | Purpose                          |
| ----------------- | -------------- | ---------- | -------------------------------- |
| **Planning**      | Week 1, Monday | 2 hours    | Select stories, break down tasks |
| **Daily Standup** | Daily          | 15 minutes | Progress sync                    |
| **Sprint Review** | Week 2, Friday | 1 hour     | Demo and gather feedback         |
| **Retrospective** | Week 2, Friday | 45 minutes | Process improvement              |

---

## Task Workflow

### Task Status

```
Backlog --[Groomed]--> Ready --[Started]--> InProgress --[PR Opened]--> CodeReview --[Approved]--> Testing --[Passed]--> Done
```

### Definition of Ready

- [ ] Clear requirements
- [ ] Spec approved
- [ ] Effort estimated

### Definition of Done

- [ ] Implementation complete
- [ ] Tests passed
- [ ] Code reviewed
- [ ] Docs updated

---

## Quality Gates

### Before Implementation

- [ ] Specifications approved by stakeholders
- [ ] Test cases defined in specs
- [ ] Technical feasibility confirmed

### During Implementation

- [ ] Code reviews against specs
- [ ] Test coverage meets requirements
- [ ] Performance benchmarks validated

### Before Release

- [ ] All spec requirements implemented
- [ ] All tests passing
- [ ] Documentation updated

---

## Related Documentation

- [Setup Guide](./setup.md)
- [Development Guide](./development.md)
- [Deployment Guide](./deployment.md)
