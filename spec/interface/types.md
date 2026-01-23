---
id: types
title: Type Definitions
sidebar_label: Types
sidebar_position: 3
---

# Type Definitions

Định nghĩa TypeScript interfaces cho các entities chính trong hệ thống.

---

## Core Entities

### Tenant & User

```typescript
type TenantStatus = 'ACTIVE' | 'SUSPENDED' | 'PENDING';
type UserStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'PENDING_DEACTIVATION';
type Role = 'SUPER_ADMIN' | 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';

interface Tenant {
  id: string;
  name: string;
  code: string;
  domain?: string;
  status: TenantStatus;
  settings: TenantSettings;
  createdAt: Date;
  updatedAt: Date;
}

interface TenantSettings {
  maxDevicesPerUser: number;
  jwtExpiryMinutes: number;
  refreshTokenDays: number;
  passingScore: number;
}

interface User {
  id: string;
  tenantId: string;
  email: string;
  password: string;
  name: string;
  status: UserStatus;
  emailVerifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

interface UserRole {
  id: string;
  userId: string;
  role: Role;
  tenantId: string;
  assignedAt: Date;
}

interface UserSession {
  id: string;
  userId: string;
  deviceId: string;
  deviceName: string;
  refreshToken: string;
  isActive: boolean;
  lastActiveAt: Date;
  createdAt: Date;
  expiresAt: Date;
}
```

---

## Content Entities

### Learning Content

```typescript
type LessonStatus = 'DRAFT' | 'PENDING_REVIEW' | 'PUBLISHED' | 'ARCHIVED';
type QuestionType =
  | 'SINGLE_CHOICE'
  | 'MULTIPLE_CHOICE'
  | 'TRUE_FALSE'
  | 'FILL_BLANK'
  | 'ESSAY';

interface Subject {
  id: string;
  tenantId: string;
  name: string;
  grade: number;
  curriculum: string;
  order: number;
}

interface Topic {
  id: string;
  subjectId: string;
  name: string;
  order: number;
  createdAt: Date;
}

interface Lesson {
  id: string;
  topicId: string;
  title: string;
  content: string;
  status: LessonStatus;
  passingScore: number;
  estimatedMinutes: number;
  createdBy: string;
  publishedBy?: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface Question {
  id: string;
  lessonId: string;
  type: QuestionType;
  content: string;
  options: QuestionOption[];
  correctAnswer: string | string[];
  explanation?: string;
  order: number;
}

interface QuestionOption {
  id: string;
  label: string;
  content: string;
}
```

---

## Learning Progress

```typescript
type ProgressStatus =
  | 'LOCKED'
  | 'AVAILABLE'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'REVIEW';

interface LearningPath {
  id: string;
  userId: string;
  subjectId: string;
  lessons: string[];
  generatedAt: Date;
  validUntil: Date;
}

interface LessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  status: ProgressStatus;
  bestScore: number;
  attempts: number;
  completedAt?: Date;
  updatedAt: Date;
}

interface ExerciseSession {
  id: string;
  userId: string;
  lessonId: string;
  startedAt: Date;
  submittedAt?: Date;
  score?: number;
  timeSpentSeconds: number;
}

interface SubmissionAnswer {
  questionId: string;
  answer: string | string[];
  isCorrect: boolean;
  answeredAt: Date;
}
```

---

## Tournament & Gamification

```typescript
type TournamentStatus =
  | 'DRAFT'
  | 'REGISTRATION'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

interface Tournament {
  id: string;
  tenantId: string;
  name: string;
  status: TournamentStatus;
  maxParticipants: number;
  startsAt: Date;
  endsAt: Date;
  createdBy: string;
}

interface CompetitionRound {
  id: string;
  tournamentId: string;
  roundNumber: number;
  startsAt: Date;
  endsAt: Date;
  questions: string[];
}

interface Participant {
  id: string;
  roundId: string;
  userId: string;
  score: number;
  rank?: number;
  finishedAt?: Date;
}

interface UserExp {
  userId: string;
  totalExp: number;
  level: number;
  currentLevelExp: number;
  nextLevelExp: number;
}

interface Badge {
  id: string;
  code: string;
  name: string;
  description: string;
  iconUrl: string;
  criteria: BadgeCriteria;
}

interface BadgeCriteria {
  type: 'LESSON_COMPLETE' | 'STREAK' | 'SCORE' | 'TOURNAMENT_WIN';
  threshold: number;
}
```

---

## API Types

### Request/Response

```typescript
interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  error?: ApiError;
  meta: ResponseMeta;
}

interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

interface ResponseMeta {
  timestamp: string;
  requestId: string;
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: ResponseMeta & {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}
```

### Auth Payloads

```typescript
interface LoginRequest {
  email: string;
  password: string;
  deviceId: string;
  deviceName: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: Pick<User, 'id' | 'email' | 'name'>;
  roles: Role[];
}

interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: 'STUDENT' | 'PARENT';
  tenantCode: string;
}
```

---
