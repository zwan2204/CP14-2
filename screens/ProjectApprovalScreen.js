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
import { Button, Dialog, Portal, TextInput, Card } from "react-native-paper";
import axios from "axios";
import { DEPLOYEDHOST, LOCALHOST } from "../routes/urlMap";
import HeaderSecond from "../screens/HeaderSecond";
import Footer from "../screens/Footer";

/*
  This is the Project Approval Page for NSWHP staff
  There are TWO major actions within this page that can be taken by a staff
  1. Leave comment for a piece of information that is wrong or requires more additional information
  2. AUTHORIZE a project with 0 comment / PENDING a project with one/more comment(s)
*/
export default class ProjectApprovalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Visibility control for comment box
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
      // Comment for each information
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
      // Passed project information from /worker page
      projectId: this.props.location.state.projectId,
      projectState: this.props.location.state.projectState,
      // List stores project criteria
      inclusionQuestion: [],
      exclusionQuestion: [],
      projectInfo: [],
      project: "",
    };
  }

  // Visibility control
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

  // Box colour control: if a comment has been left, the background colour will be changed to 'tomato'
  changeTitleColor = () => {
    if (this.state.titleComment == "") {
      return "";
    } else {
      return "tomato";
    }
  };

  changeDescriptionColor = () => {
    if (this.state.descriptionComment == "") {
      return " ";
    } else {
      return "tomato";
    }
  };

  changeDurationColor = () => {
    if (this.state.durationComment == "") {
      return " ";
    } else {
      return "tomato";
    }
  };

  changeDateColor = () => {
    if (this.state.dateComment == "") {
      return " ";
    } else {
      return "tomato";
    }
  };

  changeEthicsColor = () => {
    if (this.state.ethicsComment == "") {
      return " ";
    } else {
      return "tomato";
    }
  };

  changeGovernanceColor = () => {
    if (this.state.governanceComment == "") {
      return " ";
    } else {
      return "tomato";
    }
  };

  changeLocationColor = () => {
    if (this.state.locationComment == "") {
      return " ";
    } else {
      return "tomato";
    }
  };

  changeSubjectNoColor = () => {
    if (this.state.subjectNoComment == "") {
      return " ";
    } else {
      return "tomato";
    }
  };

  changeInclusionColor = () => {
    if (this.state.inclusionComment == "") {
      return "#00205B";
    } else {
      return "tomato";
    }
  };

  changeExclusionColor = () => {
    if (this.state.exclusionComment == "") {
      return "#00205B";
    } else {
      return "tomato";
    }
  };

  componentDidMount() {
    this.getProjectInfo();
  }

  /*
    Function to pending a project and change its state into "Pending"
  */
  updateState = () => {
    const { history } = this.props;

    axios
      .put(
        `${DEPLOYEDHOST}/api/project/${this.props.location.state.projectId}`,
        {
          state: "Pending",
        }
      )
      .then(
        (response) => {
          history.push("/worker");
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  /*
    Function to authorize a project and change its state into "Authorized"
  */
  authorizeProject = () => {
    const { history } = this.props;
    axios
      .put(
        `${DEPLOYEDHOST}/api/project/${this.props.location.state.projectId}`,
        {
          state: "Authorized",
        }
      )
      .then(
        (response) => {
          history.push("/worker");
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  /*
    Function to store all comments for this project in the database
  */
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
        Inclusion: this.state.inclusionComment,
        Exclusion: this.state.exclusionComment,
      })
      .then(
        (response) => {
          this.updateState();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  /*
    Function to retrieve the project information
  */
  getProjectInfo = () => {
    let inclusionQuestions = [];
    let exclusionQuestions = [];
    axios
      .get(`${DEPLOYEDHOST}/api/project/${this.props.location.state.projectId}`)
      .then(
        (response) => {
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
        (error) => {
          console.log(error);
        }
      );
  };

  /*
    Page rendering content
  */
  render() {
    const { history } = this.props;

    // Rendering for projects in the "Authorized Projects" list
    if (
      this.state.projectState == "Authorized" ||
      this.state.projectState == "Recruiting"
    ) {
      return (
        <SafeAreaView style={styles.container}>
          <HeaderSecond history={history} />

          <View style={{ padding: 10, flex: 1 }}>
            {/* first row view */}
            <View style={{ flexDirection: "row", paddingBottom: 20 }}>
              <Text
                style={{
                  fontSize: 35,
                  color: "grey",
                  flex: 1,
                  fontWeight: "bold",
                }}
              >
                Project Information
              </Text>
              <Button
                onPress={() => history.push("/worker")}
                style={{
                  backgroundColor: "white",
                  width: 120,
                  height: 37,
                }}
              >
                Back
              </Button>
            </View>
            {/*Project basic information upload area*/}
            <View style={{ flex: 1, flexDirection: "row" }}>
              {/*Title and description view*/}
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    marginBottom: 10,
                    flexDirection: "column",
                  }}
                >
                  <Text style={styles.subTitle}>Project title: </Text>
                  <View>
                    <Card
                      style={{
                        fontSize: "1.1em",
                        padding: 10,
                        marginHorizontal: 10,
                      }}
                    >
                      <Text> {this.state.project.title} </Text>
                    </Card>
                  </View>
                </View>

                <View>
                  <Text style={styles.subTitle}>Project description: </Text>
                  <View>
                    <Card
                      style={{
                        fontSize: "1.1em",
                        padding: 10,
                        marginHorizontal: 10,
                      }}
                    >
                      <Text> {this.state.project.description} </Text>
                    </Card>
                  </View>
                </View>
              </View>

              {/* Other info view*/}
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "column",
                    paddingBottom: 20,
                  }}
                >
                  <Text style={styles.subTitle}>Location: </Text>
                  <Card
                    style={{
                      fontSize: "1.1em",
                      padding: 10,
                      marginHorizontal: 10,
                    }}
                  >
                    <Text> {this.state.project.location} </Text>
                  </Card>
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    paddingBottom: 20,
                  }}
                >
                  <Text style={styles.subTitle}>Number of Subjects: </Text>
                  <Card
                    style={{
                      fontSize: "1.1em",
                      padding: 10,
                      marginHorizontal: 10,
                    }}
                  >
                    <Text> {this.state.project.subjectNo} </Text>
                  </Card>
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    paddingBottom: 20,
                  }}
                >
                  <Text style={styles.subTitle}>Study Duration: </Text>
                  <Card
                    style={{
                      fontSize: "1.1em",
                      padding: 10,
                      marginHorizontal: 10,
                    }}
                  >
                    <Text> {this.state.project.duration} </Text>
                  </Card>
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    paddingBottom: 20,
                  }}
                >
                  <Text style={styles.subTitle}>Start Date: </Text>
                  <Card
                    style={{
                      padding: 10,
                      marginHorizontal: 10,
                      fontSize: "1.1em",
                    }}
                  >
                    <Text> {this.state.project.date} </Text>
                  </Card>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    paddingBottom: 20,
                  }}
                >
                  <Text style={styles.subTitle}>Ethics Approval Number:</Text>
                  <Card
                    style={{
                      padding: 10,
                      marginHorizontal: 10,
                      fontSize: "1.1em",
                    }}
                  >
                    <Text> {this.state.project.approvalNumber} </Text>
                  </Card>
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    paddingBottom: 20,
                  }}
                >
                  <Text style={styles.subTitle}>
                    Governance Approval Number:
                  </Text>
                  <Card
                    style={{
                      padding: 10,
                      marginHorizontal: 10,
                      fontSize: "1.1em",
                    }}
                  >
                    <Text> {this.state.project.governance} </Text>
                  </Card>
                </View>
              </View>
            </View>

            {/* project criteria questions */}
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 3, paddingLeft: 10 }}>
                <View style={{ height: 70 }}>
                  <Text
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 30,
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#00205B",
                    }}
                  >
                    Question Preview
                  </Text>
                </View>

                <View>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "black",
                    }}
                  >
                    {" "}
                    Inclusion Questions{" "}
                  </Text>
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
                  <Text
                    style={{
                      fontSize: 15,
                      marginTop: 30,
                      color: "black",
                    }}
                  >
                    Exclusion Questions
                  </Text>
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
          <Footer />
        </SafeAreaView>
      );
    } else {

      // Rendering for projects in the "New Uploaded Projects" list
      return (
        <SafeAreaView style={styles.container}>
          <HeaderSecond history={history} />

          {/* first row view */}
          <View style={{ padding: 10, flex: 1 }}>
            <View style={{ flexDirection: "row", paddingBottom: 20 }}>
              <Text
                style={{
                  fontSize: 35,
                  color: "grey",
                  flex: 1,
                  fontWeight: "bold",
                }}
              >
                Project Information
                <Text
                  style={{
                    fontSize: 10,
                    color: "red",
                    paddingLeft: 20,
                    fontWeight: "normal",
                  }}
                >
                  *You can leave comments by clicking a text field
                </Text>
              </Text>
              <Button
                onPress={() => history.push("/worker")}
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
            <View style={{ flex: 1, flexDirection: "row" }}>
              {/*Title and description view*/}
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    marginBottom: 10,
                    flexDirection: "column",
                  }}
                >
                  <Text style={styles.subTitle}>Project title: </Text>
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
                          <Button onPress={this.handleCancel}>Submit</Button>
                        </Dialog.Actions>
                      </Dialog>
                    </Portal>
                    <Card
                      onPress={this.showModal}
                      style={{
                        fontSize: "1.1em",
                        padding: 10,
                        marginHorizontal: 10,
                        backgroundColor: this.changeTitleColor(),
                      }}
                    >
                      <Text> {this.state.project.title} </Text>
                    </Card>
                  </View>
                </View>

                <View>
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
                          value={this.state.descriptionComment}
                          onChangeText={(text) =>
                            this.setState({ descriptionComment: text })
                          }
                        />
                        <Dialog.Actions>
                          <Button onPress={this.handleCancel1}>Submit</Button>
                        </Dialog.Actions>
                      </Dialog>
                    </Portal>
                    <Card
                      onPress={this.showModal1}
                      style={{
                        fontSize: "1.1em",
                        padding: 10,
                        marginHorizontal: 10,
                        backgroundColor: this.changeDescriptionColor(),
                      }}
                    >
                      <Text> {this.state.project.description} </Text>
                    </Card>
                  </View>
                </View>
              </View>

              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "column",
                    paddingBottom: 20,
                  }}
                >
                  <Text style={styles.subTitle}>Location: </Text>
                  <View style={{ flex: 1 }}>
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
                          value={this.state.locationComment}
                          onChangeText={(text) =>
                            this.setState({ locationComment: text })
                          }
                        />
                        <Dialog.Actions>
                          <Button onPress={this.handleCancel4}>Submit</Button>
                        </Dialog.Actions>
                      </Dialog>
                    </Portal>
                    <Card
                      onPress={this.showModal4}
                      style={{
                        fontSize: "1.1em",
                        padding: 10,
                        marginHorizontal: 10,
                        backgroundColor: this.changeLocationColor(),
                      }}
                    >
                      <Text> {this.state.project.location} </Text>
                    </Card>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    paddingBottom: 20,
                  }}
                >
                  <Text style={styles.subTitle}>Number of Subjects: </Text>
                  <View style={{ flex: 1 }}>
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
                          value={this.state.subjectNoComment}
                          onChangeText={(text) =>
                            this.setState({ subjectNoComment: text })
                          }
                        />
                        <Dialog.Actions>
                          <Button onPress={this.handleCancel5}>Submit</Button>
                        </Dialog.Actions>
                      </Dialog>
                    </Portal>
                    <Card
                      onPress={this.showModal5}
                      style={{
                        padding: 10,
                        fontSize: "1.1em",
                        marginHorizontal: 10,
                        backgroundColor: this.changeSubjectNoColor(),
                      }}
                    >
                      <Text> {this.state.project.subjectNo} </Text>
                    </Card>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    paddingBottom: 20,
                  }}
                >
                  <Text style={styles.subTitle}>Study Duration: </Text>
                  <View style={{ flex: 1 }}>
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
                          value={this.state.durationComment}
                          onChangeText={(text) =>
                            this.setState({ durationComment: text })
                          }
                        />
                        <Dialog.Actions>
                          <Button onPress={this.handleCancel6}>Submit</Button>
                        </Dialog.Actions>
                      </Dialog>
                    </Portal>
                    <Card
                      onPress={this.showModal6}
                      style={{
                        padding: 10,
                        fontSize: "1.1em",
                        marginHorizontal: 10,
                        backgroundColor: this.changeDurationColor(),
                      }}
                    >
                      <Text> {this.state.project.duration} </Text>
                    </Card>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    paddingBottom: 20,
                  }}
                >
                  <Text style={styles.subTitle}>Start Date: </Text>
                  <View style={{ flex: 1 }}>
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
                          value={this.state.dateComment}
                          onChangeText={(text) =>
                            this.setState({ dateComment: text })
                          }
                        />
                        <Dialog.Actions>
                          <Button onPress={this.handleCancel7}>Submit</Button>
                        </Dialog.Actions>
                      </Dialog>
                    </Portal>
                    <Card
                      onPress={this.showModal7}
                      style={{
                        padding: 10,
                        fontSize: "1.1em",
                        marginHorizontal: 10,
                        backgroundColor: this.changeDateColor(),
                      }}
                    >
                      <Text> {this.state.project.date} </Text>
                    </Card>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    paddingBottom: 20,
                  }}
                >
                  <Text style={styles.subTitle}>Ethics Approval Number:</Text>
                  <View style={{ flex: 1 }}>
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
                          value={this.state.ethicsComment}
                          onChangeText={(text) =>
                            this.setState({ ethicsComment: text })
                          }
                        />
                        <Dialog.Actions>
                          <Button onPress={this.handleCancel2}>Submit</Button>
                        </Dialog.Actions>
                      </Dialog>
                    </Portal>
                    <Card
                      onPress={this.showModal2}
                      style={{
                        padding: 10,
                        fontSize: "1.1em",
                        marginHorizontal: 10,
                        backgroundColor: this.changeEthicsColor(),
                      }}
                    >
                      <Text> {this.state.project.approvalNumber} </Text>
                    </Card>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    paddingBottom: 20,
                  }}
                >
                  <Text style={styles.subTitle}>
                    Governance Approval Number:
                  </Text>
                  <View style={{ flex: 1 }}>
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
                          value={this.state.governanceComment}
                          onChangeText={(text) =>
                            this.setState({ governanceComment: text })
                          }
                        />
                        <Dialog.Actions>
                          <Button onPress={this.handleCancel3}>Submit</Button>
                        </Dialog.Actions>
                      </Dialog>
                    </Portal>
                    <Card
                      onPress={this.showModal3}
                      style={{
                        padding: 10,
                        fontSize: "1.1em",
                        marginHorizontal: 10,
                        backgroundColor: this.changeGovernanceColor(),
                      }}
                    >
                      <Text> {this.state.project.governance} </Text>
                    </Card>
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
                        color: "#00205B",
                      }}
                    >
                      Question Preview
                      <Text
                        style={{
                          fontSize: 10,
                          paddingLeft: 10,
                          color: "red",
                          fontWeight: "normal",
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
                          value={this.state.inclusionComment}
                          onChangeText={(text) =>
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
                          color: this.changeInclusionColor(),
                        }}
                      >
                        {" "}
                        Inclusion Questions{" "}
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
                          value={this.state.exclusionComment}
                          onChangeText={(text) =>
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
                          color: this.changeExclusionColor(),
                        }}
                      >
                        Exclusion Questions
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

          {/* Toggle button if any comment is left */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              padding: 30,
            }}
          >
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
                <Button mode="contained" onPress={this.authorizeProject}>
                  Authorize
                </Button>
              </View>
            ) : (
              <View>
                <Button mode="outlined" onPress={this.leaveComment}>
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
}
