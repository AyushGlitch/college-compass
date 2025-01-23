interface preDefinedTimeTableDataInterface {
    degreeId: string,
    branchId: string,
    semester: number,
    courseId: string,
    isLecture: number,
    isLab: number,
}


const CSE7: preDefinedTimeTableDataInterface[] = [
    {
        degreeId: "B.Tech",
        branchId: "CSE",
        semester: 7,
        courseId: "HMLB401",
        isLecture: 1,
        isLab: 0,
    },
]


const ECE7: preDefinedTimeTableDataInterface[] = [
    {
        degreeId: "B.Tech",
        branchId: "ECE",
        semester: 7,
        courseId: "ECBB401",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "ECE",
        semester: 7,
        courseId: "HMLB401",
        isLecture: 1,
        isLab: 0,
    },
]


const EE7: preDefinedTimeTableDataInterface[] = [
    {
        degreeId: "B.Tech",
        branchId: "EE",
        semester: 7,
        courseId: "EEL401",
        isLecture: 1,
        isLab: 0,
    },
    {
        degreeId: "B.Tech",
        branchId: "EE",
        semester: 7,
        courseId: "EEL402",
        isLecture: 1,
        isLab: 0,
    },
    {
        degreeId: "B.Tech",
        branchId: "EE",
        semester: 7,
        courseId: "EEP403",
        isLecture: 0,
        isLab: 1,
    },
]


const ME7: preDefinedTimeTableDataInterface[] = [
    {
        degreeId: "B.Tech",
        branchId: "ME",
        semester: 7,
        courseId: "MELB401",
        isLecture: 1,
        isLab: 0,
    },
]


const CS7: preDefinedTimeTableDataInterface[] = [
    {
        degreeId: "B.Tech",
        branchId: "CE",
        semester: 7,
        courseId: "HMLB402",
        isLecture: 1,
        isLab: 0,
    },
]


export const preDefinedTTData7: preDefinedTimeTableDataInterface[]= [
    ...CSE7,
    ...ECE7,
    ...EE7,
    ...ME7,
    ...CS7,
]