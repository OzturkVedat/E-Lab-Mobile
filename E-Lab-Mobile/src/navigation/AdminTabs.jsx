import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import AdminHome from "../screens/AdminHome";
import AccountDetails from "../components/AccountDetails";
import PatientsList from "../components/PatientsList";

const AdminTabs = createBottomTabNavigator();

const AdminTabNavigator = () => (
  <AdminTabs.Navigator
    screenOptions={{
      tabBarActiveTintColor: "purple",
      tabBarInactiveTintColor: "gray",
    }}
  >
    <AdminTabs.Screen
      name="AdminHome"
      component={AdminHome}
      options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="menu" size={size} color={color} />,
        tabBarLabel: "Kılavuz",
        headerShown: false,
      }}
    />
    <AdminTabs.Screen
      name="PatientsList"
      component={PatientsList}
      options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="body" size={size} color={color} />,
        tabBarLabel: "Hastalar",
        headerShown: false,
      }}
    />
    <AdminTabs.Screen
      name="AdminAccount"
      component={AccountDetails}
      options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />,
        tabBarLabel: "Hesap",
        headerShown: false,
      }}
    />
  </AdminTabs.Navigator>
);

export default AdminTabNavigator;
