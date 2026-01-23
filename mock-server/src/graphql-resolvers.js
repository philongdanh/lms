/**
 * GraphQL Mock Resolvers
 * Based on SSoT: schema.graphql
 */

import {
  generateMockDatabase,
  generateUser,
  generateUserProfile,
  generateStreak,
  generateLessonProgress,
  generateKnowledgeMap,
  generateDailyStats,
  generateNotification,
  generateParticipant,
  uuid,
} from './mock-data.js';

// Initialize mock database
const db = generateMockDatabase();

// Current user (simulated login)
let currentUser = db.users[0];
currentUser.roles = [{ id: uuid(), userId: currentUser.id, role: 'STUDENT' }];
currentUser.profile = generateUserProfile(currentUser.id);
currentUser.profile.streak = generateStreak(currentUser.id);

// -----------------------------------------------------------------------------
// Query Resolvers
// -----------------------------------------------------------------------------
export const queryResolvers = {
  health: () => true,

  // Auth
  me: () => currentUser,
  sessions: () => [
    { id: uuid(), userId: currentUser.id, deviceId: 'web-browser', lastActivity: new Date().toISOString(), createdAt: new Date().toISOString() },
  ],

  // Admin
  tenants: () => [db.tenant],
  tenant: (_, { id }) => id === db.tenant.id ? db.tenant : null,

  // Content
  subjects: () => db.subjects,
  topics: (_, { subjectId }) => subjectId 
    ? db.topics.filter(t => t.subjectId === subjectId)
    : db.topics,
  lessons: (_, { topicId }) => topicId
    ? db.lessons.filter(l => l.topicId === topicId)
    : db.lessons,
  lesson: (_, { id }) => db.lessons.find(l => l.id === id),
  searchQuestions: (_, { query, type }) => {
    let results = db.questions.filter(q => 
      q.content.toLowerCase().includes(query.toLowerCase())
    );
    if (type) results = results.filter(q => q.type === type);
    return results.slice(0, 20);
  },

  // Learning
  progress: () => db.lessons.slice(0, 10).map(l => 
    generateLessonProgress(currentUser.id, l.id)
  ),
  learningPath: (_, { subjectId }) => ({
    id: uuid(),
    userId: currentUser.id,
    subjectId,
    lessons: db.lessons.filter(l => {
      const topic = db.topics.find(t => t.id === l.topicId);
      return topic?.subjectId === subjectId;
    }).slice(0, 10),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }),
  lessonContent: (_, { id }) => db.lessons.find(l => l.id === id),
  lessonExercises: (_, { id }) => db.questions.filter(q => q.lessonId === id),
  recommendations: () => db.lessons.slice(0, 5),

  // Gamification
  profile: () => currentUser.profile,
  badges: () => db.badges.slice(0, 3).map(b => ({
    userId: currentUser.id,
    badgeId: b.id,
    badge: b,
    earnedAt: new Date().toISOString(),
  })),
  leaderboard: (_, { limit = 10 }) => db.users.slice(0, limit).map((u, i) => ({
    rank: i + 1,
    userId: u.id,
    user: u,
    score: 10000 - (i * 500),
  })),
  rewards: () => db.rewards,
  streaks: () => currentUser.profile.streak,

  // Analytics
  progressOverview: () => ({
    totalLessons: db.lessons.length,
    completedLessons: Math.floor(db.lessons.length * 0.3),
    averageScore: 78.5,
    totalTimeSpent: 1250,
    currentStreak: currentUser.profile.streak.currentStreak,
  }),
  subjectProgress: (_, { subjectId }) => {
    const topicIds = db.topics.filter(t => t.subjectId === subjectId).map(t => t.id);
    return db.lessons
      .filter(l => topicIds.includes(l.topicId))
      .slice(0, 10)
      .map(l => generateLessonProgress(currentUser.id, l.id));
  },
  knowledgeMap: () => db.topics.slice(0, 10).map(t => ({
    ...generateKnowledgeMap(currentUser.id, t.id),
    topic: t,
  })),
  dailyStats: () => Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return generateDailyStats(currentUser.id, date.toISOString());
  }),
  classReport: (_, { classId }) => ({
    classId,
    totalStudents: 30,
    averageProgress: 0.65,
    averageScore: 75.2,
    topPerformers: db.users.slice(0, 5),
    needsAttention: db.users.slice(5, 8),
  }),

  // Tournament
  tournaments: (_, { status }) => status
    ? db.tournaments.filter(t => t.status === status)
    : db.tournaments,
  tournament: (_, { id }) => db.tournaments.find(t => t.id === id),
  tournamentMatches: (_, { tournamentId }) => [{
    id: uuid(),
    tournamentId,
    order: 1,
    startTime: new Date().toISOString(),
    questions: db.questions.slice(0, 5),
  }],
  tournamentLeaderboard: (_, { tournamentId }) => 
    db.users.slice(0, 10).map((u, i) => generateParticipant(tournamentId, u.id)),

  // Realtime
  notifications: () => Array.from({ length: 5 }, () => 
    generateNotification(currentUser.id)
  ),
};

