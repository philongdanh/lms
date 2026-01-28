# Gemini Memory

This directory acts as the external memory and state management for the AI
agent.

## Structure

- **antigravity/**
  - **brain/**: Active working memory. Contains ephemeral artifacts for the
    current conversation (`task.md`, `implementation_plan.md`,
    `walkthrough.md`).
  - **knowledge/**: Long-term memory. Stores indexed documentation, insights,
    and lessons learned for retrieval across conversations.
  - **context_state/**: Stores user preferences, current focus, and session
    context.
