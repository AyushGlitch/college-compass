import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';


export const preDefinedTimeTable= sqliteTable('preDefinedTimeTable', {
    degreeId: text('degreeId'),
    branchId: text('branchId'),
    semester: integer('semester'),
    courseId: text('courseId'),
    isLecture: integer('isLecture', {mode: 'boolean'}),
    isLab: integer('isLab', {mode: 'boolean'}),
})
export type preDefinedTimeTableSelectType= typeof preDefinedTimeTable.$inferSelect
export type preDefinedTimeTableInsertType= typeof preDefinedTimeTable.$inferInsert


export const userTimeTable= sqliteTable('userTimeTable', {
    degreeId: text('degreeId'),
    branchId: text('branchId'),
    semester: integer('semester'),
    courseId: text('courseId'),
})
export type userTimeTableSelectType= typeof userTimeTable.$inferSelect
export type userTimeTableInsertType= typeof userTimeTable.$inferInsert


export const userAttendance= sqliteTable('userAttendance', {
    courseId: text('courseId'),
    date: text('date'),
    absOrPre: integer('absOrPre', {mode: 'boolean'}),
    createdAt: text('createdAt').notNull().default(sql`(current_timestamp)`)
})
export type userAttendanceSelectType= typeof userAttendance.$inferSelect
export type userAttendanceInsertType= typeof userAttendance.$inferInsert