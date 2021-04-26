/** @format */

import React, { useRef, useState } from "react";
import { 
    Text, 
    View, 
    TouchableOpacity, 
    SafeAreaView, 
    Image, 
    ScrollView, 
    FlatList, 
} from "react-native";
import { styles } from "../styles.js";
import axios from "axios";
import { Link } from "react-router-dom";

let currentData = [];

let DATA_Demo = [
    {
        projectID: 1,
        age: "null,18",
        gender: "male",
        healthy: true,
        smoking: true,
        pregnant: false,
        lactating: false,
        planning: false,
    },

    {
        projectID: 2,
        age: "18,65",
        gender: "male",
        healthy: true,
        smoking: true,
        pregnant: false,
        lactating: false,
        planning: false,
    },

    {
        projectID: 3,
        age: "30,60",
        gender: "male",
        healthy: true,
        smoking: false,
        pregnant: false,
        lactating: false,
        planning: false,
    },

    {
        projectID: 4,
        age: "65,null",
        gender: "male",
        healthy: true,
        smoking: false,
        pregnant: false,
        lactating: false,
        planning: false,
    },

    {
        projectID: 5,
        age: "18,60",
        gender: "male",
        healthy: false,
        smoking: false,
        pregnant: false,
        lactating: false,
        planning: false,
    },

];

let DATA_General = [
    {
        question: 'Are currently participating in otehr clinical studies?',
        inclusionIDList: [2],
        exclusionIDList: [1],
        stateYes: false,
        stateNo: false,
        num: 0,
    },

    {
        question: 'Do you have a home partner and/or regular caregiver?',
        inclusionIDList: [1,2],
        exclusionIDList: [],
        stateYes: false,
        stateNo: false,
        num: 1,
    },

    {
        question: 'Do you have the history of significant multiple and/or severe allergies?',
        inclusionIDList: [2],
        exclusionIDList: [3],
        stateYes: false,
        stateNo: false,
        num: 2,
    },

    {
        question: 'Do you have High Blood Pressure (Hypertension)? Do you have High Blood Pressure (Hypertension)? Do you have High Blood Pressure (Hypertension)? Do you have High Blood Pressure (Hypertension)?',
        inclusionIDList: [3, 1],
        exclusionIDList: [],
        stateYes: false,
        stateNo: false,
        num: 3,
    },

    {
        question: 'Do you have High Blood Pressure (Hypertension)??',
        inclusionIDList: [3, 1],
        exclusionIDList: [],
        stateYes: false,
        stateNo: false,
        num: 4,
    },

    {
        question: 'Do you have High Blood Pressure (Hypertension)?11',
        inclusionIDList: [3, 1],
        exclusionIDList: [],
        stateYes: false,
        stateNo: false,
        num: 5,
    },

    {
        question: 'Do you have High Blood Pressure (Hypertension)?111',
        inclusionIDList: [3],
        exclusionIDList: [4],
        stateYes: false,
        stateNo: false,
        num: 5,
    },

    {
        question: 'Do you have High Blood Pressure (Hypertension)?111 1 Do you have High Blood Pressure (Hypertension)?1111 Do you have High Blood Pressure (Hypertension)?1111 Do you have High Blood Pressure (Hypertension)?1111 Do you have High Blood Pressure (Hypertension)?1111 Do you have High Blood Pressure (Hypertension)?1111 Do you have High Blood Pressure (Hypertension)?1111 Do you have High Blood Pressure (Hypertension)?1111',
        inclusionIDList: [4, 5],
        exclusionIDList: [],
        stateYes: false,
        stateNo: false,
        num: 5,
    },
];

let DATA_Specific = [
    {
        question: '2, 1',
        inclusionIDList: [2],
        exclusionIDList: [1],
        stateYes: false,
        stateNo: false,
        num: 0,
    },

    {
        question: '2',
        inclusionIDList: [2],
        exclusionIDList: [],
        stateYes: false,
        stateNo: false,
        num: 1,
    },

    {
        question: '3, 1',
        inclusionIDList: [3, 1],
        exclusionIDList: [],
        stateYes: false,
        stateNo: false,
        num: 2,
    },

    {
        question: '1, 5',
        inclusionIDList: [1],
        exclusionIDList: [5],
        stateYes: false,
        stateNo: false,
        num: 3,
    },

    {
        question: '4',
        inclusionIDList: [],
        exclusionIDList: [4],
        stateYes: false,
        stateNo: false,
        num: 3,
    },

];

