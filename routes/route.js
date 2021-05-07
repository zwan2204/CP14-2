/** @format */

import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import LoginScreen from "../screens/LoginScreen";
import ProjectUploading from "../screens/ProjectUploading";
import SignupScreen from "../screens/SignupScreen";
import WorkerScreen from "../screens/WorkerPage";
import QuestionAnswerPage from "../screens/QuestionAnswerPage";
import ProjectManagement from "../screens/ProjectManagement";
import ProtectedRoute from "./protetctedRoute";
import ProjectApprovalScreen from "../screens/ProjectApprovalScreen";
import ProjectPreview from "../screens/ProjectPreview";
import ProjectAvailable from "../screens/ProjectAvailable";
import PendingEdit from "../screens/PendingEdit";
import {
  LOGIN_URL,
  REGISTER_URL,
  PARTICIPANT_URL,
  PARTICIPANT_INFO_URL,
  PROJECT_UPLOAD_URL,
  WORKER_URL,
  QUESTIONNAIRE_URL,
  PROJECT_MANAGEMENT_URL,
  PROJECT_APPROVAL_URL,
  PROJECT_PRIVIEW,
  PROJECT_AVAILABLE,
  PENDING_EDIT
} from "./urlMap";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Redirect exact from="/" to={LOGIN_URL} />
      <Route exact path={LOGIN_URL} component={LoginScreen} />
      <ProtectedRoute
        exact
        path={PROJECT_UPLOAD_URL}
        component={ProjectUploading}
      />
      <ProtectedRoute
        exact
        path={PROJECT_MANAGEMENT_URL}
        component={ProjectManagement}
      />
      <Route exact path={PENDING_EDIT} component={PendingEdit} />
      <Route exact path={PROJECT_AVAILABLE} component={ProjectAvailable} />
      <Route exact path={PROJECT_PRIVIEW} component={ProjectPreview} />
      <Route exact path={REGISTER_URL} component={SignupScreen} />
      <Route exact path={WORKER_URL} component={WorkerScreen} />
      <Route exact path={QUESTIONNAIRE_URL} component={QuestionAnswerPage} />
      <Route
        exact
        path={PROJECT_APPROVAL_URL}
        component={ProjectApprovalScreen}
      />
    </Switch>
  </BrowserRouter>
);

export default Routes;
