import {
    getPreDefindedTTDistinctDegreeQuery,
    getPreDefinedTTDistinctBranchSemQuery,
    getPreDefinedTTQuery,
} from '~/db/api/queries';
import { useState } from 'react';
import Loader from './Loader';
import { Text, View } from './Themed';
import { Picker } from '@react-native-picker/picker';
import { Button, Pressable } from 'react-native';
import { useSubmitPredefinedTTForm } from '~/db/api/mutations';

export default function PreDefinedForm() {
    const [selectedDegreeId, setSelectedDegreeId] = useState<string>('');
    const [selectedBranchId, setSelectedBranchId] = useState<string>('');
    const [selectedSemester, setSelectedSemester] = useState<number>();

    const fetchPreDefinedTTDistinctQuery = getPreDefindedTTDistinctDegreeQuery();
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
                <Text style={{ fontWeight: '700', fontSize: 26, textAlign: 'center' }}>
                    No Subject in Time Table
                </Text>
                <Text style={{ fontWeight: '500', fontSize: 20, textAlign: 'center' }}>
                    Select for your need{' '}
                    <Text style={{ fontWeight: '800' }}>
                        ( Open dropdown menu once and select )
                    </Text>{' '}
                </Text>
            </View>

            {/* <View style={{flexWrap: 'wrap'}}> */}
            <Text style={{ fontWeight: '500', fontSize: 16, marginBottom: 8, marginTop: 20 }}>
                Select the Degree:
            </Text>
            <Picker
                selectedValue={selectedDegreeId}
                onValueChange={(itemValue, itemIndex) => setSelectedDegreeId(itemValue)}
                style={{ height: 50, width: 250, backgroundColor: '#414141', color: 'white' }}>
                {fetchPreDefinedTTDistinctQuery.data?.distinctDegree.map((degree) => (
                    <Picker.Item
                        label={degree}
                        value={degree}
                        key={degree}
                        style={{ color: 'white', backgroundColor: '#414141' }}
                    />
                ))}
            </Picker>

            <Text style={{ fontWeight: '500', fontSize: 16, marginBottom: 8, marginTop: 20 }}>
                Select the Branch:
            </Text>
            <Picker
                selectedValue={selectedBranchId}
                onValueChange={(itemValue, itemIndex) => setSelectedBranchId(itemValue)}
                style={{ height: 50, width: 250, backgroundColor: '#414141', color: 'white' }}>
                {fetchPreDefinedTTDistinctBranchSemQuery.data?.distinctBranch.map((branch) => (
                    <Picker.Item
                        label={branch}
                        value={branch}
                        key={branch}
                        style={{ color: 'white', backgroundColor: '#414141' }}
                    />
                ))}
            </Picker>

            <Text style={{ fontWeight: '500', fontSize: 16, marginBottom: 8, marginTop: 20 }}>
                Select the Semester:
            </Text>
            <Picker
                selectedValue={selectedSemester}
                onValueChange={(itemValue, itemIndex) => setSelectedSemester(itemValue)}
                style={{ height: 50, width: 250, backgroundColor: '#414141', color: 'white' }}>
                {fetchPreDefinedTTDistinctBranchSemQuery.data?.distinctSem.map((semester) => (
                    <Picker.Item
                        label={semester.toString()}
                        value={semester}
                        key={semester}
                        style={{ color: 'white', backgroundColor: '#414141' }}
                    />
                ))}
            </Picker>
            {/* </View> */}

            <Pressable style={{ padding: 20 }}>
                <Button title="Submit" onPress={onSubmit} />
            </Pressable>
        </View>
    );
}
