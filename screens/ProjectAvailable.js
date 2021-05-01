import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, Image, FlatList } from "react-native";
import { styles } from "../styles.js";
import axios from "axios";

import { Button, Card, Dialog, Portal, Paragraph } from "react-native-paper";
const ProjectAvailable = (props) => {
    const projectList = props.location.projectIDs;
  const [projectAvailable, setProjectAvailable] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [title, setTitile] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  useEffect(() => {
    loadProjects();
  }, [selectedId]);

  const loadProjects = () => {
    let p = [];
    axios.get(`http://localhost:12345/api/project/set/${projectList}`).then(
      (response) => {
        for (let i = 0; i < Object.keys(response.data).length; i++) {
          let project = {
            id: response.data[i]._id,
            title: response.data[i].title,
            description: response.data[i].description,
            location: response.data[i].location,
            duration: response.data[i].duration,
            date: response.data[i].date,
          };
          p.push(project);
        }
        setProjectAvailable(p);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const renderList = (item) => {
    const backgroundColor = item.id === selectedId ? "#00205B" : "white";
    const color = item.id === selectedId ? "white" : "black";
    return (
      <Card
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
        style={{
          backgroundColor: backgroundColor,

          height: 50,
          margin: 5,
          shadowOffset: { width: 2, height: 2 },
          shadowColor: "grey",
          shadowOpacity: 0.3,
        }}
        onPress={() => {
          setSelectedId(item.id),
            setTitile(item.title),
            setDuration(item.duration),
            setLocation(item.location),
            setDescription(item.description),
            setDate(item.date);
        }}
      >
        <View style={styles.cardView}>
          <Text numberOfLines={1} style={{ color: color, margin: 3, flex: 1 }}>
            {item.title}
          </Text>
          <Text
            style={{ color: color, margin: 3, flex: 1, textAlign: "right" }}
          >
            {item.date}
          </Text>
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* header view */}
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
          onPress={() => {
            props.history.push("/Homepage");
          }}
        >
          log out
        </Button>
      </View>

      <View style={{ flex: 1, margin: 20 }}>
        {/* title information */}
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 25,
            color: "gray",
            marginBottom: 10,
          }}
        >
          Available projects for you
        </Text>

        <View style={{ flexDirection: "row", flex: 1 }}>
          {/* This section contains the process bar */}

          <View style={{ width: "30%" }}>
            <FlatList
              data={projectAvailable}
              renderItem={({ item }) => {
                return renderList(item);
              }}
              keyExtractor={(item) => item.id}
            />
          </View>
          <View style={{ width: "50%", margin: 30 }}>
            <View style={{ flexDirection: "row", margin: 10 }}>
              <Text style={{ fontWeight: "bold" }}>Title: </Text>
              <Text style={{ flex: 1 }}>{title}</Text>
            </View>
            <View style={{ flexDirection: "row", margin: 10 }}>
              <Text style={{ fontWeight: "bold" }}>Study Duration: </Text>
              <Text style={{ flex: 1 }}>{duration}</Text>
            </View>
            <View style={{ flexDirection: "row", margin: 10 }}>
              <Text style={{ fontWeight: "bold" }}>Location: </Text>
              <Text style={{ flex: 1 }}>{location}</Text>
            </View>
            <View style={{ flexDirection: "row", margin: 10 }}>
              <Text style={{ fontWeight: "bold" }}>Start date: </Text>
              <Text style={{ flex: 1 }}>{date}</Text>
            </View>
            <View style={{ flexDirection: "row", margin: 10 }}>
              <Text style={{ fontWeight: "bold" }}>Description: </Text>
              <Text style={{ flex: 1 }}>{description}</Text>
            </View>
            <Button
              mode="contained"
              style={{ width: 100, position: "absolute", bottom: 0, right: 0 }}
              onPress={() => console.log("")}
            >
              Join
            </Button>
          </View>
          <View
            style={{
              justifyContent: "center",
              marginLeft: 40,
            }}
          >
            <View
              style={{
                height: 300,
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <View
                style={[
                  styles.processBarCircle,
                  { backgroundColor: "#00205B" },
                ]}
              >
                <Text style={{ color: "white", paddingLeft: 5 }}>1</Text>
                <Text
                  style={{
                    position: "absolute",
                    paddingLeft: 30,
                    color: "#00205B",
                  }}
                >
                  Demography？
                </Text>
              </View>
              <View
                style={[styles.processBarPole, { backgroundColor: "#00205B" }]}
              ></View>
              <View
                style={[
                  styles.processBarCircle,
                  { backgroundColor: "#00205B" },
                ]}
              >
                <Text style={{ color: "white", paddingLeft: 5 }}>2</Text>
                <Text style={styles.processBarText}>General Questions</Text>
              </View>
              <View
                style={[styles.processBarPole, { backgroundColor: "#00205B" }]}
              ></View>
              <View
                style={[
                  styles.processBarCircle,
                  { backgroundColor: "#00205B" },
                ]}
              >
                <Text style={{ color: "white", paddingLeft: 5 }}>3</Text>
                <Text style={styles.processBarText}>Specific Questions</Text>
              </View>
              <View
                style={[styles.processBarPole, { backgroundColor: "#00205B" }]}
              ></View>
              <View
                style={[
                  styles.processBarCircle,
                  { backgroundColor: "#00205B" },
                ]}
              >
                <Text style={{ color: "white", paddingLeft: 5 }}>4</Text>
                <Text style={styles.processBarText}>Available Projects</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Portal>
        <Dialog
          style={{ width: 300, alignSelf: "center" }}
          visible={projectList == ""}
          onDismiss={hideDialog}
        >
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              There is no suitable project for you, if you still get interested.
              Please click below button to leave your contact details. As long
              as there is a available project, we will contact you soom
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Click</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {/* View of Footer*/}
      <View
        style={{
          height: "5%",
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

export default ProjectAvailable;
