---
name: Documentation Standard
description:
  Guidelines and standards for maintaining project documentation, including SSoT
  and D2 diagram usage.
---

# Documentation Standard Skill

This skill defines the standards for creating and maintaining documentation in
the `docs/` directory.

## 1. Single Source of Truth (SSoT)

- **Principle**: Do not duplicate information. Reference existing definitions.
- **Blueprint vs Spec**:
  - `blueprint/`: High-level architecture, design decisions, and system flows.
  - `spec/`: Detailed technical specifications, API contracts, and schema
    definitions.
- **Linking**: Use relative links to connect related documents.

## 2. D2 Diagrams

- **Language**: All text within diagrams must be in **English**.
- **Font**: Use `Fantasque Sans Mono` for code-like clarity.
- **Formatting**:
  - Use snake_case for IDs.
  - Use Title Case for Labels.
  - Disable italics for better readability.

## 3. Markdown Formatting

- **Headers**: Use Sentence case for headers.
- **Lists**: Use hyphens `-` for unordered lists.
- **Code Blocks**: Always specify the language (e.g., \`\`\`typescript).
- **Callouts**: Use GitHub-style alerts (e.g., `> [!NOTE]`) for important info.

## 4. Role-Based Structure

- Ensure documentation is accessible via the "By Role" navigation if applicable.
- Use clear, role-specific content where necessary (e.g., specific guides for QA
  vs Dev).
