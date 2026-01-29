---
id: processes
title: Development Processes
sidebar_label: Processes
sidebar_position: 6
---

# Development Processes

Quy trình phát triển và tiêu chuẩn chất lượng.

---

## Workflow

### Git Flow

| Nhánh       | Mục đích         | Đặt tên              |
| ----------- | ---------------- | -------------------- |
| `main`      | Production       | -                    |
| `develop`   | Integration      | -                    |
| `feature/*` | New features     | `feature/auth-login` |
| `fix/*`     | Bug fixes        | `fix/login-redirect` |
| `hotfix/*`  | Production fixes | `hotfix/v1.2.1`      |

> **Mục đích (Why):** Đảm bảo tính ổn định của môi trường Production trong khi
> vẫn duy trì tốc độ phát triển tính năng mới song song.

**Commit Message Format:**

```
<type>(<scope>): <description>

Types: feat, fix, docs, style, refactor, test, chore
Example: feat(auth): add login with email
```

### Code Review

| Tiêu chí  | Yêu cầu         |
| --------- | --------------- |
| Approvers | 1 minimum       |
| CI Status | All checks pass |
| Coverage  | No decrease     |
| Comments  | All resolved    |

> **Mục đích (Why):** Chia sẻ kiến thức giữa các thành viên, phát hiện lỗi sớm
> và đảm bảo Code Quality đồng nhất.

**Definition of Done:**

| Danh mục | Tiêu chí                            |
| -------- | ----------------------------------- |
| Code     | TypeScript strict, no ESLint errors |
| Testing  | Unit tests pass (≥ 70% coverage)    |
| Review   | Code reviewed & approved            |
| Deploy   | CI pass, deployed to staging        |

---

## CI/CD

### Pipeline

```
Dev → Staging → UAT → Production
 │       │       │        │
develop  auto    manual   manual + approval
```

**Stages:**

| Giai đoạn        | Kích hoạt        | Hành động                     |
| ---------------- | ---------------- | ----------------------------- |
| Build            | Mỗi commit       | Install, lint, build          |
| Test             | Mỗi commit       | Unit tests, integration tests |
| Deploy (Staging) | Merge to develop | Auto deploy                   |
| Deploy (Prod)    | Release tag      | Manual + approval             |

### Release Process

| Loại  | Tần suất | Phạm vi          |
| ----- | -------- | ---------------- |
| Major | Quý      | Breaking changes |
| Minor | 2 tuần   | Tính năng mới    |
| Patch | Khi cần  | Sửa lỗi          |

---
