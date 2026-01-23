---
id: negative-cases
title: Negative Cases
sidebar_label: Negative Cases
sidebar_position: 2
---

# Negative Cases

Kịch bản kiểm thử xử lý lỗi.

---

## Auth Module

### TC-INT-AUTH-002: Register duplicate email

```gherkin
Feature: Registration Error Handling

  Scenario: Register with duplicate email
    Given a user already exists with email "existing@example.com"
    When a new user tries to register with email "existing@example.com"
    Then response status should be 409 CONFLICT
    And error code should be "EMAIL_ALREADY_EXISTS"
    And no new account should be created
```

### TC-INT-AUTH-004: Login wrong password

```gherkin
Feature: Login Error Handling

  Scenario: Login with wrong password
    Given a registered user with email "test@example.com"
    When the user logs in with wrong password
    Then response status should be 401 UNAUTHORIZED
    And error code should be "INVALID_CREDENTIALS"
    And no JWT token should be returned
```

### TC-INT-AUTH-005: Rate limiting

```gherkin
Feature: Rate Limiting

  Scenario: Rate limit exceeded for login attempts
    Given a user IP address "192.168.1.100"
    When the user makes 6 failed login attempts within 1 minute
    Then the 6th response status should be 429 TOO_MANY_REQUESTS
    And error code should be "RATE_LIMIT_EXCEEDED"
    And retry-after header should be present
```

---

## Content Module

### TC-INT-CONT-001: Create lesson without topic

```gherkin
Feature: Content Validation

  Scenario: Create lesson without parent topic
    Given a teacher is authenticated
    When the teacher creates a lesson with empty topicId
    Then response status should be 400 BAD_REQUEST
    And error code should be "TOPIC_REQUIRED"
```

### TC-INT-CONT-002: Upload unsupported file format

```gherkin
Feature: File Upload Validation

  Scenario: Upload unsupported file format
    Given a teacher is authenticated
    When the teacher uploads a file with extension ".exe"
    Then response status should be 400 BAD_REQUEST
    And error code should be "UNSUPPORTED_FILE_FORMAT"
    And file should not be stored
```

---

## Learning Module

### TC-INT-LEARN-002: Access locked lesson

```gherkin
Feature: Access Control

  Scenario: Student accesses locked lesson
    Given a student is logged in
    And lesson "Advanced Algebra" has prerequisites not completed
    When the student tries to access the lesson
    Then response status should be 403 FORBIDDEN
    And error code should be "LESSON_LOCKED"
    And response should include prerequisite lessons list
```

---
