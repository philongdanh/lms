---
id: components
title: Component Guidelines
sidebar_label: Components
sidebar_position: 3
---

# Component Guidelines

UI component design guidelines and patterns.

---

## Component Anatomy

### Standard Component

```
┌─────────────────────────────┐
│  [Icon]  Label              │  ← Content
│                             │
│  Description or helper text │  ← Helper text
└─────────────────────────────┘
```

### States

| State | Visual Treatment |
|-------|------------------|
| Default | Base styles |
| Hover | Subtle highlight |
| Focus | Focus ring |
| Active | Pressed effect |
| Disabled | Reduced opacity |
| Loading | Spinner/skeleton |
| Error | Error border/text |

---

## Buttons

### Variants

| Variant | Usage | Example |
|---------|-------|---------|
| Primary | Main actions | Submit, Save |
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

## Forms

### Input Fields

| Guideline | Description |
|-----------|-------------|
| Labels | Always visible, above input |
| Placeholders | Example text, not labels |
| Validation | Inline errors below field |
| Required | Asterisk (*) indicator |
| Help text | Below input, muted color |

### Input States

| State | Border | Background | Label |
|-------|--------|------------|-------|
| Default | Gray-200 | White | Gray-500 |
| Focus | Primary | White | Primary |
| Error | Error | White | Error |
| Disabled | Gray-100 | Gray-50 | Gray-400 |

### Input Sizes

| Size | Height | Usage |
|------|--------|-------|
| Small | 32px | Compact forms |
| Medium | 40px | Default |
| Large | 48px | Touch-friendly |

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

### Card Variants

| Variant | Usage |
|---------|-------|
| Default | Standard content card |
| Elevated | Prominent content |
| Outlined | Subtle separation |
| Interactive | Clickable cards (hover state) |

### Card Properties

| Property | Value |
|----------|-------|
| Padding | `--space-4` to `--space-6` |
| Border Radius | `--radius-lg` |
| Shadow | `--shadow-md` |
| Border | Optional `--border` |

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

| Element | Style |
|---------|-------|
| Header | Bold, background muted |
| Row | Alternating backgrounds (optional) |
| Cell Padding | `--space-3` x `--space-4` |
| Border | Bottom border only |

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

| Property | Value |
|----------|-------|
| Width | 240px (expanded), 64px (collapsed) |
| Position | Fixed left |
| Background | `--background` |

---

## Feedback Components

### Alerts

| Type | Color | Icon | Usage |
|------|-------|------|-------|
| Info | Blue | ℹ️ | Information |
| Success | Green |  | Confirmation |
| Warning | Yellow | ️ | Caution |
| Error | Red |  | Errors |

### Toasts

| Property | Value |
|----------|-------|
| Position | Top-right or bottom-right |
| Duration | 3-5 seconds |
| Max Width | 400px |

---

## Responsive Breakpoints

| Name | Width | Target |
|------|-------|--------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large desktop |
| `2xl` | 1536px | Wide screens |

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Color contrast | 4.5:1 minimum |
| Focus indicators | Visible ring on focus |
| Alt text | All images |
| Keyboard navigation | Full support |
| Screen readers | Semantic HTML, ARIA |

---

## References

- [Tokens](./tokens.md)
- [Typography](./typography.md)
