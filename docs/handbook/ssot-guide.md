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

## SSoT Structure

```d2
direction: down

blueprint: "blueprint/" {
  label: "Blueprint\n(Strategic)"
  architecture: "Architecture Decisions"
  product: "Product Vision"
}

spec: "spec/" {
  label: "Spec\n(Technical)"

  interface: "interface/" {
    graphql: "GraphQL Schemas"
    types: "High-level Types"
  }

  modules: "modules/" {
    label: "Module Specs\n(Business Logic)"
  }
}

docs: "docs/" {
  label: "Docs\n(Guides)"
  handbook: "Team Handbook"
  onboarding: "Developer Onboarding"
}

blueprint -> spec: "informs"
```

---

## Reference Chain

### 1. Database Schema (SSoT)

**Source**: `blueprint/architecture/database.md`

```
Blueprint (architecture/database.md)
    ↓
Spec (references Blueprint)
```

### 2. GraphQL API (SSoT)

**Source**: `spec/interface/graphql/{module}/schema.graphql`

```
GraphQL Schema (SSoT)
    ↓
spec/modules/{module}.md (references with SSoT note)
    ↓
qa/cases/*.md (validates against module FRs)
```

### 3. REST API (SSoT)

**Source**: `spec/interface/rest/openapi.yaml`

> REST API chỉ dùng cho **Health Check**, **File Upload**, và **Webhooks**.
> Business logic sử dụng GraphQL.

---

## Rules for New Features

### ✅ Đúng cách

1. **Định nghĩa SSoT trước**
   - Thêm GraphQL schema vào `spec/interface/graphql/{module}/schema.graphql`
   - Thêm Prisma model vào `spec/interface/schema.md`

2. **Cập nhật Module Spec**
   - Thêm business logic flows với D2 diagrams
   - Reference SSoT với note: `> **SSoT**: [schema.graphql](...)`

3. **Thêm Test Cases**
   - Reference module FR IDs: `> **Validates**: [FR-XXX-01](...)`

### ❌ Sai cách

- Định nghĩa GraphQL inline trong module spec mà không reference SSoT
- Tạo types mới trong module spec thay vì `spec/interface/types.md`
- Định nghĩa enums khác giá trị với Prisma schema

---

## SSoT Review Checklist

Khi review documentation changes, kiểm tra:

- [ ] GraphQL schema changes đã update trong `spec/interface/graphql/`?
- [ ] Module specs có SSoT reference notes?
- [ ] Enum values match giữa Prisma, TypeScript, và GraphQL?
- [ ] Test cases reference đúng FR IDs trong module specs?
- [ ] REST endpoints chỉ dùng cho Health/Upload/Webhooks?

---

## Directory Structure

```
lms/
├── blueprint/           # Strategic decisions (informs spec)
│   ├── architecture/    # Technical architecture
│   └── product/         # Product vision & roadmap
│
├── spec/                # Specifications (SSoT)
│   ├── interface/       # ★ API & Data SSoT
│   │   ├── graphql/     # GraphQL schemas per module
│   │   ├── rest/        # OpenAPI for REST endpoints
│   │   ├── schema.md    # ★ Prisma schema (Database SSoT)
│   │   └── types.md     # TypeScript interfaces
│   └── modules/         # Module specs (reference SSoT)
│
├── qa/                  # Quality Assurance
│   ├── cases/           # Test cases (validate specs)
│   └── strategy.md      # QA strategy
│
└── docs/                # Guides & Onboarding
    ├── handbook/        # Team handbook
    └── onboarding/      # Developer onboarding
```

---

## References

- [System Design](../../blueprint/architecture/design.md) - Kiến trúc tổng thể
- [Gateway Standards](../../spec/interface/gateway.md) - API standards
- [TypeScript Types](../../spec/interface/types.md) - Type definitions

---
