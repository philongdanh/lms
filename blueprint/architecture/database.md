---
id: database
title: Database
sidebar_label: Database
sidebar_position: 3
---

# Database

ERD cho hệ thống multi-tenant

---

## Schema

### ERD

```d2
direction: right

# ═══════════════════════════════════════════════════════════════
# CORE: Tenant & User
# ═══════════════════════════════════════════════════════════════

Tenant: {
  shape: sql_table
  id: string {constraint: primary_key}
  code: string {constraint: unique}
  name: string
  domain: string
  logo_url: string {constraint: nullable}
  status: PENDING|ACTIVE|SUSPENDED
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
  avatar_url: string {constraint: nullable}
  status: PENDING|ACTIVE|SUSPENDED|PENDING_DEACTIVATION
  email_verified_at: timestamp {constraint: nullable}
  created_at: timestamp
  updated_at: timestamp
  deleted_at: timestamp {constraint: nullable}
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

OtpVerification: {
  shape: sql_table
  id: string {constraint: primary_key}
  user_id: string {constraint: [foreign_key; nullable]}
  email: string
  type: REGISTER|RESET_PASSWORD
  code: string
  attempts: int
  expires_at: timestamp
  verified_at: timestamp {constraint: nullable}
  created_at: timestamp
}

# ═══════════════════════════════════════════════════════════════
# RBAC: Role-Based Access Control
# ═══════════════════════════════════════════════════════════════

Role: {
  shape: sql_table
  id: string {constraint: primary_key}
  tenant_id: string {constraint: [foreign_key; nullable]}
  code: string
  name: string
  color: string {constraint: nullable}
  description: string {constraint: nullable}
  created_at: timestamp
  updated_at: timestamp
}

Permission: {
  shape: sql_table
  id: string {constraint: primary_key}
  code: string {constraint: unique}
  name: string
  description: string {constraint: nullable}
}

RolePermission: {
  shape: sql_table
  role_id: string {constraint: foreign_key}
  permission_id: string {constraint: foreign_key}
  assigned_at: timestamp
}

UserRole: {
  shape: sql_table
  id: string {constraint: primary_key}
  user_id: string {constraint: foreign_key}
  role_id: string {constraint: foreign_key}
  tenant_id: string {constraint: foreign_key}
  assigned_at: timestamp
}

# ═══════════════════════════════════════════════════════════════
# CONTENT: Curriculum & Questions
# ═══════════════════════════════════════════════════════════════

Subject: {
  shape: sql_table
  id: string {constraint: primary_key}
  tenant_id: string {constraint: foreign_key}
  name: string
  icon_url: string {constraint: nullable}
  grade: int
  order: int
  created_at: timestamp
}

Semester: {
  shape: sql_table
  id: string {constraint: primary_key}
  tenant_id: string {constraint: foreign_key}
  name: string
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
  semester_id: string {constraint: foreign_key}
  title: string
  content: text
  thumbnail_url: string {constraint: nullable}
  video_url: string {constraint: nullable}
  video_duration: int {constraint: nullable}
  passing_score: int
  estimated_minutes: int
  status: DRAFT|PENDING_REVIEW|PUBLISHED|ARCHIVED
  created_by: string {constraint: foreign_key}
  published_by: string {constraint: [foreign_key; nullable]}
  published_at: timestamp {constraint: nullable}
  created_at: timestamp
  updated_at: timestamp
}

Question: {
  shape: sql_table
  id: string {constraint: primary_key}
  lesson_id: string {constraint: foreign_key}
  type: SINGLE_CHOICE|MULTIPLE_CHOICE|TRUE_FALSE|FILL_BLANK|ESSAY
  content: text
  options: json
  correct_answer: json
  explanation: text {constraint: nullable}
  order: int
  created_at: timestamp
}

# ═══════════════════════════════════════════════════════════════
# LEARNING: Progress & Sessions
# ═══════════════════════════════════════════════════════════════

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
  status: LOCKED|AVAILABLE|IN_PROGRESS|COMPLETED|REVIEW
  best_score: int {constraint: nullable}
  attempts: int
  completed_at: timestamp {constraint: nullable}
  updated_at: timestamp
}

ExerciseSession: {
  shape: sql_table
  id: string {constraint: primary_key}
  user_id: string {constraint: foreign_key}
  lesson_id: string {constraint: foreign_key}
  answers: json
  score: int {constraint: nullable}
  time_spent_seconds: int {constraint: nullable}
  started_at: timestamp
  submitted_at: timestamp {constraint: nullable}
}

SubmissionHistory: {
  shape: sql_table
  id: string {constraint: primary_key}
  session_id: string {constraint: foreign_key}
  question_id: string {constraint: foreign_key}
  answer: json
  is_correct: boolean
}

KnowledgeMap: {
  shape: sql_table
  id: string {constraint: primary_key}
  user_id: string {constraint: foreign_key}
  topic_id: string {constraint: foreign_key}
  mastery_score: float
  updated_at: timestamp
}

# ═══════════════════════════════════════════════════════════════
# TOURNAMENT: Competitions
# ═══════════════════════════════════════════════════════════════

Tournament: {
  shape: sql_table
  id: string {constraint: primary_key}
  tenant_id: string {constraint: foreign_key}
  name: string
  description: text {constraint: nullable}
  rules: text {constraint: nullable}
  banner_url: string {constraint: nullable}
  max_participants: int
  entry_fee: int
  min_level: int
  status: DRAFT|REGISTRATION|IN_PROGRESS|COMPLETED|CANCELLED
  starts_at: timestamp
  ends_at: timestamp
  created_by: string {constraint: foreign_key}
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
  score: int {constraint: nullable}
  rank: int {constraint: nullable}
  joined_at: timestamp
  finished_at: timestamp {constraint: nullable}
}

# ═══════════════════════════════════════════════════════════════
# GAMIFICATION: Rewards & Progress
# ═══════════════════════════════════════════════════════════════

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

Streak: {
  shape: sql_table
  user_id: string {constraint: primary_key}
  current_streak: int
  longest_streak: int
  last_active: timestamp
}

Badge: {
  shape: sql_table
  id: string {constraint: primary_key}
  code: string {constraint: unique}
  name: string
  description: string {constraint: nullable}
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
  image_url: string {constraint: nullable}
  cost: int
  type: DIGITAL|PHYSICAL
  is_active: boolean
}

RewardRedemption: {
  shape: sql_table
  id: string {constraint: primary_key}
  user_id: string {constraint: foreign_key}
  reward_id: string {constraint: foreign_key}
  status: PENDING|FULFILLED
  redeemed_at: timestamp
}

# ═══════════════════════════════════════════════════════════════
# FAMILY: Parent-Child Linking
# ═══════════════════════════════════════════════════════════════

ParentChildLink: {
  shape: sql_table
  id: string {constraint: primary_key}
  parent_id: string {constraint: foreign_key}
  child_id: string {constraint: foreign_key}
  invite_code: string {constraint: unique}
  status: PENDING|ACTIVE|REVOKED
  linked_at: timestamp {constraint: nullable}
  created_at: timestamp
}

# ═══════════════════════════════════════════════════════════════
# RELATIONSHIPS
# ═══════════════════════════════════════════════════════════════

# Core
Tenant -> User: 1:N
User -> UserSession: 1:N
User -> OtpVerification: 1:N

# RBAC
User -> UserRole: 1:N
Role -> UserRole: 1:N
Role -> RolePermission: 1:N
Permission -> RolePermission: 1:N

# Content
Subject -> Topic: 1:N
Topic -> Lesson: 1:N
Semester -> Lesson: 1:N
Lesson -> Question: 1:N

# Learning
User -> LearningPath: 1:N
User -> LessonProgress: 1:N
User -> ExerciseSession: 1:N
User -> KnowledgeMap: 1:N
ExerciseSession -> SubmissionHistory: 1:N

# Tournament
Tournament -> CompetitionRound: 1:N
CompetitionRound -> Participant: 1:N

# Gamification
User -> UserProfile: 1:1
User -> Streak: 1:1
User -> UserBadge: 1:N
Badge -> UserBadge: 1:N
User -> RewardRedemption: 1:N
Reward -> RewardRedemption: 1:N

# Family
User -> ParentChildLink: 1:N
```

