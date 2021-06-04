/** @format */

import React, { useEffect, useState } from "react";
import { 
    Text, 
    View, 
    TouchableOpacity, 
    SafeAreaView, 
    ScrollView, 
    FlatList,
    ActivityIndicator,
} from "react-native";
import {styles} from "../styles.js";
import {QuestionDemo} from "../modules/QuestionnaireModule_demo.js";
import {HealhcareWorkerLoginView} from "../modules/QuestionnaireModule_WorkerLogin";
import {getUserInfo, updateUserInfo, getProjects} from "../modules/QuestionnaireModule_data";
import HeaderSecond from "../screens/HeaderSecond";
import Footer from "../screens/Footer";


const QuestionAnswerPage = (props) => {
    {/* Scroll bar*/}
    const [contentOffset, setContentOffset] = React.useState({ x: 0, y: 0 });
    const [contentSize, setContentSize] = React.useState(0);
    const [scrollViewHeight, setScrollViewHeight] = React.useState(0);
    const scrollElementHeightPercent = 45;
    const scrollPerc = (contentOffset.y / (contentSize - scrollViewHeight)) 
        * (100 - scrollElementHeightPercent);
    
    {/* common features for all sections */}
    const [subTitle, setSubTitle] = useState("Demographic Information");
    const [buttonText, setButtonText] = useState("Confirm");
    //0 = personal information page, 1 = general question page, 2 = specific question page
    const [step, setStep] = useState(0);

    //Whether the page is loading
    const [isLoading, setLoading] = useState(true);

    {/* User general information */}
    const userID = localStorage.getItem("userId"); //get the current user's ID
    const [getUserData, setGet] = useState(false); //true if successfully get user's data
    const [userInfo, setDemoInfo] = useState({}); //store user's information: gender, age,...

    {/* Variables when a worker is needed */}
    const [requireHCWorker, setRequireHCWorker] = useState(false);
    const [handDevice, setHandDevice] = useState(false); //need to hand device to worker
    const [needLogin, setNeedLogin] = useState(false); //worker needs to login

    {/* Questions and projects */}
    const [eligibleProjects, setEProjects] = useState([]);
    const [removedProjects, setRemovedProjects] = useState({});
    const [removedProjectSizeZero, setSize] = useState(false);
    const [generalQuestions, setGeQuestions] = useState({});
    const [specificQuestions, setSpQuestions] = useState({});
    const [workerQuestions, setWrQuestions] = useState({});
    let currentQuestions =  //the current questions showing on a section
        step == 1 ? generalQuestions :
        (step == 2 ? specificQuestions :
        (requireHCWorker && step == 3 ? workerQuestions : null));
    const [numQuestions, setNumQuestions] = useState(0);
    const [selectedId, setSelectedId] = useState(null);
    var num = 0; //current question index

    {/* messages */}
    const [showingDemoMsg, setDemoMsg] = useState(true);
    const [showingNotCompleteMsg, setNotCompleteMsg] = useState(false);
    const [showingDataErrorMsg, setDataErrorMsg] = useState(false);
    const [allDiscard, setAllDiscardMsg] = useState(false);
    const showingNoQuestionMsg = step == 1 && generalQuestions.length == 0 ? true :
        (step == 2 && specificQuestions.length == 0 ? true : allDiscard);

    const { history } = props; //used to carry data when moving to other pages

    {/* get user's information first before loading this page */}
    useEffect(() => {
        getUserInfo({setDemoInfo, setGet, setLoading, setDataErrorMsg}, userID);
    }, []);
    
    {/* moving between each page */}
    const stepForward = (isForward) => {
        let currentStep = step;
        {/* moving forward (i.e. from general questions to specific questions ) */}
        if (isForward && currentStep < 4) {
            currentStep += 1;
        }
        {/* moving backward */}
        if (!isForward && currentStep > 0) {
            currentStep -= 1;
        }
        setStep(currentStep);
        setAllDiscardMsg(false);
        switchContent(currentStep, isForward);
    }

    {/* change the content of the page */}
    const switchContent = (step, isForward) => {
        {/* if no projects are eligible, move to the last section */}
        if (eligibleProjects.length == 0 && isForward && step > 1) {
            history.push({
                pathname: "/projectAvailable",
                projectIDs: "",
                hcWorker: requireHCWorker
            });
        } else {
            if (step == 0) { //section 1: demographic info
                setSubTitle("Demographic Information");
                setButtonText("Confirm");
            } else if (step == 1) { //section 2: general questions
                setSubTitle("General Questions");
                setButtonText("Next");
            } else if (step == 2) { //section 3: specific questions
                setSubTitle("Specific Questions");
                setButtonText(requireHCWorker ? "Next" : "Submit");
            } else if (step == 3 && requireHCWorker) { //extra section 3-1: worker questions
                setSubTitle("Medical Condition");
                setButtonText("Submit");
                setHandDevice(true);
            } else if ((step == 3 && !requireHCWorker) || (step == 4 && requireHCWorker)) {
                {/* convert the eligible projects to a string*/}
                let eligibleProjects_string = "";
                if (eligibleProjects.length > 0) {
                    for (let i = 0; i < eligibleProjects.length; i++) {
                        eligibleProjects_string = eligibleProjects_string + eligibleProjects[i] + ","
                    }
                    eligibleProjects_string = eligibleProjects_string.substring
                        (0, eligibleProjects_string.length - 1);
                }
                {/* move to the eligible project page */}
                history.push({
                    pathname: "/projectAvailable",
                    projectIDs: eligibleProjects_string,
                    hcWorker: requireHCWorker
                });
            }
        }
    }

    {/* if left answer ("Yes") is clicked */}
    const handleClickLeft = (item) => {
        makeASelection(item, false);
        item.stateYes = true;
        item.stateNo = false;
    }

    {/* if right answer ("No") is clicked */}
    const handleClickRight = (item) => {
        makeASelection(item, true);
        item.stateYes = false;
        item.stateNo = true;
    }

    {/* check eligible projects based on the selection */}
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

    {/* check whether a question should be removed from the questionnaire */}
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

    {/* check whether a project should be removed */}
    const getAvailableProjects = () => {
        let projectList = [];
        let removeList = removedProjects;
        let availabelList = eligibleProjects;
        /* keep projects that are stored in the eligible project list */
        for (let index = 0; index < availabelList.length; index++) {
            if (removeList[availabelList[index]] == null && availabelList[index] != "") {
                projectList.push(availabelList[index]);
            }
        }
        /* partially keep projects that are stored in the removed project list */
        let keyList = Object.keys(removeList)
        for (let index = 0; index < keyList.length; index++) {
            if (removeList[keyList[index]] == null && keyList[index] != "") {
                projectList.push(keyList[index]);
            }
        }
        /* remove duplicated projects */
        let unique = new Set(projectList);
        projectList = [...unique];

        return projectList;
    }

    {/* how many questions that have not been answered by the user */}
    const setQuestionLeft = () => {
        let num = 0;
        for (let index = 0; index < currentQuestions.length; index++) {
            if (currentQuestions[index].state == "notCompleted") {
                num += 1;
            }
        }
        setNumQuestions(num);
    }

    {/* check whether there is a question that has not been answered by the user */}
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

    {/* check whether all questions are discarded (questions belong to ineligible projects) */}
    const checkDiscardAllQuestions = () => {
        for (let i = 0; i < currentQuestions.length; i++) {
            if (currentQuestions[i].state != "discard") {
                setAllDiscardMsg(false);
                return;
            }
        }
        setAllDiscardMsg(true);
        return;
    }

    {/* the design of a question, including its text and yes & no buttons */}
    const Item = ({item}) => {
        let content = null;
        /* if this question belongs to an ineligible project, we don't need it */
        if (step != 0 && removeThisQuestion(item)) {
            item.state = "discard";
            content = null;
        } else {
            /* if this question has not been answered, mark it */
            if (!item.stateYes && !item.stateNo) {
                item.state = "notCompleted";
            } else {
                item.state = "completed"; // otherwise, it's answered by the user
            }
            /* create style for the question */
            content =
                <View style={[styles.item]}>
                    {/* question text */}
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
        /* if this is the last question, check eligible projects and questions */
        if (num == currentQuestions.length) {
            setEProjects(getAvailableProjects());
            checkDiscardAllQuestions();
            setQuestionLeft();
        }

        return content;
    }

    const renderItem = ({ item }) => (
        <Item item={item}/>
    );

    return (
        <SafeAreaView style={styles.container}>
            <HeaderSecond history={props.history} />
            
            {/* System is loading data from the database, showing loading icon and messages */}
            {isLoading ?
            <View style={styles.loadingStyle}>
                <ActivityIndicator size="large" color="#00205B"/>
                {showingDataErrorMsg ?
                    //fail to load data
                    <Text style={{color:"red", fontSize:"1.3em", paddingTop:"3%"}}>
                        The system does not response, please refresh the page
                    </Text>
                    :
                    //normal
                    <Text style={{color:"#00205B", fontSize:"1.3em", paddingTop:"3%"}}>
                        Loading Questions
                    </Text>
                }
            </View> 
            :
            //normal content of the questionnaire
            <View style={{height: "80%"}}>
                {handDevice ?
                //if user is in the step 4 and a healthcare worker is required
                <View style={styles.handDeviceContinaer}>
                    <View style={styles.opacityBackground}></View>
                    {needLogin ?
                    //healthcare worker login
                    <HealhcareWorkerLoginView
                        setNeedLogin={setNeedLogin} setHandDevice={setHandDevice} 
                            stepForward={stepForward}>
                    </HealhcareWorkerLoginView>
                    :
                    //ask the user to hand the device to the worker
                    <View style={styles.handDeviceInner}>
                        <View style={styles.handDeviceText}>
                            <Text style={{fontSize:"1.4em", paddingTop:"5%"}}>
                                Please hand this device over to one of 
                                our staff members to examine your medical conditon.
                            </Text>
                        </View>
                        {/* buttons */}
                        <View style={styles.handDeviceButtonContianer}>
                            <TouchableOpacity
                                onPress={() => {setHandDevice(false), stepForward(false)}}
                                style={styles.handDeviceButtonStyle}
                            >
                                <Text style={{color:"white"}}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {setNeedLogin(true)}}
                                style={styles.handDeviceButtonStyle}
                            >
                                <Text style={{color:"white"}}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    }
                </View> : null}
                
                {/* the user is in other sections */}
                {/* title information */}
                <View style={{flexDirection: "row", height:"12%"}}>
                    <Text style={styles.titleInfoP1} onPress={()=>console.log(currentQuestions, eligibleProjects)}>
                        Questionnaire
                    </Text>
                    <Text style={styles.titleInfoP2}>
                        - {subTitle}
                    </Text>
                </View>
                
                {/* This section contains all questions and tickboxes */}
                <View style={[styles.questionPageContainer, {height:"70%"}]}>
                    <View style={{width:"80%"}}>
                        {/* Title bar information */}
                        <View style={styles.partABTitleBar}>
                            {step == 0 ? null : (numQuestions > 1 ? 
                            <Text style={styles.partABTitleText}>
                                *{numQuestions} Questions Left
                            </Text>
                            :
                            <Text style={styles.partABTitleText}>
                                *{numQuestions} Question Left
                            </Text>
                            )}
                            <View style={[
                                    styles.partABTitleYesNo, 
                                    {opacity: step == 0 || showingNoQuestionMsg? 0 : 1}]}
                            >
                                <Text style={{fontSize:"1.2em"}}>Yes</Text>
                                <Text style={{fontSize:"1.2em"}}>No</Text>
                            </View>
                        </View>

                        {/* Question contianer */}
                        {showingNoQuestionMsg && step != 0 ?
                        //if there is no question
                        <View style={{maxHeight:"85%", width:"100%", paddingLeft:"5%"}}>
                            <Text style={{fontSize:"1.5em", color:"red", paddingLeft:"5%"}}>
                                No questions for you in this section, please move to the next page.
                            </Text>
                        </View> 
                        :
                        //otherwise, show all questions and tickboxes
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
                            <QuestionDemo 
                                setDemoInfo={setDemoInfo} 
                                userInfo={userInfo} 
                                setDemoMsg={setDemoMsg}
                                setRequireHCWorker={setRequireHCWorker}>
                            </QuestionDemo>}
                        </ScrollView>
                        }
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

                    {/* process bar */}
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

                        {requireHCWorker &&
                        <View style={[
                            styles.processBarPole, 
                            {backgroundColor: step >= 3 ? "#00205B" : "white"}]}>
                        </View>}
                        {requireHCWorker &&
                        <View style={[
                            styles.processBarCircle , 
                            {backgroundColor: step >= 3 ? "#00205B" : "white"}]}>                        
                            <Text style={{color: step >= 3 ? "white" : "grey", paddingLeft:5}}>
                                4
                            </Text>
                            <Text style={styles.processBarText}>
                                Medical Condition
                            </Text>
                        </View>
                        }

                        <View style={[
                            styles.processBarPole, 
                            {backgroundColor: step >= (requireHCWorker ? 4 : 3) ? 
                                "#00205B" : "white"}]}>
                        </View>
                        <View style={[
                            styles.processBarCircle , 
                            {backgroundColor: step >= (requireHCWorker ? 4 : 3) ? 
                                "#00205B" : "white"}]}>                        
                            <Text style={{color: step >= (requireHCWorker ? 4 : 3) ? 
                                    "white" : "grey", paddingLeft:5}}>
                                {requireHCWorker ? "5" : "4"}
                            </Text>
                            <Text style={styles.processBarText}>
                                Eligible Projects
                            </Text>
                        </View>
                    </View>
                </View>
                
                {/* Buttons moving forward or backward & message container*/}
                <View style={styles.extraInformation}>
                    {/* if a question has not been answered*/}
                    {showingNotCompleteMsg ? 
                    <Text style={styles.questionMsg}>
                        *Please complete all questions.
                    </Text> : null}
                    
                    {/* if the first four questions on the demo section are not filled */}
                    {showingDemoMsg && 
                    <Text style={styles.questionMsg}>
                        *Please complete the first four questions.
                    </Text>}

                    <View style={[
                        styles.buttonContainer,
                        {justifyContent: step > 0 ? "space-between" : "center"}]}>
                        
                        {/* button moving back */}
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

                        {/* button moving forward */}
                        <TouchableOpacity
                            style={[
                                styles.questionnaireButton, 
                                {backgroundColor: showingDemoMsg ? "lightgrey" : "#00205B"}]}
                            onPress={() => {
                                    //if there is an error message, then stop user moving forward: null
                                    showingDemoMsg ? null :
                                    //if the current page is Demo, get projects based on user's answers
                                    (step == 0 ? 
                                        (getProjects({
                                            setGeQuestions, 
                                            setSpQuestions, 
                                            setWrQuestions, 
                                            setEProjects, 
                                            setLoading, 
                                            userInfo},
                                            history),
                                        updateUserInfo({
                                            userInfo}, 
                                            userID), 
                                        stepForward(true)) : null,
                                    //check questions are completed or not
                                    (step != 0 && checkCompleteAllQuestions()) ? 
                                        stepForward(true): null)}}
                        >
                            <Text style={{color: "white"}}>{buttonText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            }

            {/* View of Footer*/}
            <Footer/>
        
        </SafeAreaView>
                            
    );
}

export default QuestionAnswerPage;
