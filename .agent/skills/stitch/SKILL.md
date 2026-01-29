---
name: stitch
description: Connects Code to Documentation (Context & References).
---

# Stitching

Aligns Executive (Code) with Legislative (Docs).

## 1. Context Stitching

Read the right docs before coding.

| Task Scope        | Required Reading                          |
| :---------------- | :---------------------------------------- |
| **Schema/Data**   | `docs/blueprint/architecture/database.md` |
| **Logic/Service** | `docs/spec/modules/[module].md`           |
| **UI/Component**  | `docs/spec/ui/frontend.md`                |
| **API**           | `docs/spec/api/gateway.md`                |

## 2. Stitch Marks

Leave references in code to the specific Spec section.

```typescript
// SSoT: docs/spec/modules/auth.md #Authentication-Flow
async function login() { ... }
```

## 3. Rules

- **Stop on Mismatch**: If code requirement contradicts Spec, STOP.
- **Report**: Use `review` skill to resolve contradiction.
- **Trace**: Every major function should have a Stitch Mark.
