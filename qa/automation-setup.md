---
id: automation-setup
title: Test Automation
sidebar_label: Automation
sidebar_position: 3
---

# Test Automation

Cấu trúc và thiết lập hệ thống kiểm thử tự động.

---

## Framework Stack

| Loại Test   | Framework        | Runner  |
| ----------- | ---------------- | ------- |
| Unit        | `Vitest`         | `Node`  |
| Integration | `Vitest` + `MSW` | `Node`  |
| E2E         | `Playwright`     | Browser |
| API         | `Supertest`      | `Node`  |
| Performance | `k6`             | CLI     |

---

## Project Structure

```
tests/
├── unit/           # Unit tests
├── integration/    # API & DB tests
├── e2e/            # Browser tests
├── performance/    # Load tests
└── config/         # Test configs
```

---

## Best Practices

### Unit Tests

| Practice          | Mô tả                                  |
| ----------------- | -------------------------------------- |
| AAA Pattern       | Arrange, Act, Assert                   |
| One assertion     | Một concept mỗi test                   |
| Descriptive names | `should_returnError_when_invalidInput` |
| Mock externals    | Database, HTTP, filesystem             |

### E2E Tests

| Practice            | Mô tả                       |
| ------------------- | --------------------------- |
| Page Object Pattern | Tương tác trang tái sử dụng |
| Retry on failure    | `retries: 2`                |
| Screenshot on fail  | Debug dễ hơn                |

---

## CI/CD Integration

### Triggers

| Kích hoạt (Trigger) | Tests Run                |
| ------------------- | ------------------------ |
| PR                  | Unit + Integration       |
| Merge to main       | All tests                |
| Nightly             | Full suite + Performance |
| Release             | Full suite + E2E         |

### Health Metrics

| Metric          | Mục tiêu  | Cảnh báo   |
| --------------- | --------- | ---------- |
| Flaky test rate | < 1%      | > 5%       |
| Test duration   | < 10 min  | > 15 min   |
| Coverage trend  | Stable/up | Decreasing |

---
