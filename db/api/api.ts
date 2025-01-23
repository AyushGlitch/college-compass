import { and, desc, eq } from "drizzle-orm"
import { db } from "../drizzle"
import { preDefinedTimeTable, preDefinedTimeTableSelectType, userAttendance, userAttendanceSelectType, userTimeTable, userTimeTableSelectType } from "../schema"
import { AddAbsentPresentProps, AddCourseProps, EditCourseIdProps, submitPredefinedTTFormProps } from "./mutations"


export const getUserTT = async () => {
    const fetchedUserTT: userTimeTableSelectType[] = await db.select().from(userTimeTable)
    return fetchedUserTT
}


export const getUserAttendance = async () => {
    const fetchedUserAttendance: userAttendanceSelectType[] = await db.select().from(userAttendance)
    return fetchedUserAttendance
}


export const getPreDefinedTT = async () => {
    const fetchedPreDefinedTT: preDefinedTimeTableSelectType[] = await db.select().from(preDefinedTimeTable)
    return fetchedPreDefinedTT
}


export const getPreDefindedTTDistinctDegree = async () => {
    const fetchedPreDefinedTTDistinctDegree: {degreeId: string| null}[] = await db.selectDistinct({degreeId: preDefinedTimeTable.degreeId}).from(preDefinedTimeTable)

    return { 
        distinctDegree: fetchedPreDefinedTTDistinctDegree.map( (deg) => deg.degreeId! ),
    }
}


export const getPreDefindedTTDistinctBranchSem = async (degreeId: string) => {
    const fetchedPreDefinedTTDistinctBranch: {branchId: string| null}[] = await db.selectDistinct({branchId: preDefinedTimeTable.branchId}).from(preDefinedTimeTable).where(eq(preDefinedTimeTable.degreeId, degreeId))

    const fetchedPreDefinedTTDistinctSem: {semester: number| null}[] = await db.selectDistinct({semester: preDefinedTimeTable.semester}).from(preDefinedTimeTable).where(eq(preDefinedTimeTable.degreeId, degreeId))
    
    return {
        distinctBranch: fetchedPreDefinedTTDistinctBranch.map( (branch) => branch.branchId! ),
        distinctSem: fetchedPreDefinedTTDistinctSem.map( (sem) => sem.semester! )
    }
}


export const submitPredefinedTTForm = async ({degreeId, branchId, semester}: submitPredefinedTTFormProps) => {
    const fetchedPredefinedFormData: preDefinedTimeTableSelectType[] = await db.select().from(preDefinedTimeTable).where(and(eq(preDefinedTimeTable.degreeId, degreeId), eq(preDefinedTimeTable.branchId, branchId), eq(preDefinedTimeTable.semester, semester) ))

    const promises: Promise<any>[] = []
            fetchedPredefinedFormData?.forEach( (data) => {
                if (data.isLecture) {
                    promises.push(db!.insert(userTimeTable).values({
                        degreeId: data.degreeId,
                        branchId: data.branchId,
                        semester: data.semester,
                        courseId: data.courseId + 'Lecture',
                    }))
                }
                if (data.isLab) {
                    promises.push(db!.insert(userTimeTable).values({
                        degreeId: data.degreeId,
                        branchId: data.branchId,
                        semester: data.semester,
                        courseId: data.courseId + 'Lab',
                    }))
                }
            } )

            await Promise.all(promises)
}


export const deleteCourse = async (courseId: string) => {
    await db.delete(userTimeTable).where(eq(userTimeTable.courseId, courseId))
    await db.delete((userAttendance)).where(eq(userAttendance.courseId, courseId))
}


export const resetCourse = async (courseId: string) => {
    await db.delete(userAttendance).where(eq(userAttendance.courseId, courseId))
}


export const addCourse= async ({degreeId, branchId, semester, courseId}: AddCourseProps) => {
    await db.insert(userTimeTable).values({
        degreeId: degreeId,
        branchId: branchId,
        semester: semester,
        courseId: courseId
    })
}


export const deleteAllCourse= async () => {
    await db.delete(userTimeTable)
    await db.delete(userAttendance)
}


export const addAbsentPresent = async ({isPresent, courseId}: AddAbsentPresentProps) => {
    const today= new Date()
    const year= today.getFullYear()
    const month= String(today.getMonth()+ 1).padStart(2, '0')
    const data= String(today.getDate()).padStart(2, '0')

    const hour= String(today.getHours()).padStart(2, '0')
    const minute= String(today.getMinutes()).padStart(2, '0')
    const second= String(today.getSeconds()).padStart(2, '0')

    const currDate= `${year}-${month}-${data}`
    const timeStamp= `${year}-${month}-${data} ${hour}:${minute}:${second}`

    await db.insert(userAttendance).values({
        courseId: courseId,
        absOrPre: isPresent,
        date: currDate,
        createdAt: timeStamp
    })
}


export const getAttendanceDate = async (courseId: string) => {
    const attendanceDates= await db.select({date: userAttendance.date, absOrPre: userAttendance.absOrPre, createdAt: userAttendance.createdAt}).from(userAttendance).where(eq(userAttendance.courseId, courseId)).orderBy(desc(userAttendance.createdAt))

    const daysOfWeek= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const attendanceDatesWithTime= attendanceDates.map( (data) => {
        const dateTime= data.createdAt.split(' ')
        const dayIndex= new Date(dateTime[0]).getDay()
        const numDate= new Date(dateTime[0]).getDate()
        const monthIndex= new Date(dateTime[0]).getMonth()
        const year= new Date(dateTime[0]).getFullYear()

        return {
            time: dateTime[1],
            day: daysOfWeek[dayIndex],
            numDate: numDate,
            month: months[monthIndex],
            year: year,
            date: data.date,
            absOrPre: data.absOrPre,
            createdAt: data.createdAt
        }
    } )
    return attendanceDatesWithTime
}


export const undoAttendance= async (courseId: string) => {
    const latestRow= await db.select().from(userAttendance).where(eq(userAttendance.courseId, courseId)).orderBy(desc(userAttendance.createdAt)).limit(1)

    await db.delete(userAttendance).where(and(eq(userAttendance.courseId, courseId), eq(userAttendance.createdAt, latestRow[0].createdAt)))
}


export const editCourseId= async (data: EditCourseIdProps) => {
    const updateTT= await db.update(userTimeTable).set({courseId: data.newCourseId}).where(eq(userTimeTable.courseId, data.courseId)).returning()
    const updateAtt= await db.update(userAttendance).set({courseId: data.newCourseId}).where(eq(userAttendance.courseId, data.courseId)).returning()

    console.log(updateTT, updateAtt)
}