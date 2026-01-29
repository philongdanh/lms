---
id: layout
title: Layout Specs
sidebar_label: Layout
sidebar_position: 20
---

# Layout Specs

Đặc tả các layout chính của ứng dụng.

---

## PublicLayout

Layout cho trang công khai (Landing).

### Structure

```yaml
type: single-column
header: transparent
footer: visible
```

### Components

| Component            | Mô tả            | Vị trí           |
| :------------------- | :--------------- | :--------------- |
| `Header`             | Navigation bar   | Top, transparent |
| `Header.Logo`        | Logo ứng dụng    | Left             |
| `Header.NavLinks`    | Navigation links | Center           |
| `Header.AuthButtons` | Login/Register   | Right            |
| `MainContent`        | Page content     | Full width       |
| `Footer`             | Footer links     | Bottom           |

---

## AuthLayout

Layout dành cho các trang xác thực (Login, Register).

### Structure

```yaml
type: split-layout
direction: horizontal
```

### Components

| Component       | Mô tả                  | Vị trí            |
| :-------------- | :--------------------- | :---------------- |
| `LeftPanel`     | Branding, illustration | Left 50%          |
| `RightPanel`    | Form container         | Right 50%         |
| `Logo`          | Logo ứng dụng          | Top of RightPanel |
| `Title`         | Tiêu đề trang          | Below Logo        |
| `FormFields`    | Input fields           | Center            |
| `ActionButtons` | Submit buttons         | Below FormFields  |
| `Links`         | Navigation links       | Bottom            |

---

## DashboardLayout

Layout chính cho người dùng đã đăng nhập.

### Structure

```yaml
type: sidebar-layout
header: fixed
sidebar: collapsible
```

### Components

| Component                 | Mô tả                  | Vị trí             |
| :------------------------ | :--------------------- | :----------------- |
| `Header`                  | Top navigation bar     | Top, fixed         |
| `Header.Logo`             | Logo ứng dụng          | Header left        |
| `Header.Search`           | Global search          | Header center      |
| `Header.UserMenu`         | User dropdown          | Header right       |
| `Sidebar`                 | Navigation menu        | Left, collapsible  |
| `Sidebar.NavLinks`        | Menu items             | Sidebar content    |
| `MainContent`             | Page content area      | Right of Sidebar   |
| `MainContent.PageTitle`   | Current page title     | Top of MainContent |
| `MainContent.Breadcrumbs` | Navigation breadcrumbs | Below PageTitle    |
| `MainContent.ContentArea` | Dynamic content        | Main area          |

---

## FocusLayout

Layout tối giản cho các hoạt động cần tập trung cao (Làm bài học, Thi đấu).

### Structure

```yaml
type: minimal-layout
header: slim
fullscreen: true
```

### Components

| Component              | Mô tả                   | Vị trí               |
| :--------------------- | :---------------------- | :------------------- |
| `Header`               | Slim header bar         | Top                  |
| `Header.BackBtn`       | Return to previous page | Header left          |
| `Header.ProgressBar`   | Progress indicator      | Header center        |
| `Header.Timer`         | Countdown/elapsed time  | Header right         |
| `Header.Settings`      | Quick settings          | Header right         |
| `Content`              | Main content area       | Full remaining space |
| `Content.QuestionArea` | Question display        | Content top          |
| `Content.AnswerInput`  | Answer input area       | Content bottom       |

---

## AdminLayout

Layout cho khu vực quản trị.

### Structure

```yaml
type: sidebar-layout
header: fixed
sidebar: expanded
theme: dark
```

### Components

| Component                 | Mô tả                | Vị trí             |
| :------------------------ | :------------------- | :----------------- |
| `Header`                  | Admin header         | Top, fixed         |
| `Header.Logo`             | Admin logo           | Header left        |
| `Header.Search`           | Admin search         | Header center      |
| `Header.Notifications`    | System notifications | Header right       |
| `Header.AdminMenu`        | Admin dropdown       | Header right       |
| `Sidebar`                 | Admin navigation     | Left, fixed        |
| `Sidebar.NavGroups`       | Grouped menu items   | Sidebar content    |
| `MainContent`             | Admin content area   | Right of Sidebar   |
| `MainContent.PageHeader`  | Title + actions      | Top of MainContent |
| `MainContent.ContentArea` | Tables, forms, etc.  | Main area          |
