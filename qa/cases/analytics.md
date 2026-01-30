---
id: analytics
title: Analytics Module Tests
sidebar_label: Analytics
sidebar_position: 7
---

# Analytics Module Tests

Các test case cho module Phân tích dữ liệu.

> **SSoT**: [Analytics Spec](../../spec/modules/analytics.md)

---

## Happy path

### TC-INT-ANA-001: ETL processes event correctly

> **Validates**:
> [FR-ANA-01](../../spec/modules/analytics.md#acceptance-criteria)

```gherkin
Feature: ETL Pipeline

  Scenario: Process lesson completion event
    Given a student completes lesson "L001"
    When learning service publishes "lesson_completed" event
    Then ETL worker should consume event within 5 seconds
    And knowledge map should be updated
    And mastery score should be recalculated
```

### TC-INT-ANA-002: Generate report for teacher

> **Validates**:
> [FR-ANA-02](../../spec/modules/analytics.md#acceptance-criteria)

```gherkin
Feature: Report Generation

  Scenario: Teacher requests class report
    Given I am logged in as Teacher
    And I have access to class "CLASS001"
    When I request progress report for that class
    Then report should be generated
    And PDF should be saved to storage
    And I should receive report URL
```

### TC-INT-ANA-003: Daily aggregation job

> **Validates**:
> [FR-ANA-02](../../spec/modules/analytics.md#acceptance-criteria)

```gherkin
Feature: Daily Aggregation

  Scenario: Daily stats are computed correctly
    Given there are 1000 learning events from yesterday
    When scheduler triggers daily aggregation job
    Then daily_stats table should have summarized data
    And totals should match raw event counts
```

---

## Negative cases

### TC-INT-ANA-004: Teacher cannot access other class

> **Validates**:
> [FR-ANA-03](../../spec/modules/analytics.md#acceptance-criteria)

```gherkin
Feature: Authorization

  Scenario: Teacher tries to access unassigned class
    Given I am logged in as Teacher
    And I am NOT assigned to class "CLASS002"
    When I request report for "CLASS002"
    Then response status should be 403 FORBIDDEN
    And error code should be "ACCESS_DENIED"
```

---

## Performance & boundary

### TC-PERF-ANA-001: Large report generation

```gherkin
Feature: Async Report

  Scenario: Report with 1 year of data
    Given class has data spanning 12 months
    When I request annual report
    Then request should return immediately with report_id
    And report should be generated asynchronously
    And I should be notified when ready
```
