/** @format */

import React, { useState, useEffect } from "react";
import { TextInputMask } from "react-native-masked-text";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  TextInput as NativeTextInput,
  Image
} from "react-native";
import axios from "axios";
import { Button, Card, TextInput } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { CheckBox } from "react-native-elements";
import { DEPLOYEDHOST, LOCALHOST } from "../routes/urlMap";
import Footer from "./Footer";
const ProjectPreview = props => {
  const [image, setImage] = useState("");
  const [ApprovalNumber, setApprovalNumber] = useState("");
  const [Governance, setGovernanceNumber] = useState("");
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Location, setLocation] = useState("");
  const [SubjectNo, setSubjectNo] = useState("");
  const [Duration, setDuration] = useState("");
  const [Date, setDate] = useState("");
  const [Question, setQuestion] = useState([]);
  const [exclusionQuesion, setExclusionQuestion] = useState([]);

  const [isPregnant, setIsPregnant] = React.useState(false);
  const [isSmoking, setIsSmoking] = React.useState(false);
  const [isLactating, setIsLactating] = React.useState(false);
  const [isPlanningPregnant, setPlanningPregnant] = React.useState(false);
  const [isHealthy, setHealthy] = React.useState(false);
  const [isEnglishFluent, setEnglishFluent] = React.useState(false);

  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  // const userId = "606d1642b2fff30342232416";
  const projectId = props.location.projectKey;
  // const userId = Local.getItem("userId");

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = () => {
    let inclusion = [];
    let exclution = [];

    axios.get(`${DEPLOYEDHOST}/api/project/${projectId}`).then(
      response => {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setImage(response.data.fileUpload);
        setApprovalNumber(response.data.approvalNumber);
        setGovernanceNumber(response.data.governance);
        setLocation(response.data.location);
        setSubjectNo(response.data.subjectNo);
        setDuration(response.data.duration);
        setDate(response.data.date);
        setIsPregnant(response.data.isPregnant);
        setHealthy(response.data.needHealth);
        setEnglishFluent(response.data.needEnglish);
        setIsSmoking(response.data.isSmoking);
        setIsLactating(response.data.isLactating);
        setPlanningPregnant(response.data.isPlanningPregnant);
        setGender(response.data.gender);
        setAge(response.data.ageGroup);

        for (let i = 0; i < response.data.InclusionCriteria.length; i++) {
          let criteria = {
            key: i,
            description: response.data.InclusionCriteria[i]
          };
          inclusion.push(criteria);
        }

        for (let i = 0; i < response.data.ExclusionCriteria.length; i++) {
          let criteria = {
            key: i,
            description: response.data.ExclusionCriteria[i]
          };
          exclution.push(criteria);
        }

        setQuestion(inclusion);
        setExclusionQuestion(exclution);
      },
      error => {
        console.log(error);
      }
    );
  };

  const renderList = Question.map(item => {
    return (
      <Card style={styles.mycard} key={item.key}>
        <View style={styles.cardView}>
          <Text styl={styles.text}>{item.description}</Text>
        </View>
      </Card>
    );
  });

  const renderExclusonList = exclusionQuesion.map(item => {
    return (
      <Card style={styles.mycard} key={item.key}>
        <View style={styles.cardView}>
          <Text styl={styles.text}>{item.description}</Text>
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
          flexDirection: "row"
        }}
      >
        <Image
          style={{ width: 200, height: 100, marginLeft: 100, marginTop: 20 }}
          source={require("../assets/header.png")}
        />

        <Button
          mode="text"
          style={{
            backgroundColor: "white",
            width: 120,
            height: 37,
            position: "absolute",
            bottom: 30,
            right: 30
          }}
          onPress={() => props.history.push("/Homepage")}
        >
          log out
        </Button>
      </View>

      {/* View of Body*/}
      <ScrollView style={{ margin: 35 }}>
        {/* View of "New Project and "Cancel Button*/}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            ...(Platform.OS !== "android" && {
              zIndex: 10
            })
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 35,
              color: "gray",
              marginBottom: 10
            }}
          >
            New Project
          </Text>

          <Button
            mode="contained"
            style={{ width: 100, position: "absolute", right: 30 }}
            onPress={() => props.history.push("/projectManagement")}
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
              alignItems: "center"
            }}
          >
            <Text style={styles.subTitle}>Project titile: </Text>
            <TextInput
              editable={false}
              mode="outlined"
              value={Title}
              style={{ width: 800, height: 30, marginLeft: 10 }}
              onChangeText={text => setTitle(text)}
            />
          </View>
          <View style={{ flex: 6, flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.subTitle}>Project description: </Text>
              <TextInput
                editable={false}
                mode="outlined"
                multiline={true}
                textAlignVertical="top"
                value={Description}
                style={{
                  height: 130,
                  marginHorizontal: 10
                }}
                render={innerProps => (
                  <NativeTextInput
                    {...innerProps}
                    style={[
                      innerProps.style,
                      {
                        paddingTop: 8,
                        paddingBottom: 8
                      }
                    ]}
                  />
                )}
                onChangeText={text => setDescription(text)}
              />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 15
                }}
              >
                <Text style={styles.subTitle}>Ethics Approval Numbe:</Text>
                <TextInput
                  editable={false}
                  mode="outlined"
                  value={ApprovalNumber}
                  style={{ flex: 1, height: 30, marginHorizontal: 10 }}
                  onChangeText={text => setApprovalNumber(text)}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 15
                }}
              >
                <Text style={styles.subTitle}>Governance Approval Number:</Text>
                <TextInput
                  editable={false}
                  mode="outlined"
                  value={Governance}
                  style={{ flex: 1, height: 30, marginHorizontal: 10 }}
                  onChangeText={text => setGovernanceNumber(text)}
                />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.subTitle}>Location: </Text>
                <TextInput
                  editable={false}
                  mode="outlined"
                  value={Location}
                  style={{
                    height: 30,
                    margin: 10,
                    flex: 1
                  }}
                  onChangeText={text => setLocation(text)}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Text style={styles.subTitle}>Number of Subjects: </Text>
                <TextInput
                  editable={false}
                  mode="outlined"
                  value={SubjectNo}
                  style={{
                    height: 30,
                    margin: 10,
                    flex: 1
                  }}
                  onChangeText={text => setSubjectNo(text)}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Text style={styles.subTitle}>Study Duration: </Text>
                <TextInput
                  editable={false}
                  mode="outlined"
                  value={Duration}
                  style={{ height: 30, margin: 10, flex: 1 }}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Text style={styles.subTitle}>Start Date: </Text>
                <TextInput
                  editable={false}
                  mode="outlined"
                  value={Date}
                  style={{
                    height: 30,
                    margin: 10,
                    flex: 1
                  }}
                />
              </View>
              <Button
                disabled={true}
                icon={image == "" ? "upload" : "check"}
                mode="contained"
                style={{ margin: 10 }}
              >
                File Upload
              </Button>
            </View>
          </View>
          <Text
            style={{
              marginTop: 20,
              fontSize: 30,
              color: "#00205B"
            }}
          >
            Criteria
          </Text>
        </View>
        <Text
          style={{
            marginTop: 20,
            fontSize: 20,
            color: "#00205B"
          }}
        >
          Basic Demographic criteria
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: "#00205B"
            }}
          >
            Allow Gender:
          </Text>
          <TextInput
            editable={false}
            mode="outlined"
            value={gender}
            style={{
              height: 30,
              margin: 10
            }}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 15,
                color: "#00205B"
              }}
            >
              Age group:
            </Text>
            <TextInput
              editable={false}
              mode="outlined"
              value={age}
              style={{
                height: 30,
                margin: 10
              }}
            />
            <CheckBox
              title="Need speek fluent english"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={isEnglishFluent}
            />
            <CheckBox
              title="Should be health"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={isHealthy}
            />
          </View>
        </View>

        <Text
          style={{
            marginTop: 20,
            fontSize: 20,
            color: "#00205B"
          }}
        >
          Exclusion Demographic criteria
        </Text>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            title="Pregnant"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={isPregnant}
          />

          <CheckBox
            title="Smoking"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={isSmoking}
          />
          <CheckBox
            title="Lactating"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={isLactating}
          />
          <CheckBox
            title="Planning on becoming pregnant"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={isPlanningPregnant}
          />
        </View>

        {/* Question input area*/}
        <View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 3 }}>
              <View style={{ flex: 1 }}>
                <View style={{ height: 70 }}>
                  <Text
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 30,
                      fontSize: 30,
                      color: "#00205B"
                    }}
                  >
                    Question Preview:
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#00205B"
                    }}
                  >
                    Inclusion Quetsions:
                  </Text>
                  <View>{renderList}</View>
                </View>

                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginTop: 30,
                      color: "#00205B"
                    }}
                  >
                    Exclusion Quetsions:
                  </Text>
                  <View>{renderExclusonList}</View>
                </View>

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
                marginTop: 100
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

      {/* View of Footer*/}
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  modalButtonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  mycard: {
    margin: 5,
    padding: 8
  },
  cardView: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6
  },
  subTitle: {
    fontSize: 20,
    color: "#00205B",
    marginLeft: 10
  },
  text: { fontSize: 20 },

  modalView: {
    // position: "absolute",
    // bottom: 1,
    // width: "100%",
    // backgroundColor: "#b8e6ff",
    flex: 1,
    justifyContent: "flex-end"
  }
});
export default ProjectPreview;
