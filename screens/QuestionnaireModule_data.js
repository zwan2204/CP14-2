/** @format */

import React, { Component, useState } from "react";
import { Image, Text, View, SafeAreaView, CheckBox } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "../styles.js";
import axios from "axios";

const getUserAge = (userID) => {
    axios.get("http://localhost:12345/api/patients").then(
        (response) => {
            for (let i = 0; i < Object.keys(response.data).length; i++) {
                console.log("hehehe");

                if (response.data[i].email == "tests12242322") {
                    setUser(userID);
                    return ("hehehehe");
                }
            }
        },
        (error) => {
            return "meiyou";
        }
    );
    return null;
}
export default getUserAge;
