---
id: release
title: Release Process
sidebar_label: Release
sidebar_position: 2
---

# Release Process

Quy trình release và deployment.

---

## Release Types

| Type | Frequency | Scope |
|------|-----------|-------|
| Major | Quarterly | New features, breaking changes |
| Minor | Bi-weekly (Sprint) | New features, enhancements |
| Patch | As needed | Bug fixes, hotfixes |

---

## Versioning

Sử dụng Semantic Versioning: `MAJOR.MINOR.PATCH`

```
v1.2.3
│ │ │
│ │ └── Patch: Bug fixes
│ └──── Minor: New features (backward compatible)
└────── Major: Breaking changes
```

---

## Release Process

### 1. Pre-Release (T-2 days)

- [ ] Code freeze cho sprint features
- [ ] All PRs merged to `develop`
- [ ] QA sign-off on staging
- [ ] Release notes drafted
- [ ] Version bumped

```bash

---

# Bump version
npm version minor

---

# Create release branch
git checkout -b release/v1.2.0
```

### 2. Release Candidate (T-1 day)

- [ ] Deploy to staging
- [ ] Full regression test
- [ ] Performance test
- [ ] Security scan
- [ ] Stakeholder demo

### 3. Production Release (T-0)

- [ ] Final approval from PO
- [ ] Merge to `main`
- [ ] Tag release

```bash
git checkout main
git merge release/v1.2.0
git tag v1.2.0
git push origin main --tags
```

- [ ] Deploy to production
- [ ] Smoke test production
- [ ] Monitor for issues

### 4. Post-Release

- [ ] Announce release
- [ ] Update documentation
- [ ] Close sprint/milestone
- [ ] Merge `main` back to `develop`

---

## Hotfix Process

Cho critical bugs trong production:

```bash

---

# 1. Create hotfix branch từ main
git checkout main
git checkout -b hotfix/v1.2.1

---

# 2. Fix và test

---

# ... fix code ...
npm version patch

---

# 3. Merge to main và deploy
git checkout main
git merge hotfix/v1.2.1
git tag v1.2.1

---

# 4. Merge to develop
git checkout develop
git merge hotfix/v1.2.1
```

---

## Rollback Procedure

Nếu release có issues:

### Option 1: Quick Rollback

```bash

---

# Revert to previous version
kubectl rollout undo deployment/lms-frontend
kubectl rollout undo deployment/lms-backend
```

### Option 2: Deploy Previous Tag

```bash

---

# Deploy specific version
./deploy.sh v1.1.0
```

### Rollback Criteria

- Critical bug affecting >10% users
- Data corruption risk
- Security vulnerability

---

## Environment Pipeline

```
┌─────────┐    ┌─────────┐    ┌──────────┐    ┌────────────┐
│   Dev   │ →  │ Staging │ →  │   UAT    │ →  │ Production │
└─────────┘    └─────────┘    └──────────┘    └────────────┘
     │              │              │                 │
  develop       release/*      release/*           main
     │              │              │                 │
  Auto CI      Auto CD        Manual          Manual + Approval
```

---

## Release Checklist Template

```markdown

---

## Release v1.x.x Checklist

### Pre-Release
- [ ] All stories Done
- [ ] Code freeze
- [ ] Version bumped
- [ ] CHANGELOG updated
- [ ] Release notes written

### QA
- [ ] Staging deployed
- [ ] Regression tests pass
- [ ] Performance OK
- [ ] Security scan OK

### Release
- [ ] PO approval
- [ ] Merge to main
- [ ] Tag created
- [ ] Production deployed
- [ ] Smoke test OK

### Post-Release
- [ ] Monitoring OK
- [ ] No critical issues
- [ ] Team notified
- [ ] Documentation updated
```
