CREATE TABLE IF NOT EXISTS "user_followers" (
	"follower_id" text NOT NULL,
	"followed_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_followers_follower_id_followed_id_pk" PRIMARY KEY("follower_id","followed_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_followers" ADD CONSTRAINT "user_followers_follower_id_user_id_fk" FOREIGN KEY ("follower_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_followers" ADD CONSTRAINT "user_followers_followed_id_user_id_fk" FOREIGN KEY ("followed_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
