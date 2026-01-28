---
id: 0006-cascade-delete
title: '0006: Cascade Delete'
sidebar_label: '0006: Cascade Delete'
sidebar_position: 6
---

# 0006: Cascade Delete

Cần data deletion strategy cho tenant/user lifecycle.

---

## Decision

**Soft Delete** (`User`, `Topic`, `Exam`...) + **Hard Delete Cascade**
(`Sessions`, `Answers`...).

---

## Rationale

Data recovery trong grace period, referential integrity, audit trail.
