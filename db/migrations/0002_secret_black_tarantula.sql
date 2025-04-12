CREATE TABLE `email_categories` (
	`name` text PRIMARY KEY NOT NULL,
	`keywords` text NOT NULL,
	`senderMatch` text,
	`labelMatch` text
);
