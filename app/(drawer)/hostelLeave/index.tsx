import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const HostelLeave = () => {
  return (
    <>
    <Stack.Screen options={{headerShown: false}} />
    <View>
      <Text>HostelLeave</Text>
    </View>
    </>
  )
}

export default HostelLeave