/** @format */

import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Login from "../screens/LoginScreen";
import Signup from "../screens/SignupScreen";
import CriteriaUploading from "../screens/CriteriaUploading";
import ParticipantPage from "../screens/ParticipantPage";
import WorkerPage from "../screens/WorkerPage";
import ParticipantInfoScreen from "../screens/ParticipantInfoScreen"
import QuestionAnswerPage from "../screens/QuestionAnswerPage"
import QuestionPreLoadingPage from "../screens/QuestionPreLoadingPage"

export default createAppContainer(
  createSwitchNavigator({
    QuestionAnswerPage: QuestionAnswerPage,
    Login: Login,
    Signup: Signup,
    CriteriaUploading: CriteriaUploading,
    WorkerPage: WorkerPage,
    ParticipantPage: ParticipantPage,
    ParticipantInfoScreen: ParticipantInfoScreen
  })
);
