---
id: automation
title: Test Automation
sidebar_label: Automation
sidebar_position: 3
---

# Test Automation

Cấu trúc và thiết lập hệ thống kiểm thử tự động.

---

## Framework Stack

| Test Type   | Framework        | Runner  |
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

| Practice          | Description                            |
| ----------------- | -------------------------------------- |
| AAA Pattern       | Arrange, Act, Assert                   |
| One assertion     | Một concept mỗi test                   |
| Descriptive names | `should_returnError_when_invalidInput` |
| Mock externals    | Database, HTTP, filesystem             |

### E2E Tests

| Practice            | Description                |
| ------------------- | -------------------------- |
| Page Object Pattern | Reusable page interactions |
| Retry on failure    | `retries: 2`               |
| Screenshot on fail  | Debug easier               |

---

## CI/CD Integration

### Triggers

| Trigger       | Tests Run                |
| ------------- | ------------------------ |
| PR            | Unit + Integration       |
| Merge to main | All tests                |
| Nightly       | Full suite + Performance |
| Release       | Full suite + E2E         |

### Health Metrics

| Metric          | Target    | Alert      |
| --------------- | --------- | ---------- |
| Flaky test rate | < 1%      | > 5%       |
| Test duration   | < 10 min  | > 15 min   |
| Coverage trend  | Stable/up | Decreasing |

---
