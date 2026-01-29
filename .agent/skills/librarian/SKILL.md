---
name: librarian
description: Manages memory, artifacts, knowledge, and directory structure.
---

# Librarian Skill

Manages the `.gemini/antigravity/` memory system.

## 1. Directory Structure

| Path               | Purpose          | Content Type                                         |
| :----------------- | :--------------- | :--------------------------------------------------- |
| **brain/**         | Active Memory    | Current context, `task.md`, `implementation_plan.md` |
| **knowledge/**     | Long-term Memory | Archived insights, findings, documentation           |
| **context_state/** | Preferences      | User preferences, current focus state                |

## 2. Workflow

- **Start**: Check `brain/` for existing context or similar past tasks.
- **End**: Archive valuable insights to `knowledge/` (e.g.,
  `knowledge/performance-tips.md`).
- **Cleanup**: Delete temporary files in `brain/` after task completion (keep
  Artifacts).
