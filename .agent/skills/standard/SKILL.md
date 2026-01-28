# Documentation Standard Skill

This skill defines the standards for creating and maintaining documentation in
the `docs/` directory.

---

## 1. Single Source of Truth (SSoT)

- **Principle**: Do not duplicate information. Reference existing definitions.
- **Reference**:
  - `blueprint/`: High-level architecture, design decisions, and system flows.
  - `spec/`: Detailed technical specifications, API contracts, and schema
    definitions.
- **Linking**: Use relative links to connect related documents.

## 2. D2 Diagrams

- **Language**: All text within diagrams must be in **English**.
- **Formatting**:
  - Use snake_case for IDs.
  - Use Title Case for Labels.
  - **Direction**: Prefer horizontal direction (`direction: right`) for better
    screen utilization.
- **Automation**: Use `docs/scripts/format-d2.mjs` to format D2 files.
  ```bash
  node docs/scripts/format-d2.mjs [path/to/file.d2]
  ```

## 3. Markdown Formatting

- **Structure**: `Frontmatter` -> `H1` -> `Description` -> `---` -> `H2`.
- **Headers**: Use Sentence case for headers.
- **Lists**: Use hyphens `-` for unordered lists.
- **Code Blocks**: Always specify the language (e.g., \`\`\`typescript).
- **Callouts**: Use GitHub-style alerts (e.g., `> [!NOTE]`) for important info.

## 4. Role-Based Structure

- Ensure documentation is accessible via the "By Role" navigation if applicable.
- Use clear, role-specific content where necessary (e.g., specific guides for QA
  vs Dev).
