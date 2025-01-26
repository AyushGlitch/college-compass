import Loader from '~/components/Loader';
import { Text, View } from '~/components/Themed';
import { getAttendanceDateQuery, getUserTTQuery } from '~/db/api/queries';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { db } from '~/db/drizzle';
import { userAttendance, userTimeTable } from '~/db/schema';

export default function History() {
    const [selectedCourseId, setSelectedCourseId] = useState<string>('');

    // Fetch user timetable and attendance using useLiveQuery
    const { data: userTtData } = useLiveQuery(db.select().from(userTimeTable));
    const { data: userAttendanceData } = useLiveQuery(db.select().from(userAttendance));

    // Handle loading state
    if (!userTtData || !userAttendanceData) {
        return <Loader />;
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#414141',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                paddingHorizontal: 20,
                paddingTop: 30,
            }}>
            {/* <View style={{flexWrap: 'wrap'}}> */}
            <Text style={{ fontWeight: '500', fontSize: 16, marginBottom: 8, marginTop: 20 }}>
                Select the CourseId:
            </Text>
            <Picker
                selectedValue={selectedCourseId}
                onValueChange={(itemValue, itemIndex) => setSelectedCourseId(itemValue)}
                style={{ height: 50, width: '100%', backgroundColor: '#454545', color: 'white' }}>
                {userTtData.map((data) => (
                    <Picker.Item
                        label={data.courseId!}
                        value={data.courseId}
                        key={data.courseId}
                        style={{ color: 'white', backgroundColor: '#454545' }}
                    />
                ))}
            </Picker>
            {/* </View> */}

            <ScrollView
                style={{
                    marginTop: 30,
                    backgroundColor: 'transparent',
                    width: '100%',
                    marginBottom: 20,
                }}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        gap: 10,
                    }}>
                    {/* TODO: Reverse order */}
                    {userAttendanceData.map((data, i) => (
                        <View
                            key={`${data.courseId}-${data.createdAt}-${i}`}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: '100%',
                                borderRadius: 24,
                                backgroundColor: '#282928',
                                padding: 12,
                            }}>
                            <View
                                style={{
                                    width: 8,
                                    backgroundColor: data.absOrPre ? 'green' : 'red',
                                    borderRadius: 24,
                                    height: '95%',
                                    marginRight: 10,
                                }}
                            />

                            <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                                <Text style={{ fontSize: 18, fontWeight: '700' }}>
                                    {data.numDate} {data.month} {data.year} ( {data.date} )
                                </Text>

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        backgroundColor: 'transparent',
                                    }}>
                                    <Text style={{ fontSize: 16 }}>
                                        <Text style={{ fontWeight: '700' }}>Day: </Text>
                                        {data.day}
                                    </Text>
                                    <Text style={{ fontSize: 16 }}>
                                        <Text style={{ fontWeight: '700' }}>Time: </Text>
                                        {data.time}
                                    </Text>
                                </View>

                                <Text style={{ fontSize: 16 }}>
                                    <Text style={{ fontWeight: '700' }}>Status: </Text>
                                    {data.absOrPre ? 'Present' : 'Absent'}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'transparent', gap:10}}>
                    {
                        fetchAttendanceDateQuery.data?.map( (data) => (
                            <View key={data.createdAt} style={{flexDirection: 'row', alignItems: 'center', width: '100%', borderRadius: 24, backgroundColor: '#282928', padding: 12}}>
                                <View style={{
                                    width: 8,
                                    backgroundColor: (data.absOrPre) ? 'green' : 'red',
                                    borderRadius: 24,
                                    height: '95%',
                                    marginRight: 10
                                }} />

                                <View style={{flex: 1, backgroundColor:'transparent'}}>
                                    <Text style={{fontSize: 18, fontWeight: '700'}}>
                                        {data.numDate} {data.month} {data.year} ( {data.date} )
                                    </Text>

                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor:'transparent'}}>
                                        <Text style={{fontSize: 16}}>
                                            <Text style={{fontWeight: '700'}}>Day: </Text>{data.day}
                                        </Text>
                                        <Text style={{fontSize: 16}}>
                                            <Text style={{fontWeight: '700'}}>Time: </Text>{data.time}
                                        </Text>
                                    </View>

                                    <Text style={{fontSize: 16}}>
                                        <Text style={{fontWeight: '700'}}>Status: </Text>{data.absOrPre ? 'Present' : 'Absent'}
                                    </Text>
                                </View>
                            </View>

                        ) )
                    }
                </View> */}
            </ScrollView>
        </View>
    );
}
