/** @format */

import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
} from "react-native";
import { styles } from "../styles.js";
import { DataTable, Button, Colors, IconButton } from "react-native-paper";
import axios from "axios";

export default class WorkerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingIsShow: false,
      reviewedIsShow: false,
      infoIsShow: false,
      pendingIcon: "chevron-right",
      reviewedIcon: "chevron-right",
      infoIcon: "chevron-right",
      unauthorizedProject: [],
      authorizedProject: [],
      pendinginfoProject: [],
    };
  }

  componentDidMount() {
    this.getProjects();
  }

  getProjects = () => {
    let unauthorizedProjects = [];
    let authorizedProjects = [];
    let pendinginfoProjects = [];
    axios.get(`http://localhost:12345/api/project/`).then(
      (response) => {
        for (let i = 0; i < Object.keys(response.data).length; i++) {
          let project = {
            key: response.data[i]._id,
            title: response.data[i].title,
            createdDate: response.data[i].createdDate,
            state: response.data[i].state,
          };
          if (response.data[i].state === "pending") {
            pendinginfoProjects.push(project);
          } else if (response.data[i].state === "New Upload") {
            unauthorizedProjects.push(project);
          } else if (response.data[i].state === "Authorized") {
            authorizedProjects.push(project);
          } 
        }
        this.setState({ unauthorizedProject: unauthorizedProjects });
        this.setState({ authorizedProject: authorizedProjects });
        this.setState({ pendinginfoProject: pendinginfoProjects });
        console.log(this.state.unauthorizedProject);
        console.log(this.state.authorizedProject);
        console.log(this.state.pendinginfoProject);
      },
      (error) => {
        console.log(error);
      }
    );
  };

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

  setInfoIsShow = () => {
    this.setState({ infoIsShow: !this.state.infoIsShow });
    if (this.state.infoIcon === "chevron-right") {
      this.setState({ infoIcon: "chevron-down" });
    } else {
      this.setState({ infoIcon: "chevron-right" });
    }
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
          {/* <Text style={{color:"red", position: "absolute"}}>Project - Version α</Text> */}
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
            onPress={() => history.push("/Homepage")}
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
              <DataTable.Title>Pending Projects</DataTable.Title>
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
                        <Button mode="contained" onPress={() => this.props.history.push({
                          pathname: "/projectApproval",
                          state: { projectId: item.key, projectState: item.state }
                        })}>process</Button>
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

        <View style={{ margin: 20 }}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Pending information Projects</DataTable.Title>
              <DataTable.Title numeric>Date Created</DataTable.Title>
              <DataTable.Title numeric>State</DataTable.Title>
              <DataTable.Title numeric>
                <IconButton
                  style={{ margin: 0 }}
                  icon={this.state.infoIcon}
                  color={Colors.red500}
                  onPress={this.setInfoIsShow}
                ></IconButton>
              </DataTable.Title>
            </DataTable.Header>
            {this.state.infoIsShow ? (
              <View>
                {this.state.pendinginfoProject.map((item, index) => {
                  console.log(item)
                  return (
                    <DataTable.Row key={index}>
                      <DataTable.Cell>{item.title}</DataTable.Cell>
                      <DataTable.Cell numeric>
                        {item.createdDate}
                      </DataTable.Cell>
                      <DataTable.Cell numeric>{item.state}</DataTable.Cell>
                      <DataTable.Cell numeric>
                        <Button mode="contained" onPress={() => this.props.history.push({
                          pathname: "/projectApproval",
                          state: { projectId: item.key, projectState: item.state }
                        })}>process</Button>
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
                        <Button mode="contained" onPress={() => this.props.history.push({
                          pathname: "/projectApproval",
                          state: { projectId: item.key, projectState: item.state }
                        })}>process</Button>
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