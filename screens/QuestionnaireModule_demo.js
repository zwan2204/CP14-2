/** @format */

import React, { useState } from "react";
import { Image, Text, View, SafeAreaView, CheckBox } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "../styles.js";
import axios from "axios";

export function QuestionDemo({setDemoInfo}) {
    const[gender, setGender_thisPage] = useState("");
    const[healthy, setHealthy_thisPage] = useState("");
    const[english, setEnglish_thisPage] = useState("");
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
            setDemoInfo({healthy: healthy});
            setHealthy_thisPage(healthy);
        }
    };

    const pickEnglish = english => {
        if (english !== 0) {
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
        setDemoInfo({pregnant: !isPregnant});
        setPregnant_thisPage(!isPregnant);
    };

    const pickIsSmoking = () => {
        setDemoInfo({smoking: !isSmoking});
        setSmoking_thisPage(!isSmoking);
    };

    const pickIsLactating = () => {
        setDemoInfo({lactating: !isLactating});
        setLactating_thisPage(!isLactating);
    };

    const pickIsPlanning = () => {
        setDemoInfo({planning: !isPlanning});
        setPlanning_thisPage(!isPlanning);
    };
    
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
                      <Picker.Item label="Your gender" value="0" />
                      <Picker.Item label="Male" value="Male" />
                      <Picker.Item label="Female" value="Female" />
                      <Picker.Item label="Other" value="Other" />
                  </Picker>
  
                  <Picker
                      style={{width:"35%", height:"15%", fontSize:"1em"}}
                      selectedValue={healthy}
                      onValueChange={pickHealthy}
                      >
                      <Picker.Item label="Yes/No" value="0" />
                      <Picker.Item label="Yes" value="Yes" />
                      <Picker.Item label="No" value="No" />
                  </Picker>
  
                  <Picker
                      style={{width:"35%", height:"15%", fontSize:"1em"}}
                      selectedValue={english}
                      onValueChange={pickEnglish}
                      >
                      <Picker.Item label="Yes/No" value="0" />
                      <Picker.Item label="Yes" value="Yes" />
                      <Picker.Item label="No" value="No" />
                  </Picker>
  
                  <Picker
                      style={{width:"35%", height:"15%", fontSize:"1em"}}
                      selectedValue={curLocation}
                      onValueChange={pickCurLocation}
                      >
                      <Picker.Item label="Your current location" value="0" />
                      <Picker.Item label="Home" value="Home" />
                      <Picker.Item label="GP service" value="GP" />
                      <Picker.Item label="Clinic" value="Clinic" />
                      <Picker.Item label="Hospital" value="Hospital" />
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
                          value={isPregnant}
                          onValueChange={pickIsPregnant}
                      />
                  </View>
                  <View style={{flexDirection: "row", alignItems:"center", alignContent:"center", paddingRight:"5%"}}>
                      <Text style={{fontSize:"1.5em", paddingRight:20}}>
                          Smoking
                      </Text>
                      <CheckBox
                          style={{height:"1.5em", width:"1.5em"}}
                          value={isSmoking}
                          onValueChange={pickIsSmoking}
                      />
                  </View>
                  <View style={{flexDirection: "row", alignItems:"center", alignContent:"center", paddingRight:"5%"}}>
                      <Text style={{fontSize:"1.5em", paddingRight:20}}>
                          Lactating
                      </Text>
                      <CheckBox
                          style={{height:"1.5em", width:"1.5em"}}
                          value={isLactating}
                          onValueChange={pickIsLactating}
                      />
                  </View>
                  <View style={{flexDirection: "row", alignItems:"center", alignContent:"center", paddingRight:"5%"}}>
                      <Text style={{fontSize:"1.5em" , paddingRight:20}}>
                          Planning on becoming pregnant
                      </Text>
                      <CheckBox
                          style={{height:"1.5em", width:"1.5em"}}
                          value={isPlanning}
                          onValueChange={pickIsPlanning}
                      />
                  </View>
              </View>
          </View>
      </SafeAreaView>
  );
}