let availableProjects = [];


const QuestionAnswerPage = (props) => {
    const [selectedId, setSelectedId] = useState(null);
    const [removedProjectSizeZero, setSize] = useState(false);
    const [removedProjects, setRemovedProjects] = useState({});
    const [showingMessage, setShowingMessage] = useState(false);
    const [contentOffset, setContentOffset] = React.useState({ x: 0, y: 0 });
    const [contentSize, setContentSize] = React.useState(0);
    const [scrollViewHeight, setScrollViewHeight] = React.useState(0);
    const scrollElementHeightPercent = 45;
    const scrollPerc = (contentOffset.y / (contentSize - scrollViewHeight)) 
        * (100 - scrollElementHeightPercent);
    const [questionsLeft, setQuestionLeft] = React.useState(0);
    // const [availableProjects, setAvailableProjects] = useState([]);

    /* 0 means on the page of personal information page, 1 means general question page
    2 means specific question page */
    const [step, setStep] = useState(0);
    
    /* questions needs to answer by workers */
    const [requireHCWorker, setRequireHCW] = useState(false);

    /* this is used to set sub-title of the page */
    const [subTitle, setSubTitle] = useState("Demographic Information");

    /* this is used to set sub-title of the page */
    const [buttonText, setButtonText] = useState("Confirm");

    var num = 0;

    const stepForward = (isForward) => {
        let currentStep = step;
        if (isForward && currentStep < 3) {
            currentStep += 1;
        }
        if (!isForward && currentStep > 0) {
            currentStep -= 1;
        }
        setStep(currentStep);
        switchContent(currentStep);
    }

    const switchContent = (step) => {
        if (step == 0) {
            setSubTitle("Demographic Information");
            setButtonText("Confirm");
        } else if (step == 1) {
            setSubTitle("General Questions");
            setButtonText("Next");
            console.log("switch时候的av： " + availableProjects);
            washQuestions(DATA_General, availableProjects);
            // currentData = DATA_General;
        } else if (step == 2) {
            setSubTitle("Specific Questions");
            setButtonText("Submit");
            console.log("洗specific的avai" + availableProjects);
            washQuestions(DATA_Specific, availableProjects);
            // currentData = DATA_Specific;
        } else {
            /* send eligible project's IDs */
        }
    }

    let age = 30; //假设获得的年龄
    const [gender, setGender] = useState("male");
    const [healthy, setHealthy] = useState(false);
    const [smoking, setSmoking] = useState(false);
    const [pregnant, setPregnant] = useState(false);
    const [lactating, setLactating] = useState(false);
    const [planning, setPlanning] = useState(false);
    
    const washProjects = (data) => {
        let tempData = data;
        let availabelData = [];
        let removedlData = {};
        tempData.forEach(item => {
            if (item.gender == gender && item.healthy == healthy && 
                item.smoking == smoking && item.pregnant == pregnant &&
                item.lactating == lactating && item.planning == planning) {
                    availabelData.push(item.projectID);
            } else {
                removedlData[item.projectID] = 1;
            }
        });
        //wash data_general based on the user's selections.
        console.log("wash project avai: " + availabelData);
        // setAvailableProjects(availabelData);
        availableProjects = availabelData;
        setRemovedProjects(removedlData);
        washQuestions(DATA_General, availabelData);
        washQuestions(DATA_Specific, availabelData);
    }

    const washQuestions = (data, availabel) => {
        let tempData = data;
        let filteredData = [];
        tempData.forEach(item => {
            let shouldRemove = true;
            for(let index = 0; index < item.inclusionIDList.length; index++) {
                for (let index_2 = 0; index_2 < availabel.length; index_2++) {
                    if (availabel[index_2] == item.inclusionIDList[index]) {
                        shouldRemove = false;
                        break;
                    }
                }
                if (!shouldRemove) {break;}
            }
            for(let index = 0; index < item.exclusionIDList.length; index++) {
                if (!shouldRemove) {break;}
                for (let index_2 = 0; index_2 < availabel.length; index_2++) {
                    if (availableProjects[index_2] == item.exclusionIDList[index]) {
                        shouldRemove = false;
                        break;
                    }
                }
                if (!shouldRemove) {break;}
            }
            if (!shouldRemove) {
                filteredData.push(item);
            }
        });
        currentData = filteredData;
    }

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
        var num = 0;

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
            item.exclusionIDList.forEach(id => {
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
            item.inclusionIDList.forEach(id => {
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
        if ((item.stateYes == false) && 
            (item.stateNo == false) && removedProjects && removedProjectSizeZero) {
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

    const getAvailableProjects = () => {
        let projectList = [];
        for (let index = 0; index < currentData.length; index++) {
            let questionItem = currentData[index];
            let incluArray = questionItem.inclusionIDList;
            let excluArray = questionItem.exclusionIDList;
            let removeList = removedProjects;
            for (let index2 = 0; index2 < incluArray.length; index2++) {
                if (removeList[incluArray[index2]] == null) {
                    projectList.push(incluArray[index2]);
                }
            }
            for (let index2 = 0; index2 < excluArray.length; index2++) {
                if (removeList[excluArray[index2]] == null) {
                    projectList.push(excluArray[index2]);
                }
            }
        }
        let unique = new Set(projectList);
        projectList = [...unique];
        return projectList;
    }

    const sleep = (milliseconds) => {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    const Item = ({item}) => {
        /* needs to be changed, need to get the total number of questions*/
        num += 1;
        if (num == 1) {
            sleep(100);
            let avp = getAvailableProjects();
            // setAvailableProjects(avp);
            availableProjects = avp;
            if (avp.length == 0) {
                setShowingMessage(true);
            } else {
                setShowingMessage(false);
            }
        }

        if (step != 0 && removeThisQuestion(item)) {
            return null;
        } else {
            return(
                <View style={[styles.item]}>
                    <Text style={styles.questionSentence}>{item.question}</Text>
                    <View style={styles.tickContianer}>
                        {/* Yes button */}
                        <TouchableOpacity 
                            onPress={() => {
                                handleClickLeft(item), 
                                setSelectedId(item.question + item.stateYes)}}
                            style={item.stateYes ? styles.hightlightTickBox : styles.tickBox}>
                        </TouchableOpacity>

                        {/* No button */}
                        <TouchableOpacity 
                            onPress={() => {
                                handleClickRight(item), 
                                setSelectedId(item.question + item.stateYes)}} 
                            style={item.stateNo ? styles.hightlightTickBox : styles.tickBox}>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }

    const renderItem = ({ item }) => (
        <Item item={item}/>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* header view */}
            <View style={{height: "20%", backgroundColor: "#00205B", flexDirection: "row"}}>
                <Image 
                    style={{width: 200, height: 100, left: 100, top: 40}} 
                    source={require('../assets/header.png')}/>
            </View>
            
            <View style={{height: "75%"}}>
                {/* title information */}
                <View style={{flexDirection: "row", height:"10%"}}>
                    <Text style={styles.titleInfoP1} onPress={()=>console.log(availableProjects, currentData)}>
                        Questionnaire
                    </Text>
                    <Text style={styles.titleInfoP2}>
                        - {subTitle}
                    </Text>
                </View>
                
                {/* This section contains all general questions and tick boxes */}
                <View style={[styles.questionPageContainer, {height:"70%"}]}>
                    <View style={{width:"80%"}}>
                        {/* General question section */}
                        {/* Title bar information */}
                        <View style={styles.partABTitleBar}>
                            <Text style={styles.partABTitleText}>
                                *{questionsLeft} Questions Left
                            </Text>
                            <View style={styles.partABTitleYesNo}>
                                <Text style={{fontSize:"1.2em"}}>Yes</Text>
                                <Text style={{fontSize:"1.2em"}}>No</Text>
                            </View>
                        </View>

                        {/* Question contianer */}
                        <ScrollView 
                            style={{maxHeight:"85%", width:"100%", paddingLeft:"5%"}}
                            showsVerticalScrollIndicator = {false}
                            onScroll={e => {
                                setContentOffset(e.nativeEvent.contentOffset);
                            }}
                            onContentSizeChange={(_, height) => {
                                setContentSize(height);
                            }}
                            onLayout={e => {
                                setScrollViewHeight(e.nativeEvent.layout.height);
                            }}>
                            {step != 0 && 
                            <FlatList
                                data={currentData} 
                                renderItem={renderItem} 
                                keyExtractor={item => item.question} 
                                extraData={selectedId}
                            />}
                            {step == 0 && 
                            <View></View>}
                        </ScrollView>
                    </View>

                    {/* scroll bar */}
                    <View style={styles.scrollBarContainer}>
                        <View 
                            style={[
                                styles.scrollBarOutside, 
                                {opacity: contentSize >= scrollViewHeight ? 1 : 0}]}>
                            <View 
                                style={[
                                    styles.scrollBarInside, 
                                    {top:`${Number(scrollPerc || 0).toFixed(0)}%`, 
                                        height:`${scrollElementHeightPercent}%`, 
                                        opacity: contentSize >= scrollViewHeight ? 1 : 0}]}>
                            </View>
                        </View>
                    </View>

                    {/* This section contains the process bar */}
                    <View style={styles.processBarContainer}>
                        <View style={[styles.processBarCircle , {backgroundColor:"#00205B"}]}>
                            <Text style={{color:"white", paddingLeft:5}}>1</Text>
                            <Text style={{position:"absolute", paddingLeft:30, color:"#00205B"}}>
                                Demographic Information
                            </Text>
                        </View>
                        <View 
                            style={[styles.processBarPole,
                            {backgroundColor: step >= 1 ? "#00205B" : "white"}]}>
                        </View>
                        <View 
                            style={[styles.processBarCircle, 
                            {backgroundColor: step >= 1 ? "#00205B" : "white"}]}>
                            <Text style={{color: step >= 1 ? "white" : "grey", paddingLeft:5}}>2</Text>
                            <Text style={styles.processBarText}>
                                General Questions
                            </Text>
                        </View>
                        <View style={[
                            styles.processBarPole, 
                            {backgroundColor: step >= 2 ? "#00205B" : "white"}]}>
                        </View>
                        <View style={[
                            styles.processBarCircle , 
                            {backgroundColor: step >= 2 ? "#00205B" : "white"}]}>                        
                            <Text style={{color: step >= 2 ? "white" : "grey", paddingLeft:5}}>3</Text>
                            <Text style={styles.processBarText}>
                                Specific Questions
                            </Text>
                        </View>
                        <View style={[
                            styles.processBarPole, 
                            {backgroundColor: step >= 3 ? "#00205B" : "white"}]}>
                        </View>
                        <View style={[
                            styles.processBarCircle , 
                            {backgroundColor: step >= 3 ? "#00205B" : "white"}]}>                        
                            <Text style={{color: step >= 3 ? "white" : "grey", paddingLeft:5}}>4</Text>
                            <Text style={styles.processBarText}>
                                Available Projects
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Button to next page */}
                <View style={styles.extraInformation}>
                    <Text style={{opacity: showingMessage? 1 : 0, fontSize: "1.2em", color:"red"}}>
                        *Sorry, no project matches your condition.
                    </Text>
                    <View style={[
                        styles.buttonContainer, 
                        {justifyContent: step > 0 ? "space-between" : "center"}]}>
                        {step > 0 && <TouchableOpacity 
                            style={[
                                styles.questionnaireButton, 
                                {backgroundColor:"#00205B"}]}
                            onPress={() => {
                                stepForward(false)}}>
                                    <Text style={{color: "white"}}>Back</Text>
                        </TouchableOpacity>}
                        <TouchableOpacity
                            style={[
                                styles.questionnaireButton, 
                                {backgroundColor: showingMessage ? "lightgrey" : "#00205B"}]}
                            onPress={() => {
                                step == 0 ? washProjects(DATA_Demo) : null,
                                stepForward(true)}}>
                                <Text style={{color: "white"}}>{buttonText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

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
