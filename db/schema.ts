import { sql } from 'drizzle-orm';
import {
    sqliteTable,
    text,
    integer,
    uniqueIndex,
} from 'drizzle-orm/sqlite-core';

// Attendance Tracker Tables
export const preDefinedTimeTable = sqliteTable('preDefinedTimeTable', {
    degreeId: text('degreeId'),
    branchId: text('branchId'),
    semester: integer('semester'),
    courseId: text('courseId'),
    isLecture: integer('isLecture', { mode: 'boolean' }),
    isLab: integer('isLab', { mode: 'boolean' }),
});
export type preDefinedTimeTableSelectType =
    typeof preDefinedTimeTable.$inferSelect;
export type preDefinedTimeTableInsertType =
    typeof preDefinedTimeTable.$inferInsert;

export const userTimeTable = sqliteTable('userTimeTable', {
    degreeId: text('degreeId'),
    branchId: text('branchId'),
    semester: integer('semester'),
    courseId: text('courseId'),
});
export type userTimeTableSelectType = typeof userTimeTable.$inferSelect;
export type userTimeTableInsertType = typeof userTimeTable.$inferInsert;

export const userAttendance = sqliteTable('userAttendance', {
    courseId: text('courseId'),
    date: text('date'),
    absOrPre: integer('absOrPre', { mode: 'boolean' }),
    createdAt: text('createdAt')
        .notNull()
        .default(sql`(current_timestamp)`),
});
export type userAttendanceSelectType = typeof userAttendance.$inferSelect;
export type userAttendanceInsertType = typeof userAttendance.$inferInsert;

// Email Sorter Tables
export const emails = sqliteTable('emails', {
    id: text('id').primaryKey(),
    data: text('data').notNull(),
    timestamp: text('timestamp').notNull(),
});

// Email Categories Table
export const emailCategories = sqliteTable('email_categories', {
    name: text('name').primaryKey(),
    keywords: text('keywords').notNull(), // JSON.stringify'ed array
    senderMatch: text('senderMatch'), // JSON.stringify'ed array
    labelMatch: text('labelMatch'), // optional, JSON.stringify'ed array
});

export type EmailCategoriesType = typeof emailCategories.$inferSelect;

// Colab Notes Table
export const colabRooms = sqliteTable(
    'colabRooms',
    {
        id: text('id').primaryKey().notNull(),
        creatorId: text('creator_id').notNull(),
        roomName: text('room_name').notNull(),
    },
    (t) => [uniqueIndex('creator_id_room_name').on(t.creatorId, t.roomName)]
);
