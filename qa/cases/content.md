---
id: content
title: Content Module Tests
sidebar_label: Content
sidebar_position: 5
---

# Content Module Tests

Các test case cho module Quản lý nội dung.

---

## Negative Cases

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

## Boundary Testing

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
