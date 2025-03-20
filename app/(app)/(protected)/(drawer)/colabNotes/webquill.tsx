import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Container } from '~/components/Container'

const WebQuillScreen = () => {
    const {creatorId, roomName} = useLocalSearchParams<{creatorId: string, roomName: string}>()

  return (
    <Container className='bg-licorice'>
        <Text className='text-xl text-white font-psemibold text-center'>{creatorId}-{roomName}</Text>
    </Container>
  )
}

export default WebQuillScreen