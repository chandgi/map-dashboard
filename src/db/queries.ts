import { db } from './index';
import { countries, cities, states, quizSessions, quizQuestions, userStats } from './schema';
import { eq, sql, desc, and } from 'drizzle-orm';
import type { QuizSettings, QuizState } from '@/types/quiz';

// Country queries
export async function getAllCountries() {
  return await db.select().from(countries);
}

export async function getCountriesByContinent(continent: string) {
  return await db.select().from(countries).where(eq(countries.continent, continent));
}

export async function getRandomCountries(count: number) {
  return await db.select().from(countries).orderBy(sql`RANDOM()`).limit(count);
}

export async function getCountryByCode(code: string) {
  const result = await db.select().from(countries).where(eq(countries.code, code)).limit(1);
  return result[0] || null;
}

// State queries
export async function getAllStates() {
  return await db.select({
    id: states.id,
    name: states.name,
    capital: states.capital,
    code: states.code,
    countryId: states.countryId,
    population: states.population,
    area: states.area,
    country: {
      id: countries.id,
      name: countries.name,
      code: countries.code,
      flagEmoji: countries.flagEmoji,
    }
  })
  .from(states)
  .innerJoin(countries, eq(states.countryId, countries.id));
}

export async function getStatesByCountryCode(countryCode: string) {
  return await db.select({
    id: states.id,
    name: states.name,
    capital: states.capital,
    code: states.code,
    countryId: states.countryId,
    population: states.population,
    area: states.area,
    country: {
      id: countries.id,
      name: countries.name,
      code: countries.code,
      flagEmoji: countries.flagEmoji,
    }
  })
  .from(states)
  .innerJoin(countries, eq(states.countryId, countries.id))
  .where(eq(countries.code, countryCode));
}

export async function getRandomStates(count: number, countryCode?: string) {
  const query = db.select({
    id: states.id,
    name: states.name,
    capital: states.capital,
    code: states.code,
    countryId: states.countryId,
    population: states.population,
    area: states.area,
    country: {
      id: countries.id,
      name: countries.name,
      code: countries.code,
      flagEmoji: countries.flagEmoji,
    }
  })
  .from(states)
  .innerJoin(countries, eq(states.countryId, countries.id))
  .orderBy(sql`RANDOM()`)
  .limit(count);

  if (countryCode) {
    query.where(eq(countries.code, countryCode));
  }

  return await query;
}

export async function getUSStates() {
  return await getStatesByCountryCode('USA');
}

export async function getRandomUSStates(count: number) {
  return await getRandomStates(count, 'USA');
}

// City queries
export async function getAllCapitals() {
  return await db.select({
    id: cities.id,
    name: cities.name,
    countryId: cities.countryId,
    population: cities.population,
    country: {
      id: countries.id,
      name: countries.name,
      code: countries.code,
      alpha2Code: countries.alpha2Code,
      flagEmoji: countries.flagEmoji,
    }
  })
  .from(cities)
  .innerJoin(countries, eq(cities.countryId, countries.id))
  .where(eq(cities.isCapital, true));
}

export async function getCapitalByCountryId(countryId: string) {
  const result = await db.select().from(cities)
    .where(and(eq(cities.countryId, countryId), eq(cities.isCapital, true)))
    .limit(1);
  return result[0] || null;
}

// Quiz session management
export async function createQuizSession(settings: QuizSettings, userId?: string, sessionId?: string) {
  const session = await db.insert(quizSessions).values({
    userId,
    sessionId,
    quizType: settings.quizType,
    difficulty: settings.difficulty,
    totalQuestions: settings.questionCount,
  }).returning();
  
  return session[0];
}

export async function updateQuizSession(sessionId: string, updates: Partial<typeof quizSessions.$inferInsert>) {
  return await db.update(quizSessions)
    .set(updates)
    .where(eq(quizSessions.id, sessionId))
    .returning();
}

export async function saveQuizQuestion(questionData: typeof quizQuestions.$inferInsert) {
  return await db.insert(quizQuestions).values(questionData).returning();
}

export async function getQuizSession(sessionId: string) {
  return await db.select().from(quizSessions).where(eq(quizSessions.id, sessionId)).limit(1);
}

export async function getQuizQuestions(sessionId: string) {
  return await db.select().from(quizQuestions)
    .where(eq(quizQuestions.quizSessionId, sessionId))
    .orderBy(quizQuestions.questionNumber);
}

// User statistics
export async function getUserStats(userId: string) {
  const result = await db.select().from(userStats).where(eq(userStats.userId, userId)).limit(1);
  return result[0] || null;
}

export async function updateUserStats(userId: string, quizData: QuizState) {
  const existingStats = await getUserStats(userId);
  
  const updates = {
    totalQuizzes: (existingStats?.totalQuizzes || 0) + 1,
    totalQuestions: (existingStats?.totalQuestions || 0) + quizData.questions.length,
    totalCorrect: (existingStats?.totalCorrect || 0) + quizData.score,
    averageScore: 0, // Will be calculated
    bestScore: Math.max(existingStats?.bestScore || 0, (quizData.score / quizData.questions.length) * 100),
    totalTimeSpent: (existingStats?.totalTimeSpent || 0) + (quizData.endTime && quizData.startTime ? 
      Math.round((quizData.endTime.getTime() - quizData.startTime.getTime()) / 1000) : 0),
  };

  // Calculate average score
  updates.averageScore = (updates.totalCorrect / updates.totalQuestions) * 100;

  if (existingStats) {
    return await db.update(userStats)
      .set(updates)
      .where(eq(userStats.userId, userId))
      .returning();
  } else {
    return await db.insert(userStats)
      .values({ userId, ...updates })
      .returning();
  }
}

// Leaderboard and statistics
export async function getTopScores(limit: number = 10) {
  return await db.select({
    score: quizSessions.score,
    quizType: quizSessions.quizType,
    difficulty: quizSessions.difficulty,
    completedAt: quizSessions.completedAt,
    totalQuestions: quizSessions.totalQuestions,
    correctAnswers: quizSessions.correctAnswers,
  })
  .from(quizSessions)
  .where(eq(quizSessions.isCompleted, true))
  .orderBy(desc(quizSessions.score))
  .limit(limit);
}

export async function getQuizStats() {
  const stats = await db.select({
    totalQuizzes: sql<number>`count(*)`,
    averageScore: sql<number>`avg(${quizSessions.score})`,
    totalQuestions: sql<number>`sum(${quizSessions.totalQuestions})`,
    totalCorrectAnswers: sql<number>`sum(${quizSessions.correctAnswers})`,
  })
  .from(quizSessions)
  .where(eq(quizSessions.isCompleted, true));

  return stats[0];
}
