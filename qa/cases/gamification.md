---
id: gamification
title: Gamification Module Tests
sidebar_label: Gamification
sidebar_position: 4
---

# Gamification Module Tests

Các test case cho module Gamification.

---

## Happy path

### TC-INT-GAME-001: Level up

> **Validates**:
> [US-014](../../spec/modules/gamification.md#acceptance-criteria)

```gherkin
Feature: Level Up System

  Scenario: User levels up when EXP threshold reached
    Given a student has 95 EXP (threshold is 100)
    When the student earns 10 EXP from completing a lesson
    Then student level should increase by 1
    And level up notification should be displayed
    And new level threshold should be set
```

### TC-INT-GAME-002: Reward redemption

> **Validates**:
> [US-032](../../spec/modules/gamification.md#acceptance-criteria)

```gherkin
Feature: Reward Redemption

  Scenario: Transactional reward purchase
    Given a student has 500 coins
    And reward "Avatar Frame" costs 200 coins
    When the student redeems the reward
    Then coins should be deducted atomically
    And reward should be granted
    And if either fails, transaction should rollback
```

### TC-INT-GAME-003: Gamification leaderboard

> **Validates**:
> [US-019](../../spec/modules/gamification.md#acceptance-criteria)

```gherkin
Feature: Gamification Leaderboard

  Scenario: Leaderboard updates in real-time
    Given a global EXP leaderboard exists
    When a student earns EXP
    Then leaderboard should update within 50ms
    And student's new rank should be reflected
```
