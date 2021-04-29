/** @format */

import React, { useEffect, useReducer, useRef, useState } from "react";
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
import {QuestionDemo} from "../screens/QuestionnaireModule_demo.js";
import getUserAge from "../screens/QuestionnaireModule_data";
import {getUserInfo, updateUserInfo} from "../screens/QuestionnaireModule_data";


let currentData = [];

let DATA_Demo = [
    {
        projectID: 1,
        age: "null,18",
        gender: "male",
        healthy: "Yes",
        english: "Yes",
        smoking: false,
        pregnant: false,
        lactating: false,
        planning: false,
    },

    {
        projectID: 2,
        age: "18,65",
        gender: "male",
        english: "Yes",
        healthy: "Yes",
        smoking: false,
        pregnant: false,
        lactating: false,
        planning: false,
    },

    {
        projectID: 3,
        age: "18,65",
        gender: "male",
        english: "Yes",
        healthy: "Yes",
        smoking: false,
        pregnant: false,
        lactating: false,
        planning: false,
    },

    {
        projectID: 4,
        age: "18,null",
        gender: "male",
        english: "Yes",
        healthy: "Yes",
        smoking: false,
        pregnant: false,
        lactating: false,
        planning: false,
    },

];

let DATA_General = [
    {
        question: 'Are currently participating in other clinical studies?',
        inclusionIDList: [1],
        exclusionIDList: [2],
        stateYes: false,
        stateNo: false,
        state: "notComplete",
    },

    {
        question: 'Do you have a home partner and/or regular caregiver?',
        inclusionIDList: [1],
        exclusionIDList: [3],
        stateYes: false,
        stateNo: false,
        state: "notComplete",
    },

    {
        question: 'Do you have the history of significant multiple and/or severe allergies?',
        inclusionIDList: [2],
        exclusionIDList: [3],
        stateYes: false,
        stateNo: false,
        state: "notComplete",
    },

    {
        question: 'Do you have the history of significant multiple and/or severe allergies2?',
        inclusionIDList: [3, 1],
        exclusionIDList: [],
        stateYes: false,
        stateNo: false,
        state: "notComplete",
    },

    {
        question: 'Do you have High Blood Pressure (Hypertension)?',
        inclusionIDList: [3],
        exclusionIDList: [4],
        stateYes: false,
        stateNo: false,
        state: "notComplete",
    },

    {
        question: 'Are you mentally or legally incapacitated or has had significant history of recent mental health issues?',
        inclusionIDList: [3],
        exclusionIDList: [4],
        stateYes: false,
        stateNo: false,
        state: "notComplete",
    },

];

let DATA_Specific = [
    {
        question: 'Are you mentally or legally incapacitated or has had significant history of recent mental health issues?',
        inclusionIDList: [2],
        exclusionIDList: [1],
        stateYes: false,
        stateNo: false,
        state: "notComplete",
    },

    {
        question: 'Do you have deep hip joint or anterior groin pain?',
        inclusionIDList: [2],
        exclusionIDList: [],
        stateYes: false,
        stateNo: false,
        state: "notComplete",
    },

    {
        question: 'Are you receiving treatment for Ulcerative Colitis?',
        inclusionIDList: [3, 1],
        exclusionIDList: [],
        stateYes: false,
        stateNo: false,
        state: "notComplete",
    },

    {
        question: 'Do you have current major or mild depression despite ongoing treatment?',
        inclusionIDList: [1],
        exclusionIDList: [3],
        stateYes: false,
        stateNo: false,
        state: "notComplete",
    },

    {
        question: 'Are you symptomatic with radiating low back and leg pain for greater than 6 months prior to surgery with a clinical diagnosis of lumbar protruding disc?',
        inclusionIDList: [],
        exclusionIDList: [4],
        stateYes: false,
        stateNo: false,
        state: "notComplete",
    },

];

let availableProjects = [];
// let userInformation = getUserInfo();


