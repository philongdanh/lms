---
id: admin
title: Admin Module Tests
sidebar_label: Admin
sidebar_position: 6
---

# Admin Module Tests

Các test case cho module Quản trị hệ thống.

> **SSoT**: [Admin Spec](../../spec/modules/admin.md)

---

## Happy path

### TC-INT-ADM-001: Create tenant with valid data

> **Validates**: [FR-ADM-01](../../spec/modules/admin.md#acceptance-criteria)

```gherkin
Feature: Tenant Management

  Scenario: Create tenant with valid data
    Given I am logged in as Root Admin
    And tenant code "SCHOOL001" does not exist
    When I create tenant with name "Test School" and code "SCHOOL001"
    Then tenant should be created with status "PENDING"
    And activation email should be sent to admin email
    And response status should be 201
```

### TC-INT-ADM-002: Import users from CSV

> **Validates**: [FR-ADM-02](../../spec/modules/admin.md#acceptance-criteria)

```gherkin
Feature: Bulk User Import

  Scenario: Import valid CSV with 100 users
    Given I am logged in as Tenant Admin
    And I have a valid CSV file with 100 users
    When I upload the CSV file
    Then import job should be queued
    And I should receive job_id for tracking
    And all 100 users should be created
```

### TC-INT-ADM-003: Impersonate user

> **Validates**: [FR-ADM-03](../../spec/modules/admin.md#acceptance-criteria)

```gherkin
Feature: User Impersonation

  Scenario: Admin impersonates student
    Given I am logged in as Tenant Admin
    And student "student@test.com" exists in my tenant
    When I request impersonation for that student
    Then I should receive temporary impersonation token
    And audit log should be created
```

---

## Negative cases

### TC-INT-ADM-004: Create tenant with duplicate code

```gherkin
Feature: Tenant Validation

  Scenario: Create tenant with existing code
    Given tenant code "SCHOOL001" already exists
    When I try to create tenant with code "SCHOOL001"
    Then response status should be 409 CONFLICT
    And error code should be "CODE_EXISTS"
```

### TC-INT-ADM-005: Import exceeds limit

```gherkin
Feature: Import Limits

  Scenario: Import CSV with more than 500 users
    Given I have a CSV file with 600 users
    When I upload the CSV file
    Then response status should be 400 BAD_REQUEST
    And error code should be "LIMIT_EXCEEDED"
```

---

## Performance & boundary

### TC-PERF-ADM-001: Bulk import performance

```gherkin
Feature: Import Performance

  Scenario: Import 500 users within time limit
    Given I have a valid CSV with 500 users
    When I upload and wait for job completion
    Then job should complete within 60 seconds
    And all 500 users should be created
```
