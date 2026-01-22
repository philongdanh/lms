---
id: processes
title: Processes
sidebar_label: Processes
sidebar_position: 6
---

# Processes

Definition of Done và Release Process.

---

## Definition of Done

### Story DoD (Definition of Done)

Một User Story được coi là **Done** khi:

| Category | Criteria |
|----------|----------|
| **Code** | ✅ Triển khai theo requirements |
|  | ✅ TypeScript strict mode pass |
|  | ✅ Không lỗi ESLint |
| **Testing** | ✅ Unit tests pass (coverage ≥ 70%) |
|  | ✅ Manual testing done |
|  | ✅ Edge cases checked |
| **Review** | ✅ Code reviewed & approved |
|  | ✅ All comments resolved |
| **Deploy** | ✅ CI pipeline pass |
|  | ✅ Deployed to staging |
|  | ✅ Smoke test pass |
| **Acceptance** | ✅ PO reviewed & accepted |

### Sprint DoD

- ✅ Tất cả committed stories Done
- ✅ Đạt sprint goal
- ✅ Demo hoàn thành
- ✅ Retrospective done
- ✅ Không còn critical bugs

---

## Release Process

### Quy tắc đánh phiên bản

```
v1.2.3
│ │ │
│ │ └── Patch: Bug fixes
│ └──── Minor: New features
└────── Major: Breaking changes
```

### Loại Release

| Type | Frequency | Scope |
|------|-----------|-------|
| Major | Hàng quý | Breaking changes |
| Minor | 2 tuần/lần | New features |
| Patch | Khi cần | Bug fixes |

### Các bước Release

**Pre-Release (T-2 days)**
- ✅ Code freeze
- ✅ All PR merged to `develop`
- ✅ QA sign-off on staging
- ✅ Bump version

**Production (T-0)**
- ✅ PO approval
- ✅ Merge to `main`
- ✅ Create release tag
- ✅ Deploy to production
- ✅ Smoke test

### Quy trình Hotfix

```bash
# 1. Create hotfix branch từ main
git checkout -b hotfix/v1.2.1 main

# 2. Fix, test, bump patch version
npm version patch

# 3. Merge to main và develop
git checkout main && git merge hotfix/v1.2.1
git checkout develop && git merge hotfix/v1.2.1
```

---

## Environment Pipeline

```
Dev → Staging → UAT → Production
 │       │       │        │
develop  release/*  release/*   main
 │       │       │        │
Auto CI  Auto CD  Manual  Manual + Approval
```

---

## References

- [Contributing](./contributing.md)
- [Deployment](./deployment.md)
