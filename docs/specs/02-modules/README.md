---
id: modules-index
title: Module Specifications
sidebar_label: Modules
sidebar_position: 1
---

# Module Specifications

Đặc tả chi tiết cho từng module trong nền tảng LMS.

---

## Modules

| Module | Description | Status |
|--------|-------|------------|
| [Auth](./auth/overview.md) | Xác thực, Phân quyền, Quản lý Session | Active |
| [Content](./content/overview.md) | Quản lý nội dung (câu hỏi, chủ đề) | Active |
| [Learning](./learning/overview.md) | Lộ trình học, theo dõi tiến độ | Active |
| [Tournament](./tournament/overview.md) | Thi đấu real-time | Active |
| [Gamification](./gamification/overview.md) | Điểm, huy hiệu, bảng xếp hạng | Active |
| [Realtime](./realtime/overview.md) | WebSocket, thông báo | Active |
| [Analytics](./analytics/overview.md) | Báo cáo, dashboard | Active |
| [Admin](./admin/overview.md) | Admin panel, quản lý tenant | Active |

---

## Module Structure

Mỗi module chứa:

```
{module}/
├── overview.md   # Tổng quan module
├── logic.md      # Business logic + workflows
├── data.md       # Data model
├── api.md        # API endpoints
└── tests.md      # Test cases + performance
```


## Related

- [Architecture](../01-architecture/system-design.md)
- [Cross-Cutting](../01-architecture/cross-cutting/security.md)
