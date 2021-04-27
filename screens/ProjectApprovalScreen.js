/** @format */

import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput as NativeTextInput,
} from "react-native";
import { styles } from "../styles.js";
import { Button, Dialog, TextInput } from "react-native-paper";
import axios from "axios";

export default class ProjectApprovalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      titleComment: "",
      descriptionComment: "",
      ethicsComment: "",
      governanceComment: "",
      locationComment: "",
      subjectNoComment: "",
      durationComment: "",
      dateComment: "",
      inclusionComment: "",
      exclusionComment: "",
      commentBoarderColor: "black",
      projectId: this.props.location.state.projectId,
      projectState: this.props.location.state.projectState,
      projectInfo: [],
      project: "",
    };
  }

  showModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  handleCancel = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  changeTitleColor = () => {
    if (this.state.titleComment == "") {
      return "black";
    } else {
      return "red";
    }
  };

  componentWillMount() {
    console.log(this.props.location.state.projectId);
    console.log(this.props.location.state.projectState);
  }

  componentDidMount() {
    this.getProjectInfo();
  }

  updateState = () => {
    axios
      .put(
        `http://localhost:12345/api/project/${this.props.location.state.projectId}`,
        {
          state: "pending",
        }
      )
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  leaveComment = () => {
    const { history } = this.props;
    axios
      .post(`http://localhost:12345/api/comment/`, {
        projectId: this.state.projectId,
        title: this.state.titleComment,
        description: this.state.descriptionComment,
        location: this.state.locationComment,
        subjectNo: this.state.subjectNoComment,
        duration: this.state.durationComment,
        date: this.state.date,
        approvalNumber: this.state.approvalNumber,
        governance: this.state.governance,
        InclusionCriteria: this.state.InclusionCriteria,
        ExclusionCriteria: this.state.ExclusionCriteria,
      })
      .then(
        (response) => {
          this.updateState();
          history.push("/worker");
          console.log(response);
          console.log(this.stateprojectState);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  getProjectInfo = () => {
    axios
      .get(
        `http://localhost:12345/api/project/${this.props.location.state.projectId}`
      )
      .then(
        (response) => {
          this.setState({ project: response.data });
        },
        (error) => {
          console.log(error);
        }
      );
  };

  render() {
    const { history } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            height: 140,
            backgroundColor: "#00205B",
            flexDirection: "row",
          }}
        >
          <Image
            style={{ width: 200, height: 100, left: 100, top: 20 }}
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
            onPress={() => console.log()}
          >
            log out
          </Button>
        </View>

        {/* first row view */}
        <View style={{ margin: 20 }}>
          <View style={{ flexDirection: "row", paddingBottom: 20 }}>
            <Text style={{ fontSize: 35, color: "grey", flex: 1 }}>
              Project list
              <Text style={{ fontSize: 10, color: "red", paddingLeft: 20 }}>
                *You can leave comments by clicking a text field
              </Text>
            </Text>
            <Button
              onPress={() => history.push("/worker")}
              mode="outlined"
              style={{
                backgroundColor: "white",
                width: 120,
                height: 37,
              }}
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
              <Text
                style={{
                  width: 500,
                  marginLeft: 10,
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 5,
                }}
              >
                {" "}
                {this.state.project.title}
              </Text>
            </View>
            <View style={{ flex: 6, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.subTitle}>Project description: </Text>

                <View>
                  <View style={styles.containerStyle}>
                    <Dialog
                      visible={this.state.isModalVisible}
                      onDismiss={this.handleCancel}
                    >
                      <Dialog.Title>Please leave comment</Dialog.Title>
                      <TextInput
                        multiline={true}
                        textAlignVertical="top"
                        style={{
                          height: 100,
                          marginHorizontal: 10,
                          borderWidth: 1,
                          borderColor: this.state.pendingComment,
                          borderRadius: 5,
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
                        value={this.state.titleComment}
                        onChangeText={(text) =>
                          this.setState({ titleComment: text })
                        }
                      />
                      <Dialog.Actions>
                        <Button onPress={this.handleCancel}>Done</Button>
                      </Dialog.Actions>
                    </Dialog>
                  </View>
                  <TouchableOpacity onPress={this.showModal}>
                    <Text
                      multiline={true}
                      textAlignVertical="top"
                      style={{
                        height: 130,
                        marginHorizontal: 10,
                        borderWidth: 1,
                        borderColor: this.changeTitleColor(),
                        borderRadius: 5,
                      }}
                    >
                      {" "}
                      {this.state.project.description}{" "}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 15,
                  }}
                >
                  <Text style={styles.subTitle}>Ethics Approval Numbe:</Text>
                  <Text
                    style={{
                      flex: 1,
                      height: 30,
                      marginHorizontal: 10,
                      borderWidth: 1,
                      borderColor: "black",
                      borderRadius: 5,
                    }}
                  >
                    {" "}
                    {this.state.project.approvalNumber}{" "}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 15,
                  }}
                >
                  <Text style={styles.subTitle}>
                    Governance Approval Number:
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      height: 30,
                      marginHorizontal: 10,
                      borderWidth: 1,
                      borderColor: "black",
                      borderRadius: 5,
                    }}
                  >
                    {" "}
                    {this.state.project.governance}
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.subTitle}>Location: </Text>
                  <Text
                    style={{
                      height: 30,
                      margin: 10,
                      flex: 1,
                      borderWidth: 1,
                      borderColor: "black",
                      borderRadius: 5,
                    }}
                  >
                    {" "}
                    {this.state.project.location}{" "}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.subTitle}>Number of Subjects: </Text>
                  <Text
                    style={{
                      height: 30,
                      margin: 10,
                      flex: 1,
                      borderWidth: 1,
                      borderColor: "black",
                      borderRadius: 5,
                    }}
                  >
                    {" "}
                    {this.state.project.subjectNo}{" "}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.subTitle}>Study Duration: </Text>
                  <Text
                    style={{
                      height: 30,
                      margin: 10,
                      flex: 1,
                      borderWidth: 1,
                      borderColor: "black",
                      borderRadius: 5,
                    }}
                  >
                    {" "}
                    {this.state.project.duration}{" "}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.subTitle}>Start Date: </Text>
                  <Text
                    style={{
                      height: 30,
                      margin: 10,
                      flex: 1,
                      borderWidth: 1,
                      borderColor: "black",
                      borderRadius: 5,
                    }}
                  >
                    {" "}
                    {this.state.project.date}{" "}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Button onPress={this.leaveComment}>Pending</Button>
          <Button>Authorize</Button>
        </View>
      </SafeAreaView>
    );
  }
}
