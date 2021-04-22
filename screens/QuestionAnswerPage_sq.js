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



  let DATA = [
    {
        question: 'Are currently participating in otehr clinical studies?',
        inclusionIDList: [1],
        exclusionIDList: [2],
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
        inclusionIDList: [3],
        exclusionIDList: [],
        stateYes: false,
        stateNo: false,
        num: 2,
    },
  ];

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
    const [availableProjects, setAvailableProjects] = useState([]);
    const [isFiltered, setFiltered] = useState(false);
    const loadedProjects = props.location.filteredProjects;
    var num = 0;

    /* filter the questions based on the available projects retrieved from the general questions */
    if (!isFiltered && loadedProjects != null) {
        console.log("传过来的project是： " + loadedProjects);
        console.log("xxxxx" + loadedProjects.length);
        let tempData = DATA;
        let newData = [];
        tempData.forEach(item => {
            let shouldRemove = true;
            for(let index = 0; index < item.inclusionIDList.length; index++) {
                for (let index_2 = 0; index_2 < loadedProjects.length; index_2++) {
                    if (loadedProjects[index_2] == item.inclusionIDList[index]) {
                        shouldRemove = false;
                        break;
                    }
                }
                if (!shouldRemove) {break;}
            }
            for(let index = 0; index < item.exclusionIDList.length; index++) {
                if (!shouldRemove) {break;}
                for (let index_2 = 0; index_2 < loadedProjects.length; index_2++) {
                    if (loadedProjects[index_2] == item.exclusionIDList[index]) {
                        shouldRemove = false;
                        break;
                    }
                }
                if (!shouldRemove) {break;}
            }
            if (!shouldRemove) {
                newData.push(item);
            }
        });
        DATA = newData;
        console.log(DATA);
        setFiltered(true);
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
        for (let index3 = 0; index3 < DATA.length; index3++) {
            let questionItem = DATA[index3];
            let incluArray = questionItem.inclusionIDList;
            let removeList = removedProjects;
            for (let index = 0; index < incluArray.length; index++) {
                if (removeList[incluArray[index]] == null) {
                    projectList.push(incluArray[index]);
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
        if (num == 8) {
            sleep(100);
            let avp = getAvailableProjects();
            setAvailableProjects(avp); /*  */
            if (avp.length == 0) {
                setShowingMessage(true);
            } else {
                setShowingMessage(false);
            }
        }

        if (removeThisQuestion(item)) {
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
                    style={{width: 200, height: 100, left: 100, top: 20}} 
                    source={require('../assets/header.png')}/>
            </View>
            
            <View style={{height: "75%"}}>
                {/* title information */}
                <View style={{flexDirection: "row", height:"10%"}}>
                    <Text style={styles.titleInfoP1}>
                        Questionnaire
                    </Text>
                    <Text style={styles.titleInfoP2}>
                        - Specific Questions
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
                            <FlatList
                                data={DATA} 
                                renderItem={renderItem} 
                                keyExtractor={item => item.question} 
                                extraData={selectedId}
                            />
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
                                Demography？
                            </Text>
                        </View>
                        <View style={[styles.processBarPole ,{backgroundColor:"#00205B"}]}></View>
                        <View style={[styles.processBarCircle , {backgroundColor:"#00205B"}]}>
                            <Text style={{color:"white", paddingLeft:5}}>2</Text>
                            <Text style={styles.processBarText}>
                                General Questions
                            </Text>
                        </View>
                        <View style={[styles.processBarPole ,{backgroundColor:"#00205B"}]}></View>
                        <View style={[styles.processBarCircle , {backgroundColor:"#00205B"}]}>                        
                            <Text style={{color:"white", paddingLeft:5}}>3</Text>
                            <Text style={styles.processBarText}>
                                Specific Questions
                            </Text>
                        </View>
                        <View style={[styles.processBarPole ,{backgroundColor:"white"}]}></View>
                        <View style={[styles.processBarCircle , {backgroundColor:"white"}]}>                        
                            <Text style={{color:"grey", paddingLeft:5}}>4</Text>
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
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[
                            styles.questionnaireButton, 
                            {backgroundColor:"#00205B"}]}>
                            <Link 
                                to={"/questionnaire"}
                                style={{color:"white", textDecoration:"none"}}>
                                    BACK
                            </Link>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.questionnaireButton, 
                                {backgroundColor: showingMessage ? "lightgrey" : "#00205B"}]}>
                            <Link 
                                to={{
                                    pathname: showingMessage ? "" : "", 
                                    filteredProjects:availableProjects}} 
                                style={{color: "white", textDecoration:"none"}}>
                                    SUBMIT
                            </Link>
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