const QuestionAnswerPage = (props) => {
    const [selectedId, setSelectedId] = useState(null);
    const [removedProjectSizeZero, setSize] = useState(false);
    const [removedProjects, setRemovedProjects] = useState({});
    const [contentOffset, setContentOffset] = React.useState({ x: 0, y: 0 });
    const [contentSize, setContentSize] = React.useState(0);
    const [scrollViewHeight, setScrollViewHeight] = React.useState(0);
    const scrollElementHeightPercent = 45;
    const scrollPerc = (contentOffset.y / (contentSize - scrollViewHeight)) 
        * (100 - scrollElementHeightPercent);
    const [questionsLeft, setQuestionLeft] = React.useState(0);

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

    /* get user's age */
    let userAge = getUserAge();

    /* retrieve user general information data */
    const [getUserData, setGet] = useState(false);
    const reducer = (state, action) => ({ ...state, ...action });
    const [userInfo, setDemoInfo] = useReducer(reducer, getUserInfo({setGet}));

    /* error messages: restrict moving to the next page */
    const showingDemoError = (userInfo.gender == "" || userInfo.healthy == "" ||
        userInfo.location == "" || userInfo.english == "") ? true : false;
    const showingGeneralAmptyError = (step == 1 && currentData.length == 0) ? true : false;
    const showingSpecificAmptyError = (step == 2 && currentData.length == 0) ? true : false;
    const [showingNoMatchMessage, setShowingMessage] = useState(false);
    const [showingNotCompleteMsg, setNotCompleteMsg] = useState(false);

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
            washQuestions(DATA_General, availableProjects);
        } else if (step == 2) {
            setSubTitle("Specific Questions");
            setButtonText("Submit");
            washQuestions(DATA_Specific, availableProjects);
        } else {
            /* send eligible project's IDs */
        }
    }
    
    const washProjects = (data) => {
        let tempData = data;
        let availabelData = [];
        let removedlData = {};
        tempData.forEach(item => {
            //filter projects based on age.
            const ageRange = item.age.split(",");
            for (let i = 0; i < ageRange.length; i++) {
                ageRange[i] = parseInt(ageRange[i]);
            }
            if ((isNaN(ageRange[0]) && isNaN(ageRange[1])) ||
                    (isNaN(ageRange[0]) && userAge <= ageRange[1]) ||
                    (userAge >= ageRange[0] && isNaN(ageRange[1])) ||
                    (userAge >= ageRange[0] || userAge <= ageRange[1])) {
                //filter projects based on user's selections.
                if (item.gender == userInfo.gender && 
                        item.healthy == userInfo.healthy && 
                        item.smoking == userInfo.smoking && 
                        item.pregnant == userInfo.pregnant &&
                        item.lactating == userInfo.lactating && 
                        item.planning == userInfo.planning &&
                        item.english == userInfo.english) {
                    availabelData.push(item.projectID);
                } else {
                    removedlData[item.projectID] = 1;
                }
            } else {
                removedlData[item.projectID] = 1;
            }
        });
        //wash data_general based on the user's selections.
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
            /* check whether the IDs in the inclusionIDList are all included 
            in the removedProjects list */
            for (let index = 0; index < item.inclusionIDList.length; index++) {
                /* if an ID is not in the list, this question should not be removed, 
                return false */
                if (removedProjects[item.inclusionIDList[index]] == null) {
                    return false;
                }
            }
            /* check whether the IDs in the exclusionIDList are all included in the 
            removedProjects list */
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

    const checkCompleteAllQuestions = () => {
        for (let i = 0; i < currentData.length; i++) {
            if (currentData[i].state == "notComplete") {
                setNotCompleteMsg(true);
                return false;
            }
        }
        setNotCompleteMsg(false);
        return true;
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
            availableProjects = getAvailableProjects();
            if (availableProjects.length == 0) {
                setShowingMessage(true);
            } else {
                setShowingMessage(false);
            }
        }

        if (step != 0 && removeThisQuestion(item)) {
            item.state = "discard";
            return null;
        } else {
            if (!item.stateYes && !item.stateNo) {
                item.state = "notComplete";
            } else {
                item.state = "completed";
            }
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
                    <Text style={styles.titleInfoP1} onPress={() => console.log(userInfo)}>
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
                            {step == 0 ? null : <Text style={styles.partABTitleText}>
                                *{questionsLeft} Questions Left
                            </Text>}
                            <View style={[styles.partABTitleYesNo, {opacity: step == 0 ? 0 : 1}]}>
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
                            {step == 0 && getUserData &&
                            <QuestionDemo setDemoInfo={setDemoInfo} userInfo={userInfo}></QuestionDemo>}
                        </ScrollView>
                    </View>
                    {/* {setSmoking, setPregnant, setLactating, setPlanning, setLocation} */}
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
                                Eligible Projects
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Button to next page */}
                <View style={styles.extraInformation}>
                    {(showingNoMatchMessage || showingGeneralAmptyError || showingSpecificAmptyError) ? 
                    <Text style={styles.questionMsg}>
                        *Sorry, no project matches your condition.
                    </Text> :
                    showingNotCompleteMsg ? 
                    <Text style={styles.questionMsg}>
                        *Please complete all questions.
                    </Text> : null}

                    {showingDemoError && 
                    <Text style={styles.questionMsg}>
                        *Please complete the first four questions.
                    </Text>}

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
                                {backgroundColor: showingNoMatchMessage || showingDemoError ||
                                        showingGeneralAmptyError || showingSpecificAmptyError ?
                                    "lightgrey" : "#00205B"}]}
                            onPress={() => {
                                    //if no project matches the user's condition, do nothing:
                                    showingNoMatchMessage || showingDemoError ||
                                        showingGeneralAmptyError || showingSpecificAmptyError ? null :
                                    //if the current page is Demo, wash projects based on results.
                                    (step == 0 ? washProjects(DATA_Demo) : null,
                                    //check questions are completed or not.
                                    (step == 0 || checkCompleteAllQuestions() ? 
                                        (stepForward(true), updateUserInfo({userInfo})) : null))}}>
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
