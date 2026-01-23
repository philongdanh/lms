---
id: negative-cases
title: Negative Cases
sidebar_label: Negative Cases
sidebar_position: 2
---

# Negative Cases

Kịch bản kiểm thử xử lý lỗi.

| Test ID | Scenario | Expected |
| ------- | -------- | -------- |
| TC-INT-AUTH-002 | Register duplicate email | CONFLICT error |
| TC-INT-AUTH-004 | Login wrong password | UNAUTHORIZED error |
| TC-INT-AUTH-005 | Rate limiting | 429 after 6 attempts |
