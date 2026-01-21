
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

