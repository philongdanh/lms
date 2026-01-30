---
id: plan
title: Plan
sidebar_label: Plan
sidebar_position: 4
---

# Plan

Kế hoạch triển khai chi tiết theo Sprint

---

## Point System

| Points   | Description                 |
| :------- | :-------------------------- |
| **8-13** | **P0**: Nghiêm trọng        |
| **5-8**  | **P1**: Cao - Phải có       |
| **3-5**  | **P2**: Trung bình - Nên có |
| **1-3**  | **P3**: Thấp - Có thì tốt   |

---

## Sprint 2: Auth & Users

> **Focus**: Foundation of Identity, Security, and Sessions

| ID       | User Story                                    | Points | Acceptance Criteria                                                                                                   |
| :------- | :-------------------------------------------- | :----- | :-------------------------------------------------------------------------------------------------------------------- |
| `US-001` | **Đăng ký**: Tạo tài khoản mới bằng Email     | 8      | - Input: Email, Pass, Confirm<br/>- Validate format. Gửi OTP email<br/>- **Constraint**: Email only (no Social/Phone) |
| `US-002` | **Xác thực OTP**: Verify danh tính            | 8      | - Input 6 số. Timer 60s<br/>- Check Redis/DB<br/>- Lock sau 3 lần sai                                                 |
| `US-003` | **Đăng nhập**: Email/Pass vào dashboard       | 8      | - Trả về JWT Access & Refresh Token<br/>- Handle: Lock account, Wrong pass                                            |
| `US-004` | **Quên mật khẩu**: Reset qua email            | 5      | - Input Email -> Link/OTP<br/>- Verify token -> Đổi pass<br/>- Hủy session cũ                                         |
| `US-005` | **Đăng xuất**: Thoát an toàn                  | 5      | - Revoke Refresh Token (DB)<br/>- Clear Cookies/Local<br/>- Redirect Public                                           |
| `US-006` | **Session**: Admin quản lý user session       | 8      | - List active sessions (Redis)<br/>- Rotate Refresh Token<br/>- Max 3 devices                                         |
| `US-007` | **Protected Routes**: Chặn truy cập chưa auth | 8      | - Middleware check JWT<br/>- Redirect Login nếu invalid<br/>- Check Role (Admin/Student)                              |

## Sprint 3: Learning Core

> **Focus**: Core LMS features - Subjects, Lessons, Quizzes

| ID       | User Story                             | Points | Acceptance Criteria                                                                         |
| :------- | :------------------------------------- | :----- | :------------------------------------------------------------------------------------------ |
| `US-008` | **Danh sách môn**: Xem môn học         | 5      | - List: Toán, TV, TA<br/>- Filter: Khối, Cấp độ<br/>- Skeleton loading                      |
| `US-009` | **Lộ trình**: Xem cây bài học          | 8      | - View: Tree / Timeline<br/>- State: Locked, Unlocked, Completed<br/>- Prevent click locked |
| `US-010` | **Bài học**: Xem nội dung (Text/Video) | 8      | - Content: Rich Text, Image, Video Embed<br/>- Nav: Next/Prev<br/>- Load &lt;3s             |
| `US-011` | **Quiz**: Trắc nghiệm                  | 8      | - UI: Câu hỏi + 4 đáp án<br/>- Client validation (luyện tập)<br/>- Submit -> Score          |
| `US-012` | **Tiến độ**: Ghi nhận kết quả          | 8      | - Save "Last Watched"<br/>- Mark Done (if condition met)<br/>- Update % môn học             |

## Sprint 4: Polish & Gamification

> **Focus**: Scoring system, Leveling, and Polish for MVP Release

| ID       | User Story                      | Points | Acceptance Criteria                                                                    |
| :------- | :------------------------------ | :----- | :------------------------------------------------------------------------------------- |
| `US-013` | **Tính điểm**: Thưởng hoạt động | 5      | - Formula: Base + Bonus (speed/streak)<br/>- Save history<br/>- Rate limit submissions |
| `US-014` | **Level Up**: Lên cấp theo XP   | 5      | - Calc XP -> Level items<br/>- Effect/Noti level up                                    |

