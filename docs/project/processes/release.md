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

| Type  | Frequency          | Scope                          |
| ----- | ------------------ | ------------------------------ |
| Major | Hàng quý           | Tính năng mới, breaking changes |
| Minor | 2 tuần/lần (Sprint)| Tính năng mới, cải tiến        |
| Patch | Khi cần thiết      | Sửa lỗi, hotfixes              |

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

- [ ] Code freeze cho các tính năng trong sprint
- [ ] Tất cả PR đã được merge vào `develop`
- [ ] QA xác nhận (sign-off) trên staging
- [ ] Dự thảo Release notes
- [ ] Nâng version (bump version)

```bash

---

# Bump version
npm version minor

---

# Create release branch
git checkout -b release/v1.2.0
```

### 2. Release Candidate (T-1 day)

- [ ] Deploy lên staging
- [ ] Test hồi quy toàn diện (full regression test)
- [ ] Test hiệu năng (performance test)
- [ ] Quét bảo mật (security scan)
- [ ] Demo cho stakeholder

### 3. Production Release (T-0)

- [ ] Phê duyệt cuối cùng từ PO
- [ ] Merge vào `main`
- [ ] Tạo tag release

```bash
git checkout main
git merge release/v1.2.0
git tag v1.2.0
git push origin main --tags
```

- [ ] Deploy lên production
- [ ] Chạy smoke test trên production
- [ ] Giám sát (monitor) các vấn đề phát sinh

### 4. Post-Release

- [ ] Thông báo release
- [ ] Cập nhật tài liệu
- [ ] Đóng sprint/milestone
- [ ] Merge ngược từ `main` về `develop`

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

### Pre-Release (Trước khi Release)

- [ ] Tất cả story đã Done
- [ ] Code freeze
- [ ] Đã nâng version
- [ ] Cập nhật CHANGELOG
- [ ] Đã viết Release notes

### QA (Đảm bảo chất lượng)

- [ ] Đã deploy lên staging
- [ ] Vượt qua các bài test hồi quy (regression tests)
- [ ] Hiệu năng (performance) ổn định
- [ ] Vượt qua quét bảo mật (security scan)

### Release (Triển khai)

- [ ] PO phê duyệt
- [ ] Merge vào main
- [ ] Đã tạo tag
- [ ] Đã deploy lên production
- [ ] Vượt qua smoke test

### Post-Release (Sau khi Release)

- [ ] Giám sát (monitoring) ổn định
- [ ] Không có lỗi nghiêm trọng (critical issues)
- [ ] Đã thông báo cho team
- [ ] Tài liệu đã được cập nhật
```
