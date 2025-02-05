import BottomActionSubjects from '~/components/BottomActionSubjects';
import Loader from '~/components/Loader';
import PreDefinedForm from '~/components/PreDefinedForm';
import SubjectCard from '~/components/SubjectCard';
import { Text, View } from '~/components/Themed';
import { getUserAttendanceQuery, getUserTTQuery } from '~/db/api/queries';
import {
    userAttendance,
    userTimeTable,
    userTimeTableSelectType,
} from '~/db/schema';
import { ScrollView } from 'react-native-gesture-handler';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { db } from '~/db/drizzle';

interface CourseData {
    courseId: string;
    totalClasses: number;
    attendedClasses: number;
}

interface TempDataProp {
    [key: string]: CourseData;
}

export default function Subjects() {
    // Fetch user timetable and attendance using useLiveQuery
    const { data: userTtData } = useLiveQuery(db.select().from(userTimeTable));
    const { data: userAttendanceData } = useLiveQuery(
        db.select().from(userAttendance)
    );

    // Handle loading state
    if (!userTtData || !userAttendanceData) {
        return <Loader />;
    }

    function processData() {
        if (userTtData === undefined || userAttendanceData === undefined) {
            // console.log("Process Data Parameter is undefined Subjects Component");
            return;
        }

        if (userTtData.length === 0) {
            // console.log("No data to process Subjects Component");
            return;
        }

        let tempData: TempDataProp = {};
        // console.log("Data to Process: ", fetchUserAttendanceQuery.data);

        userAttendanceData.forEach((data) => {
            const tempCourseId = data.courseId;
            if (!tempData[tempCourseId!]) {
                tempData[tempCourseId!] = {
                    courseId: tempCourseId!,
                    totalClasses: 0,
                    attendedClasses: 0,
                };
            }
            if (data.absOrPre) {
                tempData[tempCourseId!].attendedClasses++;
            }
            tempData[tempCourseId!].totalClasses++;
        });

        // console.log("Data Processed Successfully Subjects Component");
        return tempData;
    }

    const courseDataList = processData();

    return (
        <View style={{ flex: 1, position: 'relative' }}>
            <ScrollView>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 30,
                        marginTop: '7%',
                        marginBottom: 80,
                    }}>
                    {userTtData && userTtData.length > 0 ? (
                        userTtData.map((data: userTimeTableSelectType) => {
                            const courseData = courseDataList![data.courseId!]
                                ? courseDataList![data.courseId!]
                                : {
                                      courseId: data.courseId,
                                      totalClasses: 0,
                                      attendedClasses: 0,
                                  };

                            return (
                                <SubjectCard
                                    courseId={data.courseId!}
                                    //@ts-ignore
                                    courseData={courseData!}
                                    key={data.courseId}
                                />
                            );
                        })
                    ) : (
                        <PreDefinedForm />
                    )}
                </View>
            </ScrollView>
            {userTtData && userTtData.length > 0 ? (
                <View
                    style={{
                        position: 'absolute',
                        bottom: 8,
                        width: '95%',
                        borderWidth: 4,
                        borderColor: 'white',
                        marginHorizontal: 10,
                        borderRadius: 20,
                        backgroundColor: '#494949',
                    }}>
                    <BottomActionSubjects
                        degreeId={userTtData![0].degreeId}
                        branchId={userTtData![0].branchId}
                        semester={userTtData![0].semester}
                    />
                </View>
            ) : null}
        </View>
    );
}
