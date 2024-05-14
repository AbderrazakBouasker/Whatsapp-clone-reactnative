import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  Linking,
  TextInput,
  ImageBackground,
} from "react-native";
import { Dialog, Button } from "react-native-paper";
import { FontAwesome5 } from '@expo/vector-icons'; // Assuming you're using Expo for icons


const MyGroups = () => {
  return (
    <ImageBackground
      source={require("../../assets/profileBg.png")}
      style={styles.container}
    >
      <View>
      <TouchableOpacity
      style={styles.userContainer}
      onPress={() => {
        
      }}
    >
      <Text style={styles.userName}>GL1</Text>
      <TouchableOpacity onPress={() => handleChat(item)}>
        <FontAwesome5 name="comment" size={24} color="#555" />
      </TouchableOpacity>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.userContainer}
      onPress={() => {
        
      }}
    >
      <Text style={styles.userName}>GL2</Text>
      <TouchableOpacity onPress={() => handleChat(item)}>
        <FontAwesome5 name="comment" size={24} color="#555" />
      </TouchableOpacity>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.userContainer}
      onPress={() => {
        
      }}
    >
      <Text style={styles.userName}>BI1</Text>
      <TouchableOpacity onPress={() => handleChat(item)}>
        <FontAwesome5 name="comment" size={24} color="#555" />
      </TouchableOpacity>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.userContainer}
      onPress={() => {
        
      }}
    >
      <Text style={styles.userName}>BI2</Text>
      <TouchableOpacity onPress={() => props.navigation.navigate("")}>
        <FontAwesome5 name="comment" size={24} color="#555" />
      </TouchableOpacity>
    </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    //backgroundColor: "#fff",
    elevation: 0,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: "#eee",
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#009bee",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userName: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
  },
  dialogTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  dialogContentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 20,
  },
  dialogUserImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginRight: 20,
  },
  userInfoContainer: {
    flex: 1,
  },
  userInfoLabel: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  userInfo: {
    marginBottom: 10,
    fontSize: 16,
  },
  dialogButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  cancelButton: {
    backgroundColor: "#FFf",
  },
});


export default MyGroups