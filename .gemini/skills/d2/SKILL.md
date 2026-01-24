---
name: D2 Diagrams
description: D2 diagram conventions for technical documentation
---

# D2 Diagrams

Conventions for using D2 diagrams in technical documentation with remark-d2
plugin.

---

## Language Rules

### English Only

- **All text in English**: Labels, names, descriptions
- **No comments**: D2 renders comments, keep diagrams clean
- **Technical terms**: Use standard English technical terms

```d2
# Correct
User -> "Auth Service": login(credentials)
"Auth Service" -> Database: validate_user

# Incorrect - Vietnamese
User -> "Dịch vụ Auth": đăng nhập
```

---

## Diagram Types

### Sequence Diagrams

For workflows and interactions between components:

```d2
shape: sequence_diagram
User
"Auth Service"
Database

User -> "Auth Service": login(email, password)
"Auth Service" -> Database: validate_user
Database -> "Auth Service": user_record
"Auth Service" -> User: access_token
```

### Entity Relationship

For data models and relationships:

```d2
direction: right
User -> Role: has
User -> Session: has
User -> Tenant: belongs_to
```

### Flowcharts

For state machines and processes:

```d2
direction: right

New -> Triaged
Triaged -> InProgress
InProgress -> InReview
InReview -> Verified
Verified -> Closed
```

### Component Diagrams

For architecture and system design:

```d2
direction: right

Client -> Gateway: HTTP/GraphQL
Gateway -> Auth: validate
Gateway -> Learning: API
Gateway -> Tournament: API

Auth -> Redis: sessions
Learning -> PostgreSQL: data
Tournament -> PostgreSQL: data
```

---

## Styling Conventions

### Direction

- `direction: right` - Horizontal flow (default for most diagrams)
- `direction: down` - Vertical flow (for hierarchies)

### Naming

| Element Type | Format            | Example                    |
| ------------ | ----------------- | -------------------------- |
| Users/Actors | PascalCase        | `User`, `Admin`            |
| Services     | Quoted with space | `"Auth Service"`           |
| Databases    | PascalCase        | `Database`, `Redis`        |
| Actions      | snake_case        | `login()`, `validate_user` |
| States       | PascalCase        | `New`, `InProgress`        |

### Labels

Keep edge labels concise:

```d2
# Good
User -> Service: request()
Service -> User: response

# Avoid - too verbose
User -> Service: sends login request with credentials
```

---

## Integration with Docusaurus

### Fenced Code Blocks

Use triple backticks with `d2` language:

````markdown
```d2
shape: sequence_diagram
User
Server

User -> Server: request
Server -> User: response
```
````

### remark-d2 Configuration

The project uses these default options:

- Layout: `elk`
- Style: `sketch`
- Output: SVG

No additional configuration needed in documents.

---

## Common Patterns

### Module Lifecycle

```d2
shape: sequence_diagram

User
Service
Database
"Email Service"

User -> Service: register()
Service -> Database: create_user(status=PENDING)
Service -> "Email Service": send_verification()
User -> Service: verify_email(token)
Service -> Database: update(status=ACTIVE)
```

### API Flow

```d2
shape: sequence_diagram

Client
Gateway
Service
Database
Cache

Client -> Gateway: GraphQL query
Gateway -> Service: internal_call
Service -> Cache: check_cache
Cache -> Service: miss
Service -> Database: query
Database -> Service: data
Service -> Cache: set_cache
Service -> Gateway: result
Gateway -> Client: response
```

### Data Model

```d2
direction: right

Tenant -> User: 1:N
User -> UserRole: 1:N
User -> UserSession: 1:N
User -> Progress: 1:N
Progress -> Lesson: N:1
```

---

## Best Practices

| Status | Guideline                             |
| ------ | ------------------------------------- |
| ✅     | Use sequence diagrams for workflows   |
| ✅     | Use ER diagrams for data models       |
| ✅     | Keep diagrams focused on one concept  |
| ✅     | Use consistent naming across diagrams |
| ✅     | Quote names with spaces               |
| ❌     | Mix multiple workflows in one diagram |
| ❌     | Add Vietnamese text                   |
| ❌     | Use HTML comments                     |
| ❌     | Over-complicate with too many actors  |
| ❌     | Duplicate diagrams across documents   |
