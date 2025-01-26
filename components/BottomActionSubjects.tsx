import { Button, Modal, Pressable } from 'react-native';
import { Text, View } from './Themed';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import { AddCourseProps, useAddCourse, useDeleteAllCourse } from '~/db/api/mutations';

interface BottomActionSubjectsProps {
    degreeId: string | null;
    branchId: string | null;
    semester: number | null;
}

export default function BottomActionSubjects({
    degreeId,
    branchId,
    semester,
}: BottomActionSubjectsProps) {
    const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
    const [courseId, setCourseId] = useState<string>('');

    const deleteAllCourse = useDeleteAllCourse();
    const handleDeleteAll = () => {
        deleteAllCourse.mutate();
        setIsDeleteModalVisible(false);
    };

    const addCourse = useAddCourse();
    const handleAddCourse = (courseId: string) => {
        if (courseId.length === 0) return alert('Please enter a valid course name');

        const data: AddCourseProps = {
            degreeId: degreeId!,
            branchId: branchId!,
            semester: semester!,
            courseId: courseId,
        };
        addCourse.mutate(data);
        setIsAddModalVisible(false);
    };

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 20,
                marginVertical: 10,
                backgroundColor: 'transparent',
            }}>
            <View style={{ width: '60%', backgroundColor: 'transparent' }}>
                <Button
                    title="Add a Course"
                    onPress={() => setIsAddModalVisible(true)}
                    color={'#06c710'}
                />
            </View>
            <Button
                title="Delete all"
                onPress={() => setIsDeleteModalVisible(true)}
                color={'#d62035'}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={isAddModalVisible}
                onRequestClose={() => setIsAddModalVisible(false)}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                    }}>
                    <View
                        style={{
                            flexWrap: 'wrap',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            borderWidth: 4,
                            borderColor: 'white',
                            borderRadius: 24,
                            marginHorizontal: 10,
                            marginVertical: 150,
                            height: 250,
                            padding: 20,
                        }}>
                        <Text style={{ fontWeight: '700', fontSize: 24 }}>
                            Add a Course / Subject
                        </Text>

                        <TextInput
                            style={{
                                height: 40,
                                borderColor: 'gray',
                                borderWidth: 2,
                                width: 200,
                                color: 'grey',
                                justifyContent: 'center',
                                paddingLeft: 10,
                            }}
                            onChangeText={(text) => setCourseId(text)}
                            value={courseId}
                            placeholder="Enter Course Name"
                            placeholderTextColor={'grey'}
                        />

                        <Pressable style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 60 }}>
                            <Button title="Add Subject" onPress={() => handleAddCourse(courseId)} />
                            <Button
                                title="Cancel"
                                color={'grey'}
                                onPress={() => setIsAddModalVisible(false)}
                            />
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isDeleteModalVisible}
                onRequestClose={() => setIsDeleteModalVisible(false)}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                    }}>
                    <View
                        style={{
                            flexWrap: 'wrap',
                            borderWidth: 4,
                            borderColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 25,
                            marginHorizontal: 10,
                            marginVertical: 150,
                            height: '40%',
                            gap: 20,
                            padding: 20,
                        }}>
                        <Text style={{ fontWeight: '700', fontSize: 25 }}>Confirm Delete</Text>
                        <Text style={{ fontWeight: '400', fontSize: 20, textAlign: 'center' }}>
                            Are you sure you want to delete{' '}
                            <Text style={{ fontWeight: '700' }}>all the courses'</Text> Attendance?
                        </Text>

                        <Pressable style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20 }}>
                            <Button
                                title="Delete"
                                color={'red'}
                                onPress={() => handleDeleteAll()}
                            />
                            {/* <Button title='Delete' color={'red'} onPress={() => setIsDeleteModalVisible(false)} /> */}
                            <Button
                                title="Cancel"
                                color={'grey'}
                                onPress={() => setIsDeleteModalVisible(false)}
                            />
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
