---
id: learning-logic
title: Learning Business Logic
sidebar_label: Logic
---

# Learning & Personalization - Business Logic

## Business Context
- **Module**: Learning & Personalization
- **Version**: 1.0
- **Status**: Approved
- **Cập nhật lần cuối**: 2026-01-14

## Overview
Module cốt lõi cho Students, chịu trách nhiệm về Adaptive Learning Path, Progress Tracking và Knowledge Map. Cung cấp tính năng học tập thích ứng dựa trên AI để cá nhân hóa trải nghiệm học tập.

## Use Cases
| Use Case ID | Use Case Name | Description | Priority | Status |
|------------|--------------|-------|----------|--------|
| UC-LEARN-001 | Get Personalized Path | Lấy lộ trình học tập cá nhân hóa dựa trên phân tích AI | P0 | Planned |
| UC-LEARN-002 | View Knowledge Map | Xem bản đồ kiến thức và các lỗ hổng kiến thức | P1 | Planned |
| UC-LEARN-003 | View Lesson Details | Xem chi tiết bài học và tài liệu học tập | P0 | Planned |
| UC-LEARN-004 | Track Progress | Ghi nhận tiến độ học tập (video, quiz) | P0 | Planned |
| UC-LEARN-005 | Start Practice Session | Bắt đầu phiên luyện tập bài tập | P1 | Planned |
| UC-LEARN-006 | Submit Answer | Nộp câu trả lời và nhận kết quả ngay lập tức | P0 | Planned |

### UC-LEARN-001: Get Personalized Path
**Actor**: Student
**Preconditions**: Student đã đăng nhập và có dữ liệu lịch sử học tập (hoặc mặc định).
**Luồng chính**:
1. Student truy cập Dashboard.
2. System gọi Path Service.
3. Service lấy dữ liệu từ Knowledge Map và History.
4. AI Model phân tích và đề xuất danh sách bài học.
5. System hiển thị lộ trình học tập.

**Hậu điều kiện**: Lộ trình học tập được hiển thị.
**Ngoại lệ**: Lỗi AI Service -> Fallback về lộ trình mặc định.

### UC-LEARN-006: Submit Answer
**Actor**: Student
**Preconditions**: Đang trong phiên làm bài tập.
**Luồng chính**:
1. Student chọn câu trả lời và nhấn Submit.
2. System xác thực session.
3. System so sánh câu trả lời và tính điểm.
4. System lưu kết quả và cập nhật tiến độ.
5. System trả về kết quả và giải thích.

**Hậu điều kiện**: Kết quả được lưu, điểm được cập nhật.

## Business Rules
| Rule ID | Rule Name | Description | Condition | Action | Exception |
|---------|----------|-------|------------|---------|------------|
| BR-LEARN-001 | Video Completion | Điều kiện hoàn thành video | Thời gian xem > 80% tổng thời lượng | Đánh dấu Video Completed | Lỗi mạng -> Retry logic |
| BR-LEARN-002 | Lesson Completion | Điều kiện hoàn thành bài học | Video Completed VÀ Quiz Score > 70% | Đánh dấu Lesson Completed, Trigger Reward | - |
| BR-LEARN-003 | Prerequisite Check | Kiểm tra điều kiện tiên quyết | Bài học trước chưa hoàn thành | Trạng thái Locked, Trả về `CONTENT_LOCKED` | - |
| BR-LEARN-004 | Anti-Cheat | Ngăn chặn gian lận trong bài tập | Client request đáp án trước khi submit | Chặn request, Ghi log vi phạm | - |
| BR-LEARN-005 | Reward Trigger | Trao thưởng khi hoàn thành | Lesson Completed thay đổi từ False -> True | Gọi Gamification Service thêm EXP | Service down -> Queue event |

## Dependencies
### Internal Dependencies
- ✅ Content Module - Cung cấp nội dung bài học, video, câu hỏi.
- ✅ Analytics Module - Cung cấp Knowledge Map và phân tích dữ liệu.
- ✅ Gamification Module - Xử lý điểm thưởng, huy hiệu.

### External Dependencies
- ✅ AI Service (Python) - Mô hình đề xuất lộ trình học tập.

## KPIs & Metrics
| Metric | Target | Measurement | Frequency |
|--------|--------|-------------------|-----------|
| Adaptive Path Accuracy | > 85% | User feedback & click-through rate | Hàng tuần |
| Lesson Completion Rate | > 60% | DB query (completed / started) | Hàng ngày |
| P95 Latency (Submit) | < 200ms | APM Monitoring | Real-time |

## Validation Criteria
- [ ] Tất cả use cases đã được định nghĩa và review.
- [ ] Logic hoàn thành bài học (BR-LEARN-001, BR-LEARN-002) được test kỹ lưỡng.
- [ ] Luồng tương tác với AI Service được định nghĩa rõ ràng (fallback khi lỗi).
- [ ] Cơ chế anti-cheat được thiết kế.


## Review & Approval
| Role | Name | Date | Status |
|------|------|------|--------|
| **Product Owner** | | | |
| **Tech Lead** | | | |
| **QA Lead** | | | |


