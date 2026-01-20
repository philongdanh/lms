---
id: automation
title: Test Automation
sidebar_label: Automation
sidebar_position: 3
---

# Test Automation

Test automation framework và setup.

---

## Framework Stack

| Test Type   | Framework            | Runner      |
| ----------- | -------------------- | ----------- |
| Unit        | [Jest/Vitest/Pytest] | [Framework] |
| Integration | [Supertest/Requests] | [Framework] |
| E2E         | [Cypress/Playwright] | [Framework] |
| API         | [Postman/Insomnia]   | Newman      |
| Performance | [k6/Artillery]       | CLI         |

---

## Project Structure

```
tests/
├── unit/
│   ├── services/
│   ├── utils/
│   └── __mocks__/
├── integration/
│   ├── api/
│   └── db/
├── e2e/
│   ├── specs/
│   ├── fixtures/
│   └── support/
├── performance/
│   └── scenarios/
└── config/
    ├── jest.config.js
    ├── playwright.config.js
    └── k6.config.js
```

---

## Unit Testing

### Configuration

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### Best Practices

| Practice          | Description                            |
| ----------------- | -------------------------------------- |
| AAA Pattern       | Arrange, Act, Assert                   |
| One assertion     | Một concept mỗi test                   |
| Descriptive names | `should_returnError_when_invalidInput` |
| Mock externals    | Database, HTTP, filesystem             |

### Example

```typescript
describe('UserService', () => {
  describe('createUser', () => {
    it('should create user with valid data', async () => {
      // Arrange
      const userData = { email: 'test@example.com' };

      // Act
      const result = await userService.createUser(userData);

      // Assert
      expect(result.email).toBe(userData.email);
    });
  });
});
```

---

## Integration Testing

### Database Testing

| Approach             | Use Case          |
| -------------------- | ----------------- |
| Test containers      | Isolated database |
| Transaction rollback | Fast cleanup      |
| Seed data            | Consistent state  |

### API Testing

```typescript
describe('POST /api/users', () => {
  it('should create user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'test@example.com' })
      .expect(201);

    expect(response.body.data.email).toBe('test@example.com');
  });
});
```

---

## E2E Testing

### Configuration

```typescript
// playwright.config.ts
export default {
  testDir: './tests/e2e',
  timeout: 30000,
  retries: 2,
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
};
```

### Page Object Pattern

```typescript
// pages/LoginPage.ts
class LoginPage {
  constructor(private page: Page) {}

  async login(email: string, password: string) {
    await this.page.fill('[name="email"]', email);
    await this.page.fill('[name="password"]', password);
    await this.page.click('button[type="submit"]');
  }
}
```

---

## CI/CD Integration

### Pipeline Stages

```yaml
stages:
  - lint
  - unit-test
  - integration-test
  - e2e-test
  - deploy
```

### Triggers

| Trigger       | Tests Run                |
| ------------- | ------------------------ |
| PR            | Unit + Integration       |
| Merge to main | All tests                |
| Nightly       | Full suite + Performance |
| Release       | Full suite + E2E         |

### Parallelization

| Strategy       | Use Case            |
| -------------- | ------------------- |
| Test splitting | Large test suites   |
| Sharding       | E2E tests           |
| Parallel jobs  | Independent modules |

---

## Reporting

### Test Reports

| Report       | Tool       | Output    |
| ------------ | ---------- | --------- |
| Coverage     | Istanbul   | HTML/JSON |
| Unit Results | Jest       | JUnit XML |
| E2E Results  | Playwright | HTML      |

### Notifications

| Event          | Channel       |
| -------------- | ------------- |
| Test failure   | Slack         |
| Coverage drop  | Slack + Email |
| Nightly report | Email         |

---

## Maintenance

### Test Health Metrics

| Metric          | Target    | Alert      |
| --------------- | --------- | ---------- |
| Flaky test rate | < 1%      | > 5%       |
| Test duration   | < 10 min  | > 15 min   |
| Coverage trend  | Stable/up | Decreasing |

### Cleanup Tasks

| Task                | Frequency  |
| ------------------- | ---------- |
| Review flaky tests  | Weekly     |
| Update test data    | Monthly    |
| Audit test coverage | Per sprint |

---

## References

- [Test Strategy](./test-strategy.md)
- [Benchmarks](./benchmarks.md)
