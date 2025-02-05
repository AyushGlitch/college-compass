import {
    AddAbsentPresentProps,
    useAddAbsentPresent,
    useUndoAttendance,
} from '~/db/api/mutations';
import { Text, View } from './Themed';
import { AntDesign, Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons';
import CircularProgress from './CircularProgress';
import { Button, Modal, Pressable } from 'react-native';
import { useState } from 'react';

interface SubjectAttendanceCardProps {
    courseId: string;
    courseData: {
        courseId: string;
        totalClasses: number;
        attendedClasses: number;
    };
}

export default function SubjectAttendanceCard({
    courseId,
    courseData,
}: SubjectAttendanceCardProps) {
    const attendPer =
        courseData.totalClasses === 0
            ? 0
            : parseFloat(
                  (
                      (courseData.attendedClasses / courseData.totalClasses) *
                      100
                  ).toFixed(2)
              );

    const addAbsentPresent = useAddAbsentPresent();
    const handleAttendance = (isPresent: boolean, courseId: string) => {
        const data: AddAbsentPresentProps = { isPresent, courseId };
        addAbsentPresent.mutate(data);
    };

    const undoAttendance = useUndoAttendance();
    const handleUndo = (courseId: string) => {
        undoAttendance.mutate(courseId);
    };

    return (
        <View
            style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '93%',
                borderRadius: 24,
                backgroundColor: '#282928',
                position: 'relative',
                shadowColor:
                    attendPer < 75 && courseData.totalClasses > 0
                        ? 'red'
                        : '#50C878',
                shadowOpacity: 0.7,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 4 },
                elevation: 10,
            }}>
            <View
                style={{
                    marginLeft: 5,
                    width: 8,
                    backgroundColor:
                        attendPer < 75 && courseData.totalClasses > 0
                            ? 'red'
                            : '#50C878',
                    borderRadius: 24,
                    height: '80%',
                }}
            />

            <View
                style={{
                    backgroundColor: 'transparent',
                    flexWrap: 'wrap',
                    width: '60%',
                    justifyContent: 'center',
                    margin: 12,
                    gap: 7,
                }}>
                <Text style={{ fontWeight: '700', fontSize: 24 }}>
                    {courseId}
                </Text>
                <Text style={{ fontSize: 18 }}>
                    <Text style={{ fontWeight: '700' }}>Attendance: </Text>
                    {courseData.attendedClasses} / {courseData.totalClasses}
                </Text>

                <View
                    style={{
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        gap: 20,
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                    }}>
                    <Pressable
                        onPress={() =>
                            handleAttendance(true, courseData.courseId)
                        }>
                        <AntDesign
                            name="checkcircle"
                            size={28}
                            color="#50C790"
                        />
                    </Pressable>
                    <Pressable
                        onPress={() =>
                            handleAttendance(false, courseData.courseId)
                        }>
                        <Entypo
                            name="circle-with-cross"
                            size={32}
                            color="red"
                        />
                    </Pressable>
                    <Pressable onPress={() => handleUndo(courseData.courseId)}>
                        <Ionicons
                            name="arrow-undo-circle"
                            size={34}
                            color="lightblue"
                        />
                    </Pressable>
                </View>
            </View>

            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    margin: 12,
                    backgroundColor: 'transparent',
                }}>
                <CircularProgress
                    progress={attendPer}
                    outerCircleColor="white"
                    progressCircleColor={
                        attendPer < 75 && courseData.totalClasses > 0
                            ? 'red'
                            : 'green'
                    }
                    strokeWidth={10}
                    labelStyle={{ fontWeight: '800' }}
                    labelSize={15}
                />
            </View>
        </View>
    );
}
