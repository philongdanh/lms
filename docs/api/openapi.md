---
id: openapi
title: OpenAPI Specification
sidebar_label: OpenAPI
sidebar_position: 1
---

# OpenAPI Specification

OpenAPI/Swagger specifications documentation.

---

## Overview

This document describes the OpenAPI specification structure and guidelines.

---

## Contents

OpenAPI specification files are stored in `static/openapi/` directory.

---

## Base Structure

| Section      | Purpose                                    |
| ------------ | ------------------------------------------ |
| `info`       | API metadata (title, version, description) |
| `servers`    | API server URLs (prod, staging, dev)       |
| `tags`       | Endpoint grouping                          |
| `paths`      | Endpoint definitions                       |
| `components` | Reusable schemas, parameters, responses    |
| `security`   | Authentication requirements                |

---

## File Organization

| Approach    | Use Case              |
| ----------- | --------------------- |
| Single file | Small APIs            |
| Multi-file  | Large APIs using $ref |

---

## Naming Conventions

| Element    | Convention | Example          |
| ---------- | ---------- | ---------------- |
| Paths      | kebab-case | `/user-profiles` |
| Operations | HTTP verb  | `get`, `post`    |
| Schemas    | PascalCase | `UserProfile`    |
| Properties | camelCase  | `firstName`      |

---

## Server Definitions

| Environment | URL Pattern                      | Description       |
| ----------- | -------------------------------- | ----------------- |
| Production  | `https://api.lms.com/v1`         | Live API          |
| Staging     | `https://staging-api.lms.com/v1` | Pre-production    |
| Development | `http://localhost:3000/v1`       | Local development |

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

| Attribute        | Value             |
| ---------------- | ----------------- |
| Path             | `/resources/{id}` |
| Operation ID     | `getResource`     |
| Parameters       | `id` (path)       |
| Success Response | 200 with object   |
| Error Response   | 404 Not Found     |

### POST Create

| Attribute        | Value            |
| ---------------- | ---------------- |
| Path             | `/resources`     |
| Operation ID     | `createResource` |
| Request Body     | Required         |
| Success Response | 201 Created      |
| Error Response   | 400 Bad Request  |

### PUT Update

| Attribute        | Value             |
| ---------------- | ----------------- |
| Path             | `/resources/{id}` |
| Operation ID     | `updateResource`  |
| Parameters       | `id` (path)       |
| Request Body     | Required          |
| Success Response | 200 Updated       |
| Error Response   | 404 Not Found     |

### DELETE

| Attribute        | Value             |
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
- [API Gateway](../specs/01-architecture/cross-cutting/api-gateway.md)
