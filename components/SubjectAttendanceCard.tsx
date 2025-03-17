import {
    AddAbsentPresentProps,
    useAddAbsentPresent,
    useUndoAttendance,
} from '~/db/api/mutations';
import { Text, View } from 'react-native';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import CircularProgress from './CircularProgress';
import { Pressable } from 'react-native';

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
            className={`relative w-full flex-row flex-wrap items-center justify-between gap-2 rounded-3xl border border-glass bg-licorice p-4 py-3 shadow-lg ${
                attendPer < 75 && courseData.totalClasses > 0
                    ? 'shadow-red-500'
                    : 'shadow-green-500'
            }`}
            style={{ elevation: 10 }}>
            {/* Left Status Indicator */}
            <View
                className={`h-full w-2 rounded-3xl ${
                    attendPer < 75 && courseData.totalClasses > 0
                        ? 'bg-red-500'
                        : 'bg-green-400'
                }`}
            />

            {/* Course Info & Attendance Details */}
            <View className="flex-1 flex-wrap justify-center gap-1">
                <Text className="font-psemibold text-2xl text-white">
                    {courseId}
                </Text>
                <Text className="font-plight text-lg text-white">
                    <Text className="font-psemibold text-white">
                        Attendance:{' '}
                    </Text>
                    {courseData.attendedClasses} / {courseData.totalClasses}
                </Text>

                {/* Attendance Action Buttons */}
                <View className="flex-row flex-wrap items-center gap-x-6">
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

            {/* Circular Progress Bar */}
            <View className="flex">
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
