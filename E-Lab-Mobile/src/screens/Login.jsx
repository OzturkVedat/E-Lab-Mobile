import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Snackbar } from "react-native-paper";

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { login, isAuthenticated, role } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(formData); // authContext'e yolla

      if (role === "Admin") {
        // role göre kullanıcıyı yönlendir
        navigation.navigate("AdminHome");
      } else {
        navigation.navigate("UserHome");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed.");
      console.error("Error logging in:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16, backgroundColor: "white" }}>
      <Text style={{ fontSize: 24, textAlign: "center", marginBottom: 20 }}>Login</Text>

      {/* Email Input */}
      <TextInput style={{ height: 50, borderColor: "#ccc", borderWidth: 1, borderRadius: 5, paddingLeft: 10, marginBottom: 16 }} placeholder="Email" keyboardType="email-address" value={formData.email} onChangeText={(value) => handleChange("email", value)} />

      {/* Password Input */}
      <TextInput style={{ height: 50, borderColor: "#ccc", borderWidth: 1, borderRadius: 5, paddingLeft: 10, marginBottom: 16 }} placeholder="Password" secureTextEntry value={formData.password} onChangeText={(value) => handleChange("password", value)} />

      <Button title="Login" mode="contained" loading={loading} onPress={handleLogin} style={{ marginBottom: 16 }} />

      {/* Register Link */}
      <Text style={{ textAlign: "center" }}>
        Don't have an account?{" "}
        <Text style={{ color: "blue" }} onPress={() => navigation.navigate("Register")}>
          Register here
        </Text>
      </Text>

      {/* Snackbar for error messages */}
      <Snackbar visible={!!errorMessage} onDismiss={() => setErrorMessage("")} duration={Snackbar.DURATION_SHORT} style={{ backgroundColor: "red", marginBottom: 20 }}>
        {errorMessage}
      </Snackbar>
    </View>
  );
};

export default LoginScreen;
