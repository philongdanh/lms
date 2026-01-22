---
id: onboarding
title: Team Onboarding
sidebar_label: Onboarding
sidebar_position: 2
---

# Team Onboarding
 
Hướng dẫn và quy trình dành cho thành viên mới.

---

## Day 1: Setup

### Accounts

- [ ] GitHub organization access
- [ ] Slack workspace
- [ ] Jira/Linear project
- [ ] Figma team
- [ ] Google Workspace

### Development Environment

```bash

---

# 1. Clone repos
git clone git@github.com:org/lms-frontend.git
git clone git@github.com:org/lms-backend.git
git clone git@github.com:org/lms-docs.git

---

# 2. Install dependencies
cd lms-frontend && bun install
cd ../lms-backend && npm install

---

# 3. Setup environment
cp .env.example .env

---

# Fill in required values

---

# 4. Start development
bun run dev
```

### Verify Setup

- [ ] Frontend runs at `localhost:3000`
- [ ] Backend runs at `localhost:4000`
- [ ] GraphQL Playground works
- [ ] Can login with test account

---

## Day 2-3: Orientation

### Meetings

| Meeting          | With         | Duration |
| ---------------- | ------------ | -------- |
| Project Overview | PO           | 1 hour   |
| Architecture     | Tech Lead    | 1 hour   |
| Codebase Tour    | Senior Dev   | 2 hours  |
| Design System    | Designer     | 1 hour   |
| Process          | Scrum Master | 30 min   |

### Reading

| Document                                                         | Priority |
| ---------------------------------------------------------------- | -------- |
| [Product Overview](/specs)                                       | Must     |
| [Tech Stack](../../specs/01-architecture/tech-stack.md)          | Must     |
| [Frontend Architecture](../../specs/01-architecture/frontend.md) | Must     |
| [Backend Architecture](../../specs/01-architecture/backend.md)   | Should   |
| [DoD](../processes/dod.md)                                       | Must     |

---

## Week 1: First Tasks

### Starter Tasks

Suitable tasks for newcomers:

1. **Bug fixes** - Làm quen codebase
2. **UI improvements** - Học design system
3. **Test coverage** - Hiểu logic
4. **Documentation** - Hiểu context

### Expectations

| Week   | Expectation                |
| ------ | -------------------------- |
| Week 1 | Complete 1-2 starter tasks |
| Week 2 | Contribute to sprint items |
| Week 3 | Pick up regular stories    |
| Week 4 | Independent contributor    |

---

## Resources

### Key Contacts

| Role       | Person | Slack         |
| ---------- | ------ | ------------- |
| Tech Lead  | TBD    | @tech-lead    |
| Senior Dev | TBD    | @senior-dev   |
| PM/PO      | TBD    | @product      |
| SM         | TBD    | @scrum-master |

### Learning Resources

| Topic      | Resource                                            |
| ---------- | --------------------------------------------------- |
| React      | [React Docs](https://react.dev)                     |
| TypeScript | [TS Handbook](https://www.typescriptlang.org/docs/) |
| GraphQL    | [Apollo Docs](https://www.apollographql.com/docs/)  |
| Tailwind   | [Tailwind Docs](https://tailwindcss.com/docs)       |

---

## Checklist

### Before First Sprint

- [ ] All accounts setup
- [ ] Dev environment works
- [ ] Completed orientation meetings
- [ ] Read key documents
- [ ] Finished 1 starter task
- [ ] Joined all Slack channels
- [ ] Calendar invites for ceremonies
- [ ] Met the team
