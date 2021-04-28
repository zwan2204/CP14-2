/** @format */

import React, { Component, useState } from "react";
import { Image, Text, View, SafeAreaView, CheckBox } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "../styles.js";
import axios from "axios";

const userID = localStorage.getItem("userId");

export const updateUserInfo = ({userInfo}) => {
    console.log(userInfo);
    axios
        .put(`http://localhost:12345/api/users/update/${userID}`, {
            gender: userInfo["gender"],
            english: userInfo["english"],
            healthy: userInfo["healthy"],
            isPregnant: userInfo["isPregnant"],
            isSmoking: userInfo["isSmoking"],
            isLactating: userInfo["isLactating"],
            isPlanning: userInfo["isPlanning"],
        })
        .then(
            (response) => {getProjects();},
            (error) => {console.log(error);}
        );
}

export const getUserInfo = ({setGet}) => {
    let userInfo = {};
    axios.get(`http://localhost:12345/api/users/${userID}`).then(
        (response) => {
            userInfo["gender"] = response.data.gender;
            userInfo["healthy"] = response.data.healthy;
            userInfo["english"] = response.data.english;
            userInfo["location"] = "";
            userInfo["isPregnant"] = response.data.isPregnant;
            userInfo["isSmoking"] = response.data.isSmoking;
            userInfo["isLactating"] = response.data.isLactating;
            userInfo["isPlanning"] = response.data.isPlanning;
            setGet(true);
        },
        (error) => {
            console.log(error);
        }
    );
    return userInfo;
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
