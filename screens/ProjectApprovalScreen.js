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
import { Button, Dialog, TextInput } from "react-native-paper";
import axios from "axios";

export default class ProjectApprovalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      pendingComment: "",
      commentBoarderColor: "black",
      projectId: this.props.location.state.projectId,
      projectInfo: []
    };
  }

  showModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  handleCancel = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  componentWillMount() {
    console.log(this.props.location.state.projectId);
  }

  componentDidMount() {
    this.getProjectInfo();
  }

  getProjectInfo = () => {
    let projectInfos = [];
    axios
      .get(
        `http://localhost:12345/api/project/${this.props.location.state.projectId}`
      )
      .then(
        response => {
          console.log(response.data);
          let title: response.data.title;
          let description: response.data.description;
          let location: response.data.location;
          let subjectNo: response.data.subjectNo;
          let duration: response.data.duration;
          let date: response.data.date;
          let eNumber: response.data.approvalNumber;
          let governance: response.data.governance;

          projectInfos.push(title);
          projectInfos.push(description);
          projectInfos.push(location);
          projectInfos.push(subjectNo);
          projectInfos.push(duration);
          projectInfos.push(date);
          projectInfos.push(eNumber);
          projectInfos.push(governance);
          this.setState({ projectInfo: projectInfos });
          console.log(this.state.projectInfo);
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
        <View
          style={{
            height: 140,
            backgroundColor: "#00205B",
            flexDirection: "row"
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
              right: 30
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
              <Text
                style={{
                  width: 800,
                  height: 30,
                  marginLeft: 10,
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 5
                }}
                onChangeText={text => setTitle(text)}
              />
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
                        value={this.state.pendingComment}
                        onChangeText={text =>
                          this.setState({ pendingComment: text })
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
                        borderColor: "black",
                        borderRadius: 5
                      }}
                    >
                      ijasdfljsklfndskjfkngmlewjfknmdlewjfngfkmeljfn,ekdmsjnkjsdjfksmlvnxkchvoisjofjdfioefo;hasofas;dfsiofj
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* <View>
                                    <View style={styles.containerStyle}>
                                        <Modal style={styles.containerStyle}
                                            visible={this.state.isModalVisible}
                                            onOk={this.handleOk}
                                            onDismiss={this.handleCancel} >
                                            <TextInput
                                            multiline={true}
                                            textAlignVertical="top"
                                            style={{
                                                height: 100,
                                                marginHorizontal: 10,
                                                borderWidth: 1, borderColor: "black", borderRadius: 5
                                            }}/>
                                            <Button mode="text" onPress={this.handleCancel}>DONE</Button>


                                        </Modal> </View>
                                    <TouchableOpacity onPress={this.showModal}>
                                        <Text
                                            multiline={true}
                                            textAlignVertical="top"
                                            style={{
                                                height: 130,
                                                marginHorizontal: 10,
                                                borderWidth: 1, borderColor: "black", borderRadius: 5
                                            }}>ijasdfljsklfndskjfkngmlewjfknmdlewjfngfkmeljfn,ekdmsjnkjsdjfksmlvnxkchvoisjofjdfioefo;hasofas;dfsiofj</Text>
                                    </TouchableOpacity>

                                </View> */}

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 15
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
                      borderRadius: 5
                    }}
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
                      borderRadius: 5
                    }}
                    onChangeText={text => setGovernanceNumber(text)}
                  />
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
                      borderRadius: 5
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
                  <Text
                    style={{
                      height: 30,
                      margin: 10,
                      flex: 1,
                      borderWidth: 1,
                      borderColor: "black",
                      borderRadius: 5
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
                  <Text
                    style={{
                      height: 30,
                      margin: 10,
                      flex: 1,
                      borderWidth: 1,
                      borderColor: "black",
                      borderRadius: 5
                    }}
                    onChangeText={text => setDuration(text)}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center"
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
                      borderRadius: 5
                    }}
                    onChangeText={text => setDate(text)}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
