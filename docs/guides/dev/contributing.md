---
id: contributing
title: Contributing Guide
sidebar_label: Contributing
sidebar_position: 4
---

# Contributing Guide
 
Quy tắc và quy trình cộng tác phát triển hệ thống.

---

## Roles and Responsibilities

### Các vai trò chính

| Role              | Responsibility                                                   |
| ----------------- | ---------------------------------------------------------------- |
| **Product Owner** | Định hướng sản phẩm, ưu tiên tính năng, phê duyệt business logic |
| **Tech Lead**     | Quyết định kiến trúc, review spec, đảm bảo chất lượng code       |
| **Developer**     | Triển khai từ specification, viết test, tham gia code review     |
| **QA Engineer**   | Lập kế hoạch test, thực hiện testing, báo cáo bug                |

### Ma trận phối hợp

| Activity | PO   | Lead      | Dev     | QA     |
| -------- | ---- | --------- | ------- | ------ |
| Spec     | Lead | Phê duyệt | Draft   | Review |
| Code     | -    | Review    | Tạo mới | -      |
| Test     | UAT  | -         | Unit    | Lead   |

---

## Workflow (Trunk Based Development)

### Mô hình Branching

| Branch      | Purpose                             | Protection  | Lifespan  |
| ----------- | ----------------------------------- | ----------- | --------- |
| `main`      | Nguồn sự thật, luôn sẵn sàng deploy | Được bảo vệ | Vĩnh viễn |
| `feature/*` | Nhánh tính năng ngắn hạn            | Không       | < 1 ngày  |

> **Important**:
>
> - Tất cả developer commit lên `main` thường xuyên
> - Feature branches phải có vòng đời ngắn (< 1 ngày, tối đa 2-3 ngày)
> - No long-lived branches (`develop`, `release/*`, `hotfix/*`)

### Các nguyên tắc TBD

1. **Commit nhỏ và thường xuyên** - Nhiều lần trong ngày
2. **Feature flags** - Ẩn các tính năng chưa hoàn thiện trong production
3. **CI toàn diện** - Tất cả commit phải pass test trước khi merge
4. **Không code freeze** - Luôn sẵn sàng để deploy

### Quy trình Code Review

```
Branch from main --> Code --> Pull Request --> CI Checks --> Review --> Merge to main
```

### Quy ước Commit

Format: `<type>(<scope>): <subject>`

| Type       | Description       |
| ---------- | ----------------- |
| `feat`     | Tính năng mới     |
| `fix`      | Sửa lỗi           |
| `docs`     | Cập nhật tài liệu |
| `style`    | Định dạng code    |
| `refactor` | Tái cấu trúc      |
| `test`     | Thêm test         |
| `chore`    | Bảo trì           |

---

## Sprint Process

### Thông tin Sprint

- **Thời gian**: 2 tuần
- **Planning**: Thứ Hai, 9:00 AM
- **Review**: Thứ Sáu, 2:00 PM (tuần 2)
- **Retrospective**: Thứ Sáu, 3:00 PM (tuần 2)

### Các nghi thức Sprint

| Ceremony          | Timing          | Duration | Purpose                   |
| ----------------- | --------------- | -------- | ------------------------- |
| **Planning**      | Tuần 1, thứ Hai | 2 giờ    | Chọn story, chia nhỏ task |
| **Daily Standup** | Hàng ngày       | 15 phút  | Đồng bộ tiến độ           |
| **Sprint Review** | Tuần 2, thứ Sáu | 1 giờ    | Demo và thu thập feedback |
| **Retrospective** | Tuần 2, thứ Sáu | 45 phút  | Cải tiến quy trình        |

---

## Task Workflow

### Trạng thái Task

```
Backlog --[Groomed]--> Ready --[Started]--> InProgress --[PR Opened]--> CodeReview --[Approved]--> Testing --[Passed]--> Done
```

### Definition of Ready (DoR)

- ✅ Yêu cầu rõ ràng
- ✅ Spec được phê duyệt
- ✅ Đã ước lượng nỗ lực

### Definition of Done (DoD)

- ✅ Triển khai hoàn tất
- ✅ Test đã pass
- ✅ Code đã được review
- ✅ Tài liệu đã cập nhật

---

## Quality Gates

### Trước khi triển khai

- ✅ Tài liệu thiết kế được phê duyệt bởi các bên liên quan
- ✅ Các test case được định nghĩa trong spec
- ✅ Tính khả thi về mặt kỹ thuật được xác nhận

### Trong khi triển khai

- ✅ Code review dựa trên spec
- ✅ Độ bao phủ test đạt yêu cầu
- ✅ Benchmarks hiệu năng được xác nhận

### Trước khi Release

- ✅ Tất cả các yêu cầu trong spec đã được triển khai
- ✅ Tất cả các test đã pass
- ✅ Tài liệu đã được cập nhật

---

## Related Documentation

- [Setup Guide](./setup.md)
- [Development Guide](./development.md)
- [Deployment Guide](./deployment.md)
