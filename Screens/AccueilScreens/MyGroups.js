import { View, Text, ImageBackground } from 'react-native'
import React from 'react'

const MyGroups = () => {
  return (
    <ImageBackground
      source={require("../../assets/profileBg.png")}
      style={styles.container}
    >
      <View>
        <Text>MyGroups</Text>
      </View>
    </ImageBackground>
  )
}
styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
}

export default MyGroups