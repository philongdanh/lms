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

# ═══════════════════════════════════════════════════════════════════════════
# CORE / MULTI-TENANT
# ═══════════════════════════════════════════════════════════════════════════

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

# ═══════════════════════════════════════════════════════════════════════════
# IDENTITY & AUTH
# ═══════════════════════════════════════════════════════════════════════════

User: {
  shape: sql_table
  id: string {constraint: primary_key}
  tenant_id: string {constraint: foreign_key}
  email: string
  phone: string {constraint: nullable}
  password: string {constraint: nullable}
  name: string
  avatar_url: string {constraint: nullable}
  provider: INTERNAL|GOOGLE {constraint: nullable}
  provider_id: string {constraint: nullable}
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
  expires_at: timestamp
  created_at: timestamp
}

OtpVerification: {
  shape: sql_table
  id: string {constraint: primary_key}
  user_id: string {constraint: [foreign_key; nullable]}
  identifier: string
  code: string
  type: REGISTER|RESET_PASSWORD|PHONE_VERIFY
  attempts: int
  verified_at: timestamp {constraint: nullable}
  expires_at: timestamp
  created_at: timestamp
}

# ═══════════════════════════════════════════════════════════════════════════
# RBAC
# ═══════════════════════════════════════════════════════════════════════════

Role: {
  shape: sql_table
  id: string {constraint: primary_key}
  tenant_id: string {constraint: [foreign_key; nullable]}
  code: string
  name: string
  description: string {constraint: nullable}
  color: string {constraint: nullable}
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

# ═══════════════════════════════════════════════════════════════════════════
# CONTENT
# ═══════════════════════════════════════════════════════════════════════════

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
  created_by: string {constraint: foreign_key}
  published_by: string {constraint: [foreign_key; nullable]}
  title: string
  content: text
  thumbnail_url: string {constraint: nullable}
  video_url: string {constraint: nullable}
  video_duration: int {constraint: nullable}
  passing_score: int
  estimated_minutes: int
  status: DRAFT|PENDING_REVIEW|PUBLISHED|ARCHIVED
  published_at: timestamp {constraint: nullable}
  created_at: timestamp
  updated_at: timestamp
}

Question: {
  shape: sql_table
  id: string {constraint: primary_key}
  lesson_id: string {constraint: foreign_key}
  content: text
  type: SINGLE_CHOICE|MULTIPLE_CHOICE|TRUE_FALSE|FILL_BLANK|ESSAY
  options: json
  correct_answer: json
  explanation: text {constraint: nullable}
  order: int
  created_at: timestamp
}

# ═══════════════════════════════════════════════════════════════════════════
# LEARNING PROGRESS
# ═══════════════════════════════════════════════════════════════════════════

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

# ═══════════════════════════════════════════════════════════════════════════
# TOURNAMENT
# ═══════════════════════════════════════════════════════════════════════════

Tournament: {
  shape: sql_table
  id: string {constraint: primary_key}
  tenant_id: string {constraint: foreign_key}
  created_by: string {constraint: foreign_key}
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
  created_at: timestamp
}

