---
id: admin-content
title: Content Management
sidebar_label: Content
sidebar_position: 14
---

# Content Management

Đặc tả màn hình quản lý nội dung.

> **SSoT**: [Backlog](../../../blueprint/product/backlog.md)

---

## Overview

```yaml
route: /admin/content
layout: AdminLayout
access: Admin
```

---

## Screen Structure

### Hierarchy

```yaml
ContentManagementPage:
  - PageHeader:
      - Title: 'Quản lý nội dung'
      - AddContentButton: button[primary]
  - ContentTabs:
      - Tab: 'Khóa học'
      - Tab: 'Bài học'
      - Tab: 'Câu hỏi'
  - FilterBar:
      - SearchInput: input[type=search]
      - CategoryFilter: select
      - StatusFilter: select
  - ContentTable:
      - columns: [thumbnail, title, category, status, createdAt, actions]
      - pagination: true
```

---

## Components

### ContentTabs

| Tab        | Content Type | API Endpoint           |
| :--------- | :----------- | :--------------------- |
| `Khóa học` | Courses      | `/api/admin/courses`   |
| `Bài học`  | Lessons      | `/api/admin/lessons`   |
| `Câu hỏi`  | Questions    | `/api/admin/questions` |

### ContentTable (Courses view)

| Cột          | Field              | Sortable |
| :----------- | :----------------- | :------- |
| `Thumbnail`  | `course.thumbnail` | No       |
| `Tiêu đề`    | `course.title`     | Yes      |
| `Danh mục`   | `course.category`  | Yes      |
| `Trạng thái` | `course.status`    | Yes      |
| `Ngày tạo`   | `course.createdAt` | Yes      |
| `Thao tác`   | Actions dropdown   | No       |

### Actions

| Action      | Effect                                   |
| :---------- | :--------------------------------------- |
| `Chỉnh sửa` | Navigate to content editor               |
| `Xuất bản`  | `PUT /api/admin/courses/:id/publish`     |
| `Ẩn`        | `PUT /api/admin/courses/:id/unpublish`   |
| `Xóa`       | Confirm, `DELETE /api/admin/courses/:id` |

---

## States

| State     | Trigger           | UI Changes                    |
| :-------- | :---------------- | :---------------------------- |
| `loading` | Tab/filter change | Table skeleton                |
| `idle`    | Data loaded       | Show table                    |
| `empty`   | No results        | Show empty state with add CTA |

---

## Responsive

```yaml
mobile:
  ContentTable: card-list view
tablet:
  ContentTable: horizontal scroll
desktop:
  ContentTable: full table
```
