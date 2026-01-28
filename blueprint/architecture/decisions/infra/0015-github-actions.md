---
id: adr-015
title: 'ADR-015: GitHub Actions'
sidebar_label: '015: GitHub Actions'
sidebar_position: 15
---

# ADR-015: GitHub Actions

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
