import Loader from "~/components/Loader";
import SubjectAttendanceCard from "~/components/SubjectAttendanceCard";
import { Text, View } from "~/components/Themed";
import { getUserAttendanceQuery, getUserTTQuery } from "~/db/api/queries";
import { userTimeTableSelectType } from "~/db/schema";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

interface CourseDataProp {
    courseId: string;
    totalClasses: number;
    attendedClasses: number;
}

interface TempDataProp {
    [key: string]: CourseDataProp;
}

export default function Index() {

    const fetchUserTTQuery = getUserTTQuery();
    const fetchUserAttendanceQuery = getUserAttendanceQuery();

    if (fetchUserTTQuery.isFetching || fetchUserAttendanceQuery.isFetching) {
        return <Loader />;
    }


    function processData() {
        if (fetchUserTTQuery.data === undefined || fetchUserAttendanceQuery.data === undefined) {
            // console.log("Process Data Parameter is undefined Index Component");
            return;
        }

        if (fetchUserTTQuery.data.length === 0) {
            // console.log("No data to process Index Component");
            return;
        }

        let tempData: TempDataProp = {};
        // console.log("Data to Process: ", fetchUserAttendanceQuery.data);

        fetchUserAttendanceQuery.data.forEach((data) => {
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

        // console.log("Data Processed Successfully Index Component ");
        return tempData;
    }

    const courseDataList = processData();

    return (
        <View style={{ flex: 1}}>
            <ScrollView>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 30, marginTop:'7%', marginBottom: '5%' }}>
                    {
                        fetchUserTTQuery.data && fetchUserTTQuery.data.length > 0 ? (
                        fetchUserTTQuery.data.map((data) => {
                            const courseData = courseDataList![data.courseId!]
                                ? courseDataList![data.courseId!]
                                : { courseId: data.courseId, totalClasses: 0, attendedClasses: 0 };

                            return (
                                <SubjectAttendanceCard
                                courseId={data.courseId!}
                                //@ts-ignore
                                courseData={courseData!}
                                key={data.courseId}
                                />
                            );
                        })
                        ) : (
                            <View style={{height:'100%', justifyContent: "center", alignItems: "center", gap: 60, padding: 20 }}>
                                <Text style={{ textAlign: "center", fontWeight: "700", fontSize: 36 }}>
                                    No Course in Attendance List
                                </Text>
                                <Text style={{ textAlign: "center", fontWeight: "400", fontSize: 20 }}>
                                    Add courses to your attendance list, as per your Degree, Branch, and Semester, from our predefined timetable.
                                </Text>
                                <Pressable>
                                    <Button
                                    title="Click Here !!"
                                    onPress={() => router.push("/(protected)/(drawer)/attendanceMarker/subjects")}
                                    />
                                </Pressable>
                            </View>
                        )
                    }
                </View>
            </ScrollView>
        </View>
    );
}
