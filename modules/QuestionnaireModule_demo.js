/** @format */

import React, { useState } from "react";
import { Text, View, SafeAreaView, CheckBox } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "../styles.js";

export function QuestionDemo({setDemoInfo, userInfo}) {
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
    const[isPregnant, setPregnant_thisPage] = useState(false);
    const[isSmoking, setSmoking_thisPage] = useState(false);
    const[isLactating, setLactating_thisPage] = useState(false);
    const[isPlanning, setPlanning_thisPage] = useState(false);

    const pickGender = gender => {
        if (gender !== 0) {
            setDemoInfo({gender: gender});
            setGender_thisPage(gender);
        }
    };

    const pickHealthy = healthy => {
        if (healthy !== 0) {
            if (healthy == "true") {
                healthy = true;
            } else if (healthy == "false") {
                healthy = false;
            }
            setDemoInfo({healthy: healthy});
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
            setDemoInfo({english: english});
            setEnglish_thisPage(english);
        }
    };

    const pickCurLocation = curLocation => {
        if (curLocation !== 0) {
            setDemoInfo({location: curLocation});
            setcurLocatio_thisPage(curLocation);
        }
    };

    const pickIsPregnant = () => {
        setDemoInfo({isPregnant : isPregnant != isPregnant_default ? !isPregnant_default : !isPregnant});
        setSmoking_thisPage(isPregnant != isPregnant_default ? !isPregnant_default : !isPregnant);
    };

    const pickIsSmoking = () => {
        setDemoInfo({isSmoking : isSmoking != isSmoking_default ? !isSmoking_default : !isSmoking});
        setSmoking_thisPage(isSmoking != isSmoking_default ? !isSmoking_default : !isSmoking);
    };

    const pickIsLactating = () => {
        setDemoInfo({isLactating : isLactating != isLactating_default ? !isLactating_default : !isLactating});
        setSmoking_thisPage(isLactating != isLactating_default ? !isLactating_default : !isLactating);
    };

    const pickIsPlanning = () => {
        setDemoInfo({isPlanning : isPlanning != isPlanning_default ? !isPlanning_default : !isPlanning});
        setSmoking_thisPage(isPlanning != isPlanning_default ? !isPlanning_default : !isPlanning);
    };

    const capitalize = (str) => {
        if (str == undefined || str == "") {
            return null;
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    return (
        <SafeAreaView style={styles.container}>
            {/* body view */}
            <View style={{flexDirection: "row"}}>
  
                <View style={{flexDirection: "column", flex: 1, justifyContent:"space-around"}}>
                    <Text style={{paddingBottom:"4%", paddingLeft:"4%", fontSize:"1.5em"}}>
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
  
            <View style={{height:"30%"}}>
                <Text style={{paddingBottom:"2%", paddingLeft:"2%", fontSize:"1.5em", fontWeight:"bold"}}>
                    Please tick the medical condition/habits you have:
                </Text>
    
                <View style={{flexDirection: "row", height:"60%",paddingLeft:"4%", width:"100%"}}>
                    <View style={{flexDirection: "row", alignItems:"center", alignContent:"center", paddingRight:"5%"}}>
                        <Text style={{fontSize:"1.5em", paddingRight:20}}>
                            Pregnant
                        </Text>
                        <CheckBox
                            style={{height:"1.5em", width:"1.5em"}}
                            value={isPregnant_default == isPregnant ? isPregnant : !isPregnant}
                            onValueChange={pickIsPregnant}
                        />
                    </View>
                    <View style={{flexDirection: "row", alignItems:"center", alignContent:"center", paddingRight:"5%"}}>
                        <Text style={{fontSize:"1.5em", paddingRight:20}}>
                            Smoking
                        </Text>
                        <CheckBox
                            style={{height:"1.5em", width:"1.5em"}}
                            value={isSmoking_default === isSmoking ? isSmoking : !isSmoking}
                            onValueChange={pickIsSmoking}
                        />
                    </View>
                    <View style={{flexDirection: "row", alignItems:"center", alignContent:"center", paddingRight:"5%"}}>
                        <Text style={{fontSize:"1.5em", paddingRight:20}}>
                            Lactating
                        </Text>
                        <CheckBox
                            style={{height:"1.5em", width:"1.5em"}}
                            value={isLactating_default === isLactating ? isLactating : !isLactating}
                            onValueChange={pickIsLactating}
                        />
                    </View>
                    <View style={{flexDirection: "row", alignItems:"center", alignContent:"center", paddingRight:"5%"}}>
                        <Text style={{fontSize:"1.5em" , paddingRight:20}}>
                            Planning on becoming pregnant
                        </Text>
                        <CheckBox
                            style={{height:"1.5em", width:"1.5em"}}
                            value={isPlanning_default === isPlanning ? isPlanning : !isPlanning}
                            onValueChange={pickIsPlanning}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
