---
id: use-cases
title: Use Cases
sidebar_label: Use Cases
sidebar_position: 3
---

# Use Cases

User stories, use case catalog, and flow diagrams.

---

## Overview

This document defines user stories following the standard format and use cases with clear acceptance criteria.

---

## User Story Format

| Component | Description |
|-----------|-------------|
| Role | As a [role] |
| Action | I want to [action] |
| Benefit | So that [benefit] |
| Criteria | Acceptance criteria list |

---

## User Stories

### Epic: Learning Journey

#### US-LEARN-001: AI Learning Path

**As a** student  
**I want** to view AI-recommended learning path  
**So that** I can learn according to my personal needs

**Acceptance Criteria**:
- [ ] AI analyzes strengths/weaknesses
- [ ] Suggests appropriate lessons
- [ ] Updates based on progress

#### US-LEARN-002: Browse Learning Content

**As a** student  
**I want** to browse content by Subject → Grade → Topic → Lesson  
**So that** I can find relevant learning materials

**Acceptance Criteria**:
- [ ] Navigation works correctly
- [ ] Filter by semester applied
- [ ] Content displays properly

### Epic: Tournament

#### US-COMP-001: Real-time Competition

**As a** student  
**I want** to compete real-time with other students  
**So that** I have motivation to learn

**Acceptance Criteria**:
- [ ] Countdown in competition rounds
- [ ] Scores update instantly
- [ ] Real-time leaderboard

#### US-COMP-002: Tournament Registration

**As a** student  
**I want** to register for tournaments  
**So that** I can participate in competitions

**Acceptance Criteria**:
- [ ] Registration successful
- [ ] View and Join buttons work
- [ ] Invitation codes validated

### Epic: Parent Monitoring

#### US-PARENT-001: Progress Tracking

**As a** parent  
**I want** to track my child's learning progress  
**So that** I can support their education

**Acceptance Criteria**:
- [ ] View detailed reports
- [ ] Real-time notifications
- [ ] 4-level reporting access

---

## Use Case Catalog

### UC-AUTH-001: User Registration

| Field | Value |
|-------|-------|
| Actor | Guest User |
| Precondition | User not logged in |
| Trigger | User clicks "Register" |
| Main Flow | 1. Enter email/phone, password, name 2. Submit form 3. Receive OTP 4. Verify OTP 5. Account activated |
| Postcondition | User account created and active |
| Exceptions | E1: Email exists, E2: Invalid OTP |

### UC-AUTH-002: User Login

| Field | Value |
|-------|-------|
| Actor | Registered User |
| Precondition | Account exists and verified |
| Trigger | User clicks "Login" |
| Main Flow | 1. Enter credentials 2. Validate 3. Issue tokens 4. Redirect to dashboard |
| Postcondition | User authenticated |
| Exceptions | E1: Invalid credentials, E2: Account locked |

### UC-LEARN-001: View AI Learning Path

| Field | Value |
|-------|-------|
| Actor | Student |
| Precondition | User logged in as Student |
| Trigger | User opens Learning dashboard |
| Main Flow | 1. Load user profile 2. AI analyzes learning history 3. Generate personalized path 4. Display recommendations |
| Postcondition | AI learning path displayed |
| Exceptions | E1: No learning history, E2: AI service unavailable |

### UC-COMP-001: Join Tournament

| Field | Value |
|-------|-------|
| Actor | Student |
| Precondition | User logged in, Tournament available |
| Trigger | User clicks "Join Tournament" |
| Main Flow | 1. Select tournament 2. Verify eligibility 3. Confirm registration 4. Enter waiting room |
| Postcondition | User registered for tournament |
| Exceptions | E1: Not eligible, E2: Tournament full |

---

## User Flow Diagrams

### Authentication Flow

```d2
direction: right

Guest -> Register: Click Register
Register -> OTP: Submit Form
OTP -> Active: Verify Code
Active -> Dashboard: Login

Guest -> Login: Click Login
Login -> Dashboard: Valid Credentials
Login -> Locked: 5 Failed Attempts
```

### Learning Flow

```d2
direction: down

Dashboard -> Browse: View Content
Browse -> Subject: Select Subject
Subject -> Grade: Select Grade
Grade -> Topic: Select Topic
Topic -> Lesson: Start Lesson
Lesson -> Complete: Finish
Complete -> Dashboard: Progress Updated
```

---

## References

- [Overview](./README.md)
- [Requirements](./requirements.md)
- [Glossary](./glossary.md)
