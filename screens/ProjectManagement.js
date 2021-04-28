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

const ProjectManagement = (props) => {
  const [incompleteDrop, setIncompleteDrop] = useState("none");
  const [unreleasedDrop, setUnreleasedDrop] = useState("none");
  const [releasedDrop, setReleasedDrop] = useState("none");

  const [unreleasedProject, setUnreleasedProject] = useState([]);
  const [releasedProject, setReleasedProject] = useState([]);
  const [incompleteProject, setIncompleteProject] = useState([]);
  const userId = localStorage.getItem("userId");
  // const userId = "606d1642b2fff30342232416";
  useEffect(() => {
    getProjects();
    getLocalStorage();
  }, []);

  const toggleIncompleteVisibility = () => {
    if (incompleteDrop == "flex") {
      setIncompleteDrop("none");
    } else {
      setIncompleteDrop("flex");
    }
  };

  const toggleUnreleasedVisibility = () => {
    if (unreleasedDrop == "flex") {
      setUnreleasedDrop("none");
    } else {
      setUnreleasedDrop("flex");
    }
  };

  const toggleReleasedVisibility = () => {
    if (releasedDrop == "flex") {
      setReleasedDrop("none");
    } else {
      setReleasedDrop("flex");
    }
  };

  const deleteProject = (projectId) => {
    axios.delete(`http://localhost:12345/api/project/${projectId}`).then(
      (response) => {
        getProjects();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const deleteIncomplete = async (id) => {
    try {
      await AsyncStorage.removeItem(id);
      getLocalStorage();
    } catch (e) {}
  };

  const getProjects = () => {
    let unreleasedProjects = [];
    let releasedProjects = [];
    axios.get(`http://localhost:12345/api/project/?user=${userId}`).then(
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

  const getLocalStorage = async () => {
    let keys = [];
    let values = [];
    let incompleteProjects = [];
    const uncheckRemain = [
      "isPragnant",
      "isSmoking",
      "isLactating",
      "isPlaningPragnant",
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

  const updateState = (id) => {
    axios
      .put(`http://localhost:12345/api/project/${id}`, {
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

  const incompleteRender = incompleteProject.map((item) => {
    return (
      <DataTable.Row key={item.key} style={{ display: `${incompleteDrop}` }}>
        <DataTable.Cell>{item.title}</DataTable.Cell>
        <DataTable.Cell numeric>{item.createdDate}</DataTable.Cell>
        <DataTable.Cell numeric>{`${item.state} tasks left`}</DataTable.Cell>
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
              if (item.state == "pending") {
                props.history.push({
                  pathname: "/pendingEdit",
                  projectKey: item.key, // your data array of objects
                });
              } else if (item.state == "Authorized") {
                updateState();
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
                pathname: "/projectPreview",
                projectKey: item.key, // your data array of objects
              })
            }
          >
            Check
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

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Incomplete Projects</DataTable.Title>
            <DataTable.Title numeric>Date Created</DataTable.Title>
            <DataTable.Title numeric>State</DataTable.Title>
            <DataTable.Title numeric>
              <IconButton
                icon="chevron-down"
                color={Colors.red500}
                size={20}
                style={{ margin: 0 }}
                onPress={() => toggleIncompleteVisibility()}
              />
            </DataTable.Title>
          </DataTable.Header>
          {incompleteRender}
        </DataTable>

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Unreleased Projects</DataTable.Title>
            <DataTable.Title numeric>Date Created</DataTable.Title>
            <DataTable.Title numeric>State</DataTable.Title>
            <DataTable.Title numeric>
              <IconButton
                icon="chevron-down"
                color={Colors.red500}
                size={20}
                style={{ margin: 0 }}
                onPress={() => toggleUnreleasedVisibility()}
              />
            </DataTable.Title>
          </DataTable.Header>
          {unreleasedRender}
        </DataTable>

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Released Projects</DataTable.Title>
            <DataTable.Title numeric>Date Created</DataTable.Title>
            <DataTable.Title numeric>State</DataTable.Title>
            <DataTable.Title numeric>
              <IconButton
                icon="chevron-down"
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
});
export default ProjectManagement;
