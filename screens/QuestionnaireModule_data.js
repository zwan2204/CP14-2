/** @format */

import React, { Component, useState } from "react";
import { Image, Text, View, SafeAreaView, CheckBox } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "../styles.js";
import axios from "axios";

const userID = localStorage.getItem("userId");

export const getUserInfo = () => {
    let demoInfo = {};
    axios.get(`http://localhost:12345/api/users/${userID}`).then(
        (response) => {
            demoInfo["gender"] = response.data.gender;
            demoInfo["healthy"] = response.data.healthy;
            demoInfo["english"] = response.data.english;
            demoInfo["location"] = "";
            demoInfo["isPregnant"] = response.data.isPregnant;
            demoInfo["isSmoking"] = response.data.isSmoking;
            demoInfo["isLactating"] = response.data.isLactating;
            demoInfo["isPlanning"] = response.data.isPlanning;
        },
        (error) => {
            console.log(error);
        }
    );
    return demoInfo;
}

const getUserAge = () => {
    const[age, setAge] = useState(0);
    axios.get(`http://localhost:12345/api/users/${userID}`).then(
        (response) => {
            let dob = response.data.dob;
            let tempAge = getAge(dob);
            setAge(tempAge);
        },
        (error) => {
            console.log(error);
        }
    );
    return age;
}
export default getUserAge;

const  getAge = (dateString)=>{
    var regroupData = dateString.split("/");
    var newDate = regroupData[2] + "/" + regroupData[1] + "/" + regroupData[0];
    var today = new Date();
    var birthDate = new Date(newDate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
