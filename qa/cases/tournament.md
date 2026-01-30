---
id: tournament
title: Tournament Module Tests
sidebar_label: Tournament
sidebar_position: 5
---

# Tournament module tests

Các test case cho module Giải đấu.

---

## Happy path

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

## Performance & boundary

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
