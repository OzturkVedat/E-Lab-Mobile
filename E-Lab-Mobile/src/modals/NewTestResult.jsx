import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Dialog, Portal, Button, Text, TextInput } from "react-native-paper";
import axiosInstance from "../utils/axiosSetup";

const NewTestResult = ({ isVisible, onClose, patientId }) => {
  const [igA, setIgA] = useState("");
  const [igM, setIgM] = useState("");
  const [igG, setIgG] = useState("");
  const [igG1, setIgG1] = useState("");
  const [igG2, setIgG2] = useState("");
  const [igG3, setIgG3] = useState("");
  const [igG4, setIgG4] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if ([igA, igM, igG, igG1, igG2, igG3, igG4].some((value) => value && parseFloat(value) < 0)) {
      return Alert.alert("Hata!", "Negatif değer giremezsiniz.");
    }
    const payload = {
      PatientId: patientId,
      IgA: igA ? parseFloat(igA) : null,
      IgM: igM ? parseFloat(igM) : null,
      IgG: igG ? parseFloat(igG) : null,
      IgG1: igG1 ? parseFloat(igG1) : null,
      IgG2: igG2 ? parseFloat(igG2) : null,
      IgG3: igG3 ? parseFloat(igG3) : null,
      IgG4: igG4 ? parseFloat(igG4) : null,
    };
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/admin/new-test-result", payload);
      if (response.status === 200 && response.data) {
        Alert.alert("Başarılı!", "Tahlil başarıyla eklendi.");
        onClose();
      } else {
        setResult(null);
        Alert.alert("Hata!", "Bir hata oluştu, lütfen tekrar deneyin.");
      }
    } catch (error) {
      console.error("Error fetching manual results:", error);
      setResult(null);
      Alert.alert("Hata", error.response?.data?.message || "Kılavuz kontrolünde hata oluştu.");
    }
  };

  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={onClose}>
        <Dialog.Title>Yeni Tahlil Ekle</Dialog.Title>
        <Dialog.Content>
          <View style={styles.inputContainer}>
            <TextInput label="IgA (mg/dL)" value={igA} onChangeText={setIgA} keyboardType="numeric" style={styles.input} mode="outlined" />
            <TextInput label="IgM (mg/dL)" value={igM} onChangeText={setIgM} keyboardType="numeric" style={styles.input} mode="outlined" />
            <TextInput label="IgG (mg/dL)" value={igG} onChangeText={setIgG} keyboardType="numeric" style={styles.input} mode="outlined" />
            <TextInput label="IgG1 (mg/dL)" value={igG1} onChangeText={setIgG1} keyboardType="numeric" style={styles.input} mode="outlined" />
            <TextInput label="IgG2 (mg/dL)" value={igG2} onChangeText={setIgG2} keyboardType="numeric" style={styles.input} mode="outlined" />
            <TextInput label="IgG3 (mg/dL)" value={igG3} onChangeText={setIgG3} keyboardType="numeric" style={styles.input} mode="outlined" />
            <TextInput label="IgG4 (mg/dL)" value={igG4} onChangeText={setIgG4} keyboardType="numeric" style={styles.input} mode="outlined" />
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button mode="contained" onPress={handleSubmit} loading={isLoading} disabled={isLoading} style={styles.button}>
            {isLoading ? "Ekleniyor..." : "Ekle"}
          </Button>
          <Button mode="outlined" onPress={onClose} textColor="red" style={styles.closeButton}>
            Kapat
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    marginVertical: 8,
    padding: 2,
    paddingHorizontal: 6,
    backgroundColor: "#6200ea", // Purple color for the button
  },
  closeButton: {
    marginVertical: 8,
    borderColor: "red",
  },
});

export default NewTestResult;
