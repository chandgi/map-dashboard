import { pgTable, uuid, text, varchar, integer, timestamp, boolean, real, index, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  username: varchar('username', { length: 100 }).notNull().unique(),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  avatarUrl: text('avatar_url'),
  isEmailVerified: boolean('is_email_verified').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  emailIdx: uniqueIndex('email_idx').on(table.email),
  usernameIdx: uniqueIndex('username_idx').on(table.username),
}));

// Countries table
export const countries = pgTable('countries', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  code: varchar('code', { length: 3 }).notNull().unique(), // ISO 3166-1 alpha-2/3
  alpha2Code: varchar('alpha2_code', { length: 2 }).notNull().unique(),
  alpha3Code: varchar('alpha3_code', { length: 3 }).notNull().unique(),
  numericCode: integer('numeric_code'),
  capital: varchar('capital', { length: 100 }),
  continent: varchar('continent', { length: 50 }),
  region: varchar('region', { length: 100 }),
  subregion: varchar('subregion', { length: 100 }),
  population: integer('population'),
  area: real('area'), // in square kilometers
  flagEmoji: varchar('flag_emoji', { length: 10 }),
  flagUrl: text('flag_url'),
  flagFigmaUrl: text('flag_figma_url'), // URL from Figma file
  mapFigmaUrl: text('map_figma_url'), // Map outline from Figma
  latitude: real('latitude'),
  longitude: real('longitude'),
  currencies: text('currencies'), // JSON string of currencies
  languages: text('languages'), // JSON string of languages
  timezones: text('timezones'), // JSON string of timezones
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  codeIdx: uniqueIndex('country_code_idx').on(table.code),
  alpha2Idx: uniqueIndex('country_alpha2_idx').on(table.alpha2Code),
  alpha3Idx: uniqueIndex('country_alpha3_idx').on(table.alpha3Code),
  continentIdx: index('continent_idx').on(table.continent),
  regionIdx: index('region_idx').on(table.region),
}));

// States/Provinces table
export const states = pgTable('states', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  code: varchar('code', { length: 10 }), // State/province code
  countryId: uuid('country_id').notNull().references(() => countries.id),
  type: varchar('type', { length: 50 }).default('state'), // state, province, region, etc.
  capital: varchar('capital', { length: 100 }),
  population: integer('population'),
  area: real('area'),
  latitude: real('latitude'),
  longitude: real('longitude'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  countryIdx: index('state_country_idx').on(table.countryId),
  nameCountryIdx: index('state_name_country_idx').on(table.name, table.countryId),
}));

// Cities table (including capitals)
export const cities = pgTable('cities', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  countryId: uuid('country_id').notNull().references(() => countries.id),
  stateId: uuid('state_id').references(() => states.id),
  isCapital: boolean('is_capital').default(false),
  isStateCapital: boolean('is_state_capital').default(false),
  population: integer('population'),
  latitude: real('latitude'),
  longitude: real('longitude'),
  elevation: real('elevation'), // in meters
  timezone: varchar('timezone', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  countryIdx: index('city_country_idx').on(table.countryId),
  stateIdx: index('city_state_idx').on(table.stateId),
  capitalIdx: index('capital_idx').on(table.isCapital),
  stateCapitalIdx: index('state_capital_idx').on(table.isStateCapital),
  nameCountryIdx: index('city_name_country_idx').on(table.name, table.countryId),
}));

// Quiz Sessions table
export const quizSessions = pgTable('quiz_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  sessionId: varchar('session_id', { length: 255 }), // For anonymous users
  quizType: varchar('quiz_type', { length: 50 }).notNull(), // 'flags', 'capitals', 'mixed'
  difficulty: varchar('difficulty', { length: 20 }).notNull(), // 'easy', 'medium', 'hard'
  totalQuestions: integer('total_questions').notNull(),
  correctAnswers: integer('correct_answers').notNull().default(0),
  score: real('score').notNull().default(0), // percentage
  timeSpent: integer('time_spent'), // in seconds
  isCompleted: boolean('is_completed').default(false),
  startedAt: timestamp('started_at').defaultNow(),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  userIdx: index('quiz_user_idx').on(table.userId),
  sessionIdx: index('quiz_session_idx').on(table.sessionId),
  typeIdx: index('quiz_type_idx').on(table.quizType),
  difficultyIdx: index('quiz_difficulty_idx').on(table.difficulty),
  completedIdx: index('quiz_completed_idx').on(table.isCompleted),
}));

