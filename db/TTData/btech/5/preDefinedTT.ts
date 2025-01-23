interface preDefinedTimeTableDataInterface {
    degreeId: string,
    branchId: string,
    semester: number,
    courseId: string,
    isLecture: number,
    isLab: number,
}


const CSE5: preDefinedTimeTableDataInterface[] = [
    {
        degreeId: "B.Tech",
        branchId: "CSE",
        semester: 5,
        courseId: "CSBB301",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "CSE",
        semester: 5,
        courseId: "CSLB302",
        isLecture: 1,
        isLab: 0,
    },
    {
        degreeId: "B.Tech",
        branchId: "CSE",
        semester: 5,
        courseId: "CSBB303",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "CSE",
        semester: 5,
        courseId: "CSBB304",
        isLecture: 1,
        isLab: 1,
    },
]


const ECE5: preDefinedTimeTableDataInterface[] = [
    {
        degreeId: "B.Tech",
        branchId: "ECE",
        semester: 5,
        courseId: "ECBB301",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "ECE",
        semester: 5,
        courseId: "ECBB302",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "ECE",
        semester: 5,
        courseId: "ECBB303",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "ECE",
        semester: 5,
        courseId: "ECBB304",
        isLecture: 1,
        isLab: 1,
    },
]


const EE5: preDefinedTimeTableDataInterface[] = [
    {
        degreeId: "B.Tech",
        branchId: "EE",
        semester: 5,
        courseId: "EEB301",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "EE",
        semester: 5,
        courseId: "EEL302",
        isLecture: 1,
        isLab: 0,
    },
    {
        degreeId: "B.Tech",
        branchId: "EE",
        semester: 5,
        courseId: "EEB303",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "EE",
        semester: 5,
        courseId: "EEB304",
        isLecture: 1,
        isLab: 1,
    },
]


const ME5: preDefinedTimeTableDataInterface[] = [
    {
        degreeId: "B.Tech",
        branchId: "ME",
        semester: 5,
        courseId: "MEBB311",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "ME",
        semester: 5,
        courseId: "MEBB312",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "ME",
        semester: 5,
        courseId: "MEBB313",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "ME",
        semester: 5,
        courseId: "MEBB314",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "ME",
        semester: 5,
        courseId: "EEBB311",
        isLecture: 1,
        isLab: 0,
    },
]


const CE5: preDefinedTimeTableDataInterface[] = [
    {
        degreeId: "B.Tech",
        branchId: "CE",
        semester: 5,
        courseId: "CELB301",
        isLecture: 1,
        isLab: 0,
    },
    {
        degreeId: "B.Tech",
        branchId: "CE",
        semester: 5,
        courseId: "CELB302",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "CE",
        semester: 5,
        courseId: "CELB303",
        isLecture: 1,
        isLab: 0,
    },
    {
        degreeId: "B.Tech",
        branchId: "CE",
        semester: 5,
        courseId: "CELB304",
        isLecture: 1,
        isLab: 0,
    },
    {
        degreeId: "B.Tech",
        branchId: "CE",
        semester: 5,
        courseId: "CEBB311",
        isLecture: 1,
        isLab: 0,
    },
]


export const preDefinedTTData5: preDefinedTimeTableDataInterface[] = [
    ...CSE5,
    ...ECE5,
    ...EE5,
    ...ME5,
    ...CE5,
]