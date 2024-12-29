import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import LoginScreen from "./src/screens/Login";
import RegisterScreen from "./src/screens/Register";

import AdminTabNavigator from "./src/navigation/AdminTabs";
import UserTabNavigator from "./src/navigation/UserTabs";

import TestResults from "./src/components/TestResults";
import ResultDetails from "./src/components/ResultDetails";

import { AuthProvider } from "./src/contexts/AuthContext";
import { Provider as PaperProvider } from "react-native-paper";

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthProvider>
          <PaperProvider>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />

              <Stack.Screen name="AdminTabs" component={AdminTabNavigator} options={{ headerShown: false }} />
              <Stack.Screen name="UserTabs" component={UserTabNavigator} options={{ headerShown: false }} />
              <Stack.Screen name="TestResults" component={TestResults} options={{ headerShown: false }} />
              <Stack.Screen name="ResultDetails" component={ResultDetails} options={{ headerShown: false }} />
            </Stack.Navigator>
          </PaperProvider>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
