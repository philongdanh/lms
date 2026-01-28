---
id: database
title: Database
sidebar_label: Database
sidebar_position: 3
---

# Database

ERD and data regulations for the multi-tenant system.

---

## Schema design

### ERD & models

```d2
direction: right

# === Core Domain ===

Tenant: {
  shape: sql_table
  id: string {constraint: primary_key}
  name: string
  code: string {constraint: unique}
  domain: string
  status: enum {constraint: "PENDING|ACTIVE|SUSPENDED"}
  settings: json
  created_at: timestamp
  updated_at: timestamp
}

User: {
  shape: sql_table
  id: string {constraint: primary_key}
  tenant_id: string {constraint: foreign_key}
  email: string
  password: string
  name: string
  status: enum {constraint: "PENDING|ACTIVE|SUSPENDED|PENDING_DEACTIVATION"}
  email_verified_at: timestamp
  created_at: timestamp
  updated_at: timestamp
  deleted_at: timestamp
}

UserRole: {
  shape: sql_table
  id: string {constraint: primary_key}
  user_id: string {constraint: foreign_key}
  role: enum {constraint: "SUPER_ADMIN|ADMIN|TEACHER|STUDENT|PARENT"}
  tenant_id: string {constraint: foreign_key}
  assigned_at: timestamp
}

UserSession: {
  shape: sql_table
  id: string {constraint: primary_key}
  user_id: string {constraint: foreign_key}
  device_id: string
  device_name: string
  refresh_token: string {constraint: unique}
  is_active: boolean
  last_active_at: timestamp
  created_at: timestamp
  expires_at: timestamp
}

# === Content Domain ===

Subject: {
  shape: sql_table
  id: string {constraint: primary_key}
  tenant_id: string {constraint: foreign_key}
  name: string
  grade: int
  curriculum: string
  order: int
  created_at: timestamp
}

Topic: {
  shape: sql_table
  id: string {constraint: primary_key}
  subject_id: string {constraint: foreign_key}
  name: string
  order: int
  created_at: timestamp
}

Lesson: {
  shape: sql_table
  id: string {constraint: primary_key}
  topic_id: string {constraint: foreign_key}
  title: string
  content: text
  status: enum {constraint: "DRAFT|PENDING_REVIEW|PUBLISHED|ARCHIVED"}
  passing_score: int
  estimated_minutes: int
  created_by: string
  published_by: string
  published_at: timestamp
  created_at: timestamp
  updated_at: timestamp
}

Question: {
  shape: sql_table
  id: string {constraint: primary_key}
  lesson_id: string {constraint: foreign_key}
  type: enum {constraint: "SINGLE_CHOICE|MULTIPLE_CHOICE|TRUE_FALSE|FILL_BLANK|ESSAY"}
  content: text
  options: json
  correct_answer: json
  explanation: text
  order: int
  created_at: timestamp
}

# === Learning Domain ===

LearningPath: {
  shape: sql_table
  id: string {constraint: primary_key}
  user_id: string {constraint: foreign_key}
  subject_id: string {constraint: foreign_key}
  lessons: json
  generated_at: timestamp
  valid_until: timestamp
}

LessonProgress: {
  shape: sql_table
  id: string {constraint: primary_key}
  user_id: string {constraint: foreign_key}
  lesson_id: string {constraint: foreign_key}
  status: enum {constraint: "LOCKED|AVAILABLE|IN_PROGRESS|COMPLETED|REVIEW"}
  best_score: int
  attempts: int
  completed_at: timestamp
  updated_at: timestamp
}

ExerciseSession: {
  shape: sql_table
  id: string {constraint: primary_key}
  user_id: string {constraint: foreign_key}
  lesson_id: string {constraint: foreign_key}
  started_at: timestamp
  submitted_at: timestamp
  score: int
  time_spent_seconds: int
  answers: json
}

SubmissionHistory: {
  shape: sql_table
  id: string {constraint: primary_key}
  session_id: string {constraint: foreign_key}
  question_id: string
  answer: string
  is_correct: boolean
}

KnowledgeMap: {
  shape: sql_table
  id: string {constraint: primary_key}
  user_id: string {constraint: foreign_key}
  topic_id: string
  mastery_score: float
  updated_at: timestamp
}

# === Tournament Domain ===

Tournament: {
  shape: sql_table
  id: string {constraint: primary_key}
  tenant_id: string {constraint: foreign_key}
  name: string
  status: enum {constraint: "DRAFT|REGISTRATION|IN_PROGRESS|COMPLETED|CANCELLED"}
  max_participants: int
  starts_at: timestamp
  ends_at: timestamp
  created_by: string
  created_at: timestamp
}

CompetitionRound: {
  shape: sql_table
  id: string {constraint: primary_key}
  tournament_id: string {constraint: foreign_key}
  round_number: int
  starts_at: timestamp
  ends_at: timestamp
  questions: json
}

Participant: {
  shape: sql_table
  id: string {constraint: primary_key}
  round_id: string {constraint: foreign_key}
  user_id: string {constraint: foreign_key}
  score: int
  rank: int
  finished_at: timestamp
  joined_at: timestamp
}

# === Gamification Domain ===

UserProfile: {
  shape: sql_table
  user_id: string {constraint: primary_key}
  exp: int
  level: int
  coins: int
  current_level_exp: int
  next_level_exp: int
  updated_at: timestamp
}

Badge: {
  shape: sql_table
  id: string {constraint: primary_key}
  code: string {constraint: unique}
  name: string
  description: string
  icon_url: string
  criteria: json
}

UserBadge: {
  shape: sql_table
  id: string {constraint: primary_key}
  user_id: string {constraint: foreign_key}
  badge_id: string {constraint: foreign_key}
  awarded_at: timestamp
}

Reward: {
  shape: sql_table
  id: string {constraint: primary_key}
  name: string
  cost: int
  type: enum {constraint: "DIGITAL|PHYSICAL"}
  is_active: boolean
}

RewardRedemption: {
  shape: sql_table
  id: string {constraint: primary_key}
  user_id: string {constraint: foreign_key}
  reward_id: string {constraint: foreign_key}
  status: enum {constraint: "PENDING|FULFILLED"}
  redeemed_at: timestamp
}

Streak: {
  shape: sql_table
  user_id: string {constraint: primary_key}
  current_streak: int
  longest_streak: int
  last_active: timestamp
}

# === Relationships ===

Tenant -> User: 1:N
User -> UserRole: 1:N
User -> UserSession: 1:N

Subject -> Topic: 1:N
Topic -> Lesson: 1:N
Lesson -> Question: 1:N

User -> LearningPath: 1:N
User -> LessonProgress: 1:N
User -> ExerciseSession: 1:N
User -> KnowledgeMap: 1:N
ExerciseSession -> SubmissionHistory: 1:N

Tournament -> CompetitionRound: 1:N
CompetitionRound -> Participant: 1:N

User -> UserProfile: 1:1
User -> UserBadge: 1:N
Badge -> UserBadge: 1:N
User -> RewardRedemption: 1:N
Reward -> RewardRedemption: 1:N
User -> Streak: 1:1
```

