/** @format */

import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Image, ScrollView, FlatList } from "react-native";
import { styles } from "../styles.js";
import axios from "axios";
import { Button } from "react-native-paper";

const DATA = [
    {
        question: 'Are you female?',
        inclusionIDList: [2],
        exclusionIDList: [1],
        stateYes: false,
        stateNo: false,
    },

    {
        question: 'Are you a smoker?',
        inclusionIDList: [1,2],
        exclusionIDList: [],
        stateYes: false,
        stateNo: false,
    },

    {
        question: 'Are you pregnant',
        inclusionIDList: [2],
        exclusionIDList: [4],
        stateYes: false,
        stateNo: false,
    },

    {
        question: 'Your age is between 18 and 65',
        inclusionIDList: [3, 1],
        exclusionIDList: [],
        stateYes: false,
        stateNo: false,
    },
  ];

  const DATA2 = [
    {
        question: 'Are currently participating in otehr clinical studies?',
        inclusionIDList: [2],
        exclusionIDList: [1],
        stateYes: false,
        stateNo: false,
    },

    {
        question: 'Do you have a home partner and/or regular caregiver?',
        inclusionIDList: [1,2],
        exclusionIDList: [],
        stateYes: false,
        stateNo: false,
    },

    {
        question: 'Do you have the history of significant multiple and/or severe allergies?',
        inclusionIDList: [2],
        exclusionIDList: [4],
        stateYes: false,
        stateNo: false,
    },

    {
        question: 'Do you have High Blood Pressure (Hypertension)?',
        inclusionIDList: [3, 1],
        exclusionIDList: [],
        stateYes: false,
        stateNo: false,
    },
  ];

