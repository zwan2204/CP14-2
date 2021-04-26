import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { TextInputMask } from "react-native-masked-text";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  TextInput as NativeTextInput,
  Image,
} from "react-native";
import moment, { max } from "moment";
import { Button, Card, TextInput } from "react-native-paper";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import * as DocumentPicker from "expo-document-picker";
import { CheckBox } from "react-native-elements";
import uuid from "react-native-uuid";
const ProjectUploading = (props) => {
  const [image, setImage] = useState("");
  const [workerChecked, setWorkerChecked] = React.useState(false);
  const [generalChecked, setGeneralChecked] = React.useState(false);
  const [ApprovalNumber, setApprovalNumber] = useState("");
  const [Governance, setGovernanceNumber] = useState("");
  const [CriteriaType, setCriteriaType] = useState("");
  const [QuestionPrefix, setQuestionPrefix] = useState("");
  const [CriteriaDetail, setCriteriaDetail] = useState("");
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Location, setLocation] = useState("");
  const [SubjectNo, setSubjectNo] = useState("");
  const [Duration, setDuration] = useState("");
  const [Date, setDate] = useState("");
  const [Question, setQuestion] = useState([]);
  const [exclusionQuesion, setExclusionQuestion] = useState([]);
  const [questionBank, setQuestionBank] = useState([]);

  const [isPragnent, setIsPragnent] = React.useState(false);
  const [isSmoking, setIsSmoking] = React.useState(false);
  const [isLactating, setIsLactating] = React.useState(false);
  const [isPlaningPragnent, setPlaningPragnent] = React.useState(false);
  const [gender, setGender] = useState("");
  const [minAge, setMinAge] = useState("null");
  const [maxAge, setMaxAge] = useState("null");
  const userId = localStorage.getItem("userId");
  // const userId = "606d1642b2fff30342232416";
  const projectId = props.location.projectKey;
  // const userId = Local.getItem("userId");

  const editPage = () => {
    if (projectId) {
      const ediInfo = JSON.parse(localStorage.getItem(projectId));
      setApprovalNumber(ediInfo.approvalNumber);
      setGovernanceNumber(ediInfo.governance);
      setTitle(ediInfo.title);
      setDescription(ediInfo.description);
      setLocation(ediInfo.location);
      setSubjectNo(ediInfo.subjectNo);
      setDuration(ediInfo.duration);
      setDate(ediInfo.date);
      setQuestion(ediInfo.InclusionCriteria);
      setExclusionQuestion(ediInfo.ExclusionCriteria);
      setIsPragnent(ediInfo.isPragnent);
      setIsSmoking(ediInfo.isSmoking);
      setIsLactating(ediInfo.isLactating);
      setPlaningPragnent(ediInfo.isPlaningPragnent);
      setGender(ediInfo.gender);
      setMinAge(ediInfo.ageGroup.split(",")[0]);
      setMaxAge(ediInfo.ageGroup.split(",")[1]);
    }
  };
  const pickImage = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    if (result.type == "success") {
      let newfile = {
        uri: result.uri,
        type: `test/${result.name.split(".")[1]}`,
        name: `test.${result.name.split(".")[1]}`,
      };

      handleUpload(newfile);
    }
  };

  useEffect(() => {
    getQuestion();
    editPage();
  }, []);

  const storeData = async () => {
    const currentDate = moment().format("DD/MM/YY");
    let documentId = "";
    if (projectId) {
      documentId = projectId.split(",")[1];
    } else {
      documentId = uuid.v4();
    }

    const data = {
      title: Title,
      description: Description,
      location: Location,
      subjectNo: SubjectNo,
      duration: Duration,
      createdDate: currentDate,
      date: Date,
      InclusionCriteria: Question,
      ExclusionCriteria: exclusionQuesion,
      approvalNumber: ApprovalNumber,
      governance: Governance,
      fileUpload: image,
      isPragnent: isPragnent,
      isSmoking: isSmoking,
      isLactating: isLactating,
      isPlaningPragnent: isPlaningPragnent,
      gender: gender,
      ageGroup: `${minAge},${maxAge}`,
    };

    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(`${userId},${documentId}`, jsonValue);
      props.history.push("/projectManagement");
    } catch (e) {}
  };

  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "employeeapp");
    data.append("cloud_name", "dzjg12m3b");

    fetch("https://api.cloudinary.com/v1_1/dzjg12m3b/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setImage(data.url);
      })
      .catch((err) => {
        console.log("upload false");
      });
  };

  const addItem = (() => {
    if (CriteriaType == "INCLUSION") {
      let key = Question.length;
      if (Question.length != 0) {
        key = Question[Question.length - 1].key + 1;
      }

      let type = "";
      if (workerChecked) {
        type = "Worker Need";
      } else if (generalChecked) {
        type = "General";
      }
      return () => {
        Question.push({
          key,
          description: `${type} - ${QuestionPrefix} ${CriteriaDetail} ?`,
        });

        setQuestion(Question.slice(0));
        key++;
      };
    } else if (CriteriaType == "EXCLUSION") {
      let type = "";
      if (workerChecked) {
        type = "Worker Need";
      } else if (generalChecked) {
        type = "General";
      }
      let key = exclusionQuesion.length;
      if (exclusionQuesion.length != 0) {
        key = exclusionQuesion[exclusionQuesion.length - 1].key + 1;
      }
      return () => {
        exclusionQuesion.push({
          key,
          description: `${type} - ${QuestionPrefix} ${CriteriaDetail} ?`,
        });

        setExclusionQuestion(exclusionQuesion.slice(0));
        key++;
      };
    } else {
      return () => {};
    }
  })();

  const projectUpload = () => {
    const currentDate = moment().format("DD/MM/YY");
    let tmpQuestion = [];

    for (let i = 0; i < Question.length; i++) {
      tmpQuestion.push(Question[i].description);
    }

    let tmpExclusionQuestion = [];

    for (let i = 0; i < exclusionQuesion.length; i++) {
      tmpExclusionQuestion.push(exclusionQuesion[i].description);
    }
    axios
      .post("http://localhost:12345/api/project", {
        userId: userId,
        title: Title,
        description: Description,
        location: Location,
        subjectNo: SubjectNo,
        duration: Duration,
        createdDate: currentDate,
        date: Date,
        state: "New Upload",
        governance: Governance,
        InclusionCriteria: tmpQuestion,
        ExclusionCriteria: tmpExclusionQuestion,
        approvalNumber: ApprovalNumber,
        fileUpload: image,
        isPragnent: isPragnent,
        isSmoking: isSmoking,
        isLactating: isLactating,
        isPlaningPragnent: isPlaningPragnent,
        gender: gender,
        ageGroup: `${minAge},${maxAge}`,
      })
      .then(
        (response) => {
          props.history.push("/projectManagement");
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const getQuestion = () => {
    let questions = [];
    axios.get("http://localhost:12345/api/question").then(
      (response) => {
        for (let i = 0; i < Object.keys(response.data).length; i++) {
          let question = {
            label: response.data[i].name,
            value: response.data[i].name,
          };
          questions.push(question);
        }

        setQuestionBank(questions);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const removeItem = (key) => {
    setQuestion(Question.slice().filter((item) => item.key !== key));
  };

  const removeExclusion = (key) => {
    setExclusionQuestion(
      exclusionQuesion.slice().filter((item) => item.key !== key)
    );
  };

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

  const renderExclusonList = exclusionQuesion.map((item) => {
    return (
      <Card style={styles.mycard} key={item.key}>
        <View style={styles.cardView}>
          <Text styl={styles.text}>{item.description}</Text>
          <Card.Actions style={{ position: "absolute", right: 0 }}>
            <Button onPress={() => removeExclusion(item.key)}>Delete</Button>
          </Card.Actions>
        </View>
      </Card>
    );
  });

  const workerCheck = () => {
    if (generalChecked) {
      setGeneralChecked(!generalChecked);
      setWorkerChecked(!workerChecked);
    } else {
      setWorkerChecked(!workerChecked);
    }
  };

  const generalCheck = () => {
    if (workerChecked) {
      setGeneralChecked(!generalChecked);
      setWorkerChecked(!workerChecked);
    } else {
      setGeneralChecked(!generalChecked);
    }
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
            right: 30,
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
                  height: 130,
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

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 15,
                }}
              >
                <Text style={styles.subTitle}>Ethics Approval Numbe:</Text>
                <TextInput
                  mode="outlined"
                  value={ApprovalNumber}
                  style={{ flex: 1, height: 30, marginHorizontal: 10 }}
                  onChangeText={(text) => setApprovalNumber(text)}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 15,
                }}
              >
                <Text style={styles.subTitle}>Governance Approval Number:</Text>
                <TextInput
                  mode="outlined"
                  value={Governance}
                  style={{ flex: 1, height: 30, marginHorizontal: 10 }}
                  onChangeText={(text) => setGovernanceNumber(text)}
                />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.subTitle}>Location: </Text>
                <TextInput
                  mode="outlined"
                  value={Location}
                  style={{
                    height: 30,
                    margin: 10,
                    flex: 1,
                  }}
                  onChangeText={(text) => setLocation(text)}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={styles.subTitle}>Number of Subjects: </Text>
                <TextInput
                  mode="outlined"
                  value={SubjectNo}
                  style={{
                    height: 30,
                    margin: 10,
                    flex: 1,
                  }}
                  onChangeText={(text) => setSubjectNo(text)}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={styles.subTitle}>Study Duration: </Text>
                <TextInput
                  mode="outlined"
                  value={Duration}
                  style={{ height: 30, margin: 10, flex: 1 }}
                  onChangeText={(text) => setDuration(text)}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={styles.subTitle}>Start Date: </Text>
                <TextInput
                  mode="outlined"
                  value={Date}
                  style={{
                    height: 30,
                    margin: 10,
                    flex: 1,
                  }}
                  onChangeText={(text) => setDate(text)}
                />
              </View>
              <Button
                icon={image == "" ? "upload" : "check"}
                mode="contained"
                style={{ margin: 10 }}
                onPress={() => pickImage()}
              >
                File Upload
              </Button>
            </View>
          </View>
          <Text
            style={{
              marginTop: 20,
              fontSize: 30,
              color: "#00205B",
            }}
          >
            Criteria
          </Text>
        </View>
        <Text
          style={{
            marginTop: 20,
            fontSize: 20,
            color: "#00205B",
          }}
        >
          Basic Demographic criteria
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            ...(Platform.OS !== "android" && {
              zIndex: 10,
            }),
          }}
        >
          <DropDownPicker
            items={[
              {
                label: "Male",
                value: "Male",
              },
              {
                label: "Female",
                value: "Female",
              },
              {
                label: "Not required",
                value: "Not required",
              },
            ]}
            defaultValue={gender == "" ? null : gender}
            containerStyle={{
              height: 40,
              width: 300,
              marginTop: 8,
              marginRight: 10,
            }}
            selectedLabelStyle={{
              color: "#00205B",
            }}
            placeholder="Select allow gender"
            itemStyle={{
              justifyContent: "flex-start",
            }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            onChangeItem={(item) => setGender(item.value)}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 15,
                color: "#00205B",
              }}
            >
              Minimum age:
            </Text>
            <TextInputMask
              type={"custom"}
              options={{
                mask: "99",
              }}
              style={{
                borderWidth: 1,
                height: 37,
                width: 40,
                borderColor: "gray",
                marginLeft: 10,
                padding: 5,
                borderRadius: 3,
              }}
              // dont forget to set the "value" and "onChangeText" props
              value={minAge == "null" ? "" : minAge}
              onChangeText={(text) => {
                text == "" ? setMinAge("null") : setMinAge(text);
              }}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 15,
                color: "#00205B",
                marginLeft: 10,
              }}
            >
              Maximum age:
            </Text>
            <TextInputMask
              type={"custom"}
              options={{
                mask: "99",
              }}
              style={{
                borderWidth: 1,
                height: 37,
                width: 40,
                borderColor: "gray",
                marginLeft: 10,
                padding: 5,
                borderRadius: 3,
              }}
              // dont forget to set the "value" and "onChangeText" props
              value={maxAge == "null" ? "" : maxAge}
              onChangeText={(text) => {
                text == "" ? setMaxAge("null") : setMaxAge(text);
              }}
            />
          </View>
        </View>

        <Text
          style={{
            marginTop: 20,
            fontSize: 20,
            color: "#00205B",
          }}
        >
          Exclusion Demographic criteria
        </Text>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            title="Pragnent
              "
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={isPragnent}
            onPress={() => {
              setIsPragnent(!isPragnent);
            }}
          />

          <CheckBox
            title="Smoking"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={isSmoking}
            onPress={() => {
              setIsSmoking(!isSmoking);
            }}
          />
          <CheckBox
            title="Lactating"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={isLactating}
            onPress={() => {
              setIsLactating(!isLactating);
            }}
          />
          <CheckBox
            title="Planning on becoming pargnent"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={isPlaningPragnent}
            onPress={() => {
              setPlaningPragnent(!isPlaningPragnent);
            }}
          />
        </View>

        <Text
          style={{
            marginTop: 20,
            fontSize: 20,
            color: "#00205B",
          }}
        >
          General and specific criteria
        </Text>
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
                width: 300,
                marginTop: 8,
                marginRight: 10,
              }}
              selectedLabelStyle={{
                color: "#00205B",
              }}
              placeholder="Select Question prefix"
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              onChangeItem={(item) => setQuestionPrefix(item.value)}
            />

            <DropDownPicker
              items={questionBank}
              searchable={true}
              searchablePlaceholder="Search for an item"
              searchablePlaceholderTextColor="gray"
              searchableError={() => <Text>Not Found</Text>}
              placeholder=""
              containerStyle={{
                height: 40,
                width: 40,
                marginTop: 8,
              }}
              defaultValue=""
              itemStyle={{
                justifyContent: "flex-start",
              }}
              selectedLabelStyle={{
                display: "none",
              }}
              dropDownStyle={{ width: 340 }}
              dropDownMaxHeight={300}
              onChangeItem={(item) => setCriteriaDetail(item.value)}
            />
            <TextInput
              mode="outlined"
              value={CriteriaDetail}
              placeholder="Criteria detail"
              style={{ height: 37, width: 300, marginRight: 10, paddingTop: 3 }}
              onChangeText={(text) => setCriteriaDetail(text)}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              marginVertical: 20,
            }}
          >
            <CheckBox
              title="This question requires a healthcare worker to answer it
              "
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={workerChecked}
              onPress={() => {
                workerCheck();
              }}
            />

            <CheckBox
              title="This question is a general question"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={generalChecked}
              onPress={() => {
                generalCheck();
              }}
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
                      fontSize: 30,
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
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#00205B",
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
                      color: "#00205B",
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
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Button
          mode="contained"
          style={{ width: 150, alignSelf: "center", margin: 20 }}
          onPress={() => storeData()}
        >
          Save Draft
        </Button>
        <Button
          mode="contained"
          style={{ width: 100, alignSelf: "center", margin: 20 }}
          onPress={() => {
            projectUpload();
          }}
        >
          Create
        </Button>
      </View>

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
export default ProjectUploading;
