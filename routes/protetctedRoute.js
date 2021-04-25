/** @format */
import React from "react";
import { Route, Redirect } from "react-router-dom";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOGIN_URL } from "./urlMap";

export const isLoggedIn = async () => {
  const role = await AsyncStorage.getItem("role");
  return role === "Admin";
};

const ProtectedRoute = ({ component: ProtectedComponent, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
        if (!isLoggedIn())
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
