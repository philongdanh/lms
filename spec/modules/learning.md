# Learning Module Specification

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

---

# Learning - API Endpoints

Các giao diện lập trình cho tiến trình học tập và kiểm tra.

## Endpoints Summary

| Method | Endpoint                | Description             | Auth Required | Rate Limit |
| ------ | ----------------------- | ----------------------- | ------------- | ---------- |
| GET    | `/progress`             | Tiến độ tổng quan       | ✅            | 200/min    |
| GET    | `/lessons/:id/content`  | Nội dung bài học        | ✅            | 200/min    |
| POST   | `/lessons/:id/complete` | Đánh dấu hoàn thành     | ✅            | 100/min    |
| GET    | `/lessons/:id/exercise` | Lấy bài tập             | ✅            | 100/min    |
| POST   | `/exercises/:id/submit` | Nộp câu trả lời         | ✅            | 100/min    |
| GET    | `/recommendations`      | Gợi ý bài học tiếp theo | ✅            | 50/min     |

---

# Learning - Data Model

Cấu trúc dữ liệu theo dõi tiến độ và kết quả học tập.

config: themeVariables: fontFamily: "EB Garamond"

## References

-
-
- ***

# Learning & Personalization - Test Cases

Kịch bản kiểm thử hệ thống học tập và cá nhân hóa.

## Test Categories

### 1. Kiểm thử chức năng

#### Kiểm thử logic nghiệp vụ

| Test ID          | Description                      | Preconditions       | Test Steps               | Expected Result                       | Priority |
| ---------------- | -------------------------------- | ------------------- | ------------------------ | ------------------------------------- | -------- |
| TC-LEARN-FUN-001 | Xác minh logic Personalized Path | User có lịch sử     | 1. Gọi Get Path          | Trả về danh sách phù hợp với điểm yếu | P0       |
| TC-LEARN-FUN-002 | Tính điểm Quiz                   | Session đang active | 1. Submit Correct Answer | Điểm tăng, trả về is_correct=true     | P0       |

#### Kiểm thử API

| Test ID          | Endpoint           | Method | Test Data        | Expected Result | Status Code |
| ---------------- | ------------------ | ------ | ---------------- | --------------- | ----------- |
| TC-LEARN-API-001 | `/path`            | GET    | Token hợp lệ     | JSON với path   | 200         |
| TC-LEARN-API-002 | `/practice/submit` | POST   | Câu trả lời đúng | JSON result     | 200         |
| TC-LEARN-API-003 | `/practice/submit` | POST   | Session hết hạn  | Error JSON      | 400         |

### 2. Kiểm thử tích hợp

| Test ID          | Description                    | Components          | Test Scenario                           | Expected Result                     |
| ---------------- | ------------------------------ | ------------------- | --------------------------------------- | ----------------------------------- |
| TC-LEARN-INT-001 | Tiến độ cập nhật Knowledge Map | Learning, Analytics | Submit Answer -> Kiểm tra Knowledge Map | Knowledge Map mastery được cập nhật |

### 3. Kiểm thử hiệu năng

| Test ID           | Scenario                | Load Profile | Tiêu chí thành công |
| ----------------- | ----------------------- | ------------ | ------------------- |
| TC-LEARN-PERF-001 | Submit Answer High Load | 2000 RPS     | P95 < 200ms         |

### 4. Kiểm thử bảo mật

| Test ID          | Security Aspect  | Test Method            | Expected Result |
| ---------------- | ---------------- | ---------------------- | --------------- |
| TC-LEARN-SEC-001 | IDOR on Progress | Get path của user khác | 403 Forbidden   |

## Test Automation

### Framework

- **API Tests**: Jest / Supertest
- **Performance Tests**: k6

## Validation Checklist

- ✅ Test coverage matrix hoàn chỉnh
- ✅ Security tests được bao gồm

## Scalability Requirements

### Mở rộng theo chiều dọc

- **CPU**: Tối ưu cho single-core logic (Node.js) nhưng tính toán nặng trên AI
  Service.
- **Memory**: Sử dụng cache nhiều (Redis).

### Mở rộng theo chiều ngang

- **Learning Service**: Stateless, scale auto (min 2, max 20).
- **AI Service**: Scale consumer workers dựa trên queue lag.

## Load Testing Scenarios

### Scenario 1: Mass Examination

**Description**: 20,000 students nộp bài thi đồng thời trong 15 phút. **Test
Parameters**:

- Duration: 15 phút
- Ramp-up: 5000 users/phút
- Peak: 20000 concurrent users

**Tiêu chí thành công**:

- ✅ P95 response time < 300ms
- ✅ Error rate < 0.1%
- ✅ Không mất dữ liệu (progress saves)

## Validation Checklist

- ✅ Tất cả performance targets được định lượng
- ✅ Các load testing scenarios được tạo cho Peak Load

---
