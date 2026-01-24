---
name: Documentation Standards
description: Markdown file structure, front matter, and heading conventions
---

# Documentation Standards

Markdown file structure conventions for consistent documentation across the
project.

---

## Front Matter Standards

### Required Fields

Every markdown file must have YAML front matter with these fields:

```yaml
---
id: document-id # Matches filename (without .md)
title: Document Title # Full title in English
sidebar_label: Label # Concise label for sidebar
sidebar_position: 1 # Order within category
---
```

### Field Guidelines

| Field              | Format                | Example             |
| ------------------ | --------------------- | ------------------- |
| `id`               | kebab-case            | `user-registration` |
| `title`            | Title Case English    | `User Registration` |
| `sidebar_label`    | Concise English       | `Registration`      |
| `sidebar_position` | Integer starting at 1 | `1`                 |

### Optional Fields

Avoid adding optional fields unless necessary. Convention over configuration.

---

## Heading Structure

### Language Rules

| Level | Language   | Purpose                          |
| ----- | ---------- | -------------------------------- |
| H1    | English    | Document title (matches `title`) |
| H2    | English    | Major sections                   |
| H3+   | Vietnamese | Subsections and content          |

Technical terms in English are acceptable at all levels.

### H1 Format

```markdown
# Document Title

Concise description about this document's purpose.
```

- **One H1 per document** matching front matter `title`
- **Followed by description**: 1-2 sentences explaining what this document
  covers
- **No separator after description** before first H2

### H2 Format

```markdown
---

## Section Title
```

- **Always preceded by `---`** horizontal rule for visual separation
- **English only**: Keep section titles in English
- **Descriptive**: `Business Logic` not `Section 1`

### H3+ Format

```markdown
### Tiêu đề phụ

Nội dung chi tiết bằng tiếng Việt. Có thể sử dụng technical terms như `API`,
`database`, `authentication`.
```

- **Vietnamese preferred** for detailed content
- **Technical English terms** are acceptable and encouraged
- **No separator before H3+**

---

## Content Structure

### Standard Document Template

```markdown
---
id: example
title: Example Document
sidebar_label: Example
sidebar_position: 1
---

# Example Document

Brief description of what this document covers.

---

## First Section

### Chi tiết đầu tiên

Content here...

---

## Second Section

### Chi tiết thứ hai

More content...
```

### Tables Over Prose

Prefer tables for structured data:

```markdown
| Field   | Type     | Required | Description       |
| ------- | -------- | -------- | ----------------- |
| `id`    | `string` | Yes      | Unique identifier |
| `name`  | `string` | Yes      | Display name      |
| `email` | `string` | No       | Contact email     |
```

---

## Category Configuration

### _category_.json Format

```json
{
  "label": "Category Name",
  "position": 1
}
```

### Rules

- **No description field**: Keep minimal
- **No link field**: Unless generating index page
- **Label**: Concise English
- **Position**: Integer ordering

### When to Use Link

Only when category needs an index page:

```json
{
  "label": "Product",
  "position": 1,
  "link": {
    "type": "generated-index",
    "slug": "/blueprint/product"
  }
}
```

---

## Position Standards

### Default Positions by Directory

| Directory | Position | First Item Position         |
| --------- | -------- | --------------------------- |
| blueprint | 1        | product: 1, architecture: 2 |
| spec      | 2        | interface: 1, modules: 2    |
| qa        | 3        | strategy: 1, cases: 2       |
| docs      | 4        | handbook: 1, onboarding: 2  |

### Important Files Order

Within each category, order by importance:

1. Strategy/Vision documents first
2. Core functionality next
3. Supporting/utility last
