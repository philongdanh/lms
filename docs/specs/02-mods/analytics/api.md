
# Analytics - API Endpoints
 
Các giao diện lập trình cho hệ thống báo cáo và thống kê.


## Endpoints Summary

| Method | Endpoint                | Description                | Auth Required | Rate Limit |
| ------ | ----------------------- | -------------------------- | ------------- | ---------- |
| GET    | `/progress/overview`    | Tổng quan tiến độ          | ✅            | 100/min    |
| GET    | `/progress/subject/:id` | Tiến độ theo môn học       | ✅            | 100/min    |
| GET    | `/knowledge-map`        | Bản đồ kiến thức           | ✅            | 50/min     |
| GET    | `/daily-stats`          | Thống kê học tập hàng ngày | ✅            | 100/min    |
| GET    | `/reports/class/:id`    | Báo cáo lớp học            | ✅ Teacher    | 50/min     |

