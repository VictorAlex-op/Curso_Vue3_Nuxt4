CREATE TABLE "user_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" varchar(225) NOT NULL,
	CONSTRAINT "user_table_email_unique" UNIQUE("email")
);
