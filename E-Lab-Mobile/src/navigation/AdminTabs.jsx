import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import AdminHome from "../screens/AdminHome";
import AccountDetails from "../components/AccountDetails";

const AdminTabs = createBottomTabNavigator();

const AdminTabNavigator = () => (
  <AdminTabs.Navigator>
    <AdminTabs.Screen
      name="AdminHome"
      component={AdminHome}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" size={size} color={color} /> // Home icon
        ),
      }}
    />
    <AdminTabs.Screen
      name="AdminAccount"
      component={AccountDetails}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="settings" size={size} color={color} /> // Settings icon
        ),
      }}
    />
  </AdminTabs.Navigator>
);

export default AdminTabNavigator;
