import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import firebase from "../../Config";

const database = firebase.database();

const SenderItem = ({ item, onClick }) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <View
        style={{ marginVertical: 5, marginRight: 10, alignSelf: "flex-end" }}
      >
        <View
          style={{
            flexDirection: "row-reverse",
            alignItems: "center",
            maxWidth: "80%",
            backgroundColor: "rgba(0, 123, 255, 0.5)",
            borderRadius: 20,
            padding: 10,
          }}
        >
          <Image
            source={{ uri: item.UrlImage }}
            style={{ width: 30, height: 30, borderRadius: 15, marginLeft: 10 }}
          />
          <Text style={{ color: "white", fontSize: 16 }}>{item.Message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ReceiverItem = ({ item, onClick }) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <View
        style={{ marginVertical: 5, marginLeft: 10, alignSelf: "flex-start" }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            maxWidth: "80%",
            backgroundColor: "rgba(240, 240, 240, 0.4)",
            borderRadius: 20,
            padding: 10,
          }}
        >
          <Image
            source={{ uri: item.UrlImage }}
            style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }}
          />
          <Text style={{ color: "black", fontSize: 16 }}>{item.Message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Item = ({ item, currentid }) => {
  const [isSenderClicked, setIsSenderClicked] = useState(false);
  const [isReceiverClicked, setIsReceiverClicked] = useState(false);

  useEffect(() => {
    const fetchSenderImage = async () => {
      const senderId = item.Sender;
      const ref_users = database.ref("users");
      const snapshot = await ref_users.child(senderId).once("value");
      const data = snapshot.val();
      if (data) {
        item.UrlImage = data.UrlImage;
      }
    };

    fetchSenderImage();
  }, []);

  const handleClickSender = () => {
    setIsSenderClicked(!isSenderClicked);
  };

  const handleClickReceiver = () => {
    setIsReceiverClicked(!isReceiverClicked);
  };

  return (
    <>
      {item.Sender === currentid ? (
        <SenderItem item={item} onClick={handleClickSender} />
      ) : (
        <ReceiverItem item={item} onClick={handleClickReceiver} />
      )}
      {isSenderClicked && (
        <View
          style={{ marginVertical: 5, marginRight: 10, alignSelf: "flex-end" }}
        >
          <Text style={{ alignSelf: "flex-end", color: "white", fontSize: 12 }}>
            {item.Time}
          </Text>
        </View>
      )}
      {isReceiverClicked && (
        <View
          style={{ marginVertical: 5, marginLeft: 10, alignSelf: "flex-start" }}
        >
          <Text
            style={{ alignSelf: "flex-start", color: "#000", fontSize: 12 }}
          >
            {item.Time}
          </Text>
        </View>
      )}
    </>
  );
};

export default Item;
