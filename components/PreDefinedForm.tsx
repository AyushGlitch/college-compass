import {
    getPreDefindedTTDistinctDegreeQuery,
    getPreDefinedTTDistinctBranchSemQuery,
    getPreDefinedTTQuery,
} from '~/db/api/queries';
import { useState } from 'react';
import Loader from './Loader';
import { Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button, Pressable } from 'react-native';
import { useSubmitPredefinedTTForm } from '~/db/api/mutations';
import CustomButton from './CustomButton';

export default function PreDefinedForm() {
    const [selectedDegreeId, setSelectedDegreeId] = useState<string>('B.Tech');
    const [selectedBranchId, setSelectedBranchId] = useState<string>('');
    const [selectedSemester, setSelectedSemester] = useState<number>();

    const fetchPreDefinedTTDistinctQuery =
        getPreDefindedTTDistinctDegreeQuery();
    const fetchPreDefinedTTDistinctBranchSemQuery =
        getPreDefinedTTDistinctBranchSemQuery(selectedDegreeId);

    const submitPredefinedTTForm = useSubmitPredefinedTTForm();

    if (
        fetchPreDefinedTTDistinctQuery.isFetching ||
        fetchPreDefinedTTDistinctBranchSemQuery.isFetching
    ) {
        return <Loader />;
    }

    const onSubmit = () => {
        submitPredefinedTTForm.mutate({
            degreeId: selectedDegreeId,
            branchId: selectedBranchId,
            semester: selectedSemester!,
        });
    };

    return (
        <View className="flex-1 justify-center gap-12 p-4">
            <View className="gap-2">
                <Text className="text-center text-2xl font-semibold text-white">
                    No Subjects in Time Table
                </Text>
                <Text className="font-regular text-center text-xl text-white/60">
                    Select for your need
                </Text>
            </View>

            <View className="gap-6">
                <View>
                    <Text className="font-psemibold text-sm text-red-500">
                        Degree
                    </Text>
                    <View className="overflow-hidden rounded-lg border border-glass">
                        <Picker
                            selectedValue={selectedDegreeId}
                            onValueChange={(itemValue) =>
                                setSelectedDegreeId(itemValue)
                            }
                            dropdownIconColor="#99edcc"
                            mode="dropdown"
                            style={{
                                color: 'white',
                            }}>
                            {fetchPreDefinedTTDistinctQuery.data?.distinctDegree.map(
                                (degree) => (
                                    <Picker.Item
                                        label={degree}
                                        value={degree}
                                        key={degree}
                                    />
                                )
                            )}
                        </Picker>
                    </View>
                </View>

                <View>
                    <Text className="font-psemibold text-sm text-red-500">
                        Branch
                    </Text>
                    <View className="overflow-hidden rounded-lg border border-glass">
                        <Picker
                            selectedValue={selectedBranchId}
                            onValueChange={(itemValue) =>
                                setSelectedBranchId(itemValue)
                            }
                            dropdownIconColor="#99edcc"
                            mode="dropdown"
                            style={{
                                color: 'white',
                            }}>
                            {fetchPreDefinedTTDistinctBranchSemQuery.data?.distinctBranch.map(
                                (branch) => (
                                    <Picker.Item
                                        label={branch}
                                        value={branch}
                                        key={branch}
                                    />
                                )
                            )}
                        </Picker>
                    </View>
                </View>

                <View>
                    <Text className="font-psemibold text-sm text-red-500">
                        Semester
                    </Text>
                    <View className="overflow-hidden rounded-lg border border-glass">
                        <Picker
                            selectedValue={selectedSemester}
                            onValueChange={(itemValue) =>
                                setSelectedSemester(itemValue)
                            }
                            dropdownIconColor="#99edcc"
                            mode="dropdown"
                            style={{
                                color: 'white',
                            }}>
                            {fetchPreDefinedTTDistinctBranchSemQuery.data?.distinctSem.map(
                                (semester) => (
                                    <Picker.Item
                                        label={semester.toString()}
                                        value={semester}
                                        key={semester}
                                    />
                                )
                            )}
                        </Picker>
                    </View>
                </View>
            </View>

            <CustomButton
                title="Submit"
                handlePress={onSubmit}
                containerStyles="rounded-lg"
            />
        </View>
    );
}
