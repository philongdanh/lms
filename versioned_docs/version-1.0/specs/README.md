# Specifications

Tài liệu đặc tả theo phương pháp Spec-Driven Development.

## Structure

```
specs/
├── 00-business/        # What & Why
│   ├── vision.md       # Tầm nhìn sản phẩm
│   ├── roadmap.md      # Lộ trình phát triển
│   ├── metrics.md      # Chỉ số thành công
│   ├── constraints.md  # Ràng buộc kỹ thuật & nghiệp vụ
│   └── glossary.md     # Thuật ngữ
│
├── 01-architecture/    # How (high-level)
│   ├── system-design.md# Kiến trúc tổng thể
│   ├── data-model.md   # Thiết kế database
│   ├── tech-stack.md   # Công nghệ sử dụng
│   └── decisions.md    # Các quyết định kiến trúc (ADR)
│
├── 02-modules/         # How (detailed)
│   └── {module}/       # Đặc tả chi tiết từng module
│       ├── overview.md # Tổng quan module
│       ├── logic.md    # Business logic & workflows
│       ├── data.md     # Data model
│       ├── api.md      # API contracts
│       └── tests.md    # Test scenarios
│
├── 03-cross-cutting/   # System-wide concerns
│   ├── security.md     # Chính sách bảo mật
│   ├── api-gateway.md  # Cấu hình API gateway
│   ├── monitoring.md   # Giám sát hệ thống
│   └── error-handling.md# Xử lý lỗi
│
└── 04-quality/         # Quality assurance
    ├── test-strategy.md# Chiến lược kiểm thử
    ├── automation.md   # Tự động hóa kiểm thử
    └── benchmarks.md   # Benchmark hiệu năng
```

## Quick Links

| Section | Purpose |
|---------|---------|
| [Business](./00-business/README.md) | Tầm nhìn, lộ trình, chỉ số, ràng buộc |
| [Architecture](./01-architecture/README.md) | Kiến trúc hệ thống, data model, tech stack |
| [Modules](./02-modules/README.md) | Đặc tả chi tiết các module |
| [Cross-Cutting](./03-cross-cutting/README.md) | Bảo mật, API gateway, giám sát |
| [Quality](./04-quality/README.md) | Chiến lược kiểm thử, automation, benchmarks |

## References

- [Design System](/design/)
- [API Reference](/api/)
- [User Guide](/user-guide/getting-started)
- [Developer Guide](/developer-guide/setup)
