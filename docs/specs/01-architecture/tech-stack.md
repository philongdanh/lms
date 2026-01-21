---
id: tech-stack
title: Technology Stack
sidebar_label: Tech Stack
sidebar_position: 2
---

# Technology Stack

Lựa chọn công nghệ và tiêu chuẩn thực thi.

---

| Layer    | Tech            | Version | Purpose                       |
| -------- | --------------- | ------- | ----------------------------- |
| Backend  | NestJS          | Latest  | API Server, WebSocket Gateway |
| Frontend | Next.js + React | Latest  | Web UI với SSR/SSG            |
| Database | PostgreSQL      | 15+     | Lưu trữ dữ liệu chính         |
| Cache    | Redis           | 7+      | Session, caching, Pub/Sub     |
| Queue    | Bull + Redis    | Latest  | Xử lý bất đồng bộ             |

---

## Backend

### Runtime & Framework

| Component | Tech        | Rationale                                                |
| --------- | ----------- | -------------------------------------------------------- |
| Runtime   | Node.js 20+ | Hiệu năng cao, TypeScript support tốt, ecosystem lớn     |
| Framework | NestJS      | Kiến trúc module, dependency injection, enterprise-ready |
| ORM       | Prisma      | Type-safe, migration tốt, schema-first approach          |

### Thư viện chính

| Library         | Purpose                   | Version |
| --------------- | ------------------------- | ------- |
| Socket.IO       | WebSocket real-time       | Latest  |
| Passport        | Authentication strategies | Latest  |
| Bull            | Job queue processing      | Latest  |
| class-validator | Request validation        | Latest  |

---

## Frontend

### Framework & Build

| Component        | Tech                    | Rationale                         |
| ---------------- | ----------------------- | --------------------------------- |
| Framework        | Next.js + React         | SSR/SSG, SEO tốt, performance cao |
| Build Tool       | Turbopack (via Next.js) | Build nhanh, HMR hiệu quả         |
| State Management | React Context + Zustand | Đơn giản, nhẹ, đủ cho use case    |

### Thư viện UI

| Library          | Purpose               | Version |
| ---------------- | --------------------- | ------- |
| HeroUI           | Component library     | Latest  |
| TailwindCSS      | Utility-first styling | 3.x     |
| Socket.IO Client | WebSocket client      | Latest  |

---

## Infrastructure

### Container hóa

| Component     | Tech           | Purpose                                 |
| ------------- | -------------- | --------------------------------------- |
| Container     | Docker         | Đóng gói ứng dụng nhất quán             |
| Orchestration | Docker Compose | Quản lý multi-container cho development |
| Load Balancer | Nginx          | Reverse proxy, WebSocket support        |

### CI/CD

| Stage  | Tool             | Purpose                            |
| ------ | ---------------- | ---------------------------------- |
| Build  | GitHub Actions   | Tự động build và test              |
| Test   | Jest + Supertest | Unit và integration testing        |
| Deploy | Docker + Scripts | Blue-green deployment với rollback |

---

## Monitoring & Observability

| Component    | Tech                 | Purpose                      |
| ------------ | -------------------- | ---------------------------- |
| Logging      | Structured JSON logs | Centralized logging          |
| Metrics      | Custom metrics       | Giám sát hiệu năng           |
| Health Check | NestJS Terminus      | Kiểm tra health của services |

---

## Security

| Component     | Tech                | Purpose                         |
| ------------- | ------------------- | ------------------------------- |
| Auth          | JWT + Refresh Token | Xác thực stateless              |
| 2FA           | TOTP                | Multi-factor cho admin accounts |
| Token Storage | Redis + Hash        | Bảo mật refresh token           |
| Rate Limiting | Redis-based         | Chống abuse                     |

---

## Decision Matrix

| Decision           | Options                    | Selected      | Rationale                                     |
| ------------------ | -------------------------- | ------------- | --------------------------------------------- |
| Backend Framework  | Express, NestJS, Fastify   | NestJS        | Cấu trúc module rõ ràng, DI, enterprise-ready |
| ORM                | TypeORM, Prisma, Sequelize | Prisma        | Type-safe, migration tốt, DX tuyệt vời        |
| Frontend Framework | React, Vue, Angular        | Next.js/React | SSR tích hợp, ecosystem lớn                   |
| Real-time          | Socket.IO, ws, Pusher      | Socket.IO     | Fallback tự động, room support, Redis adapter |
| Database           | PostgreSQL, MySQL, MongoDB | PostgreSQL    | ACID compliance, JSONB support, mature        |

---

## References

- [System Design](./system-design.md)
- [Decisions](./decisions.md)
