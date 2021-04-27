/** @format */

import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { styles } from "../styles.js";
import { DataTable, Button, Colors, IconButton } from "react-native-paper";
import axios from "axios";
import { Link } from 'react-router-dom';

export default class WorkerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingIsShow: false,
      reviewedIsShow: false,
      pendingIcon: "chevron-right",
      reviewedIcon: "chevron-right",
      unauthorizedProject: [],
      authorizedProject: [],
    };
  }

  componentDidMount() {
    this.getProjects();
  }

  getProjects = () => {
    let unauthorizedProjects = [];
    let authorizedProjects = [];
    axios.get(`http://localhost:12345/api/project/`).then(
      (response) => {
        for (let i = 0; i < Object.keys(response.data).length; i++) {
          let project = {
            key: response.data[i]._id,
            title: response.data[i].title,
            createdDate: response.data[i].createdDate,
            state: response.data[i].state,
          };
          if (response.data[i].state === "pending" || response.data[i].state === "New Upload") {
            unauthorizedProjects.push(project);
          } else {
            authorizedProjects.push(project);
          }
        }
        this.setState({ unauthorizedProject: unauthorizedProjects });
        this.setState({ authorizedProject: authorizedProjects });
        console.log(this.state.unauthorizedProject);
        console.log(this.state.authorizedProject);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  goToProcess = () => {
    const { navigate } = this.props.navigation;
    navigate();
  };

  processButton = () => (
    <Button mode="contained" onPress={this.goToProcess}>
      Process
    </Button>
  );

  setPendingIsShow = () => {
    this.setState({ pendingIsShow: !this.state.pendingIsShow });
    if (this.state.pendingIcon === "chevron-right") {
      this.setState({ pendingIcon: "chevron-down" });
    } else {
      this.setState({ pendingIcon: "chevron-right" });
    }
  };

  setReviewedIsShow = () => {
    this.setState({ reviewedIsShow: !this.state.reviewedIsShow });
    if (this.state.reviewedIcon === "chevron-right") {
      this.setState({ reviewedIcon: "chevron-down" });
    } else {
      this.setState({ reviewedIcon: "chevron-right" });
    }
  };

  render() {
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
        {/* pending projects */}
        <View style={{ margin: 20 }}>
          <Text style={{ fontSize: 35, color: "grey", paddingBottom: 30 }}>
            Project list
          </Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Unauthorized Projects</DataTable.Title>
              <DataTable.Title numeric>Date Created</DataTable.Title>
              <DataTable.Title numeric>State</DataTable.Title>
              <DataTable.Title numeric>
                <IconButton
                  style={{ margin: 0 }}
                  icon={this.state.pendingIcon}
                  color={Colors.red500}
                  onPress={this.setPendingIsShow}
                ></IconButton>
              </DataTable.Title>
            </DataTable.Header>
            {this.state.pendingIsShow ? (
              <View>
                {this.state.unauthorizedProject.map((item, index) => {
                  console.log(item)
                  return (
                    <DataTable.Row key={index}>
                      <DataTable.Cell>{item.title}</DataTable.Cell>
                      <DataTable.Cell numeric>
                        {item.createdDate}
                      </DataTable.Cell>
                      <DataTable.Cell numeric>{item.state}</DataTable.Cell>
                      <DataTable.Cell numeric>
                        <Link to={{
                          pathname: "/projectApproval",
                          state: {projectId: item.key, projectState: item.state}
                        }}> process</Link>
                        {/* <Button>Process</Button> */}
                      </DataTable.Cell>
                    </DataTable.Row>
                  );
                })}
              </View>
            ) : (
              <View></View>
            )}
          </DataTable>
        </View>

        {/* pending projects */}
        <View style={{ margin: 20 }}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Athourized Projects</DataTable.Title>
              <DataTable.Title numeric>Date Created</DataTable.Title>
              <DataTable.Title numeric>State</DataTable.Title>
              <DataTable.Title numeric>
                <IconButton
                  style={{ margin: 0 }}
                  icon={this.state.reviewedIcon}
                  color={Colors.red500}
                  onPress={this.setReviewedIsShow}
                ></IconButton>
              </DataTable.Title>
            </DataTable.Header>
            {this.state.reviewedIsShow ? (
              <View>
              {this.state.authorizedProject.map((item, index) => {
                console.log(item)
                return (
                  <DataTable.Row key={index}>
                    <DataTable.Cell>{item.title}</DataTable.Cell>
                    <DataTable.Cell numeric>
                      {item.createdDate}
                    </DataTable.Cell>
                    <DataTable.Cell numeric>{item.state}</DataTable.Cell>
                    <DataTable.Cell numeric>
                      <Button>Process</Button>
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </View>
            ) : (
              <View></View>
            )}
          </DataTable>
        </View>
      </SafeAreaView>
    );
  }
}
