---
name: review
description: Process for reviewing docs (SSoT, standards, integrity).
---

# Documentation Review

Use this skill to review and refactor documentation.

## 1. SSoT Matrix

| Type               | SSoT Master                                      |
| :----------------- | :----------------------------------------------- |
| **Data Models**    | `blueprint/architecture/database.md`             |
| **Business Flows** | `blueprint/architecture/design.md`               |
| **Frontend**       | `blueprint/architecture/decisions/frontend/*.md` |
| **API Logic**      | `spec/modules/*.md`                              |
| **Tech Stack**     | `blueprint/architecture/tech.md`                 |

## 2. SSoT Dependencies

Khi review/update một file, cần đảm bảo nhất quán với các file SSoT liên quan:

### Layer 1: Blueprint (Rank cao nhất)

| File                          | SSoT Dependencies                           |
| :---------------------------- | :------------------------------------------ |
| `product/vision.md`           | _Gốc_                                       |
| `product/constraints.md`      | `vision.md`                                 |
| `product/roadmap.md`          | `vision.md`, `constraints.md`               |
| `product/backlog.md`          | `vision.md`, `roadmap.md`, `constraints.md` |
| `architecture/design.md`      | `vision.md`, `roadmap.md`                   |
| `architecture/tech.md`        | `design.md`, `vision.md`                    |
| `architecture/database.md`    | `design.md`, `tech.md`, `backlog.md`        |
| `architecture/permissions.md` | `design.md`, `backlog.md`                   |
| `architecture/decisions/*.md` | `design.md`, `tech.md`                      |

### Layer 2: Spec (Rank 2)

| File                      | SSoT Dependencies                              |
| :------------------------ | :--------------------------------------------- |
| `modules/auth.md`         | `backlog.md`, `database.md`, `permissions.md`  |
| `modules/content.md`      | `backlog.md`, `database.md`                    |
| `modules/learning.md`     | `backlog.md`, `database.md`, `content.md`      |
| `modules/gamification.md` | `backlog.md`, `database.md`                    |
| `modules/tournament.md`   | `backlog.md`, `database.md`, `gamification.md` |
| `modules/realtime.md`     | `backlog.md`, `database.md`, `tech.md`         |
| `modules/analytics.md`    | `backlog.md`, `database.md`                    |
| `modules/admin.md`        | `backlog.md`, `database.md`, `permissions.md`  |
| `api/types.md`            | `database.md`, `modules/*.md`                  |
| `api/gateway.md`          | `tech.md`, `design.md`                         |
| `api/graphql/*.md`        | `types.md`, `modules/*.md` tương ứng           |
| `api/rest/*.md`           | `types.md`, `modules/*.md` tương ứng           |
| `app/site-map/*.md`       | `roadmap.md`, `backlog.md`                     |
| `app/screens/*.md`        | `backlog.md`, `site-map/*.md`, `modules/*.md`  |

### Layer 3: QA (Verify Spec)

| File                     | SSoT Dependencies             |
| :----------------------- | :---------------------------- |
| `qa/strategy.md`         | `roadmap.md`, `backlog.md`    |
| `qa/benchmarks.md`       | `tech.md`, `design.md`        |
| `qa/automation-setup.md` | `tech.md`, `strategy.md`      |
| `qa/cases/*.md`          | `spec/modules/*.md` tương ứng |

> **Rule**: Higher layer always has SSoT. If conflict → prefer higher layer.

## 3. Review Checklist

- [ ] **Structure**: Frontmatter, valid headers, language tags.
- [ ] **Localization**:
  - [ ] H3+ Mixed Style (`Chiến lược đánh Index`).
  - [ ] Note/Alerts Mixed Style (`> **Lưu ý**: ...`).
  - [ ] Table Headers/Lists in Vietnamese.
  - [ ] Explicit anchors for translated headers.
- [ ] **References**:
  - [ ] Short link titles (`ID: Name`).
  - [ ] SSoT References (`> **SSoT**: ...`).
- [ ] **Integrity**: No contradictions with Blueprint.
- [ ] **Formatting**: Checklists unchecked `[ ]`.
- [ ] **Highlights**: Use `` for Entities/Fields/IDs/Error Codes/Values. **DO
      NOT** use backticks for Technology names (e.g. Redis, NestJS). Use
      **Bold** for emphasis.
- [ ] **D2**: Clean code (No comments/headers inside).

## 4. Refactoring Steps

1.  **Identify SSoT**: Find the master definition.
2.  **Consolidate**: Replace redundant info with links to Master.
3.  **Standardize**: Apply `standard` skill rules (H3, lists, etc.).
4.  **Verify**: Check broken links and `npm run build`.
