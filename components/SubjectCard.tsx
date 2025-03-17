import {
    FontAwesome5,
    MaterialCommunityIcons,
    MaterialIcons,
} from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { useState } from 'react';
import { Button, Modal, Pressable } from 'react-native';
import {
    EditCourseIdProps,
    useDeleteCourse,
    useEditCourseId,
    useResetCourse,
} from '~/db/api/mutations';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

interface SubjectCardProps {
    courseId: string;
    courseData: {
        courseId: string;
        totalClasses: number;
        attendedClasses: number;
    };
}

export default function SubjectCard({
    courseId,
    courseData,
}: SubjectCardProps) {
    const [isDeleteModalVisible, setIsDeleteModalVisible] =
        useState<boolean>(false);
    const [isRestartModalVisible, setIsRestartModalVisible] =
        useState<boolean>(false);
    const [isEditModalVisible, setIsEditModalVisible] =
        useState<boolean>(false);

    const [newCourseId, setNewCourseId] = useState<string>('');

    const deleteCourse = useDeleteCourse();
    const handleDelete = (courseId: string) => {
        deleteCourse.mutate(courseId);
        setIsDeleteModalVisible(false);
    };

    const resetCourse = useResetCourse();
    const handleReset = (courseId: string) => {
        resetCourse.mutate(courseId);
        setIsRestartModalVisible(false);
    };

    const editCourseId = useEditCourseId();
    const handleEdit = (newCourseId: string) => {
        if (newCourseId.length === 0)
            return alert('Please enter a valid course name');

        const data: EditCourseIdProps = {
            courseId: courseId,
            newCourseId: newCourseId,
        };
        editCourseId.mutate(data);
        setIsEditModalVisible(false);
    };

    return (
        <View
            className="w-full flex-row items-center justify-between gap-2 rounded-3xl border border-glass bg-licorice p-4 shadow-neon-glow"
            style={{ elevation: 10 }}>
            {/* Course Info */}
            <View className="w-full flex-1 flex-col gap-2">
                <Text className="font-psemibold text-2xl text-white">
                    {courseId}
                </Text>

                <Text className="font-plight text-lg text-white">
                    <Text className="font-psemibold">Total Classes: </Text>
                    {courseData.totalClasses}
                </Text>
                <Text className="font-plight text-lg text-white">
                    <Text className="font-psemibold">Attended Classes: </Text>
                    {courseData.attendedClasses}
                </Text>
            </View>

            {/* Action Buttons */}
            <View className="items-center justify-between gap-2">
                <Pressable
                    onPress={() => {
                        setNewCourseId(courseId);
                        setIsEditModalVisible(true);
                    }}>
                    <FontAwesome5 name="pen" size={20} color="lightgreen" />
                </Pressable>
                <Pressable onPress={() => setIsRestartModalVisible(true)}>
                    <MaterialCommunityIcons
                        name="restart"
                        size={28}
                        color="lightblue"
                    />
                </Pressable>
                <Pressable onPress={() => setIsDeleteModalVisible(true)}>
                    <MaterialIcons
                        name="delete-forever"
                        size={28}
                        color="red"
                    />
                </Pressable>
            </View>

            {/* Delete Modal */}
            <Modal
                animationType="slide"
                transparent
                visible={isDeleteModalVisible}
                onRequestClose={() => setIsDeleteModalVisible(false)}>
                <View className="flex-1 items-center bg-black/50">
                    <View className="my-[20%] w-[85%] gap-5 rounded-3xl border border-white p-5">
                        <Text className="text-center text-2xl font-bold text-white">
                            Confirm Delete
                        </Text>
                        <Text className="text-center text-lg text-white">
                            Are you sure you want to delete{' '}
                            <Text className="font-bold">{courseId}</Text>{' '}
                            attendance?
                        </Text>
                        <View className="flex-row justify-center gap-6">
                            <Button
                                title="Delete"
                                color="red"
                                onPress={() => handleDelete(courseId)}
                            />
                            <Button
                                title="Cancel"
                                color="grey"
                                onPress={() => setIsDeleteModalVisible(false)}
                            />
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Restart Modal */}
            <Modal
                animationType="slide"
                transparent
                visible={isRestartModalVisible}
                onRequestClose={() => setIsRestartModalVisible(false)}>
                <View className="flex-1 items-center bg-black/50">
                    <View className="my-[20%] w-[85%] gap-5 rounded-3xl border border-white p-5">
                        <Text className="text-center text-2xl font-bold text-white">
                            Confirm Restart
                        </Text>
                        <Text className="text-center text-lg text-white">
                            Are you sure you want to restart{' '}
                            <Text className="font-bold">{courseId}</Text>{' '}
                            attendance?
                        </Text>
                        <View className="flex-row justify-center gap-6">
                            <Button
                                title="Restart"
                                onPress={() => handleReset(courseId)}
                            />
                            <Button
                                title="Cancel"
                                color="grey"
                                onPress={() => setIsRestartModalVisible(false)}
                            />
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Edit Modal */}
            <Modal
                animationType="slide"
                transparent
                visible={isEditModalVisible}
                onRequestClose={() => setIsEditModalVisible(false)}>
                <View className="flex-1 items-center bg-black/70">
                    <View className="my-[20%] w-[85%] gap-5 rounded-3xl border border-white p-5">
                        <Text className="text-center text-2xl font-bold text-white">
                            Edit the{' '}
                            <Text className="font-bold">{courseId}</Text> name
                        </Text>

                        <TextInput
                            className="h-10 w-full rounded-md border border-gray-400 p-2 text-white"
                            onChangeText={(text) => setNewCourseId(text)}
                            value={newCourseId}
                            placeholder="Enter New Course Name"
                            placeholderTextColor="gray"
                        />

                        <View className="flex-row justify-center gap-6">
                            <Button
                                title="Change"
                                onPress={() => handleEdit(newCourseId)}
                            />
                            <Button
                                title="Cancel"
                                color="grey"
                                onPress={() => setIsEditModalVisible(false)}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
