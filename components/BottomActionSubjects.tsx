import { Modal, Pressable, TextInput } from 'react-native';
import { Text, View } from 'react-native';
import { useState } from 'react';
import {
    AddCourseProps,
    useAddCourse,
    useDeleteAllCourse,
} from '~/db/api/mutations';

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
    const [isDeleteModalVisible, setIsDeleteModalVisible] =
        useState<boolean>(false);
    const [courseId, setCourseId] = useState<string>('');

    const deleteAllCourse = useDeleteAllCourse();
    const handleDeleteAll = () => {
        deleteAllCourse.mutate();
        setIsDeleteModalVisible(false);
    };

    const addCourse = useAddCourse();
    const handleAddCourse = (courseId: string) => {
        if (courseId.length === 0)
            return alert('Please enter a valid course name');

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
        <>
            <View className="flex-row overflow-hidden rounded-full border border-glass bg-licorice shadow-sm shadow-black">
                <Pressable
                    className="bg-white p-2"
                    onPress={() => setIsAddModalVisible(true)}>
                    <Text className="text-center font-psemibold text-licorice">
                        Add a Course
                    </Text>
                </Pressable>

                <Pressable
                    className="bg-red-700 p-2"
                    onPress={() => setIsDeleteModalVisible(true)}>
                    <Text className="text-center font-psemibold text-white">
                        Delete All
                    </Text>
                </Pressable>
            </View>

            {/* Add Course Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={isAddModalVisible}
                onRequestClose={() => setIsAddModalVisible(false)}>
                <View className="flex-1 items-center justify-center bg-black/40">
                    <View className="w-[85%] rounded-2xl border-4 border-white bg-licorice p-6">
                        <Text className="mb-4 text-center text-xl font-bold text-white">
                            Add a Course / Subject
                        </Text>

                        <TextInput
                            className="mb-4 w-full rounded-md border-2 border-gray-400 p-3 text-white"
                            onChangeText={(text) => setCourseId(text)}
                            value={courseId}
                            placeholder="Enter Course Name"
                            placeholderTextColor={'#a1a1a1'}
                        />

                        <View className="flex-row justify-between">
                            <Pressable
                                className="rounded-lg bg-green-600 px-5 py-3"
                                onPress={() => handleAddCourse(courseId)}>
                                <Text className="font-bold text-white">
                                    Add Subject
                                </Text>
                            </Pressable>

                            <Pressable
                                className="rounded-lg bg-gray-500 px-5 py-3"
                                onPress={() => setIsAddModalVisible(false)}>
                                <Text className="font-bold text-white">
                                    Cancel
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={isDeleteModalVisible}
                onRequestClose={() => setIsDeleteModalVisible(false)}>
                <View className="flex-1 items-center justify-center bg-black/40">
                    <View className="w-[85%] rounded-2xl border-4 border-white bg-licorice p-6">
                        <Text className="mb-3 text-center text-xl font-bold text-white">
                            Confirm Delete
                        </Text>

                        <Text className="mb-4 text-center text-lg text-gray-300">
                            Are you sure you want to delete{' '}
                            <Text className="font-bold text-white">
                                all the courses'
                            </Text>{' '}
                            Attendance?
                        </Text>

                        <View className="flex-row justify-between">
                            <Pressable
                                className="rounded-lg bg-red-600 px-5 py-3"
                                onPress={() => handleDeleteAll()}>
                                <Text className="font-bold text-white">
                                    Delete
                                </Text>
                            </Pressable>

                            <Pressable
                                className="rounded-lg bg-gray-500 px-5 py-3"
                                onPress={() => setIsDeleteModalVisible(false)}>
                                <Text className="font-bold text-white">
                                    Cancel
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}
