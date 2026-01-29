---
id: backlog
title: Backlog
sidebar_label: Backlog
sidebar_position: 3
---

# Backlog

Kho dự trữ yêu cầu sản phẩm (Product Backlog) và thứ tự ưu tiên triển khai để
tối ưu hóa giá trị.

---

## Priority Legend

| Độ ưu tiên | Mô tả                             | Điểm     |
| ---------- | --------------------------------- | -------- |
| P0         | Nghiêm trọng - Chặn (Blocker)     | 8-13 pts |
| P1         | Cao - Phải có (Must have)         | 5-8 pts  |
| P2         | Trung bình - Nên có (Should have) | 3-5 pts  |
| P3         | Thấp - Có thì tốt (Nice to have)  | 1-3 pts  |

---

## Backlog Summary

| Độ ưu tiên     | Số lượng | Điểm | % Tổng |
| -------------- | -------- | ---- | ------ |
| P0             | 24       | 120  | 48%    |
| P1             | 18       | 85   | 34%    |
| P2             | 12       | 45   | 18%    |
| **Tổng (MVP)** | 54       | 250  | 100%   |

---

## Must Have (MVP)

> **Note**: Các item dưới đây đã được chi tiết hóa thành User Story để sẵn sàng
> cho Sprint Planning.

### Xác thực (Authentication)

#### LMS-001: Register with Email

- **Sprint**: S2 | **Points**: 5 | **Priority**: P0
- **Story**: As a **New User**, I want to **register using my email**, so that I
  can **create an account to access the LMS**.
- **Acceptance Criteria**:
  - [ ] User can enter Email, Password, and Confirm Password.
  - [ ] System validates email format and password strength (min 8 chars, 1
        special char).
  - [ ] System checks if email is already registered; returns friendly error if
        duplicate.
  - [ ] Verify successful creation in Database (PostgreSQL).

#### LMS-002: Register with Phone

- **Sprint**: S2 | **Points**: 5 | **Priority**: P0
- **Story**: As a **New User**, I want to **register using my phone number**, so
  that I can **create an account easily on mobile**.
- **Acceptance Criteria**:
  - [ ] User can enter Phone Number.
  - [ ] System validates phone number format (VN).
  - [ ] System triggers OTP generation (mock or real).
  - [ ] Account created only after OTP verification.

#### LMS-003: Verify OTP

- **Sprint**: S2 | **Points**: 5 | **Priority**: P0
- **Story**: As a **User**, I want to **verify the OTP sent to my device**, so
  that I can **confirm my identity**.
- **Acceptance Criteria**:
  - [ ] Input field accepts 6-digit code.
  - [ ] Countdown timer (e.g., 60s) for resend.
  - [ ] Verify logic checks against Redis/DB.
  - [ ] Fail after 3 incorrect attempts.

#### LMS-004: Login Flow

- **Sprint**: S4 | **Points**: 5 | **Priority**: P0
- **Story**: As a **Registered User**, I want to **log in**, so that I can
  **access my personalized dashboard**.
- **Acceptance Criteria**:
  - [ ] Support both Email and Phone login.
  - [ ] Return JWT Access Token and Refresh Token upon success.
  - [ ] Handle "Account Locked" or "Wrong Password" cases securely.

#### LMS-005: Forgot Password

- **Sprint**: S5 | **Points**: 3 | **Priority**: P1
- **Story**: As a **User**, I want to **reset my password**, so that I can
  **regain access if I forget it**.
- **Acceptance Criteria**:
  - [ ] Input email/phone to receive reset link/OTP.
  - [ ] Verify secure token before allowing password change.
  - [ ] Invalidate old sessions after reset.

#### LMS-006: Logout

- **Sprint**: S4 | **Points**: 2 | **Priority**: P1
- **Story**: As a **User**, I want to **log out**, so that I can **secure my
  account on shared devices**.
- **Acceptance Criteria**:
  - [ ] Revoke Refresh Token in database/Redis.
  - [ ] Clear client-side cookies/storage.
  - [ ] Redirect to Public Homepage.

#### LMS-007: Session Management

- **Sprint**: S4 | **Points**: 8 | **Priority**: P0
- **Story**: As a **System Admin**, I want to **manage user sessions**, so that
  I can **ensure security and implement multi-device limits**.
- **Acceptance Criteria**:
  - [ ] Store active sessions in Redis.
  - [ ] Refresh Token rotation implementation.
  - [ ] Blacklist support for revoked tokens.

#### LMS-008: Protected Routes

- **Sprint**: S4 | **Points**: 5 | **Priority**: P0
- **Story**: As a **Developer**, I want to **secure frontend routes**, so that
  **unauthorized users cannot access restricted pages**.
- **Acceptance Criteria**:
  - [ ] Middleware checks for valid JWT.
  - [ ] Redirect to Login if token missing or expired.
  - [ ] Role-based access control (e.g., Admin vs Student).

### LearningModule

#### LMS-010: List Subjects

