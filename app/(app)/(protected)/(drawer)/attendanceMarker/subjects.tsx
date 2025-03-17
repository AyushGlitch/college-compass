import BottomActionSubjects from '~/components/BottomActionSubjects';
import Loader from '~/components/Loader';
import PreDefinedForm from '~/components/PreDefinedForm';
import SubjectCard from '~/components/SubjectCard';
import { Text, View } from 'react-native';
import { getUserAttendanceQuery, getUserTTQuery } from '~/db/api/queries';
import {
    userAttendance,
    userTimeTable,
    userTimeTableSelectType,
} from '~/db/schema';
import { ScrollView } from 'react-native-gesture-handler';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { db } from '~/db/drizzle';
import { Container } from '~/components/Container';

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
        <Container className="bg-licorice">
            <ScrollView>
                <View className="items-center justify-center gap-4 p-4 pb-20">
                    {userTtData && userTtData.length > 0 ? (
                        userTtData.map((data: userTimeTableSelectType) => {
                            const courseData = courseDataList?.[
                                data.courseId!
                            ] || {
                                courseId: data.courseId,
                                totalClasses: 0,
                                attendedClasses: 0,
                            };

                            return (
                                <SubjectCard
                                    courseId={data.courseId!}
                                    //@ts-ignore
                                    courseData={courseData}
                                    key={data.courseId}
                                />
                            );
                        })
                    ) : (
                        <PreDefinedForm />
                    )}
                </View>
            </ScrollView>

            {userTtData && userTtData.length > 0 && (
                <View
                    className="absolute bottom-4 left-4"
                    style={{ elevation: 12 }}>
                    <BottomActionSubjects
                        degreeId={userTtData![0].degreeId}
                        branchId={userTtData![0].branchId}
                        semester={userTtData![0].semester}
                    />
                </View>
            )}
        </Container>
    );
}
