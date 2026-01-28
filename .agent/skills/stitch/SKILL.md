# Stitch Skill

The Stitch skill connects the Legislative (Docs) with the Executive (API).

---

## 1. Context Stitching

When working on a file, "Stitch" the relevant context:

- **Schema Stitch**: Working on `schema.prisma`? -> Read
  `docs/blueprint/architecture/database.md`.
- **Logic Stitch**: Working on `[module].service.ts`? -> Read
  `docs/spec/modules/[module].md`.
- **UI Stitch**: Working on a Component? -> Read `docs/spec/ui/frontend.md`.

## 2. In-Code References

Always leave "Stitch Marks" in the code:

```typescript
// SSoT: docs/spec/modules/auth.md #Authentication-Flow
async function login() { ... }
```

## 3. Validation

- If the Code contradicts the Stitched Spec, **Stop**.
- Report the mismatch using the `Review` skill.
