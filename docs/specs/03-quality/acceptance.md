---
id: acceptance
title: Acceptance Criteria
sidebar_label: Acceptance
sidebar_position: 2
---

# Acceptance Criteria

Acceptance criteria following Given-When-Then format.

---

## Overview

This document defines clear, testable acceptance criteria for LMS features.

---

## Acceptance Criteria Format

| Component | Description                          |
| --------- | ------------------------------------ |
| ID        | `AC-{MODULE}-{NUMBER}`               |
| Title     | Brief description                    |
| Priority  | High / Medium / Low                  |
| Status    | Draft / Approved / Testing / Passed  |
| Given     | Precondition - system state before   |
| When      | Action - user action or trigger      |
| Then      | Expected result - observable outcome |

---

## Status Legend

| Status      | Description           |
| ----------- | --------------------- |
| Draft       | Being defined         |
| ✅ Approved | Reviewed and accepted |
| Testing     | Under test            |
| ️ Passed     | Verified              |

---

## Authentication

### AC-AUTH-001: Register with email

**Priority:** High  
**Status:** ✅ Approved

**Given:** User is on the registration page

**When:** User enters:

- Valid email
- Password ≥ 8 characters (uppercase, lowercase, number)
- Password confirmation matches
- Selects role (student/parent)

**Then:**

- Account is created
- Verification email is sent
- Display message "Please check your email"
- Redirect to email verification page

### AC-AUTH-002: Register with phone number

**Priority:** High  
**Status:** ✅ Approved

**Given:** User is on the registration page

**When:** User enters:

- Valid Vietnamese phone number (10-11 digits)
- Password ≥ 8 characters
- Password confirmation matches

**Then:**

- 6-digit OTP is sent to phone number
- OTP input form is displayed
- OTP expires after 5 minutes

### AC-AUTH-003: OTP Verification

**Priority:** High  
**Status:** ✅ Approved

**Given:** User has received OTP

**When:** User enters correct OTP within 5 minutes

**Then:**

- Account is activated
- Automatic login
- Redirect to onboarding page

### AC-AUTH-004: Login Success

**Priority:** High  
**Status:** ✅ Approved

**Given:** User has a verified account

**When:** User enters correct email/phone and password

**Then:**

- JWT token is issued
- Refresh token is stored in httpOnly cookie
- Redirect to role-appropriate dashboard
- Display "Welcome \{name\}"

### AC-AUTH-005: Login Failure Lockout

**Priority:** High  
**Status:** ✅ Approved

**Given:** User is on the login page

**When:** User enters wrong password 5 times consecutively

**Then:**

- Account is locked for 15 minutes
- Display "Account temporarily locked. Please try again in 15 minutes"
- Notification email is sent

### AC-AUTH-006: Password Reset

**Priority:** Medium  
**Status:** ✅ Approved

**Given:** User forgot password

**When:** User enters registered email

**Then:**

- Password reset link is sent
- Link expires after 1 hour
- Display "Password reset link has been sent"

### AC-AUTH-007: Logout

**Priority:** High  
**Status:** ✅ Approved

**Given:** User is logged in

**When:** User clicks "Logout"

**Then:**

- Tokens are cleared
- Session is invalidated
- Redirect to home page
- Display "Successfully logged out"

---

## Learning

### AC-LEARN-001: Select Subject

**Priority:** High  
**Status:** ✅ Approved

**Given:** User is logged in and on the Learning page

**When:** User selects a subject (Math/Vietnamese/English)

**Then:**

- Display list of topics for that subject
- Topics are sorted by learning path order
- Display progress for each topic
- Completed topics are marked with

### AC-LEARN-002: View Lesson

**Priority:** High  
**Status:** ✅ Approved

**Given:** User has selected a topic

**When:** User selects a lesson

**Then:**

- Lesson content is displayed
- Video (if available) auto-loads
- Estimated duration is shown
- "Next" button is enabled after completion

### AC-LEARN-003: Complete Lesson

**Priority:** High  
**Status:** ✅ Approved

**Given:** User is viewing a lesson

**When:** User:

- Finishes all content (or video)
- Clicks "Complete"

**Then:**

- Progress is updated
- Points are awarded (10 points)
- Celebration animation is displayed
- Next lesson is unlocked
- Exercises become available (if any)

### AC-LEARN-004: Quiz Exercise

**Priority:** High  
**Status:** ✅ Approved

**Given:** User has completed the lesson

**When:** User chooses to do exercises

**Then:**

- Questions are displayed sequentially
- Timer countdown (if time-limited)
- Can review answers before submit
- Auto-submit when time expires

### AC-LEARN-005: View Exercise Results

**Priority:** High  
**Status:** ✅ Approved

**Given:** User has submitted exercises

**When:** System finishes grading

**Then:**

- Display score (e.g., 8/10)
- Display correct/incorrect for each question
- Show correct answer explanations
- Award points based on results
- Allow retry (maximum 3 times)

---

## Tournament

### AC-TOUR-001: View Tournament List

**Priority:** High  
**Status:** ✅ Approved

**Given:** User is logged in

**When:** User navigates to Tournaments page

**Then:**

- Display 3 tabs: Active / Upcoming / Completed
- Each tournament shows:
  - Name and description
  - Subject & grade
  - Start time
  - Number of participants
  - Prizes
- Filter by subject and grade

### AC-TOUR-002: Join Tournament

**Priority:** High  
**Status:** ✅ Approved

**Given:** User views tournament details (not yet started)

**When:** User clicks "Join"

**Then:**

- Registration confirmed
- Display countdown to start
- Add tournament to "My Tournaments"
- Send reminder notification 30 minutes before

### AC-TOUR-003: Enter Tournament

**Priority:** High  
**Status:** ✅ Approved

**Given:** Tournament has started and user is registered

**When:** User clicks "Enter Competition"

**Then:**

- Display countdown screen (3, 2, 1)
- Load first question
- Start timer
- Disable non-competition interactions

### AC-TOUR-004: Answer Questions

**Priority:** High  
**Status:** ✅ Approved

**Given:** User is in a competition session

**When:** User selects answer and submits

**Then:**

- Answer is recorded
- Display correct/incorrect immediately
- Update score in real-time
- Move to next question after 2 seconds
- Auto-advance if question time expires

### AC-TOUR-005: Real-time Leaderboard

**Priority:** High  
**Status:** ✅ Approved

**Given:** Tournament is in progress

**When:** User clicks "View Leaderboard"

**Then:**

- Display top 10 players
- Update in real-time (WebSocket)
- Highlight user's position
- Show: Rank, Avatar + Name, Score, Completion time

### AC-TOUR-006: Competition End

**Priority:** High  
**Status:** ✅ Approved

**Given:** User finishes all questions or time expires

**When:** Competition session ends

**Then:**

- Display personal results:
  - Total score
  - Correct/incorrect count
  - Completion time
- Show temporary ranking
- Share results button

---

## References

- [Test Cases](./test-cases.md)
- [Test Strategy](./test-strategy.md)
