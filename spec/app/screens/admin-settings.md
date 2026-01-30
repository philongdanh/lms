---
id: admin-settings
title: Admin Settings
sidebar_label: Settings
sidebar_position: 15
---

# Admin Settings

Đặc tả màn hình cài đặt hệ thống.

> **SSoT**: [Backlog](../../../blueprint/product/plan.md)

---

## Overview

```yaml
route: /admin/settings
layout: AdminLayout
access: Admin
```

---

## Screen Structure

### Hierarchy

```yaml
AdminSettingsPage:
  - PageHeader:
      - Title: 'Cài đặt hệ thống'
  - SettingsTabs:
      - Tab: 'Chung'
      - Tab: 'Email'
      - Tab: 'Bảo mật'
      - Tab: 'Tích hợp'
  - SettingsForm:
      - FormFields: (varies by tab)
      - SaveButton: button[primary]
```

---

## Components

### Chung Tab

| Field             | Type          | Mô tả                  |
| :---------------- | :------------ | :--------------------- |
| `siteName`        | `TextInput`   | Tên ứng dụng           |
| `siteDescription` | `Textarea`    | Mô tả ngắn             |
| `logoUrl`         | `ImageUpload` | Logo ứng dụng          |
| `maintenanceMode` | `Toggle`      | Bật/tắt chế độ bảo trì |

### Email Tab

| Field          | Type            | Mô tả        |
| :------------- | :-------------- | :----------- |
| `smtpHost`     | `TextInput`     | SMTP server  |
| `smtpPort`     | `NumberInput`   | Port         |
| `smtpUser`     | `TextInput`     | Username     |
| `smtpPassword` | `PasswordInput` | Password     |
| `fromEmail`    | `TextInput`     | Email gửi đi |
| `fromName`     | `TextInput`     | Tên hiển thị |

### Bảo mật Tab

| Field                      | Type          | Mô tả                            |
| :------------------------- | :------------ | :------------------------------- |
| `sessionTimeout`           | `NumberInput` | Thời gian hết hạn session (phút) |
| `maxLoginAttempts`         | `NumberInput` | Số lần đăng nhập sai tối đa      |
| `requireEmailVerification` | `Toggle`      | Yêu cầu xác thực email           |
| `allowRegistration`        | `Toggle`      | Cho phép đăng ký mới             |

### Tích hợp Tab

| Field                | Type            | Mô tả                  |
| :------------------- | :-------------- | :--------------------- |
| `googleClientId`     | `TextInput`     | Google OAuth Client ID |
| `googleClientSecret` | `PasswordInput` | Google OAuth Secret    |
| `webhookUrl`         | `TextInput`     | Webhook endpoint       |

---

## Actions

| Action         | Trigger            | Effect                                |
| :------------- | :----------------- | :------------------------------------ |
| `loadSettings` | Mount / Tab change | `GET /api/admin/settings/:tab`        |
| `saveSettings` | SaveButton click   | `PUT /api/admin/settings/:tab`        |
| `testEmail`    | Test button click  | `POST /api/admin/settings/email/test` |

---

## States

| State     | Trigger                   | UI Changes                   |
| :-------- | :------------------------ | :--------------------------- |
| `loading` | Initial load / tab change | Form skeleton                |
| `idle`    | Data loaded               | Show form                    |
| `saving`  | Save clicked              | Button spinner, disable form |
| `saved`   | Save success              | Show success toast           |
| `error`   | Save failed               | Show error message           |