## Sprint 5-6: Tournament

> **Focus**: Realtime features, WebSockets, Leaderboards (Post-MVP Expansion)

| ID       | User Story                              | Points | Acceptance Criteria                                                                       |
| :------- | :-------------------------------------- | :----- | :---------------------------------------------------------------------------------------- |
| `US-015` | **Danh sách giải**: Live/Upcoming/Ended | 5      | - Tabs: Đang, Sắp, Đã diễn ra<br/>- Info: Time, Prize, Users count                        |
| `US-016` | **Chi tiết giải**: Luật & Thưởng        | 5      | - Desc, Rules<br/>- Preview Leaderboard                                                   |
| `US-017` | **Đăng ký**: Join giải đấu              | 5      | - Check: Min Level, Ticket<br/>- Deduct fee. Add user<br/>- Limit slots                   |
| `US-018` | **Gameplay**: Thi đấu realtime          | 13     | - WS sync questions<br/>- Timer 10s. Instant Feedback<br/>- Low latency, handle reconnect |
| `US-019` | **Rank Realtime**: BXH trực tiếp        | 8      | - Redis ZSET<br/>- Broadcast Top 10 + User Rank<br/>- Scale 10k CCU                       |
| `US-020` | **Kết quả**: Chốt giải                  | 8      | - Finalize Rank<br/>- Save History DB<br/>- Async Reward Job                              |

## Sprint 7: Advanced Features

> **Focus**: Advanced retention features and Parent tools

| ID       | User Story                        | Points | Acceptance Criteria                                                           |
| :------- | :-------------------------------- | :----- | :---------------------------------------------------------------------------- |
| `US-021` | **Video Player**: Streaming       | 5      | - Cloud Stream Player<br/>- Play, Pause, Seek, Vol<br/>- Save timestamp       |
| `US-022` | **Streak**: Chuỗi học tập         | 5      | - Count consecutive days<br/>- Dashboard counter<br/>- Break warning          |
| `US-023` | **Hồ sơ**: Edit Profile           | 5      | - Upload Avatar, Edit Name<br/>- View Stats: Join Date, XP, Rank              |
| `US-024` | **Huy hiệu**: Badges              | 5      | - Criteria (7-day streak, 100pts)<br/>- Profile Tab<br/>- Unlock Popup        |
| `US-025` | **Liên kết con**: Parent Link     | 5      | - Kid: Gen Invite Code<br/>- Parent: Input Code -> Request<br/>- 2-way Verify |
| `US-026` | **Báo cáo con**: Parent Dashboard | 5      | - Kid Activity view<br/>- Charts: Time, XP<br/>- Inactivity Alert             |

---

## Backlog (Future)

| ID       | User Story                       | Points | Acceptance Criteria                                                     |
| :------- | :------------------------------- | :----- | :---------------------------------------------------------------------- |
| `US-027` | **Đăng ký SĐT**: Mobile phone    | 3      | - Input Phone (VN). OTP SMS<br/>- Create Account                        |
| `US-028` | **Dark Mode**: Theme toggle      | 3      | - Switch Light/Dark<br/>- Save Pref (Local/DB)<br/>- Adaptive UI        |
| `US-029` | **Offline Mode**: Học không mạng | 3      | - Download Lesson/Quiz<br/>- Cache IndexedDB<br/>- Sync online          |
| `US-030` | **Push Notify**: Browser Noti    | 3      | - Request Perm<br/>- Types: Tourney, Reminder<br/>- Toggle settings     |
| `US-031` | **Social Login**: Google         | 3      | - Google OAuth Button<br/>- Auto-register/Link email                    |
| `US-032` | **Shop**: Đổi vật phẩm           | 3      | - List Items + Price<br/>- Buy: Deduct Coin, Add Inv<br/>- Inventory UI |