- **Sprint**: S2 | **Points**: 3 | **Priority**: P1
- **Story**: As a **Student**, I want to **view a list of subjects**, so that I
  can **choose what to study**.
- **Acceptance Criteria**:
  - [ ] Display list of subjects with icons/images.
  - [ ] Filter by Grade/Level.
  - [ ] Skeleton loading state while fetching.

#### LMS-011: View Learning Path

- **Sprint**: S4 | **Points**: 5 | **Priority**: P0
- **Story**: As a **Student**, I want to **see the lesson tree (roadmap)**, so
  that I can **track my progression**.
- **Acceptance Criteria**:
  - [ ] Tree view or timeline visualization of lessons.
  - [ ] Indicate status: Locked, Unlocked, Completed.
  - [ ] Prevent clicking on Locked lessons.

#### LMS-012: View Lesson Content

- **Sprint**: S4 | **Points**: 5 | **Priority**: P0
- **Story**: As a **Student**, I want to **view lesson materials**, so that I
  can **learn the topic**.
- **Acceptance Criteria**:
  - [ ] Support Rich Text, Images, and basic Video embed.
  - [ ] "Next/Previous" navigation between lessons.

#### LMS-013: Quiz/Exercises

- **Sprint**: S4 | **Points**: 8 | **Priority**: P0
- **Story**: As a **Student**, I want to **do multiple-choice quizzes**, so that
  I can **test my knowledge**.
- **Acceptance Criteria**:
  - [ ] Display question and 4 options.
  - [ ] Client-side validation for immediate feedback (if practice mode).
  - [ ] Submit answer to backend API.
  - [ ] Show score summary after completion.

#### LMS-014: Track Progress

- **Sprint**: S4 | **Points**: 5 | **Priority**: P0
- **Story**: As a **System**, I want to **record user progress**, so that
  **features like resuming and scoring work**.
- **Acceptance Criteria**:
  - [ ] Save "Last Watched" position.
  - [ ] Mark lesson as "Completed" when conditions met (e.g., passed quiz).
  - [ ] Update overall Subject progress %.

#### LMS-015: Scoring System

- **Sprint**: S5 | **Points**: 5 | **Priority**: P1
- **Story**: As a **System**, I want to **calculate scores**, so that I can
  **reward students**.
- **Acceptance Criteria**:
  - [ ] Define formula: Base score + Bonus (speed/streak).
  - [ ] Save attempt history.
  - [ ] Prevent cheating (rate limit submissions).

#### LMS-016: Level Up System

- **Sprint**: S5 | **Points**: 5 | **Priority**: P2
- **Story**: As a **Student**, I want to **level up based on XP**, so that I
  feel **a sense of progression**.
- **Acceptance Criteria**:
  - [ ] XP Calculation logic based on scores/activities.
  - [ ] Level thresholds (e.g., Lvl 1: 0-100xp).
  - [ ] Notification/Animation on Level Up.

### Tournament

#### LMS-020: Tournament List

- **Sprint**: S5 | **Points**: 5 | **Priority**: P1
- **Story**: As a **Student**, I want to **see available tournaments**, so that
  I can **join a competition**.
- **Acceptance Criteria**:
  - [ ] List Active, Upcoming, and Past tournaments.
  - [ ] Display metadata: Start time, Prize pool, Participants count.

#### LMS-021: Tournament Details

- **Sprint**: S5 | **Points**: 5 | **Priority**: P1
- **Story**: As a **Student**, I want to **view tournament rules and prizes**,
  so that I can **decide whether to participate**.
- **Acceptance Criteria**:
  - [ ] Show full description and rules.
  - [ ] Show leaderboard preview if active.

#### LMS-022: Registration Flow

- **Sprint**: S5 | **Points**: 3 | **Priority**: P1
- **Story**: As a **Student**, I want to **register for a tournament**, so that
  I can **participate**.
- **Acceptance Criteria**:
  - [ ] Check eligibility (e.g., min Level, Ticket balance).
  - [ ] Deduct ticket/fee if applicable.
  - [ ] Add user to participant list.

#### LMS-023: Match Gameplay

- **Sprint**: S6 | **Points**: 13 | **Priority**: P0
- **Story**: As a **Participant**, I want to **answer questions in real-time**,
  so that I can **compete against others**.
- **Acceptance Criteria**:
  - [ ] WebSocket connection for question syncing.
  - [ ] Submit answer within time limit (e.g., 10s).
  - [ ] Real-time feedback (Correct/Wrong) after timer ends.
  - [ ] Handle disconnection/reconnection.

#### LMS-024: Real-time Leaderboard

- **Sprint**: S6 | **Points**: 8 | **Priority**: P0
- **Story**: As a **Participant**, I want to **see my rank update live**, so
  that I know **my standing**.
- **Acceptance Criteria**:
  - [ ] Redis Sorted Set (ZSET) for ranking.
  - [ ] Broadcast top 10 and user's rank after every question.
  - [ ] Optimized for high concurrency.

#### LMS-025: Results & Calculation

- **Sprint**: S6 | **Points**: 5 | **Priority**: P0
- **Story**: As a **System**, I want to **finalize results after tournament
  ends**, so that **prizes can be distributed**.
