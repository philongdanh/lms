---
id: logic
title: Business Logic
sidebar_label: Logic
sidebar_position: 20
---

# Learning & Personalization - Business Logic

Quy tắc nghiệp vụ lộ trình và cá nhân hóa việc học.

## Dependencies

### Phụ thuộc nội bộ

- ✅ Content Module - Cung cấp nội dung bài học, video, câu hỏi.
- ✅ Analytics Module - Cung cấp Knowledge Map và phân tích dữ liệu.
- ✅ Gamification Module - Xử lý điểm thưởng, huy hiệu.

### Phụ thuộc bên ngoài

- ✅ AI Service (Python) - Mô hình đề xuất lộ trình học tập.

## Validation Criteria

- ✅ Tất cả use cases đã được định nghĩa và review.
- ✅ Logic hoàn thành bài học (BR-LEARN-001, BR-LEARN-002) được test kỹ lưỡng.
- ✅ Luồng tương tác với AI Service được định nghĩa rõ ràng (fallback khi lỗi).
- ✅ Cơ chế anti-cheat được thiết kế.

# Workflows

## Workflow Details

### WF-LEARN-001: Submit Exercise

**Description**: Quy trình xử lý khi student nộp câu trả lời cho bài tập luyện
tập.

#### Flow Diagram

```d2
direction: down

A: Student Selects Answers
B: Submit Request
C: Validate Session? {
  shape: diamond
}
D: Fetch Correct Answers (Server-side)
E: Compare & Calculate Score
F: Score >= PassThreshold? {
  shape: diamond
}
G: Mark Lesson Completed
H: Keep 'In Progress'
I: Publish 'LESSON_COMPLETED' Event
J: Return Result & Hints
K: Gamification: Add EXP
L: Analytics: Update Knowledge Map
M: Return Result with Rewards
N: Client Show Celebration

A -> B
B -> C
C -> D: Valid
D -> E
E -> F
F -> G: Yes
F -> H: No
G -> I
H -> J
I -> K
I -> L
K -> M
M -> N
```

#### Steps

| Step | Description             | Actor   | System Action                   | Exit Condition |
| ---- | ----------------------- | ------- | ------------------------------- | -------------- |
| 1    | Student gửi câu trả lời | Student | Nhận request                    | -              |
| 2    | Xác thực Session        | System  | Kiểm tra session ID & expiry    | Session Valid  |
| 3    | Chấm điểm câu trả lời   | System  | So sánh với đáp án đúng         | -              |
| 4    | Cập nhật tiến độ        | System  | Lưu vào DB, cập nhật stats      | -              |
| 5    | Trigger Events          | System  | Emit completion events (nếu có) | -              |
| 6    | Trả về Response         | System  | Gửi JSON result                 | -              |

#### Business Rules

- **BR-LEARN-004**: Kiểm tra Anti-Cheat trước khi chấm điểm.
- **BR-LEARN-005**: Chỉ trigger rewards nếu đây là lần hoàn thành _đầu tiên_.

### WF-LEARN-002: Adaptive Learning Path Generation

**Description**: Tạo lộ trình học tập thích ứng dựa trên lịch sử.

#### Flow Diagram

```d2
shape: sequence_diagram

Student
API
PathService
Analytics
DB
AI_Model

Student -> API: Get Learning Path
API -> PathService: Request Path for Student
PathService -> Analytics: Get Knowledge Map
PathService -> DB: Get Recent Activity
PathService -> AI_Model: Generate Recommendation
AI_Model -> PathService: List<LessonID> (Ordered)
PathService -> DB: Enrich with Lesson Metadata
PathService -> API: Full Learning Path
API -> Student: Display Personalized Route
```

### WF-LEARN-003: Lesson Progress State

**Description**: Trạng thái của một bài học đối với student.

#### Flow Diagram

```d2
direction: right

LOCKED
AVAILABLE
IN_PROGRESS
COMPLETED
REVIEW

(*) -> LOCKED: Prerequisite not met
LOCKED -> AVAILABLE: Prerequisite met
AVAILABLE -> IN_PROGRESS: Started watching/doing
IN_PROGRESS -> COMPLETED: Criteria met
COMPLETED -> REVIEW: Re-learning
```

## Error Handling

| Error Scenario   | Detection    | Recovery Action                       | Escalation  |
| ---------------- | ------------ | ------------------------------------- | ----------- |
| AI Model Timeout | Timeout > 2s | Trả về Default Path (theo Curriculum) | Log warning |
| DB Write Fail    | Exception    | Trả lỗi cho client, retry client-side | -           |

## Security Requirements

- ✅ Rate limiting theo user
- ✅ Xác thực quyền sở hữu session

## References

- [Overview](/specs)
