---
name: Spec-Driven Development
description:
  SSoT-focused documentation workflow for scrum teams with minimal approach
---

# Spec-Driven Development (SDD)

Core workflow for spec-driven development in scrum teams, ensuring Single Source
of Truth (SSoT) across all documentation.

---

## Documentation Hierarchy

The project follows a strict 4-tier documentation structure:

| Directory    | Purpose                        | Audience            | Position |
| ------------ | ------------------------------ | ------------------- | -------- |
| `blueprint/` | Strategy, vision, architecture | Stakeholders, Leads | 1        |
| `spec/`      | Technical specifications       | Developers, QA      | 2        |
| `qa/`        | Testing strategy and cases     | QA Team             | 3        |
| `docs/`      | User guides and handbooks      | End users, Team     | 4        |

### Directory Purposes

#### blueprint/

- **product/**: Vision, roadmap, backlog, constraints
- **architecture/**: System design, database, stack, ADRs

#### spec/

- **interface/**: UI components, API schemas, types
- **modules/**: Feature specifications (auth, learning, etc.)

#### qa/

- **strategy.md**: Overall QA approach
- **cases/**: Test cases by module

#### docs/

- **handbook/**: User guides, FAQ
- **onboarding/**: Setup, development, processes

---

## SSoT Principles

### Single Source of Truth Rules

1. **Define once, reference everywhere**: Each concept has ONE authoritative
   source
2. **Upstream first**: Changes flow from `blueprint/` → `spec/` → `qa/` →
   `docs/`
3. **No duplication**: Use links instead of copying content
4. **Traceability**: Specs reference blueprints, QA references specs

### Change Propagation

When making changes:

1. **Identify the source**: Find the authoritative document
2. **Update upstream first**: If the source is wrong, fix it first
3. **Propagate downstream**: Update dependent documents
4. **Mark outdated content**: If you can't update immediately, add
   `[NEEDS UPDATE]`

---

## Minimal Documentation Approach

### Write Only What's Needed

| Status | Guideline                               |
| ------ | --------------------------------------- |
| ✅     | Document decisions and their rationale  |
| ✅     | Document non-obvious behavior           |
| ✅     | Document public APIs and interfaces     |
| ❌     | Don't document obvious code             |
| ❌     | Don't duplicate framework documentation |
| ❌     | Don't write prose when a table suffices |

### Preferred Formats

| Content Type   | Format               |
| -------------- | -------------------- |
| Comparisons    | Tables               |
| Workflows      | D2 sequence diagrams |
| Data models    | D2 ER diagrams       |
| State machines | D2 flowcharts        |
| Lists          | Bullet points        |
| Rules          | Numbered lists       |

---

## Workflow for New Features

### 1. Blueprint Phase

Create or update documents in `blueprint/`:

- Update `roadmap.md` if new initiative
- Update `backlog.md` with user stories
- Add ADR in `architecture/decisions/` if architectural change

### 2. Spec Phase

Create specifications in `spec/`:

- Module spec in `modules/[module].md`
- Interface spec in `interface/` if UI changes
- Reference blueprint documents

### 3. QA Phase

Create test documentation in `qa/`:

- Update `strategy.md` if new testing approach
- Add test cases in `cases/[module].md`
- Reference spec documents

### 4. Docs Phase

Create user documentation in `docs/`:

- User guides in `handbook/`
- Development guides in `onboarding/`
- Reference where appropriate

---

## File Naming Conventions

- Use **kebab-case** for filenames: `user-registration.md`
- Use **descriptive names**: `auth.md` not `module1.md`
- Keep names **concise**: `vision.md` not `product-vision-document.md`
- Match **document id** with filename (without extension)
