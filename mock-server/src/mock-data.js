/**
 * Mock Data Generators
 * Based on SSoT: schema.graphql and module specs
 */

import { faker } from '@faker-js/faker';

// Set seed for reproducible data
faker.seed(42);

// -----------------------------------------------------------------------------
// ID Generators
// -----------------------------------------------------------------------------
export const uuid = () => faker.string.uuid();

// -----------------------------------------------------------------------------
// Auth Module Data
// -----------------------------------------------------------------------------
export const generateUser = (overrides = {}) => ({
  id: uuid(),
  email: faker.internet.email(),
  tenantId: uuid(),
  status: 'ACTIVE',
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
  ...overrides,
});

export const generateTenant = (overrides = {}) => ({
  id: uuid(),
  code: faker.string.alphanumeric(8).toUpperCase(),
  name: faker.company.name() + ' School',
  status: 'ACTIVE',
  domain: faker.internet.domainName(),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
  ...overrides,
});

export const generateUserRole = (userId, role = 'STUDENT') => ({
  id: uuid(),
  userId,
  role,
});

export const generateUserSession = (userId) => ({
  id: uuid(),
  userId,
  deviceId: faker.string.alphanumeric(16),
  lastActivity: faker.date.recent().toISOString(),
  createdAt: faker.date.recent().toISOString(),
});

// -----------------------------------------------------------------------------
// Content Module Data
// -----------------------------------------------------------------------------
export const generateSubject = (overrides = {}) => ({
  id: uuid(),
  name: faker.helpers.arrayElement([
    'Toán học',
    'Tiếng Việt',
    'Tiếng Anh',
    'Khoa học',
    'Lịch sử',
  ]),
  grade: faker.number.int({ min: 1, max: 12 }),
  curriculum: 'Chương trình GDPT 2018',
  ...overrides,
});

export const generateTopic = (subjectId, overrides = {}) => ({
  id: uuid(),
  subjectId,
  name: faker.lorem.words(3),
  order: faker.number.int({ min: 1, max: 20 }),
  ...overrides,
});

export const generateLesson = (topicId, overrides = {}) => ({
  id: uuid(),
  topicId,
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraphs(3),
  status: 'PUBLISHED',
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
  ...overrides,
});

export const generateQuestion = (lessonId, overrides = {}) => ({
  id: uuid(),
  lessonId,
  type: faker.helpers.arrayElement([
    'MULTIPLE_CHOICE',
    'TRUE_FALSE',
    'FILL_BLANK',
  ]),
  content: faker.lorem.sentence() + '?',
  ...overrides,
});

export const generateAnswer = (isCorrect = false) => ({
  id: uuid(),
  text: faker.lorem.words(3),
  isCorrect,
});

// -----------------------------------------------------------------------------
// Learning Module Data
// -----------------------------------------------------------------------------
export const generateLessonProgress = (userId, lessonId, overrides = {}) => ({
  id: uuid(),
  userId,
  lessonId,
  status: faker.helpers.arrayElement(['AVAILABLE', 'IN_PROGRESS', 'COMPLETED']),
  score: faker.number.float({ min: 0, max: 100, fractionDigits: 1 }),
  completedAt: faker.date.recent().toISOString(),
  ...overrides,
});

// -----------------------------------------------------------------------------
// Gamification Module Data
// -----------------------------------------------------------------------------
export const generateUserProfile = (userId) => ({
  userId,
  exp: faker.number.int({ min: 0, max: 50000 }),
  level: faker.number.int({ min: 1, max: 50 }),
  coins: faker.number.int({ min: 0, max: 10000 }),
});

export const generateBadge = () => ({
  id: uuid(),
  name: faker.helpers.arrayElement([
    'First Steps',
    'Speed Demon',
    'Perfect Score',
    'Streak Master',
  ]),
  criteria: faker.lorem.sentence(),
  icon: '🏆',
});

