---
name: Spec-Driven Development
description:
  The core Antigravity workflow: Spec -> Plan -> Code.
---

# Spec-Driven Development Skill

Antigravity follows a strict strict flow to ensuring high-quality, verifiable code.

## 1. The Cycle

1.  **Spec (Legislative)**: Define *WHAT* in `docs/spec/`.
    -   *Output*: Markdown file with D2 diagrams.
2.  **Plan (Architect)**: Define *HOW* in `implementation_plan.md`.
    -   *Output*: Plan artifact in `.gemini/brain`.
3.  **Code (Executive)**: Implement *HOW* in `api/` or `web/`.
    -   *Ref*: Reference the Spec in comments.
4.  **Verify (Judicial)**: Prove it works.
    -   *Output*: `walkthrough.md` with evidence.

## 2. Rules

-   **No Spec, No Code**: Never write code without a corresponding spec.
-   **Refactor Spec First**: If requirements change, update the Spec *before* the Code.
-   **Update Task**: Keep `task.md` in sync with the cycle stages.
