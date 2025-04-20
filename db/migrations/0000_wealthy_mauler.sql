CREATE TABLE `colabRooms` (
	`id` text PRIMARY KEY NOT NULL,
	`creator_id` text NOT NULL,
	`room_name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `creator_id_room_name` ON `colabRooms` (`creator_id`,`room_name`);--> statement-breakpoint
CREATE TABLE `email_categories` (
	`name` text PRIMARY KEY NOT NULL,
	`keywords` text NOT NULL,
	`senderMatch` text,
	`labelMatch` text
);
--> statement-breakpoint
CREATE TABLE `emails` (
	`id` text PRIMARY KEY NOT NULL,
	`data` text NOT NULL,
	`timestamp` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `preDefinedTimeTable` (
	`degreeId` text,
	`branchId` text,
	`semester` integer,
	`courseId` text,
	`isLecture` integer,
	`isLab` integer
);
--> statement-breakpoint
CREATE TABLE `userAttendance` (
	`courseId` text,
	`date` text,
	`absOrPre` integer,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `userTimeTable` (
	`degreeId` text,
	`branchId` text,
	`semester` integer,
	`courseId` text
);
