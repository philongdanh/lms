---
id: ui
title: UI
---

# UI

---

## Figma

Tham khảo Figma hệ thống [Tại đây](https://www.figma.com/community/make)

Tài liệu này tóm tắt quy trình và những việc FE developer cần làm khi lấy thiết kế từ Figma.

- **Truy cập & tổng quan:** mở file/đồ án Figma được chỉ định, xem các artboard/frames theo thứ tự màn hình.
- **Design tokens:** lấy màu, spacing, typography từ Figma Tokens (hoặc plugin). Map sang CSS variables hoặc token system của dự án.
- **Components & variants:** kiểm tra component, variant, và auto-layout. Hãy dùng component design làm nguồn chân thực cho UI component trong code.
- **Assets:** export dưới định dạng phù hợp (SVG cho icon/vector, PNG/WebP cho ảnh raster). Quy tắc đặt tên: `component-name--purpose@size` hoặc theo chuẩn dự án.
- **Handoff:** từ Figma, cung cấp specs (spacing, font-size, line-height), breakpoint notes và behavior (hover, focus, disabled). Ghi chú responsive và state changes.
- **Accessibility:** kiểm tra color contrast, focus order, semantic text. Thêm aria-labels và role theo spec thiết kế.
- **Versioning & comments:** sử dụng Versions trong Figma; comment để hỏi/ghi nhận thay đổi; tag designer khi cần clarifications.
- **Testing & QA:** so sánh layout ở các breakpoint, kiểm tra assets, verify tokens và component behaviors.

Quy trình FE ngắn (gợi ý):
1. Mở file Figma → đọc overview và notes của designer.
2. Lấy design tokens → chuyển thành CSS variables hoặc theme file.
3. Triển khai component cơ bản từ Figma components.
4. Export/import assets cần thiết.
5. Làm responsive + states → chạy review với designer.

Ghi chú ngắn:
- Không cố gắng đạt pixel-perfect trước khi responsive và accessibility ổn định.
- Luôn confirm với designer khi thiếu spec (spacing, interactions).

Nếu cần, thêm link file Figma cụ thể vào issue/task để designer dễ truy cập.

---
Cần cập nhật thêm chi tiết cụ thể từ team design? Yêu cầu file/ID Figma để kèm vào hướng dẫn.

## Storybook

Thêm Storybook như một nguồn tài liệu component cho FE:

- **Mục đích:** mỗi component nên có story mô tả trạng thái, interactions và variants để dễ review và test.
- **Chạy local:** khởi động Storybook bằng lệnh dự án (ví dụ `npm run storybook` hoặc `yarn storybook`).
- **Cấu trúc story:** export các story theo pattern `Default`, `VariantName`, `Disabled`, `WithData` và dùng `args`/`controls` để dễ chỉnh trên UI.
- **Docs & Notes:** thêm `Docs` block (MDX hoặc JSDoc) giải thích props, accessibility notes và mapping đến Figma component (thêm link/file ID).
- **Accessibility:** dùng addon a11y và viết stories kiểm tra keyboard, focus, và contrast.
- **Visual tests:** tích hợp visual regression (Chromatic / Percy / Loki) nếu có để phát hiện regressions từ design.
- **Deployment:** build Storybook và deploy lên hosting (Netlify, Vercel, GitHub Pages) để designer/PM truy cập.

Quy ước ngắn:
1. Tên story trùng logic với component (`Button/Primary`).
2. Mỗi story kèm short description và link Figma nếu có.
3. Stories chỉ dùng mock data nhỏ, tránh gọi API trực tiếp.

Thêm Storybook giúp bridge giữa design và implementation, đồng thời làm tài liệu cho QA và designer.

Xem Storybook: [Tại đây](#) — (link sẽ thêm sau)

---

## Reference

- Figma community — Make: https://www.figma.com/community/make
- Storybook (placeholder): [Tại đây](#)