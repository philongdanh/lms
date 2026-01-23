---
id: happy-path
title: Happy Path
sidebar_label: Happy Path
sidebar_position: 1
---

# Happy Path

Kịch bản kiểm thử thành công theo module.

## Auth Module

| Test ID | Scenario | Expected |
| ------- | -------- | -------- |
| TC-INT-AUTH-001 | Register with valid email | User created, verification sent |
| TC-INT-AUTH-003 | Login with valid credentials | JWT token returned |
| TC-E2E-AUTH-001 | Full register + login flow | Redirect to onboarding |

## Learning Module

| Test ID | Scenario | Expected |
| ------- | -------- | -------- |
| TC-INT-LEARN-001 | Get subjects list | Array with subjects |
| TC-E2E-LEARN-001 | Complete a lesson | Points awarded |
| TC-E2E-LEARN-002 | Complete quiz | Score displayed |

## Tournament Module

| Test ID | Scenario | Expected |
| ------- | -------- | -------- |
| TC-E2E-TOUR-001 | Join tournament | Registration confirmed |
