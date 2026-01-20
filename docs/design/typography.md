---
id: typography
title: Typography
sidebar_label: Typography
sidebar_position: 2
---

# Typography

Typography system and text styles.

---

## Font Families

| Token            | Value              | Usage     |
| ---------------- | ------------------ | --------- |
| `--font-sans`    | Inter, system-ui   | Body text |
| `--font-display` | Nunito, sans-serif | Headings  |
| `--font-mono`    | JetBrains Mono     | Code      |

---

## Font Sizes

| Token         | Value | Line Height | Usage            |
| ------------- | ----- | ----------- | ---------------- |
| `--text-xs`   | 12px  | 16px        | Captions, labels |
| `--text-sm`   | 14px  | 20px        | Secondary text   |
| `--text-base` | 16px  | 24px        | Body             |
| `--text-lg`   | 18px  | 28px        | Emphasis         |
| `--text-xl`   | 20px  | 28px        | Subheadings      |
| `--text-2xl`  | 24px  | 32px        | Headings         |
| `--text-3xl`  | 30px  | 36px        | Page titles      |
| `--text-4xl`  | 36px  | 40px        | Hero text        |

---

## Font Weights

| Token             | Value | Usage            |
| ----------------- | ----- | ---------------- |
| `--font-normal`   | 400   | Body text        |
| `--font-medium`   | 500   | Labels, emphasis |
| `--font-semibold` | 600   | Subheadings      |
| `--font-bold`     | 700   | Headings         |

---

## Text Styles

### Headings

| Level | Size          | Weight   | Font    | Usage          |
| ----- | ------------- | -------- | ------- | -------------- |
| H1    | `--text-4xl`  | Bold     | Display | Page titles    |
| H2    | `--text-3xl`  | Bold     | Display | Section titles |
| H3    | `--text-2xl`  | Semibold | Display | Subsections    |
| H4    | `--text-xl`   | Semibold | Sans    | Card titles    |
| H5    | `--text-lg`   | Medium   | Sans    | Small headings |
| H6    | `--text-base` | Medium   | Sans    | Labels         |

### Body Text

| Style      | Size          | Weight | Usage             |
| ---------- | ------------- | ------ | ----------------- |
| Body Large | `--text-lg`   | Normal | Lead paragraphs   |
| Body       | `--text-base` | Normal | Default content   |
| Body Small | `--text-sm`   | Normal | Secondary content |
| Caption    | `--text-xs`   | Normal | Labels, hints     |

### Special Styles

| Style | Properties                                   | Usage          |
| ----- | -------------------------------------------- | -------------- |
| Link  | `color: primary; text-decoration: underline` | Clickable text |
| Code  | `font-mono; background: muted`               | Inline code    |
| Quote | `italic; border-left: 4px`                   | Block quotes   |

---

## Responsive Typography

| Breakpoint | Base Size | Scale |
| ---------- | --------- | ----- |
| Mobile     | 14px      | 1.2   |
| Tablet     | 15px      | 1.25  |
| Desktop    | 16px      | 1.25  |
| Large      | 16px      | 1.333 |

---

## Guidelines

### Do's

- Use heading hierarchy (H1 → H6)
- Maintain consistent line heights
- Use proper contrast for readability
- Limit line length to 65-75 characters

### Don'ts

- Skip heading levels
- Use more than 3 font sizes per page
- Use light fonts on light backgrounds
- Justify text (use left-align)

---

## References

- [Tokens](./tokens.md)
- [Components](./components.md)
