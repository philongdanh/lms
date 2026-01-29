---
name: workflow
description: Standard workflow for Tasks, Plans, and Walkthroughs.
---

# Engineering Workflow

Standard artifacts and process for task execution.

## 1. Artifacts

| Artifact  | File                     | Purpose                        | Timing       |
| :-------- | :----------------------- | :----------------------------- | :----------- |
| **Task**  | `task.md`                | Track progress checkbox list.  | Start        |
| **Plan**  | `implementation_plan.md` | Design & approval before code. | Planning     |
| **Proof** | `walkthrough.md`         | Evidence of verification.      | Verification |

## 2. Templates

### Task (`task.md`)

```markdown
# [Task Name]

- [ ] Task 1 <!-- id: 0 -->
  - [ ] Subtask <!-- id: 1 -->
```

### Plan (`implementation_plan.md`)

```markdown
# Goal

## Proposed Changes

### [Component]

#### [MODIFY] [file]

## Verification
```

### Walkthrough (`walkthrough.md`)

```markdown
# [Task] Walkthrough

## Changes

## Verification Results (Screenshots/Logs)
```
