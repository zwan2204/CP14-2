/** @format */

import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, FlatList, ScrollView, CheckBox, Linking } from "react-native";
import { styles } from "../styles.js";
import axios from "axios";
import HeaderSecond from "../screens/HeaderSecond";
import Footer from "../screens/Footer";
import { Icon } from 'react-native-elements'
import { updateUserContact } from "../modules/QuestionnaireModule_data";

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
  const userID = localStorage.getItem("userId");
  const projectList = props.location.projectIDs;
  const hcWorker = props.location.hcWorker;
  const [projectAvailable, setProjectAvailable] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [title, setTitile] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [byPhone, setByPhone] = useState(false);
  const [byEmail, setByEmail] = useState(false);
  const [phoneNum, setNumber] = useState("+61 0");
  const [msg, setMsg] = useState("");
  const { history } = props;
  const isEmpty = projectList == "" || projectList == undefined;

  const [visible, setVisible] = React.useState(projectList == "" || projectList == undefined);
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
            date: response.data[i].date,
            numLeft: parseInt(response.data[i].subjectNo) - 
                parseInt(response.data[i].currentNumParticipant)
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

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between"
            }}
          >
            <Text
              style={{ color: color, margin: 3, flex: 1, textAlign: "left" }}
            >
                {/* the current number / total number */}
                Remaining slots: {item.numLeft}
            </Text>

            <Text
              style={{ color: color, margin: 3, flex: 1, textAlign: "right" }}
            >
              {item.date}
            </Text>
          </View>
        </View>
      </Card>
    );
  };

  const checkAndSendNumber = () => {
    if (!byEmail && !byPhone) {
      setMsg("Please choose your prefered method of contact");

    } else if (byEmail && !byPhone) {
      hideDialog();
      updateUserContact(userID, "email", "");
      history.push({
        pathname: "/"
      });

    } else if (byEmail && byPhone) {
      let number = parseInt(phoneNum);
      if (isNaN(number)) {
        setMsg("Numbers only");

      } else if (phoneNum.length != 14) {
        setMsg("Please check your phone number again");
      } else {
        hideDialog();
        updateUserContact(userID, "both", phoneNum);
        history.push({
          pathname: "/"
        });
      }
    } else if (phoneNum == "" && byPhone) {
      setMsg("Please enter your phone number");

    } else if (phoneNum != "" && byPhone) {
      let number = parseInt(phoneNum);
      if (isNaN(number)) {
        setMsg("Numbers only");

      } else if (phoneNum.length != 14) {
        setMsg("Please check your phone number again");
      } else {
        hideDialog();
        updateUserContact(userID, "phone", phoneNum);
        history.push({
          pathname: "/"
        });
      }
    }
  }

  const choosePhone = () => {
    setByPhone(!byPhone);
    //setByEmail(false);
  };

  const chooseEmail = () => {
    setByEmail(!byEmail);
    //setByPhone(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderSecond history={props.history} />

      <View style={{ height: "80%" }}>
        <View style={{ flexDirection: "row", height: "12%" }}>
          <Text
            style={styles.titleInfoP1}
            onPress={() => console.log(projectList)}
          >
            Available projects for you
          </Text>
        </View>

        <View style={[styles.questionPageContainer, { height: "70%" }]}>
          {isEmpty ?
            <View style={{
              width: "82%", flexDirection: "row",
              justifyContent: "center", paddingTop: "5%"
            }}>
              <Text style={{ fontSize: "1.2em" }}>
                Sorry, there is no project for you. You can leave your contact information
            </Text>
              <Text
                style={{ fontSize: "1.2em", color: "red", paddingLeft: 10, paddingRight: 10 }}
                onPress={showDialog}
              >
                here
            </Text>
              <Text style={{ fontSize: "1.2em" }}>
                again
            </Text>
            </View>
            :
            <View
              style={{
                width: "82%",
                flexDirection: "row",
                paddingTop: "2%",
                height: "100%",
                paddingLeft: "5%"
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
          }

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

        {isEmpty ? null :
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
              //remove the console.log(""), and place your consent website link/
              //your consent page in React Native format here. i.e
              //onPress={() => Linking.openURL('http://google.com')}
              //you can get the current project's ID by calling item.id
              onPress={() => console.log("")}
            >
              Join
          </Button>
          </View>
        }
      </View>


      <Portal>
        <Dialog
          style={{ width: 500, alignSelf: "center" }}
          // visible={projectList == "" || projectList == undefined}
          visible={visible}
          onDismiss={hideDialog}>

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Dialog.Title>Sorry, no eligible projects for you</Dialog.Title>
            <Icon name={'close'} onPress={hideDialog} />
          </View>

          <Dialog.Content>
            <Paragraph style={{ paddingBottom: 20, fontSize: "1em" }}>
              If you still want to join us,
              please choose the preferred method of contact below. We will email/phone
              you once there is an eligible project.
                    </Paragraph>

            <View style={{
              flexDirection: "row", alignItems: "center",
              alignContent: "center", paddingRight: "5%"
            }}>
              <Text style={{ fontSize: "1.2em", paddingRight: 20, width: 120 }}>
                By Phone
                        </Text>
              <CheckBox
                style={{ height: "1.5em", width: "1.5em" }}
                value={byPhone}
                onValueChange={choosePhone}
              />
            </View>

            {byPhone ?
              <TextInput
                mode="outlined"
                maxLength={14}
                style={{ height: 30, width: "60%", padding: "2%" }}
                value={phoneNum}
                onChangeText={text => (setNumber(text))}
              />
              : null}

            <View style={{
              flexDirection: "row", alignItems: "center",
              alignContent: "center", paddingRight: "5%", paddingTop: "3%"
            }}>
              <Text style={{ fontSize: "1.2em", paddingRight: 20, width: 120 }}>
                By Email
                        </Text>
              <CheckBox
                style={{ height: "1.5em", width: "1.5em" }}
                value={byEmail}
                onValueChange={chooseEmail}
              />
            </View>

          </Dialog.Content>

          <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "red" }}>{msg}</Text>
          </View>

          <Dialog.Actions>
            <Button onPress={checkAndSendNumber}>Consent to be contacted</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* View of Footer*/}
      <Footer />
    </SafeAreaView>
  );
};

export default ProjectAvailable;
