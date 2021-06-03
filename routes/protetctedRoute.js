/** @format */
import React from "react";
import { Route, Redirect } from "react-router-dom";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOGIN_URL } from "./urlMap";

export const isAdmin = () => {
  const role = localStorage.getItem("role") || "";
  return role === "Admin" || role === "Project Manager";
};

export const isAdmin2 = () => {
  const role = "Admin";
  return role === "Admin" || role === "Project Manager";
};

const ProtectedRoute = ({ component: ProtectedComponent, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
        if (!isAdmin())
          return (
            <Redirect
              to={{
                pathname: LOGIN_URL,
                state: { from: routeProps.location.pathname }
              }}
            />
          );

        return <ProtectedComponent {...routeProps} />;
      }}
    />
  );
};

export default ProtectedRoute;
