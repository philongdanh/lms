---
id: auth-overview
title: Auth Overview
sidebar_label: Overview
---

# Auth - Business Logic

## Business Context
- **Module**: Auth
- **Version**: 1.0
- **Status**: Approved
- **Last Updated**: 2026-01-14

## Overview
Module cốt lõi: **Xác thực (Auth), Phân quyền (RBAC), Quản lý Session, Liên kết Phụ huynh, Vòng đời Tenant**.

## Use Cases
| Use Case ID | Tên | Mô Tả | Độ ưu tiên | Trạng thái |
|-------------|-----|-------|------------|------------|
| UC-AUTH-001 | Register | Đăng ký tài khoản trường (Tenant), người dùng | P0 | Done |
| UC-AUTH-002 | Login | Xác thực credentials, 2FA, cấp JWT | P0 | Done |
| UC-AUTH-003 | Session Management | Theo dõi thiết bị, logout từ xa | P1 | Done |
| UC-AUTH-004 | Authorization (RBAC) | Kiểm tra quyền hạn | P0 | Done |
| UC-AUTH-005 | Parent Linking | Liên kết tài khoản phụ huynh với học sinh | P1 | Done |
| UC-AUTH-006 | Tenant Management | Vòng đời tenant (active, suspend) | P1 | Done |

## Business Rules
| Rule ID | Tên | Mô Tả | Điều kiện | Hành động | Ngoại lệ |
|---------|-----|-------|-----------|-----------|----------|
| BR-AUTH-001 | Tenant Scope | Email unique theo tenant_id | Register/Update | Validate unique | Return Error |
| BR-AUTH-002 | Lifecycle | User/Tenant chỉ soft delete | Delete | Mark deleted_at | N/A |
| BR-AUTH-003 | Token Policy | Access (15m), Refresh (7d) | Login/Refresh | Issue tokens | N/A |
| BR-AUTH-004 | Session Limit | 5 (Student/Parent), 10 (Admin/Teacher) | Login | Revoke oldest | N/A |
| BR-AUTH-005 | Session TTL | Auto-expire sau 7 ngày idle | Cron/Check | Revoke | N/A |
| BR-AUTH-006 | Tenant Status | Chỉ tenant ACTIVE được login | Login | Check status | Block login |

## Dependencies
### Internal Dependencies
- ✅ Tenant Service - Quản lý thông tin tenant
- ❌ Notification Service - Gửi OTP/Welcome email
