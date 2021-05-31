/** @format */

import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "../styles.js";
import { TextInput } from "react-native-paper";
import {identifyWorker} from "../modules/QuestionnaireModule_data";

export function HealhcareWorkerLoginView({setNeedLogin, setHandDevice, stepForward}) {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[message, setMsg] = useState("");
    const[indentify, setIdentify] = useState(false);

    {/* handle healthcare worker login */}
    const login = () => {
        //if the email entered is empty
        if (email == "") {
            setMsg("Please enter your email address");
        //if the password entered is empty
        } else if (password == "") {
            setMsg("Please enter your password");
        } else {
            //identify the worker
            identifyWorker({setIdentify, setMsg, 
                setNeedLogin, setHandDevice}, email, password);
        }
    }

    {/* store and check email */}
    const setText = (text) => {
        //check email format
        if (!text.includes("@") && text != "") {
            setMsg("Your email address is invalid");
        } else {
            setMsg("");
        }
        setEmail(text);
    }

    return (
        <View style={styles.handDeviceInner}>
            {/* title */}
            <View style={{width:"100%", height:"25%", alignItems:"center", alignContent:"center", justifyContent:"center"}}>
                <Text style={{fontSize:"1.4em", color:"#00205B"}}>Healthcare Worker Login</Text>
            </View>

            {/* email and password texts */}
            <View style={{width:"100%", height:"35%", flexDirection:"column"}}>
                <View style={{width:"100%", height:"50%", flexDirection:"row", alignContent:"center", justifyContent:"center", alignItems:"center"}}>
                    <Text style={{color:"grey", fontSize:"1.2em", width:"30%",height:30}}>Email:</Text>
                    <TextInput
                        mode="outlined"
                        style={{color:"grey", fontSize:"1.2em", height:30, width:"30%"}}
                        onChangeText={(text) => setText(text)}/>
                </View>

                <View style={{width:"100%", height:"50%", flexDirection:"row", alignContent:"center", justifyContent:"center", alignItems:"center"}}>
                    <Text style={{color:"grey", fontSize:"1.2em", width:"30%",height:30}}>Password:</Text>
                    <TextInput
                        mode="outlined"
                        style={{color:"grey", fontSize:"1.2em", height:30, width:"30%"}}
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}/>
                </View>
            </View>

            {/* message container */}
            <View style={{width:"100%", height:"15%", alignContent:"center", alignItems:"center", justifyContent:"center"}}>
                <Text style={{color:"red"}}>{message}</Text>
            </View>

            {/* button container */}
            <View style={{width:"100%", height:"25%", alignContent:"center", alignItems:"center", justifyContent:"space-evenly", flexDirection:"row"}}>
                <TouchableOpacity
                    onPress={() => {setHandDevice(false), stepForward(false)}}
                    style={styles.workerLoginButtonStyle}
                >
                    <Text style={{color:"white"}}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {login()}}
                    style={styles.workerLoginButtonStyle}
                >
                    <Text style={{color:"white"}}>Confirm</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}
