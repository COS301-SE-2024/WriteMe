ALTER TABLE "likes" RENAME COLUMN "essay_id" TO "story_id";--> statement-breakpoint
ALTER TABLE "likes" DROP CONSTRAINT "likes_essay_id_story_id_fk";
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "password" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "likes" ADD CONSTRAINT "likes_story_id_story_id_fk" FOREIGN KEY ("story_id") REFERENCES "public"."story"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
