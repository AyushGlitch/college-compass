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

    // TODO: Add rich html email template for Gmail API
    const sendEmail = () => {
        if (
            !leaveDate ||
            !returnDate ||
            !leaveTime ||
            !reason ||
            !destination
        ) {
            Alert.alert('Error', 'Please fill in all fields before sending.');
            return;
        }

        const emailSubject = 'Hostel Leave Application';

        const emailBody = `
  Dear Warden,
  
  I am writing to formally request leave from the hostel. Below are the details of my leave:
  
  📅 *Date of Leaving:* ${dayjs(leaveDate).format('DD/MM/YYYY')}
  📅 *Date of Return:* ${dayjs(returnDate).format('DD/MM/YYYY')}
  ⏰ *Leaving Time:* ${dayjs(leaveTime).format('hh:mm A')}
  📍 *Destination:* ${destination}
  📝 *Reason for Leave:* ${reason}
  
  I assure you that I will abide by all hostel rules and return on the mentioned date. Kindly grant me permission for the leave.
  
  Looking forward to your approval.
  
  Sincerely,  
  [Your Name]  
  [Your Roll Number] | [Your Room Number] | [Your Contact Number]
      `;

        const recipientEmail = '221210006@nitdelhi.ac.in';
        const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

        Linking.openURL(mailtoUrl);
    };

    return (
        <Container className="bg-licorice p-4">
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
                            <Text className="font-pbold text-lg text-aquamarine">
                                Leave Date
                            </Text>
                            <View className="flex-row items-center justify-between rounded-md border border-glass bg-licorice p-2 shadow-neon-glow backdrop-blur-lg">
                                <Text className="font-pregular text-white">
                                    {leaveDate
                                        ? dayjs(leaveDate).format('DD/MM/YYYY')
                                        : 'No date selected'}
                                </Text>
                                <TouchableOpacity
                                    onPress={() =>
                                        setShowDatePicker({ type: 'leave' })
                                    }
                                    className="rounded-md p-2">
                                    <Ionicons
                                        name="calendar-outline"
                                        size={24}
                                        color="white"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Return Date Picker */}
                        <View className="my-4">
                            <Text className="font-pbold text-lg text-aquamarine">
                                Return Date
                            </Text>
                            <View className="flex-row items-center justify-between rounded-md border border-glass bg-licorice p-2 shadow-neon-glow backdrop-blur-lg">
                                <Text className="font-pregular text-white">
                                    {returnDate
                                        ? dayjs(returnDate).format('DD/MM/YYYY')
                                        : 'No date selected'}
                                </Text>
                                <TouchableOpacity
                                    onPress={() =>
                                        setShowDatePicker({ type: 'return' })
                                    }
                                    className="rounded-md p-2">
                                    <Ionicons
                                        name="calendar-outline"
                                        size={24}
                                        color="white"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Leave Time Picker */}
                        <View className="my-4">
                            <Text className="font-pbold text-lg text-aquamarine">
                                Leave time
                            </Text>
                            <View className="flex-row items-center justify-between rounded-md border border-glass bg-licorice p-2 shadow-neon-glow backdrop-blur-lg">
                                <Text className="font-pregular text-white">
                                    {leaveTime
                                        ? dayjs(leaveTime).format('hh:mm A')
                                        : 'No time selected'}
                                </Text>
                                <TouchableOpacity
                                    onPress={() =>
                                        setShowDatePicker({ type: 'time' })
                                    }
                                    className="rounded-md p-2">
                                    <Ionicons
                                        name="time-outline"
                                        size={24}
                                        color="white"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Destination Input */}
                        <View className="my-4">
                            <Text className="font-pbold text-lg text-rose_pompadour">
                                Destination
                            </Text>
                            <View className="flex-row items-center justify-between rounded-md border border-glass bg-licorice p-2 shadow-neon-glow backdrop-blur-lg">
                                <TextInput
                                    placeholder="Where are you going?"
                                    value={destination}
                                    onChangeText={setDestination}
                                    className="w-full rounded-md p-2 font-pregular text-white placeholder:text-white"
                                />
                            </View>
                        </View>

                        {/* Reason Input */}
                        <View className="my-4">
                            <Text className="font-pbold text-lg text-rose_pompadour">
                                Reason for Leave
                            </Text>
                            <View className="flex-row rounded-md border border-glass bg-licorice p-2 shadow-neon-glow backdrop-blur-lg">
                                <TextInput
                                    placeholder="Why are you leaving?"
                                    value={reason}
                                    onChangeText={setReason}
                                    className="w-full rounded-md p-2 font-pregular text-white placeholder:text-white"
                                    numberOfLines={20}
                                    multiline
                                    scrollEnabled={false}
                                />
                            </View>
                        </View>

                        {/* <Button title="Send Email" onPress={sendEmail} /> */}

                        {/* Date Picker Modal */}
                        {showDatePicker && (
                            <DateTimePicker
                                value={leaveDate || new Date()}
                                mode={
                                    showDatePicker.type === 'time'
                                        ? 'time'
                                        : 'date'
                                }
                                display={
                                    Platform.OS === 'ios' ? 'inline' : 'default'
                                }
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
