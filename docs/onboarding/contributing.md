---
id: contributing
title: Contributing Guide
sidebar_label: Contributing
sidebar_position: 4
---

# Contributing Guide

Quy tắc và quy trình cộng tác phát triển.

---

## Roles

| Role | Responsibility |
| ---- | -------------- |
| Product Owner | Định hướng sản phẩm, ưu tiên tính năng |
| Tech Lead | Quyết định kiến trúc, review code |
| Developer | Triển khai, viết test, code review |
| QA Engineer | Test plan, automation, bug report |

---

## Workflow (Trunk Based)

### Branching

| Branch | Purpose | Lifespan |
| ------ | ------- | -------- |
| `main` | Production, luôn sẵn sàng deploy | Vĩnh viễn |
| `feature/*` | Tính năng ngắn hạn | < 1 ngày |

### Commit Convention

Format: `<type>(<scope>): <subject>`

| Type | Description |
| ---- | ----------- |
| `feat` | Tính năng mới |
| `fix` | Sửa lỗi |
| `docs` | Cập nhật tài liệu |
| `refactor` | Tái cấu trúc |
| `test` | Thêm test |
| `chore` | Bảo trì |

---

## Sprint Process

| Ceremony | When | Duration |
| -------- | ---- | -------- |
| Planning | Mon (week 1) | 2 giờ |
| Daily Standup | Hàng ngày | 15 phút |
| Sprint Review | Fri (week 2) | 1 giờ |
| Retrospective | Fri (week 2) | 45 phút |

---

## Quality Gates

### Definition of Done

- ✅ Code tuân thủ standards
- ✅ Unit tests pass (≥ 70% coverage)
- ✅ Code reviewed & approved
- ✅ CI pipeline pass
- ✅ Deployed to staging

---
