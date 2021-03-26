import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

import DropDownPicker from "react-native-dropdown-picker";

const CriteriaUploading = () => {
  const [CriteriaType, setCriteriaType] = useState("");
  const [QuestionPrefix, setQuestionPrefix] = useState("");
  const [CriteriaDetail, setCriteriaDetail] = useState("");
  const [OtherInfo, setOtherInfo] = useState("");
  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
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
      <ScrollView style={{ flex: 4, padding: 35 }}>
        {/* View of "New Project and "Cancel Button*/}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 1 }}>
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
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Button
              mode="contained"
              style={{ width: 100 }}
              onPress={() => console.log("Pessed")}
            >
              Cancel
            </Button>
          </View>
        </View>

        {/* Question input area*/}
        <View style={{ flex: 10 }}>
          <View style={{ flexDirection: "row" }}>
            {/*First input bar*/}

            <View>
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
            </View>

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

          {/* <View style={{ flexDirection: "row", flex: 1 }}>
            <View style={{ flex: 3 }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "30%",
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
                    top: "20%",
                    position: "absolute",
                    right: 0,
                  }}
                  onPress={() => console.log("Pessed")}
                >
                  Add
                </Button>
              </View>
              <View style={{ flex: 8 }}>
                <Card>
                  <Card.Title
                    title="Card Title"
                    subtitle="Card Subtitle"
                    left={LeftContent}
                  />
                  <Card.Content>
                    <Title>Card title</Title>
                    <Paragraph>Card content</Paragraph>
                  </Card.Content>
                  <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
                  <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                  </Card.Actions>
                </Card>
              </View>
            </View>

            <View style={{ flex: 1, padding: 20, marginTop: 100 }}>
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
          </View> */}
        </View>
      </ScrollView>

      {/* View of Footer*/}
      <View style={{ height: 70, backgroundColor: "#00205B" }}></View>
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
