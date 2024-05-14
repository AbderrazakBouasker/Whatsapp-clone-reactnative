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

import firebase from "../../Config";

const database = firebase.database();

const Users = (props) => {
  const currentId = props.route.params.currentId;

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [itemPressed, setItemPressed] = useState({});
  const [connected, setconnected] = useState(false);

  useEffect(() => {
    const fetchUsers = () => {
      database.ref("users").on("value", (snapshot) => {
        const data = snapshot.val();
        const users = Object.values(data);
        let usersData = users.filter((user) => user.Id !== currentId);
        setUsers(usersData);
        setFilteredUsers(usersData);
      });
    };

    fetchUsers();

    return () => {
      database.ref("users").off();
    };
  }, []);

  const handleSearch = (text) => {
    const filtered = users.filter(
      (user) =>
        user.Pseudo.toLowerCase().includes(text.toLowerCase()) ||
        user.Nom.toLowerCase().includes(text.toLowerCase()) ||
        user.Prenom.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleChat = (user) => {
    props.navigation.navigate("Chat", {
      currentId,
      secondId: user.Id,
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.userContainer}
      onPress={() => {
        setItemPressed(item);
        setIsDialogVisible(true);
      }}
    >
      <Image
        source={{ uri: item.UrlImage }}
        style={styles.userImage}
      />
      <Text style={styles.userName}>{item.Pseudo}</Text>
      <View
        style={{
          height: 10,
          width: 10,
          backgroundColor: item.connected? "green" : "red",
          borderRadius: 15,
          marginLeft: 10,
        }}
      >
      </View>
      <TouchableOpacity onPress={() => handleChat(item)}>
        <FontAwesome5 name="comment" size={24} color="#555" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require("../../assets/profileBg.png")}
      style={styles.container}
    >
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Users"
          onChangeText={handleSearch}
        />
        <FontAwesome5 name="search" size={20} color="#555" style={styles.searchIcon} />
      </View>
      <FlatList
        data={filteredUsers}
        renderItem={renderItem}
        keyExtractor={(item) => item.Id}
      />
      <Dialog visible={isDialogVisible}>
        <Dialog.Title style={styles.dialogTitle}>Details et options</Dialog.Title>
        <Dialog.Content>
          <View style={styles.dialogContentContainer}>
            <Image
              source={{ uri: itemPressed.UrlImage }}
              style={styles.dialogUserImage}
            />
            <View style={styles.userInfoContainer}>
              <Text style={styles.userInfoLabel}>Nom:</Text>
              <Text style={styles.userInfo}>{itemPressed.Nom}</Text>
              <Text style={styles.userInfoLabel}>Prenom:</Text>
              <Text style={styles.userInfo}>{itemPressed.Prenom}</Text>
              <Text style={styles.userInfoLabel}>Telephone:</Text>
              <Text style={styles.userInfo}>{itemPressed.Telephone}</Text>
              <Text style={styles.userInfoLabel}>Pseudo:</Text>
              <Text style={styles.userInfo}>{itemPressed.Pseudo}</Text>
            </View>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            style={styles.dialogButton}
            onPress={() => {
              if (Platform.OS === "android") {
                Linking.openURL(`tel:${itemPressed.Telephone}`);
              } else {
                Linking.openURL(`telprompt:${itemPressed.Telephone}`);
              }
            }}
          >
            Call
          </Button>
          <Button
            style={styles.dialogButton}
            onPress={() => handleChat(itemPressed)}
          >
            Chat
          </Button>
          <Button
            style={[styles.dialogButton, styles.cancelButton]}
            onPress={() => setIsDialogVisible(false)}
          >
            Cancel
          </Button>
        </Dialog.Actions>
      </Dialog>
    </View>
    </ImageBackground>
  );
};

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

export default Users;
