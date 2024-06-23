CREATE TABLE IF NOT EXISTS "genres" (
	"id" serial PRIMARY KEY NOT NULL,
	"genre" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "story_genres" (
	"story_id" text NOT NULL,
	"genre_id" serial NOT NULL,
	CONSTRAINT "story_genres_story_id_genre_id_pk" PRIMARY KEY("story_id","genre_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "story_tags" (
	"story_id" text NOT NULL,
	"tag_id" serial NOT NULL,
	CONSTRAINT "story_tags_story_id_tag_id_pk" PRIMARY KEY("story_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"tag" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "story_genres" ADD CONSTRAINT "story_genres_story_id_story_id_fk" FOREIGN KEY ("story_id") REFERENCES "public"."story"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "story_genres" ADD CONSTRAINT "story_genres_genre_id_genres_id_fk" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "story_tags" ADD CONSTRAINT "story_tags_story_id_story_id_fk" FOREIGN KEY ("story_id") REFERENCES "public"."story"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "story_tags" ADD CONSTRAINT "story_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
