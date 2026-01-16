---
id: design-tokens
title: Design Tokens
sidebar_label: Tokens
---

# Design Tokens

Design tokens cho styling nhất quán.

---

## Colors

### Brand Colors

| Token | Value | Sử dụng |
|-------|-------|--------|
| `--color-primary` | #[hex] | Hành động chính |
| `--color-primary-dark` | #[hex] | Trạng thái hover |
| `--color-primary-light` | #[hex] | Backgrounds |
| `--color-secondary` | #[hex] | Hành động phụ |

### Semantic Colors

| Token | Value | Sử dụng |
|-------|-------|--------|
| `--color-success` | #22C55E | Trạng thái thành công |
| `--color-warning` | #F59E0B | Trạng thái cảnh báo |
| `--color-error` | #EF4444 | Trạng thái lỗi |
| `--color-info` | #3B82F6 | Trạng thái thông tin |

### Neutral Colors

| Token | Value | Sử dụng |
|-------|-------|--------|
| `--color-gray-50` | #F9FAFB | Backgrounds |
| `--color-gray-100` | #F3F4F6 | Hover |
| `--color-gray-200` | #E5E7EB | Borders |
| `--color-gray-500` | #6B7280 | Text mờ |
| `--color-gray-900` | #111827 | Text |

---

## Typography

### Font Family

| Token | Value | Usage |
|-------|-------|-------|
| `--font-sans` | Inter, system-ui | Body text |
| `--font-mono` | JetBrains Mono | Code |

### Font Sizes

| Token | Value | Line Height | Usage |
|-------|-------|-------------|-------|
| `--text-xs` | 12px | 16px | Labels |
| `--text-sm` | 14px | 20px | Body small |
| `--text-base` | 16px | 24px | Body |
| `--text-lg` | 18px | 28px | Body large |
| `--text-xl` | 20px | 28px | Heading |
| `--text-2xl` | 24px | 32px | Heading |
| `--text-3xl` | 30px | 36px | Heading |

### Font Weights

| Token | Value | Usage |
|-------|-------|-------|
| `--font-normal` | 400 | Body |
| `--font-medium` | 500 | Emphasis |
| `--font-semibold` | 600 | Headings |
| `--font-bold` | 700 | Strong |

---

## Spacing

### Scale

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

- [Guidelines](./guidelines.md)
- [Usability](../research/usability.md)
