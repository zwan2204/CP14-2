/** @format */

import React from "react";
import { Text, View, SafeAreaView, Image, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../styles.js";
import { DataTable, Button, Colors, IconButton } from 'react-native-paper';

export default class ProjectApprovalScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingIsShow: false,
            reviewedIsShow: false,
            pendingIcon: "chevron-right",
            reviewedIcon: "chevron-right"
        };
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View
                    style={{
                        height: 140,
                        backgroundColor: "#00205B",
                        flexDirection: "row"
                    }}>
                    <Image
                        style={{ width: 200, height: 100, left: 100, top: 20 }}
                        source={require("../assets/header.png")}/>

                    <Button mode="text"
                        style={{
                            backgroundColor: "white",
                            width: 120,
                            height: 37,
                            position: "absolute",
                            bottom: 30,
                            right: 30,
                        }}
                        onPress={() => console.log()}>log out</Button>
                </View>
                {/* pending projects */}
                <View style={{ margin: 20 }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 35, color: "grey", flex: 1 }}>Project list
                        <Text style={{ fontSize: 10, color: "red", paddingLeft: 20 }}>
                                *You can leave comments by clicking a text field</Text>
                        </Text>
                        <Button
                            mode="outlined" style={{
                                backgroundColor: "white",
                                width: 120,
                                height: 37,
                            }}>Cancel</Button>
                    </View>

                    {/*Project basic information upload area*/}
        <View>
          <View
            style={{
              flex: 1,
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.subTitle}>Project titile: </Text>
            <Text
              mode="outlined"
              style={{ width: 800, height: 30, marginLeft: 10, borderWidth:1, borderColor:"black" }}
              onChangeText={(text) => setTitle(text)}
            />
          </View>
          <View style={{ flex: 6, flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.subTitle}>Project description: </Text>
              <Text
                mode="outlined"
                multiline={true}
                textAlignVertical="top"
                style={{
                  height: 130,
                  marginHorizontal: 10,
                  borderWidth:1, borderColor:"black"
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
                onChangeText={(text) => setDescription(text)}
              />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 15,
                }}
              >
                <Text style={styles.subTitle}>Ethics Approval Numbe:</Text>
                <TextInput
                  mode="outlined"
                  style={{ flex: 1, height: 30, marginHorizontal: 10 }}
                  onChangeText={(text) => setApprovalNumber(text)}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 15,
                }}
              >
                <Text style={styles.subTitle}>Governance Approval Number:</Text>
                <TextInput
                  mode="outlined"
                  style={{ flex: 1, height: 30, marginHorizontal: 10 }}
                  onChangeText={(text) => setGovernanceNumber(text)}
                />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.subTitle}>Location: </Text>
                <TextInput
                  mode="outlined"
                  style={{
                    height: 30,
                    margin: 10,
                    flex: 1,
                  }}
                  onChangeText={(text) => setLocation(text)}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={styles.subTitle}>Number of Subjects: </Text>
                <TextInput
                  mode="outlined"
                  style={{
                    height: 30,
                    margin: 10,
                    flex: 1,
                  }}
                  onChangeText={(text) => setSubjectNo(text)}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={styles.subTitle}>Study Duration: </Text>
                <TextInput
                  mode="outlined"
                  style={{ height: 30, margin: 10, flex: 1 }}
                  onChangeText={(text) => setDuration(text)}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={styles.subTitle}>Start Date: </Text>
                <TextInput
                  mode="outlined"
                  style={{
                    height: 30,
                    margin: 10,
                    flex: 1,
                  }}
                  onChangeText={(text) => setDate(text)}
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


