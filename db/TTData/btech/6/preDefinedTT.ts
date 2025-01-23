interface preDefinedTimeTableDataInterface {
    degreeId: string,
    branchId: string,
    semester: number,
    courseId: string,
    isLecture: number,
    isLab: number,
}


const CSE6: preDefinedTimeTableDataInterface[] = [
    {
        degreeId: "B.Tech",
        branchId: "CSE",
        semester: 6,
        courseId: "CSBB351",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "CSE",
        semester: 6,
        courseId: "CSBB352",
        isLecture: 1,
        isLab: 1,
    },
]


const ECE6: preDefinedTimeTableDataInterface[] = [
    {
        degreeId: "B.Tech",
        branchId: "ECE",
        semester: 6,
        courseId: "ECLB351",
        isLecture: 1,
        isLab: 0,
    },
    {
        degreeId: "B.Tech",
        branchId: "ECE",
        semester: 6,
        courseId: "ECBB352",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "ECE",
        semester: 6,
        courseId: "ECBB353",
        isLecture: 1,
        isLab: 1,
    },
]


const EE6: preDefinedTimeTableDataInterface[] = [
    {
        degreeId: "B.Tech",
        branchId: "EE",
        semester: 6,
        courseId: "EEB351",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "EE",
        semester: 6,
        courseId: "EEP352",
        isLecture: 0,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "EE",
        semester: 6,
        courseId: "CSB310",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "EE",
        semester: 6,
        courseId: "HML352",
        isLecture: 1,
        isLab: 0,
    },
]


const ME6: preDefinedTimeTableDataInterface[] = [
    {
        degreeId: "B.Tech",
        branchId: "ME",
        semester: 6,
        courseId: "MELB351",
        isLecture: 1,
        isLab: 0,
    },
    {
        degreeId: "B.Tech",
        branchId: "ME",
        semester: 6,
        courseId: "MEBB361",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "ME",
        semester: 6,
        courseId: "MEBB362",
        isLecture: 1,
        isLab: 0,
    },
    {
        degreeId: "B.Tech",
        branchId: "ME",
        semester: 6,
        courseId: "MEBB363",
        isLecture: 1,
        isLab: 1,
    },
]


const CE6: preDefinedTimeTableDataInterface[] = [
    {
        degreeId: "B.Tech",
        branchId: "CE",
        semester: 6,
        courseId: "CELB351",
        isLecture: 1,
        isLab: 0,
    },
    {
        degreeId: "B.Tech",
        branchId: "CE",
        semester: 6,
        courseId: "CELB352",
        isLecture: 1,
        isLab: 0,
    },
    {
        degreeId: "B.Tech",
        branchId: "CE",
        semester: 6,
        courseId: "CELB353",
        isLecture: 1,
        isLab: 0,
    },
    {
        degreeId: "B.Tech",
        branchId: "CE",
        semester: 6,
        courseId: "CELB354",
        isLecture: 1,
        isLab: 0,
    },
    {
        degreeId: "B.Tech",
        branchId: "CE",
        semester: 6,
        courseId: "HMLB359",
        isLecture: 1,
        isLab: 0,
    },
]


export const preDefinedTTData6: preDefinedTimeTableDataInterface[] = [
    ...CSE6,
    ...ECE6,
    ...EE6,
    ...ME6,
    ...CE6,
]