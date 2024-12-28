import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthContext } from "../contexts/AuthContext";
import UserTabNavigator from "./UserTabs";
import AdminTabNavigator from "./AdminTabs";

const AppNavigator = () => {
  const { role } = useContext(AuthContext);

  return <NavigationContainer>{role === "Admin" ? <AdminTabNavigator /> : <UserTabNavigator />}</NavigationContainer>;
};

export default AppNavigator;