### Indexing Strategy

| Table                    | Index                                   | Purpose                  |
| ------------------------ | --------------------------------------- | ------------------------ |
| `User`                   | (`tenant_id`, `email`, `deleted_at`)    | Login và truy vấn tenant |
| `Topic`                  | (`tenant_id`, `subject_id`, `grade_id`) | Filter nội dung          |
| `StudentAnswer`          | (`student_id`, `answered_at`)           | Phân tích học tập        |
| `CompetitionParticipant` | (`round_id`, `score` DESC)              | Leaderboard realtime     |
| `KnowledgeMap`           | (`student_id`, `mastery_level`)         | AI recommendations       |
| `UserSession`            | (`user_id`, `device_id`, `is_active`)   | Multi-device session     |

---

## Storage

### Caching Layer

| Cache Type    | Storage    | TTL      | Purpose                     |
| ------------- | ---------- | -------- | --------------------------- |
| Session       | Redis      | 7 days   | Refresh token, user session |
| Learning Path | Redis      | 5 min    | AI recommendations          |
| Leaderboard   | Redis ZSET | Realtime | Tournament scores           |
| Report        | Redis      | 5 min    | Generated reports           |

### Backup & Replication

| Aspect      | Strategy   | Frequency |
| ----------- | ---------- | --------- |
| Full Backup | `pg_dump`  | Daily     |
| WAL Archive | Continuous | Realtime  |
| Retention   | 30 days    | -         |
| RTO         | < 4 hours  | -         |
| RPO         | < 1 hour   | -         |

### Data Retention

| Data Type           | Retention | Action            |
| ------------------- | --------- | ----------------- |
| User Sessions       | 30 ngày   | Auto cleanup      |
| Audit Logs          | 1 năm     | Archive           |
| Student Answers     | Vĩnh viễn | Phân tích dài hạn |
| Competition Results | Vĩnh viễn | Lịch sử           |
| Notifications       | 90 ngày   | Auto cleanup      |
| Soft Deleted        | 1 năm     | Hard delete       |

---
