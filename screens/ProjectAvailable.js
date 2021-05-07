/** @format */

import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, FlatList, ScrollView } from "react-native";
import { styles } from "../styles.js";
import axios from "axios";
import Header from "../screens/Header";
import Footer from "../screens/Footer";
import {
  Button,
  Card,
  Dialog,
  Portal,
  Paragraph,
  TextInput
} from "react-native-paper";
import { DEPLOYEDHOST, LOCALHOST } from "../routes/urlMap";
const ProjectAvailable = props => {
  // const projectList = props.location.projectIDs;
  const projectList = "607d64a9fecc5f0831cfd31f,607d4a6e5b45460c614eb0c4";
  const hcWorker = props.location.hcWorker;
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
    axios.get(`${DEPLOYEDHOST}/api/project/set/${projectList}`).then(
      response => {
        for (let i = 0; i < Object.keys(response.data).length; i++) {
          let project = {
            id: response.data[i]._id,
            title: response.data[i].title,
            description: response.data[i].description,
            location: response.data[i].location,
            duration: response.data[i].duration,
            date: response.data[i].date
          };
          p.push(project);
        }
        setProjectAvailable(p);
      },
      error => {
        console.log(error);
      }
    );
  };

  const renderList = item => {
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
          shadowOpacity: 0.3
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
        {/* <View style={styles.cardView}> */}
        <View
          style={{ borderColor: "lightgrey", borderWidth: 2, borderRadius: 5 }}
        >
          <Text
            numberOfLines={1}
            style={{ color: color, margin: 3, flex: 1, paddingLeft: 2 }}
          >
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
      <Header />

    <View style={[styles.questionPageContainer, {height:"70%"}]}>
        <View style={{width:"82%", flexDirection: "row", paddingTop:"2%", 
                height:"100%", paddingLeft:"5%"}}>
            {/* This section contains the process bar */}
            <ScrollView style={{ width: "30%" }}>
                <FlatList
                    data={projectAvailable}
                    renderItem={({ item }) => {return renderList(item);}}
                    keyExtractor={(item) => item.id}
                />
            </ScrollView>

            <ScrollView style={{ width: "65%", paddingLeft:"2%" }}>
                <View style={{ flexDirection: "row", margin: 10 }}>
                    <Text style={{ fontWeight: "bold", paddingRight:10}}>
                        Title:
                    </Text>
                    <Text style={{ flex: 1 }}>{title}</Text>
                </View>
            </ScrollView>
        </View>

        <View
          style={[
            styles.questionPageContainer,
            { height: "75%", paddingLeft: "5%" }
          ]}
        >
          <View
            style={{
              width: "82%",
              flexDirection: "row",
              paddingTop: "2%",
              height: "100%"
            }}
          >
            {/* This section contains the process bar */}
            <ScrollView style={{ width: "30%" }}>
              <FlatList
                data={projectAvailable}
                renderItem={({ item }) => {
                  return renderList(item);
                }}
                keyExtractor={item => item.id}
              />
            </ScrollView>

            <ScrollView style={{ width: "65%", paddingLeft: "2%" }}>
              <View style={{ flexDirection: "row", margin: 10 }}>
                <Text style={{ fontWeight: "bold", paddingRight: 10 }}>
                  Title:
                </Text>
                <Text style={{ flex: 1 }}>{title}</Text>
              </View>

              <View style={{ flexDirection: "row", margin: 10 }}>
                <Text style={{ fontWeight: "bold", paddingRight: 10 }}>
                  Study Duration:
                </Text>
                <Text style={{ flex: 1 }}>{duration}</Text>
              </View>

              <View style={{ flexDirection: "row", margin: 10 }}>
                <Text style={{ fontWeight: "bold", paddingRight: 10 }}>
                  Location:
                </Text>
                <Text style={{ flex: 1 }}>{location}</Text>
              </View>

              <View style={{ flexDirection: "row", margin: 10 }}>
                <Text style={{ fontWeight: "bold", paddingRight: 10 }}>
                  Start date:
                </Text>
                <Text style={{ flex: 1 }}>{date}</Text>
              </View>

              <View style={{ flexDirection: "row", margin: 10 }}>
                <Text style={{ fontWeight: "bold", paddingRight: 10 }}>
                  Description:
                </Text>
                <Text style={{ flex: 1 }}>{description}</Text>
              </View>
            </ScrollView>
          </View>

          {/* This section contains the process bar */}
          <View style={styles.processBarContainer}>
            <View
              style={[styles.processBarCircle, { backgroundColor: "#00205B" }]}
            >
              <Text style={{ color: "white", paddingLeft: 5 }}>1</Text>
              <Text
                style={{
                  position: "absolute",
                  paddingLeft: 30,
                  color: "#00205B"
                }}
              >
                Demographic Information
              </Text>
            </View>
            <View
              style={[styles.processBarPole, { backgroundColor: "#00205B" }]}
            ></View>
            <View
              style={[styles.processBarCircle, { backgroundColor: "#00205B" }]}
            >
              <Text style={{ color: "white", paddingLeft: 5 }}>2</Text>
              <Text style={styles.processBarText}>General Questions</Text>
            </View>
            <View
              style={[styles.processBarPole, { backgroundColor: "#00205B" }]}
            ></View>
            <View
              style={[styles.processBarCircle, { backgroundColor: "#00205B" }]}
            >
              <Text style={{ color: "white", paddingLeft: 5 }}>3</Text>
              <Text style={styles.processBarText}>Specific Questions</Text>
            </View>

            {hcWorker && (
              <View
                style={[styles.processBarPole, { backgroundColor: "#00205B" }]}
              ></View>
            )}
            {hcWorker && (
              <View
                style={[
                  styles.processBarCircle,
                  { backgroundColor: "#00205B" }
                ]}
              >
                <Text style={{ color: "white", paddingLeft: 5 }}>4</Text>
                <Text style={styles.processBarText}>Medical Condition</Text>
              </View>
            )}

            <View
              style={[styles.processBarPole, { backgroundColor: "#00205B" }]}
            ></View>

            <View
              style={[styles.processBarCircle, { backgroundColor: "#00205B" }]}
            >
              <Text style={{ color: "white", paddingLeft: 5 }}>
                {hcWorker ? "5" : "4"}
              </Text>
              <Text style={styles.processBarText}>Eligible Projects</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            height: "10%",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center"
          }}
        >
          <Button
            mode="contained"
            style={{ width: 100 }}
            //remove the console.log(), and place your consent website here
            onPress={() => console.log("")}
          >
            Join
          </Button>
        </View>
      </View>

      {/* <Portal>
            <Dialog
                    style={{ width: 300, alignSelf: "center" }}
                    visible={projectList == ""}
                    onDismiss={hideDialog}>
                <Dialog.Title>Alert</Dialog.Title>

                <Dialog.Content>
                    <Paragraph>
                        There is no suitable project for you. If you still want to join us,
                        please leave your contact information below. We will email/phone 
                        you once there is an eligible project for you.
                    </Paragraph>

                    <TextInput
                        mode="outlined"
                        style={{ height: 30 }}
                        placeholder="Phone number:"
                        /> */}
      {/* <Dialog.Input label="Phone number:"></Dialog.Input> */}
      {/* <Dialog.Input label="Email address:"></Dialog.Input> */}
      {/* </Dialog.Content>

                <Dialog.Actions>
                    <Button onPress={hideDialog}>Click</Button>
                </Dialog.Actions>

            </Dialog>
        </Portal> */}

      {/* View of Footer*/}
      <Footer />
    </SafeAreaView>
  );
};

export default ProjectAvailable;
