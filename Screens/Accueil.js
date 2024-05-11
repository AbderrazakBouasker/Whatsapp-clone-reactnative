import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { FontAwesome5 } from '@expo/vector-icons'; // Assuming you're using Expo for icons

import Users from "./AccueilScreens/Users";
import MyGroups from "./AccueilScreens/MyGroups";
import MyProfile from "./AccueilScreens/MyProfile";

const Tab = createMaterialBottomTabNavigator();

export default function Accueil(props) {
  const currentId = props.route.params.currentId;

  return (

    <View style={{ flex: 1}}>
      <Tab.Navigator
        barStyle={{ backgroundColor: '#ce11ef' }} // Update bar style to match Messenger
        shifting={false} // Disable shifting animation for tab bar
      >
        <Tab.Screen
          name="Users"
          component={Users}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="users" size={24} color={color} /> // Icon for Users
            ),
          }}
          initialParams={{ currentId }}
        />
        <Tab.Screen
          name="MyGroups"
          component={MyGroups}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="users" size={24} color={color} /> // Icon for MyGroups
            ),
          }}
        />
        <Tab.Screen
          name="MyProfile"
          component={MyProfile}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="user-circle" size={24} color={color} /> // Icon for MyProfile
            ),
          }}
          initialParams={{ currentId }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#128C7E',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#0D6E5E',
    borderRadius: 20,
    paddingHorizontal: 15,
    color: '#fff',
  },
});
