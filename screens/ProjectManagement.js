/** @format */

import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
} from "react-native";

import { Button, Colors, DataTable, IconButton } from "react-native-paper";
import axios from "axios";
import { DEPLOYEDHOST, LOCALHOST } from "../routes/urlMap";
import HeaderSecond from "../screens/HeaderSecond";
import Footer from "../screens/Footer";
const ProjectManagement = (props) => {
  const [incompleteDrop, setIncompleteDrop] = useState("flex");
  const [unreleasedDrop, setUnreleasedDrop] = useState("flex");
  const [releasedDrop, setReleasedDrop] = useState("flex");

  const [unreleasedProject, setUnreleasedProject] = useState([]);
  const [releasedProject, setReleasedProject] = useState([]);
  const [incompleteProject, setIncompleteProject] = useState([]);
  const userId = localStorage.getItem("userId");

  //before the page rendering, methods in useEffect will be running in advance
  useEffect(() => {
    getProjects();
    getLocalStorage();
  }, []);

  //use to show and hide draft project table
  const toggleIncompleteVisibility = () => {
    if (incompleteDrop == "flex") {
      setIncompleteDrop("none");
    } else {
      setIncompleteDrop("flex");
    }
  };
  //use to show and hide the table of project which waiting for releasing
  const toggleUnreleasedVisibility = () => {
    if (unreleasedDrop == "flex") {
      setUnreleasedDrop("none");
    } else {
      setUnreleasedDrop("flex");
    }
  };

  //use to show and hide the released project table
  const toggleReleasedVisibility = () => {
    if (releasedDrop == "flex") {
      setReleasedDrop("none");
    } else {
      setReleasedDrop("flex");
    }
  };

  //delete one project and refresh the project display pool
  const deleteProject = (projectId) => {
    axios.delete(`${DEPLOYEDHOST}/api/project/${projectId}`).then(
      (response) => {
        getProjects();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  //remove draft project from local storage
  const deleteIncomplete = async (id) => {
    try {
      await AsyncStorage.removeItem(id);
      getLocalStorage();
    } catch (e) {}
  };

  //get all projects for this project manager in database
  const getProjects = () => {
    let unreleasedProjects = [];
    let releasedProjects = [];
    axios.get(`${DEPLOYEDHOST}/api/project/?user=${userId}`).then(
      (response) => {
        for (let i = 0; i < Object.keys(response.data).length; i++) {
          let project = {
            key: response.data[i]._id,
            title: response.data[i].title,
            createdDate: response.data[i].createdDate,
            state: response.data[i].state,
          };
          if (response.data[i].state != "Recruiting") {
            unreleasedProjects.push(project);
          } else {
            releasedProjects.push(project);
          }
        }

        setReleasedProject(releasedProjects);
        setUnreleasedProject(unreleasedProjects);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  //get draft for this project manager, it also return the remaining task for each project.
  const getLocalStorage = async () => {
    let keys = [];
    let values = [];
    let incompleteProjects = [];
    const uncheckRemain = [
      "isPregnant",
      "isSmoking",
      "isLactating",
      "isPlanningPregnant",
      "isHealthy",
      "isEnglishFluent",
    ];
    try {
      keys = await AsyncStorage.getAllKeys();
      values = await AsyncStorage.multiGet(keys);

      for (let i = 0; i < values.length; i++) {
        if (userId == values[i][0].split(",")[0]) {
          let remainTask = 0;
          let JsonKeys = Object.keys(JSON.parse(values[i][1]));

          for (let x = 0; x < JsonKeys.length; x++) {
            if (uncheckRemain.indexOf(JsonKeys[x]) < 0) {
              if (
                JSON.parse(values[i][1])[JsonKeys[x]].length == 0 ||
                !JSON.parse(values[i][1])[JsonKeys[x]]
              ) {
                remainTask++;
              }
            }
          }

          let project = {
            key: values[i][0],
            title: JSON.parse(values[i][1]).title,
            createdDate: JSON.parse(values[i][1]).createdDate,
            state: remainTask,
          };

          incompleteProjects.push(project);
        }
      }
      setIncompleteProject(incompleteProjects);
    } catch (e) {
      // error reading value
    }
  };

  //when project manager click release button for a project, update the state of this project to recruiting
  const updateState = (id) => {
    axios
      .put(`${DEPLOYEDHOST}/api/project/${id}`, {
        state: "Recruiting",
      })
      .then(
        (response) => {
          getProjects();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  //render draft project in data table
  const incompleteRender = incompleteProject.map((item) => {
    return (
      <DataTable.Row key={item.key} style={{ display: `${incompleteDrop}` }}>
        <DataTable.Cell>{item.title}</DataTable.Cell>
        <DataTable.Cell numeric>{item.createdDate}</DataTable.Cell>
        <DataTable.Cell numeric>
          {item.state == 0 ? "Complete" : `${item.state} tasks left`}
        </DataTable.Cell>
        <DataTable.Cell numeric>
          <Button
            mode="outlined"
            compact="true"
            labelStyle={{ fontSize: 10 }}
            onPress={() =>
              props.history.push({
                pathname: "/projectUpload",
                projectKey: item.key, // your data array of objects
              })
            }
          >
            Edit
          </Button>
          <Button
            mode="outlined"
            compact="true"
            style={{ marginHorizontal: 5 }}
            labelStyle={{ fontSize: 10 }}
            onPress={() => deleteIncomplete(item.key)}
          >
            Remove
          </Button>
        </DataTable.Cell>
      </DataTable.Row>
    );
  });

  //render pending and new upload project in data table
  const unreleasedRender = unreleasedProject.map((item) => {
    return (
      <DataTable.Row key={item.key} style={{ display: `${unreleasedDrop}` }}>
        <DataTable.Cell>{item.title}</DataTable.Cell>
        <DataTable.Cell numeric>{item.createdDate}</DataTable.Cell>
        <DataTable.Cell numeric>{item.state}</DataTable.Cell>
        <DataTable.Cell numeric>
          <Button
            mode="outlined"
            compact="true"
            disabled={item.state == "New Upload" ? true : false}
            style={{ marginHorizontal: 5 }}
            labelStyle={{ fontSize: 10 }}
            onPress={() => {
              if (item.state == "Pending") {
                props.history.push({
                  pathname: "/projectUpload",
                  pendingProjectKey: item.key, // your data array of objects
                });
              } else if (item.state == "Authorized") {
                updateState(item.key);
              }
            }}
          >
            {item.state == "Authorized" ? "Release" : "Edit"}
          </Button>
          <Button
            mode="outlined"
            compact="true"
            style={{ marginHorizontal: 5 }}
            labelStyle={{ fontSize: 10 }}
            onPress={() => deleteProject(item.key)}
          >
            Remove
          </Button>
        </DataTable.Cell>
      </DataTable.Row>
    );
  });

  //render recruiting project in data table
  const releasedRender = releasedProject.map((item) => {
    return (
      <DataTable.Row key={item.key} style={{ display: `${releasedDrop}` }}>
        <DataTable.Cell>{item.title}</DataTable.Cell>
        <DataTable.Cell numeric>{item.createdDate}</DataTable.Cell>
        <DataTable.Cell numeric>{item.state}</DataTable.Cell>
        <DataTable.Cell numeric>
          <Button
            mode="outlined"
            compact="true"
            labelStyle={{ fontSize: 10 }}
            onPress={() =>
              props.history.push({
                pathname: "/projectUpload",
                previewProjectKey: item.key, // your data array of objects
              })
            }
          >
            Preview
          </Button>
          <Button
            mode="outlined"
            compact="true"
            style={{ marginHorizontal: 5 }}
            labelStyle={{ fontSize: 10 }}
            onPress={() => deleteProject(item.key)}
          >
            Remove
          </Button>
        </DataTable.Cell>
      </DataTable.Row>
    );
  });

  return (
    <SafeAreaView style={styles.root}>
      {/*View of Header*/}
      <HeaderSecond history={props.history} />

      {/*View of Body*/}
      <ScrollView style={{ margin: 35 }}>
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 35,
              color: "gray",
              marginBottom: 10,
            }}
          >
            My Projects
          </Text>

          <Button
            mode="contained"
            style={{ width: 250, position: "absolute", right: 30 }}
            onPress={() => props.history.push("/projectUpload")}
          >
            Create a new project
          </Button>
        </View>

        {/*Table to display draft project*/}
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Incomplete Projects</DataTable.Title>
            <DataTable.Title numeric>Date Created</DataTable.Title>
            <DataTable.Title numeric>State</DataTable.Title>
            <DataTable.Title numeric>
              <IconButton
                icon={
                  incompleteDrop == "flex" ? "chevron-down" : "chevron-right"
                }
                color={Colors.red500}
                size={20}
                style={{ margin: 0 }}
                onPress={() => toggleIncompleteVisibility()}
              />
            </DataTable.Title>
          </DataTable.Header>
          {incompleteRender}
        </DataTable>

        {/*Table to display pending and new upload project*/}
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Unreleased Projects</DataTable.Title>
            <DataTable.Title numeric>Date Created</DataTable.Title>
            <DataTable.Title numeric>State</DataTable.Title>
            <DataTable.Title numeric>
              <IconButton
                icon={
                  unreleasedDrop == "flex" ? "chevron-down" : "chevron-right"
                }
                color={Colors.red500}
                size={20}
                style={{ margin: 0 }}
                onPress={() => toggleUnreleasedVisibility()}
              />
            </DataTable.Title>
          </DataTable.Header>
          {unreleasedRender}
        </DataTable>

        {/*Table to display recruiting project*/}
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Released Projects</DataTable.Title>
            <DataTable.Title numeric>Date Created</DataTable.Title>
            <DataTable.Title numeric>State</DataTable.Title>
            <DataTable.Title numeric>
              <IconButton
                icon={releasedDrop == "flex" ? "chevron-down" : "chevron-right"}
                color={Colors.red500}
                size={20}
                style={{ margin: 0 }}
                onPress={() => toggleReleasedVisibility()}
              />
            </DataTable.Title>
          </DataTable.Header>
          {releasedRender}
        </DataTable>
      </ScrollView>
      {/*View of Footer*/}
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
export default ProjectManagement;
