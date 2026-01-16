---
id: wireframes
title: Wireframes
sidebar_label: Wireframes
---

# Wireframes

Thiết kế wireframe low-fidelity.

## Structure

```
wireframes/
├── web/              # Wireframes ứng dụng web
│   └── [screen].png
└── mobile/           # Wireframes ứng dụng mobile
    └── [screen].png
```

## Guidelines

### Wireframe Standards

| Khía cạnh | Hướng dẫn |
|-----------|-----------|
| Fidelity | Low đến medium |
| Color | Chỉ grayscale |
| Content | Lorem ipsum hoặc nội dung thực |
| Annotations | Bắt buộc cho interactions |

### File Naming

| Pattern | Ví dụ |
|---------|-------|
| `[platform]-[screen]-[state]` | `web-dashboard-loading.png` |
| `[flow]-[step]` | `onboarding-01-signup.png` |

### Tools

| Tool | Trường hợp sử dụng |
|------|---------------------|
| Figma | Thiết kế cộng tác |
| Excalidraw | Phác thảo nhanh |
| Balsamiq | Wireframes low-fi |

## Checklist

- [ ] Bao phủ tất cả màn hình chính
- [ ] Các states được tài liệu hóa (empty, loading, error)
- [ ] Variants responsive (mobile, tablet, desktop)
- [ ] Annotations được thêm
- [ ] Review từ stakeholder hoàn thành

## References

- [Research](../research/README.md)
- [Design System](../design-system/README.md)
