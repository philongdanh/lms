---
id: product-roadmap
title: Product Roadmap
sidebar_label: Product Roadmap
---

# Product Roadmap

Tầm nhìn sản phẩm dài hạn, các giai đoạn và cột mốc chiến lược.

> **Phạm vi**: Tài liệu này mô tả roadmap cấp sản phẩm (quý, giai đoạn, release lớn). Xem [Sprint Plan](../../project/02-sprint-plan.md) cho kế hoạch sprint.

## Overview

| Phase | Timeline | Focus | Status |
|-------|----------|-------|--------|
| Phase 1 | Q1 2024 | MVP - Core Learning & Auth | Done |
| Phase 2 | Q2 2024 | Tournament & Gamification | In Progress |
| Phase 3 | Q3 2024 | AI Personalization & Analytics | Planned |
| Phase 4 | Q4 2024 | Mobile Native & Offline | Planned |


## Phase 1: MVP Foundation

**Timeline**: 2024-01-01 - 2024-03-22
**Goal**: Ra mắt nền tảng học tập cốt lõi với Auth, Content và Learning modules

### Milestones

| Milestone | Target Date | Deliverables | Status |
|-----------|-------------|--------------|--------|
| M1 - Foundation | 2024-01-15 | Monorepo, CI/CD, Design System, GraphQL | Done |
| M2 - Auth MVP | 2024-01-29 | Multi-tenant Auth, RBAC, JWT | Done |
| M3 - Learning MVP | 2024-02-12 | Content CMS, Learning Paths, Video Player | Done |
| M4 - Tournament MVP | 2024-02-26 | Realtime Quiz, Matchmaking, Leaderboard | Done |
| M5 - Beta Release | 2024-03-11 | Gamification, Parent Reports, Polish | Done |

### Features

| Feature | Module | Priority | Effort | Status |
|---------|--------|----------|--------|--------|
| Multi-tenant Auth | Auth | P0 | L | Done |
| RBAC (5 roles) | Auth | P0 | M | Done |
| Content Management | Content | P0 | L | Done |
| Video Lessons | Learning | P0 | M | Done |
| Quiz Engine | Learning | P0 | L | Done |
| Progress Tracking | Learning | P1 | M | Done |


## Phase 2: Engagement & Gamification

**Timeline**: 2024-04-01 - 2024-06-30
**Goal**: Tăng cường tương tác người dùng với Tournament, Gamification và Analytics nâng cao

### Milestones

| Milestone | Target Date | Deliverables | Status |
|-----------|-------------|--------------|--------|
| M6 - Tournament V2 | 2024-04-30 | Team battles, Custom tournaments | In Progress |
| M7 - Gamification Full | 2024-05-31 | Badges, Streaks, Rewards marketplace | Planned |
| M8 - Analytics V2 | 2024-06-30 | Predictive analytics, Learning insights | Planned |

### Features

| Feature | Module | Priority | Effort | Status |
|---------|--------|----------|--------|--------|
| Team Tournaments | Tournament | P0 | L | In Progress |
| Badge System | Gamification | P0 | M | Planned |
| Reward Marketplace | Gamification | P1 | L | Planned |
| Predictive Analytics | Analytics | P1 | L | Planned |


## Phase 3: AI Personalization

**Timeline**: 2024-07-01 - 2024-09-30
**Goal**: Tích hợp AI để cá nhân hóa lộ trình học tập và gợi ý nội dung

### Features

| Feature | Module | Priority | Effort | Status |
|---------|--------|----------|--------|--------|
| AI Learning Paths | Learning | P0 | XL | Planned |
| Content Recommendations | Content | P1 | L | Planned |
| Adaptive Assessments | Learning | P1 | L | Planned |
| Knowledge Mastery Tracking | Analytics | P1 | M | Planned |


## Dependencies

### External Dependencies

| Dependency | Owner | Required By | Status |
|------------|-------|-------------|--------|
| Google OAuth | Google | Phase 1 Auth | Done |
| OpenAI API | OpenAI | Phase 3 AI | Pending |
| Payment Gateway | VNPay/Momo | Phase 2 Rewards | In Progress |

### Internal Dependencies

| Feature | Depends On | Impact if Delayed |
|---------|------------|-------------------|
| AI Learning Paths | Analytics V2 | Không có dữ liệu để train models |
| Reward Marketplace | Payment Gateway | Không thể đổi phần thưởng vật lý |
| Team Tournaments | Tournament V1 | Cần infrastructure realtime ổn định |


## Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| AI model chất lượng thấp | Medium | High | Pilot test với nhóm nhỏ trước khi rollout |
| Realtime scalability | Medium | High | Load testing sớm, fallback graceful degradation |
| Content thiếu đa dạng | Low | Medium | Partnership với đối tác nội dung giáo dục |
| User adoption chậm | Medium | High | Gamification, referral program, school partnerships |


## Release Plan

| Release | Version | Date | Features | Notes |
|---------|---------|------|----------|-------|
| Alpha | 0.1.0 | 2024-01-15 | Foundation | Internal testing |
| Beta | 0.5.0 | 2024-03-11 | MVP Full | Limited schools |
| GA | 1.0.0 | 2024-04-08 | Production | Pilot 10 schools |
| v1.5 | 1.5.0 | 2024-06-30 | Gamification Full | Public launch |
| v2.0 | 2.0.0 | 2024-09-30 | AI Personalization | Premium features |


## References

- [Overview](./overview.md)
- [Metrics](./metrics.md)
- [Constraints](./constraints.md)
