---
id: analytics
title: Analytics
sidebar_label: Analytics
sidebar_position: 5
---

# Analytics

Learning data analysis and statistical reporting module.

---

## Business Logic

### Main Workflows

| Workflow          | Description                         | Actor             | Result                |
| ----------------- | ----------------------------------- | ----------------- | --------------------- |
| ETL Pipeline      | Process events from Learning module | `System`          | Knowledge Map updated |
| Generate Report   | Create report on demand             | `Teacher`/`Admin` | Report PDF/JSON       |
| Daily Aggregation | Aggregate daily data                | `System`          | Daily stats ready     |

#### Detailed Flows

##### ETL Pipeline

```d2
shape: sequence_diagram
"Learning Service"
"Event Bus"
"ETL Worker"
Database
"Analysis Engine"

"Learning Service" -> "Event Bus": publish(lesson_completed)
"Event Bus" -> "ETL Worker": consume_event
"ETL Worker" -> Database: raw_event_log
"ETL Worker" -> "Analysis Engine": calculate_mastery
"Analysis Engine" -> Database: update_knowledge_map
```

##### Generate Report

```d2
shape: sequence_diagram
Teacher
"Analytics Service"
Redis
Database
"PDF Engine"
Storage

Teacher -> "Analytics Service": request_report(class_id)
"Analytics Service" -> Redis: check_cache
Redis -> "Analytics Service": miss
"Analytics Service" -> Database: aggregate_data
Database -> "Analytics Service": heavy_result_set
"Analytics Service" -> "PDF Engine": render_pdf
"PDF Engine" -> Storage: save_file
"Analytics Service" -> Redis: set_cache
"Analytics Service" -> Teacher: report_url
```

##### Daily Aggregation

```d2
shape: sequence_diagram
Scheduler
"Analytics Service"
Database
Aggregator
Storage

Scheduler -> "Analytics Service": trigger_daily_job
"Analytics Service" -> Database: fetch_raw_logs(yesterday)
"Analytics Service" -> Aggregator: summarize_by_user
Aggregator -> Database: insert_daily_stats
"Analytics Service" -> Storage: flush_old_logs_to_s3
```

### Rules & Constraints

- ETL latency < 5s from event
- Authorization: `Teacher` can only view assigned classes
- Cache reports in Redis (TTL 5 minutes)
- Retention: Raw logs 90 days, Daily stats 5 years

### State Machine

N/A - Analytics is a read-only module, no state machine.

---

## Data Model

### Schema & Entities

| Entity         | Main Fields                                          | Description             |
| -------------- | ---------------------------------------------------- | ----------------------- |
| `KnowledgeMap` | `user_id`, `topic_id`, `mastery_score`               | Knowledge mastery level |
| `DailyStats`   | `user_id`, `date`, `lessons_completed`, `time_spent` | Daily statistics        |
| `ReportCache`  | `report_id`, `params_hash`, `data`, `expires_at`     | Report cache            |

### Relations

| `Relation`               | Description                               |
| ------------------------ | ----------------------------------------- |
| `User` → `KnowledgeMap`  | `1:N` - Each user has map for many topics |
| `Analytics` ← `Learning` | Consumes - Receives events from Learning  |
| `Analytics` ← `Auth`     | Consumes - Fetches user/role info         |

---

## API & Integration

### GraphQL Operations

| Type    | Operation          | Description          | Auth         | Rate Limit |
| ------- | ------------------ | -------------------- | ------------ | ---------- |
| `Query` | `progressOverview` | Progress overview    | ✅           | 100/min    |
| `Query` | `subjectProgress`  | Progress by subject  | ✅           | 100/min    |
| `Query` | `knowledgeMap`     | Knowledge map        | ✅           | 50/min     |
| `Query` | `dailyStats`       | Daily learning stats | ✅           | 100/min    |
| `Query` | `classReport`      | Class report         | ✅ `Teacher` | 50/min     |

### Events & Webhooks

| Event                        | Trigger                       | Payload             |
| ---------------------------- | ----------------------------- | ------------------- |
| `analytics.report.generated` | Large report complete (async) | `{ reportId, url }` |

---

## Acceptance Criteria

### Functional Requirements

| ID          | Requirement                  | Condition                           |
| ----------- | ---------------------------- | ----------------------------------- |
| `FR-ANA-01` | Accurate mastery calculation | Correct formula                     |
| `FR-ANA-02` | Accurate daily aggregation   | Sum matches logs                    |
| `FR-ANA-03` | Authorization works          | `Teacher` cannot view other classes |

### Edge Cases

| Case                            | Handling                           |
| ------------------------------- | ---------------------------------- |
| Report too large (>1 year data) | Async processing, return report ID |
| Cache miss                      | Query DB, cache result             |
| No data for period              | Return empty result with metadata  |

---