- **Acceptance Criteria**:
  - [ ] Finalize rankings.
  - [ ] Record match history.
  - [ ] Trigger reward distribution (async job).

---

## Should Have (Future Sprints)

#### LMS-030: Video Lessons

- **Sprint**: S7 | **Points**: 8 | **Priority**: P2
- **Story**: As a **Student**, I want to **watch video lessons**, so that I can
  **understand complex topics better**.
- **Acceptance Criteria**:
  - [ ] Video player integration (e.g., streaming from cloud storage or YouTube
        embed).
  - [ ] Play, Pause, Seek controls.
  - [ ] Save "Last Watched" timestamp.

#### LMS-031: Learning Streak

- **Sprint**: S7 | **Points**: 5 | **Priority**: P2
- **Story**: As a **Student**, I want to **maintain a daily streak**, so that I
  am **motivated to study every day**.
- **Acceptance Criteria**:
  - [ ] Track consecutive days with at least one completed activity.
  - [ ] Display streak counter on dashboard.
  - [ ] Notification/Alert when streak is about to be broken.

#### LMS-040: User Profile

- **Sprint**: S8 | **Points**: 5 | **Priority**: P2
- **Story**: As a **User**, I want to **edit my profile**, so that I can
  **personalize my account**.
- **Acceptance Criteria**:
  - [ ] Change Avatar (upload image).
  - [ ] Update Display Name.
  - [ ] View account stats (Join date, total XP).

#### LMS-041: Badges & Achievements

- **Sprint**: S8 | **Points**: 8 | **Priority**: P2
- **Story**: As a **Student**, I want to **earn badges**, so that I can
  **showcase my accomplishments**.
- **Acceptance Criteria**:
  - [ ] System awards badges based on criteria (e.g., "First 100% Score", "7 Day
        Streak").
  - [ ] "Achievements" tab in Profile to view collected badges.
  - [ ] Badge popup notification upon unlocking.

#### LMS-050: Link Child Account

- **Sprint**: S8 | **Points**: 5 | **Priority**: P2
- **Story**: As a **Parent**, I want to **link my child's account**, so that I
  can **monitor their learning**.
- **Acceptance Criteria**:
  - [ ] Generate invitation code from Child account.
  - [ ] Parent enters code to link.
  - [ ] Verification method to prevent unauthorized linking.

#### LMS-051: View Child Progress

- **Sprint**: S8 | **Points**: 5 | **Priority**: P2
- **Story**: As a **Parent**, I want to **see my child's reports**, so that I
  can **know if they are studying well**.
- **Acceptance Criteria**:
  - [ ] Dashboard showing child's recent activities.
  - [ ] Weekly summary chart (Time spent, XP earned).
  - [ ] Alert parent if child hasn't studied for X days.

---

## Could Have (Backlog)

#### LMS-060: Dark Mode

- **Sprint**: Backlog | **Points**: 3 | **Priority**: P3
- **Story**: As a **User**, I want to **switch to dark mode**, so that I can
  **reduce eye strain at night**.
- **Acceptance Criteria**:
  - [ ] Toggle switch in Settings / Navbar.
  - [ ] Persist preference in LocalStorage or User Settings DB.
  - [ ] All UI components support dark theme colors.

#### LMS-061: Offline Mode

- **Sprint**: Backlog | **Points**: 13 | **Priority**: P3
- **Story**: As a **Student**, I want to **download lessons**, so that I can
  **study without internet**.
- **Acceptance Criteria**:
  - [ ] "Download" button for lessons/quizzes.
  - [ ] Local caching mechanism (e.g., IndexedDB / PWA Service Worker).
  - [ ] Sync progress when back online.

#### LMS-062: Push Notifications

- **Sprint**: Backlog | **Points**: 5 | **Priority**: P3
- **Story**: As a **User**, I want to **receive notifications**, so that I
  **don't miss important updates**.
- **Acceptance Criteria**:
  - [ ] Browser Push Notification permission request.
  - [ ] Send notifications for: New Tournament, Daily Reminder, Friend Activity.
  - [ ] Settings to toggle specific notification types.

#### LMS-063: Social Login (Google)

- **Sprint**: Backlog | **Points**: 5 | **Priority**: P3
- **Story**: As a **User**, I want to **login with Google**, so that I **don't
  have to remember another password**.
- **Acceptance Criteria**:
  - [ ] "Continue with Google" button on Login/Register page.
  - [ ] Check if email exists; if not, auto-register.
  - [ ] Link Google account to existing email-based account.

#### LMS-065: Rewards Shop

- **Sprint**: Backlog | **Points**: 8 | **Priority**: P3
- **Story**: As a **Student**, I want to **spend my coins**, so that I can **buy
  avatar frames or themes**.
- **Acceptance Criteria**:
  - [ ] Shop interface listing items and costs.
  - [ ] "Buy" transaction logic (deduct balance, add item to inventory).
  - [ ] "My Inventory" to view and equip items.
