---
id: site-map
title: Site Map
sidebar_label: Site Map
sidebar_position: 1
---

# Site Map

Mô tả các trang trong hệ thống.

> **SSoT**: [Backlog](../../../blueprint/product/plan.md)

---

| Đường dẫn               | Screen Spec                                       | Layout    | Quyền truy cập |
| :---------------------- | :------------------------------------------------ | :-------- | :------------- |
| `/`                     | [Landing](../screens/landing.md)                  | Public    | All            |
| `/auth/login`           | [Login](../screens/login.md)                      | Auth      | Guest          |
| `/auth/register`        | [Register](../screens/register.md)                | Auth      | Guest          |
| `/auth/forgot-password` | [Forgot Password](../screens/forgot-password.md)  | Auth      | Guest          |
| `/dashboard`            | [Dashboard](../screens/dashboard.md)              | Dashboard | User           |
| `/learning`             | [My Learning](../screens/my-learning.md)          | Dashboard | User           |
| `/learning/:id`         | [Learning](../screens/learning.md)                | Focus     | User           |
| `/tournament`           | [Tournament](../screens/tournament.md)            | Dashboard | User           |
| `/tournament/live/:id`  | [Live Match](../screens/live-match.md)            | Focus     | User           |
| `/profile`              | [Profile](../screens/profile.md)                  | Dashboard | User           |
| `/admin`                | [Admin](../screens/admin.md)                      | Admin     | Admin          |
| `/admin/users`          | [User Management](../screens/admin-users.md)      | Admin     | Admin          |
| `/admin/content`        | [Content Management](../screens/admin-content.md) | Admin     | Admin          |
| `/admin/settings`       | [Admin Settings](../screens/admin-settings.md)    | Admin     | Admin          |
