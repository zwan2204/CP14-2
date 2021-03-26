import React, { useState } from "react";
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  Platform,
} from "react-native";
import { Button } from "react-native-paper";
const CriteriaUploading = () => {
  const [Name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [picture, setPicture] = useState("");
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState(null);

  return (
    <SafeAreaView style={styles.root}>
      {/*View of Header*/}
      <View
        style={{ flex: 1, backgroundColor: "#00205B", flexDirection: "row" }}
      >
        <View style={{ flex: 1, backgroundColor: "tomato" }} />
        <View style={{ flex: 3, backgroundColor: "#00205B" }} />

        <View
          style={{
            flex: 1,
            backgroundColor: "#00205B",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            mode="text"
            style={{ backgroundColor: "white", width: 120, marginBottom: 30 }}
            onPress={() => console.log("Pessed")}
          >
            log out
          </Button>
        </View>
      </View>

      {/* View of Body*/}
      <View style={{ flex: 4 }}></View>

      {/* View of Footer*/}
      <View style={{ flex: 0.5, backgroundColor: "#00205B" }}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  modalButtonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  modalView: {
    // position: "absolute",
    // bottom: 1,
    // width: "100%",
    // backgroundColor: "#b8e6ff",
    flex: 1,
    justifyContent: "flex-end",
  },
});
export default CriteriaUploading;
