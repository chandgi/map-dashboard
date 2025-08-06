CREATE TABLE "cities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"country_id" uuid NOT NULL,
	"state_id" uuid,
	"is_capital" boolean DEFAULT false,
	"is_state_capital" boolean DEFAULT false,
	"population" integer,
	"latitude" real,
	"longitude" real,
	"elevation" real,
	"timezone" varchar(50),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "countries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"code" varchar(3) NOT NULL,
	"alpha2_code" varchar(2) NOT NULL,
	"alpha3_code" varchar(3) NOT NULL,
	"numeric_code" integer,
	"capital" varchar(100),
	"continent" varchar(50),
	"region" varchar(100),
	"subregion" varchar(100),
	"population" integer,
	"area" real,
	"flag_emoji" varchar(10),
	"flag_url" text,
	"latitude" real,
	"longitude" real,
	"currencies" text,
	"languages" text,
	"timezones" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "countries_code_unique" UNIQUE("code"),
	CONSTRAINT "countries_alpha2_code_unique" UNIQUE("alpha2_code"),
	CONSTRAINT "countries_alpha3_code_unique" UNIQUE("alpha3_code")
);
--> statement-breakpoint
CREATE TABLE "quiz_questions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"quiz_session_id" uuid NOT NULL,
	"question_number" integer NOT NULL,
	"question_type" varchar(50) NOT NULL,
	"country_id" uuid,
	"city_id" uuid,
	"question_text" text NOT NULL,
	"correct_answer" text NOT NULL,
	"user_answer" text,
	"options" text NOT NULL,
	"is_correct" boolean,
	"time_spent" integer,
	"answered_at" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "quiz_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"session_id" varchar(255),
	"quiz_type" varchar(50) NOT NULL,
	"difficulty" varchar(20) NOT NULL,
	"total_questions" integer NOT NULL,
	"correct_answers" integer DEFAULT 0 NOT NULL,
	"score" real DEFAULT 0 NOT NULL,
	"time_spent" integer,
	"is_completed" boolean DEFAULT false,
	"started_at" timestamp DEFAULT now(),
	"completed_at" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "states" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"code" varchar(10),
	"country_id" uuid NOT NULL,
	"type" varchar(50) DEFAULT 'state',
	"capital" varchar(100),
	"population" integer,
	"area" real,
	"latitude" real,
	"longitude" real,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_stats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"total_quizzes" integer DEFAULT 0,
	"total_questions" integer DEFAULT 0,
	"total_correct" integer DEFAULT 0,
	"average_score" real DEFAULT 0,
	"best_score" real DEFAULT 0,
	"total_time_spent" integer DEFAULT 0,
	"flags_quizzes" integer DEFAULT 0,
	"capitals_quizzes" integer DEFAULT 0,
	"mixed_quizzes" integer DEFAULT 0,
	"easy_quizzes" integer DEFAULT 0,
	"medium_quizzes" integer DEFAULT 0,
	"hard_quizzes" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"username" varchar(100) NOT NULL,
	"first_name" varchar(100),
	"last_name" varchar(100),
	"avatar_url" text,
	"is_email_verified" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "cities" ADD CONSTRAINT "cities_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cities" ADD CONSTRAINT "cities_state_id_states_id_fk" FOREIGN KEY ("state_id") REFERENCES "public"."states"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_questions" ADD CONSTRAINT "quiz_questions_quiz_session_id_quiz_sessions_id_fk" FOREIGN KEY ("quiz_session_id") REFERENCES "public"."quiz_sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_questions" ADD CONSTRAINT "quiz_questions_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_questions" ADD CONSTRAINT "quiz_questions_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_sessions" ADD CONSTRAINT "quiz_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "states" ADD CONSTRAINT "states_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_stats" ADD CONSTRAINT "user_stats_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "city_country_idx" ON "cities" USING btree ("country_id");--> statement-breakpoint
CREATE INDEX "city_state_idx" ON "cities" USING btree ("state_id");--> statement-breakpoint
CREATE INDEX "capital_idx" ON "cities" USING btree ("is_capital");--> statement-breakpoint
CREATE INDEX "state_capital_idx" ON "cities" USING btree ("is_state_capital");--> statement-breakpoint
CREATE INDEX "city_name_country_idx" ON "cities" USING btree ("name","country_id");--> statement-breakpoint
CREATE UNIQUE INDEX "country_code_idx" ON "countries" USING btree ("code");--> statement-breakpoint
CREATE UNIQUE INDEX "country_alpha2_idx" ON "countries" USING btree ("alpha2_code");--> statement-breakpoint
CREATE UNIQUE INDEX "country_alpha3_idx" ON "countries" USING btree ("alpha3_code");--> statement-breakpoint
CREATE INDEX "continent_idx" ON "countries" USING btree ("continent");--> statement-breakpoint
CREATE INDEX "region_idx" ON "countries" USING btree ("region");--> statement-breakpoint
CREATE INDEX "question_session_idx" ON "quiz_questions" USING btree ("quiz_session_id");--> statement-breakpoint
CREATE INDEX "question_country_idx" ON "quiz_questions" USING btree ("country_id");--> statement-breakpoint
CREATE INDEX "question_city_idx" ON "quiz_questions" USING btree ("city_id");--> statement-breakpoint
CREATE INDEX "question_type_idx" ON "quiz_questions" USING btree ("question_type");--> statement-breakpoint
CREATE INDEX "quiz_user_idx" ON "quiz_sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "quiz_session_idx" ON "quiz_sessions" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "quiz_type_idx" ON "quiz_sessions" USING btree ("quiz_type");--> statement-breakpoint
CREATE INDEX "quiz_difficulty_idx" ON "quiz_sessions" USING btree ("difficulty");--> statement-breakpoint
CREATE INDEX "quiz_completed_idx" ON "quiz_sessions" USING btree ("is_completed");--> statement-breakpoint
CREATE INDEX "state_country_idx" ON "states" USING btree ("country_id");--> statement-breakpoint
CREATE INDEX "state_name_country_idx" ON "states" USING btree ("name","country_id");--> statement-breakpoint
CREATE UNIQUE INDEX "user_stats_user_idx" ON "user_stats" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "username_idx" ON "users" USING btree ("username");