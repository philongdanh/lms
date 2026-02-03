---
id: 04-cascade-delete
title: '04: Cascade Delete'
sidebar_label: '04: Cascade Delete'
sidebar_position: 4
---

# 04: Cascade Delete

Data deletion strategy cho tenant/user lifecycle

---

## Decision

**Soft Delete** (`User`, `Lesson`...) + **Hard Delete Cascade** (`Sessions`,
`Answers`...)

---

## Rationale

Data recovery trong grace period, referential integrity, audit trail

---

## Cascade Chains

### User Cascade

```d2
direction: down

User: {style.fill: "#ef4444"}

User -> UserSession: CASCADE
User -> OtpVerification: CASCADE
User -> UserRole: CASCADE
User -> LearningPath: CASCADE
User -> LessonProgress: CASCADE
User -> ExerciseSession: CASCADE
User -> KnowledgeMap: CASCADE
User -> UserProfile: CASCADE
User -> Streak: CASCADE
User -> UserBadge: CASCADE
User -> RewardRedemption: CASCADE
User -> ParentChildLink: CASCADE
User -> Participant: CASCADE

ExerciseSession -> SubmissionHistory: CASCADE
```

### Content Cascade

```d2
direction: down

Subject: {style.fill: "#f59e0b"}
Topic: {style.fill: "#f59e0b"}
Lesson: {style.fill: "#f59e0b"}

Subject -> Topic: CASCADE
Topic -> Lesson: CASCADE
Lesson -> Question: CASCADE
Lesson -> LessonProgress: SET NULL
Lesson -> ExerciseSession: SET NULL
```

### Tournament Cascade

```d2
direction: down

Tournament: {style.fill: "#8b5cf6"}

Tournament -> CompetitionRound: CASCADE
CompetitionRound -> Participant: CASCADE
```

### Tenant Cascade

```d2
direction: down

Tenant: {style.fill: "#3b82f6"}

Tenant -> User: CASCADE
Tenant -> Role: CASCADE
Tenant -> Subject: CASCADE
Tenant -> Semester: CASCADE
Tenant -> Tournament: CASCADE
```
