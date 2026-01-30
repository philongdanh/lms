---
id: ssot-guide
title: SSoT Guide
sidebar_label: SSoT Guide
sidebar_position: 3
---

# SSoT Guide

Hướng dẫn duy trì Single Source of Truth (SSoT) trong dự án.

---

## Overview

SSoT (Single Source of Truth) là nguyên tắc mà mỗi đơn vị thông tin chỉ có **một
nguồn duy nhất** làm chuẩn. Tất cả các nơi khác đều **tham chiếu** tới nguồn đó.

### Lợi ích

- **Nhất quán**: Giảm thiểu thông tin mâu thuẫn
- **Dễ bảo trì**: Chỉ cần cập nhật một nơi
- **Dễ theo dõi**: Biết rõ nguồn gốc của mỗi định nghĩa

---

## SSoT structure

```d2
direction: down

blueprint: "blueprint/" {
  label: "Blueprint\n(Strategic)"
  architecture: "Architecture Decisions"
  product: "Product Vision"
}

spec: "spec/" {
  label: "Spec\n(Technical)"

  api: "api/" {
    graphql: "GraphQL Schemas"
    types: "High-level Types"
  }

  ui: "ui/" {
    frontend: "Frontend Specs"
  }

  modules: "modules/" {
    label: "Module Specs\n(Business Logic)"
  }
}

team: "team/" {
  label: "Team\n(Guides)"
  handbook: "Team Handbook"
  onboarding: "Developer Onboarding"
}

blueprint -> spec: "informs"
```

---

## Reference chain

### 1. Database schema (SSoT)

**Source**: `blueprint/architecture/database.md`

```
Blueprint (architecture/database.md)
    ↓
Spec (references Blueprint)
```

### 2. GraphQL API (SSoT)

**Source**: `spec/api/graphql/{module}/schema.graphql`

```
GraphQL Schema (SSoT)
    ↓
spec/modules/{module}.md (references with SSoT note)
    ↓
qa/cases/*.md (validates against module FRs)
```

### 3. File Upload (Presigned URL)

> File upload sử dụng **Presigned URL** - client upload trực tiếp lên Storage.
> Backend chỉ cung cấp signed URL qua GraphQL mutation.

---

## Rules for new features

### ✅ Đúng cách

1. **Định nghĩa SSoT trước**
   - Thêm GraphQL schema vào `spec/api/graphql/{module}/schema.graphql`
   - Thêm Prisma model vào `blueprint/architecture/database.md`

2. **Cập nhật Module Spec**
   - Thêm business logic flows với D2 diagrams
   - Reference SSoT với note: `> **SSoT**: [schema.graphql](...)`

3. **Thêm Test Cases**
   - Reference module FR IDs: `> **Validates**: [FR-XXX-01](...)`

### ❌ Sai cách

- Định nghĩa GraphQL inline trong module spec mà không reference SSoT
- Tạo types mới trong module spec thay vì `spec/api/types.md`
- Định nghĩa enums khác giá trị với Prisma schema

---

## SSoT review checklist

Khi review documentation changes, kiểm tra:

- [ ] Các thay đổi GraphQL schema đã được cập nhật trong `spec/api/graphql/`?
- [ ] Module specs đã có ghi chú tham chiếu SSoT?
- [ ] Các giá trị Enum khớp giữa Prisma, TypeScript, và GraphQL?
- [ ] Test cases có tham chiếu đúng FR IDs trong module specs?
- [ ] File upload sử dụng Presigned URL pattern?

---

## Directory structure

```
lms/
├── blueprint/           # Strategic decisions (informs spec)
│   ├── architecture/    # Technical architecture
│   └── product/         # Product vision & roadmap
│
├── spec/                # Specifications (SSoT)
│   ├── api/             # ★ API & Data SSoT
│   │   ├── graphql/     # GraphQL schemas per module
│   │   └── types.md     # TypeScript interfaces
│   ├── ui/              # Frontend Specs
│   │   └── frontend.md  # Frontend detailed specs
│   └── modules/         # Module specs (reference SSoT)
│
├── qa/                  # Quality Assurance
│   ├── cases/           # Test cases (validate specs)
│   └── strategy.md      # QA strategy
│
└── team/                # Guides & Onboarding
    ├── handbook/        # Team handbook
    └── onboarding/      # Developer onboarding
```

---

## References

- [System Design](../../blueprint/architecture/design.md) - Kiến trúc tổng thể
- [API Gateway](../../spec/api/gateway.md) - API standards
- [Type Definitions](../../spec/api/types.md) - Type definitions

---
