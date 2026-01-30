---
id: login
title: Login Screen
sidebar_label: Login
sidebar_position: 2
---

# Login Screen

Đặc tả màn hình đăng nhập.

> **SSoT**: [Backlog](../../../blueprint/product/plan.md)

---

## Overview

```yaml
route: /auth/login
layout: AuthLayout
access: Guest
```

---

## Screen Structure

### Hierarchy

```yaml
LoginPage:
  - LeftPanel:
      - BrandingImage: illustration
      - Tagline: text
  - RightPanel:
      - Logo: image
      - Title: 'Đăng nhập'
      - LoginForm:
          - EmailInput: input[type=email]
          - PasswordInput: input[type=password]
          - RememberMe: checkbox
          - ForgotPasswordLink: link
          - SubmitButton: button[primary]
      - Divider: 'hoặc'
      - SocialLogin:
          - GoogleButton: button[social]
      - RegisterLink: link
```

---

## Components

### LoginForm

| Element              | Type        | Props                             | Validation   |
| :------------------- | :---------- | :-------------------------------- | :----------- |
| `EmailInput`         | `TextInput` | `placeholder="Email"`, `required` | Email format |
| `PasswordInput`      | `TextInput` | `type="password"`, `required`     | Min 8 chars  |
| `RememberMe`         | `Checkbox`  | `label="Ghi nhớ đăng nhập"`       | -            |
| `ForgotPasswordLink` | `Link`      | `href="/auth/forgot-password"`    | -            |
| `SubmitButton`       | `Button`    | `variant="primary"`, `fullWidth`  | -            |

### SocialLogin

| Element        | Type     | Props                                                                |
| :------------- | :------- | :------------------------------------------------------------------- |
| `GoogleButton` | `Button` | `variant="outline"`, `icon="google"`, `label="Đăng nhập với Google"` |

---

## States

| State     | Trigger             | UI Changes                                |
| :-------- | :------------------ | :---------------------------------------- |
| `idle`    | Initial load        | Form empty, button enabled                |
| `loading` | Submit clicked      | Button shows spinner, inputs disabled     |
| `error`   | Invalid credentials | Error message below form, shake animation |
| `success` | Valid login         | Redirect to `/dashboard`                  |

---

## Actions

| Action        | Trigger            | API Call           | On Success            | On Error           |
| :------------ | :----------------- | :----------------- | :-------------------- | :----------------- |
| `submitLogin` | SubmitButton click | `POST /auth/login` | Redirect to dashboard | Show error message |
| `googleLogin` | GoogleButton click | OAuth flow         | Redirect to dashboard | Show error message |

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