// Quiz Questions table (for storing individual question attempts)
export const quizQuestions = pgTable('quiz_questions', {
  id: uuid('id').primaryKey().defaultRandom(),
  quizSessionId: uuid('quiz_session_id').notNull().references(() => quizSessions.id),
  questionNumber: integer('question_number').notNull(),
  questionType: varchar('question_type', { length: 50 }).notNull(),
  countryId: uuid('country_id').references(() => countries.id),
  cityId: uuid('city_id').references(() => cities.id),
  questionText: text('question_text').notNull(),
  correctAnswer: text('correct_answer').notNull(),
  userAnswer: text('user_answer'),
  options: text('options').notNull(), // JSON string of options
  isCorrect: boolean('is_correct'),
  timeSpent: integer('time_spent'), // in seconds
  answeredAt: timestamp('answered_at'),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  sessionIdx: index('question_session_idx').on(table.quizSessionId),
  countryIdx: index('question_country_idx').on(table.countryId),
  cityIdx: index('question_city_idx').on(table.cityId),
  typeIdx: index('question_type_idx').on(table.questionType),
}));

// User Progress/Statistics table
export const userStats = pgTable('user_stats', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  totalQuizzes: integer('total_quizzes').default(0),
  totalQuestions: integer('total_questions').default(0),
  totalCorrect: integer('total_correct').default(0),
  averageScore: real('average_score').default(0),
  bestScore: real('best_score').default(0),
  totalTimeSpent: integer('total_time_spent').default(0), // in seconds
  flagsQuizzes: integer('flags_quizzes').default(0),
  capitalsQuizzes: integer('capitals_quizzes').default(0),
  mixedQuizzes: integer('mixed_quizzes').default(0),
  easyQuizzes: integer('easy_quizzes').default(0),
  mediumQuizzes: integer('medium_quizzes').default(0),
  hardQuizzes: integer('hard_quizzes').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  userIdx: uniqueIndex('user_stats_user_idx').on(table.userId),
}));

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  quizSessions: many(quizSessions),
  userStats: many(userStats),
}));

export const countriesRelations = relations(countries, ({ many }) => ({
  states: many(states),
  cities: many(cities),
  quizQuestions: many(quizQuestions),
}));

export const statesRelations = relations(states, ({ one, many }) => ({
  country: one(countries, {
    fields: [states.countryId],
    references: [countries.id],
  }),
  cities: many(cities),
}));

export const citiesRelations = relations(cities, ({ one }) => ({
  country: one(countries, {
    fields: [cities.countryId],
    references: [countries.id],
  }),
  state: one(states, {
    fields: [cities.stateId],
    references: [states.id],
  }),
}));

export const quizSessionsRelations = relations(quizSessions, ({ one, many }) => ({
  user: one(users, {
    fields: [quizSessions.userId],
    references: [users.id],
  }),
  questions: many(quizQuestions),
}));

export const quizQuestionsRelations = relations(quizQuestions, ({ one }) => ({
  quizSession: one(quizSessions, {
    fields: [quizQuestions.quizSessionId],
    references: [quizSessions.id],
  }),
  country: one(countries, {
    fields: [quizQuestions.countryId],
    references: [countries.id],
  }),
  city: one(cities, {
    fields: [quizQuestions.cityId],
    references: [cities.id],
  }),
}));

export const userStatsRelations = relations(userStats, ({ one }) => ({
  user: one(users, {
    fields: [userStats.userId],
    references: [users.id],
  }),
}));
