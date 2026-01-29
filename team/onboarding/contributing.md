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

| Vai trò       | Trách nhiệm                            |
| ------------- | -------------------------------------- |
| Product Owner | Định hướng sản phẩm, ưu tiên tính năng |
| Tech Lead     | Quyết định kiến trúc, review code      |
| Developer     | Triển khai, viết test, code review     |
| QA Engineer   | Test plan, automation, bug report      |

---

## Workflow (Trunk Based)

### Phân nhánh (Branching)

| Nhánh       | Mục đích                         | Vòng đời  |
| ----------- | -------------------------------- | --------- |
| `main`      | Production, luôn sẵn sàng deploy | Vĩnh viễn |
| `feature/*` | Tính năng ngắn hạn               | < 1 ngày  |

### Quy tắc Commit

Format: `<type>(<scope>): <subject>`

| Loại       | Mô tả             |
| ---------- | ----------------- |
| `feat`     | Tính năng mới     |
| `fix`      | Sửa lỗi           |
| `docs`     | Cập nhật tài liệu |
| `refactor` | Tái cấu trúc      |
| `test`     | Thêm test         |
| `chore`    | Bảo trì           |

---

## Sprint Process

| Sự kiện       | Thời điểm      | Thời lượng |
| ------------- | -------------- | ---------- |
| Planning      | Thứ 2 (tuần 1) | 2 giờ      |
| Daily Standup | Hàng ngày      | 15 phút    |
| Sprint Review | Thứ 6 (tuần 2) | 1 giờ      |
| Retrospective | Thứ 6 (tuần 2) | 45 phút    |

---

## Quality Gates

### Định nghĩa hoàn thành (DoD)

- [x] Code tuân thủ standards
- [x] Unit tests pass (≥ 70% coverage)
- [x] Code reviewed & approved
- [x] CI pipeline pass
- [x] Deployed to staging

---
