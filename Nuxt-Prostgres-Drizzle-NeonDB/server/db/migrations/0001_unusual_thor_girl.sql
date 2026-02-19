ALTER TABLE "user_table" ADD COLUMN "username" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "user_table" ADD COLUMN "bio" text;--> statement-breakpoint
ALTER TABLE "user_table" ADD COLUMN "avatar_url" text;--> statement-breakpoint
ALTER TABLE "user_table" ADD CONSTRAINT "user_table_username_unique" UNIQUE("username");