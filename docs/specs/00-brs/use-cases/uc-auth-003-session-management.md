---
id: uc-auth-003
title: UC-AUTH-003 Quản lý phiên
sidebar_label: UC-AUTH-003 Quản lý phiên
sidebar_position: 8
---

# UC-AUTH-003: Quản lý phiên đăng nhập & đăng xuất từ xa

| Trường thông tin     | Giá trị                                                                                             |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| Tác nhân             | Người dùng đã đăng nhập                                                                             |
| Điều kiện tiên quyết | Đang đăng nhập trên ít nhất một thiết bị                                                            |
| Tác nhân kích hoạt   | Người dùng truy cập trang "Quản lý thiết bị" và nhấn "Đăng xuất tất cả thiết bị khác"               |
| Luồng chính          | Hiển thị danh sách các thiết bị đang đăng nhập → Xác nhận hành động → Hủy tất cả phiên JWT khác → Thông báo thành công |
| Điều kiện sau        | Tất cả phiên đăng nhập trên các thiết bị khác bị chấm dứt                                            |
| Ngoại lệ             | E1: Chỉ có một thiết bị đang đăng nhập, E2: Lỗi kết nối khi gửi lệnh hủy                            |
