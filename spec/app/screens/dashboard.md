---
id: dashboard
title: Dashboard Screen
sidebar_label: Dashboard
sidebar_position: 4
---

# Dashboard Screen

Đặc tả màn hình Dashboard chính.

> **SSoT**: [Backlog](../../../blueprint/product/backlog.md)

---

## Overview

```yaml
route: /dashboard
layout: DashboardLayout
access: User
```

---

## Screen Structure

### Hierarchy

```yaml
DashboardPage:
  - Header:
      - Logo: image
      - SearchBar: input[type=search]
      - NotificationBell: icon-button
      - UserMenu: dropdown
  - Sidebar:
      - NavLinks:
          - OverviewLink: active
          - LearningLink: link
          - TournamentLink: link
          - ProfileLink: link
  - MainContent:
      - PageTitle: 'Dashboard'
      - WelcomeCard:
          - Greeting: text
          - QuickStats: stats-row
      - ProgressSection:
          - SectionTitle: 'Tiến độ học tập'
          - ProgressCards: card-grid
      - RecentActivity:
          - SectionTitle: 'Hoạt động gần đây'
          - ActivityList: list
      - Recommendations:
          - SectionTitle: 'Đề xuất cho bạn'
          - CourseCards: card-carousel
```

---

## Components

### WelcomeCard

| Element      | Type       | Props                                              |
| :----------- | :--------- | :------------------------------------------------- |
| `Greeting`   | `Text`     | `variant="h2"`, `content="Chào mừng, {userName}!"` |
| `QuickStats` | `StatsRow` | `items=[streak, points, rank]`                     |

### ProgressCards

| Element          | Type           | Props                                       |
| :--------------- | :------------- | :------------------------------------------ |
| `CourseProgress` | `ProgressCard` | `title`, `progress`, `thumbnail`, `onClick` |

**ProgressCard Schema:**

```yaml
ProgressCard:
  thumbnail: image
  title: string
  subtitle: string (category)
  progress: number (0-100)
  lastAccessed: datetime
  action: 'Tiếp tục học'
```

### ActivityList

| Element        | Type       | Props                                       |
| :------------- | :--------- | :------------------------------------------ |
| `ActivityItem` | `ListItem` | `icon`, `title`, `timestamp`, `description` |

**ActivityItem Schema:**

```yaml
ActivityItem:
  icon: "lesson" | "quiz" | "achievement" | "tournament"
  title: string
  description: string
  timestamp: datetime (relative, e.g. "2 giờ trước")
```

### CourseCards (Carousel)

| Element      | Type   | Props                                                   |
| :----------- | :----- | :------------------------------------------------------ |
| `CourseCard` | `Card` | `thumbnail`, `title`, `instructor`, `rating`, `onClick` |

**CourseCard Schema:**

```yaml
CourseCard:
  thumbnail: image
  title: string
  instructor: string
  rating: number (1-5)
  enrollCount: number
  action: 'Xem chi tiết'
```

---

## Data Requirements

| Data              | Source                         | Refresh                   |
| :---------------- | :----------------------------- | :------------------------ |
| `currentUser`     | Auth context                   | On mount                  |
| `progressList`    | `GET /api/user/progress`       | On mount, pull-to-refresh |
| `activityFeed`    | `GET /api/user/activity`       | On mount, 5 min interval  |
| `recommendations` | `GET /api/courses/recommended` | On mount                  |

---

## States

| State     | Trigger          | UI Changes                   |
| :-------- | :--------------- | :--------------------------- |
| `loading` | Initial load     | Skeleton placeholders        |
| `idle`    | Data loaded      | Show all sections            |
| `empty`   | No progress data | Show onboarding prompt       |
| `error`   | API failure      | Show error with retry button |

---

## Responsive

```yaml
mobile:
  Sidebar: hidden (hamburger menu)
  MainContent: single-column
  ProgressCards: vertical stack
  CourseCards: horizontal scroll
tablet:
  Sidebar: collapsed (icons only)
  MainContent: single-column
  ProgressCards: 2-column grid
desktop:
  Sidebar: expanded
  MainContent: full
  ProgressCards: 3-column grid
```
