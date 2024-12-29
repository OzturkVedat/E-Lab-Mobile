import React, { useState, useContext } from "react";
import { View, Text } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { TextInput, Button, Snackbar, HelperText } from "react-native-paper"; // Import Paper components

const LoginScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    tckn: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { login, isAuthenticated, role } = useContext(AuthContext);

  const handleChange = (type, value) => {
    setFormData({ ...formData, [type]: value });
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(formData);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Giriş başarısız.");
      console.error("Error logging in:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16, backgroundColor: "white" }}>
      <Text style={{ fontSize: 24, textAlign: "center", marginBottom: 20, fontWeight: "bold" }}>E-Lab'e Giriş Yap</Text>

      <TextInput label="TC Kimlik No" value={formData.tckn} onChangeText={(value) => handleChange("tckn", value)} keyboardType="numeric" mode="outlined" style={{ marginBottom: 16 }} theme={{ colors: { primary: "#6200ee" } }} error={!!errorMessage} />

      <HelperText type="error" visible={!!errorMessage}>
        {errorMessage && errorMessage.includes("TC Kimlik No") && errorMessage}
      </HelperText>

      <TextInput label="Şifre" value={formData.password} onChangeText={(value) => handleChange("password", value)} secureTextEntry mode="outlined" style={{ marginBottom: 16 }} theme={{ colors: { primary: "#6200ee" } }} error={!!errorMessage} />

      <HelperText type="error" visible={!!errorMessage}>
        {errorMessage && errorMessage.includes("Şifre") && errorMessage}
      </HelperText>

      <Button mode="contained" loading={loading} onPress={handleLogin} style={{ marginBottom: 16 }} theme={{ colors: { primary: "#6200ee" } }}>
        Giriş Yap
      </Button>

      {/* Register Link */}
      <Text style={{ textAlign: "center" }}>
        Hesabın yok mu?{" "}
        <Text style={{ color: "#6200ee" }} onPress={() => navigation.navigate("Register")}>
          Kayıt ol
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
