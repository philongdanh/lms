---
name: Documentation Review
description:
  Standards for reviewing and refactoring documentation to ensure consistency, SSoT adherence, and quality.
---

# Documentation Review Skill

This skill defines the process for reviewing and refactoring files within the `docs/` directory.

## 1. Principles of Documentation

-   **Single Source of Truth (SSoT)**: Every piece of information should have exactly one authoritative location.

## 2. SSoT Matrix

Use this table to find the SSoT for any given document type:

| Document Type | Child Examples | SSoT Master (Parent) |
| :--- | :--- | :--- |
| **Module Spec** | `spec/modules/auth.md` | `blueprint/architecture/database.md` (Data)<br/>`blueprint/architecture/design.md` (Flows) |
| **Frontend Spec** | `spec/interface/frontend.md` | `blueprint/architecture/decisions/frontend/*.md` |
| **API Interface** | `spec/interface/graphql/**/*.graphql` | `spec/modules/*.md` (Business Logic) |
| **Architecture Decisions** | `blueprint/architecture/decisions/**/*.md` | `blueprint/architecture/tech.md` (Tech Stack) |

## 3. Review Checklist

When reviewing a document (e.g., `spec/modules/auth.md`), check the following:

### 3.1 Structure & Formatting
-   [ ] **Frontmatter**: Does it have a valid header?
-   [ ] **Headers**: Are headers Sentence case?
-   [ ] **Code Blocks**: Do all code blocks have a language specified?
-   [ ] **Links**: Are file links using relative paths (e.g., `[Auth Spec](../spec/auth.md)`)?

### 3.2 Content Integrity
-   [ ] **SSoT Check**: Does this document contradict the Blueprint?
-   [ ] **Context**: Is the document self-contained or does it properly reference dependencies?
-   [ ] **D2 Diagrams**: Are diagrams rendered correctly and text is legible?

## 4. Refactoring Workflow

If issues are found:

1.  **Identify the SSoT**: If there's a conflict, determine which document is the "Master".
2.  **Consolidate**: Remove duplicate information and replace it with a link to the Master.
3.  **Standardize**: Apply standard formatting (headers, lists, code blocks).
4.  **Verify Links**: Ensure all new links work.

## 5. Role-Specific Views

-   Ensure that technical details are in `spec/` (for Devs) and business requirements are in `blueprint/` (for POs/BAs).
