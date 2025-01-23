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
