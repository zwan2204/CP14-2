/** @format */

import React, { useReducer, useState } from "react";
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
import {QuestionDemo} from "../screens/QuestionnaireModule_demo.js";
import getUserAge from "../screens/QuestionnaireModule_data";
import {getUserInfo, updateUserInfo, getProjects} from "../screens/QuestionnaireModule_data";

const QuestionAnswerPage = () => {
    /* adjust the scroll bar */
    const [contentOffset, setContentOffset] = React.useState({ x: 0, y: 0 });
    const [contentSize, setContentSize] = React.useState(0);
    const [scrollViewHeight, setScrollViewHeight] = React.useState(0);
    const scrollElementHeightPercent = 45;
    const scrollPerc = (contentOffset.y / (contentSize - scrollViewHeight)) 
        * (100 - scrollElementHeightPercent);

    /* 0 means on the page of personal information page, 1 means general question page
    2 means specific question page */
    const [step, setStep] = useState(0);
    
    /* questions needs to answer by workers */
    const [requireHCWorker, setRequireHCW] = useState(false);

    /* this is used to set sub-title of the page */
    const [subTitle, setSubTitle] = useState("Demographic Information");

    /* this is used to set sub-title of the page */
    const [buttonText, setButtonText] = useState("Confirm");

    /* get user's age */
    let userAge = getUserAge();

    /* set up all types of questions and projects */
    const [eligibleProjects, setEProjects] = useState([]);
    const [removedProjects, setRemovedProjects] = useState({});
    const [removedProjectSizeZero, setSize] = useState(false);
    const [generalQuestions, setGeQuestions] = useState({});
    const [specificQuestions, setSpQuestions] = useState({});
    const [workerQuestions, setWrQuestions] = useState({});
    let currentQuestions = 
        step == 1 ? generalQuestions :
        (step == 2 ? specificQuestions :
        (step == 3 ? workerQuestions : null));
    const [numQuestions, setNumQuestions] = useState(0);
    const [selectedId, setSelectedId] = useState(null);
    var num = 0; //current question index

    /* retrieve user general information data */
    const [getUserData, setGet] = useState(false);
    const reducer = (state, action) => ({ ...state, ...action });
    const [userInfo, setDemoInfo] = useReducer(reducer, getUserInfo({setGet}));

    /* messages: restrict moving to the next page */
    const showingDemoMsg = (userInfo.gender == "" || userInfo.location == "") ? true : false;
    const showingGeneralAmptyMsg = (step == 1 && generalQuestions.length == 0) ? true : false;
    const showingSpecificAmptyMsg = (step == 2 && specificQuestions.length == 0) ? true : false;
    const [showingNotCompleteMsg, setNotCompleteMsg] = useState(false);

    /* when data is loading */
    const [isLoading, setLoading] = useState(false);

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
            // currentQuestions = washQuestions(generalQuestions, availableProjects);
        } else if (step == 2) {
            setSubTitle("Specific Questions");
            setButtonText("Submit");
            // currentQuestions = washQuestions(specificQuestions, availableProjects);
        } else {
            /* send eligible project's IDs */
        }
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
        if ((!item.stateYes) && (!item.stateNo) 
                && removedProjects && removedProjectSizeZero) {
            /* check whether the IDs in the inclusionIDList are all included 
            in the removedProjects list */
            for (let index = 0; index < item.inclusionIDList.length; index++) {
                /* if an ID is not in the list, this question should not be removed, 
                return false */
                if (item.inclusionIDList[index] != "" && 
                        removedProjects[item.inclusionIDList[index]] == null) {
                    return false;
                }
            }
            /* check whether the IDs in the exclusionIDList are all included in the 
            removedProjects list */
            for (let index = 0; index < item.exclusionIDList.length; index++) {
                // if (!removedProjects.includes(item.exclusionIDList[index])) {
                if (item.exclusionIDList[index] != "" && 
                        removedProjects[item.exclusionIDList[index]] == null) {
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
        for (let i = 0; i < currentQuestions.length; i++) {
            if (currentQuestions[i].state == "notCompleted") {
                setNotCompleteMsg(true);
                return false;
            }
        }
        setNotCompleteMsg(false);
        return true;
    }

    const getAvailableProjects = () => {
        let projectList = [];
        for (let index = 0; index < currentQuestions.length; index++) {
            let questionItem = currentQuestions[index];
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

    const setQuestionLeft = () => {
        let num = 0;
        for (let index = 0; index < currentQuestions.length; index++) {
            if (currentQuestions[index].state == "notCompleted") {
                num += 1;
            }
        }
        setNumQuestions(num);
    }

    const sleep = (milliseconds) => {
        const date = Date.now();
        let currentQuestions = null;
        do {
            currentQuestions = Date.now();
        } while (currentQuestions - date < milliseconds);
    }

    const Item = ({item}) => {
        let content = null;

        if (step != 0 && removeThisQuestion(item)) {
            item.state = "discard";
            content = null;
        } else {
            if (!item.stateYes && !item.stateNo) {
                item.state = "notCompleted";
            } else {
                item.state = "completed";
            }
            content =
                <View style={[styles.item]}>
                    <Text style={styles.questionSentence}>{item.question}</Text>
                    <View style={styles.tickContianer}>
                        {/* Yes button */}
                        <TouchableOpacity
                            onPress={() => {
                                handleClickLeft(item), 
                                setSelectedId(item.question + item.stateYes)}}
                            style={
                                item.stateYes ? styles.hightlightTickBox : styles.tickBox}
                        >
                        </TouchableOpacity>

                        {/* No button */}
                        <TouchableOpacity 
                            onPress={() => {
                                handleClickRight(item), 
                                setSelectedId(item.question + item.stateYes)}} 
                            style={
                                item.stateNo ? styles.hightlightTickBox : styles.tickBox}
                        >
                        </TouchableOpacity>
                    </View>
                </View>;
        }
        num += 1;
        if (num == currentQuestions.length) {
            sleep(100);
            setEProjects(getAvailableProjects());
            setQuestionLeft();
        }

        return content;
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
            
            {isLoading ? 
            <View>
                <Text>Loading Data</Text>
            </View> 
            :
            <View style={{height: "75%"}}>
                {/* title information */}
                <View style={{flexDirection: "row", height:"10%"}}>
                    <Text style={styles.titleInfoP1} onPress={() => console.log(eligibleProjects, removedProjects, specificQuestions, currentQuestions)}>
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
                                *{numQuestions} Questions Left
                            </Text>}
                            <View style={[
                                    styles.partABTitleYesNo, 
                                    {opacity: step == 0 || showingGeneralAmptyMsg || 
                                            showingSpecificAmptyMsg ? 0 : 1}]}
                            >
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
                                data={currentQuestions} 
                                renderItem={renderItem}
                                keyExtractor={item => item.question} 
                                extraData={selectedId}
                            />}
                            {step == 0 && getUserData &&
                            <QuestionDemo setDemoInfo={setDemoInfo} userInfo={userInfo}>
                            </QuestionDemo>}
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
                            <Text style={{color:"white", paddingLeft:5}}>
                                1
                            </Text>
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
                            <Text style={{color: step >= 1 ? "white" : "grey", paddingLeft:5}}>
                                2
                            </Text>
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
                            <Text style={{color: step >= 2 ? "white" : "grey", paddingLeft:5}}>
                                3
                            </Text>
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
                            <Text style={{color: step >= 3 ? "white" : "grey", paddingLeft:5}}>
                                4
                            </Text>
                            <Text style={styles.processBarText}>
                                Eligible Projects
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Button to next page */}
                <View style={styles.extraInformation}>
                    {(showingGeneralAmptyMsg || showingSpecificAmptyMsg) ? 
                    <Text style={styles.questionMsg}>
                        *Sorry, no project matches your condition.
                    </Text> :

                    showingNotCompleteMsg ? 
                    <Text style={styles.questionMsg}>
                        *Please complete all questions.
                    </Text> : null}

                    {showingDemoMsg && 
                    <Text style={styles.questionMsg}>
                        *Please complete the first four questions.
                    </Text>}

                    <View style={[
                        styles.buttonContainer,
                        {justifyContent: step > 0 ? "space-between" : "center"}]}>
                        
                        {step > 0 && 
                        <TouchableOpacity 
                            style={[
                                styles.questionnaireButton, 
                                {backgroundColor:"#00205B"}]}
                            onPress={() => {
                                stepForward(false)}}
                        >
                            <Text style={{color: "white"}}>Back</Text>
                        </TouchableOpacity>}

                        <TouchableOpacity
                            style={[
                                styles.questionnaireButton, 
                                {backgroundColor: showingDemoMsg || showingGeneralAmptyMsg || 
                                    showingSpecificAmptyMsg ? "lightgrey" : "#00205B"}]}
                            onPress={() => {
                                    //if no project matches the user's condition, do nothing:
                                    showingDemoMsg || showingGeneralAmptyMsg || 
                                            showingSpecificAmptyMsg ? null :
                                    //if the current page is Demo, wash projects based on results.
                                    (step == 0 ? getProjects({setGeQuestions, setSpQuestions, 
                                            setWrQuestions, setEProjects, setRemovedProjects, 
                                            setLoading, userInfo}, userAge) : null,
                                    //check questions are completed or not.
                                    (step == 0 || checkCompleteAllQuestions() ? 
                                            (stepForward(true), updateUserInfo({userInfo})) : null))}}
                        >
                            <Text style={{color: "white"}}>{buttonText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            }

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
