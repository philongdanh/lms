---
id: openapi
title: OpenAPI Specification
sidebar_label: OpenAPI
sidebar_position: 1
---

# OpenAPI Specification
 
Tài liệu đặc tả các giao diện lập trình theo chuẩn OpenAPI.

---

## Contents

Các file đặc tả OpenAPI được lưu trữ trong thư mục `static/openapi/`.

---

## Base Structure

| Section      | Purpose                                        |
| ------------ | ---------------------------------------------- |
| `info`       | Metadata của API (title, version, description) |
| `servers`    | URL của API server (prod, staging, dev)        |
| `tags`       | Nhóm các endpoint                              |
| `paths`      | Định nghĩa các endpoint                        |
| `components` | Reusable schemas, parameters, responses        |
| `security`   | Yêu cầu xác thực                               |

---

## File Organization

| Method      | Use Case             |
| ----------- | -------------------- |
| Single file | API nhỏ              |
| Multi-file  | API lớn sử dụng $ref |

---

## Naming Conventions

| Component  | Rule       | Example          |
| ---------- | ---------- | ---------------- |
| Paths      | kebab-case | `/user-profiles` |
| Operations | HTTP verb  | `get`, `post`    |
| Schemas    | PascalCase | `UserProfile`    |
| Properties | camelCase  | `firstName`      |

---

## Server Definitions

| Environment | URL Structure                    | Description           |
| ----------- | -------------------------------- | --------------------- |
| Production  | `https://api.lms.com/v1`         | API chính thức        |
| Staging     | `https://staging-api.lms.com/v1` | Môi trường thử nghiệm |
| Development | `http://localhost:3000/v1`       | Phát triển tại máy lẻ |

---

## Path Operations

### GET List

| Attribute        | Value                   |
| ---------------- | ----------------------- |
| Path             | `/resources`            |
| Operation ID     | `listResources`         |
| Parameters       | `page`, `limit`, `sort` |
| Success Response | 200 with array          |
| Error Response   | 401 Unauthorized        |

### GET Single

| Thuộc tính       | Giá trị           |
| ---------------- | ----------------- |
| Path             | `/resources/{id}` |
| Operation ID     | `getResource`     |
| Parameters       | `id` (path)       |
| Success Response | 200 with object   |
| Error Response   | 404 Not Found     |

### POST Create

| Thuộc tính       | Giá trị          |
| ---------------- | ---------------- |
| Path             | `/resources`     |
| Operation ID     | `createResource` |
| Request Body     | Required         |
| Success Response | 201 Created      |
| Error Response   | 400 Bad Request  |

### PUT Update

| Thuộc tính       | Giá trị           |
| ---------------- | ----------------- |
| Path             | `/resources/{id}` |
| Operation ID     | `updateResource`  |
| Parameters       | `id` (path)       |
| Request Body     | Required          |
| Success Response | 200 Updated       |
| Error Response   | 404 Not Found     |

### DELETE

| Thuộc tính       | Giá trị           |
| ---------------- | ----------------- |
| Path             | `/resources/{id}` |
| Operation ID     | `deleteResource`  |
| Parameters       | `id` (path)       |
| Success Response | 204 No Content    |
| Error Response   | 404 Not Found     |

---

## References

- [Contracts](./contracts.md)
- [Mocks](./mocks.md)
- [API Gateway](../specs/01-arch/common/gateway.md)
