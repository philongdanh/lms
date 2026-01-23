# LMS Documentation

Tài liệu chính thức cho hệ thống Learning Management System (LMS).

---

## Tài liệu này dành cho ai?

| Đối tượng              | Tài liệu          | Mục đích                               |
| ---------------------- | ----------------- | -------------------------------------- |
| **Product Owner / PM** | Blueprint         | Định hướng sản phẩm, roadmap, backlog  |
| **Architect**          | Blueprint + Spec  | Thiết kế hệ thống, tech stack, modules |
| **Developer (BE/FE)**  | Spec + Onboarding | Triển khai API, UI, codebase           |
| **QA Engineer**        | QA                | Test cases, automation, benchmarks     |
| **AI Agents**          | Spec + QA         | Đọc spec để sinh code, test            |
| **End User**           | Handbook          | Hướng dẫn sử dụng sản phẩm             |

---

## Documentation Structure (SDD)

Cấu trúc theo **Spec-Driven Development** — minimal cho Scrum team.

```
blueprint/          ← WHAT: Định nghĩa sản phẩm (Product + Architecture)
spec/               ← HOW: Đặc tả kỹ thuật (Modules + Interfaces)
qa/                 ← VERIFY: Đảm bảo chất lượng (Strategy + Cases)
docs/               ← GUIDE: Hướng dẫn (Onboarding + Handbook)
```

### 1. [Blueprint](./blueprint) — Định nghĩa sản phẩm

| Folder          | Nội dung                                                                                                                                                                                                    |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `product/`      | [Vision](./blueprint/product/vision.md) · [Roadmap](./blueprint/product/roadmap.md) · [Backlog](./blueprint/product/backlog.md)                                                                             |
| `architecture/` | [System Design](./blueprint/architecture/system-design.md) · [Tech Stack](./blueprint/architecture/stack.md) · [Database](./blueprint/architecture/database.md) · [ADRs](/blueprint/architecture/decisions) |

### 2. [Spec](./spec) — Đặc tả kỹ thuật

| Folder       | Nội dung                                                                                                                           |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `modules/`   | [Auth](./spec/modules/auth.md) · [Learning](./spec/modules/learning.md) · [Admin](./spec/modules/admin.md) · ...                   |
| `interface/` | [UI System](./spec/interface/ui-system.md) · [Gateway](./spec/interface/gateway.md) · [GraphQL Schema](./spec/interface/schema.md) |

### 3. [QA](./qa/) — Đảm bảo chất lượng

[Strategy](./qa/strategy.md) · [Test Cases](./qa/cases/happy-path.md) ·
[Benchmarks](./qa/benchmarks.md)

### 4. Docs

---

## Project Constraints

| Constraint      | Value                                        |
| --------------- | -------------------------------------------- |
| **Timeline**    | MVP: 8 weeks (S1-S4), Production: 22/03/2026 |
| **Tech Stack**  | NestJS, Next.js, PostgreSQL, GraphQL, Redis  |
| **Methodology** | Scrum + Spec-Driven Development              |

Chi tiết: [Roadmap](./blueprint/product/roadmap.md) ·
[Tech Stack](./blueprint/architecture/stack.md)

---

## External Resources

| Resource | Link     | Mô tả           |
| -------- | -------- | --------------- |
| Figma    | `[TODO]` | UI/UX Design    |
| Postman  | `[TODO]` | API Collection  |
| GitHub   | `[TODO]` | Source Code     |
| Jira     | `[TODO]` | Sprint Tracking |

---

## Contribution

Xem [Contributing Guide](./docs/onboarding/contributing.md) để biết cách đóng
góp.
