/** @format */

import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput as NativeTextInput
} from "react-native";
import { styles } from "../styles.js";
import { Button, Dialog, Portal, TextInput, Card } from "react-native-paper";
import axios from "axios";
import { DEPLOYEDHOST, LOCALHOST } from "../routes/urlMap";
import HeaderSecond from "../screens/HeaderSecond";
import Footer from "../screens/Footer";
export default class ProjectApprovalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      isModalVisible1: false,
      isModalVisible2: false,
      isModalVisible3: false,
      isModalVisible4: false,
      isModalVisible5: false,
      isModalVisible6: false,
      isModalVisible7: false,
      isModalVisible8: false,
      isModalVisible9: false,
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
      projectId: this.props.location.state.projectId,
      projectState: this.props.location.state.projectState,
      inclusionQuestion: [],
      exclusionQuestion: [],
      projectInfo: [],
      project: ""
    };
  }

  showModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  handleCancel = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  showModal1 = () => {
    this.setState({ isModalVisible1: !this.state.isModalVisible1 });
  };

  handleCancel1 = () => {
    this.setState({ isModalVisible1: !this.state.isModalVisible1 });
  };

  showModal2 = () => {
    this.setState({ isModalVisible2: !this.state.isModalVisible2 });
  };

  handleCancel2 = () => {
    this.setState({ isModalVisible2: !this.state.isModalVisible2 });
  };

  showModal3 = () => {
    this.setState({ isModalVisible3: !this.state.isModalVisible3 });
  };

  handleCancel3 = () => {
    this.setState({ isModalVisible3: !this.state.isModalVisible3 });
  };

  showModal4 = () => {
    this.setState({ isModalVisible4: !this.state.isModalVisible4 });
  };

  handleCancel4 = () => {
    this.setState({ isModalVisible4: !this.state.isModalVisible4 });
  };

  showModal5 = () => {
    this.setState({ isModalVisible5: !this.state.isModalVisible5 });
  };

  handleCancel5 = () => {
    this.setState({ isModalVisible5: !this.state.isModalVisible5 });
  };

  showModal6 = () => {
    this.setState({ isModalVisible6: !this.state.isModalVisible6 });
  };

  handleCancel6 = () => {
    this.setState({ isModalVisible6: !this.state.isModalVisible6 });
  };

  showModal7 = () => {
    this.setState({ isModalVisible7: !this.state.isModalVisible7 });
  };

  handleCancel7 = () => {
    this.setState({ isModalVisible7: !this.state.isModalVisible7 });
  };

  showModal8 = () => {
    this.setState({ isModalVisible8: !this.state.isModalVisible8 });
  };

  handleCancel8 = () => {
    this.setState({ isModalVisible8: !this.state.isModalVisible8 });
  };

  showModal9 = () => {
    this.setState({ isModalVisible9: !this.state.isModalVisible9 });
  };

  handleCancel9 = () => {
    this.setState({ isModalVisible9: !this.state.isModalVisible9 });
  };

  changeTitleColor = () => {
    if (this.state.titleComment == "") {
      return "black";
    } else {
      return "red";
    }
  };

  changeDescriptionColor = () => {
    if (this.state.descriptionComment == "") {
      return "black";
    } else {
      return "red";
    }
  };

  changeDurationColor = () => {
    if (this.state.durationComment == "") {
      return "black";
    } else {
      return "red";
    }
  };

  changeDateColor = () => {
    if (this.state.dateComment == "") {
      return "black";
    } else {
      return "red";
    }
  };

  changeEthicsColor = () => {
    if (this.state.ethicsComment == "") {
      return "black";
    } else {
      return "red";
    }
  };

  changeGovernanceColor = () => {
    if (this.state.governanceComment == "") {
      return "black";
    } else {
      return "red";
    }
  };

  changeLocationColor = () => {
    if (this.state.locationComment == "") {
      return "black";
    } else {
      return "red";
    }
  };

  changeSubjectNoColor = () => {
    if (this.state.subjectNoComment == "") {
      return "black";
    } else {
      return "red";
    }
  };

  changeInclusionColor = () => {
    if (this.state.inclusionComment == "") {
      return "#00205B";
    } else {
      return "red";
    }
  };

  changeExclusionColor = () => {
    if (this.state.exclusionComment == "") {
      return "#00205B";
    } else {
      return "red";
    }
  };

  componentDidMount() {
    this.getProjectInfo();
  }

  updateState = () => {
    const { history } = this.props;

    axios
      .put(
        `${DEPLOYEDHOST}/api/project/${this.props.location.state.projectId}`,
        {
          state: "pending"
        }
      )
      .then(
        response => {
          history.push("/worker");
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  };

  authorizeProject = () => {
    const { history } = this.props;
    axios
      .put(
        `${DEPLOYEDHOST}/api/project/${this.props.location.state.projectId}`,
        {
          state: "Authorized"
        }
      )
      .then(
        response => {
          history.push("/worker");
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  };

  leaveComment = () => {
    axios
      .post(`${DEPLOYEDHOST}/api/comment/`, {
        projectId: this.state.projectId,
        title: this.state.titleComment,
        description: this.state.descriptionComment,
        location: this.state.locationComment,
        subjectNo: this.state.subjectNoComment,
        duration: this.state.durationComment,
        date: this.state.dateComment,
        approvalNumber: this.state.ethicsComment,
        governance: this.state.governanceComment,
        InclusionCriteria: this.state.InclusionComment,
        ExclusionCriteria: this.state.ExclusionComment
      })
      .then(
        response => {
          this.updateState();
        },
        error => {
          console.log(error);
        }
      );
  };

  getProjectInfo = () => {
    let inclusionQuestions = [];
    let exclusionQuestions = [];
    axios
      .get(`${DEPLOYEDHOST}/api/project/${this.props.location.state.projectId}`)
      .then(
        response => {
          this.setState({ project: response.data });
          for (
            let i = 0;
            i < Object.keys(response.data.InclusionCriteria).length;
            i++
          ) {
            inclusionQuestions.push(response.data.InclusionCriteria[i]);
          }
          for (
            let i = 0;
            i < Object.keys(response.data.ExclusionCriteria).length;
            i++
          ) {
            exclusionQuestions.push(response.data.ExclusionCriteria[i]);
          }
          this.setState({ inclusionQuestion: inclusionQuestions });
          this.setState({ exclusionQuestion: exclusionQuestions });
          console.log(this.state.inclusionQuestion);
        },
        error => {
          console.log(error);
        }
      );
  };

  render() {
    const { history } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <HeaderSecond history={history} />

        {/* first row view */}
        <View style={{ margin: 20 }}>
          <View style={{ flexDirection: "row", paddingBottom: 20 }}>
            <Text
              style={{
                fontSize: 35,
                color: "grey",
                flex: 1,
                fontWeight: "bold"
              }}
            >
              Project Information
              <Text
                style={{
                  fontSize: 10,
                  color: "red",
                  paddingLeft: 20,
                  fontWeight: "normal"
                }}
              >
                *You can leave comments by clicking a text field
              </Text>
            </Text>
            <Button
              onPress={() => history.push("/worker")}
              mode="outlined"
              style={{
                backgroundColor: "white",
                width: 120,
                height: 37
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
                alignItems: "center"
              }}
            >
              <Text style={styles.subTitle}>Project titile: </Text>
              <View>
                <Portal>
                  <Dialog
                    style={{ width: 500, alignSelf: "center" }}
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
                        borderRadius: 5
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
                      value={this.state.titleComment}
                      onChangeText={text =>
                        this.setState({ titleComment: text })
                      }
                    />
                    <Dialog.Actions>
                      <Button onPress={this.handleCancel}>Submit</Button>
                    </Dialog.Actions>
                  </Dialog>
                </Portal>
                <TouchableOpacity onPress={this.showModal}>
                  <Text
                    style={{
                      width: 557,
                      height: 30,
                      marginHorizontal: 10,
                      borderWidth: 1,
                      borderColor: this.changeTitleColor(),
                      borderRadius: 5
                    }}
                  >
                    {" "}
                    {this.state.project.title}{" "}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.projectContainer}>
              <View style={{ flex: 1 }}>
                <Text style={styles.subTitle}>Project description: </Text>

                <View>
                  <Portal>
                    <Dialog
                      style={{ width: 500, alignSelf: "center" }}
                      visible={this.state.isModalVisible1}
                      onDismiss={this.handleCancel1}
                    >
                      <Dialog.Title>Please leave comment</Dialog.Title>
                      <TextInput
                        multiline={true}
                        textAlignVertical="top"
                        style={{
                          height: 100,
                          marginHorizontal: 10,
                          borderWidth: 1,
                          borderRadius: 5
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
                        value={this.state.descriptionComment}
                        onChangeText={text =>
                          this.setState({ descriptionComment: text })
                        }
                      />
                      <Dialog.Actions>
                        <Button onPress={this.handleCancel1}>Submit</Button>
                      </Dialog.Actions>
                    </Dialog>
                  </Portal>
                  <TouchableOpacity onPress={this.showModal1}>
                    <Text
                      multiline={true}
                      textAlignVertical="top"
                      style={{
                        height: 130,
                        marginHorizontal: 10,
                        borderWidth: 1,
                        borderColor: this.changeDescriptionColor(),
                        borderRadius: 5
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
                    marginTop: 15
                  }}
                >
                  <Text style={styles.subTitle}>Ethics Approval Numbe:</Text>
                  <View>
                    <Portal>
                      <Dialog
                        style={{ width: 500, alignSelf: "center" }}
                        visible={this.state.isModalVisible2}
                        onDismiss={this.handleCancel2}
                      >
                        <Dialog.Title>Please leave comment</Dialog.Title>
                        <TextInput
                          multiline={true}
                          textAlignVertical="top"
                          style={{
                            height: 100,
                            marginHorizontal: 10,
                            borderWidth: 1,
                            borderRadius: 5
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
                          value={this.state.ethicsComment}
                          onChangeText={text =>
                            this.setState({ ethicsComment: text })
                          }
                        />
                        <Dialog.Actions>
                          <Button onPress={this.handleCancel2}>Submit</Button>
                        </Dialog.Actions>
                      </Dialog>
                    </Portal>
                    <TouchableOpacity onPress={this.showModal2}>
                      <Text
                        style={{
                          height: 30,
                          width: 468,
                          marginHorizontal: 5,
                          borderWidth: 1,
                          borderColor: this.changeEthicsColor(),
                          borderRadius: 5
                        }}
                      >
                        {" "}
                        {this.state.project.approvalNumber}{" "}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 15
                  }}
                >
                  <Text style={styles.subTitle}>
                    Governance Approval Number:
                  </Text>
                  <View>
                    <Portal>
                      <Dialog
                        style={{ width: 500, alignSelf: "center" }}
                        visible={this.state.isModalVisible3}
                        onDismiss={this.handleCancel3}
                      >
                        <Dialog.Title>Please leave comment</Dialog.Title>
                        <TextInput
                          multiline={true}
                          textAlignVertical="top"
                          style={{
                            height: 100,
                            marginHorizontal: 10,
                            borderWidth: 1,
                            borderRadius: 5
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
                          value={this.state.governanceComment}
                          onChangeText={text =>
                            this.setState({ governanceComment: text })
                          }
                        />
                        <Dialog.Actions>
                          <Button onPress={this.handleCancel3}>Submit</Button>
                        </Dialog.Actions>
                      </Dialog>
                    </Portal>
                    <TouchableOpacity onPress={this.showModal3}>
                      <Text
                        multiline={true}
                        textAlignVertical="top"
                        style={{
                          height: 30,
                          width: 410,
                          marginHorizontal: 5,
                          borderWidth: 1,
                          borderColor: this.changeGovernanceColor(),
                          borderRadius: 5
                        }}
                      >
                        {" "}
                        {this.state.project.governance}{" "}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingBottom: 20
                  }}
                >
                  <Text style={styles.subTitle}>Location: </Text>
                  <View>
                    <Portal>
                      <Dialog
                        style={{ width: 500, alignSelf: "center" }}
                        visible={this.state.isModalVisible4}
                        onDismiss={this.handleCancel4}
                      >
                        <Dialog.Title>Please leave comment</Dialog.Title>
                        <TextInput
                          multiline={true}
                          textAlignVertical="top"
                          style={{
                            height: 100,
                            marginHorizontal: 10,
                            borderWidth: 1,
                            borderRadius: 5
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
                          value={this.state.locationComment}
                          onChangeText={text =>
                            this.setState({ locationComment: text })
                          }
                        />
                        <Dialog.Actions>
                          <Button onPress={this.handleCancel4}>Submit</Button>
                        </Dialog.Actions>
                      </Dialog>
                    </Portal>
                    <TouchableOpacity onPress={this.showModal4}>
                      <Text
                        multiline={true}
                        textAlignVertical="top"
                        style={{
                          height: 30,
                          width: 500,
                          marginHorizontal: 10,
                          borderWidth: 1,
                          borderColor: this.changeLocationColor(),
                          borderRadius: 5
                        }}
                      >
                        {" "}
                        {this.state.project.location}{" "}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingBottom: 20
                  }}
                >
                  <Text style={styles.subTitle}>Number of Subjects: </Text>
                  <View>
                    <Portal>
                      <Dialog
                        style={{ width: 500, alignSelf: "center" }}
                        visible={this.state.isModalVisible5}
                        onDismiss={this.handleCancel5}
                      >
                        <Dialog.Title>Please leave comment</Dialog.Title>
                        <TextInput
                          multiline={true}
                          textAlignVertical="top"
                          style={{
                            height: 100,
                            marginHorizontal: 10,
                            borderWidth: 1,
                            borderRadius: 5
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
                          value={this.state.subjectNoComment}
                          onChangeText={text =>
                            this.setState({ subjectNoComment: text })
                          }
                        />
                        <Dialog.Actions>
                          <Button onPress={this.handleCancel5}>Submit</Button>
                        </Dialog.Actions>
                      </Dialog>
                    </Portal>
                    <TouchableOpacity onPress={this.showModal5}>
                      <Text
                        multiline={true}
                        textAlignVertical="top"
                        style={{
                          height: 30,
                          width: 400,
                          marginHorizontal: 10,
                          borderWidth: 1,
                          borderColor: this.changeSubjectNoColor(),
                          borderRadius: 5
                        }}
                      >
                        {" "}
                        {this.state.project.subjectNo}{" "}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingBottom: 20
                  }}
                >
                  <Text style={styles.subTitle}>Study Duration: </Text>
                  <View>
                    <Portal>
                      <Dialog
                        style={{ width: 500, alignSelf: "center" }}
                        visible={this.state.isModalVisible6}
                        onDismiss={this.handleCancel6}
                      >
                        <Dialog.Title>Please leave comment</Dialog.Title>
                        <TextInput
                          multiline={true}
                          textAlignVertical="top"
                          style={{
                            height: 100,
                            marginHorizontal: 10,
                            borderWidth: 1,
                            borderRadius: 5
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
                          value={this.state.durationComment}
                          onChangeText={text =>
                            this.setState({ durationComment: text })
                          }
                        />
                        <Dialog.Actions>
                          <Button onPress={this.handleCancel6}>Submit</Button>
                        </Dialog.Actions>
                      </Dialog>
                    </Portal>
                    <TouchableOpacity onPress={this.showModal6}>
                      <Text
                        multiline={true}
                        textAlignVertical="top"
                        style={{
                          height: 30,
                          width: 445,

                          marginHorizontal: 10,
                          borderWidth: 1,
                          borderColor: this.changeDurationColor(),
                          borderRadius: 5
                        }}
                      >
                        {" "}
                        {this.state.project.duration}{" "}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <Text style={styles.subTitle}>Start Date: </Text>
                  <View>
                    <Portal>
                      <Dialog
                        style={{ width: 500, alignSelf: "center" }}
                        visible={this.state.isModalVisible7}
                        onDismiss={this.handleCancel7}
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
                            borderRadius: 5
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
                          value={this.state.dateComment}
                          onChangeText={text =>
                            this.setState({ dateComment: text })
                          }
                        />
                        <Dialog.Actions>
                          <Button onPress={this.handleCancel7}>Submit</Button>
                        </Dialog.Actions>
                      </Dialog>
                    </Portal>
                    <TouchableOpacity onPress={this.showModal7}>
                      <Text
                        multiline={true}
                        textAlignVertical="top"
                        style={{
                          height: 30,
                          width: 486,
                          marginHorizontal: 10,
                          borderWidth: 1,
                          borderColor: this.changeDateColor(),
                          borderRadius: 5
                        }}
                      >
                        {" "}
                        {this.state.project.date}{" "}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
          {/* project criteria questions */}
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 3, paddingLeft: 10 }}>
              <View style={{ flex: 1 }}>
                <View style={{ height: 70 }}>
                  <Text
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 30,
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#00205B"
                    }}
                  >
                    Question Preview
                    <Text
                      style={{
                        fontSize: 5,
                        paddingLeft: 10,
                        color: "red",
                        fontWeight: "normal"
                      }}
                    >
                      *Click the type of questions to comment
                    </Text>
                  </Text>
                </View>

                <View>
                  <Portal>
                    <Dialog
                      style={{ width: 500, alignSelf: "center" }}
                      visible={this.state.isModalVisible8}
                      onDismiss={this.handleCancel8}
                    >
                      <Dialog.Title>Please leave comment</Dialog.Title>
                      <TextInput
                        multiline={true}
                        textAlignVertical="top"
                        style={{
                          height: 100,
                          marginHorizontal: 10,
                          borderWidth: 1,
                          borderRadius: 5
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
                        value={this.state.inclusionComment}
                        onChangeText={text =>
                          this.setState({ inclusionComment: text })
                        }
                      />
                      <Dialog.Actions>
                        <Button onPress={this.handleCancel8}>Submit</Button>
                      </Dialog.Actions>
                    </Dialog>
                  </Portal>
                  <TouchableOpacity onPress={this.showModal8}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: this.changeInclusionColor()
                      }}
                    >
                      {" "}
                      Inclusion Quetsions{" "}
                    </Text>
                  </TouchableOpacity>
                  {this.state.inclusionQuestion.map((item, index) => {
                    return (
                      <View key={index}>
                        <Card>
                          <Card.Content style={styles.questionCardStyle}>
                            <Text>{item}</Text>
                          </Card.Content>
                        </Card>
                      </View>
                    );
                  })}
                </View>

                <View>
                  <Portal>
                    <Dialog
                      style={{ width: 500, alignSelf: "center" }}
                      visible={this.state.isModalVisible9}
                      onDismiss={this.handleCancel9}
                    >
                      <Dialog.Title>Please leave comment</Dialog.Title>
                      <TextInput
                        multiline={true}
                        textAlignVertical="top"
                        style={{
                          height: 100,
                          marginHorizontal: 10,
                          borderWidth: 1,
                          borderRadius: 5
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
                        value={this.state.exclusionComment}
                        onChangeText={text =>
                          this.setState({ exclusionComment: text })
                        }
                      />
                      <Dialog.Actions>
                        <Button onPress={this.handleCancel9}>Submit</Button>
                      </Dialog.Actions>
                    </Dialog>
                  </Portal>
                  <TouchableOpacity onPress={this.showModal9}>
                    <Text
                      style={{
                        fontSize: 15,
                        marginTop: 30,
                        color: this.changeExclusionColor()
                      }}
                    >
                      Exclusion Quetsions
                    </Text>
                  </TouchableOpacity>
                  {this.state.exclusionQuestion.map((item, index) => {
                    return (
                      <View key={index}>
                        <Card>
                          <Card.Content style={styles.questionCardStyle}>
                            <Text>{item}</Text>
                          </Card.Content>
                        </Card>
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          {this.state.descriptionComment === "" &&
          this.state.titleComment === "" &&
          this.state.exclusionComment === "" &&
          this.state.inclusionComment === "" &&
          this.state.durationComment == "" &&
          this.state.governanceComment === "" &&
          this.state.subjectNoComment === "" &&
          this.state.dateComment === "" &&
          this.state.locationComment === "" &&
          this.state.ethicsComment === "" ? (
            <View>
              <Button style={{ marginTop: 30 }} onPress={this.authorizeProject}>
                Authorize
              </Button>
            </View>
          ) : (
            <View>
              <Button style={{ marginTop: 30 }} onPress={this.leaveComment}>
                Pending
              </Button>
            </View>
          )}
        </View>

        <Footer />
      </SafeAreaView>
    );
  }
}
