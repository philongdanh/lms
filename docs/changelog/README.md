# What's New

Trang này tổng hợp các thay đổi quan trọng giữa các phiên bản của LMS Documentation.

## Release History

| Version | Release Date | Status |
|---------|--------------|--------|
| [1.0](./v1.0.md) | January 16, 2026 | Current |
| Next | TBD | In Development |

---

## Versioning Policy

Chúng tôi sử dụng **Semantic Versioning** với format `MAJOR.MINOR`:

- **MAJOR** (1.0 → 2.0): Breaking changes, restructure lớn
- **MINOR** (1.0 → 1.1): Features mới, improvements

### Quy trình Release

1. Development hoàn tất trên branch `main`
2. Tạo version snapshot: `npm run version:all --ver=X.Y`
3. Viết release notes tại `docs/changelog/vX.Y.md`
4. Build và deploy

---

## Báo cáo Issues

Nếu phát hiện lỗi hoặc có đề xuất, vui lòng tạo issue tại [GitHub Repository](https://github.com/idlongggg/lms/issues).
