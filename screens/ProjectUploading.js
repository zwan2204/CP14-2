/** @format */

import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DEPLOYEDHOST, LOCALHOST } from "../routes/urlMap";
import { TextInputMask } from "react-native-masked-text";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput as NativeTextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import moment, { max } from "moment";
import {
  Button,
  Card,
  TextInput,
  Paragraph,
  Dialog,
  Portal,
} from "react-native-paper";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import * as DocumentPicker from "expo-document-picker";
import { CheckBox } from "react-native-elements";
import uuid from "react-native-uuid";
import Footer from "./Footer";
const ProjectUploading = (props) => {
  const [file, setFile] = useState("");
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

  const [isPregnant, setIsPregnant] = React.useState(false);
  const [isSmoking, setIsSmoking] = React.useState(false);
  const [isLactating, setIsLactating] = React.useState(false);
  const [isPlanningPregnant, setPlanningPregnant] = React.useState(false);
  const [isHealthy, setHealthy] = React.useState(false);
  const [isEnglishFluent, setEnglishFluent] = React.useState(false);

  const [questionPreview, setQuestionPreview] = useState("");
  const [gender, setGender] = useState("Not required");
  const [minAge, setMinAge] = useState("null");
  const [maxAge, setMaxAge] = useState("null");

  const [comment, setComment] = useState({});
  const [commentDisplay, setCommentDisplay] = useState("");
  const [commentDisplayArea, setCommentDisplayArea] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [age, setAge] = useState("");
  const userId = localStorage.getItem("userId");

  {
    /*This file contains 4 status, 1. user wants to create a new project -> these three
      variables are all empty. 2. user wants to edit a local project draft -> projectId will be assigned
      a concrete value, others will be empty. 3. user wants to edit a pending project -> pendingProjectId 
    will be assigned a value and others remain empty. 4. user wants to check an released project -> previewProjectId
  will be assigned a value and others remain empty
  Check ProjectManagement.js file to see how the different page transfer data.
*/
  }
  const projectId = props.location.projectKey;
  const pendingProjectId = props.location.pendingProjectKey;
  const previewProjectId = props.location.previewProjectKey;

  //popup comment dialog window
  const showDialog = () => setVisible(true);

  //hide comment dialog window
  const hideDialog = () => setVisible(false);

  const loadComment = () => {
    if (pendingProjectId) {
      axios.get(`${DEPLOYEDHOST}/api/comment/?pId=${pendingProjectId}`).then(
        (response) => {
          if (response.data.length > 0) {
            setComment({
              commentId: response.data[0]._id,
              title: response.data[0].title,
              subjectNo: response.data[0].subjectNo,
              location: response.data[0].location,
              duration: response.data[0].duration,
              description: response.data[0].description,
              approvalNumber: response.data[0].approvalNumber,
              governance: response.data[0].governance,
              date: response.data[0].date,
              inclusion: response.data[0].inclusion,
              exclusion: response.data[0].exclusion,
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  const deleteComment = (commentId) => {
    axios.delete(`${DEPLOYEDHOST}/api/comment/${commentId}`).then(
      (response) => {},
      (error) => {
        console.log(error);
      }
    );
  };

  {
    /*   load project information, it will only do actual work if pendingProjectId is not null,
  it means only the status on pending eidt, the data will be loaded.*/
  }
  const pendingPage = () => {
    let inclusion = [];
    let exclution = [];
    if (pendingProjectId) {
      axios.get(`${DEPLOYEDHOST}/api/project/${pendingProjectId}`).then(
        (response) => {
          setTitle(response.data.title);
          setDescription(response.data.description);
          setFile(response.data.fileUpload);
          setApprovalNumber(response.data.approvalNumber);
          setGovernanceNumber(response.data.governance);
          setLocation(response.data.location);
          setSubjectNo(response.data.subjectNo);
          setDuration(response.data.duration);
          setDate(response.data.date);
          setIsPregnant(response.data.isPregnant);
          setIsSmoking(response.data.isSmoking);
          setIsLactating(response.data.isLactating);
          setPlanningPregnant(response.data.isPlanningPregnant);
          setHealthy(response.data.needHealth);
          setEnglishFluent(response.data.needEnglish);
          setGender(response.data.gender);
          setMinAge(response.data.ageGroup.split(",")[0]);
          setMaxAge(response.data.ageGroup.split(",")[1]);

          for (let i = 0; i < response.data.InclusionCriteria.length; i++) {
            let criteria = {
              key: i,
              description: response.data.InclusionCriteria[i],
            };
            inclusion.push(criteria);
          }

          for (let i = 0; i < response.data.ExclusionCriteria.length; i++) {
            let criteria = {
              key: i,
              description: response.data.ExclusionCriteria[i],
            };
            exclution.push(criteria);
          }

          setQuestion(inclusion);
          setExclusionQuestion(exclution);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  {
    /*   load project information, it will only do actual work if previewProjectId is not null,
  it means only the status on preview checking, the data will be loaded.*/
  }
  const getPreviewProjects = () => {
    if (previewProjectId) {
      let inclusion = [];
      let exclution = [];

      axios.get(`${DEPLOYEDHOST}/api/project/${previewProjectId}`).then(
        (response) => {
          setTitle(response.data.title);
          setDescription(response.data.description);
          setFile(response.data.fileUpload);
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
              description: response.data.InclusionCriteria[i],
            };
            inclusion.push(criteria);
          }

          for (let i = 0; i < response.data.ExclusionCriteria.length; i++) {
            let criteria = {
              key: i,
              description: response.data.ExclusionCriteria[i],
            };
            exclution.push(criteria);
          }

          setQuestion(inclusion);
          setExclusionQuestion(exclution);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  {
    /*   load project information, it will only do actual work if projectId is not null,
  it means only the status on draft editing, the data will be loaded.*/
  }
  const draftProjectLoading = () => {
    if (projectId) {
      const ediInfo = JSON.parse(localStorage.getItem(projectId));
      setApprovalNumber(ediInfo.approvalNumber);
      setGovernanceNumber(ediInfo.governance);
      setTitle(ediInfo.title);
      setDescription(ediInfo.description);
      setLocation(ediInfo.location);
      setSubjectNo(ediInfo.subjectNo);
      setHealthy(ediInfo.isHealthy);
      setEnglishFluent(ediInfo.isEnglishFluent);
      setFile(ediInfo.fileUpload);
      setDuration(ediInfo.duration);
      setDate(ediInfo.date);
      setQuestion(ediInfo.InclusionCriteria);
      setExclusionQuestion(ediInfo.ExclusionCriteria);
      setIsPregnant(ediInfo.isPregnant);
      setIsSmoking(ediInfo.isSmoking);
      setIsLactating(ediInfo.isLactating);
      setPlanningPregnant(ediInfo.isPlanningPregnant);
      setGender(ediInfo.gender);
      setMinAge(ediInfo.ageGroup.split(",")[0]);
      setMaxAge(ediInfo.ageGroup.split(",")[1]);
    }
  };

  //delete local storage saving for draft project
  const deleteIncomplete = async (id) => {
    if (projectId) {
      try {
        await AsyncStorage.removeItem(id);
        getLocalStorage();
      } catch (e) {}
    }
  };

  //can select a pdf file and post to node.js backend in a base64 type.
  const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    if (result.type == "success") {
      let newfile = {
        uri: result.uri,
      };

      axios
        .post(`${DEPLOYEDHOST}/upload`, {
          uri: JSON.parse(JSON.stringify(newfile)),
        })
        .then(
          (response) => {
            setFile(response.data.Location);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };

  //before the page rendering, methods ni useEffect will be running in advance
  useEffect(() => {
    getQuestion();
    draftProjectLoading();
    pendingPage();
    loadComment();
    getPreviewProjects();
  }, []);

  //store project information in local storage for saving draft
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
      fileUpload: file,
      isPregnant: isPregnant,
      isHealthy: isHealthy,
      isEnglishFluent: isEnglishFluent,
      isSmoking: isSmoking,
      isLactating: isLactating,
      isPlanningPregnant: isPlanningPregnant,
      gender: gender,
      ageGroup: `${minAge},${maxAge}`,
    };

    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(`${userId},${documentId}`, jsonValue);
      props.history.push("/projectManagement");
    } catch (e) {}
  };

  //Add question in question
  const addQuestion = (() => {
    if (CriteriaType == "INCLUSION") {
      let key = Question.length;
      if (Question.length != 0) {
        key = Question[Question.length - 1].key + 1;
      }

      let type = "Specific";
      if (workerChecked) {
        type = "Worker Need";
      } else if (generalChecked) {
        type = "General";
      }
      return () => {
        Question.push({
          key,
          description: `${type} - ${QuestionPrefix} ${CriteriaDetail}`,
        });

        setQuestion(Question.slice(0));
        key++;
        setCriteriaDetail("");
        setQuestionPreview("");
      };
    } else if (CriteriaType == "EXCLUSION") {
      let type = "Specific";
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
          description: `${type} - ${QuestionPrefix} ${CriteriaDetail}`,
        });

        setExclusionQuestion(exclusionQuesion.slice(0));
        key++;
        setCriteriaDetail("");
        setQuestionPreview("");
      };
    } else {
      return () => {};
    }
  })();

  //upload project
  const projectUpload = () => {
    const currentDate = moment().format("DD/MM/YY");
    let tmpQuestion = [];
    let workerNeed = false;

    for (let i = 0; i < Question.length; i++) {
      if (Question[i].description.split("-")[0] == "Worker Need ") {
        workerNeed = true;
      }
      tmpQuestion.push(Question[i].description);
    }

    let tmpExclusionQuestion = [];

    for (let i = 0; i < exclusionQuesion.length; i++) {
      if (exclusionQuesion[i].description.split("-")[0] == "Worker Need ") {
        workerNeed = true;
      }
      tmpExclusionQuestion.push(exclusionQuesion[i].description);
    }

    axios
      .post(`${DEPLOYEDHOST}/api/project`, {
        userId: userId,
        title: Title,
        description: Description,
        location: Location,
        subjectNo: SubjectNo,
        duration: Duration,
        createdDate: currentDate,
        date: Date,
        needHealth: isHealthy,
        needEnglish: isEnglishFluent,
        workerNeed: workerNeed,
        state: "New Upload",
        governance: Governance,
        InclusionCriteria: tmpQuestion,
        ExclusionCriteria: tmpExclusionQuestion,
        approvalNumber: ApprovalNumber,
        fileUpload: file,
        isPregnant: isPregnant,
        isSmoking: isSmoking,
        isLactating: isLactating,
        isPlanningPregnant: isPlanningPregnant,
        gender: gender,
        ageGroup: `${minAge},${maxAge}`,
      })
      .then(
        (response) => {
          props.history.push("/projectManagement");
        },
        (error) => {
          console.log(error);
        }
      );
  };

  //update project used for pending editing
  const projectUpdate = () => {
    const currentDate = moment().format("DD/MM/YY");
    let tmpQuestion = [];
    let workerNeed = false;

    for (let i = 0; i < Question.length; i++) {
      if (Question[i].description.split("-")[0] == "Worker Need ") {
        workerNeed = true;
      }
      tmpQuestion.push(Question[i].description);
    }

    let tmpExclusionQuestion = [];

    for (let i = 0; i < exclusionQuesion.length; i++) {
      if (exclusionQuesion[i].description.split("-")[0] == "Worker Need ") {
        workerNeed = true;
      }
      tmpExclusionQuestion.push(exclusionQuesion[i].description);
    }

    axios
      .put(`${DEPLOYEDHOST}/api/project/all/${pendingProjectId}`, {
        title: Title,
        description: Description,
        location: Location,
        subjectNo: SubjectNo,
        duration: Duration,
        createdDate: currentDate,
        date: Date,
        needHealth: isHealthy,
        needEnglish: isEnglishFluent,
        workerNeed: workerNeed,
        state: "New Upload",
        governance: Governance,
        InclusionCriteria: tmpQuestion,
        ExclusionCriteria: tmpExclusionQuestion,
        approvalNumber: ApprovalNumber,
        fileUpload: file,
        isPregnant: isPregnant,
        isSmoking: isSmoking,
        isLactating: isLactating,
        isPlanningPregnant: isPlanningPregnant,
        gender: gender,
        ageGroup: `${minAge},${maxAge}`,
      })
      .then(
        (response) => {
          deleteComment(comment.commentId);
          props.history.push("/projectManagement");
        },
        (error) => {
          console.log(error);
        }
      );
  };

  //get all question previously uploaded for question bank
  const getQuestion = () => {
    let questions = [];
    axios.get(`${DEPLOYEDHOST}/api/question`).then(
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

  //remove a question in question preview
  const removeItem = (key) => {
    setQuestion(Question.slice().filter((item) => item.key !== key));
  };

  //remove a question in question preview
  const removeExclusion = (key) => {
    setExclusionQuestion(
      exclusionQuesion.slice().filter((item) => item.key !== key)
    );
  };

  //a card type list use to display added inclusion question in question preview
  const renderList = Question.map((item) => {
    return (
      <Card style={styles.mycard} key={item.key}>
        <View style={styles.cardView}>
          <Text style={{ width: "75%" }}>{item.description}</Text>
          <Card.Actions style={{ position: "absolute", right: 0 }}>
            <Button
              style={{ display: previewProjectId ? "none" : "flex" }}
              onPress={() => removeItem(item.key)}
            >
              Delete
            </Button>
          </Card.Actions>
        </View>
      </Card>
    );
  });

  //a card type list use to display added exclusion question in question preview
  const renderExclusonList = exclusionQuesion.map((item) => {
    return (
      <Card style={styles.mycard} key={item.key}>
        <View style={styles.cardView}>
          <Text style={{ width: "75%" }}>{item.description}</Text>
          <Card.Actions style={{ position: "absolute", right: 0 }}>
            <Button
              style={{ display: previewProjectId ? "none" : "flex" }}
              onPress={() => removeExclusion(item.key)}
            >
              Delete
            </Button>
          </Card.Actions>
        </View>
      </Card>
    );
  });

  //handle boolean type of radio button for "This question requires a healthcare worker to answer it"
  const workerCheck = () => {
    if (generalChecked) {
      setGeneralChecked(!generalChecked);
      setWorkerChecked(!workerChecked);
    } else {
      setWorkerChecked(!workerChecked);
    }
  };

  //handle boolean type of radio button for "This question is a general question
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
        <Text style={{ color: "red", position: "absolute", fontSize: "3em" }}>
          {" "}
          Project - Version Beta
        </Text>
      </View>

      {/* View of Body*/}
      <View style={{ margin: 35 }}>
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
            <TouchableOpacity
              disabled={
                comment.title == "" || comment.title == null ? true : false
              }
              onPress={() => {
                setCommentDisplayArea(false);
                showDialog();
                setCommentDisplay(comment.title);
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  marginLeft: 10,
                  color:
                    comment.title == "" || comment.title == null
                      ? "#00205B"
                      : "red",
                }}
              >
                Project title:{" "}
              </Text>
            </TouchableOpacity>
            <TextInput
              editable={previewProjectId ? false : true}
              mode="outlined"
              value={Title}
              style={{ width: "60%", height: 30, marginLeft: 10 }}
              onChangeText={(text) => setTitle(text)}
            />
          </View>
          <View style={{ flex: 6, flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                disabled={
                  comment.description == "" || comment.description == null
                    ? true
                    : false
                }
                onPress={() => {
                  setCommentDisplayArea(false);
                  showDialog();
                  setCommentDisplay(comment.description);
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    marginLeft: 10,

                    color:
                      comment.description == "" || comment.description == null
                        ? "#00205B"
                        : "red",
                  }}
                >
                  Project description:{" "}
                </Text>
              </TouchableOpacity>
              <TextInput
                editable={previewProjectId ? false : true}
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
                <TouchableOpacity
                  disabled={
                    comment.approvalNumber == "" ||
                    comment.approvalNumber == null
                      ? true
                      : false
                  }
                  onPress={() => {
                    setCommentDisplayArea(false);
                    showDialog();
                    setCommentDisplay(comment.approvalNumber);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      marginLeft: 10,
                      color:
                        comment.approvalNumber == "" ||
                        comment.approvalNumber == null
                          ? "#00205B"
                          : "red",
                    }}
                  >
                    Ethics Approval Number:
                  </Text>
                </TouchableOpacity>
                <TextInput
                  editable={previewProjectId ? false : true}
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
                <TouchableOpacity
                  disabled={
                    comment.governance == "" || comment.governance == null
                      ? true
                      : false
                  }
                  onPress={() => {
                    setCommentDisplayArea(false);
                    showDialog();
                    setCommentDisplay(comment.governance);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      marginLeft: 10,
                      color:
                        comment.governance == "" || comment.governance == null
                          ? "#00205B"
                          : "red",
                    }}
                  >
                    Governance Approval Number:
                  </Text>
                </TouchableOpacity>
                <TextInput
                  editable={previewProjectId ? false : true}
                  mode="outlined"
                  value={Governance}
                  style={{ flex: 1, height: 30, marginHorizontal: 10 }}
                  onChangeText={(text) => setGovernanceNumber(text)}
                />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  disabled={
                    comment.location == "" || comment.location == null
                      ? true
                      : false
                  }
                  onPress={() => {
                    setCommentDisplayArea(false);
                    showDialog();
                    setCommentDisplay(comment.location);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      marginLeft: 10,
                      color:
                        comment.location == "" || comment.location == null
                          ? "#00205B"
                          : "red",
                    }}
                  >
                    Location:{" "}
                  </Text>
                </TouchableOpacity>
                <TextInput
                  editable={previewProjectId ? false : true}
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
                <TouchableOpacity
                  disabled={
                    comment.subjectNo == "" || comment.subjectNo == null
                      ? true
                      : false
                  }
                  onPress={() => {
                    setCommentDisplayArea(false);
                    showDialog();
                    setCommentDisplay(comment.subjectNo);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      marginLeft: 10,
                      color:
                        comment.subjectNo == "" || comment.subjectNo == null
                          ? "#00205B"
                          : "red",
                    }}
                  >
                    Number of Subjects:{" "}
                  </Text>
                </TouchableOpacity>
                <TextInput
                  editable={previewProjectId ? false : true}
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
                <TouchableOpacity
                  disabled={
                    comment.duration == "" || comment.duration == null
                      ? true
                      : false
                  }
                  onPress={() => {
                    setCommentDisplayArea(false);
                    showDialog();
                    setCommentDisplay(comment.duration);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      marginLeft: 10,
                      color:
                        comment.duration == "" || comment.duration == null
                          ? "#00205B"
                          : "red",
                    }}
                  >
                    Study Duration:{" "}
                  </Text>
                </TouchableOpacity>
                <TextInput
                  editable={previewProjectId ? false : true}
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
                <TouchableOpacity
                  disabled={
                    comment.date == "" || comment.date == null ? true : false
                  }
                  onPress={() => {
                    setCommentDisplayArea(false);
                    showDialog();
                    setCommentDisplay(comment.date);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      marginLeft: 10,
                      color:
                        comment.date == "" || comment.date == null
                          ? "#00205B"
                          : "red",
                    }}
                  >
                    Start Date:{" "}
                  </Text>
                </TouchableOpacity>
                <TextInput
                  editable={previewProjectId ? false : true}
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
                disabled={previewProjectId ? true : false}
                icon={file == "" ? "upload" : "check"}
                mode="contained"
                style={{ margin: 10 }}
                onPress={() => pickFile()}
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

        {/*Basic demographic criteria*/}
        <Text
          style={{
            marginTop: 20,
            fontSize: 20,
            color: "#00205B",
          }}
        >
          Basic Demographic criteria
        </Text>
        <View style={{ display: previewProjectId ? "flex" : "none" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: "#00205B",
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
                margin: 10,
              }}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 15,
                  color: "#00205B",
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
                  margin: 10,
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
        </View>
        <View
          style={{
            display: previewProjectId ? "none" : "flex",
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
            defaultValue={gender == "Not required" ? null : gender}
            containerStyle={{
              height: 40,
              width: "20%",
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
            <CheckBox
              title="Need speek fluent english"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={isEnglishFluent}
              onPress={() => {
                setEnglishFluent(!isEnglishFluent);
              }}
            />
            <CheckBox
              title="Should be healthy"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={isHealthy}
              onPress={() => {
                setHealthy(!isHealthy);
              }}
            />
          </View>
        </View>

        {/* Inclusion Demographic criteria*/}
        <Text
          style={{
            marginTop: 20,
            fontSize: 20,
            color: "#00205B",
          }}
        >
          Inclusion Demographic criteria
        </Text>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            title="Pregnant
              "
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={isPregnant}
            onPress={() => {
              if (!previewProjectId) {
                setIsPregnant(!isPregnant);
              }
            }}
          />

          <CheckBox
            title="Smoking"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={isSmoking}
            onPress={() => {
              if (!previewProjectId) {
                setIsSmoking(!isSmoking);
              }
            }}
          />
          <CheckBox
            title="Lactating"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={isLactating}
            onPress={() => {
              if (!previewProjectId) {
                setIsLactating(!isLactating);
              }
            }}
          />
          <CheckBox
            title="Planning on becoming pregnant"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={isPlanningPregnant}
            onPress={() => {
              if (!previewProjectId) {
                setPlanningPregnant(!isPlanningPregnant);
              }
            }}
          />
        </View>

        {/* General and specific criteria*/}
        <Text
          style={{
            display: previewProjectId ? "none" : "flex",
            marginTop: 20,
            fontSize: 20,
            color: "#00205B",
          }}
        >
          General and specific criteria
        </Text>
        <View>
          <View
            style={{
              marginLeft: 4,
              display: previewProjectId ? "none" : "flex",
              flexDirection: "row",
              ...(Platform.OS !== "android" && {
                zIndex: 10,
              }),
            }}
          >
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
                width: "15%",
                marginRight: 10,
                marginTop: 8,
              }}
              selectedLabelStyle={{
                color: "red",
              }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              onChangeItem={(item) => setCriteriaType(item.value)}
            />

            <DropDownPicker
              items={[
                {
                  label: "",
                  value: "",
                },
                {
                  label: "Are",
                  value: "Are",
                },

                {
                  label: "Did",
                  value: "Did",
                },
                {
                  label: "Have",
                  value: "Have",
                },
                {
                  label: "Had",
                  value: "Had",
                },
                {
                  label: "Do",
                  value: "Do",
                },
                {
                  label: "Will",
                  value: "Will",
                },
                {
                  label: "Can",
                  value: "Can",
                },
                {
                  label: "Is",
                  value: "Is",
                },
              ]}
              containerStyle={{
                height: 40,
                width: "25%",
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
              onChangeItem={(item) => {
                setQuestionPrefix(item.value),
                  setQuestionPreview(`${item.value} ${CriteriaDetail}`);
              }}
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
              dropDownStyle={{ width: 540 }}
              dropDownMaxHeight={300}
              onChangeItem={(item) => {
                setCriteriaDetail(item.value),
                  setQuestionPreview(`${QuestionPrefix} ${item.value}`);
              }}
            />
            <TextInput
              mode="outlined"
              value={CriteriaDetail}
              placeholder="Criteria detail"
              style={{
                height: 37,
                width: 500,
                marginRight: 10,
                paddingTop: 3,
              }}
              onChangeText={(text) => {
                setCriteriaDetail(text),
                  setQuestionPreview(`${QuestionPrefix} ${text}`);
              }}
            />
          </View>
          <Card
            style={{
              display: previewProjectId ? "none" : "flex",
              margin: 5,
              padding: 8,
              width: 880,
            }}
          >
            <View style={styles.cardView}>
              <Text>{questionPreview}</Text>
            </View>
          </Card>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 20,
              display: previewProjectId ? "none" : "flex",
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
          {/*Question preview*/}
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
                      display: previewProjectId ? "none" : "flex",
                      width: 68,
                      top: 20,
                      position: "absolute",
                      right: 0,
                    }}
                    onPress={() => {
                      addQuestion();
                    }}
                  >
                    Add
                  </Button>
                </View>
                <View>
                  <TouchableOpacity
                    disabled={
                      comment.inclusion == "" || comment.inclusion == null
                        ? true
                        : false
                    }
                    onPress={() => {
                      setCommentDisplayArea(true);
                      showDialog();
                      setCommentDisplay(comment.inclusion);
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color:
                          comment.inclusion == "" || comment.inclusion == null
                            ? "#00205B"
                            : "red",
                      }}
                    >
                      Inclusion Questions:
                    </Text>
                  </TouchableOpacity>
                  <View>{renderList}</View>
                </View>

                <View>
                  <TouchableOpacity
                    disabled={
                      comment.exclusion == "" || comment.exclusion == null
                        ? true
                        : false
                    }
                    onPress={() => {
                      setCommentDisplayArea(true);
                      showDialog();
                      setCommentDisplay(comment.exclusion);
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color:
                          comment.exclusion == "" || comment.exclusion == null
                            ? "#00205B"
                            : "red",
                      }}
                    >
                      Exclusion Questions:
                    </Text>
                  </TouchableOpacity>
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
                  will be rejected from the project.
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

        <Portal>
          <Dialog
            style={{
              width: 600,
              position: "absolute",
              alignSelf: "center",
              top: commentDisplayArea == false ? "20%" : "70%",
            }}
            visible={visible}
            onDismiss={hideDialog}
          >
            <Dialog.Title>Comment</Dialog.Title>
            <Dialog.Content>
              <Paragraph>{commentDisplay}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Back</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          display: pendingProjectId ? "flex" : "none",
        }}
      >
        <Button
          mode="contained"
          style={{ width: 150, alignSelf: "center", margin: 20 }}
          onPress={() => projectUpdate()}
        >
          Update
        </Button>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          display: pendingProjectId || previewProjectId ? "none" : "flex",
        }}
      >
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
            projectUpload(), deleteIncomplete(projectId);
          }}
        >
          Submit
        </Button>
      </View>

      {/* View of Footer*/}
      <Footer />
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
