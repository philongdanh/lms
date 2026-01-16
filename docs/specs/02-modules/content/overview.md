---
id: content-overview
title: Content Overview
sidebar_label: Overview
---

# Content & Question Bank - Business Logic

## Business Context
- **Module**: Content & Question Bank
- **Version**: 1.0
- **Status**: Approved
- **Last Updated**: 2026-01-14

## Overview
Module cốt lõi quản lý Cấu trúc Chương trình học (Subject, Grade, Topic, Lesson), Tài nguyên Giáo dục (Video, Document), và Ngân hàng Câu hỏi. Cung cấp dữ liệu cho các module Learning và Exam.

## Use Cases
| Use Case ID | Use Case Name | Mô tả | Độ ưu tiên | Trạng thái |
|------------|--------------|-------|----------|--------|
| UC-CONT-001 | Manage Subjects & Grades | Quản lý danh mục môn học và khối lớp (Admin) | P1 | Planned |
| UC-CONT-002 | Create Topic Structure | Tạo và tổ chức cây Topic | P0 | Planned |
| UC-CONT-003 | Manage Lessons | Tạo bài học và gán vào topic | P0 | Planned |
| UC-CONT-004 | Upload Content | Upload video, tài liệu cho bài học | P0 | Planned |
| UC-CONT-005 | Manage Question Bank | Tạo ngân hàng câu hỏi và thêm câu hỏi | P0 | Planned |
| UC-CONT-006 | Bulk Import Questions | Import câu hỏi từ file Excel/Word | P1 | Planned |
| UC-CONT-007 | Publish Content | Publish nội dung cho học sinh sử dụng | P1 | Planned |

### UC-CONT-006: Bulk Import Questions
**Actor**: Teacher, Admin
**Preconditions**: File import khớp với định dạng template.
**Main Flow**:
1. Người dùng upload file (Excel/Word).
2. Hệ thống parse file và validate các rules.
3. Hệ thống hiển thị preview các câu hỏi hợp lệ và lỗi.
4. Người dùng xác nhận import.
5. Hệ thống lưu câu hỏi vào ngân hàng.
6. Hệ thống trả về báo cáo kết quả.

**Postconditions**: Các câu hỏi được tạo trong ngân hàng.
**Exceptions**: Lỗi định dạng file -> Báo cáo chi tiết lỗi theo từng dòng.
