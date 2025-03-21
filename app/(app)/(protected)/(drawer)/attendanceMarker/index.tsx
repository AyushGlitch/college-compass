import { db } from '~/db/drizzle';
import Loader from '~/components/Loader';
import SubjectAttendanceCard from '~/components/SubjectAttendanceCard';
import { ScrollView } from 'react-native-gesture-handler';
import { Pressable, Button, View, Text } from 'react-native';
import { router } from 'expo-router';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { userAttendance, userTimeTable } from '~/db/schema';
import { Container } from '~/components/Container';
import CustomButton from '~/components/CustomButton';

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
    const { data: userAttendanceData } = useLiveQuery(
        db.select().from(userAttendance)
    );

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
        <Container className="bg-licorice">
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                }}>
                <View className="flex-1 items-center justify-start gap-4 p-4">
                    {userTtData && userTtData.length > 0 ? (
                        userTtData.map((data: any) => {
                            const courseData = courseDataList[
                                data.courseId
                            ] || {
                                courseId: data.courseId,
                                totalClasses: 0,
                                attendedClasses: 0,
                            };
                            return (
                                <SubjectAttendanceCard
                                    key={data.courseId}
                                    courseId={data.courseId}
                                    courseData={courseData}
                                />
                            );
                        })
                    ) : (
                        <View className="flex-1 items-center justify-center gap-8 p-4">
                            <Text className="text-center font-pbold text-2xl text-white">
                                No Course in Attendance List
                            </Text>
                            <Text className="text-center font-pregular text-white/60">
                                Add courses to your attendance list, as per your
                                Degree, Branch, and Semester, from our
                                predefined timetable.
                            </Text>
                            <CustomButton
                                title="Click Here to add Subjects"
                                handlePress={() =>
                                    router.push(
                                        '/(app)/(protected)/(drawer)/attendanceMarker/subjects'
                                    )
                                }
                            />
                        </View>
                    )}
                </View>
            </ScrollView>
        </Container>
    );
}
