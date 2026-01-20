---
id: frontend
title: Frontend Architecture
sidebar_label: Frontend
sidebar_position: 4
---

# Frontend Architecture

Component hierarchy, state management, routing, and external tool references.

---

## Overview

This document consolidates frontend architecture decisions including component structure, state management patterns, and route definitions.

---

## External References

| Tool | Purpose | Link |
|------|---------|------|
| Figma | UI/UX Design | `[Figma Project URL]` |
| Storybook | Component Library | `[Storybook URL]` |
| Chromatic | Visual Testing | `[Chromatic URL]` |

---

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | React | 18.x |
| Language | TypeScript | 5.x |
| Build Tool | Vite + SWC | 5.x |
| Styling | Tailwind CSS | 3.x |
| UI Components | shadcn/ui + Radix UI | latest |
| State (Server) | TanStack Query | 5.x |
| State (GraphQL) | Apollo Client | 4.x |
| Forms | React Hook Form | 7.x |
| Validation | Zod | 3.x |
| Routing | React Router | 6.x |

---

## Component Architecture

### Component Categories

| Category | Path | Purpose |
|----------|------|---------|
| UI | `src/components/ui/` | shadcn/ui primitives |
| Layout | `src/components/layout/` | Page layouts, navigation |
| Features | `src/components/features/` | Business logic components |
| Shared | `src/components/shared/` | Reusable utilities |

### Component Hierarchy

```
src/components/
├── ui/                    # Base UI components (shadcn/ui)
│   ├── button/
│   ├── input/
│   ├── modal/
│   ├── card/
│   └── ...
├── layout/                # Layout components
│   ├── Header/
│   ├── Sidebar/
│   ├── Footer/
│   └── PageLayout/
├── features/              # Feature-specific components
│   ├── auth/              # Authentication
│   ├── learning/          # Learning module
│   ├── tournament/        # Tournament module
│   └── gamification/      # Gamification module
└── shared/                # Shared components
    ├── forms/
    ├── tables/
    └── charts/
```

### Component Naming

| Type | Convention | Example |
|------|------------|---------|
| Component | PascalCase | `UserProfile.tsx` |
| Hook | camelCase with `use` prefix | `useAuth.ts` |
| Utility | camelCase | `formatDate.ts` |
| Type | PascalCase | `User.types.ts` |
| Test | Same name + `.test` | `UserProfile.test.tsx` |

### UI Components

| Component | Description | Props |
|-----------|-------------|-------|
| `Button` | Action button | `variant`, `size`, `onClick` |
| `Input` | Input field | `type`, `value`, `onChange` |
| `Modal` | Dialog modal | `open`, `onClose`, `children` |
| `Card` | Content card | `title`, `children` |
| `Avatar` | User avatar | `src`, `fallback` |
| `Badge` | Label/badge | `variant`, `children` |

### Feature Components

| Module | Components |
|--------|------------|
| Auth | `LoginForm`, `RegisterForm`, `ForgotPasswordForm` |
| Learning | `LearningPath`, `LessonCard`, `ExercisePlayer`, `QuizQuestion` |
| Tournament | `TournamentList`, `MatchCard`, `Leaderboard`, `BattleArena` |
| Gamification | `PointsDisplay`, `BadgeGrid`, `LevelProgress`, `RewardModal` |

---

## State Management

### State Categories

| Category | Scope | Storage | Example |
|----------|-------|---------|---------|
| **Server State** | Remote data | TanStack Query | API responses |
| **GraphQL State** | GraphQL data | Apollo Client | Queries, mutations |
| **Client State** | UI state | React Context | Modal open/close |
| **Form State** | Form data | React Hook Form | Input values |
| **URL State** | Navigation | React Router | Query params |

### State Patterns

| Pattern | Tool | Description |
|---------|------|-------------|
| Query | TanStack Query | Fetch with `queryKey` and `queryFn` |
| Mutation | TanStack Query | Mutate with `mutationFn`, invalidate on success |
| GraphQL Query | Apollo | Use `useQuery` with variables |
| GraphQL Mutation | Apollo | Use `useMutation` with `refetchQueries` |
| Context | React Context | Create context, provider, and custom hook |

### Global State with Context

```typescript
// contexts/AuthContext.tsx
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthState>(initialState);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

---

## Routing

### Route Structure

| Path | Component | Auth | Description |
|------|-----------|------|-------------|
| `/` | `HomePage` | No | Landing page |
| `/login` | `LoginPage` | No | Login |
| `/register` | `RegisterPage` | No | Registration |
| `/dashboard` | `DashboardPage` | Yes | Main dashboard |
| `/learning` | `LearningPage` | Yes | Learning path |
| `/learning/:lessonId` | `LessonPage` | Yes | Lesson detail |
| `/tournaments` | `TournamentListPage` | Yes | Tournament list |
| `/tournaments/:id` | `TournamentDetailPage` | Yes | Tournament detail |
| `/profile` | `ProfilePage` | Yes | User profile |
| `/admin/*` | `AdminRoutes` | Admin | Admin panel |
| `*` | `NotFoundPage` | No | 404 |

### Route Guards

| Guard | Purpose | Behavior |
|-------|---------|----------|
| ProtectedRoute | Require authentication | Redirect to `/login` if not authenticated |
| RoleGuard | Require specific role | Redirect to `/403` if role mismatch |
| GuestRoute | Authenticated redirect | Redirect to `/dashboard` if authenticated |

### Lazy Loading

| Strategy | Description |
|----------|-------------|
| Route-based | Lazy load page components |
| Suspense | Show skeleton while loading |
| Prefetch | Preload on hover/focus |

---

## Folder Structure

| Path | Purpose |
|------|---------|
| `src/components/ui/` | shadcn/ui components |
| `src/components/layout/` | Layouts, navigation |
| `src/components/features/` | Feature components |
| `src/components/shared/` | Common components |
| `src/hooks/` | Custom hooks |
| `src/contexts/` | React contexts |
| `src/lib/` | Utilities |
| `src/pages/` | Page components |
| `src/graphql/` | GraphQL operations |
| `src/types/` | TypeScript types |
| `src/assets/` | Static assets |

---

## Component Guidelines

### Do's

- Keep components small and focused
- Use composition over inheritance
- Extract reusable logic into hooks
- Define prop types clearly
- Write unit tests for complex logic
- Use React.memo for heavy components

### Don'ts

- Don't use inline styles (use Tailwind)
- Don't hardcode strings (use i18n)
- Don't mutate props
- Don't use `any` type
- Don't skip error handling
- Don't create oversized components (> 200 lines)

---

## References

- [Design System](../../design/README.md)
- [System Design](./system-design.md)
- [Tech Stack](./tech-stack.md)
