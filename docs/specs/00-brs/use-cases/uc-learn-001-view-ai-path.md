---
id: uc-learn-001
title: UC-LEARN-001 Lộ trình AI
sidebar_label: UC-LEARN-001 Lộ trình AI
sidebar_position: 3
---

# UC-LEARN-001: Xem lộ trình học tập AI

| Trường thông tin     | Giá trị                                                                                             |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| Tác nhân             | Học sinh                                                                                            |
| Điều kiện tiên quyết | Đăng nhập với vai trò Học sinh                                                                      |
| Tác nhân kích hoạt   | Người dùng mở bảng điều khiển học tập                                                               |
| Luồng chính          | Tải hồ sơ người dùng → AI phân tích lịch sử học tập → Tạo lộ trình cá nhân hóa → Hiển thị các gợi ý |
| Điều kiện sau        | Lộ trình học tập AI được hiển thị                                                                   |
| Ngoại lệ             | E1: Chưa có lịch sử học tập, E2: Dịch vụ AI không khả dụng                                          |

**Sơ đồ luồng gợi ý lộ trình AI:**

```d2
direction: right

Dashboard -> AI_Service: Load Student Profile
AI_Service -> Analysis: Process History
Analysis -> PathGen: Generate Recommendations
PathGen -> Dashboard: Display AI Path
```
