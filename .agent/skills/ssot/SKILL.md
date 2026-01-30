---
name: ssot
description: Maintain Single Source of Truth hierarchy.
---

# SSoT Maintenance

Defines the hierarchy of truth to resolve discrepancies.

## 1. Hierarchy of Truth

| Rank  | Layer         | Path              | Purpose                             |
| :---- | :------------ | :---------------- | :---------------------------------- |
| **1** | **Blueprint** | `docs/blueprint/` | High-level architectural decisions. |
| **2** | **Spec**      | `docs/spec/`      | Detailed logical models & flows.    |
| **3** | **Schema**    | `schema.prisma`   | Physical data persistence.          |
| **4** | **Code**      | `src/`            | Implementation.                     |

## 2. Rules

- **Precedence**: Higher rank overrides lower rank (e.g., Spec overrides Code).
- **Direction**: Updates flow Down (Blueprint -> Spec -> Code).
- **Conflict**: If Code != Spec, **Spec is SSoT** (unless Spec is obviously
  broken).
- **Synchronization**: Product Constraints (`constraints.md`) must be
  synchronized with Architectural Decisions (`decisions/*.md`). Decisions take
  precedence for technical specifics.

## 3. Workflow

1.  **Update SSoT**: Fix Blueprint/Spec first.
2.  **Update Schema**: If data model changed.
3.  **Sync Code**: Refactor code to match.
