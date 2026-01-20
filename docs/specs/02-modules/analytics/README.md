---
id: analytics-overview
title: Analytics Overview
sidebar_label: Overview
sidebar_position: 1
---

# Analytics & Reporting - Business Logic

Chi tiết đặc tả cho module Analytics & Reporting - Business Logic.

---

## Business Context

- **Module**: Analytics & Reporting
- **Version**: 1.0
- **Status**: Đã phê duyệt
- **Cập nhật lần cuối**: 2026-01-14

---

## Overview

Module chịu trách nhiệm thu thập, xử lý và trực quan hóa dữ liệu hoạt động học
tập. Cung cấp báo cáo đa cấp cho Học sinh, Phụ huynh, Giáo viên và Quản trị
viên.

---

## Use Cases

| Use Case ID      | Use Case Name          | Description                                       | Priority | Status          |
| ---------------- | ---------------------- | ------------------------------------------------- | -------- | --------------- |
| UC-ANALYTICS-001 | View Knowledge Map     | Xem bản đồ kiến thức cá nhân                      | P0       | Đã lên kế hoạch |
| UC-ANALYTICS-002 | View Learning Report   | Xem báo cáo học tập cá nhân (hàng ngày/hàng tuần) | P1       | Đã lên kế hoạch |
| UC-ANALYTICS-003 | View Class Performance | Giáo viên xem tiến độ học tập của lớp             | P0       | Đã lên kế hoạch |
| UC-ANALYTICS-004 | View System Overview   | Admin xem thống kê tổng quan hệ thống             | P2       | Đã lên kế hoạch |
| UC-ANALYTICS-005 | Export Report          | Xuất báo cáo sang định dạng Excel/PDF             | P2       | Đã lên kế hoạch |

### UC-ANALYTICS-001: View Knowledge Map

**Actor**: Học sinh, Giáo viên **Preconditions**: Dữ liệu học tập tồn tại.
**Luồng chính**:

1. Người dùng truy cập Dashboard.
2. Hệ thống tải dữ liệu Knowledge Map từ DB/Cache.
3. Hệ thống tính toán mức độ thành thạo cho từng Topic.
4. Hệ thống hiển thị biểu đồ cây/lưới kiến thức.

---

## Business Rules

| Rule ID          | Rule Name           | Description                      | Condition                                | Action                                | Exception            |
| ---------------- | ------------------- | -------------------------------- | ---------------------------------------- | ------------------------------------- | -------------------- |
| BR-ANALYTICS-001 | Mastery Calculation | Công thức tính mức độ thành thạo | Dựa trên điểm Quiz và thời gian gần đây  | Score \* DecayFactor                  | -                    |
| BR-ANALYTICS-002 | Data Aggregation    | Lịch trình tổng hợp dữ liệu      | Cron job hàng đêm                        | Nén raw logs thành thống kê hàng ngày | Thử lại khi thất bại |
| BR-ANALYTICS-003 | Report Retention    | Thời gian lưu trữ báo cáo        | Raw logs: 3 tháng, Aggregated: Vĩnh viễn | Xóa raw logs cũ                       | -                    |

---

## References

- [Logic](./logic.md)
- [Data Model](./data.md)
- [API](./api.md)
- [Tests](./tests.md)
