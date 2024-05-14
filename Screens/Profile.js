import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

import firebase from "../Config";
const database = firebase.database();
const storage = firebase.storage();

export default function Profile(props) {
  // Get the current user id from the initial parameters
  const currentId = props.route.params.currentId;

  const [Nom, setNom] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [Telephone, setTelephone] = useState("");
  const [Pseudo, setPseudo] = useState("");
  const [UrlImage, setUrlImage] = useState("");

  useEffect(() => {
    // Get currentUser using currentId
    const ref_users = database.ref("users");
    const user = ref_users.child(currentId);

    // Just one time
    user.once("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setNom(data.Nom);
        setPrenom(data.Prenom);
        setTelephone(data.Telephone);
        setPseudo(data.Pseudo);
        setUrlImage(data.UrlImage);
      }
    }).catch((error) => {
      alert(error);
    });
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setUrlImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    
    const ref = storage.ref("images");
    const childRef = ref.child("image"+currentId);

    await childRef.put(blob);
    const url = await childRef.getDownloadURL();
    return url;
  };

  return (
    <ImageBackground
      source={require("../assets/profileBg.png")}
      style={styles.container}
    >
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.heading}>My Profile</Text>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={UrlImage ? { uri: UrlImage } : require("../assets/profileIcon.png")}
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="user" size={20} color="#aaa" style={styles.icon} />
        <TextInput
          onChangeText={(text) => setNom(text)}
          placeholder="Nom"
          style={styles.input}
          color="white"
          value={Nom}
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="user" size={20} color="#aaa" style={styles.icon} />
        <TextInput
          onChangeText={(text) => setPrenom(text)}
          placeholder="Prenom"
          style={styles.input}
          color="white"
          value={Prenom}
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="phone" size={20} color="#aaa" style={styles.icon} />
        <TextInput
          onChangeText={(text) => setTelephone(text)}
          placeholder="Telephone"
          style={styles.input}
          color="white"
          keyboardType="phone-pad"
          value={Telephone}
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="user" size={20} color="#aaa" style={styles.icon} />
        <TextInput
          onChangeText={(text) => setPseudo(text)}
          placeholder="Pseudo"
          style={styles.input}
          color="white"
          value={Pseudo}
        />
      </View>
      <TouchableOpacity onPress={async () => {
          const url = await uploadImage(UrlImage);
          const ref_users = database.ref("users");
          const user = ref_users.child(currentId);

          if (!url || Nom.length === 0 || Prenom.length === 0 || Telephone.length === 0 || Pseudo.length === 0) {
            alert("Please fill all the fields");
            return;
          }

          user.set({
            Nom,
            Prenom,
            Telephone,
            Pseudo,
            UrlImage: url,
            Id: currentId,
          }).then(() => {
            props.navigation.navigate("Accueil", {
              currentId,
            });
          }).catch((error) => {
            alert(error);
          });
        }}
        style={styles.saveButton}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#ffffff",
    alignItems: "center",
    paddingTop: 5,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white"
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "#ffffff",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#cccccc",
    paddingHorizontal: 10,
    
  },
  saveButton: {
    backgroundColor: "#0526f2",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
