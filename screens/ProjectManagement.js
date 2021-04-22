import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  Platform,
  TextInput as NativeTextInput,
  Alert,
} from "react-native";

import {
  Button,
  Card,
  TextInput,
  Colors,
  DataTable,
  IconButton,
} from "react-native-paper";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import * as DocumentPicker from "expo-document-picker";
import { CheckBox } from "react-native-elements";

const ProjectManagement = (props) => {
  const [incompleteDrop, setIncompleteDrop] = useState("none");
  const [unreleasedDrop, setUnreleasedDrop] = useState("none");
  const [releasedDrop, setReleasedDrop] = useState("none");
  const Question = [
    {
      key: "1",
      description: "dasdasd",
    },
    {
      key: "2",
      description: "11/11/11",
    },
    {
      key: "3",
      description: "pending",
    },
  ];

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

  const incompleteRender = Question.map((item) => {
    return (
      <DataTable.Row key={item.key} style={{ display: `${incompleteDrop}` }}>
        <DataTable.Cell>{item.key}</DataTable.Cell>
        <DataTable.Cell numeric>{item.description}</DataTable.Cell>
        <DataTable.Cell numeric>{item.description}</DataTable.Cell>
        <DataTable.Cell numeric>
          <Button mode="outlined" compact="true" labelStyle={{ fontSize: 10 }}>
            Edit
          </Button>
          <Button
            mode="outlined"
            compact="true"
            style={{ marginHorizontal: 5 }}
            labelStyle={{ fontSize: 10 }}
          >
            Remove
          </Button>
        </DataTable.Cell>
      </DataTable.Row>
    );
  });

  const unreleasedRender = Question.map((item) => {
    return (
      <DataTable.Row key={item.key} style={{ display: `${unreleasedDrop}` }}>
        <DataTable.Cell>{item.key}</DataTable.Cell>
        <DataTable.Cell numeric>{item.description}</DataTable.Cell>
        <DataTable.Cell numeric>{item.description}</DataTable.Cell>
        <DataTable.Cell numeric>
          <Button mode="outlined" compact="true" labelStyle={{ fontSize: 10 }}>
            Edit
          </Button>
          <Button
            mode="outlined"
            compact="true"
            style={{ marginHorizontal: 5 }}
            labelStyle={{ fontSize: 10 }}
          >
            Remove
          </Button>
        </DataTable.Cell>
      </DataTable.Row>
    );
  });

  const releasedRender = Question.map((item) => {
    return (
      <DataTable.Row key={item.key} style={{ display: `${releasedDrop}` }}>
        <DataTable.Cell>{item.key}</DataTable.Cell>
        <DataTable.Cell numeric>{item.description}</DataTable.Cell>
        <DataTable.Cell numeric>{item.description}</DataTable.Cell>
        <DataTable.Cell numeric>
          <Button mode="outlined" compact="true" labelStyle={{ fontSize: 10 }}>
            Edit
          </Button>
          <Button
            mode="outlined"
            compact="true"
            style={{ marginHorizontal: 5 }}
            labelStyle={{ fontSize: 10 }}
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
          onPress={() => console.log("Pessed")}
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
