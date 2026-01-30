---
id: 31-actions
title: '31: Github Actions'
sidebar_label: '31: Actions'
sidebar_position: 31
---

# 31: Github Actions

Giải pháp ci/cd tích hợp chặt chẽ với source code

---

## Decision

**github actions**

---

## Rationale

- **Integrated**: Tích hợp sẵn trong GitHub, không cần setup server CI riêng
  (như Jenkins)
- **Marketplace**: Kho actions khổng lồ cho các tác vụ phổ biến (docker build,
  ssh, lint)
- **Free tier**: Hào phóng cho public repo và đủ dùng cho team nhỏ
