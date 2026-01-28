---
id: frontend
title: Frontend Specs
sidebar_label: UI
sidebar_position: 3
---

# Frontend Specs

Đặc tả chi tiết giao diện, layout và điều hướng của ứng dụng Frontend.

---

## UI Resources

- [Live Demo](https://staging.lms-app.com) - Môi trường Staging
- [Figma Design File](https://www.figma.com/file/example-id/lms-app) - UI/UX gốc
- [Storybook](https://storybook.lms-app.com) - Component Documentation

---

## Site Map

Cấu trúc điều hướng tổng thể của ứng dụng.

```
├── Landing Page
│
├── Auth Pages
│   ├── Login
│   ├── Register
│   └── Forgot Password
│
├── Dashboard
│   ├── Overview
│   ├── My Learning
│   ├── Tournament
│   └── Profile
│
└── Admin Portal
    ├── User Management
    ├── Content Management
    └── Settings
```

---

## URL Mapping

Mapping giữa URL, Page Component và Quyền truy cập.

| URL Route              | Page Component      | Layout            | Access Role |
| :--------------------- | :------------------ | :---------------- | :---------- |
| `/`                    | `LandingPage`       | `PublicLayout`    | All         |
| `/auth/login`          | `LoginPage`         | `AuthLayout`      | Guest       |
| `/auth/register`       | `RegisterPage`      | `AuthLayout`      | Guest       |
| `/dashboard`           | `DashboardOverview` | `DashboardLayout` | User        |
| `/learning`            | `MyLearningPage`    | `DashboardLayout` | User        |
| `/learning/:id`        | `LessonViewer`      | `FocusLayout`     | User        |
| `/tournament`          | `TournamentList`    | `DashboardLayout` | User        |
| `/tournament/live/:id` | `LiveMatch`         | `FocusLayout`     | User        |
| `/admin`               | `AdminDashboard`    | `AdminLayout`     | Admin       |

---

## Layout Specs

### AuthLayout

Layout dành cho các trang xác thực (Login, Register).

```d2
direction: right

LeftPanel: {
  style: {
    fill: "#f3f4f6"
  }
  Branding: "Branding & Illustration"
}

RightPanel: {
  FormContainer: "Form Container" {
    Logo
    Title
    InputFields
    ActionButtons
    Links
  }
}
```

### DashboardLayout

Layout chính cho người dùng đã đăng nhập.

```d2
direction: right

Header: {
  Logo
  Search
  "User Menu"
}

Body: {
  direction: right

  Sidebar: {
    NavLinks: {
      Overview
      Learning
      Tournament
      Profile
    }
  }

  MainContent: {
    PageTitle
    Breadcrumbs
    ContentArea
  }
}
```

### FocusLayout

Layout tối giản cho các hoạt động cần tập trung cao (Làm bài học, Thi đấu).

```d2
direction: right

Header: {
  direction: right
  BackBtn
  ProgressBar
  Timer
  Settings
}

Content: {
  QuestionArea
  AnswerInput
}
```

---
