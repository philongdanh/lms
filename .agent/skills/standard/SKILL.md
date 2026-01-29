---
name: standard
description:
  Defines documentation standards for formatting, structure, and diagrams.
---

# Documentation Standard Skill

This skill defines the standards for creating and maintaining documentation in
the `docs/` directory.

## When to use this skill

- Use this when creating new documentation files.
- This is helpful for ensuring consistent formatting and structure.
- Use when creating or editing D2 diagrams.

## How to use it

### 1. Markdown Formatting

- **Structure**: Frontmatter (`id`, `title`) -> H1 -> Description -> `---` ->
  H2.
- **Headers**:
  - H1, H2: English, Sentence case.
  - H3+: Vietnamese. Preserve English technical terms. Add explicit English IDs
    if referenced (e.g., `### Bảo mật (Security) {#security}`).
- **Lists**: Use hyphens `-` for unordered lists. Content in Vietnamese.
- **Code Blocks**: Always specify the language (e.g., `typescript`).
- **Table Headers**: Use Vietnamese. English technical terms are allowed.

### 2. D2 Diagrams

- **Language**: Text must be in **English**.
- **Formatting**: `snake_case` for IDs, Title Case for Labels.
- **Direction**: Prefer `direction: right`.
- **Automation**: Use `docs/scripts/format-d2.mjs` if available.

### 3. Role-Based Structure

- Ensure documentation is accessible via the "By Role" navigation if applicable.
- Use clear, role-specific content where necessary.
