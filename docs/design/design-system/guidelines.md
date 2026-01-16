---
id: component-guidelines
title: Component Guidelines
sidebar_label: Guidelines
---

# Component Guidelines

Hướng dẫn thiết kế và sử dụng components.

---

## Component Anatomy

### Standard Component

```
┌─────────────────────────────┐
│  [Icon]  Label              │  ← Nội dung
│                             │
│  Description or helper text │  ← Text hỗ trợ
└─────────────────────────────┘
```

### States

| Trạng thái | Xử lý trực quan |
|------------|-----------------|
| Default | Styles cơ bản |
| Hover | Highlight nhẹ |
| Focus | Focus ring |
| Active | Hiệu ứng nhấn |
| Disabled | Giảm opacity |
| Loading | Spinner/skeleton |
| Error | Border/text lỗi |

---

## Buttons

### Variants

| Variant | Sử dụng | Ví dụ |
|---------|---------|-------|
| Primary | Hành động chính | Submit, Save |
| Secondary | Alternative actions | Cancel |
| Outline | Tertiary actions | Edit |
| Ghost | Subtle actions | Close |
| Destructive | Dangerous actions | Delete |

### Sizes

| Size | Height | Padding | Font |
|------|--------|---------|------|
| Small | 32px | 12px | 14px |
| Medium | 40px | 16px | 14px |
| Large | 48px | 24px | 16px |

### Guidelines

- Use one primary button per section
- Label with action verbs
- Include loading state for async actions
- Disable during form submission

---

## Form Inputs

### Text Input

| State | Border | Background | Label |
|-------|--------|------------|-------|
| Default | Gray-200 | White | Gray-500 |
| Focus | Primary | White | Primary |
| Error | Error | White | Error |
| Disabled | Gray-100 | Gray-50 | Gray-400 |

### Guidelines

- Always include labels
- Show validation inline
- Use placeholder text sparingly
- Group related fields

---

## Cards

### Structure

```
┌─────────────────────────────┐
│ Header (optional)           │
├─────────────────────────────┤
│                             │
│ Content                     │
│                             │
├─────────────────────────────┤
│ Footer/Actions (optional)   │
└─────────────────────────────┘
```

### Variants

| Variant | Usage |
|---------|-------|
| Default | General content |
| Interactive | Clickable cards |
| Selected | Multi-select |

---

## Modals

### Structure

```
┌─────────────────────────────┐
│ Title              [Close]  │
├─────────────────────────────┤
│                             │
│ Content                     │
│                             │
├─────────────────────────────┤
│           [Cancel] [Action] │
└─────────────────────────────┘
```

### Sizes

| Size | Width | Usage |
|------|-------|-------|
| Small | 400px | Confirmations |
| Medium | 600px | Forms |
| Large | 800px | Complex content |

### Guidelines

- Focus trap within modal
- Close on Escape key
- Close on backdrop click (optional)
- Use sparingly

---

## Tables

### Structure

| Element | Guidelines |
|---------|------------|
| Header | Fixed, sortable columns |
| Row | Zebra striping (optional) |
| Cell | Consistent alignment |
| Actions | End of row |

### Features

- [ ] Sorting
- [ ] Filtering
- [ ] Pagination
- [ ] Selection
- [ ] Resizable columns

---

## Navigation

### Top Navigation

| Element | Usage |
|---------|-------|
| Logo | Brand, home link |
| Links | Primary navigation |
| Search | Global search |
| User menu | Account actions |

### Sidebar Navigation

| Element | Usage |
|---------|-------|
| Logo | Brand |
| Nav items | Primary sections |
| Nested items | Sub-sections |
| Footer | Settings, help |

---

## Feedback Components

### Alerts

| Type | Color | Icon | Usage |
|------|-------|------|-------|
| Info | Blue | ℹ️ | Information |
| Success | Green | ✓ | Confirmation |
| Warning | Yellow | ⚠️ | Caution |
| Error | Red | ✕ | Errors |

### Toasts

| Guideline | Value |
|-----------|-------|
| Position | Top-right |
| Duration | 5 seconds |
| Max visible | 3 |
| Dismissible | Yes |

---

## Icons

### Sizing

| Size | Pixels | Usage |
|------|--------|-------|
| XS | 12px | Inline |
| SM | 16px | Buttons |
| MD | 20px | Default |
| LG | 24px | Headers |
| XL | 32px | Features |

### Guidelines

- Use consistent icon set
- Include accessible labels
- Match stroke width
- Align to pixel grid

---

## References

- [Tokens](./tokens.md)
- [Usability](../research/usability.md)
