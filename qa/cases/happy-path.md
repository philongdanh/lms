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

---

## Learning Module

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

> **Validates**: [FR-LEARN-03](../../spec/modules/learning.md#acceptance-criteria)

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

> **Validates**: [FR-LEARN-02](../../spec/modules/learning.md#acceptance-criteria)

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

> **Validates**: [FR-TOUR-01](../../spec/modules/tournament.md#acceptance-criteria)

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

---
