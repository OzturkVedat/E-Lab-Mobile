import React from "react";
import { View, Text } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

import axiosInstance from "../utils/axiosSetup";

const UserDashboard = () => {
  // kullanıcı (hasta) ekranı ana sayfası
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Card style={{ width: "80%", padding: 16 }}>
        <Title>Welcome User</Title>
      </Card>
    </View>
  );
};

export default UserDashboard;
