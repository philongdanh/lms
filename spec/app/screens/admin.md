---
id: admin
title: Admin Dashboard
sidebar_label: Admin
sidebar_position: 12
---

# Admin Dashboard

Đặc tả màn hình tổng quan quản trị.

---

## Overview

```yaml
route: /admin
layout: AdminLayout
access: Admin
```

---

## Screen Structure

### Hierarchy

```yaml
AdminDashboard:
  - PageHeader:
      - Title: 'Dashboard'
      - DateRangePicker: date-picker
  - StatsRow:
      - StatCard: card (repeatable)
  - ChartsSection:
      - UserGrowthChart: line-chart
      - CourseEngagementChart: bar-chart
  - RecentActivity:
      - SectionTitle: 'Hoạt động gần đây'
      - ActivityTable: table
```

---

## Components

### StatsRow

| Stat              | Icon        | Value                    | Label               |
| :---------------- | :---------- | :----------------------- | :------------------ |
| Total Users       | `users`     | `stats.totalUsers`       | "Người dùng"        |
| Active Today      | `activity`  | `stats.activeToday`      | "Hoạt động hôm nay" |
| New Registrations | `user-plus` | `stats.newRegistrations` | "Đăng ký mới"       |
| Revenue           | `dollar`    | `stats.revenue`          | "Doanh thu"         |

### ActivityTable

| Cột          | Mô tả              |
| :----------- | :----------------- |
| `Thời gian`  | Relative timestamp |
| `Người dùng` | User name + avatar |
| `Hành động`  | Action description |
| `Chi tiết`   | Action details     |

---

## Data Requirements

| Data             | Source                           | Refresh                  |
| :--------------- | :------------------------------- | :----------------------- |
| `stats`          | `GET /api/admin/stats`           | On mount, 5 min interval |
| `userGrowth`     | `GET /api/admin/analytics/users` | On mount                 |
| `recentActivity` | `GET /api/admin/activity`        | On mount, 1 min interval |

---

## Responsive

```yaml
mobile:
  StatsRow: 2x2 grid
  ChartsSection: stack-vertical
tablet:
  StatsRow: 4-column
desktop:
  ChartsSection: side-by-side
```
