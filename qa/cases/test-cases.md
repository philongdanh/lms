---
id: cases
title: Test Cases
sidebar_label: Cases
sidebar_position: 3
---

# Test Cases

Kịch bản kiểm thử chính theo module.

---

## Scenarios

### Happy Path

**Auth Module:**

| Test ID | Scenario | Expected |
| ------- | -------- | -------- |
| TC-INT-AUTH-001 | Register with valid email | User created, verification sent |
| TC-INT-AUTH-003 | Login with valid credentials | JWT token returned |
| TC-E2E-AUTH-001 | Full register + login flow | Redirect to onboarding |

**Learning Module:**

| Test ID | Scenario | Expected |
| ------- | -------- | -------- |
| TC-INT-LEARN-001 | Get subjects list | Array with subjects |
| TC-E2E-LEARN-001 | Complete a lesson | Points awarded |
| TC-E2E-LEARN-002 | Complete quiz | Score displayed |

**Tournament Module:**

| Test ID | Scenario | Expected |
| ------- | -------- | -------- |
| TC-E2E-TOUR-001 | Join tournament | Registration confirmed |

### Negative Cases

| Test ID | Scenario | Expected |
| ------- | -------- | -------- |
| TC-INT-AUTH-002 | Register duplicate email | CONFLICT error |
| TC-INT-AUTH-004 | Login wrong password | UNAUTHORIZED error |
| TC-INT-AUTH-005 | Rate limiting | 429 after 6 attempts |

### Boundary Testing

| Test ID | Scenario | Expected |
| ------- | -------- | -------- |
| TC-PERF-AUTH-001 | 1000 concurrent logins | P95 < 200ms |
| TC-PERF-TOUR-001 | 100k concurrent users | Latency < 200ms |
| TC-PERF-LEARN-001 | 2000 RPS submit answer | P95 < 200ms |

---

## Sample Test Code

### Integration Test: Register

```graphql
mutation {
  registerWithEmail(
    input: {
      email: "test@example.com"
      password: "Password123"
      name: "Test User"
      role: STUDENT
    }
  ) {
    user { id email }
    errors { code message }
  }
}
```

**Expected:**
- Status: 200
- `user.id` is not null
- `errors` is empty

### E2E Test: Complete Lesson

```typescript
test('User can complete a lesson', async ({ page }) => {
  await login(page, 'student@test.com');
  await page.click('[data-testid="nav-learning"]');
  await page.click('[data-testid="subject-math"]');
  await page.click('[data-testid="lesson-0"]');
  await page.click('[data-testid="complete-btn"]');
  await expect(page.getByText('Completed!')).toBeVisible();
});
```

---
