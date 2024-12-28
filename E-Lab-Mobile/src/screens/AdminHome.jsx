import React, { useState } from "react";
import { View, ScrollView, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

import axiosInstance from "../utils/axiosSetup";

import ManualApModal from "../modals/ManualApModal";
import ManualCilvModal from "../modals/ManualCilvModal";
import ManualOsModal from "../modals/ManualOsModal";
import ManualTjpModal from "../modals/ManulaTjpModal";
import ManualTubitakModal from "../modals/ManualTubitakModal";

const AdminHome = () => {
  const [ageInMonths, setAgeInMonths] = useState("");
  const [igA, setIgA] = useState("");
  const [igM, setIgM] = useState("");
  const [igG, setIgG] = useState("");
  const [igG1, setIgG1] = useState("");
  const [igG2, setIgG2] = useState("");
  const [igG3, setIgG3] = useState("");
  const [igG4, setIgG4] = useState("");
  const [result, setResult] = useState(null); // result from API

  const [isManualApVisible, setManualApVisible] = useState(false);
  const [isManualCilvVisible, setManualCilvVisible] = useState(false);
  const [isManualOsVisible, setManualOsVisible] = useState(false);
  const [isManualTjpVisible, setManualTjpVisible] = useState(false);
  const [isManualTubitakVisible, setManualTubitakVisible] = useState(false);

  const openModal = (manual) => {
    switch (manual) {
      case "manualAp":
        setManualApVisible(true);
        break;
      case "manualCilv":
        setManualCilvVisible(true);
        break;
      case "manualOs":
        setManualOsVisible(true);
        break;
      case "manualTjp":
        setManualTjpVisible(true);
        break;
      case "manualTubitak":
        setManualTubitakVisible(true);
        break;
      default:
        break;
    }
  };

  const closeModal = () => {
    setManualApVisible(false);
    setManualCilvVisible(false);
    setManualOsVisible(false);
    setManualTjpVisible(false);
    setManualTubitakVisible(false);
  };

  const handleSubmit = async () => {
    const payload = {
      AgeInMonths: parseInt(ageInMonths, 10),
      IgA: igA ? parseFloat(igA) : null,
      IgM: igM ? parseFloat(igM) : null,
      IgG: igG ? parseFloat(igG) : null,
      IgG1: igG1 ? parseFloat(igG1) : null,
      IgG2: igG2 ? parseFloat(igG2) : null,
      IgG3: igG3 ? parseFloat(igG3) : null,
      IgG4: igG4 ? parseFloat(igG4) : null,
    };

    try {
      const response = await axiosInstance.post("/admin/check-manual", payload);
      if (response.status === 200 && response.data) {
        setResult(response.data.data);
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Card style={styles.card}>
            <Title>Kılavuzlarda Ara</Title>

            {/* Form inputs */}
            <TextInput style={styles.input} placeholder="Yaş (ay)" value={ageInMonths} onChangeText={setAgeInMonths} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="IgA (mg/dL)" value={igA} onChangeText={setIgA} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="IgM (mg/dL)" value={igM} onChangeText={setIgM} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="IgG (mg/dL)" value={igG} onChangeText={setIgG} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="IgG1 (mg/dL)" value={igG1} onChangeText={setIgG1} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="IgG2 (mg/dL)" value={igG2} onChangeText={setIgG2} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="IgG3 (mg/dL)" value={igG3} onChangeText={setIgG3} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="IgG4 (mg/dL)" value={igG4} onChangeText={setIgG4} keyboardType="numeric" />

            {/* Submit Button */}
            <Button title="Sonuçları Getir" onPress={handleSubmit} />

            {result && (
              <View style={styles.result}>
                <Text>Sonuçlar:</Text>
                <Button title="Ap Kılavuzu Sonuçları" onPress={() => openModal("manualAp")} />
                <Button title="Cilv Kılavuzu Sonuçları" onPress={() => openModal("manualCilv")} />
                <Button title="Os Kılavuzu Sonuçları" onPress={() => openModal("manualOs")} />
                <Button title="Tjp Kılavuzu Sonuçları" onPress={() => openModal("manualTjp")} />
                <Button title="Tubitak Kılavuzu Sonuçları" onPress={() => openModal("manualTubitak")} />
              </View>
            )}
          </Card>
        </View>
        {/* Modals */}
        {isManualApVisible && <ManualApModal visible={isManualApVisible} onClose={closeModal} result={result?.manualApResults} />}
        {isManualCilvVisible && <ManualCilvModal visible={isManualCilvVisible} onClose={closeModal} result={result?.manualCilvResults} />}
        {isManualOsVisible && <ManualOsModal visible={isManualOsVisible} onClose={closeModal} result={result?.manualOsResults} />}
        {isManualTjpVisible && <ManualTjpModal visible={isManualTjpVisible} onClose={closeModal} result={result?.manualTjpResults} />}
        {isManualTubitakVisible && <ManualTubitakModal visible={isManualTubitakVisible} onClose={closeModal} result={result?.manualTubitakResults} />}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    padding: 16,
  },
  input: {
    width: "100%",
    padding: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 4,
  },
  result: {
    marginTop: 20,
  },
});
export default AdminHome;
