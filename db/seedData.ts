// export const usersData= [
//     {
//         name: "Ayush",
//         degreeId: "B.Tech",
//         branchId: "CSE",
//         semester: 5
//     },
// ]

import { preDefinedTTData1 } from "./TTData/btech/1/preDefinedTT";
import { preDefinedTTData2 } from "./TTData/btech/2/preDefinedTT";
import { preDefinedTTData3 } from "./TTData/btech/3/preDefinedTT";
import { preDefinedTTData4 } from "./TTData/btech/4/preDefinedTT";
import { preDefinedTTData5 } from "./TTData/btech/5/preDefinedTT";
import { preDefinedTTData6 } from "./TTData/btech/6/preDefinedTT";
import { preDefinedTTData7 } from "./TTData/btech/7/preDefinedTT";


interface preDefinedTimeTableDataInterface {
    degreeId: string,
    branchId: string,
    semester: number,
    courseId: string,
    isLecture: number,
    isLab: number,
}


export const preDefinedTimeTableData: preDefinedTimeTableDataInterface[] = [
    ...preDefinedTTData1,
    ...preDefinedTTData2,
    ...preDefinedTTData3,
    ...preDefinedTTData4,
    ...preDefinedTTData5,
    ...preDefinedTTData6,
    ...preDefinedTTData7,
]