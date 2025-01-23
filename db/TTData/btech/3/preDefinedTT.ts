interface preDefinedTimeTableDataInterface {
    degreeId: string,
    branchId: string,
    semester: number,
    courseId: string,
    isLecture: number,
    isLab: number,
}


const CSE3: preDefinedTimeTableDataInterface[] = [
    {
        degreeId: "B.Tech",
        branchId: "CSE",
        semester: 3,
        courseId: "CSBB202",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "CSE",
        semester: 3,
        courseId: "CSBB203",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "CSE",
        semester: 3,
        courseId: "CSBB204",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "CSE",
        semester: 3,
        courseId: "MALB202",
        isLecture: 1,
        isLab: 0,
    },
    {
        degreeId: "B.Tech",
        branchId: "CSE",
        semester: 3,
        courseId: "ECBB206",
        isLecture: 1,
        isLab: 1,
    },
]


const ECE3: preDefinedTimeTableDataInterface[] = [
    {
        degreeId: "B.Tech",
        branchId: "ECE",
        semester: 3,
        courseId: "ECBB201",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "ECE",
        semester: 3,
        courseId: "ECLB202",
        isLecture: 1,
        isLab: 0,
    },
    {
        degreeId: "B.Tech",
        branchId: "ECE",
        semester: 3,
        courseId: "ECLB203",
        isLecture: 1,
        isLab: 0,
    },
    {
        degreeId: "B.Tech",
        branchId: "ECE",
        semester: 3,
        courseId: "ECBB204",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "ECE",
        semester: 3,
        courseId: "ECLB205",
        isLecture: 1,
        isLab: 0,
    },
    {
        degreeId: "B.Tech",
        branchId: "ECE",
        semester: 3,
        courseId: "HMPB103",
        isLecture: 0,
        isLab: 1,
    },
]


const EE3: preDefinedTimeTableDataInterface[] = [
    {
        degreeId: "B.Tech",
        branchId: "EE",
        semester: 3,
        courseId: "MAB303",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "EE",
        semester: 3,
        courseId: "CSB231",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "EE",
        semester: 3,
        courseId: "EEL201",
        isLecture: 1,
        isLab: 0,
    },
    {
        degreeId: "B.Tech",
        branchId: "EE",
        semester: 3,
        courseId: "ECB207",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "EE",
        semester: 3,
        courseId: "EEB202",
        isLecture: 1,
        isLab: 0,
    },
]


const ME3: preDefinedTimeTableDataInterface[] = [
    {
        degreeId: "B.Tech",
        branchId: "ME",
        semester: 3,
        courseId: "MALB201",
        isLecture: 1,
        isLab: 0,
    },
    {
        degreeId: "B.Tech",
        branchId: "ME",
        semester: 3,
        courseId: "MEBB211",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "ME",
        semester: 3,
        courseId: "MELB201",
        isLecture: 1,
        isLab: 0,
    },
    {
        degreeId: "B.Tech",
        branchId: "ME",
        semester: 3,
        courseId: "MELB202",
        isLecture: 1,
        isLab: 0,
    },
    {
        degreeId: "B.Tech",
        branchId: "ME",
        semester: 3,
        courseId: "MEPB221",
        isLecture: 0,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "ME",
        semester: 3,
        courseId: "MEPB222",
        isLecture: 0,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "ME",
        semester: 3,
        courseId: "MEBB212",
        isLecture: 1,
        isLab: 1,
    },
]


const CE3: preDefinedTimeTableDataInterface[] = [
    {
        degreeId: "B.Tech",
        branchId: "CE",
        semester: 3,
        courseId: "CELB201",
        isLecture: 1,
        isLab: 0,
    },
    {
        degreeId: "B.Tech",
        branchId: "CE",
        semester: 3,
        courseId: "CEBB211",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "CE",
        semester: 3,
        courseId: "CEBB212",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "CE",
        semester: 3,
        courseId: "CEBB213",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "CE",
        semester: 3,
        courseId: "CEBB214",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "CE",
        semester: 3,
        courseId: "CSBB111",
        isLecture: 1,
        isLab: 1,
    },
]


export const preDefinedTTData3: preDefinedTimeTableDataInterface[] = [
    ...CSE3,
    ...ECE3,
    ...EE3,
    ...ME3,
    ...CE3,
]