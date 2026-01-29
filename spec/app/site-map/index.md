---
id: site-map
title: Site Map
sidebar_label: Site Map
sidebar_position: 1
---

# Site Map

| Đường dẫn               | Component            | Layout            | Quyền truy cập | Screen Spec                                       |
| :---------------------- | :------------------- | :---------------- | :------------- | :------------------------------------------------ |
| `/`                     | `LandingPage`        | `PublicLayout`    | All            | [Landing](../screens/landing.md)                  |
| `/auth/login`           | `LoginPage`          | `AuthLayout`      | Guest          | [Login](../screens/login.md)                      |
| `/auth/register`        | `RegisterPage`       | `AuthLayout`      | Guest          | [Register](../screens/register.md)                |
| `/auth/forgot-password` | `ForgotPasswordPage` | `AuthLayout`      | Guest          | [Forgot Password](../screens/forgot-password.md)  |
| `/dashboard`            | `DashboardOverview`  | `DashboardLayout` | User           | [Dashboard](../screens/dashboard.md)              |
| `/learning`             | `MyLearningPage`     | `DashboardLayout` | User           | [My Learning](../screens/my-learning.md)          |
| `/learning/:id`         | `LessonViewer`       | `FocusLayout`     | User           | [Learning](../screens/learning.md)                |
| `/tournament`           | `TournamentList`     | `DashboardLayout` | User           | [Tournament](../screens/tournament.md)            |
| `/tournament/live/:id`  | `LiveMatch`          | `FocusLayout`     | User           | [Live Match](../screens/live-match.md)            |
| `/profile`              | `ProfilePage`        | `DashboardLayout` | User           | [Profile](../screens/profile.md)                  |
| `/admin`                | `AdminDashboard`     | `AdminLayout`     | Admin          | [Admin](../screens/admin.md)                      |
| `/admin/users`          | `UserManagement`     | `AdminLayout`     | Admin          | [User Management](../screens/admin-users.md)      |
| `/admin/content`        | `ContentManagement`  | `AdminLayout`     | Admin          | [Content Management](../screens/admin-content.md) |
| `/admin/settings`       | `AdminSettings`      | `AdminLayout`     | Admin          | [Admin Settings](../screens/admin-settings.md)    |
