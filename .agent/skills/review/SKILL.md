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

## 2. Review Checklist

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

## 3. Refactoring Steps

1.  **Identify SSoT**: Find the master definition.
2.  **Consolidate**: Replace redundant info with links to Master.
3.  **Standardize**: Apply `standard` skill rules (H3, lists, etc.).
4.  **Verify**: Check broken links and `npm run build`.
