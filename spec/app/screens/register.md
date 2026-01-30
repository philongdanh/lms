---
id: register
title: Register Screen
sidebar_label: Register
sidebar_position: 3
---

# Register Screen

Đặc tả màn hình đăng ký tài khoản.

> **SSoT**: [Backlog](../../../blueprint/product/plan.md)

---

## Overview

```yaml
route: /auth/register
layout: AuthLayout
access: Guest
```

---

## Screen Structure

### Hierarchy

```yaml
RegisterPage:
  - LeftPanel:
      - BrandingImage: illustration
      - Tagline: text
  - RightPanel:
      - Logo: image
      - Title: 'Tạo tài khoản'
      - RegisterForm:
          - FullNameInput: input[type=text]
          - EmailInput: input[type=email]
          - PasswordInput: input[type=password]
          - ConfirmPasswordInput: input[type=password]
          - TermsCheckbox: checkbox
          - SubmitButton: button[primary]
      - Divider: 'hoặc'
      - SocialLogin:
          - GoogleButton: button[social]
      - LoginLink: link
```

---

## Components

### RegisterForm

| Element                | Type        | Props                                                   | Validation            |
| :--------------------- | :---------- | :------------------------------------------------------ | :-------------------- |
| `FullNameInput`        | `TextInput` | `placeholder="Họ và tên"`, `required`                   | Min 2 chars           |
| `EmailInput`           | `TextInput` | `placeholder="Email"`, `required`                       | Email format          |
| `PasswordInput`        | `TextInput` | `type="password"`, `required`                           | Min 8 chars, 1 number |
| `ConfirmPasswordInput` | `TextInput` | `type="password"`, `required`                           | Match password        |
| `TermsCheckbox`        | `Checkbox`  | `label="Tôi đồng ý với Điều khoản sử dụng"`, `required` | Must be checked       |
| `SubmitButton`         | `Button`    | `variant="primary"`, `fullWidth`, `label="Đăng ký"`     | -                     |

---

## States

| State     | Trigger               | UI Changes                            |
| :-------- | :-------------------- | :------------------------------------ |
| `idle`    | Initial load          | Form empty, button enabled            |
| `loading` | Submit clicked        | Button shows spinner, inputs disabled |
| `error`   | Validation failed     | Error messages below fields           |
| `success` | Registration complete | Redirect to OTP verification          |

---

## Actions

| Action           | Trigger            | API Call              | On Success             | On Error           |
| :--------------- | :----------------- | :-------------------- | :--------------------- | :----------------- |
| `submitRegister` | SubmitButton click | `POST /auth/register` | Redirect to verify OTP | Show error message |
| `googleRegister` | GoogleButton click | OAuth flow            | Redirect to dashboard  | Show error message |

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
