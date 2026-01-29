---
id: live-match
title: Live Match Screen
sidebar_label: Live Match
sidebar_position: 10
---

# Live Match Screen

Đặc tả màn hình thi đấu trực tiếp.

---

## Overview

```yaml
route: /tournament/live/:id
layout: FocusLayout
access: User
```

---

## Screen Structure

### Hierarchy

```yaml
LiveMatchPage:
  - Header:
      - BackButton: icon-button
      - MatchTitle: text
      - Timer: countdown
      - LeaveButton: button[danger]
  - MatchArea:
      - ScoreBoard:
          - PlayerScore: score-card
          - VSLabel: text
          - OpponentScore: score-card
      - QuestionArea:
          - QuestionNumber: badge
          - QuestionText: text
          - QuestionImage: image (optional)
      - AnswerArea:
          - AnswerOptions: option-list
          - SubmitButton: button[primary]
  - StatusBar:
      - QuestionProgress: 'Câu {current}/{total}'
      - TimePerQuestion: countdown
```

---

## Components

### ScoreBoard

| Element         | Type        | Props                                     |
| :-------------- | :---------- | :---------------------------------------- |
| `PlayerScore`   | `ScoreCard` | `name={user.name}`, `avatar`, `score`     |
| `OpponentScore` | `ScoreCard` | `name={opponent.name}`, `avatar`, `score` |

### QuestionArea

| Element          | Type    | Props             |
| :--------------- | :------ | :---------------- |
| `QuestionNumber` | `Badge` | `label="Câu {n}"` |
| `QuestionText`   | `Text`  | `variant="h3"`    |
| `QuestionImage`  | `Image` | Optional          |

### AnswerOptions

| Element        | Type     | Props                                       |
| :------------- | :------- | :------------------------------------------ |
| `OptionButton` | `Button` | `variant="outline"`, `onClick=selectAnswer` |

---

## States

| State      | Trigger            | UI Changes                         |
| :--------- | :----------------- | :--------------------------------- |
| `waiting`  | Match not started  | Show countdown to start            |
| `active`   | Match in progress  | Show question, enable answers      |
| `answered` | Answer submitted   | Disable options, show waiting      |
| `result`   | Both answered      | Show correct answer, update scores |
| `finished` | All questions done | Show final result modal            |

---

## Actions

| Action         | Trigger            | Effect                        |
| :------------- | :----------------- | :---------------------------- |
| `joinMatch`    | Mount              | WebSocket connect, join match |
| `submitAnswer` | OptionButton click | Send answer via WebSocket     |
| `leaveMatch`   | LeaveButton click  | Confirm dialog, disconnect    |

---

## Real-time Events

| Event            | Direction       | Payload                   |
| :--------------- | :-------------- | :------------------------ |
| `match:question` | Server → Client | `{question, timeLimit}`   |
| `match:answer`   | Client → Server | `{questionId, answerId}`  |
| `match:result`   | Server → Client | `{correctAnswer, scores}` |
| `match:end`      | Server → Client | `{winner, finalScores}`   |

---

## Responsive

```yaml
mobile:
  ScoreBoard: compact, horizontal
  AnswerOptions: 2x2 grid
tablet:
  ScoreBoard: expanded
  AnswerOptions: vertical list
desktop:
  MatchArea: centered, maxWidth: 800px
```
