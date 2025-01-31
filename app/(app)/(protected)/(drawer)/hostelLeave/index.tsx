import { View, Text, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { Linking } from 'react-native';

const HostelLeave = () => {
  const [leaveDate, setLeaveDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [leaveTime, setLeaveTime] = useState('');
  const [reason, setReason] = useState('');
  const [destination, setDestination] = useState('');

  const sendEmail = () => {
    const emailSubject = 'Hostel Leave Application';
    const emailBody = `
Dear Warden,

I am writing to formally request leave from the hostel. Below are the details of my leave:

- **Date of Leaving:** ${leaveDate}
- **Date of Return:** ${returnDate}
- **Leaving Time:** ${leaveTime}
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

    const recipientEmail = '221210006@nitdelhi.ac.in'; // Update with the correct email
    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    Linking.openURL(mailtoUrl)
      .then(() => Alert.alert('Success', 'Email app opened!'))
      .catch((error) => Alert.alert('Error', 'Could not open email app'));
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Hostel Leave Request</Text>

        <TextInput placeholder="Date of Leaving (DD/MM/YYYY)" value={leaveDate} onChangeText={setLeaveDate} style={{ borderWidth: 1, padding: 10, marginVertical: 5 }} />
        <TextInput placeholder="Date of Return (DD/MM/YYYY)" value={returnDate} onChangeText={setReturnDate} style={{ borderWidth: 1, padding: 10, marginVertical: 5 }} />
        <TextInput placeholder="Leaving Time (HH:MM AM/PM)" value={leaveTime} onChangeText={setLeaveTime} style={{ borderWidth: 1, padding: 10, marginVertical: 5 }} />
        <TextInput placeholder="Destination" value={destination} onChangeText={setDestination} style={{ borderWidth: 1, padding: 10, marginVertical: 5 }} />
        <TextInput placeholder="Reason for Leave" value={reason} onChangeText={setReason} style={{ borderWidth: 1, padding: 10, marginVertical: 5 }} />

        <Button title="Send Email" onPress={sendEmail} />
      </View>
    </>
  );
};

export default HostelLeave;
