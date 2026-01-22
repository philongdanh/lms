---
id: uc-comp-001
title: UC-COMP-001 Tham gia giải đấu
sidebar_label: UC-COMP-001 Tham gia giải đấu
sidebar_position: 6
---

# UC-COMP-001: Tham gia giải đấu

| Trường thông tin     | Giá trị                                                                        |
| -------------------- | ------------------------------------------------------------------------------ |
| Tác nhân             | Học sinh                                                                       |
| Điều kiện tiên quyết | Đã đăng nhập, giải đấu đang khả dụng                                           |
| Tác nhân kích hoạt   | Người dùng nhấn "Tham gia giải đấu"                                            |
| Luồng chính          | Chọn giải đấu → Xác thực điều kiện tham gia → Xác nhận đăng ký → Vào phòng chờ |
| Điều kiện sau        | Người dùng đã đăng ký tham gia giải đấu                                        |
| Ngoại lệ             | E1: Không đủ điều kiện, E2: Giải đấu đã đầy                                    |

**Sơ đồ luồng tham gia thi đấu:**

```d2
direction: right

Dashboard -> Tournament: View Competitions
Tournament -> Register: Click Register
Register -> Waiting: Join Room
Waiting -> Battle: Game Starts
Battle -> Result: Finish
Result -> Leaderboard: See Ranking
```
