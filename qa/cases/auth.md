---
id: auth
title: Auth Module Tests
sidebar_label: Auth
sidebar_position: 1
---

# Auth Module Tests

Các test case cho module Xác thực.

---

## Happy Path

### TC-INT-AUTH-001: Register with valid email

> **Validates**: [LMS-001](../../spec/modules/auth.md#acceptance-criteria)

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

> **Validates**: [LMS-004](../../spec/modules/auth.md#acceptance-criteria)

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

> **Validates**: [LMS-007](../../spec/modules/auth.md#acceptance-criteria)

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

> **Validates**: [LMS-006](../../spec/modules/auth.md#acceptance-criteria)

```gherkin
Feature: Token Invalidation on Logout

  Scenario: Logout revokes refresh token
    Given a user is logged in with valid session
    When the user requests logout
    Then refresh token should be revoked in database
    And subsequent requests with that token should return unauthorized error
    And user should be redirected to login page
```

---

## Negative Cases

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

## Performance & Boundary

### TC-PERF-AUTH-001: Concurrent logins

```gherkin
Feature: Authentication Performance

  Scenario: 1000 concurrent login requests
    Given 1000 valid user accounts
    When all users attempt to login simultaneously
    Then P95 response time should be < 200ms
    And all requests should complete successfully
    And no 5xx errors should occur
```

### TC-BOUND-AUTH-001: Maximum devices per user

```gherkin
Feature: Device Limit

  Scenario: User exceeds maximum device limit
    Given a user is logged in on 3 devices (maximum)
    When the user tries to login on a 4th device
    Then login should fail
    Or oldest session should be automatically revoked
    And user should receive notification about session revocation
```
