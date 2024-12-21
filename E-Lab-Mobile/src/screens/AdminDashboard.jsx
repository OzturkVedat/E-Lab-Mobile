import React from "react";
import { View, Text } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

import axiosInstance from "../utils/axiosSetup";

// doktor ekranı ana sayfası
const AdminDashboard = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Using Card from react-native-paper for a styled container */}
      <Card style={{ width: "80%", padding: 16 }}>
        <Title>Welcome Admin</Title>
      </Card>
    </View>
  );
};

export default AdminDashboard;
