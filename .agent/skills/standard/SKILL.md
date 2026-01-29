---
name: standard
description: Defines formatting, structure, and localization standards.
---

# Documentation Standards

Use this skill when creating or editing documentation to ensure consistency.

## 1. Markdown Rules

| Element           | Rule                                | Example                        |
| :---------------- | :---------------------------------- | :----------------------------- |
| **H1, H2**        | English, Sentence Case.             | `# System Architecture`        |
| **H3+**           | Vietnamese mixed with English.      | `### Chiến lược đánh Index`    |
| **Lists**         | Hyphens `-`. Content in Vietnamese. | `- Cấu hình database`          |
| **Table Headers** | Vietnamese.                         | `\| Tên \| Mô tả \|`           |
| **Code Blocks**   | Always specify language.            | ` ```typescript `              |
| **Checklists**    | Unchecked `[ ]` by default.         | `- [ ] Verify API`             |
| **Links**         | Concise titles (ID: Name).          | `[0004: PostgreSQL](...)`      |
| **Note/Alerts**   | Mixed VN/EN. No `(English)` suffix. | `> **Lưu ý**: Cấu hình này...` |
| **Anchors**       | Explicit English IDs.               | `### Bảo mật {#security}`      |

## 2. D2 Diagrams

- **Language**: Text must be in **English**.
- **Style**: `snake_case` for IDs, Title Case for Labels.
- **Direction**: Prefer `direction: right`.

## 3. Structure

- **Frontmatter**: Must include `id`, `title`, and `sidebar_label`.
- **Navigation**: Ensure compatibility with "By Role" or "By Module" sidebars.
