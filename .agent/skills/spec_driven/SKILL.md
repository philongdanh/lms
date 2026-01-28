---
name: Spec-Driven Development
description:
  The core Antigravity workflow: Spec -> Plan -> Code.
---

# Spec-Driven Development Skill

Antigravity follows a strict strict flow to ensuring high-quality, verifiable
code.

## 1. The Cycle

1.  **Spec (Legislative)**: Define _WHAT_ in `docs/spec/`.
    - _Output_: Markdown file with D2 diagrams.
2.  **Plan (Architect)**: Define _HOW_ in `implementation_plan.md`.
    - _Output_: Plan artifact in `.gemini/brain`.
3.  **Code (Executive)**: Implement _HOW_ in `api/` or `web/`.
    - _Ref_: Reference the Spec in comments.
4.  **Verify (Judicial)**: Prove it works.
    - _Output_: `walkthrough.md` with evidence.

## 2. Rules

- **No Spec, No Code**: Never write code without a corresponding spec.
- **Refactor Spec First**: If requirements change, update the Spec _before_ the
  Code.
- **Update Task**: Keep `task.md` in sync with the cycle stages.
