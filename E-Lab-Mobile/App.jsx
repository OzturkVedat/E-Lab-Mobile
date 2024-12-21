import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./src/screens/Login";
import RegisterScreen from "./src/screens/Register";
import AdminDashboard from "./src/screens/AdminDashboard";
import UserDashboard from "./src/screens/UserDashboard";
import { AuthProvider } from "./src/contexts/AuthContext";

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="AdminHome" component={AdminDashboard} />
          <Stack.Screen name="UserHome" component={UserDashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
