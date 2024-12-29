import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { TextInput as PaperInput, Button as PaperButton, Snackbar } from "react-native-paper";
import axios from "axios";
import Constants from "expo-constants";

const baseURL = Constants.expoConfig.extra.apiBaseUrl;

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    tckn: "",
    birthDate: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigation = useNavigation();

  const handleChange = (type, value) => {
    setFormData({ ...formData, [type]: value });
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      await axios.post(`${baseURL}/account/register`, formData);
      Alert.alert("Başarılı", "Kayıt oldunuz.");
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Kayıt başarısız.");
      console.error("Error registering user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>

      <PaperInput label="Ad Soyad" value={formData.fullName} onChangeText={(value) => handleChange("fullName", value)} style={styles.input} mode="outlined" />
      <PaperInput label="TC Kimlik No" value={formData.tckn} onChangeText={(value) => handleChange("tckn", value)} style={styles.input} keyboardType="numeric" mode="outlined" />
      <PaperInput label="Doğum Tarihi (YYYY-AA-GG)" value={formData.birthDate} onChangeText={(value) => handleChange("birthDate", value)} style={styles.input} mode="outlined" />
      <PaperInput label="Şifre" value={formData.password} onChangeText={(value) => handleChange("password", value)} style={styles.input} secureTextEntry mode="outlined" />

      <PaperButton mode="contained" loading={loading} onPress={handleRegister} style={styles.button}>
        {loading ? "Kaydolunuyor..." : "Kayıt ol"}
      </PaperButton>
      <Snackbar visible={!!successMessage} onDismiss={() => setSuccessMessage("")} duration={Snackbar.DURATION_SHORT} style={styles.successSnackbar}>
        {successMessage}
      </Snackbar>
      <Snackbar visible={!!errorMessage} onDismiss={() => setErrorMessage("")} duration={Snackbar.DURATION_SHORT} style={styles.errorSnackbar}>
        {errorMessage}
      </Snackbar>
      <Text style={styles.textCenter}>
        Hesabın zaten var mı?{" "}
        <Text style={styles.linkText} onPress={() => navigation.navigate("Login")}>
          Giriş yap
        </Text>
      </Text>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
  },
  textCenter: {
    textAlign: "center",
    marginTop: 16,
  },
  linkText: {
    color: "blue",
  },
  successSnackbar: {
    backgroundColor: "green",
    marginBottom: 20,
  },
  errorSnackbar: {
    backgroundColor: "red",
    marginBottom: 20,
  },
});

export default RegisterScreen;