### Unique Constraints

> SSoT: [`TC-ARCH-006`](design.md#architecture) (Multi-tenancy)

| Bảng          | Constraint             | Mô tả                                |
| ------------- | ---------------------- | ------------------------------------ |
| `Tenant`      | `code`                 | Mã tenant unique toàn hệ thống       |
| `User`        | (`tenant_id`, `email`) | Email unique trong mỗi tenant        |
| `UserSession` | `refresh_token`        | Token unique toàn hệ thống           |
| `Role`        | (`tenant_id`, `code`)  | Role code unique trong mỗi tenant    |
| `Permission`  | `code`                 | Permission code unique toàn hệ thống |
| `Badge`       | `code`                 | Badge code unique toàn hệ thống      |

### Chiến lược đánh Index

| Bảng                | Index                                 | Mục đích                 |
| ------------------- | ------------------------------------- | ------------------------ |
| `User`              | (`tenant_id`, `email`, `deleted_at`)  | Login và truy vấn tenant |
| `Topic`             | (`subject_id`, `order`)               | Filter nội dung          |
| `SubmissionHistory` | (`session_id`, `question_id`)         | Phân tích học tập        |
| `Participant`       | (`round_id`, `score` DESC)            | Leaderboard realtime     |
| `KnowledgeMap`      | (`user_id`, `mastery_score`)          | AI recommendations       |
| `UserSession`       | (`user_id`, `device_id`, `is_active`) | Multi-device session     |

---

## Storage

### Lớp Cache

> SSoT: [`TC-ARCH-003`](design.md#architecture) |
> [0007: Redis](decisions/0007-redis.md)

| Loại Cache    | Lưu trữ    | TTL      | Mục đích                    |
| ------------- | ---------- | -------- | --------------------------- |
| Session       | Redis      | 7 ngày   | Refresh token, user session |
| Learning Path | Redis      | 5 phút   | AI recommendations          |
| Leaderboard   | Redis ZSET | Realtime | Tournament scores           |
| Report        | Redis      | 5 phút   | Generated reports           |

### Sao lưu & Replication

| Khía cạnh   | Chiến lược | Tần suất  |
| ----------- | ---------- | --------- |
| Full Backup | `pg_dump`  | Hàng ngày |
| WAL Archive | Continuous | Realtime  |
| Retention   | 30 ngày    | -         |
| RTO         | < 4 giờ    | -         |
| RPO         | < 1 giờ    | -         |

### Data Retention

| Loại Dữ liệu      | Thời gian lưu | Hành động         |
| ----------------- | ------------- | ----------------- |
| `UserSession`     | 30 ngày       | Auto cleanup      |
| Audit Logs        | 1 năm         | Archive           |
| `ExerciseSession` | Vĩnh viễn     | Phân tích dài hạn |
| `Participant`     | Vĩnh viễn     | Lịch sử           |
| Notifications     | 90 ngày       | Auto cleanup      |
| Soft Deleted      | 1 năm         | Hard delete       |

---
