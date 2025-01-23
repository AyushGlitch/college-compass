import Loader from "~/components/Loader";
import { Text, View } from "~/components/Themed";
import { getAttendanceDateQuery, getUserTTQuery } from "~/db/api/queries";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";


export default function History() {
    const [selectedCourseId, setSelectedCourseId]= useState<string>("")

    const fetchUserTTQuery = getUserTTQuery()
    const fetchAttendanceDateQuery = getAttendanceDateQuery(selectedCourseId)

    


    return (
        <View style={{flex: 1, backgroundColor: '#414141', justifyContent:'flex-start', alignItems:'flex-start', paddingHorizontal:20, paddingTop:30}}>
            {/* <View style={{flexWrap: 'wrap'}}> */}
                <Text style={{fontWeight: '500', fontSize: 16, marginBottom: 8, marginTop:20}}>Select the CourseId:</Text>
                <Picker
                    selectedValue={selectedCourseId}
                    onValueChange={(itemValue, itemIndex) => setSelectedCourseId(itemValue)}
                    style={{ height: 50, width:'100%', backgroundColor: '#454545', color: 'white'}} 
                >
                    {
                        fetchUserTTQuery.data!.map( (data) => (
                            <Picker.Item label={data.courseId!} value={data.courseId} key={data.courseId} style={{color: 'white', backgroundColor: '#454545'}} />
                        ) )
                    }
                </Picker>
            {/* </View> */}

            <ScrollView style={{marginTop:30, backgroundColor:'transparent', width:'100%', marginBottom:20}}>
                {
                    (fetchAttendanceDateQuery.isFetching || fetchUserTTQuery.isFetching) ? (<Loader />) :
                    (
                        <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'transparent', gap:10}}>
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
                        </View>
                    )
                }
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
    )
}