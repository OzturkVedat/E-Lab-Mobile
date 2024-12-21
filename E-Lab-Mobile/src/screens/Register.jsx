import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { Snackbar } from "react-native-paper";
import axios from "axios";
import Constants from "expo-constants";

const baseURL = Constants.expoConfig.extra.apiBaseUrl;

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    birthDate: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${baseURL}/account/register`, formData);
      setSuccessMessage("User registered successfully!");
      console.log(response.data);
      navigation.navigate("Login");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Registration failed.");
      console.error("Error registering user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16, backgroundColor: "white" }}>
      <Text style={{ fontSize: 24, textAlign: "center", marginBottom: 20 }}>Register</Text>

      <TextInput
        style={{
          height: 50,
          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 5,
          paddingLeft: 10,
          marginBottom: 16,
        }}
        placeholder="Full Name"
        value={formData.fullName}
        onChangeText={(value) => handleChange("fullName", value)}
      />

      <TextInput
        style={{
          height: 50,
          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 5,
          paddingLeft: 10,
          marginBottom: 16,
        }}
        placeholder="Email"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(value) => handleChange("email", value)}
      />

      <TextInput
        style={{
          height: 50,
          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 5,
          paddingLeft: 10,
          marginBottom: 16,
        }}
        placeholder="Birth Date (YYYY-MM-DD)"
        value={formData.birthDate}
        onChangeText={(value) => handleChange("birthDate", value)}
      />

      <TextInput
        style={{
          height: 50,
          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 5,
          paddingLeft: 10,
          marginBottom: 16,
        }}
        placeholder="Password"
        secureTextEntry
        value={formData.password}
        onChangeText={(value) => handleChange("password", value)}
      />

      <Button title={loading ? "Registering..." : "Register"} onPress={handleRegister} disabled={loading} />

      <Snackbar visible={!!successMessage} onDismiss={() => setSuccessMessage("")} duration={Snackbar.DURATION_SHORT} style={{ backgroundColor: "green", marginBottom: 20 }}>
        {successMessage}
      </Snackbar>

      <Snackbar visible={!!errorMessage} onDismiss={() => setErrorMessage("")} duration={Snackbar.DURATION_SHORT} style={{ backgroundColor: "red", marginBottom: 20 }}>
        {errorMessage}
      </Snackbar>

      <Text style={{ textAlign: "center", marginTop: 16 }}>
        Hesabın zaten var mı?{" "}
        <Text style={{ color: "blue" }} onPress={() => navigation.navigate("Login")}>
          Giriş yap
        </Text>
      </Text>
    </View>
  );
};

export default RegisterScreen;
