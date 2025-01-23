interface preDefinedTimeTableDataInterface {
    degreeId: string,
    branchId: string,
    semester: number,
    courseId: string,
    isLecture: number,
    isLab: number,
}


const CSE4: preDefinedTimeTableDataInterface[] = [
    {
        degreeId: "B.Tech",
        branchId: "CSE",
        semester: 4,
        courseId: "CSBB251",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "CSE",
        semester: 4,
        courseId: "CSBB252",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "CSE",
        semester: 4,
        courseId: "CSBB254",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "CSE",
        semester: 4,
        courseId: "HMBB251",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "CSE",
        semester: 4,
        courseId: "ECBB254",
        isLecture: 1,
        isLab: 1,
    },
]


const ECE4: preDefinedTimeTableDataInterface[] = [
    {
        degreeId: "B.Tech",
        branchId: "ECE",
        semester: 4,
        courseId: "ECBB251",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "ECE",
        semester: 4,
        courseId: "ECBB252",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "ECE",
        semester: 4,
        courseId: "ECBB253",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "ECE",
        semester: 4,
        courseId: "CSBB255",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "ECE",
        semester: 4,
        courseId: "HMBB251",
        isLecture: 1,
        isLab: 1,
    },
]


const EE4: preDefinedTimeTableDataInterface[] = [
    {
        degreeId: "B.Tech",
        branchId: "EE",
        semester: 4,
        courseId: "EEB251",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "EE",
        semester: 4,
        courseId: "EEB252",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "EE",
        semester: 4,
        courseId: "EEL253",
        isLecture: 1,
        isLab: 0,
    },
    {
        degreeId: "B.Tech",
        branchId: "EE",
        semester: 4,
        courseId: "ECB206",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "EE",
        semester: 4,
        courseId: "EEB254",
        isLecture: 1,
        isLab: 1,
    },
]


const ME4: preDefinedTimeTableDataInterface[] = [
    {
        degreeId: "B.Tech",
        branchId: "ME",
        semester: 4,
        courseId: "MEBB261",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "ME",
        semester: 4,
        courseId: "MEBB262",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "ME",
        semester: 4,
        courseId: "MEBB263",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "ME",
        semester: 4,
        courseId: "MELB251",
        isLecture: 1,
        isLab: 0,
    },
    {
        degreeId: "B.Tech",
        branchId: "ME",
        semester: 4,
        courseId: "MELB252",
        isLecture: 1,
        isLab: 0,
    },
    {
        degreeId: "B.Tech",
        branchId: "ME",
        semester: 4,
        courseId: "MEPB271",
        isLecture: 0,
        isLab: 1,
    },
]


const CE4: preDefinedTimeTableDataInterface[] = [
    {
        degreeId: "B.Tech",
        branchId: "CE",
        semester: 4,
        courseId: "CELB251",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "CE",
        semester: 4,
        courseId: "CEBB261",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "CE",
        semester: 4,
        courseId: "CEBB262",
        isLecture: 1,
        isLab: 0,
    },
    {
        degreeId: "B.Tech",
        branchId: "CE",
        semester: 4,
        courseId: "CEBB263",
        isLecture: 1,
        isLab: 0,
    },
    {
        degreeId: "B.Tech",
        branchId: "CE",
        semester: 4,
        courseId: "CEBB264",
        isLecture: 1,
        isLab: 1,
    },
    {
        degreeId: "B.Tech",
        branchId: "CE",
        semester: 4,
        courseId: "CEBB265",
        isLecture: 1,
        isLab: 1,
    },
]


export const preDefinedTTData4: preDefinedTimeTableDataInterface[] = [
    ...CSE4,
    ...ECE4,
    ...EE4,
    ...ME4,
    ...CE4,
]