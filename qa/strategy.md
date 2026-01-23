---
id: strategy
title: QA Strategy
sidebar_label: Strategy
sidebar_position: 1
---

# QA Strategy

Chiến lược kiểm thử tổng thể và mục tiêu chất lượng.

---

## Approach

### Testing Levels

| Level | Coverage Target | Tools | Speed |
| ----- | --------------- | ----- | ----- |
| Unit Tests | 80% | Vitest | < 100ms/test |
| Integration | 70% critical paths | Vitest + MSW | < 5s/test |
| E2E | 100% happy paths | Playwright | < 30s/test |

**Testing Pyramid:**
```d2
direction: right

E2E: E2E Tests (5%)
Integration: Integration Tests (15%)
Unit: Unit Tests (80%)

E2E -> Integration
Integration -> Unit
```

### Automation Tools

| Type | Tool | Purpose |
| ---- | ---- | ------- |
| Unit | Vitest | Fast unit testing |
| Integration | Vitest + MSW | API mocking |
| E2E | Playwright | Browser automation |
| API | Supertest | HTTP testing |
| Performance | k6 | Load testing |

---

## Standards

### Defect Management

**Severity Levels:**

| Severity | Description | Response Time |
| -------- | ----------- | ------------- |
| Critical | System down | Immediate |
| High | Major feature broken | 24 hours |
| Medium | Feature degraded | Sprint |
| Low | Minor issue | Backlog |

**Bug Lifecycle:**
```d2
direction: right

New -> Triaged
Triaged -> InProgress
InProgress -> InReview
InReview -> Verified
Verified -> Closed
```

### Quality Gates

**PR Checks:**

| Check | Requirement | Blocking |
| ----- | ----------- | -------- |
| Unit Tests | 100% pass | Yes |
| Coverage | > 80% | Yes |
| Lint | No errors | Yes |
| Build | Success | Yes |

**Release Checks:**

| Check | Requirement | Blocking |
| ----- | ----------- | -------- |
| All Tests | 100% pass | Yes |
| E2E Tests | 100% pass | Yes |
| Performance | Within targets | Yes |
| Security Scan | No critical | Yes |

---
