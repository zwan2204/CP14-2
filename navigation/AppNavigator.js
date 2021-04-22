/** @format */

// /** @format */

import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Login from "../screens/LoginScreen";
import Signup from "../screens/SignupScreen";
import ProjectUploading from "../screens/ProjectUploading";
import ParticipantPage from "../screens/ParticipantPage";
import WorkerPage from "../screens/WorkerPage";
import ParticipantInfoScreen from "../screens/ParticipantInfoScreen";
import QuestionAnswerPage from "../screens/QuestionAnswerPage_gq";
import QuestionPreLoadingPage from "../screens/QuestionPreLoadingPage";

export default createAppContainer(
  createSwitchNavigator({
    QuestionAnswerPage: QuestionAnswerPage,
    Login: Login,
    Signup: Signup,
    ProjectUploading: ProjectUploading,
    WorkerPage: WorkerPage,
    ParticipantPage: ParticipantPage,
    ParticipantInfoScreen: ParticipantInfoScreen,
  })
);
