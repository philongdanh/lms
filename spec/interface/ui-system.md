---
id: ui-system
title: UI System
sidebar_label: UI System
sidebar_position: 2
---

# UI System

Tiêu chuẩn giao diện và mock data.

---

## OpenAPI Specification

### Naming Conventions

| Component  | Rule       | Example          |
| ---------- | ---------- | ---------------- |
| Paths      | kebab-case | `/user-profiles` |
| Operations | HTTP verb  | `get`, `post`    |
| Schemas    | PascalCase | `UserProfile`    |
| Properties | camelCase  | `firstName`      |

### Server Definitions

| Environment | URL                              |
| ----------- | -------------------------------- |
| Production  | `https://api.lms.com/v1`         |
| Staging     | `https://staging-api.lms.com/v1` |
| Development | `http://localhost:3000/v1`       |

---

## API Contracts

### Workflow

**Consumer Side:**

1. Viết consumer test để tạo contract
2. Publish contract lên Pact Broker
3. Chạy trên mỗi PR

**Provider Side:**

1. Lấy contract từ Pact Broker
2. Xác thực provider dựa trên contract
3. Chạy trên mỗi PR

### Tools

| Tool         | Purpose                     |
| ------------ | --------------------------- |
| Pact         | Framework kiểm thử contract |
| Pact Broker  | Lưu trữ contract            |
| can-i-deploy | Xác thực deploy an toàn     |

---

## Mock Data

### Setup Options

| Option                    | Use Case           |
| ------------------------- | ------------------ |
| MSW (Mock Service Worker) | Browser mocking    |
| JSON Server               | Simple REST API    |
| Prism                     | OpenAPI-based mock |

### Mock Scenarios

| Scenario        | Activation        |
| --------------- | ----------------- |
| Thành công      | Default response  |
| Danh sách trống | `?scenario=empty` |
| Lỗi             | `?scenario=error` |
| Phản hồi chậm   | `?scenario=slow`  |

---
