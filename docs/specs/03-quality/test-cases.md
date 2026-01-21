---
id: test-cases
title: Test Cases
sidebar_label: Test Cases
sidebar_position: 2
---

# Test Cases

Test case templates cho integration và E2E testing. Bao gồm quy ước đặt tên, độ
ưu tiên và các công cụ sử dụng.

---

## Test Naming Convention

| Format                        | Description           |
| ----------------------------- | --------------------- |
| `TC-{TYPE}-{MODULE}-{NUMBER}` | Standard test case ID |

| Type | Description       |
| ---- | ----------------- |
| UNIT | Unit tests        |
| INT  | Integration tests |
| E2E  | End-to-end tests  |
| PERF | Performance tests |

---

## Test Priority

| Priority | Description     | Execution    |
| -------- | --------------- | ------------ |
| P0       | Critical path   | Every commit |
| P1       | High importance | Every PR     |
| P2       | Medium          | Daily        |
| P3       | Low             | Weekly       |

---

## Tools

| Type        | Tool         |
| ----------- | ------------ |
| Unit        | Vitest       |
| Integration | Vitest + MSW |
| E2E         | Playwright   |
| API         | Supertest    |
| Performance | k6           |

---

## Integration Tests

### TC-INT-AUTH-001: Register with valid email

**Priority:** P0  
**Module:** Auth

| Field        | Value                |
| ------------ | -------------------- |
| Endpoint     | `POST /graphql`      |
| Mutation     | `registerWithEmail`  |
| Precondition | Email does not exist |

**Request:**

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
    user {
      id
      email
    }
    errors {
      code
      message
    }
  }
}
```

**Expected:**

- Status: 200
- `user.id` is not null
- `user.email` = "test@example.com"
- `errors` is empty
- Email verification is sent

### TC-INT-AUTH-002: Register with duplicate email

**Priority:** P0  
**Module:** Auth

| Field        | Value                |
| ------------ | -------------------- |
| Endpoint     | `POST /graphql`      |
| Mutation     | `registerWithEmail`  |
| Precondition | Email already exists |

**Expected:**

- Status: 200
- `user` is null
- `errors[0].code` = "CONFLICT"
- `errors[0].message` contains "already exists"

### TC-INT-AUTH-003: Login success

**Priority:** P0  
**Module:** Auth

| Field        | Value               |
| ------------ | ------------------- |
| Endpoint     | `POST /graphql`     |
| Mutation     | `login`             |
| Precondition | Account is verified |

**Request:**

```graphql
mutation {
  login(input: { email: "user@example.com", password: "Password123" }) {
    accessToken
    user {
      id
      role
    }
    errors {
      code
    }
  }
}
```

**Expected:**

- `accessToken` is valid JWT
- `user.role` = "STUDENT"
- Cookie `refreshToken` is set

### TC-INT-AUTH-004: Login wrong password

**Priority:** P0  
**Module:** Auth

**Expected:**

- `accessToken` is null
- `errors[0].code` = "UNAUTHORIZED"

### TC-INT-AUTH-005: Rate limiting

**Priority:** P1  
**Module:** Auth

| Field        | Value                          |
| ------------ | ------------------------------ |
| Action       | Call login 6 times in 1 minute |
| Precondition | Wrong password each time       |

**Expected:**

- Attempts 1-5: Normal response
- Attempt 6: Status 429 Too Many Requests

### TC-INT-LEARN-001: Get subjects list

**Priority:** P0  
**Module:** Learning

**Request:**

```graphql
query {
  subjects {
    id
    name
    icon
    topicsCount
  }
}
```

**Expected:**

- Status: 200
- `subjects` is array with items
- Each item has `id`, `name`, `icon`

---

## E2E Tests

### TC-E2E-AUTH-001: Register and Login

**Priority:** P0  
**Scenario:** Complete user journey

```typescript
test('User can register and login', async ({ page }) => {
  // 1. Register
  await page.goto('/register');
  await page.fill('[name="email"]', 'newuser@test.com');
  await page.fill('[name="password"]', 'Password123');
  await page.fill('[name="confirmPassword"]', 'Password123');
  await page.fill('[name="name"]', 'Test User');
  await page.click('[data-testid="register-btn"]');

  // 2. Check redirect
  await expect(page).toHaveURL('/verify-email');
  await expect(page.getByText('Please check your email')).toBeVisible();

  // 3. Verify email (mock)
  await mockEmailVerification('newuser@test.com');

  // 4. Login
  await page.goto('/login');
  await page.fill('[name="email"]', 'newuser@test.com');
  await page.fill('[name="password"]', 'Password123');
  await page.click('[data-testid="login-btn"]');

  // 5. Check login success
  await expect(page).toHaveURL('/onboarding');
  await expect(page.getByText('Welcome')).toBeVisible();
});
```

### TC-E2E-LEARN-001: Complete a lesson

**Priority:** P0  
**Scenario:** Basic learning journey

```typescript
test('User can complete a lesson', async ({ page }) => {
  // Setup: Login
  await login(page, 'student@test.com');

  // 1. Go to Learning page
  await page.click('[data-testid="nav-learning"]');
  await expect(page).toHaveURL('/learning');

  // 2. Select Math subject
  await page.click('[data-testid="subject-math"]');

  // 3. Select first topic
  await page.click('[data-testid="topic-0"]');

  // 4. Start lesson
  await page.click('[data-testid="lesson-0"]');
  await expect(page.getByRole('heading')).toContainText('Lesson 1');

  // 5. View content
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);

  // 6. Complete
  await page.click('[data-testid="complete-btn"]');

  // 7. Check result
  await expect(page.getByText('Completed!')).toBeVisible();
  await expect(page.getByText('+10 points')).toBeVisible();
});
```

### TC-E2E-LEARN-002: Complete quiz

**Priority:** P0  
**Scenario:** Quiz completion

```typescript
test('User can complete a quiz', async ({ page }) => {
  await login(page, 'student@test.com');
  await page.goto('/learning/lesson/lesson-123/exercise');

  // 1. Answer questions
  for (let i = 0; i < 5; i++) {
    await page.click(`[data-testid="option-0"]`);
    await page.click('[data-testid="next-btn"]');
  }

  // 2. Submit
  await page.click('[data-testid="submit-btn"]');

  // 3. Check result
  await expect(page.getByTestId('score')).toBeVisible();
  await expect(page.getByText('points')).toBeVisible();
});
```

### TC-E2E-TOUR-001: Join tournament

**Priority:** P0  
**Scenario:** Tournament participation

```typescript
test('User can join and participate in tournament', async ({ page }) => {
  await login(page, 'student@test.com');

  // 1. Go to tournaments
  await page.click('[data-testid="nav-tournaments"]');
  await expect(page).toHaveURL('/tournaments');

  // 2. Select upcoming tournament
  await page.click('[data-testid="tournament-card-0"]');

  // 3. Join
  await page.click('[data-testid="join-btn"]');
  await expect(page.getByText('Registration confirmed')).toBeVisible();

  // 4. Wait for start and enter
  await mockTournamentStart();
  await page.click('[data-testid="enter-btn"]');

  // 5. Answer questions
  await expect(page.getByTestId('question')).toBeVisible();
});
```

---

## References

- [Acceptance Criteria](./acceptance.md)
- [Test Strategy](./test-strategy.md)
- [Automation](./automation.md)
