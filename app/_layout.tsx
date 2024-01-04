import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {
  return (

    // Esse e o inicio da aplicaçao como o nome diz esse e o layout e o modelo pro site todo
    // o que você mudar aqui vai mudar o site todo por ecemplo coloca o headerShow para true
    // ele tambem reconhece a primeira tota como index.tsx

    <Stack screenOptions={{headerShown: false}}></Stack>
  )
}

export default Layout