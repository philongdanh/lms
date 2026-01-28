# Engineering Workflow Standard

This skill defines the standard workflow for executing engineering tasks within
the project. It ensures consistency, visibility, and quality control.

---

## 1. Task Management (`task.md`)

Every significant task starts with a `task.md` file to track progress.

**Template:**

```markdown
# [Task Name]

- [ ] High-level objective 1 <!-- id: 0 -->
  - [ ] Sub-task A <!-- id: 1 -->
  - [ ] Sub-task B <!-- id: 2 -->
- [ ] High-level objective 2 <!-- id: 3 -->
- [ ] Verification <!-- id: 4 -->
```

## 2. Implementation Planning (`implementation_plan.md`)

Before writing code, create a plan to document proposed changes and risks.

**Template:**

```markdown
# [Goal Description]

Brief description of the problem and goal.

## User Review Required

> [!IMPORTANT] Highlight breaking changes or critical decisions here.

## Proposed Changes

### [Component Name]

#### [MODIFY] [filename](path/to/file)

- Bullet points of changes.

## Verification Plan

- [ ] Automated Tests: `npm run test`
- [ ] Manual Verification steps
```

## 3. Walkthroughs (`walkthrough.md`)

After completion, document the results.

**Template:**

```markdown
# [Task Name] Walkthrough

## Summary of Changes

Concise summary of what was done.

### Key Changes

- **Feature A**: Description...
- **Feature B**: Description...

## Verification

- Proof of build success.
- Test results.
```
