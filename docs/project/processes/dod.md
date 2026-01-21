---
id: dod
title: Definition of Done
sidebar_label: Definition of Done
sidebar_position: 1
---

# Definition of Done
 
Tiêu chuẩn định nghĩa hoàn thành cho các tác vụ.

---

## Story Definition of Done

Một User Story được coi là **Done** khi:

### Code (Mã nguồn)

- [ ] Code được triển khai theo yêu cầu (requirements)
- [ ] Code tuân thủ các tiêu chuẩn coding standards
- [ ] Vượt qua kiểm tra TypeScript strict mode
- [ ] Không có lỗi ESLint
- [ ] Không còn các câu lệnh console.log/debugger

### Testing (Kiểm thử)

- [ ] Unit tests được viết và vượt qua (pass)
- [ ] Độ bao phủ test coverage ≥ 70% cho code mới
- [ ] Integration tests vượt qua (nếu có)
- [ ] Hoàn thành kiểm thử thủ công (manual testing)
- [ ] Đã kiểm tra các trường hợp biên (edge cases)

### Review (Đánh giá)

- [ ] Code được review bởi ít nhất 1 thành viên trong team
- [ ] Các phản hồi (comments) review đã được giải quyết
- [ ] PR đã được phê duyệt (approved)

### Documentation (Tài liệu)

- [ ] Thêm comment cho các phần logic phức tạp
- [ ] Cập nhật tài liệu API (nếu có)
- [ ] Cập nhật README (nếu có)

### Quality (Chất lượng)

- [ ] Không gây ra lỗi hồi quy (regressions)
- [ ] Hiệu năng (performance) ở mức chấp nhận được
- [ ] Đáp ứng các yêu cầu về khả năng truy cập (accessibility)
- [ ] Xác minh thiết kế đáp ứng (responsive design)

### Deployment (Triển khai)

- [ ] Vượt qua CI pipeline
- [ ] Đã deploy lên môi trường staging
- [ ] Vượt qua smoke test trên staging

### Acceptance (Nghiệm thu)

- [ ] PO đã review và chấp nhận
- [ ] Đáp ứng các tiêu chí nghiệm thu (acceptance criteria)

---

## Sprint Definition of Done

Một Sprint được coi là **Done** khi:

- [ ] Tất cả các committed stories đã Done
- [ ] Đạt được mục tiêu Sprint (sprint goal)
- [ ] Hoàn thành phần Demo
- [ ] Thực hiện họp Retrospective
- [ ] Cập nhật tài liệu
- [ ] Không còn lỗi nghiêm trọng (critical bugs)

---

## Release Definition of Done

Một Release được coi là **Done** khi:

- [ ] Tất cả các tính năng theo kế hoạch đã hoàn thành
- [ ] Tất cả các test đều pass
- [ ] Đạt các chỉ số hiệu năng (performance benchmarks)
- [ ] Vượt qua quét bảo mật (security scan)
- [ ] Tài liệu hoàn chỉnh
- [ ] Đã viết Release notes
- [ ] Được sự phê duyệt của Stakeholder
- [ ] Đã deploy lên production
- [ ] Xác nhận giám sát (monitoring) hoạt động tốt

---

## Bug Fix Definition of Done

- [ ] Đã xác định nguyên nhân gốc rễ (root cause)
- [ ] Đã triển khai bản sửa lỗi (fix)
- [ ] Thêm unit test để ngăn chặn lỗi hồi quy (regression)
- [ ] Xác minh bản sửa lỗi hoạt động tốt
- [ ] Kiểm tra các lỗi liên quan
- [ ] PR đã được review và merged

---

## Task Types

| Type    | DoD Level                  |
| ------- | -------------------------- |
| Feature | Full Story DoD             |
| Bug Fix | Bug Fix DoD                |
| Spike   | Document findings + demo   |
| Chore   | Verify completion + review |
