---
id: sample-code
title: Sample Test Code
sidebar_label: Sample Code
sidebar_position: 4
---

# Sample Test Code

Ví dụ code test.

## Integration Test: Register

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

## E2E Test: Complete Lesson

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