CompetitionRound: {
  shape: sql_table
  id: string {constraint: primary_key}
  tournament_id: string {constraint: foreign_key}
  round_number: int
  questions: json
  starts_at: timestamp
  ends_at: timestamp
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

# ═══════════════════════════════════════════════════════════════════════════
# GAMIFICATION
# ═══════════════════════════════════════════════════════════════════════════

UserProfile: {
  shape: sql_table
  user_id: string {constraint: primary_key}
  exp: int
  level: int
  coins: int
  current_level_exp: int
  next_level_exp: int
  theme: LIGHT|DARK
  locale: string {constraint: nullable}
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

# ═══════════════════════════════════════════════════════════════════════════
# SHOP / REWARDS
# ═══════════════════════════════════════════════════════════════════════════

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

UserInventory: {
  shape: sql_table
  id: string {constraint: primary_key}
  user_id: string {constraint: foreign_key}
  reward_id: string {constraint: foreign_key}
  equipped: boolean
  acquired_at: timestamp
}

# ═══════════════════════════════════════════════════════════════════════════
# SOCIAL
# ═══════════════════════════════════════════════════════════════════════════

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

# ═══════════════════════════════════════════════════════════════════════════
# PREFERENCES
# ═══════════════════════════════════════════════════════════════════════════

NotificationPreference: {
  shape: sql_table
  user_id: string {constraint: [primary_key; foreign_key]}
  tournament_enabled: boolean
  reminder_enabled: boolean
  push_token: string {constraint: nullable}
  updated_at: timestamp
}

# ═══════════════════════════════════════════════════════════════════════════
# RELATIONS
# ═══════════════════════════════════════════════════════════════════════════

Tenant -> User: 1:N

User -> UserSession: 1:N
User -> OtpVerification: 1:N

User -> UserRole: 1:N
Role -> UserRole: 1:N
Role -> RolePermission: 1:N
Permission -> RolePermission: 1:N

Subject -> Topic: 1:N
Semester -> Lesson: 1:N
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
User -> Streak: 1:1
User -> UserBadge: 1:N
Badge -> UserBadge: 1:N

User -> RewardRedemption: 1:N
User -> UserInventory: 1:N
Reward -> RewardRedemption: 1:N
Reward -> UserInventory: 1:N

User -> ParentChildLink: 1:N
User -> NotificationPreference: 1:1
```

### Ràng buộc Unique

| Bảng                     | Constraint                          | Mô tả                         |
| ------------------------ | ----------------------------------- | ----------------------------- |
| `Tenant`                 | `code`                              | Unique toàn hệ thống          |
| `User`                   | (`tenant_id`, `email`)              | Unique trong mỗi tenant       |
| `User`                   | (`tenant_id`, `phone`)              | Unique phone trong tenant     |
| `User`                   | (`provider`, `provider_id`)         | Unique social account         |
| `UserSession`            | `refresh_token`                     | Unique toàn hệ thống          |
| `OtpVerification`        | (`identifier`, `type`)              | Mỗi identifier chỉ 1 OTP/type |
| `Role`                   | (`tenant_id`, `code`)               | Unique trong mỗi tenant       |
| `Permission`             | `code`                              | Unique toàn hệ thống          |
| `RolePermission`         | (`role_id`, `permission_id`)        | Tránh assign trùng            |
| `UserRole`               | (`user_id`, `role_id`, `tenant_id`) | Tránh assign role trùng       |
| `LessonProgress`         | (`user_id`, `lesson_id`)            | 1 progress/user/lesson        |
| `KnowledgeMap`           | (`user_id`, `topic_id`)             | 1 mastery score/user/topic    |
| `Participant`            | (`round_id`, `user_id`)             | 1 lần tham gia/user/round     |
| `Badge`                  | `code`                              | Unique toàn hệ thống          |
| `UserBadge`              | (`user_id`, `badge_id`)             | 1 badge/user/loại             |
| `UserInventory`          | (`user_id`, `reward_id`)            | Tránh mua trùng               |
| `ParentChildLink`        | `invite_code`                       | Unique toàn hệ thống          |
| `NotificationPreference` | `user_id`                           | 1 preference set/user         |

### Đánh Index

| Bảng                | Index                                  | Mục đích               |
| ------------------- | -------------------------------------- | ---------------------- |
| `User`              | (`tenant_id`, `email`, `deleted_at`)   | Login, truy vấn tenant |
| `User`              | (`tenant_id`, `phone`, `deleted_at`)   | Login bằng SĐT         |
| `User`              | (`provider`, `provider_id`)            | OAuth lookup           |
| `UserSession`       | (`user_id`, `device_id`, `is_active`)  | Multi-device session   |
| `OtpVerification`   | (`identifier`, `type`, `expires_at`)   | Tìm OTP hợp lệ         |
| `Lesson`            | (`topic_id`, `semester_id`, `status`)  | Filter bài học         |
| `LessonProgress`    | (`user_id`, `lesson_id`)               | Tiến độ học sinh       |
| `ExerciseSession`   | (`user_id`, `lesson_id`, `started_at`) | Lịch sử làm bài        |
| `SubmissionHistory` | (`session_id`, `question_id`)          | Phân tích học tập      |
| `KnowledgeMap`      | (`user_id`, `topic_id`)                | AI recommendations     |
| `Tournament`        | (`tenant_id`, `status`, `starts_at`)   | Filter giải đấu        |
| `Participant`       | (`round_id`, `score` DESC)             | Leaderboard            |
| `UserInventory`     | (`user_id`, `equipped`)                | Filter items equipped  |

---

## Storage

### Lớp Cache

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

| Loại Dữ liệu      | Thời gian lưu | Hành động    |
| ----------------- | ------------- | ------------ |
| `UserSession`     | 30 ngày       | Auto cleanup |
| `ExerciseSession` | Vĩnh viễn     | Analytics    |
| `Participant`     | Vĩnh viễn     | Lịch sử      |
| Audit Logs        | 1 năm         | Archive      |
| Notifications     | 90 ngày       | Auto cleanup |
| Soft Deleted      | 1 năm         | Hard delete  |
