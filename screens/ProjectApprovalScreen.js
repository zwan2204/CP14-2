/** @format */

import React from "react";
import { Text, View, SafeAreaView, Image, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../styles.js";
import { DataTable, Button, Colors, IconButton } from 'react-native-paper';
import { Modal, Input } from 'antd';

export default class ProjectApprovalScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingIsShow: false,
            reviewedIsShow: false,
            pendingIcon: "chevron-right",
            reviewedIcon: "chevron-right",
            isModalVisible: false
        };
    }

    showModal = () => {
        this.setState({ isModalVisible: true });
    }

    handleOk = () => {
        this.setState({ isModalVisible: false });
    }
    handleCancel = () => {
        this.setState({ isModalVisible: false });
    }

    render() {
        const { TextArea } = Input;
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
                        source={require("../assets/header.png")} />

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
                    <View style={{ flexDirection: "row", paddingBottom: 20 }}>
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
                                style={{ width: 800, height: 30, marginLeft: 10, borderWidth: 1, borderColor: "black", borderRadius: 5 }}
                                onChangeText={(text) => setTitle(text)}
                            />
                        </View>
                        <View style={{ flex: 6, flexDirection: "row" }}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.subTitle}>Project description: </Text>
                                
                                
                            

                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginTop: 15,
                                }}
                                >
                                    <Text style={styles.subTitle}>Ethics Approval Numbe:</Text>
                                    <Text
                                        style={{ flex: 1, height: 30, marginHorizontal: 10, borderWidth: 1, borderColor: "black", borderRadius: 5 }}
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
                                    <Text
                                        style={{ flex: 1, height: 30, marginHorizontal: 10, borderWidth: 1, borderColor: "black", borderRadius: 5 }}
                                        onChangeText={(text) => setGovernanceNumber(text)}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={styles.subTitle}>Location: </Text>
                                    <TextInput
                                        style={{
                                            height: 30,
                                            margin: 10,
                                            flex: 1,
                                            borderWidth: 1, borderColor: "black", borderRadius: 5
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
                                    <Text
                                        style={{
                                            height: 30,
                                            margin: 10,
                                            flex: 1,
                                            borderWidth: 1, borderColor: "black", borderRadius: 5
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
                                    <Text
                                        style={{ height: 30, margin: 10, flex: 1, borderWidth: 1, borderColor: "black", borderRadius: 5 }}
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
                                    <Text
                                        style={{
                                            height: 30,
                                            margin: 10,
                                            flex: 1,
                                            borderWidth: 1, borderColor: "black", borderRadius: 5
                                        }}
                                        onChangeText={(text) => setDate(text)}
                                    />
                                </View>

                            </View>
                        </View>

                    </View>


                </View>
                <TouchableOpacity onPress={this.showModal.bind(this)}>
                                    <Text
                                        multiline={true}
                                        textAlignVertical="top"
                                        style={{
                                            height: 130,
                                            marginHorizontal: 10,
                                            borderWidth: 1, borderColor: "black", borderRadius: 5
                                        }}>ijasdfljsklfndskjfkngmlewjfknmdlewjfngfkmeljfn,ekdmsjnkjsdjfksmlvnxkchvoisjofjdfioefo;hasofas;dfsiofj
                                    </Text>
                                </TouchableOpacity>

                                <Modal footer={null} align="middle" title="Please leave comment" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel} >
                                <TextArea showCount maxLength={100}/>
                                </Modal>
            </SafeAreaView>
        );




    }
}


