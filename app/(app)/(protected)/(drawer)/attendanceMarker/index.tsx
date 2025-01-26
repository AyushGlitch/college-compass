import { db } from '~/db/drizzle';
import { Text, View } from '~/components/Themed';
import Loader from '~/components/Loader';
import SubjectAttendanceCard from '~/components/SubjectAttendanceCard';
import { ScrollView } from 'react-native-gesture-handler';
import { Pressable, Button } from 'react-native';
import { router } from 'expo-router';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { userAttendance, userTimeTable } from '~/db/schema';

// Define SQL queries for fetching data
const USER_TT_QUERY = 'SELECT * FROM userTimeTable;';
const USER_ATTENDANCE_QUERY = 'SELECT * FROM userAttendance;';

interface CourseDataProp {
    courseId: string;
    totalClasses: number;
    attendedClasses: number;
}

interface TempDataProp {
    [key: string]: CourseDataProp;
}

export default function Index() {
    // Fetch user timetable and attendance using useLiveQuery
    const { data: userTtData } = useLiveQuery(db.select().from(userTimeTable));
    const { data: userAttendanceData } = useLiveQuery(db.select().from(userAttendance));

    // Handle loading state
    if (!userTtData || !userAttendanceData) {
        return <Loader />;
    }

    // Handle data processing
    function processData() {
        if (!userAttendanceData || userAttendanceData.length === 0) {
            return {};
        }

        let tempData: TempDataProp = {};

        // Process attendance data
        userAttendanceData.forEach((data: any) => {
            const tempCourseId = data.courseId;
            if (!tempData[tempCourseId]) {
                tempData[tempCourseId] = {
                    courseId: tempCourseId,
                    totalClasses: 0,
                    attendedClasses: 0,
                };
            }
            if (data.absOrPre) {
                tempData[tempCourseId].attendedClasses++;
            }
            tempData[tempCourseId].totalClasses++;
        });

        return tempData;
    }

    const courseDataList = processData();

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 30,
                        marginTop: '7%',
                        marginBottom: '5%',
                    }}>
                    {userTtData && userTtData.length > 0 ? (
                        userTtData.map((data: any) => {
                            const courseData = courseDataList[data.courseId]
                                ? courseDataList[data.courseId]
                                : { courseId: data.courseId, totalClasses: 0, attendedClasses: 0 };

                            return (
                                <SubjectAttendanceCard
                                    courseId={data.courseId}
                                    courseData={courseData}
                                    key={data.courseId}
                                />
                            );
                        })
                    ) : (
                        <View
                            style={{
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 60,
                                padding: 20,
                            }}>
                            <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 36 }}>
                                No Course in Attendance List
                            </Text>
                            <Text style={{ textAlign: 'center', fontWeight: '400', fontSize: 20 }}>
                                Add courses to your attendance list, as per your Degree, Branch, and
                                Semester, from our predefined timetable.
                            </Text>
                            <Pressable>
                                <Button
                                    title="Click Here !!"
                                    onPress={() =>
                                        router.push(
                                            '/(app)/(protected)/(drawer)/attendanceMarker/subjects'
                                        )
                                    }
                                />
                            </Pressable>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}
