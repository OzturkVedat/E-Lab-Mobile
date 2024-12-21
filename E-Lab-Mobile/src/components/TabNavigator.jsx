import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { adminTabs, userTabs } from "../navigation/tabConfig";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Tab = createBottomTabNavigator();
// paneldeki sayfalar arası geçiş için kullanılacak
const TabNavigator = () => {
  const { user } = useContext(AuthContext);

  const tabs = user.role === "Admin" ? adminTabs : userTabs;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const tab = tabs.find((tab) => tab.name === route.name);
          return <Ionicons name={tab?.iconName || "help-circle-outline"} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      })}
    >
      {tabs.map((tab) => (
        <Tab.Screen key={tab.name} name={tab.name} component={tab.component} options={{ headerShown: false }} />
      ))}
    </Tab.Navigator>
  );
};
export default TabNavigator;
