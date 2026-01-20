---
id: tokens
title: Design Tokens
sidebar_label: Tokens
sidebar_position: 1
---

# Design Tokens

Design tokens for consistent styling.

---

## Color Palette

### Brand Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | #3B82F6 | Primary actions |
| `--color-primary-dark` | #2563EB | Hover states |
| `--color-primary-light` | #DBEAFE | Backgrounds |
| `--color-secondary` | #6366F1 | Secondary actions |

### Semantic Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-success` | #22C55E | Success states |
| `--color-warning` | #F59E0B | Warning states |
| `--color-error` | #EF4444 | Error states |
| `--color-info` | #3B82F6 | Info states |

### Neutral Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-gray-50` | #F9FAFB | Backgrounds |
| `--color-gray-100` | #F3F4F6 | Hover |
| `--color-gray-200` | #E5E7EB | Borders |
| `--color-gray-500` | #6B7280 | Muted text |
| `--color-gray-900` | #111827 | Text |

### Priority Colors

| Priority | Hex | Usage |
|----------|-----|-------|
| P0 - Critical | `#DC2626` | Must have for MVP |
| P1 - High | `#F97316` | Should have for MVP |
| P2 - Medium | `#EAB308` | Nice to have |
| P3 - Low | `#22C55E` | Future consideration |

### Type Colors

| Type | Hex | Usage |
|------|-----|-------|
| Frontend FE | `#3B82F6` | UI/UX implementation |
| Backend BE | `#8B5CF6` | API/Database work |
| Full-stack FS | `#6366F1` | Both FE and BE |
| DevOps DO | `#14B8A6` | Infrastructure |

### Difficulty Colors

| Difficulty | Hex | Points |
|------------|-----|--------|
| Easy | `#22C55E` | 1-2 pts |
| Medium | `#F59E0B` | 3-5 pts |
| Hard | `#EF4444` | 8-13 pts |

---

## Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight spacing |
| `--space-2` | 8px | Default gap |
| `--space-3` | 12px | Medium gap |
| `--space-4` | 16px | Section gap |
| `--space-6` | 24px | Large gap |
| `--space-8` | 32px | Section padding |
| `--space-12` | 48px | Page sections |
| `--space-16` | 64px | Page padding |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-none` | 0 | Sharp corners |
| `--radius-sm` | 4px | Small elements |
| `--radius-md` | 8px | Default |
| `--radius-lg` | 12px | Cards |
| `--radius-xl` | 16px | Modals |
| `--radius-full` | 9999px | Pills, avatars |

---

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | 0 1px 2px rgba(0,0,0,0.05) | Subtle |
| `--shadow-md` | 0 4px 6px rgba(0,0,0,0.1) | Cards |
| `--shadow-lg` | 0 10px 15px rgba(0,0,0,0.1) | Dropdowns |
| `--shadow-xl` | 0 20px 25px rgba(0,0,0,0.1) | Modals |

---

## Z-Index

| Token | Value | Usage |
|-------|-------|-------|
| `--z-dropdown` | 1000 | Dropdowns |
| `--z-sticky` | 1100 | Sticky headers |
| `--z-modal` | 1200 | Modals |
| `--z-popover` | 1300 | Popovers |
| `--z-tooltip` | 1400 | Tooltips |
| `--z-toast` | 1500 | Toast notifications |

---

## Breakpoints

| Token | Value | Usage |
|-------|-------|-------|
| `--screen-sm` | 640px | Mobile |
| `--screen-md` | 768px | Tablet |
| `--screen-lg` | 1024px | Desktop |
| `--screen-xl` | 1280px | Large desktop |
| `--screen-2xl` | 1536px | Extra large |

---

## Animation

### Duration

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-fast` | 100ms | Hover states |
| `--duration-normal` | 200ms | Default |
| `--duration-slow` | 300ms | Complex animations |

### Easing

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-in` | cubic-bezier(0.4, 0, 1, 1) | Exit |
| `--ease-out` | cubic-bezier(0, 0, 0.2, 1) | Enter |
| `--ease-in-out` | cubic-bezier(0.4, 0, 0.2, 1) | Default |

---

## References

- [Typography](./typography.md)
- [Components](./components.md)
