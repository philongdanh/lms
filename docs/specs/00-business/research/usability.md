---
id: usability
title: Usability Guidelines
sidebar_label: Usability
---

# Usability Guidelines

Các nguyên tắc và heuristics về khả dụng.

---

## Usability Heuristics

Dựa trên 10 Usability Heuristics của Nielsen:

| Heuristic | Mô tả | Áp dụng |
|-----------|-------|--------|
| Visibility of system status | Giữ người dùng được thông báo | Loading states, progress bars |
| Match system and real world | Sử dụng ngôn ngữ quen thuộc | Thuật ngữ domain |
| User control and freedom | Hỗ trợ undo/redo | Nút thoát, hủy rõ ràng |
| Consistency and standards | Tuân theo conventions | Hướng dẫn nền tảng |
| Error prevention | Ngăn ngừa vấn đề | Validation, confirmation |
| Recognition over recall | Giảm tải bộ nhớ | Tùy chọn hiển thị, gợi ý |
| Flexibility and efficiency | Hỗ trợ shortcuts | Tính năng power user |
| Aesthetic and minimal design | Loại bỏ không cần thiết | UI sạch, tập trung |
| Help users with errors | Thông báo lỗi rõ ràng | Gợi ý khắc phục |
| Help and documentation | Cung cấp hỗ trợ | Trợ giúp theo ngữ cảnh |

---

## Accessibility (WCAG 2.1)

### Level A (Minimum)

| Guideline | Requirement | Implementation |
|-----------|-------------|----------------|
| Text alternatives | Alt text for images | `<img alt="">` |
| Keyboard | All functions via keyboard | Tab navigation |
| Pause/stop | Control moving content | Pause buttons |
| No seizures | Avoid flashing | < 3 flashes/sec |

### Level AA (Recommended)

| Guideline | Requirement | Implementation |
|-----------|-------------|----------------|
| Color contrast | 4.5:1 ratio text | Use contrast checker |
| Resize text | 200% without loss | Responsive design |
| Focus visible | Visible focus indicator | Focus styles |
| Language | Page language set | `lang` attribute |

### Level AAA (Enhanced)

| Guideline | Requirement | Implementation |
|-----------|-------------|----------------|
| Sign language | Video alternatives | Sign language videos |
| Extended audio | Descriptions | Audio descriptions |
| Contrast enhanced | 7:1 ratio | High contrast mode |

---

## Responsive Design

### Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| Mobile | < 640px | Phone |
| Tablet | 640-1024px | Tablet |
| Desktop | 1024-1440px | Laptop |
| Large | > 1440px | Desktop |

### Touch Targets

| Element | Minimum Size | Spacing |
|---------|--------------|---------|
| Button | 44x44px | 8px |
| Link | 44px height | 8px |
| Icon | 24x24px | 16px |

---

## Performance UX

### Perceived Performance

| Threshold | Perception | Guideline |
|-----------|------------|-----------|
| < 100ms | Instant | Direct manipulation |
| 100-300ms | Slight delay | No feedback needed |
| 300ms-1s | Noticeable | Show loading indicator |
| 1-10s | Long wait | Show progress bar |
| > 10s | Too long | Allow background |

### Loading States

| State | Implementation |
|-------|----------------|
| Skeleton | Placeholder shapes |
| Spinner | For short waits |
| Progress bar | For known duration |
| Message | For long operations |

---

## Testing Methods

### Usability Testing

| Method | When | Participants |
|--------|------|--------------|
| Moderated | Early design | 5-8 users |
| Unmoderated | Validation | 10-20 users |
| A/B Testing | Optimization | Statistical sample |

### Metrics

| Metric | Description | Target |
|--------|-------------|--------|
| Task Success | Completion rate | > 90% |
| Time on Task | Duration | < [benchmark] |
| Error Rate | Mistakes made | < 5% |
| SUS Score | System Usability Scale | > 68 |

---

## References

- [Personas](./personas.md)
- [Journeys](./journeys.md)
- [Design System](../../design/components.md)
