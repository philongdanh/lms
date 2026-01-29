---
name: review
description: Reviews and refactors documentation to ensure SSoT and consistency.
---

# Documentation Review Skill

This skill defines the process for reviewing and refactoring files within the
`docs/` directory to maintain high quality and consistency.

## When to use this skill

- Use this when reviewing documentation (e.g., `spec/modules/auth.md`).
- This is helpful for validating Single Source of Truth (SSoT) adherence.
- Use when identifying redundancies or structural issues in markdown files.

## How to use it

### 1. SSoT Matrix

Use this table to find the SSoT for any given document type:

| Document Type              | SSoT Master (Parent)                                                                       |
| :------------------------- | :----------------------------------------------------------------------------------------- |
| **Module Spec**            | `blueprint/architecture/database.md` (Data)<br/>`blueprint/architecture/design.md` (Flows) |
| **Frontend Spec**          | `blueprint/architecture/decisions/frontend/*.md`                                           |
| **API Interface**          | `spec/modules/*.md` (Business Logic)                                                       |
| **Architecture Decisions** | `blueprint/architecture/tech.md` (Tech Stack)                                              |

### 2. Review Checklist

When reviewing a document, check the following:

- **Structure**: Frontmatter, valid headers, language-tagged code blocks,
  relative links.
- **Localization**:
  - Table headers, H3+ headers, and lists are in Vietnamese.
  - H3+ headers use mixed Vietnamese-English style (e.g.,
    `Chiến lược đánh Index`), avoiding `(English)` suffix.
  - Technical terms are preserved in English.
  - References to translated headers use explicit anchor IDs.
  - Link titles are concise (e.g., `ID: Name`).
  - Checklists are unchecked `[ ]` by default.
- **Content Integrity**: No contradictions with Blueprint, no redundancy (use
  links), proper context.
- **D2 Diagrams**: Correct rendering and legibility.

### 3. Refactoring Workflow

If issues are found:

1.  **Identify the SSoT**: Determine the "Master" document.
2.  **Consolidate**: Remove duplicate information and replace it with a link to
    the Master.
3.  **Standardize**: Apply standard formatting (headers, lists, code blocks).
4.  **Verify Links**: Ensure all new links work.
