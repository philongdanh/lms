---
id: strategy
title: QA Strategy
sidebar_label: Strategy
sidebar_position: 1
---

# QA Strategy

Chiến lược kiểm thử tổng thể và mục tiêu chất lượng.

## QA Vision

> **"Zero Critical Bugs in Production"**

Chúng ta hướng tới việc xây dựng một hệ thống giáo dục tin cậy tuyệt đối, nơi
chất lượng được đảm bảo ngay từ khâu thiết kế (Shift-left testing) và mọi luồng
nghiệp vụ chính đều được bảo vệ bởi test tự động.

---

## Approach

### Testing Levels

| Level       | Coverage Target    | Tools            | Speed        |
| ----------- | ------------------ | ---------------- | ------------ |
| Unit Tests  | 80%                | `Vitest`         | < 100ms/test |
| Integration | 70% critical paths | `Vitest` + `MSW` | < 5s/test    |
| E2E         | 100% happy paths   | `Playwright`     | < 30s/test   |

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

| Type        | Tool             | Purpose                  |
| ----------- | ---------------- | ------------------------ |
| Unit        | `Vitest`         | Kiểm thử đơn vị nhanh    |
| Integration | `Vitest` + `MSW` | Giả lập API (Mocking)    |
| E2E         | `Playwright`     | Tự động hóa trình duyệt  |
| API         | `Supertest`      | Kiểm thử HTTP            |
| Performance | `k6`             | Kiểm thử tải (Load test) |

---

## Standards

### Defect Management

**Severity Levels:**

| Severity | Description              | Response Time |
| -------- | ------------------------ | ------------- |
| Critical | Hệ thống ngừng hoạt động | Ngay lập tức  |
| High     | Tính năng chính bị lỗi   | 24 giờ        |
| Medium   | Tính năng bị suy giảm    | Trong Sprint  |
| Low      | Vấn đề nhỏ               | Backlog       |

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

| Check      | Requirement | Blocking |
| ---------- | ----------- | -------- |
| Unit Tests | 100% pass   | Có       |
| Coverage   | > 80%       | Có       |
| Lint       | No errors   | Có       |
| Build      | Success     | Có       |

**Release Checks:**

| Check         | Requirement               | Blocking |
| ------------- | ------------------------- | -------- |
| All Tests     | 100% pass                 | Có       |
| E2E Tests     | 100% pass                 | Có       |
| Performance   | Đạt mục tiêu đề ra        | Có       |
| Security Scan | Không có lỗi nghiêm trọng | Có       |

---
