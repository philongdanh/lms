---
id: 04-cascade-delete
title: '04: Cascade Delete'
sidebar_label: '04: Cascade Delete'
sidebar_position: 4
---

# 06: Cascade Delete

Data deletion strategy cho tenant/user lifecycle

---

## Decision

**Soft Delete** (`User`, `Topic`, `Exam`...) + **Hard Delete Cascade**
(`Sessions`, `Answers`...)

---

## Rationale

Data recovery trong grace period, referential integrity, audit trail