---

# Workflows

## Overview
Các workflows và quy trình nghiệp vụ của module Learning, bao gồm quy trình học tập và làm bài tập.

## Workflow Summary
| Workflow ID | Workflow Name | Trigger | Actors | Status |
|-------------|--------------|---------|--------|--------|
| WF-LEARN-001 | Submit Exercise | Student nộp câu trả lời | Student, System | Active |
| WF-LEARN-002 | Generate Learning Path | Student truy cập dashboard | Student, AI Service | Active |
| WF-LEARN-003 | Lesson Progress Tracking | Student xem video/vượt qua quiz | Student, System | Active |

## Workflow Details

### WF-LEARN-001: Submit Exercise
**Description**: Quy trình xử lý khi student nộp câu trả lời cho bài tập luyện tập.

#### Flow Diagram
```mermaid
---
config:
  themeVariables:
    fontFamily: "EB Garamond"
---
flowchart TD
    A[Student Selects Answers] --> B[Submit Request]
    B --> C{Validate Session}
    
    C -- Valid --> D["Fetch Correct Answers (Server-side)"]
    D --> E[Compare & Calculate Score]
    
    E --> F{Score >= PassThreshold?}
    F -- Yes --> G[Mark Lesson Completed]
    F -- No --> H[Keep 'In Progress']
    
    G --> I[Publish 'LESSON_COMPLETED' Event]
    H --> J[Return Result & Hints]
    
    I --> K[Gamification: Add EXP]
    I --> L[Analytics: Update Knowledge Map]
    
    K --> M[Return Result with Rewards]
    M --> N[Client Show Celebration]
```

#### Steps
| Step | Description | Actor | System Action | Exit Condition |
|------|-------------|-------|---------------|----------------|
| 1 | Student gửi câu trả lời | Student | Nhận request | - |
| 2 | Xác thực Session | System | Kiểm tra session ID & expiry | Session Valid |
| 3 | Chấm điểm câu trả lời | System | So sánh với đáp án đúng | - |
| 4 | Cập nhật tiến độ | System | Lưu vào DB, cập nhật stats | - |
| 5 | Trigger Events | System | Emit completion events (nếu có) | - |
| 6 | Trả về Response | System | Gửi JSON result | - |

#### Business Rules
- **BR-LEARN-004**: Kiểm tra Anti-Cheat trước khi chấm điểm.
- **BR-LEARN-005**: Chỉ trigger rewards nếu đây là lần hoàn thành *đầu tiên*.

### WF-LEARN-002: Adaptive Learning Path Generation
**Description**: Tạo lộ trình học tập thích ứng dựa trên lịch sử.

#### Flow Diagram
```mermaid
---
config:
  themeVariables:
    fontFamily: "EB Garamond"
---
sequenceDiagram
    participant Student
    participant API
    participant PathService
    participant Analytics
    participant AI_Model

    Student->>API: Get Learning Path
    API->>PathService: Request Path for Student
    
    par Fetch Data
        PathService->>Analytics: Get Knowledge Map
        PathService->>DB: Get Recent Activity
    end
    
    PathService->>AI_Model: Generate Recommendation(Profile, History)
    AI_Model-->>PathService: List<LessonID> (Ordered)
    
    PathService->>DB: Enrich with Lesson Metadata
    PathService-->>API: Full Learning Path
    API-->>Student: Display Personalized Route
```

### WF-LEARN-003: Lesson Progress State
**Description**: Trạng thái của một bài học đối với student.

#### Flow Diagram
```mermaid
---
config:
  themeVariables:
    fontFamily: "EB Garamond"
---
stateDiagram-v2
    [*] --> LOCKED: Prerequisite not met
    LOCKED --> AVAILABLE: Prerequisite met
    AVAILABLE --> IN_PROGRESS: Started watching/doing
    IN_PROGRESS --> COMPLETED: Criteria met (Video > 80%, Quiz > 70%)
    COMPLETED --> REVIEW: Re-learning
```

## Events
### System Events
| Event Name | Description | Payload | Emitted By |
|------------|-------------|---------|------------|
| `lesson.completed` | Bài học hoàn thành | `{student_id, lesson_id, timestamp}` | Learning Svc |
| `path.generated` | Lộ trình học tập mới được tạo | `{student_id, path_id}` | Learning Svc |

## Error Handling
| Error Scenario | Detection | Recovery Action | Escalation |
|----------------|-----------|-----------------|------------|
| AI Model Timeout | Timeout > 2s | Trả về Default Path (theo Curriculum) | Log warning |
| DB Write Fail | Exception | Trả lỗi cho client, retry client-side | - |

## Performance Requirements
- **Thời gian xử lý**: Submit answer < 200ms
- **Throughput**: 5000 requests/sec (Submit)

## Security Requirements
- [ ] Rate limiting theo user
- [ ] Xác thực quyền sở hữu session


## Validation Checklist
- [ ] Tất cả workflows đã được vẽ sơ đồ
- [ ] Xử lý lỗi được chỉ định cho AI failure

## References

- [Overview](./overview.md)
