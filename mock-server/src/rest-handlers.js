/**
 * REST API Mock Handlers
 * Based on SSoT: api-v1.yaml
 */

import { Router } from 'express';
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

const router = Router();
const db = generateMockDatabase();

// Simulated current user
let currentUser = db.users[0];

// Helper for paginated responses
const paginate = (items, page = 1, limit = 20) => ({
  data: items.slice((page - 1) * limit, page * limit),
  meta: {
    total: items.length,
    page,
    limit,
    totalPages: Math.ceil(items.length / limit),
  },
});

// -----------------------------------------------------------------------------
// Health Check
// -----------------------------------------------------------------------------
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// -----------------------------------------------------------------------------
// AUTH MODULE (SSoT: auth.md)
// -----------------------------------------------------------------------------
router.post('/login', (req, res) => {
  const { email } = req.body;
  currentUser = generateUser({ email });
  res.json({
    access_token: 'mock-access-token-' + uuid(),
    refresh_token: 'mock-refresh-token-' + uuid(),
    user: currentUser,
  });
});

router.post('/register', (req, res) => {
  const { email, role } = req.body;
  res.status(201).json(generateUser({ email, status: 'PENDING' }));
});

router.post('/refresh', (req, res) => {
  res.json({
    access_token: 'mock-access-token-' + uuid(),
    refresh_token: 'mock-refresh-token-' + uuid(),
  });
});

router.post('/logout', (req, res) => {
  res.status(204).send();
});

router.get('/sessions', (req, res) => {
  res.json([
    {
      id: uuid(),
      user_id: currentUser.id,
      device_id: 'web-browser',
      last_activity: new Date().toISOString(),
    },
  ]);
});

router.delete('/sessions/:id', (req, res) => {
  res.status(204).send();
});

router.post('/parents/link', (req, res) => {
  res.json({ success: true, message: 'Link request sent' });
});

// -----------------------------------------------------------------------------
// ADMIN MODULE (SSoT: admin.md)
// -----------------------------------------------------------------------------
router.get('/tenants', (req, res) => {
  res.json(paginate([db.tenant]));
});

router.post('/tenants', (req, res) => {
  res.status(201).json({ ...db.tenant, ...req.body, id: uuid() });
});

router.put('/tenants/:id', (req, res) => {
  res.json({ ...db.tenant, ...req.body, id: req.params.id });
});

router.delete('/tenants/:id', (req, res) => {
  res.status(204).send();
});

router.post('/users/import', (req, res) => {
  res.status(202).json({ job_id: uuid(), status: 'processing' });
});

router.post('/users/:id/impersonate', (req, res) => {
  const user = db.users.find((u) => u.id === req.params.id) || currentUser;
  res.json({
    access_token: 'mock-impersonate-token-' + uuid(),
    user,
  });
});

// -----------------------------------------------------------------------------
// LEARNING MODULE (SSoT: learning.md)
// -----------------------------------------------------------------------------
router.get('/progress', (req, res) => {
  const progress = db.lessons
    .slice(0, 10)
    .map((l) => generateLessonProgress(currentUser.id, l.id));
  res.json(progress);
});

router.get('/lessons/:id/content', (req, res) => {
  const lesson = db.lessons.find((l) => l.id === req.params.id);
  if (!lesson) return res.status(404).json({ error: 'Not found' });
  res.json(lesson);
});

router.post('/lessons/:id/complete', (req, res) => {
  res.json(
    generateLessonProgress(currentUser.id, req.params.id, {
      status: 'COMPLETED',
    }),
  );
});

router.get('/lessons/:id/exercise', (req, res) => {
  const questions = db.questions.filter((q) => q.lessonId === req.params.id);
  res.json(questions);
});

router.post('/exercises/:id/submit', (req, res) => {
  const { answers } = req.body;
  res.json({
    session_id: uuid(),
    score: 85.5,
    correct_count: answers?.length - 1 || 2,
    total_count: answers?.length || 3,
    results: (answers || []).map((a) => ({
      question_id: a.question_id,
      is_correct: Math.random() > 0.3,
    })),
  });
});

router.get('/recommendations', (req, res) => {
  res.json(db.lessons.slice(0, 5));
});

// -----------------------------------------------------------------------------
// CONTENT MODULE (SSoT: content.md)
// -----------------------------------------------------------------------------
router.get('/subjects', (req, res) => {
  res.json(db.subjects);
});

router.get('/topics', (req, res) => {
  const { subject_id } = req.query;
  const topics = subject_id
    ? db.topics.filter((t) => t.subjectId === subject_id)
    : db.topics;
  res.json(topics);
});

router.get('/lessons', (req, res) => {
  const { topic_id } = req.query;
  const lessons = topic_id
    ? db.lessons.filter((l) => l.topicId === topic_id)
    : db.lessons;
  res.json(paginate(lessons));
});

router.post('/lessons', (req, res) => {
  res.status(201).json({
    id: uuid(),
    ...req.body,
    status: 'DRAFT',
    created_at: new Date().toISOString(),
  });
});

router.get('/lessons/:id', (req, res) => {
  const lesson = db.lessons.find((l) => l.id === req.params.id);
  if (!lesson) return res.status(404).json({ error: 'Not found' });
  res.json(lesson);
});

