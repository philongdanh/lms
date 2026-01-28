---
name: SSoT Maintenance
description:
  Guidelines for maintaining Single Source of Truth (SSoT) across Blueprint, Spec, Schema, and Code.
---

# SSoT Maintenance Skill

This skill defines the workflow for maintaining consistency across the project's layers.

## 1. Hierarchy of Truth

When discrepancies arise, conflicting sources of information should be resolved in this order:

1.  **Blueprint** (`docs/blueprint/`): High-level architectural decisions and product direction.
2.  **Spec** (`docs/spec/`): Detailed technical specifications and logical data models.
3.  **Schema** (`api/prisma/schema.prisma`): The physical database implementation.
4.  **Code** (`api/src/`, `web/src/`): The application implementation.

## 2. Maintenance Workflow

When a change is requested:

1.  **Update Documentation First**: Never update the code or schema without first verifying/updating the Blueprint and Spec.
2.  **Update Schema (if needed)**: If the data model changes, update `schema.prisma`.
3.  **Sync Code**: Update the application code to match the new spec/schema.

## 3. Handling Discrepancies

If you find that the Code does not match the Spec:
- **Assume the Spec is correct** unless the Spec is obviously outdated (e.g. refers to deprecated technologies).
- If the Spec seems outdated, **ask the user** for clarification before proceeding.
- **Do not simply update the Spec to match the Code** without verification. The Code is often "in the weeds" and might have drifted from the intended design.

## 4. D2 Diagrams

- Maintain D2 diagrams in `docs/` to visualize the SSoT.
- Ensure field names in Entity Relationship Diagrams (ERD) match the Prisma schema content exactly.
