---
id: roles
title: Team Roles
sidebar_label: Roles
sidebar_position: 1
---

# Team Roles
 
Vai trò và trách nhiệm của các thành viên trong dự án.

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

### Product Owner

| Aspect           | Description                      |
| ---------------- | -------------------------------- |
| Focus            | Product vision, backlog priority |
| Responsibilities | - Định nghĩa user stories        |
|                  | - Prioritize backlog             |
|                  | - Accept/reject deliverables     |
|                  | - Stakeholder communication      |

### Scrum Master

| Aspect           | Description                     |
| ---------------- | ------------------------------- |
| Focus            | Process, team productivity      |
| Responsibilities | - Facilitate ceremonies         |
|                  | - Remove blockers               |
|                  | - Coach Agile practices         |
|                  | - Shield team from distractions |

### Frontend Developer

| Aspect           | Description                       |
| ---------------- | --------------------------------- |
| Focus            | User interface, UX implementation |
| Responsibilities | - React components                |
|                  | - State management                |
|                  | - API integration                 |
|                  | - Unit & integration tests        |
| Tech             | React, TypeScript, Tailwind       |

### Backend Developer

| Aspect           | Description                 |
| ---------------- | --------------------------- |
| Focus            | APIs, business logic, data  |
| Responsibilities | - GraphQL resolvers         |
|                  | - Database design           |
|                  | - Authentication            |
|                  | - Performance optimization  |
| Tech             | NestJS, PostgreSQL, GraphQL |

### QA Engineer

| Aspect           | Description           |
| ---------------- | --------------------- |
| Focus            | Quality assurance     |
| Responsibilities | - Test planning       |
|                  | - E2E test automation |
|                  | - Bug reporting       |
|                  | - Regression testing  |
| Tech             | Playwright, Vitest    |

### UI/UX Designer

| Aspect           | Description                    |
| ---------------- | ------------------------------ |
| Focus            | User experience, visual design |
| Responsibilities | - Wireframes & prototypes      |
|                  | - Design system                |
|                  | - User research                |
|                  | - Accessibility                |
| Tool             | Figma                          |

---

## RACI Matrix

| Activity        | PO  | SM  | Dev | QA  | Design |
| --------------- | --- | --- | --- | --- | ------ |
| Sprint Planning | A   | R   | C   | C   | I      |
| Story Writing   | R   | C   | C   | C   | C      |
| Development     | I   | I   | R   | I   | C      |
| Code Review     | I   | I   | R   | I   | I      |
| Testing         | I   | I   | C   | R   | I      |
| Deployment      | I   | R   | A   | C   | I      |
| Demo            | A   | R   | C   | C   | C      |

**R** = Responsible, **A** = Accountable, **C** = Consulted, **I** = Informed
