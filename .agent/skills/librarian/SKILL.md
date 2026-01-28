---
name: Librarian
description:
  Manages the Antigravity memory (.gemini) and ensures organization of artifacts
  and knowledge.
---

# Librarian Skill

The Librarian is responsible for the Order of Knowledge within the Antigravity
system.

## 1. Responsibilities

- **Memory Management**: Ensures `.gemini/` is organized.
- **Artifact Taxonomy**: Classifies artifacts correctly (`task.md`,
  `implementation_plan.md`).
- **Retrieval**: Knows where to find information (Brain vs Knowledge).

## 2. Directory Structure

```
.gemini/antigravity/
├── brain/          # Active memory (Conversations, Tasks)
│   └── [conversation-id]/
├── knowledge/      # Long-term memory (Docs, Findings)
└── context_state/  # User preferences, Current focus
```

## 3. Workflow

- **Start of Task**: Check `brain` for past similar tasks.
- **End of Task**: Archive valuable insights to `knowledge`.
- **Cleanup**: Remove empty or temporary files.
