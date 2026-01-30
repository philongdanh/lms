---
id: forgot-password
title: Forgot Password Screen
sidebar_label: Forgot Password
sidebar_position: 5
---

# Forgot Password Screen

Đặc tả màn hình quên mật khẩu.

> **SSoT**: [Backlog](../../../blueprint/product/backlog.md)

---

## Overview

```yaml
route: /auth/forgot-password
layout: AuthLayout
access: Guest
```

---

## Screen Structure

### Hierarchy

```yaml
ForgotPasswordPage:
  - LeftPanel:
      - BrandingImage: illustration
      - Tagline: text
  - RightPanel:
      - Logo: image
      - Title: 'Quên mật khẩu'
      - Description: text
      - ForgotPasswordForm:
          - EmailInput: input[type=email]
          - SubmitButton: button[primary]
      - BackToLoginLink: link
```

---

## Components

### ForgotPasswordForm

| Element        | Type        | Props                                                       | Validation   |
| :------------- | :---------- | :---------------------------------------------------------- | :----------- |
| `EmailInput`   | `TextInput` | `placeholder="Email"`, `required`                           | Email format |
| `SubmitButton` | `Button`    | `variant="primary"`, `fullWidth`, `label="Gửi mã xác nhận"` | -            |

---

## States

| State     | Trigger         | UI Changes                                |
| :-------- | :-------------- | :---------------------------------------- |
| `idle`    | Initial load    | Form empty                                |
| `loading` | Submit clicked  | Button shows spinner                      |
| `sent`    | Email sent      | Show success message, countdown to resend |
| `error`   | Email not found | Show error message                        |

---

## Actions

| Action           | Trigger            | API Call                     | On Success                            | On Error           |
| :--------------- | :----------------- | :--------------------------- | :------------------------------------ | :----------------- |
| `sendResetEmail` | SubmitButton click | `POST /auth/forgot-password` | Show success, enable resend after 60s | Show error message |

---

## Responsive

```yaml
mobile:
  layout: single-column
  LeftPanel: hidden
  RightPanel: fullWidth, padding: 16px
tablet:
  layout: split
  LeftPanel: 40%
  RightPanel: 60%
desktop:
  layout: split
  LeftPanel: 50%
  RightPanel: 50%
```
