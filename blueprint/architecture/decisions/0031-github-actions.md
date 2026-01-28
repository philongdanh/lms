---
id: 0031-github-actions
title: '0031: Github Actions'
sidebar_label: '0031: Github Actions'
sidebar_position: 31
---

# 0031: Github Actions

Cần giải pháp CI/CD tích hợp chặt chẽ với source code.

---

## Decision

Sử dụng **GitHub Actions**.

---

## Rationale

- **Integrated**: Tích hợp sẵn trong GitHub, không cần setup server CI riêng
  (như Jenkins).
- **Marketplace**: Kho actions khổng lồ cho các tác vụ phổ biến (docker build,
  ssh, lint).
- **Free tier**: Hào phóng cho public repo và đủ dùng cho team nhỏ.
