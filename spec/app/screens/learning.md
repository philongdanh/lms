---
id: learning
title: Learning Screen
sidebar_label: Learning
sidebar_position: 6
---

# Learning Screen

Đặc tả màn hình học tập (Lesson Viewer).

> **SSoT**: [Backlog](../../../blueprint/product/backlog.md)

---

## Overview

```yaml
route: /learning/:id
layout: FocusLayout
access: User
```

---

## Screen Structure

### Hierarchy

```yaml
LessonViewer:
  - Header:
      - BackButton: icon-button
      - LessonTitle: text
      - ProgressBar: progress
      - Timer: text (optional)
      - SettingsButton: icon-button
  - Content:
      - LessonContent:
          - VideoPlayer: video (optional)
          - TextContent: rich-text
          - ImageContent: image (optional)
          - CodeBlock: code (optional)
      - InteractionArea:
          - QuizQuestion: question-card (optional)
          - AnswerOptions: option-list | text-input
          - SubmitButton: button
          - Feedback: feedback-card
  - Footer:
      - PrevButton: button[secondary]
      - ProgressIndicator: 'Bước {current}/{total}'
      - NextButton: button[primary]
```

---

## Components

### Header

| Element          | Type         | Props                                 |
| :--------------- | :----------- | :------------------------------------ |
| `BackButton`     | `IconButton` | `icon="arrow-left"`, `onClick=goBack` |
| `LessonTitle`    | `Text`       | `variant="subtitle"`, `truncate=true` |
| `ProgressBar`    | `Progress`   | `value={progress}`, `max=100`         |
| `Timer`          | `Text`       | `variant="mono"`, `format="mm:ss"`    |
| `SettingsButton` | `IconButton` | `icon="settings"`                     |

### LessonContent

Content type sẽ thay đổi dựa trên `lesson.contentType`:

```yaml
contentTypes:
  video:
    component: VideoPlayer
    props:
      src: lesson.videoUrl
      controls: true
      autoplay: false
  text:
    component: RichText
    props:
      content: lesson.textContent
      allowCopy: true
  interactive:
    component: InteractiveModule
    props:
      moduleId: lesson.moduleId
```

### QuizQuestion

| Element         | Type    | Props                                     |
| :-------------- | :------ | :---------------------------------------- |
| `QuestionText`  | `Text`  | `variant="h3"`, `content={question.text}` |
| `QuestionImage` | `Image` | `src={question.imageUrl}` (optional)      |

**Question Schema:**

```yaml
Question:
  id: string
  type: "multiple_choice" | "true_false" | "fill_blank" | "ordering"
  text: string
  imageUrl: string (optional)
  options: Option[] (for multiple_choice)
  correctAnswer: string | string[]
  explanation: string
```

### AnswerOptions

Dựa trên `question.type`:

```yaml
multiple_choice:
  component: OptionList
  props:
    options: question.options
    selectionMode: "single" | "multiple"
    selectedIds: state.selectedIds
    onSelect: handleSelect
true_false:
  component: OptionList
  props:
    options: [{id: "true", label: "Đúng"}, {id: "false", label: "Sai"}]
fill_blank:
  component: TextInput
  props:
    placeholder: "Nhập câu trả lời..."
    value: state.answer
    onChange: handleChange
ordering:
  component: DraggableList
  props:
    items: question.options
    onReorder: handleReorder
```

### Feedback

| Element        | Type   | Props                            |
| :------------- | :----- | :------------------------------- | ------------ |
| `FeedbackCard` | `Card` | `variant="success"               | "error"`     |
| `ResultIcon`   | `Icon` | `name="check"                    | "x"`         |
| `ResultText`   | `Text` | `"Chính xác!"                    | "Chưa đúng"` |
| `Explanation`  | `Text` | `content={question.explanation}` |

---

## States

| State       | Trigger             | UI Changes                   |
| :---------- | :------------------ | :--------------------------- |
| `loading`   | Initial load        | Skeleton for content         |
| `viewing`   | Content loaded      | Show lesson content          |
| `answering` | Quiz question shown | Enable answer input          |
| `submitted` | Answer submitted    | Show feedback, disable input |
| `completed` | All steps done      | Show completion modal        |

---

## Actions

| Action           | Trigger            | Effect                      |
| :--------------- | :----------------- | :-------------------------- |
| `loadLesson`     | Mount              | Fetch lesson data           |
| `submitAnswer`   | SubmitButton click | Validate, show feedback     |
| `nextStep`       | NextButton click   | Advance to next content     |
| `prevStep`       | PrevButton click   | Go to previous content      |
| `saveProgress`   | Step change        | `POST /api/progress`        |
| `completeLesson` | Last step done     | Update progress, show modal |

---

## Data Requirements

| Data          | Source                        | Refresh       |
| :------------ | :---------------------------- | :------------ |
| `lesson`      | `GET /api/lessons/:id`        | On mount      |
| `progress`    | `GET /api/progress/:lessonId` | On mount      |
| `currentStep` | Local state                   | On navigation |

---

## Responsive

```yaml
mobile:
  Content: fullWidth, padding: 12px
  LessonContent: stack-vertical
  AnswerOptions: fullWidth buttons
tablet:
  Content: maxWidth: 768px, centered
  LessonContent: stack-vertical
desktop:
  Content: maxWidth: 1024px, centered
  LessonContent: side-by-side (video left, text right) when applicable
```
