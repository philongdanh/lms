---
id: wireframes
title: Wireframes
sidebar_label: Wireframes
sidebar_position: 4
---

# Wireframes
 
Biểu mẫu thiết kế sơ đồ và các kiểu bố cục giao diện.

---

## Overview

This document provides wireframe templates for common page layouts and UI
patterns.

---

## Structure

```
wireframes/
├── web/              # Web application wireframes
│   └── [screen].png
└── mobile/           # Mobile application wireframes
    └── [screen].png
```

---

## Page Layouts

### Dashboard Layout

```
┌─────────────────────────────────────────────────────────┐
│ Navbar                                                   │
├──────────┬──────────────────────────────────────────────┤
│          │                                               │
│ Sidebar  │  Main Content Area                           │
│          │  ┌─────────┐ ┌─────────┐ ┌─────────┐        │
│          │  │ Card 1  │ │ Card 2  │ │ Card 3  │        │
│          │  └─────────┘ └─────────┘ └─────────┘        │
│          │                                               │
│          │  ┌────────────────────────────────┐          │
│          │  │ Data Table / List              │          │
│          │  └────────────────────────────────┘          │
│          │                                               │
└──────────┴──────────────────────────────────────────────┘
```

### Form Layout

```
┌─────────────────────────────────────────────────────────┐
│ Page Title                                               │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────────────────────────┐            │
│  │ Form Section 1                           │            │
│  │                                          │            │
│  │ Label: [Input Field              ]       │            │
│  │ Label: [Input Field              ]       │            │
│  └─────────────────────────────────────────┘            │
│                                                          │
│  ┌─────────────────────────────────────────┐            │
│  │ Form Section 2                           │            │
│  │                                          │            │
│  │ Label: [Dropdown      ▼]                 │            │
│  │ Label: [Textarea                 ]       │            │
│  │        [                         ]       │            │
│  └─────────────────────────────────────────┘            │
│                                                          │
│  [Cancel]                        [Submit Button]        │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### List/Detail Layout

```
┌─────────────────────────────────────────────────────────┐
│ Navbar                                                   │
├──────────────────────┬──────────────────────────────────┤
│                      │                                   │
│ List Panel           │  Detail Panel                    │
│ ┌──────────────────┐ │  ┌─────────────────────────────┐│
│ │ [Search]         │ │  │ Item Title                  ││
│ └──────────────────┘ │  │ Subtitle / Meta             ││
│ ┌──────────────────┐ │  ├─────────────────────────────┤│
│ │ Item 1 (selected)│ │  │                             ││
│ ├──────────────────┤ │  │ Content Area                ││
│ │ Item 2           │ │  │                             ││
│ ├──────────────────┤ │  │                             ││
│ │ Item 3           │ │  └─────────────────────────────┘│
│ ├──────────────────┤ │                                   │
│ │ Item 4           │ │  [Action 1]  [Action 2]          │
│ └──────────────────┘ │                                   │
│                      │                                   │
└──────────────────────┴──────────────────────────────────┘
```

---

## Component Patterns

### Card Grid

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   Image     │  │   Image     │  │   Image     │
├─────────────┤  ├─────────────┤  ├─────────────┤
│ Title       │  │ Title       │  │ Title       │
│ Description │  │ Description │  │ Description │
│ [Action]    │  │ [Action]    │  │ [Action]    │
└─────────────┘  └─────────────┘  └─────────────┘
```

### Data Table

```
┌────────────────────────────────────────────────────────┐
│ [Search...        ] [Filter ▼] [Sort ▼]    [+ Add]    │
├────────┬──────────┬──────────┬──────────┬─────────────┤
│ □      │ Name ↑   │ Status   │ Date     │ Actions     │
├────────┼──────────┼──────────┼──────────┼─────────────┤
│ □      │ Item 1   │ Active   │ Jan 15   │ [···]       │
│ □      │ Item 2   │ Pending  │ Jan 14   │ [···]       │
│ □      │ Item 3   │ Inactive │ Jan 13   │ [···]       │
├────────┴──────────┴──────────┴──────────┴─────────────┤
│ Showing 1-3 of 50                    [< 1 2 3 ... >]  │
└───────────────────────────────────────────────────────┘
```

---

## Wireframe Standards

| Aspect      | Guideline                   |
| ----------- | --------------------------- |
| Fidelity    | Low to medium               |
| Color       | Grayscale only              |
| Content     | Lorem ipsum or real content |
| Annotations | Required for interactions   |

---

## File Naming

| Pattern                       | Example                     |
| ----------------------------- | --------------------------- |
| `[platform]-[screen]-[state]` | `web-dashboard-loading.png` |
| `[flow]-[step]`               | `onboarding-01-signup.png`  |

---

## Tools

| Tool       | Use Case             |
| ---------- | -------------------- |
| Figma      | Collaborative design |
| Excalidraw | Quick sketching      |
| Balsamiq   | Low-fi wireframes    |

---

## Checklist

- ✅ All main screens covered
- ✅ States documented (empty, loading, error)
- ✅ Responsive variants (mobile, tablet, desktop)
- ✅ Annotations added
- ✅ Stakeholder review completed

---

## References

- [Tokens](./tokens.md)
- [Components](./components.md)
- [Design Guide](/design-guide)
