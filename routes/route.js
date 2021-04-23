/** @format */

import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import LoginScreen from "../screens/LoginScreen";
import ProjectUploading from "../screens/ProjectUploading";
import ParticipantInfoScreen from "../screens/ParticipantInfoScreen";
import ParticipantPage from "../screens/ParticipantPage";
import SignupScreen from "../screens/SignupScreen";
import WorkerScreen from "../screens/WorkerPage";
import QuestionAnswerPage from "../screens/QuestionAnswerPage_gq";
import QuestionSpecificPage from "../screens/QuestionAnswerPage_sq";
import ProjectManagement from "../screens/ProjectManagement";

import {
  LOGIN_URL,
  REGISTER_URL,
  PARTICIPANT_URL,
  PARTICIPANT_INFO_URL,
  PROJECT_UPLOAD_URL,
  WORKER_URL,
  QUESTIONNAIRE_URL,
  QUESTIONNAIRE_SPECIFIC_URL,
  PROJECT_MANAGEMENT_URL,
} from "./urlMap";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Redirect exact from="/" to={LOGIN_URL} />
      <Route exact path={LOGIN_URL} component={LoginScreen} />
      <Route exact path={PROJECT_UPLOAD_URL} component={ProjectUploading} />
      <Route
        exact
        path={PROJECT_MANAGEMENT_URL}
        component={ProjectManagement}
      />
      <Route
        exact
        path={PARTICIPANT_INFO_URL}
        component={ParticipantInfoScreen}
      />
      <Route exact path={PARTICIPANT_URL} component={ParticipantPage} />
      <Route exact path={REGISTER_URL} component={SignupScreen} />
      <Route exact path={WORKER_URL} component={WorkerScreen} />
      <Route exact path={QUESTIONNAIRE_URL} component={QuestionAnswerPage} />
      <Route
        exact
        path={QUESTIONNAIRE_SPECIFIC_URL}
        component={QuestionSpecificPage}
      />
    </Switch>
  </BrowserRouter>
);

export default Routes;
