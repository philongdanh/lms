---
name: Plan and Task Review
description: Review workflow for plans and tasks ensuring SSoT compliance
---

# Plan and Task Review

Review workflow for plans and tasks to ensure SSoT compliance and documentation
consistency.

---

## SSoT Verification Checklist

### Before Creating New Documentation

| ✅  | Check                                                  |
| --- | ------------------------------------------------------ |
|     | Check if content already exists elsewhere              |
|     | Identify the authoritative source for this information |
|     | Determine correct directory based on content type      |
|     | Verify no conflicting information exists               |

### After Creating/Updating Documentation

| ✅  | Check                                           |
| --- | ----------------------------------------------- |
|     | Content matches upstream source (if referenced) |
|     | No duplicate content created                    |
|     | Links are valid and point to correct sources    |
|     | Downstream documents still accurate             |

---

## Cross-Reference Validation

### Check References

When a document references another:

1. **Verify source exists**: Linked document must exist
2. **Verify accuracy**: Referenced content matches source
3. **Check direction**: References should point upstream
   - `spec/` → `blueprint/`
   - `qa/` → `spec/`
   - `docs/` → `spec/` or `blueprint/`

### Update References

When modifying a source document:

1. Search for documents that reference it
2. Mark outdated references with `[NEEDS UPDATE]`
3. Update or notify owners of dependent documents

---

## Consistency Checks

### Front Matter Consistency

| Check                    | Valid                         |
| ------------------------ | ----------------------------- |
| `id` matches filename    | `auth.md` → `id: auth`        |
| `title` is English       | `title: Authentication`       |
| `sidebar_label` concise  | `sidebar_label: Auth`         |
| `sidebar_position` valid | Integer, unique within folder |

### Heading Consistency

| Check                      | Valid                                |
| -------------------------- | ------------------------------------ |
| Single H1                  | Only one `#` heading                 |
| H1 matches title           | `title: Auth` → `# Auth`             |
| H2 preceded by `---`       | `---\n\n## Section`                  |
| Language hierarchy correct | H1-H2: English, H3+: Vietnamese/Tech |

### Content Consistency

| Check                        | Action                                |
| ---------------------------- | ------------------------------------- |
| Tables use consistent format | Align columns, use backticks for code |
| D2 diagrams full English     | No Vietnamese in diagrams             |
| No HTML comments in D2       | Keep diagrams clean                   |
| Technical terms in backticks | `API`, `GraphQL`, `JWT`               |
| Content body in Vietnamese   | No full English content               |

---

## Review Workflow

### For New Documents

1. **Placement Review**
   - Correct directory?
   - Correct subdirectory?
   - Appropriate position?

2. **Structure Review**
   - Valid front matter?
   - Correct heading hierarchy?
   - Description after H1?
   - `---` before H2s?

3. **Content Review**
   - SSoT compliant?
   - No duplication?
   - References valid?

4. **Style Review**
   - Language rules followed?
   - Tables vs prose appropriate?
   - D2 diagrams for workflows?

### For Updates

1. **Impact Analysis**
   - What documents reference this?
   - What will break?

2. **Upstream Check**
   - Is source correct?
   - Should upstream be updated first?

3. **Downstream Update**
   - Which documents need updates?
   - Can updates be made now?

---

## Common Issues and Fixes

| Issue                             | Fix                             |
| --------------------------------- | ------------------------------- |
| Duplicate content                 | Remove duplicate, add link      |
| Missing `---` before H2           | Add horizontal rule             |
| Vietnamese in H1/H2               | Translate to English            |
| `_category_.json` has description | Remove description field        |
| Circular references               | Determine authoritative source  |
| Orphan documents                  | Add to sidebar or category      |
| Outdated references               | Update or mark `[NEEDS UPDATE]` |

---

## Task Planning Guidelines

### Breaking Down Work

When planning tasks:

1. **One concern per document**: Don't mix unrelated content
2. **Upstream first**: Plan blueprint changes before spec changes
3. **Batch related changes**: Update all affected documents together
4. **Note dependencies**: Document which files depend on which

### Task Descriptions

Include in task descriptions:

- **Objective**: What will be achieved
- **Documents affected**: List files to create/modify
- **Dependencies**: Prerequisites and blocking items
- **Verification**: How to confirm task is complete
