---
id: profile
title: Profile Screen
sidebar_label: Profile
sidebar_position: 11
---

# Profile Screen

Đặc tả màn hình hồ sơ người dùng.

> **SSoT**: [Backlog](../../../blueprint/product/backlog.md)

---

## Overview

```yaml
route: /profile
layout: DashboardLayout
access: User
```

---

## Screen Structure

### Hierarchy

```yaml
ProfilePage:
  - ProfileHeader:
      - Avatar: image (editable)
      - UserName: text
      - Email: text
      - EditButton: icon-button
  - StatsSection:
      - StatCard: card (repeatable)
  - AchievementsSection:
      - SectionTitle: 'Thành tích'
      - AchievementBadges: badge-grid
  - SettingsSection:
      - SectionTitle: 'Cài đặt'
      - SettingsList: list
```

---

## Components

### ProfileHeader

| Element      | Type         | Props                                           |
| :----------- | :----------- | :---------------------------------------------- |
| `Avatar`     | `Avatar`     | `src={user.avatar}`, `size="large"`, `editable` |
| `UserName`   | `Text`       | `variant="h2"`                                  |
| `Email`      | `Text`       | `variant="caption"`                             |
| `EditButton` | `IconButton` | `icon="edit"`, `onClick=openEditModal`          |

### StatCard

| Element | Type   | Props               |
| :------ | :----- | :------------------ |
| `Icon`  | `Icon` | Stat icon           |
| `Value` | `Text` | `variant="h3"`      |
| `Label` | `Text` | `variant="caption"` |

**Stats to display:**

```yaml
stats:
  - icon: streak
    value: user.currentStreak
    label: 'Streak liên tiếp'
  - icon: trophy
    value: user.totalPoints
    label: 'Điểm tích lũy'
  - icon: medal
    value: user.rank
    label: 'Xếp hạng'
  - icon: book
    value: user.completedCourses
    label: 'Khóa học hoàn thành'
```

### SettingsList

| Item           | Action                      |
| :------------- | :-------------------------- |
| `Đổi mật khẩu` | Navigate to change password |
| `Thông báo`    | Toggle notifications        |
| `Ngôn ngữ`     | Language picker             |
| `Đăng xuất`    | Logout confirmation         |

---

## States

| State     | Trigger      | UI Changes      |
| :-------- | :----------- | :-------------- |
| `loading` | Initial load | Skeleton        |
| `idle`    | Data loaded  | Show profile    |
| `editing` | Edit clicked | Show edit modal |

---

## Actions

| Action          | Trigger      | Effect                                    |
| :-------------- | :----------- | :---------------------------------------- |
| `loadProfile`   | Mount        | `GET /api/user/profile`                   |
| `updateAvatar`  | Avatar click | Open image picker, `PUT /api/user/avatar` |
| `updateProfile` | Save edit    | `PUT /api/user/profile`                   |
| `logout`        | Logout click | Clear session, redirect to login          |

---

## Responsive

```yaml
mobile:
  ProfileHeader: centered, stack-vertical
  StatsSection: 2x2 grid
tablet:
  StatsSection: 4-column
desktop:
  ProfileHeader: side-by-side (avatar left, info right)
```
