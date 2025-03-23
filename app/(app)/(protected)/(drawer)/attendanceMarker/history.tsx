import Loader from '~/components/Loader';
import { ScrollView, Text, View } from 'react-native';
import { getAttendanceDateQuery, getUserTTQuery } from '~/db/api/queries';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { db } from '~/db/drizzle';
import { userAttendance, userTimeTable } from '~/db/schema';
import { Container } from '~/components/Container';

export default function History() {
    const [selectedCourseId, setSelectedCourseId] = useState<string>('');

    // Fetch user timetable and attendance using useLiveQuery
    const { data: userTtData } = useLiveQuery(db.select().from(userTimeTable));
    const { data: userAttendanceData } = useLiveQuery(
        db.select().from(userAttendance)
    );

    // Handle loading state
    if (!userTtData || !userAttendanceData) {
        return <Loader />;
    }

    return (
        <Container className="gap-6 bg-licorice p-4">
            {/* Course Selection */}
            <View className="flex-row gap-2 rounded-lg border border-glass bg-licorice px-4">
                <Text className="mb-2 mt-4 font-psemibold text-lg text-folly">
                    Course
                </Text>

                <Picker
                    selectedValue={selectedCourseId}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedCourseId(itemValue)
                    }
                    style={{
                        height: 50,
                        backgroundColor: 'transparent',
                        color: 'white',
                        flex: 1,
                    }}
                    dropdownIconColor="#99edcc"
                    mode="dropdown">
                    {userTtData.map((data) => (
                        <Picker.Item
                            label={data.courseId!}
                            value={data.courseId}
                            key={data.courseId}
                        />
                    ))}
                </Picker>
            </View>

            {/* Attendance List */}
            <ScrollView>
                <View className="flex items-center justify-center gap-3">
                    {[...userAttendanceData].reverse().map((data, i) => (
                        <View
                            key={`${data.courseId}-${data.createdAt}-${i}`}
                            className="w-full flex-row items-center gap-4 rounded-2xl border border-glass bg-licorice p-2 shadow-neon-glow">
                            {/* Status Indicator */}
                            <View
                                className="h-full w-2 rounded-full"
                                style={{
                                    backgroundColor: data.absOrPre
                                        ? '#16a34a'
                                        : '#dc2626', // Green if Present, Red if Absent
                                }}
                            />

                            {/* Attendance Details */}
                            <View className="flex-1">
                                <Text className="text-lg font-bold text-white">
                                    {data.numDate} {data.month} {data.year} (
                                    {data.date})
                                </Text>

                                <View className="mt-1 flex-row justify-between">
                                    <Text className="text-gray-300">
                                        <Text className="font-bold">Day: </Text>
                                        {data.day}
                                    </Text>
                                    <Text className="text-gray-300">
                                        <Text className="font-bold">
                                            Time:{' '}
                                        </Text>
                                        {data.time}
                                    </Text>
                                </View>

                                <Text className="mt-1 text-gray-300">
                                    <Text className="font-bold">Status: </Text>
                                    {data.absOrPre ? '✅ Present' : '❌ Absent'}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* <View className="flex items-center justify-center gap-3">
                    {[...fetchAttendanceDateQuery.data]
                        .reverse()
                        .map((data) => (
                            <View
                                key={data.createdAt}
                                className="w-full flex-row items-center rounded-2xl bg-[#282928] p-4">
                                <View
                                    className={`w-2 bg-${data.absOrPre ? 'green-500' : 'red-500'} mr-3 h-full rounded-2xl`}
                                />
                                <View className="flex-1">
                                    <Text className="text-lg font-bold text-white">
                                        {data.numDate} {data.month} {data.year}{' '}
                                        ({data.date})
                                    </Text>

                                    <View className="flex-row justify-between">
                                        <Text className="text-gray-300">
                                            <Text className="font-bold">
                                                Day:{' '}
                                            </Text>
                                            {data.day}
                                        </Text>
                                        <Text className="text-gray-300">
                                            <Text className="font-bold">
                                                Time:{' '}
                                            </Text>
                                            {data.time}
                                        </Text>
                                    </View>

                                    <Text className="text-gray-300">
                                        <Text className="font-bold">
                                            Status:{' '}
                                        </Text>
                                        {data.absOrPre ? 'Present' : 'Absent'}
                                    </Text>
                                </View>
                            </View>
                        ))}
                </View> */}
            </ScrollView>
        </Container>
    );
}
