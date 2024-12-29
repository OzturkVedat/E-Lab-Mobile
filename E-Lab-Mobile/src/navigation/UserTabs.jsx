import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import UserHome from "../screens/UserHome";
import AccountDetails from "../components/AccountDetails";

const UserTabs = createBottomTabNavigator();

const UserTabNavigator = () => (
  <UserTabs.Navigator
    screenOptions={{
      tabBarActiveTintColor: "purple", // Active tab color
      tabBarInactiveTintColor: "gray", // Inactive tab color
    }}
  >
    <UserTabs.Screen
      name="UserHome"
      component={UserHome}
      options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="menu" size={size} color={color} />,
        tabBarLabel: "Tahlillerim",
        headerShown: false,
      }}
    />
    <UserTabs.Screen
      name="UserAccount"
      component={AccountDetails}
      options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        tabBarLabel: "Hesabım",
        headerShown: false,
      }}
    />
  </UserTabs.Navigator>
);

export default UserTabNavigator;