const QuestionAnswerPage = () => {
    const [buttonPA, clickButtonA] = useState("Hide");
    const [buttonPAClicked, setButtonA] = useState(false);
    const [theFirstQuestion, setFirstQ] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const [removedProjectSizeZero, setSize] = useState(false);
    const [removedProjects, setRemovedProjects] = useState({});
    

    const checkClick = () => {
        if (buttonPAClicked) {
            clickButtonA("Hide");
            setButtonA(false);
        } else {
            clickButtonA("Show");
            setButtonA(true);
        }
        console.log(removedProjects);
    };

    const handleClickLeft = (item) => {
        makeASelection(item, false);
        item.stateYes = true;
        item.stateNo = false;
    }

    const handleClickRight = (item) => {
        makeASelection(item, true);
        item.stateYes = false;
        item.stateNo = true;
    }

    const makeASelection = (item, inclusion) => {
        var tempList = removedProjects;
        var projectIDList = inclusion ? item.inclusionIDList : item.exclusionIDList;
        var num = 0
        /* if both YES button and NO button has not been clicked */
        if (!item.stateYes && !item.stateNo) {
            projectIDList.forEach(id => {
                if (tempList[id] == null) {
                    tempList[id] = 1;
                    num += 1;
                } else {
                    tempList[id] = tempList[id] + 1;
                }
            });
        }
        /* if YES button was clicked and NO button has not been clicked */
        else if (item.stateYes && !item.stateNo && inclusion == false) {}
        else if (item.stateYes && !item.stateNo && inclusion == true) {
            item.exclusionIDList.forEach(id =>{
                tempList[id] = tempList[id] - 1;
                if (tempList[id] == 0) {
                    tempList[id] = null;
                    num -= 1;
                }
            });

            projectIDList.forEach(id => {
                if (tempList[id] == null) {
                    tempList[id] = 1;
                    num += 1;
                } else {
                    tempList[id] = tempList[id] + 1;
                }
            });
        }
        /* if No button was clicked and Yes button has not been clicked */
        else if (!item.stateYes && item.stateNo && inclusion == true) {}
        else if (!item.stateYes && item.stateNo && inclusion == false) {
            item.inclusionIDList.forEach(id =>{
                tempList[id] = tempList[id] - 1;
                if (tempList[id] == 0) {
                    tempList[id] = null;
                    num -= 1;
                }
            });

            projectIDList.forEach(id => {
                if (tempList[id] == null) {
                    tempList[id] = 1;
                    num += 1;
                } else {
                    tempList[id] = tempList[id] + 1;
                }
            });
        }
        setSize(num > 0 ? "true" : "false");
        setRemovedProjects(tempList);
    }

    const removeThisQuestion = (item) => {
        if (removedProjects && removedProjectSizeZero) {
            /* check whether the IDs in the inclusionIDList are all included in the removedProjects list */
            for (let index = 0; index < item.inclusionIDList.length; index++) {
                /* if an ID is not in the list, this question should not be removed, return false */
                if (removedProjects[item.inclusionIDList[index]] == null) {
                    return false;
                }
            }
            /* check whether the IDs in the exclusionIDList are all included in the removedProjects list */
            for (let index = 0; index < item.exclusionIDList.length; index++) {
                // if (!removedProjects.includes(item.exclusionIDList[index])) {
                if (removedProjects[item.exclusionIDList[index]] == null) {
                    return false;
                }
            }
            /* this question should be removed */
            return true;
        } else {
            return false;
        }
    }

    const ItemInPartA = ({item}) => {
        return(
            <View style={styles.item}>
                <Text style={styles.questionSentence}>{item.question}</Text>
                <View style={styles.tickContianer}>
                    {/* Yes button */}
                    <TouchableOpacity 
                        onPress={() => {handleClickLeft(item), setSelectedId(item.question + item.stateYes)}}
                        style={item.stateYes ? styles.hightlightTickBox : styles.tickBox}>
                    </TouchableOpacity>

                    {/* No button */}
                    <TouchableOpacity 
                        onPress={() => {handleClickRight(item), setSelectedId(item.question + item.stateYes)}} 
                        style={item.stateNo ? styles.hightlightTickBox : styles.tickBox}>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    const renderItemA = ({ item }) => (
        <ItemInPartA item={item}/>
    );

    const ItemInPartB = ({item}) => {
        if (removeThisQuestion(item)) {
            return null;
        } else {
            return(
                <View style={styles.item}>
                    <Text style={styles.questionSentence}>{item.question}</Text>
                    <View style={styles.tickContianer}>
                        {/* Yes button */}
                        <TouchableOpacity 
                            onPress={() => {handleClickLeft(item), setSelectedId(item.question + item.stateYes)}}
                            style={item.stateYes ? styles.hightlightTickBox : styles.tickBox}>
                        </TouchableOpacity>

                        {/* No button */}
                        <TouchableOpacity 
                            onPress={() => {handleClickRight(item), setSelectedId(item.question + item.stateYes)}} 
                            style={item.stateNo ? styles.hightlightTickBox : styles.tickBox}>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }

    const renderItemB = ({ item }) => (
        <ItemInPartB item={item}/>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* header view */}
            <View style={{ height: "20%", backgroundColor: "#00205B", flexDirection: "row" }}>
                <Image style={{ width: 200, height: 100, left: 100, top: 20 }} source={require('../assets/header.png')} />
            </View>
            
            <View style={{backgroundColor: "white", height: "80%", padding: "5%", paddingTop: "2%"}}>
                {/* title information */}
                <View style={{flexDirection: "row", alignContent:"center", alignItems:"center"}}>
                    <Text style={{color: "#707070", fontSize: "3em", fontWeight:"bold", alignSelf:"flex-start"}}>Questionnaire</Text>
                    <Text style={{color: "#707070", fontSize: "2em", fontWeight:"bold", paddingLeft: "3%"}}>- General Questions</Text>
                </View>
                
                {/* This section contains all general questions and tick boxes */}
                <View style={styles.questionPageContainer}>
                    <View style={{width:"85%", height:"100%", padding:"1%"}}>
                        {/* Part A section */}
                        {/* Title bar information */}
                        <View style={styles.partABTitleBar}>
                            <Text style={styles.partABTitleText}>Part A</Text>
                            <TouchableOpacity 
                                onPress={checkClick} 
                                style={styles.partAButton}>
                                    <Text style={{color:"white"}}>{buttonPA}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Question contianer */}
                        <ScrollView style={{height:"34%", width:"100%", paddingTop:"1.5%"}}>
                            <FlatList data={DATA}
                                renderItem={renderItemA} 
                                keyExtractor={item => item.question} 
                                extraData={selectedId}
                                showsVerticalScrollIndicator={true}/>
                        </ScrollView>

                        {/* Part B section */}
                        {/* Title bar information */}
                        <View style={[styles.partABTitleBar, {justifyContent:"space-between", paddingRight:"2%", paddingTop:"2%"}]}>
                            <Text style={styles.partABTitleText}>Part B</Text>
                            <View style={styles.partABTitleYesNo}>
                                <Text style={{fontSize:"1.2em"}}>Yes</Text>
                                <Text style={{fontSize:"1.2em"}}>No</Text>
                            </View>
                        </View>

                        {/* Question contianer */}
                        <ScrollView style={{height:"52%", width:"100%", paddingTop:"1.5%"}}>
                            <FlatList
                                data={DATA2} 
                                renderItem={renderItemB} 
                                keyExtractor={item => item.question} 
                                extraData={selectedId}
                            />
                        </ScrollView>

                    </View>

                    {/* This section contains the process bar */}
                    <View style={styles.processBarContainer}>

                    </View>
                </View>

            </View>

            {/* This section contains the process bar */}
            <Button style={styles.questionPageButton} title="Next" onPress={() => console.log("clicked next")}/>
            <Button mode="outlined" onPress={() => console.log('Pressed')}>Press me </Button>

            {/* View of Footer*/}
            <View style={{height: "5%", backgroundColor: "#00205B", justifyContent: "center"}}>
                <Text style={{ color: "white", fontSize: 17, marginLeft: 10 }}>
                    NSW Health website | Disclaimer | Privacy | Copyright | Accessibility
                    | Site map
                </Text>
            </View>
        
        </SafeAreaView>
    );
}

export default QuestionAnswerPage;


// export default class ParticipantPage extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             title: "- General Questions",
//             questions: [], //used to store questions.
//             tickBoxes: [], //used to store tick box.
//             answer: [], //used to store user's answers. 0 is No, 1 is Yes.
//             processIndex: 0,
//             totalQuestions: 0,
//             buttonPA: "Hide",
//             buttonPAClicked: false,
//         };
//     }

//     const 

//     clickButtonA = () => {
//         if (buttonPAClicked) {
//             this.setState({ buttonPA: "Hide"});
//             buttonPAClicked = false
//         } else {
//             this.setState({ buttonPA: "Show"});
//             buttonPAClicked = true
//         }
//     }; 

//     render() {
        
//     }
    
// }

{/* <View style={{backgroundColor: "yellow", flexDirection:"row", width:"75%", justifyContent:"space-between"}}>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{color: "#707070", fontSize: "2em", fontWeight:"bold"}}>Yes</Text>
                            <Text style={{color: "#707070", fontSize: "2em", fontWeight:"bold", paddingLeft: 50, paddingRight: 20}}>No</Text>
                        </View>
                    </View> */}

