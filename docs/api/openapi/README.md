---
id: openapi
title: OpenAPI Specifications
sidebar_label: OpenAPI
---

# OpenAPI Specifications

Tài liệu OpenAPI/Swagger specifications.

## Contents

| File | Mô tả |
|------|-------|
| [main.yaml](./main.yaml) | Tài liệu API chính |

## Guidelines

### File Organization

| Phương pháp | Trường hợp sử dụng |
|------------|---------------------|
| Single file | API nhỏ |
| Multi-file | API lớn sử dụng $ref |

### Naming Conventions

| Element | Convention | Ví dụ |
|---------|------------|-------|
| Paths | kebab-case | `/user-profiles` |
| Operations | HTTP verb | `get`, `post` |
| Schemas | PascalCase | `UserProfile` |
| Properties | camelCase | `firstName` |

## References

- [API Gateway](/specs/cross-cutting/api-gateway)
- [Contracts](../contracts.md)
