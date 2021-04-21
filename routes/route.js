/** @format */

import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginScreen from "../screens/LoginScreen";
import CriteriaUploading from "../screens/CriteriaUploading";
import ParticipantInfoScreen from "../screens/ParticipantInfoScreen";
import ParticipantPage from "../screens/ParticipantPage";
import SignupScreen from "../screens/SignupScreen";
import WorkerScreen from "../screens/WorkerPage";

import {
  LOGIN_URL,
  REGISTER_URL,
  PARTICIPANT_URL,
  PARTICIPANT_INFO_URL,
  PROJECT_UPLOAD_URL,
  WORKER_URL
} from "./urlMap";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      {/* <Redirect exact from="/" to={LOGIN_URL} /> */}
      <Route exact path={LOGIN_URL} component={LoginScreen} />
      <Route exact path={PROJECT_UPLOAD_URL} component={CriteriaUploading} />
      <Route
        exact
        path={PARTICIPANT_INFO_URL}
        component={ParticipantInfoScreen}
      />
      <Route exact path={PARTICIPANT_URL} component={ParticipantPage} />
      <Route exact path={REGISTER_URL} component={SignupScreen} />
      <Route exact path={WORKER_URL} component={WorkerScreen} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
