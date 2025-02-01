import React, { useState } from 'react';
import {
    View,
    Text,
    Alert,
    Linking,
    Platform,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { Container } from '~/components/Container';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '~/components/CustomButton';

const HostelLeave = () => {
    const [leaveDate, setLeaveDate] = useState<Date | undefined>(new Date());
    const [returnDate, setReturnDate] = useState<Date | undefined>(new Date());
    const [leaveTime, setLeaveTime] = useState<Date | undefined>();
    const [reason, setReason] = useState('');
    const [destination, setDestination] = useState('');
    const [showDatePicker, setShowDatePicker] = useState<{
        type: 'leave' | 'return' | 'time';
    } | null>(null);

    const handleDateChange = (event: any, selectedDate?: Date) => {
        if (selectedDate) {
            if (showDatePicker?.type === 'leave') setLeaveDate(selectedDate);
            if (showDatePicker?.type === 'return') setReturnDate(selectedDate);
            if (showDatePicker?.type === 'time') setLeaveTime(selectedDate);
        }
        setShowDatePicker(null);
    };

    const sendEmail = () => {
        if (!leaveDate || !returnDate || !leaveTime || !reason || !destination) {
            Alert.alert('Error', 'Please fill in all fields before sending.');
            return;
        }

        const emailSubject = 'Hostel Leave Application';
        const emailBody = `
  Dear Warden,
  
  I am writing to formally request leave from the hostel. Below are the details of my leave:
  
  - **Date of Leaving:** ${dayjs(leaveDate).format('DD/MM/YYYY')}
  - **Date of Return:** ${dayjs(returnDate).format('DD/MM/YYYY')}
  - **Leaving Time:** ${dayjs(leaveTime).format('hh:mm A')}
  - **Destination:** ${destination}
  - **Reason for Leave:** ${reason}
  
  I assure you that I will abide by all hostel rules and return on the mentioned date. Kindly grant me permission for the leave.
  
  Looking forward to your approval.
  
  Sincerely,  
  [Your Name]  
  [Your Roll Number]  
  [Your Room Number]  
  [Your Contact Number]  
      `;

        const recipientEmail = '221210006@nitdelhi.ac.in';
        const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

        Linking.openURL(mailtoUrl)
            .then(() => Alert.alert('Success', 'Email app opened!'))
            .catch(() => Alert.alert('Error', 'Could not open email app'));
    };

    return (
        <Container className="p-4">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
                    className="flex-1">
                    <ScrollView
                        className="flex-1"
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled">
                        {/* Leave Date Picker */}
                        <View className="my-4">
                            <Text className="font-pbold text-lg">Leave Date</Text>
                            <View className="flex-row items-center justify-between rounded-md bg-white p-2">
                                <Text className="font-pregular">
                                    {leaveDate
                                        ? dayjs(leaveDate).format('DD/MM/YYYY')
                                        : 'No date selected'}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => setShowDatePicker({ type: 'leave' })}
                                    className="rounded-md bg-black/10 p-2">
                                    <Ionicons name="calendar-outline" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Return Date Picker */}
                        <View className="my-4">
                            <Text className="font-pbold text-lg">Return Date</Text>
                            <View className="flex-row items-center justify-between rounded-md bg-white p-2">
                                <Text className="font-pregular">
                                    {returnDate
                                        ? dayjs(returnDate).format('DD/MM/YYYY')
                                        : 'No date selected'}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => setShowDatePicker({ type: 'return' })}
                                    className="rounded-md bg-black/10 p-2">
                                    <Ionicons name="calendar-outline" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Leave Time Picker */}
                        <View className="my-4">
                            <Text className="font-pbold text-lg">Leave time</Text>
                            <View className="flex-row items-center justify-between rounded-md bg-white p-2">
                                <Text className="font-pregular">
                                    {leaveTime
                                        ? dayjs(leaveTime).format('hh:mm A')
                                        : 'No time selected'}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => setShowDatePicker({ type: 'time' })}
                                    className="rounded-md bg-black/10 p-2">
                                    <Ionicons name="time-outline" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Destination Input */}
                        <View className="my-4">
                            <Text className="font-pbold text-lg">Destination</Text>
                            <TextInput
                                placeholder="Where are you going?"
                                value={destination}
                                onChangeText={setDestination}
                                className="h-12 rounded-md bg-white p-2 font-pregular"
                            />
                        </View>

                        {/* Reason Input */}
                        <View className="my-4">
                            <Text className="font-pbold text-lg">Reason for Leave</Text>
                            <TextInput
                                placeholder="Why are you leaving?"
                                value={reason}
                                onChangeText={setReason}
                                className="rounded-md bg-white p-2 font-pregular"
                                textAlignVertical="top"
                                numberOfLines={10}
                                multiline
                            />
                        </View>

                        {/* <Button title="Send Email" onPress={sendEmail} /> */}

                        {/* Date Picker Modal */}
                        {showDatePicker && (
                            <DateTimePicker
                                value={leaveDate || new Date()}
                                mode={showDatePicker.type === 'time' ? 'time' : 'date'}
                                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                                onChange={handleDateChange}
                            />
                        )}
                    </ScrollView>
                    <CustomButton title="Send Email" handlePress={sendEmail} />
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </Container>
    );
};

export default HostelLeave;
