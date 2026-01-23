---
id: data
title: Database
sidebar_label: Database
sidebar_position: 3
---

# Database Architecture

ERD và quy định dữ liệu cho hệ thống multi-tenant.

---

## Schema Design

### ERD & Models

```d2
direction: right

# Core entities
Tenant: { shape: sql_table }
User: { shape: sql_table }
Role: { shape: sql_table }
UserRole: { shape: sql_table }

# Content
Subject: { shape: sql_table }
Topic: { shape: sql_table }
Lesson: { shape: sql_table }
Question: { shape: sql_table }

# Learning
StudentProgress: { shape: sql_table }
StudentAnswer: { shape: sql_table }
KnowledgeMap: { shape: sql_table }

# Tournament
Tournament: { shape: sql_table }
CompetitionRound: { shape: sql_table }
CompetitionParticipant: { shape: sql_table }

# Gamification
UserExp: { shape: sql_table }
Badge: { shape: sql_table }
UserBadge: { shape: sql_table }

# Relationships
Tenant -> User: has
User -> UserRole: has
Role -> UserRole: has
Subject -> Topic: has
Topic -> Lesson: has
Lesson -> Question: has
User -> StudentProgress: has
User -> StudentAnswer: has
User -> KnowledgeMap: has
Tournament -> CompetitionRound: has
CompetitionRound -> CompetitionParticipant: has
User -> UserExp: has
User -> UserBadge: has
Badge -> UserBadge: has
```

### Key Entities

| Entity          | Mô tả                 | Columns chính                                |
| --------------- | --------------------- | -------------------------------------------- |
| Tenant          | Trường học/khách hàng | id, name, code, status, settings             |
| User            | Tài khoản người dùng  | id, tenant_id, email, password_hash          |
| UserRole        | Vai trò trong tenant  | user_id, role_id, tenant_id                  |
| Topic           | Chủ đề học tập        | id, tenant_id, subject_id, grade_id          |
| Lesson          | Bài học               | id, topic_id, title, content                 |
| Question        | Câu hỏi               | id, type, content, options, correct_answer   |
| StudentProgress | Tiến độ học           | student_id, lesson_id, completion_percentage |
| Tournament      | Giải đấu              | id, tenant_id, name, status, starts_at       |
| UserExp         | EXP và Level          | user_id, exp_points, level                   |

### Indexing Strategy

| Table                  | Index                             | Purpose                  |
| ---------------------- | --------------------------------- | ------------------------ |
| User                   | (tenant_id, email, deleted_at)    | Login và truy vấn tenant |
| Topic                  | (tenant_id, subject_id, grade_id) | Filter nội dung          |
| StudentAnswer          | (student_id, answered_at)         | Phân tích học tập        |
| CompetitionParticipant | (round_id, score DESC)            | Leaderboard realtime     |
| KnowledgeMap           | (student_id, mastery_level)       | AI recommendations       |
| UserSession            | (user_id, device_id, is_active)   | Multi-device session     |

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
| Full Backup | pg_dump    | Daily     |
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
