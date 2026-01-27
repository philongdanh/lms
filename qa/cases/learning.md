---
id: learning
title: Learning Module Tests
sidebar_label: Learning
sidebar_position: 2
---

# Learning Module Tests

Các test case cho module Học tập.

---

## Happy Path

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
    When the user requests the subjects list
    Then response should contain array of subjects
    And each subject should have id, name, grade fields
    And request should be successful
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

## Negative Cases

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

## Performance & Boundary

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
