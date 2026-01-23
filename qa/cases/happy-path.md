---
id: happy-path
title: Happy Path
sidebar_label: Happy Path
sidebar_position: 1
---

# Happy Path

Kịch bản kiểm thử thành công theo module.

---

## Auth Module

### TC-INT-AUTH-001: Register with valid email

> **Validates**: [FR-AUTH-01](../../spec/modules/auth.md#acceptance-criteria)

```gherkin
Feature: User Registration

  Scenario: Register with valid email
    Given a new user with email "test@example.com"
    And password is "Password123"
    And tenant code is "SCHOOL001"
    When the user submits registration form
    Then user account should be created
    And verification email should be sent
    And response status should be 201
```

### TC-INT-AUTH-003: Login with valid credentials

> **Validates**: [FR-AUTH-02](../../spec/modules/auth.md#acceptance-criteria)

```gherkin
Feature: User Login

  Scenario: Login with valid credentials
    Given a registered user with email "test@example.com"
    And account is verified
    When the user logs in with correct password
    Then JWT access token should be returned
    And refresh token should be returned
    And response status should be 200
```

### TC-E2E-AUTH-001: Full register + login flow

```gherkin
Feature: Complete Auth Flow

  Scenario: Full registration and login flow
    Given the user visits registration page
    When the user fills valid registration form
    And clicks submit button
    Then redirect to email verification page
    When the user clicks verification link
    Then redirect to login page
    When the user logs in with registered credentials
    Then redirect to onboarding dashboard
```

### TC-INT-AUTH-004: Multi-device session

> **Validates**: [FR-AUTH-03](../../spec/modules/auth.md#acceptance-criteria)

```gherkin
Feature: Multi-Device Session

  Scenario: User logs in from multiple devices
    Given a user is logged in on device A
    When the user logs in on device B
    Then both sessions should remain active
    And user should see 2 active sessions in session list
    And each device should have separate refresh token
```

### TC-INT-AUTH-005: Logout invalidate token

> **Validates**: [FR-AUTH-04](../../spec/modules/auth.md#acceptance-criteria)

```gherkin
Feature: Token Invalidation on Logout

  Scenario: Logout revokes refresh token
    Given a user is logged in with valid session
    When the user calls POST /logout
    Then refresh token should be revoked in database
    And subsequent requests with that token should return 401
    And user should be redirected to login page
```

---

## Learning Module

### TC-INT-LEARN-000: AI learning path generation

> **Validates**:
> [FR-LEARN-01](../../spec/modules/learning.md#acceptance-criteria)

```gherkin
Feature: AI Learning Path

  Scenario: Generate personalized learning path
    Given a student has completed 5 lessons
    And has weakness in "algebra" based on quiz history
    When the student requests learning recommendations
    Then AI should generate personalized path
    And path should prioritize algebra-related lessons
    And response should return within 2 seconds
```

### TC-INT-LEARN-001: Get subjects list

```gherkin
Feature: Subject Listing

  Scenario: Get subjects list for tenant
    Given the user is authenticated
    And belongs to tenant "SCHOOL001"
    When the user requests GET /subjects
    Then response should contain array of subjects
    And each subject should have id, name, grade fields
    And response status should be 200
```

### TC-E2E-LEARN-001: Complete a lesson

> **Validates**:
> [FR-LEARN-03](../../spec/modules/learning.md#acceptance-criteria)

```gherkin
Feature: Lesson Completion

  Scenario: Student completes a lesson
    Given a student is logged in
    And has access to lesson "Math Basic 01"
    When the student opens the lesson
    And reads all content sections
    And clicks "Complete Lesson" button
    Then lesson progress should update to COMPLETED
    And EXP points should be awarded
    And success notification should appear
```

### TC-E2E-LEARN-002: Complete quiz

> **Validates**:
> [FR-LEARN-02](../../spec/modules/learning.md#acceptance-criteria)

```gherkin
Feature: Quiz Completion

  Scenario: Student completes quiz with passing score
    Given a student is logged in
    And has started quiz for lesson "Math Basic 01"
    When the student answers all questions correctly
    And submits the quiz
    Then score should be displayed
    And score should be >= 70%
    And lesson status should be COMPLETED
```

---

## Tournament Module

### TC-E2E-TOUR-001: Join tournament

> **Validates**:
> [FR-TOUR-01](../../spec/modules/tournament.md#acceptance-criteria)

```gherkin
Feature: Tournament Registration

  Scenario: Student joins a tournament
    Given a student is logged in
    And tournament "Math Championship" is open for registration
    And tournament has available slots
    When the student clicks "Join Tournament"
    Then registration should be confirmed
    And student should appear in participants list
    And confirmation notification should be sent
```

### TC-INT-TOUR-002: Tournament scoring

> **Validates**:
> [FR-TOUR-02](../../spec/modules/tournament.md#acceptance-criteria)

```gherkin
Feature: Tournament Scoring

  Scenario: Score calculated correctly
    Given a student is participating in active round
    And student answers 8/10 questions correctly
    And student finishes in 45 seconds
    When the round ends
    Then score should be calculated as accuracy × speed_bonus
    And score should be saved to participant record
```

### TC-INT-TOUR-003: Leaderboard real-time

> **Validates**:
> [FR-TOUR-03](../../spec/modules/tournament.md#acceptance-criteria)

```gherkin
Feature: Leaderboard Updates

  Scenario: Leaderboard updates in real-time
    Given 50 students are in active tournament round
    When a student submits an answer
    Then leaderboard should update within 500ms
    And all connected clients should receive update
    And ranking should reflect new scores
```

---

## Gamification Module

### TC-INT-GAME-001: Level up

> **Validates**:
> [FR-GAME-01](../../spec/modules/gamification.md#acceptance-criteria)

```gherkin
Feature: Level Up System

  Scenario: User levels up when EXP threshold reached
    Given a student has 95 EXP (threshold is 100)
    When the student earns 10 EXP from completing a lesson
    Then student level should increase by 1
    And level up notification should be displayed
    And new level threshold should be set
```

### TC-INT-GAME-002: Reward redemption

> **Validates**:
> [FR-GAME-02](../../spec/modules/gamification.md#acceptance-criteria)

```gherkin
Feature: Reward Redemption

  Scenario: Transactional reward purchase
    Given a student has 500 coins
    And reward "Avatar Frame" costs 200 coins
    When the student redeems the reward
    Then coins should be deducted atomically
    And reward should be granted
    And if either fails, transaction should rollback
```

### TC-INT-GAME-003: Gamification leaderboard

> **Validates**:
> [FR-GAME-03](../../spec/modules/gamification.md#acceptance-criteria)

```gherkin
Feature: Gamification Leaderboard

  Scenario: Leaderboard updates in real-time
    Given a global EXP leaderboard exists
    When a student earns EXP
    Then leaderboard should update within 50ms
    And student's new rank should be reflected
```

---
