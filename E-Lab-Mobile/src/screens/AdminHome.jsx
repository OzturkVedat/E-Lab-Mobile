import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Title } from "react-native-paper";

import axiosInstance from "../utils/axiosSetup";

const AdminHome = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Main content above the tab navigator */}
        <Card style={styles.card}>
          <Title>Welcome, Admin</Title>
          <Text style={styles.cardText}>Use the tabs below to navigate between the features of the admin panel.</Text>
        </Card>
      </View>

      {/* Static TabNavigator at the bottom */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "80%",
    padding: 16,
  },
  cardText: {
    marginTop: 8,
  },
});

export default AdminHome;
