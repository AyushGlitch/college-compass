import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addAbsentPresent, addCourse, deleteAllCourse, deleteCourse, editCourseId, resetCourse, submitPredefinedTTForm, undoAttendance } from "./api"


export interface submitPredefinedTTFormProps {
    degreeId: string,
    branchId: string,
    semester: number
}


export const useSubmitPredefinedTTForm = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: submitPredefinedTTFormProps) => submitPredefinedTTForm(data),

        onSuccess: () => {
            console.log('Successfully submitted the form')
        },
        onSettled: async (_, error) => {
            if (error) {
                console.log("Error while submitting the form: ", error)
            }
            else {
                await queryClient.invalidateQueries({queryKey: ['getUserTT']})
            }
        },
    })
}


export const useDeleteCourse = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (courseId: string) => deleteCourse(courseId),

        onSettled: async (_, error) => {
            if (error) {
                console.log("Error while deleting the course: ", error)
            }
            else {
                await queryClient.invalidateQueries({queryKey: ['getUserTT']})              
                await queryClient.invalidateQueries({queryKey: ['getUserAttendance']})
                await queryClient.invalidateQueries({queryKey: ['getAttendanceDate']})
            }
        },
    })
}


export const useResetCourse = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (courseId: string) => resetCourse(courseId),
        onSettled: async (_, error) => {
            if (error) {
                console.log("Error while resetting the course: ", error)
            }
            else {
                await queryClient.invalidateQueries({queryKey: ['getUserAttendance']})
                await queryClient.invalidateQueries({queryKey: ['getAttendanceDate']})
            }
        }
    })
}


export interface AddCourseProps {
    degreeId: string,
    branchId: string,
    semester: number,
    courseId: string
}


export const useAddCourse = () => {
    const queryClient= useQueryClient()

    return useMutation({
        mutationFn: (data: AddCourseProps) => addCourse(data),
        onSettled: async (_, error) => {
            if (error) {
                console.log("Error while adding the course: ", error)
            }
            else {
                await queryClient.invalidateQueries({queryKey: ['getUserTT']})
            }
        }
    })
}


export const useDeleteAllCourse =() => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () => deleteAllCourse(),
        onSettled: async (_, error) => {
            if (error) {
                console.log("Error while deleting all courses: ", error)
            }
            else {
                await queryClient.invalidateQueries({queryKey: ['getUserTT']})
                await queryClient.invalidateQueries({queryKey: ['getUserAttendance']})
                await queryClient.invalidateQueries({queryKey: ['getAttendanceDate']})
            }
        }
    })
}


export interface AddAbsentPresentProps {
    isPresent: boolean,
    courseId: string
}


export const useAddAbsentPresent = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: AddAbsentPresentProps) => addAbsentPresent(data),
        onSettled: async (_, error) => {
            if (error) {
                console.log("Error while adding absent present: ", error)
            }
            else {
                await queryClient.invalidateQueries({queryKey: ['getUserAttendance']})
                await queryClient.invalidateQueries({queryKey: ['getAttendanceDate']})
            }
        }
    })
}


export const useUndoAttendance = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (courseId: string) => undoAttendance(courseId),
        onSettled: async (_, error) => {
            if (error) {
                console.log("Error while undoing the attendance: ", error)
            }
            else {
                await queryClient.invalidateQueries({queryKey: ['getUserAttendance']})
                await queryClient.invalidateQueries({queryKey: ['getAttendanceDate']})
            }
        }
    })
}


export interface EditCourseIdProps {
    courseId: string,
    newCourseId: string
}


export const useEditCourseId= () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: EditCourseIdProps) => editCourseId(data),
        onSettled: async (_, error) => {
            if (error) {
                console.log("Error while editing the course id: ", error)
            }
            else {
                await queryClient.invalidateQueries({queryKey: ['getUserTT']})
                await queryClient.invalidateQueries({queryKey: ['getUserAttendance']})
                await queryClient.invalidateQueries({queryKey: ['getAttendanceDate']})
            }
        }
    })
}