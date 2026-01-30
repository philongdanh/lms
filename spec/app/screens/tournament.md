---
id: tournament
title: Tournament Screen
sidebar_label: Tournament
sidebar_position: 9
---

# Tournament Screen

Đặc tả màn hình danh sách giải đấu.

> **SSoT**: [Backlog](../../../blueprint/product/plan.md)

---

## Overview

```yaml
route: /tournament
layout: DashboardLayout
access: User
```

---

## Screen Structure

### Hierarchy

```yaml
TournamentListPage:
  - PageHeader:
      - Title: "Giải đấu"
      - FilterTabs: tabs
  - LiveSection: (conditional)
      - SectionTitle: "Đang diễn ra"
      - LiveTournamentCards: card-row
  - UpcomingSection:
      - SectionTitle: "Sắp diễn ra"
      - TournamentCards: card-grid
  - PastSection:
      - SectionTitle: "Đã kết thúc"
      - TournamentCards: card-grid
```

---

## Components

### FilterTabs

| Tab            | Filter             |
| :------------- | :----------------- |
| `Tất cả`       | No filter          |
| `Đang diễn ra` | `status=live`      |
| `Sắp diễn ra`  | `status=upcoming`  |
| `Đã kết thúc`  | `status=completed` |

### TournamentCard

| Element        | Type     | Props                             |
| :------------- | :------- | :-------------------------------- | ---------- | ------------ |
| `Thumbnail`    | `Image`  | `src={tournament.banner}`         |
| `Title`        | `Text`   | `variant="h4"`                    |
| `Status`       | `Badge`  | `variant="live"                   | "upcoming" | "completed"` |
| `StartTime`    | `Text`   | `variant="caption"`               |
| `Participants` | `Text`   | `"{count} người tham gia"`        |
| `JoinButton`   | `Button` | `variant="primary"` (conditional) |

**TournamentCard Schema:**

```yaml
TournamentCard:
  id: string
  banner: image
  title: string
  status: "live" | "upcoming" | "completed"
  startTime: datetime
  endTime: datetime
  participantCount: number
  maxParticipants: number
  isRegistered: boolean
```

---

## States

| State     | Trigger        | UI Changes        |
| :-------- | :------------- | :---------------- |
| `loading` | Initial load   | Skeleton cards    |
| `idle`    | Data loaded    | Show all sections |
| `empty`   | No tournaments | Show empty state  |

---

## Actions

| Action            | Trigger          | Effect                             |
| :---------------- | :--------------- | :--------------------------------- |
| `loadTournaments` | Mount            | `GET /api/tournaments`             |
| `joinTournament`  | JoinButton click | `POST /api/tournaments/:id/join`   |
| `viewTournament`  | Card click       | Navigate to `/tournament/live/:id` |

---

## Responsive

```yaml
mobile:
  TournamentCards: single-column
  LiveSection: horizontal-scroll
tablet:
  TournamentCards: 2-column
desktop:
  TournamentCards: 3-column
```