export const generateReward = () => ({
  id: uuid(),
  name: faker.helpers.arrayElement([
    'Avatar Frame',
    'Profile Theme',
    'XP Boost',
    'Coin Pack',
  ]),
  cost: faker.number.int({ min: 100, max: 5000 }),
  type: 'VIRTUAL_ITEM',
  description: faker.lorem.sentence(),
});

export const generateStreak = (userId) => ({
  userId,
  currentStreak: faker.number.int({ min: 0, max: 30 }),
  longestStreak: faker.number.int({ min: 0, max: 100 }),
  lastActiveDate: faker.date.recent().toISOString(),
});

// -----------------------------------------------------------------------------
// Analytics Module Data
// -----------------------------------------------------------------------------
export const generateKnowledgeMap = (userId, topicId) => ({
  userId,
  topicId,
  masteryScore: faker.number.float({ min: 0, max: 1, fractionDigits: 2 }),
});

export const generateDailyStats = (userId, date) => ({
  userId,
  date: date || faker.date.recent().toISOString(),
  lessonsCompleted: faker.number.int({ min: 0, max: 10 }),
  timeSpent: faker.number.int({ min: 0, max: 120 }),
  expEarned: faker.number.int({ min: 0, max: 500 }),
});

// -----------------------------------------------------------------------------
// Tournament Module Data
// -----------------------------------------------------------------------------
export const generateTournament = (overrides = {}) => ({
  id: uuid(),
  name: faker.lorem.words(3) + ' Championship',
  type: faker.helpers.arrayElement(['SOLO', 'TEAM', 'CLASS']),
  status: faker.helpers.arrayElement([
    'SCHEDULED',
    'REGISTRATION',
    'IN_PROGRESS',
    'COMPLETED',
  ]),
  startTime: faker.date.soon().toISOString(),
  endTime: faker.date.future().toISOString(),
  createdAt: faker.date.past().toISOString(),
  ...overrides,
});

export const generateParticipant = (tournamentId, userId) => ({
  id: uuid(),
  tournamentId,
  userId,
  score: faker.number.float({ min: 0, max: 1000, fractionDigits: 1 }),
  rank: faker.number.int({ min: 1, max: 100 }),
});

// -----------------------------------------------------------------------------
// Realtime Module Data
// -----------------------------------------------------------------------------
export const generateNotification = (userId) => ({
  id: uuid(),
  userId,
  type: faker.helpers.arrayElement([
    'BADGE_EARNED',
    'LEVEL_UP',
    'TOURNAMENT_START',
    'LESSON_REMINDER',
  ]),
  content: faker.lorem.sentence(),
  readAt: faker.datatype.boolean() ? faker.date.recent().toISOString() : null,
  createdAt: faker.date.recent().toISOString(),
});

// -----------------------------------------------------------------------------
// Batch Generators
// -----------------------------------------------------------------------------
export const generateMockDatabase = () => {
  const tenant = generateTenant();
  const users = Array.from({ length: 10 }, () =>
    generateUser({ tenantId: tenant.id }),
  );
  const subjects = Array.from({ length: 5 }, () => generateSubject());

  const topics = subjects.flatMap((s) =>
    Array.from({ length: 4 }, () => generateTopic(s.id)),
  );

  const lessons = topics.flatMap((t) =>
    Array.from({ length: 5 }, () => generateLesson(t.id)),
  );

  const questions = lessons.flatMap((l) =>
    Array.from({ length: 3 }, () => ({
      ...generateQuestion(l.id),
      answers: [
        generateAnswer(true),
        generateAnswer(false),
        generateAnswer(false),
        generateAnswer(false),
      ],
    })),
  );

  const badges = Array.from({ length: 10 }, () => generateBadge());
  const rewards = Array.from({ length: 8 }, () => generateReward());
  const tournaments = Array.from({ length: 5 }, () => generateTournament());

  return {
    tenant,
    users,
    subjects,
    topics,
    lessons,
    questions,
    badges,
    rewards,
    tournaments,
  };
};
