---
id: adr-009
title: 'ADR-009: Cascade Delete Strategy'
sidebar_label: '009: Cascade Delete'
sidebar_position: 9
---

# ADR-009: Cascade Delete Strategy

Cần data deletion strategy cho tenant/user lifecycle.

---

## Decision

**Soft Delete** (User, Topic, Exam...) + **Hard Delete** `CASCADE` (Sessions,
Answers...).

---

## Rationale

Data recovery trong grace period, referential integrity, audit trail.
