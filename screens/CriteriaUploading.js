import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  FlatList,
} from "react-native";
import { Avatar, Button, Card } from "react-native-paper";

import DropDownPicker from "react-native-dropdown-picker";

const CriteriaUploading = () => {
  const [CriteriaType, setCriteriaType] = useState("");
  const [QuestionPrefix, setQuestionPrefix] = useState("");
  const [CriteriaDetail, setCriteriaDetail] = useState("");
  const [OtherInfo, setOtherInfo] = useState("");

  const data = [
    {
      id: "1",
      description: "do you smoking every day?",
    },
    {
      id: "2",
      description: "do you dancing every day?",
    },
    {
      id: "3",
      description: "are you age below 70?",
    },
    {
      id: "4",
      description: "are you age below 70?",
    },
    {
      id: "5",
      description: "are you age below 70?",
    },
  ];

  const renderList = (item) => {
    return (
      <Card style={styles.mycard} key={item.id}>
        <View style={styles.cardView}>
          <Text styl={styles.text}>{item.description}</Text>
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      {/*View of Header*/}
      <View
        style={{
          height: 140,
          backgroundColor: "#00205B",
          flexDirection: "row",
        }}
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
      <ScrollView style={{ padding: 35 }}>
        {/* View of "New Project and "Cancel Button*/}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            ...(Platform.OS !== "android" && {
              zIndex: 10,
            }),
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 35,
              color: "gray",
              marginBottom: 10,
            }}
          >
            New Project
          </Text>

          <Button
            mode="contained"
            style={{ width: 100, position: "absolute", right: 30 }}
            onPress={() => console.log("Pessed")}
          >
            Cancel
          </Button>
        </View>

        {/* Question input area*/}
        <View>
          <View
            style={{
              flexDirection: "row",
              ...(Platform.OS !== "android" && {
                zIndex: 10,
              }),
            }}
          >
            {/*First input bar*/}

            <DropDownPicker
              items={[
                {
                  label: "INCLUSION",
                  value: "INCLUSION",
                },
                {
                  label: "EXCLUSION",
                  value: "EXCLUSION",
                },
              ]}
              placeholder="Select Type"
              containerStyle={{ height: 40, width: 140, marginRight: 10 }}
              style={{ backgroundColor: "#fafafa" }}
              selectedLabelStyle={{
                color: "red",
              }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              onChangeItem={(item) => setCriteriaType(item.value)}
            />

            {/*Second input bar*/}
            <DropDownPicker
              items={[
                {
                  label: "Are you",
                  value: "Are you",
                },
                {
                  label: "Do you have",
                  value: "Do you have",
                },
                {
                  label: "Are you a",
                  value: "Are you a",
                },
                {
                  label: "Are you symptomatic with",
                  value: "Are you symptomatic with",
                },
              ]}
              containerStyle={{ height: 40, width: 350, marginRight: 10 }}
              style={{ backgroundColor: "#fafafa" }}
              selectedLabelStyle={{
                color: "#00205B",
              }}
              placeholder="Enter/Select Question Word/Phrase"
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              onChangeItem={(item) => setQuestionPrefix(item.value)}
            />

            {/*Third input bar*/}
            <DropDownPicker
              items={[
                {
                  label: "test",
                  value: "test",
                },
              ]}
              placeholder="Criteria detail"
              containerStyle={{ height: 40, width: 200, marginRight: 10 }}
              style={{ backgroundColor: "#fafafa" }}
              selectedLabelStyle={{
                color: "#00205B",
              }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              onChangeItem={(item) => setCriteriaDetail(item.value)}
            />

            {/*Fourth input bar*/}
            <DropDownPicker
              items={[
                {
                  label: "test",
                  value: "test",
                },
              ]}
              placeholder="Other Infomation"
              containerStyle={{ height: 40, width: 240, marginRight: 10 }}
              style={{ backgroundColor: "#fafafa" }}
              selectedLabelStyle={{
                color: "#00205B",
              }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              onChangeItem={(item) => setOtherInfo(item.value)}
            />
          </View>

          <View style={{ flexDirection: "row", height: 600 }}>
            <View style={{ flex: 3 }}>
              <View style={{ flex: 1 }}>
                <View style={{ height: 70 }}>
                  <Text
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 30,
                      fontSize: 20,
                      color: "#00205B",
                    }}
                  >
                    Quesion Preview:
                  </Text>
                  <Button
                    mode="contained"
                    style={{
                      width: 68,
                      top: 20,
                      position: "absolute",
                      right: 0,
                    }}
                    onPress={() => console.log("Pessed")}
                  >
                    Add
                  </Button>
                </View>

                <FlatList
                  data={data}
                  renderItem={({ item }) => {
                    return renderList(item);
                  }}
                />
              </View>
            </View>

            <View
              style={{
                flex: 1,
                padding: 20,
                marginTop: 100,
              }}
            >
              <View>
                <Text style={{ color: "gray" }}>
                  *Inclusion Criteria Question:
                </Text>
                <Text style={{ color: "gray" }}>
                  If a participant provides a negative answer("NO"), then he/she
                  will be rejected from the project
                </Text>
                <Text style={{ color: "gray" }}>
                  *Exlusion Criteria Question:
                </Text>
                <Text style={{ color: "gray" }}>
                  If a participant provides a positive answer("YES"), then
                  he/she will be rejected from the project.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <Button
        mode="contained"
        style={{ width: 100, alignSelf: "center", marginBottom: 20 }}
        onPress={() => console.log("Pessed")}
      >
        Save
      </Button>

      {/* View of Footer*/}
      <View
        style={{
          height: 70,
          backgroundColor: "#00205B",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 17, marginLeft: 10 }}>
          NSW Health website | Disclaimer | Privacy | Copyright | Accessibility
          | Site map
        </Text>
      </View>
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
  mycard: {
    margin: 5,
    padding: 8,
  },
  cardView: {
    flexDirection: "row",
    padding: 6,
  },

  text: { fontSize: 20 },

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
