---
id: boundary-testing
title: Boundary Testing
sidebar_label: Boundary Testing
sidebar_position: 3
---

# Boundary Testing

Kịch bản kiểm thử hiệu năng và giới hạn.

---

## Performance Tests

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

### TC-PERF-TOUR-001: High concurrent tournament users

```gherkin
Feature: Tournament Scalability

  Scenario: 100k concurrent users in tournament
    Given a tournament with 100,000 participants
    And all participants are connected via WebSocket
    When leaderboard update is triggered
    Then update latency should be < 200ms
    And all clients should receive the update
    And Redis memory usage should stay within limits
```

### TC-PERF-LEARN-001: Submit answer throughput

```gherkin
Feature: Learning Module Throughput

  Scenario: 2000 RPS submit answer
    Given the learning module is running
    When 2000 answer submissions per second are sent
    Then P95 response time should be < 200ms
    And error rate should be < 0.1%
    And database connections should not exceed pool limit
```

---

## Boundary Value Tests

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

### TC-BOUND-CONT-001: Maximum file upload size

```gherkin
Feature: Upload Size Limit

  Scenario: Upload file exceeding size limit
    Given a teacher is authenticated
    When the teacher uploads a video file of 600MB (limit is 500MB)
    Then response status should be 413 PAYLOAD_TOO_LARGE
    And error code should be "FILE_TOO_LARGE"
    And upload should be rejected before full transfer
```

### TC-BOUND-TOUR-001: Tournament at capacity

```gherkin
Feature: Tournament Capacity

  Scenario: Registration when tournament is full
    Given a tournament with max 100 participants
    And 100 participants are already registered
    When a new student tries to join
    Then response status should be 409 CONFLICT
    And error code should be "TOURNAMENT_FULL"
    And student should be offered waitlist option
```

---
