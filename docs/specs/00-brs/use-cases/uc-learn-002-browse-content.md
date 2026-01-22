---
id: uc-learn-002
title: UC-LEARN-002 Duyệt nội dung
sidebar_label: UC-LEARN-002 Duyệt nội dung
sidebar_position: 4
---

# UC-LEARN-002: Duyệt nội dung học tập

| Trường thông tin     | Giá trị                                                                        |
| -------------------- | ------------------------------------------------------------------------------ |
| Tác nhân             | Học sinh                                                                       |
| Điều kiện tiên quyết | Đã đăng nhập                                                                   |
| Tác nhân kích hoạt   | Người dùng chọn "Duyệt nội dung"                                               |
| Luồng chính          | Chọn Môn → Chọn Khối lớp → Chọn Chủ đề → Chọn Bài học → Hiển thị nội dung      |
| Điều kiện sau        | Nội dung bài học được hiển thị                                                 |
| Ngoại lệ             | E1: Không có nội dung cho bộ lọc đã chọn                                       |

**Sơ đồ luồng duyệt nội dung:**

```d2
direction: right

Dashboard -> Browse: View Content
Browse -> Subject: Select Subject
Subject -> Grade: Select Grade
Grade -> Topic: Select Topic
Topic -> Lesson: Start Lesson
Lesson -> Complete: Finish
Complete -> Dashboard: Progress Updated
```