// -----------------------------------------------------------------------------
// Mutation Resolvers
// -----------------------------------------------------------------------------
export const mutationResolvers = {
  // Auth
  login: (_, { input }) => {
    currentUser = generateUser({ email: input.email });
    currentUser.profile = generateUserProfile(currentUser.id);
    return {
      accessToken: 'mock-access-token-' + uuid(),
      refreshToken: 'mock-refresh-token-' + uuid(),
      user: currentUser,
    };
  },
  register: (_, { input }) => generateUser({ email: input.email, status: 'PENDING' }),
  refreshToken: () => ({
    accessToken: 'mock-access-token-' + uuid(),
    refreshToken: 'mock-refresh-token-' + uuid(),
    user: currentUser,
  }),
  logout: () => true,
  revokeSession: () => true,
  linkParent: () => true,

  // Admin
  createTenant: (_, { input }) => ({ ...db.tenant, ...input, id: uuid() }),
  updateTenant: (_, { id, input }) => ({ ...db.tenant, ...input, id }),
  deleteTenant: () => true,
  importUsers: () => true,
  impersonateUser: (_, { userId }) => ({
    accessToken: 'mock-impersonate-token-' + uuid(),
    refreshToken: 'mock-refresh-token-' + uuid(),
    user: db.users.find(u => u.id === userId) || currentUser,
  }),

  // Content
  createLesson: (_, { input }) => ({
    id: uuid(),
    ...input,
    status: 'DRAFT',
    content: input.content || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }),
  updateLesson: (_, { id, input }) => {
    const lesson = db.lessons.find(l => l.id === id);
    return { ...lesson, ...input, updatedAt: new Date().toISOString() };
  },
  publishLesson: (_, { id }) => {
    const lesson = db.lessons.find(l => l.id === id);
    return { ...lesson, status: 'PUBLISHED' };
  },
  importQuestions: () => true,

  // Learning
  completeLesson: (_, { id }) => generateLessonProgress(currentUser.id, id, { status: 'COMPLETED' }),
  submitExercise: (_, { lessonId, input }) => ({
    sessionId: uuid(),
    score: 85.5,
    correctCount: input.answers.length - 1,
    totalCount: input.answers.length,
    results: input.answers.map(a => ({
      questionId: a.questionId,
      isCorrect: Math.random() > 0.3,
    })),
  }),

  // Gamification
  redeemReward: () => true,

  // Tournament
  createTournament: (_, { input }) => ({
    id: uuid(),
    ...input,
    status: 'SCHEDULED',
    rounds: [],
    participants: [],
    createdAt: new Date().toISOString(),
  }),
  joinTournament: (_, { tournamentId }) => generateParticipant(tournamentId, currentUser.id),
  submitMatchAnswer: (_, { matchId, input }) => ({
    id: uuid(),
    roundId: matchId,
    userId: currentUser.id,
    answers: input.answers.map(a => ({ ...a, isCorrect: Math.random() > 0.3 })),
    score: 95.5,
    timeMs: 12500,
  }),

  // Realtime
  markNotificationRead: (_, { id }) => ({
    id,
    userId: currentUser.id,
    type: 'BADGE_EARNED',
    content: 'Notification content',
    readAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  }),
  deleteNotification: () => true,
};

// -----------------------------------------------------------------------------
// Type Resolvers (for nested fields)
// -----------------------------------------------------------------------------
export const typeResolvers = {
  User: {
    tenant: (user) => db.tenant,
    roles: (user) => user.roles || [{ id: uuid(), userId: user.id, role: 'STUDENT' }],
    sessions: () => [],
    profile: (user) => user.profile || generateUserProfile(user.id),
  },
  Tenant: {
    users: () => db.users,
    settings: () => ({ id: uuid(), tenantId: db.tenant.id, configJson: {} }),
  },
  Subject: {
    topics: (subject) => db.topics.filter(t => t.subjectId === subject.id),
  },
  Topic: {
    subject: (topic) => db.subjects.find(s => s.id === topic.subjectId),
    lessons: (topic) => db.lessons.filter(l => l.topicId === topic.id),
  },
  Lesson: {
    topic: (lesson) => db.topics.find(t => t.id === lesson.topicId),
    questions: (lesson) => db.questions.filter(q => q.lessonId === lesson.id),
  },
  Question: {
    answers: (question) => question.answers || [],
  },
  LessonProgress: {
    lesson: (progress) => db.lessons.find(l => l.id === progress.lessonId),
  },
  UserProfile: {
    badges: () => [],
    streak: (profile) => profile.streak || generateStreak(profile.userId),
  },
  LeaderboardEntry: {
    user: (entry) => db.users.find(u => u.id === entry.userId),
  },
  KnowledgeMap: {
    topic: (km) => db.topics.find(t => t.id === km.topicId),
  },
  Tournament: {
    rounds: () => [],
    participants: () => [],
  },
  Participant: {
    user: (p) => db.users.find(u => u.id === p.userId),
  },
};
