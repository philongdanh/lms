---
id: usability
title: Usability Guidelines
sidebar_label: Usability
sidebar_position: 3
---

# Usability Guidelines

Tiêu chuẩn khả năng sử dụng và trải nghiệm.

---

## Usability Heuristics

Dựa trên 10 nguyên tắc khả dụng của Nielsen:

| Nguyên tắc                   | Mô tả                          | Áp dụng cụ thể                           |
| ---------------------------- | ------------------------------ | ---------------------------------------- |
| Hiển thị trạng thái hệ thống | Luôn thông báo cho người dùng  | Trạng thái tải, thanh tiến độ            |
| Phù hợp với thế giới thực    | Sử dụng ngôn ngữ quen thuộc    | Thuật ngữ chuyên ngành giáo dục          |
| Kiểm soát và tự do           | Hỗ trợ hoàn tác và làm lại     | Nút thoát, hủy thao tác rõ ràng          |
| Nhất quán và tiêu chuẩn      | Tuân thủ các quy ước chung     | Hướng dẫn giao diện thống nhất           |
| Ngăn ngừa lỗi                | Hạn chế tối đa sai sót         | Xác thực dữ liệu, xác nhận xóa           |
| Gợi nhớ thay vì ghi nhớ      | Giảm tải cho bộ nhớ            | Hiển thị tùy chọn, gợi ý thông minh      |
| Linh hoạt và hiệu quả        | Hỗ trợ các lối tắt             | Tính năng dành cho người dùng chuyên sâu |
| Thiết kế tối giản và thẩm mỹ | Loại bỏ yếu tố không cần thiết | Giao diện sạch sẽ, tập trung             |
| Hỗ trợ xử lý lỗi             | Thông báo lỗi rõ ràng          | Gợi ý cách khắc phục cụ thể              |
| Trợ giúp và tài liệu         | Cung cấp hướng dẫn sử dụng     | Trợ giúp theo ngữ cảnh                   |

---

## Accessibility (WCAG 2.1)

### Cấp độ A (Tối thiểu)

| Hướng dẫn         | Yêu cầu                        | Triển khai thực tế            |
| ----------------- | ------------------------------ | ----------------------------- |
| Văn bản thay thế  | Mô tả cho hình ảnh             | `<img alt="">`                |
| Bàn phím          | Sử dụng đầy đủ qua bàn phím    | Điều hướng bằng phím Tab      |
| Tạm dừng/Dừng     | Kiểm soát nội dung chuyển động | Nút tạm dừng cho video/slider |
| Tránh gây co giật | Không nháy quá nhanh           | < 3 lần nháy/giây             |

### Cấp độ AA (Khuyến nghị)

| Hướng dẫn            | Yêu cầu                          | Triển khai thực tế               |
| -------------------- | -------------------------------- | -------------------------------- |
| Độ tương phản        | Tỉ lệ 4.5:1 cho văn bản          | Kiểm tra bằng công cụ tương phản |
| Thay đổi kích thước  | Phóng to 200% không mất nội dung | Thiết kế đáp ứng                 |
| Trạng thái tập trung | Chỉ báo tập trung rõ ràng        | Hiệu ứng focus rõ nét            |
| Ngôn ngữ trang       | Thiết lập ngôn ngữ trang         | Thuộc tính `lang` trong HTML     |

### Cấp độ AAA (Nâng cao)

| Hướng dẫn        | Yêu cầu            | Triển khai thực tế     |
| ---------------- | ------------------ | ---------------------- |
| Ngôn ngữ ký hiệu | Thay thế cho video | Video ngôn ngữ ký hiệu |
| Âm thanh mở rộng | Mô tả âm thanh     | Thuyết minh âm thanh   |
| Tương phản cao   | Tỉ lệ 7:1          | Chế độ tương phản cao  |

---

## Responsive Design

### Điểm ngắt

| Điểm ngắt     | Chiều rộng  | Đối tượn mục tiêu |
| ------------- | ----------- | ----------------- |
| Di động       | < 640px     | Điện thoại        |
| Máy tính bảng | 640-1024px  | Máy tính bảng     |
| Máy tính      | 1024-1440px | Máy tính xách tay |
| Màn hình lớn  | > 1440px    | Máy tính để bàn   |

### Mục tiêu chạm

| Thành phần | Kích thước tối thiểu | Khoảng cách |
| ---------- | -------------------- | ----------- |
| Nút bấm    | 44x44px              | 8px         |
| Liên kết   | Chiều cao 44px       | 8px         |
| Biểu tượng | 24x24px              | 16px        |

---

## Performance UX

### Hiệu suất cảm nhận

| Ngưỡng thời gian | Cảm nhận của người dùng | Hướng dẫn xử lý               |
| ---------------- | ----------------------- | ----------------------------- |
| < 100ms          | Tức thì                 | Phản hồi trực tiếp            |
| 100-300ms        | Trễ nhẹ                 | Không cần phản hồi trạng thái |
| 300ms-1s         | Thấy rõ sự chờ đợi      | Hiển thị biểu tượng đang tải  |
| 1-10s            | Chờ đợi lâu             | Hiển thị thanh tiến độ        |
| > 10s            | Quá lâu                 | Cho phép xử lý ngầm           |

### Trạng thái tải

| Trạng thái    | Triển khai thực tế          |
| ------------- | --------------------------- |
| Khung xương   | Hình khối giữ chỗ           |
| Vòng quay     | Cho thời gian chờ ngắn      |
| Thanh tiến độ | Khi xác định được thời gian |
| Thông báo     | Cho các tác vụ rất lâu      |

---

## Testing Methods

### Kiểm thử khả năng sử dụng

| Phương pháp        | Thời điểm triển khai   | Số lượng người tham gia |
| ------------------ | ---------------------- | ----------------------- |
| Có người điều phối | Giai đoạn đầu thiết kế | 5-8 người dùng          |
| Tự thực hiện       | Giai đoạn xác thực     | 10-20 người dùng        |
| Thử nghiệm A/B     | Giai đoạn tối ưu hóa   | Mẫu thống kê đủ lớn     |

### Chỉ số

| Chỉ số              | Mô tả                      | Mục tiêu    |
| ------------------- | -------------------------- | ----------- |
| Thành công tác vụ   | Tỉ lệ hoàn thành           | > 90%       |
| Thời gian thực hiện | Thời lượng hoàn thành      | < mức chuẩn |
| Tỉ lệ lỗi           | Số sai sót mắc phải        | < 5%        |
| Điểm SUS            | Thang đo khả dụng hệ thống | > 68        |

---

## References

- [Personas](./personas.md)
- [Journeys](./journeys.md)
- [Design System](../../../design/components.md)
