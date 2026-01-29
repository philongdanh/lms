---
id: my-learning
title: My Learning Screen
sidebar_label: My Learning
sidebar_position: 7
---

# My Learning Screen

Đặc tả màn hình danh sách khóa học của người dùng.

---

## Overview

```yaml
route: /learning
layout: DashboardLayout
access: User
```

---

## Screen Structure

### Hierarchy

```yaml
MyLearningPage:
  - PageHeader:
      - Title: "Khóa học của tôi"
      - FilterTabs: tabs
  - CourseGrid:
      - CourseCard: card (repeatable)
  - EmptyState: (conditional)
      - Illustration: image
      - Message: text
      - ExploreButton: button[primary]
```

---

## Components

### FilterTabs

| Tab          | Filter               |
| :----------- | :------------------- |
| `Tất cả`     | No filter            |
| `Đang học`   | `status=in_progress` |
| `Hoàn thành` | `status=completed`   |
| `Lưu trữ`    | `status=archived`    |

### CourseCard

| Element          | Type          | Props                                   |
| :--------------- | :------------ | :-------------------------------------- |
| `Thumbnail`      | `Image`       | `src={course.thumbnail}`                |
| `Title`          | `Text`        | `variant="h4"`                          |
| `Progress`       | `ProgressBar` | `value={course.progress}`               |
| `LastAccessed`   | `Text`        | `variant="caption"`, relative time      |
| `ContinueButton` | `Button`      | `variant="primary"`, `label="Tiếp tục"` |

**CourseCard Schema:**

```yaml
CourseCard:
  id: string
  thumbnail: image
  title: string
  progress: number (0-100)
  lastAccessed: datetime
  totalLessons: number
  completedLessons: number
```

---

## States

| State      | Trigger      | UI Changes                        |
| :--------- | :----------- | :-------------------------------- |
| `loading`  | Initial load | Skeleton cards                    |
| `idle`     | Data loaded  | Show course grid                  |
| `empty`    | No courses   | Show empty state with explore CTA |
| `filtered` | Tab changed  | Show filtered results             |

---

## Actions

| Action           | Trigger              | Effect                      |
| :--------------- | :------------------- | :-------------------------- |
| `loadCourses`    | Mount                | `GET /api/user/courses`     |
| `filterCourses`  | Tab click            | Filter local data           |
| `continueCourse` | ContinueButton click | Navigate to `/learning/:id` |

---

## Responsive

```yaml
mobile:
  CourseGrid: single-column
tablet:
  CourseGrid: 2-column
desktop:
  CourseGrid: 3-column
```
