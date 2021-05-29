/** @format */

import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, CheckBox } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "../styles.js";
import { getUserInfo, getUserInfo2 } from "./QuestionnaireModule_data.js";

export function QuestionDemo({setDemoInfo, userInfo, setDemoMsg, setRequireHCWorker}) {
    let gender_default = userInfo["gender"];
    let healthy_default = userInfo["healthy"];
    let english_default = userInfo["english"];
    let location_default = userInfo["location"];
    let isPregnant_default = userInfo["isPregnant"];
    let isSmoking_default = userInfo["isSmoking"];
    let isLactating_default = userInfo["isLactating"];
    let isPlanning_default = userInfo["isPlanning"];

    const[gender, setGender_thisPage] = useState("");
    const[healthy, setHealthy_thisPage] = useState(healthy_default);
    const[english, setEnglish_thisPage] = useState(english_default);
    const[curLocation, setcurLocatio_thisPage] = useState("");
    const[isPregnant, setPregnant_thisPage] = useState(isPregnant_default);
    const[isSmoking, setSmoking_thisPage] = useState(isSmoking_default);
    const[isLactating, setLactating_thisPage] = useState(isLactating_default);
    const[isPlanning, setPlanning_thisPage] = useState(isPlanning_default);
    

    const pickGender = gender => {
        if (gender !== 0) {
            let tempUserlist = userInfo;
            tempUserlist.gender = gender;
            setDemoInfo(tempUserlist);
            setGender_thisPage(gender);
            if (userInfo.location != "" && userInfo.gender != "" &&
                userInfo.location != "0" && userInfo.gender != "0") {
                setDemoMsg(false);
            } else {
                setDemoMsg(true);
            }
        }
    };

    const pickHealthy = healthy => {
        if (healthy !== 0) {
            if (healthy == "true") {
                healthy = true;
            } else if (healthy == "false") {
                healthy = false;
            }
            let tempUserlist = userInfo;
            tempUserlist.healthy = healthy;
            setDemoInfo(tempUserlist);
            setHealthy_thisPage(healthy);
        }
    };

    const pickEnglish = english => {
        if (english !== 0) {
            if (english == "true") {
                english = true;
            } else if (english == "false") {
                english = false;
            }
            let tempUserlist = userInfo;
            tempUserlist.english = english;
            setDemoInfo(tempUserlist);
            setEnglish_thisPage(english);
        }
    };

    const pickCurLocation = curLocation => {
        if (curLocation !== 0) {
            let tempUserlist = userInfo;
            tempUserlist.location = curLocation;
            setDemoInfo(tempUserlist);
            setcurLocatio_thisPage(curLocation);
            if (userInfo.location != "" && userInfo.gender != "" &&
                userInfo.location != "0" && userInfo.gender != "0") {
                setDemoMsg(false);
            } else {
                setDemoMsg(true);
            }
            setRequireHCWorker(curLocation == "clinic" || 
                curLocation == "hospital" ? true : false);
        }
    };

    const pickIsPregnant = () => {
        let tempUserlist = userInfo;
        let pick = isPregnant === undefined ? !isPregnant_default : !isPregnant;
        tempUserlist.isPregnant = pick;
        
        setDemoInfo(tempUserlist);
        setPregnant_thisPage(pick);
    };

    const pickIsSmoking = () => {
        let tempUserlist = userInfo;
        let pick = isSmoking === undefined ? !isSmoking_default : !isSmoking;
        tempUserlist.isSmoking = pick;
        
        setDemoInfo(tempUserlist);
        setSmoking_thisPage(pick);
    };

    const pickIsLactating = () => {
        let tempUserlist = userInfo;
        let pick = isLactating === undefined ? !isLactating_default : !isLactating;
        tempUserlist.isLactating = pick;
        
        setDemoInfo(tempUserlist);
        setLactating_thisPage(pick);
    };

    const pickIsPlanning = () => {
        let tempUserlist = userInfo;
        let pick = isPlanning === undefined ? !isPlanning_default : !isPlanning;
        tempUserlist.isPlanning = pick;
        
        setDemoInfo(tempUserlist);
        setPlanning_thisPage(pick);
    };

    const capitalize = (str) => {
        if (str == undefined || str == "") {
            return null;
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    return (
        <SafeAreaView style={styles.container}>

            {userInfo["isPlanning"] === undefined ? null :
            <View style={{flexDirection: "row"}}>
  
                <View style={{flexDirection: "column", flex: 1, justifyContent:"space-around"}}>
                    <Text style={{paddingBottom:"4%", paddingLeft:"4%", fontSize:"1.5em"}}
                    onPress={()=>console.log(isLactating, isLactating_default)}>
                        What's your gender?
                    </Text>
                    <Text style={{paddingBottom:"4%", paddingLeft:"4%", fontSize:"1.5em"}}>
                        Are you healthy?
                    </Text>
                    <Text style={{paddingBottom:"4%", paddingLeft:"4%", fontSize:"1.5em"}}>
                        Can you speak fluent English?
                    </Text>
                    <Text style={{paddingBottom:"4%", paddingLeft:"4%", fontSize:"1.5em"}}>
                        Where are you currently located?
                    </Text>
                </View>
  
                <View style={{flexDirection: "column", flex: 1, justifyContent:"space-around", alignItems:"flex-end"}}>
                    <Picker
                        style={{width:"35%", height:"15%", fontSize:"1em"}}
                        selectedValue={gender}
                        onValueChange={pickGender}
                        >
                        {gender_default == "" ? <Picker.Item label={"Your gender:"} value="0"/> : null}
                        <Picker.Item 
                            label={gender_default == "" ? "Male" : capitalize(gender_default)} 
                            value={gender_default == "" ? "Male" : gender_default} />
                        <Picker.Item 
                            label={gender_default == "" ? "Female" : 
                                (gender_default == "Male" ? "Female" :
                                (gender_default == "Female" ? "Male" : "Male"))} 
                            value={gender_default == "" ? "Female" : 
                                (gender_default == "Male" ? "Female" : 
                                (gender_default == "Female" ? "Male" : "Male"))} />
                        <Picker.Item
                            label={gender_default == "" ? "Not required" : 
                                (gender_default == "Male" ? "Not required" :
                                (gender_default == "Female" ? "Not required" : "Female"))} 
                            value={gender_default == "" ? "Not required" : 
                                (gender_default == "Male" ? "Not required" : 
                                (gender_default == "Female" ? "Not required" : "Female"))} />
                    </Picker>
  
                    <Picker
                        style={{width:"35%", height:"15%", fontSize:"1em"}}
                        selectedValue={healthy}
                        onValueChange={pickHealthy}
                        >
                        {healthy_default == undefined ? <Picker.Item label={"Yes/No"} value="0"/> : null}
                        <Picker.Item
                            label={healthy_default ? "Yes" : "No"} 
                            value={healthy_default ? true : false} />
                        <Picker.Item 
                            label={healthy_default ? "No" : "Yes"}
                            value={healthy_default ? false : true} />
                    </Picker>
  
                    <Picker
                        style={{width:"35%", height:"15%", fontSize:"1em"}}
                        selectedValue={english}
                        onValueChange={pickEnglish}
                        >
                        {english_default == undefined ? <Picker.Item label={"Yes/No"} value="0"/> : null}
                        <Picker.Item
                            label={english_default ? "Yes" : "No"} 
                            value={english_default ? true : false} />
                        <Picker.Item 
                            label={english_default ? "No" : "Yes"}
                            value={english_default ? false : true} />
                    </Picker>
  
                    <Picker
                        style={{width:"35%", height:"15%", fontSize:"1em"}}
                        selectedValue={curLocation}
                        onValueChange={pickCurLocation}
                        >
                        <Picker.Item label="" value="0" />
                        <Picker.Item label="Home" value="home" />
                        <Picker.Item label="GP service" value="gp" />
                        <Picker.Item label="Clinic" value="clinic" />
                        <Picker.Item label="Hospital" value="hospital" />
                    </Picker>
                </View>
            </View>
            }
            {userInfo["isPlanning"] === undefined ? null :
            <View style={{height:"30%"}}>
                <Text style={{paddingBottom:"2%", paddingLeft:"2%", fontSize:"1.5em", fontWeight:"bold"}}>
                    Please tick the medical condition/habits you have:
                </Text>
    
                <View style={{flexDirection: "row", height:"60%",paddingLeft:"4%", width:"100%", flexWrap:"wrap"}}>
                    <View style={{flexDirection: "row", alignItems:"center", 
                            alignContent:"center", paddingRight:"5%", paddingBottom:"1%"}}>
                        <Text style={{fontSize:"1.5em", paddingRight:20}}>
                            Pregnant
                        </Text>
                        <CheckBox
                            style={{height:"1.5em", width:"1.5em"}}
                            value={isPregnant === undefined ? isPregnant_default : isPregnant}
                            onValueChange={pickIsPregnant}
                        />
                    </View>
                    <View style={{flexDirection: "row", alignItems:"center", 
                            alignContent:"center", paddingRight:"5%", paddingBottom:"1%"}}>
                        <Text style={{fontSize:"1.5em", paddingRight:20}}>
                            Smoking
                        </Text>
                        <CheckBox
                            style={{height:"1.5em", width:"1.5em"}}
                            value={isSmoking === undefined ? isSmoking_default : isSmoking}
                            onValueChange={pickIsSmoking}
                        />
                    </View>
                    <View style={{flexDirection: "row", alignItems:"center", 
                            alignContent:"center", paddingRight:"5%", paddingBottom:"1%"}}>
                        <Text style={{fontSize:"1.5em", paddingRight:20}}>
                            Lactating
                        </Text>
                        <CheckBox
                            style={{height:"1.5em", width:"1.5em"}}
                            value={isLactating === undefined ? isLactating_default : isLactating}
                            onValueChange={pickIsLactating}
                        />
                    </View>
                    <View style={{flexDirection: "row", alignItems:"center", 
                            alignContent:"center", paddingRight:"5%", paddingBottom:"1%"}}>                        
                        <Text style={{fontSize:"1.5em" , paddingRight:20}}>
                            Planning on becoming pregnant
                        </Text>
                        <CheckBox
                            style={{height:"1.5em", width:"1.5em"}}
                            value={isPlanning === undefined ? isPlanning_default : isPlanning}
                            onValueChange={pickIsPlanning}
                        />
                    </View>
                </View>
            </View>
            }
        </SafeAreaView>
    );
}
