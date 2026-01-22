---
id: logic
title: Business Logic
sidebar_label: Logic
sidebar_position: 20
---

# Analytics - Business Logic

Quy tắc nghiệp vụ tính toán báo cáo và phân tích dữ liệu.

## Dependencies

### Phụ thuộc nội bộ

- ✅ Learning Module - Nguồn dữ liệu bài tập/tiến độ.
- ✅ Auth Module - Thông tin người dùng/vai trò.

### Phụ thuộc bên ngoài

- ✅ PostgreSQL - Lưu trữ time-series (thông qua partitioning).
- ✅ Redis - Caching báo cáo.

## Validation Criteria

- ✅ Dữ liệu báo cáo khớp với dữ liệu gốc (Tính chính xác dữ liệu).
- ✅ Tính năng phân quyền hoạt động đúng (Giáo viên lớp A không thể xem lớp B).
- ✅ Hiệu suất ổn định với dữ liệu lớn.

# Workflows

## Workflow Summary

| Workflow ID | Workflow Name   | Trigger           | Actors       | Status         |
| ----------- | --------------- | ----------------- | ------------ | -------------- |
| WF-ANA-001  | ETL Pipeline    | User Action Event | System       | Đang hoạt động |
| WF-ANA-002  | Generate Report | UI Request        | User, System | Đang hoạt động |

config: themeVariables: fontFamily: "EB Garamond" config: themeVariables:
fontFamily: "EB Garamond"

## Events

### Sự kiện hệ thống

| Event Name                   | Description                    | Payload            | Emitted By    |
| ---------------------------- | ------------------------------ | ------------------ | ------------- |
| `analytics.report.generated` | Báo cáo lớn hoàn thành (async) | `{report_id, url}` | Analytics Svc |

## Performance Requirements

- **ETL Latency**: Cập nhật thời gian thực (Knowledge Map) < 5s độ trễ từ event.

## References

- [Overview](/specs)
