import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  TextInput as NativeTextInput,
  Alert,
} from "react-native";
import { Button, Card, TextInput } from "react-native-paper";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";

const CriteriaUploading = () => {
  const [CriteriaType, setCriteriaType] = useState("");
  const [QuestionPrefix, setQuestionPrefix] = useState("");
  const [CriteriaDetail, setCriteriaDetail] = useState("");
  const [OtherInfo, setOtherInfo] = useState("");
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Location, setLocation] = useState("");
  const [SubjectNo, setSubjectNo] = useState("");
  const [Duration, setDuration] = useState("");
  const [Date, setDate] = useState("");
  const [Question, setQuestion] = useState([]);

  const addItem = (() => {
    let key = Question.length;
    return () => {
      Question.unshift({
        key,
        description: `${CriteriaType} - ${QuestionPrefix} ${CriteriaDetail} ${OtherInfo} ?`,
      });

      setQuestion(Question.slice(0));
      key++;
    };
  })();

  const userSignup = () => {
    axios
      .post("http://localhost:12345/api/project", {
        title: Title,
        description: Description,
        location: Location,
        subjectNo: SubjectNo,
        duration: Duration,
        date: Date,
        criteria: Question.description,
      })
      .then(
        (response) => {
          console.log(Question);
          Alert.alert("nice");
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const removeItem = (key) => {
    setQuestion(Question.slice().filter((item) => item.key !== key));
  };

  // const renderList = (item) => {
  //   return (
  //     <Card style={styles.mycard} key={item.key}>
  //       <View style={styles.cardView}>
  //         <Text styl={styles.text}>{item.description}</Text>
  //         <Card.Actions style={{ position: "absolute", right: 0 }}>
  //           <Button onPress={() => removeItem(item.key)}>Delete</Button>
  //         </Card.Actions>
  //       </View>
  //     </Card>
  //   );
  // };
  const renderList = Question.map((item) => {
    return (
      <Card style={styles.mycard} key={item.key}>
        <View style={styles.cardView}>
          <Text styl={styles.text}>{item.description}</Text>
          <Card.Actions style={{ position: "absolute", right: 0 }}>
            <Button onPress={() => removeItem(item.key)}>Delete</Button>
          </Card.Actions>
        </View>
      </Card>
    );
  });

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
      <ScrollView style={{ margin: 35 }}>
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

        {/*Project basic information upload area*/}
        <View>
          <View
            style={{
              flex: 1,
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.subTitle}>Project titile: </Text>
            <TextInput
              mode="outlined"
              value={Title}
              style={{ width: 800, height: 30, marginLeft: 10 }}
              onChangeText={(text) => setTitle(text)}
            />
          </View>
          <View style={{ flex: 6, flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.subTitle}>Project description: </Text>
              <TextInput
                mode="outlined"
                multiline={true}
                textAlignVertical="top"
                value={Description}
                style={{
                  height: 240,
                  marginHorizontal: 10,
                }}
                render={(innerProps) => (
                  <NativeTextInput
                    {...innerProps}
                    style={[
                      innerProps.style,
                      {
                        paddingTop: 8,
                        paddingBottom: 8,
                      },
                    ]}
                  />
                )}
                onChangeText={(text) => setDescription(text)}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.subTitle}>Location: </Text>
              <TextInput
                mode="outlined"
                value={Location}
                style={{ height: 30, marginHorizontal: 10, marginVertical: 3 }}
                onChangeText={(text) => setLocation(text)}
              />
              <Text style={styles.subTitle}>Number of Subjects: </Text>
              <TextInput
                mode="outlined"
                value={SubjectNo}
                style={{ height: 30, marginHorizontal: 10, marginVertical: 3 }}
                onChangeText={(text) => setSubjectNo(text)}
              />
              <Text style={styles.subTitle}>Study Duration: </Text>
              <TextInput
                mode="outlined"
                value={Duration}
                style={{ height: 30, marginHorizontal: 10, marginVertical: 3 }}
                onChangeText={(text) => setDuration(text)}
              />
              <Text style={styles.subTitle}>Start Date: </Text>
              <TextInput
                mode="outlined"
                value={Date}
                style={{ height: 30, marginHorizontal: 10, marginVertical: 3 }}
                onChangeText={(text) => setDate(text)}
              />
            </View>
            <View style={{ flex: 0.6 }}></View>
          </View>
          <Text
            style={{
              marginTop: 20,

              fontSize: 20,
              color: "#00205B",
            }}
          >
            Criteria
          </Text>
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
              containerStyle={{
                height: 40,
                width: 140,
                marginRight: 10,
                marginTop: 8,
              }}
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
              containerStyle={{
                height: 40,
                width: 350,
                marginTop: 8,
                marginRight: 10,
              }}
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

            <TextInput
              mode="outlined"
              value={CriteriaDetail}
              placeholder="Criteria detail"
              style={{ height: 40, width: 200, marginRight: 10, paddingTop: 0 }}
              onChangeText={(text) => setCriteriaDetail(text)}
            />

            <TextInput
              mode="outlined"
              value={OtherInfo}
              placeholder="Other Infomation"
              style={{ height: 40, width: 200, marginRight: 10 }}
              onChangeText={(text) => setOtherInfo(text)}
            />
          </View>

          <View style={{ flexDirection: "row" }}>
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
                    Question Preview:
                  </Text>
                  <Button
                    mode="contained"
                    style={{
                      width: 68,
                      top: 20,
                      position: "absolute",
                      right: 0,
                    }}
                    onPress={() => addItem()}
                  >
                    Add
                  </Button>
                </View>
                <View>{renderList}</View>

                {/* <FlatList
                  data={Question}
                  renderItem={({ item }) => {
                    return renderList(item);
                  }}
                  keyExtractor={(item, index) => index.toString()}
                /> */}
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
        onPress={() => userSignup()}
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
    alignItems: "center",
    padding: 6,
  },
  subTitle: {
    fontSize: 20,
    color: "#00205B",
    marginLeft: 10,
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
