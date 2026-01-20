---
id: communication
title: Communication
sidebar_label: Communication
---

# Communication

Quy trình và kênh giao tiếp trong team.


## Communication Channels

| Channel | Purpose | Response Time |
|---------|---------|---------------|
| Slack #lms-general | Announcements, general | < 4 hours |
| Slack #lms-dev | Technical discussions | < 2 hours |
| Slack #lms-urgent | Critical issues | < 30 mins |
| Email | External, formal | < 24 hours |
| Google Meet | Meetings, pairing | Scheduled |


## Meeting Schedule

| Meeting | When | Duration | Attendees |
|---------|------|----------|-----------|
| Daily Standup | 9:00 AM daily | 15 min | All team |
| Sprint Planning | Mon (start) | 2 hours | All team |
| Backlog Refinement | Wed | 1 hour | PO, SM, Devs |
| Sprint Review | Fri (end) | 1 hour | All + Stakeholders |
| Retrospective | Fri (end) | 1 hour | Team only |


## Standup Format

Mỗi người trả lời 3 câu hỏi:

1. **Hôm qua** làm được gì?
2. **Hôm nay** sẽ làm gì?
3. **Blockers** nào cần giải quyết?

**Rules:**
- Bắt đầu đúng giờ
- Max 2 phút/người
- Chi tiết → sau standup


## Escalation Path

```
┌─────────────────────────────────────────────┐
│  Level 1: Team Discussion                    │
│  → Thảo luận trong team                      │
└──────────────────────┬──────────────────────┘
                       ↓ Không giải quyết được
┌──────────────────────┴──────────────────────┐
│  Level 2: Scrum Master                       │
│  → SM facilitate giải quyết                  │
└──────────────────────┬──────────────────────┘
                       ↓ Cần quyết định business
┌──────────────────────┴──────────────────────┐
│  Level 3: Product Owner                      │
│  → PO quyết định priorities                  │
└──────────────────────┬──────────────────────┘
                       ↓ Ảnh hưởng project
┌──────────────────────┴──────────────────────┐
│  Level 4: Stakeholders                       │
│  → Escalate lên management                   │
└─────────────────────────────────────────────┘
```


## Documentation Guidelines

| Type | Location | Owner |
|------|----------|-------|
| Specs | `/docs/specs/` | PO + Team |
| API Docs | `/docs/api/` | Backend |
| Meeting Notes | Confluence | SM |
| Decisions | ADR in repo | Lead Dev |


## Status Updates

### Weekly Report (to Stakeholders)

- Progress vs plan
- Risks và mitigation
- Next week focus
- Blockers cần support
