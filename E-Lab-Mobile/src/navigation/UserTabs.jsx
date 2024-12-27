import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import UserHome from "../screens/UserHome";
import AccountDetails from "../components/AccountDetails";

const UserTabs = createBottomTabNavigator();

const UserTabNavigator = () => (
  <UserTabs.Navigator>
    <UserTabs.Screen
      name="UserHome"
      component={UserHome}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" size={size} color={color} /> // Home icon
        ),
      }}
    />
    <UserTabs.Screen
      name="UserAccount"
      component={AccountDetails}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" size={size} color={color} /> // Profile icon
        ),
      }}
    />
  </UserTabs.Navigator>
);

export default UserTabNavigator;
