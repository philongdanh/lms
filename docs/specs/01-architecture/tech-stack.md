---
id: tech-stack
title: Technology Stack
sidebar_label: Tech Stack
sidebar_position: 2
---

# Technology Stack

Các lựa chọn công nghệ và lý do quyết định cho nền tảng LMS.

---

## Overview

| Layer    | Technology      | Version | Purpose                       |
| -------- | --------------- | ------- | ----------------------------- |
| Backend  | NestJS          | Latest  | API Server, WebSocket Gateway |
| Frontend | Next.js + React | Latest  | Web UI với SSR/SSG            |
| Database | PostgreSQL      | 15+     | Lưu trữ dữ liệu chính         |
| Cache    | Redis           | 7+      | Session, caching, Pub/Sub     |
| Queue    | Bull + Redis    | Latest  | Xử lý bất đồng bộ             |

---

## Backend

### Runtime & Framework

| Component | Technology  | Rationale                                                |
| --------- | ----------- | -------------------------------------------------------- |
| Runtime   | Node.js 20+ | Hiệu năng cao, TypeScript support tốt, ecosystem lớn     |
| Framework | NestJS      | Kiến trúc module, dependency injection, enterprise-ready |
| ORM       | Prisma      | Type-safe, migration tốt, schema-first approach          |

### Key Libraries

| Library         | Purpose                   | Version |
| --------------- | ------------------------- | ------- |
| Socket.IO       | WebSocket real-time       | Latest  |
| Passport        | Authentication strategies | Latest  |
| Bull            | Job queue processing      | Latest  |
| class-validator | Request validation        | Latest  |

---

## Frontend

### Framework & Build

| Component        | Technology              | Rationale                         |
| ---------------- | ----------------------- | --------------------------------- |
| Framework        | Next.js + React         | SSR/SSG, SEO tốt, performance cao |
| Build Tool       | Turbopack (via Next.js) | Build nhanh, HMR hiệu quả         |
| State Management | React Context + Zustand | Đơn giản, nhẹ, đủ cho use case    |

### UI Libraries

| Library          | Purpose               | Version |
| ---------------- | --------------------- | ------- |
| HeroUI           | Component library     | Latest  |
| TailwindCSS      | Utility-first styling | 3.x     |
| Socket.IO Client | WebSocket client      | Latest  |

---

## Infrastructure

### Containerization

| Component     | Technology     | Purpose                                 |
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

| Component    | Technology           | Purpose                      |
| ------------ | -------------------- | ---------------------------- |
| Logging      | Structured JSON logs | Centralized logging          |
| Metrics      | Custom metrics       | Giám sát hiệu năng           |
| Health Check | NestJS Terminus      | Kiểm tra health của services |

---

## Security

| Component     | Technology          | Purpose                         |
| ------------- | ------------------- | ------------------------------- |
| Auth          | JWT + Refresh Token | Xác thực stateless              |
| 2FA           | TOTP                | Multi-factor cho admin accounts |
| Token Storage | Redis + Hash        | Bảo mật refresh token           |
| Rate Limiting | Redis-based         | Chống abuse                     |

---

## Decision Matrix

| Quyết Định         | Các Lựa Chọn               | Chọn          | Lý Do                                         |
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
