import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "./src/screens/Login";
import RegisterScreen from "./src/screens/Register";

import AdminTabNavigator from "./src/navigation/AdminTabs";
import UserTabNavigator from "./src/navigation/UserTabs";

import { AuthProvider } from "./src/contexts/AuthContext";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator initialRouteName="Login">
          {/* Auth Screens */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />

          {/* Role-specific tab navigators */}
          <Stack.Screen name="AdminTabs" component={AdminTabNavigator} />
          <Stack.Screen name="UserTabs" component={UserTabNavigator} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
