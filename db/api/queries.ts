import { useQuery } from "@tanstack/react-query"
import { getAttendanceDate, getPreDefindedTTDistinctBranchSem, getPreDefindedTTDistinctDegree, getPreDefinedTT, getUserAttendance, getUserTT } from "./api"


export const getUserTTQuery = () => {
    return useQuery({
        queryKey: ['getUserTT'],
        queryFn: getUserTT
    })
}


export const getUserAttendanceQuery = () => {
    return useQuery({
        queryKey: ['getUserAttendance'],
        queryFn: getUserAttendance
    })
}


export const getPreDefinedTTQuery = () => {
    return useQuery({
        queryKey: ['getPreDefinedTT'],
        queryFn: getPreDefinedTT
    })
}


export const getPreDefindedTTDistinctDegreeQuery = () => {
    return useQuery({
        queryKey: ['getPreDefindedTTDistinctDegree'],
        queryFn: getPreDefindedTTDistinctDegree
    })
}


export const getPreDefinedTTDistinctBranchSemQuery = (degreeId: string) => {
    return useQuery({
        queryKey: ['getPreDefinedTTDistinctBranchSem', degreeId],
        queryFn: () => getPreDefindedTTDistinctBranchSem(degreeId)
    })
}


export const getAttendanceDateQuery= (courseId: string) => {
    return useQuery({
        queryKey: ['getAttendanceDate', courseId],
        queryFn: () => getAttendanceDate(courseId)
    })
}