import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { Text, View } from "./Themed"
import { useState } from "react"
import { Button, Modal, Pressable } from "react-native"
import { EditCourseIdProps, useDeleteCourse, useEditCourseId, useResetCourse } from "~/db/api/mutations"
import { TextInput, TouchableOpacity } from "react-native-gesture-handler"



interface SubjectCardProps {
    courseId: string
    courseData: {
        courseId: string,
        totalClasses: number,
        attendedClasses: number
    }
}


export default function SubjectCard ({courseId, courseData} : SubjectCardProps) {

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false)
    const [isRestartModalVisible, setIsRestartModalVisible] = useState<boolean>(false)
    const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false)

    const [newCourseId, setNewCourseId] = useState<string>('')

    const deleteCourse= useDeleteCourse()
    const handleDelete = (courseId: string) => {
        deleteCourse.mutate(courseId)
        setIsDeleteModalVisible(false)
    }


    const resetCourse= useResetCourse()
    const handleReset = (courseId: string) => {
        resetCourse.mutate(courseId)
        setIsRestartModalVisible(false)
    }


    const editCourseId= useEditCourseId()
    const handleEdit= (newCourseId: string) => {
        if(newCourseId.length === 0) 
            return alert('Please enter a valid course name')

        const data:EditCourseIdProps = {courseId: courseId, newCourseId: newCourseId}
        editCourseId.mutate(data)
        setIsEditModalVisible(false)
    }


    return (
        <View style={{flex: 1, borderWidth: 4, borderColor: '#888888', justifyContent: 'space-around', width: '90%', height: '15%', borderRadius: 25, backgroundColor:'#333333', shadowColor: 'white', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.7, shadowRadius: 6, elevation: 10 }}>
            <View style={{flex: 1, justifyContent: 'center', backgroundColor:'transparent', marginTop:12, marginHorizontal:12}}>
                <Text style={{fontWeight: '700', fontSize: 24}}>{courseId}</Text>
                <View style={{flexWrap: 'wrap', flexDirection: 'row', gap: 12, justifyContent:'space-between', backgroundColor:'transparent'}}>
                    <Text style={{fontSize: 16}}>
                        <Text style={{fontWeight: '700'}}>Total Classes: </Text>{courseData.totalClasses}
                    </Text>
                    <Text style={{fontSize: 16}}>
                        <Text style={{fontWeight: '700'}}>Attended Classes: </Text>{courseData.attendedClasses}
                    </Text>
                </View>
            </View>

            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 20, margin:12, backgroundColor:'transparent'}}>
                <TouchableOpacity>
                    <FontAwesome5 name="pen" size={24} color="white" onPress={() => {
                        setNewCourseId(courseId)
                        setIsEditModalVisible(true)
                    }} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="restart" size={29} color="white" onPress={() => setIsRestartModalVisible(true)} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialIcons name="delete-forever" size={29} color="white" onPress={() => setIsDeleteModalVisible(true)} />
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isDeleteModalVisible}
                onRequestClose={() => setIsDeleteModalVisible(false)}
            >
                <View style={{flex: 1, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <View style={{flexWrap:'wrap', borderWidth: 4, borderColor: 'white', justifyContent:'center', alignItems:'center', borderRadius:24, marginHorizontal:10, marginVertical:150, height:'40%', gap:20, padding:20}}>
                            <Text style={{fontWeight:'700', fontSize:25}}>
                                Confirm Delete
                            </Text>
                            <Text style={{fontWeight:'400', fontSize:20, textAlign:'center'}}>
                                Are you sure you want to delete <Text style={{fontWeight:'700'}}>{courseId}</Text> Attendance?
                            </Text>

                            <Pressable style={{flexDirection:'row', flexWrap:'wrap', gap:20}}>
                                <Button title='Delete' color={'red'} onPress={() => handleDelete(courseId)} />
                                {/* <Button title='Delete' color={'red'} onPress={() => setIsDeleteModalVisible(false)} /> */}
                                <Button title='Cancel' color={'grey'} onPress={() => setIsDeleteModalVisible(false)}/>
                            </Pressable>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isRestartModalVisible}
                onRequestClose={() => setIsRestartModalVisible(false)}
            >
                <View style={{flex: 1, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <View style={{flexWrap:'wrap', borderWidth: 4, borderColor: 'white', justifyContent:'center', alignItems:'center', borderRadius:24, marginHorizontal:10, marginVertical:150, height:'40%', gap:20, padding:20}}>
                            <Text style={{fontWeight:'700', fontSize:25}}>
                                Confirm Restart
                            </Text>
                            <Text style={{fontWeight:'400', fontSize:20, textAlign:'center'}}>
                                Are you sure you want to restart <Text style={{fontWeight:'700'}}>{courseId} </Text> Attendance?
                            </Text>

                            <Pressable style={{flexDirection:'row', flexWrap:'wrap', gap:20}}>
                                {/* <Button title='Delete' color={'red'} onPress={() => handleReset(courseId)} /> */}
                                <Button title='Restart' onPress={() => handleReset(courseId)} />
                                <Button title='Cancel' color={'grey'} onPress={() => setIsRestartModalVisible(false)}/>
                            </Pressable>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isEditModalVisible}
                onRequestClose={() => setIsEditModalVisible(false)}
            >
                <View style={{flex: 1, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)'}}>
                    <View style={{flexWrap:'wrap', justifyContent:'space-around', alignItems:'center', borderWidth:4, borderColor:'white', borderRadius:24, marginHorizontal:10, marginVertical:150, height:250, padding:20}}>
                            <Text style={{fontWeight:'500', fontSize:24, textAlign:'center'}}>
                                Edit the <Text style={{fontWeight:'700'}}>{courseId}</Text> name
                            </Text>
                            
                            <TextInput 
                                style={{ height: 40, borderColor: 'gray', borderWidth: 2, width: 200, color:'grey', justifyContent: 'center', paddingLeft:10 }}
                                onChangeText={text => setNewCourseId(text)}
                                value={newCourseId}
                                placeholder="Enter New Course Name"
                                placeholderTextColor={'grey'}
                            />

                            <Pressable style={{flexDirection:'row', flexWrap:'wrap', gap:60}}>
                                <Button title='Change' onPress={() => handleEdit(newCourseId)} />
                                <Button title='Cancel' color={'grey'} onPress={() => setIsEditModalVisible(false)}/>
                            </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}