router.put('/lessons/:id/publish', (req, res) => {
  const lesson = db.lessons.find((l) => l.id === req.params.id);
  res.json({ ...lesson, status: 'PUBLISHED' });
});

router.post('/questions/import', (req, res) => {
  res.status(202).json({ job_id: uuid(), status: 'processing' });
});

router.get('/questions/search', (req, res) => {
  const { query, type } = req.query;
  let results = db.questions;
  if (query)
    results = results.filter((q) =>
      q.content.toLowerCase().includes(query.toLowerCase()),
    );
  if (type) results = results.filter((q) => q.type === type);
  res.json(results.slice(0, 20));
});

// -----------------------------------------------------------------------------
// GAMIFICATION MODULE (SSoT: gamification.md)
// -----------------------------------------------------------------------------
router.get('/profile', (req, res) => {
  res.json(generateUserProfile(currentUser.id));
});

router.get('/badges', (req, res) => {
  res.json(
    db.badges.slice(0, 5).map((b) => ({
      badge: b,
      earned_at: new Date().toISOString(),
    })),
  );
});

router.get('/leaderboard', (req, res) => {
  res.json(
    db.users.slice(0, 10).map((u, i) => ({
      rank: i + 1,
      user_id: u.id,
      user: u,
      score: 10000 - i * 500,
    })),
  );
});

router.get('/rewards', (req, res) => {
  res.json(db.rewards);
});

router.post('/rewards/:id/redeem', (req, res) => {
  res.json({ success: true, message: 'Reward redeemed' });
});

router.get('/streaks', (req, res) => {
  res.json(generateStreak(currentUser.id));
});

// -----------------------------------------------------------------------------
// ANALYTICS MODULE (SSoT: analytics.md)
// -----------------------------------------------------------------------------
router.get('/progress/overview', (req, res) => {
  res.json({
    total_lessons: db.lessons.length,
    completed_lessons: Math.floor(db.lessons.length * 0.3),
    average_score: 78.5,
    total_time_spent: 1250,
    current_streak: 7,
  });
});

router.get('/progress/subject/:id', (req, res) => {
  const topicIds = db.topics
    .filter((t) => t.subjectId === req.params.id)
    .map((t) => t.id);
  const progress = db.lessons
    .filter((l) => topicIds.includes(l.topicId))
    .slice(0, 10)
    .map((l) => generateLessonProgress(currentUser.id, l.id));
  res.json(progress);
});

router.get('/knowledge-map', (req, res) => {
  res.json(
    db.topics
      .slice(0, 10)
      .map((t) => generateKnowledgeMap(currentUser.id, t.id)),
  );
});

router.get('/daily-stats', (req, res) => {
  res.json(
    Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return generateDailyStats(currentUser.id, date.toISOString());
    }),
  );
});

router.get('/reports/class/:id', (req, res) => {
  res.json({
    class_id: req.params.id,
    total_students: 30,
    average_progress: 0.65,
    average_score: 75.2,
    top_performers: db.users.slice(0, 5),
    needs_attention: db.users.slice(5, 8),
  });
});

// -----------------------------------------------------------------------------
// TOURNAMENT MODULE (SSoT: tournament.md)
// -----------------------------------------------------------------------------
router.get('/tournaments', (req, res) => {
  const { status } = req.query;
  const tournaments = status
    ? db.tournaments.filter((t) => t.status === status)
    : db.tournaments;
  res.json(tournaments);
});

router.post('/tournaments', (req, res) => {
  res.status(201).json({
    id: uuid(),
    ...req.body,
    status: 'SCHEDULED',
    created_at: new Date().toISOString(),
  });
});

router.get('/tournaments/:id', (req, res) => {
  const tournament = db.tournaments.find((t) => t.id === req.params.id);
  if (!tournament) return res.status(404).json({ error: 'Not found' });
  res.json(tournament);
});

router.post('/tournaments/:id/join', (req, res) => {
  res.json(generateParticipant(req.params.id, currentUser.id));
});

router.get('/tournaments/:id/matches', (req, res) => {
  res.json([
    {
      id: uuid(),
      tournament_id: req.params.id,
      order: 1,
      start_time: new Date().toISOString(),
      questions: db.questions.slice(0, 5),
    },
  ]);
});

router.post('/tournaments/matches/:id/submit', (req, res) => {
  res.json({
    id: uuid(),
    round_id: req.params.id,
    score: 95.5,
    time_ms: 12500,
  });
});

router.get('/tournaments/:id/leaderboard', (req, res) => {
  res.json(
    db.users.slice(0, 10).map((u, i) => ({
      ...generateParticipant(req.params.id, u.id),
      rank: i + 1,
    })),
  );
});

// -----------------------------------------------------------------------------
// REALTIME MODULE (SSoT: realtime.md)
// -----------------------------------------------------------------------------
router.get('/notifications', (req, res) => {
  res.json(
    Array.from({ length: 5 }, () => generateNotification(currentUser.id)),
  );
});

router.put('/notifications/:id/read', (req, res) => {
  res.json({
    id: req.params.id,
    read_at: new Date().toISOString(),
  });
});

router.delete('/notifications/:id', (req, res) => {
  res.status(204).send();
});

export default router;
