import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet, Alert, SafeAreaView } from "react-native";
import { TextInput, Button, Card, Title, Portal } from "react-native-paper";

import axiosInstance from "../utils/axiosSetup";

import ManualApModal from "../modals/ManualApModal";
import ManualCilvModal from "../modals/ManualCilvModal";
import ManualOsModal from "../modals/ManualOsModal";
import ManualTjpModal from "../modals/ManualTjpModal";
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
    if ([igA, igM, igG, igG1, igG2, igG3, igG4].some((value) => value && parseFloat(value) < 0)) {
      return Alert.alert("Hata!", "Negatif değer giremezsiniz.");
    }
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
        Alert.alert("Sonuçlar bulundu!", "Kılavuzlara tıklayınız.");
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Card style={styles.card}>
              <Title style={styles.title}>Kılavuzlarda Ara</Title>

              <TextInput label="Yaş (ay)" value={ageInMonths} onChangeText={setAgeInMonths} keyboardType="numeric" style={styles.input} />
              <TextInput label="IgA (mg/dL)" value={igA} onChangeText={setIgA} keyboardType="numeric" style={styles.input} />
              <TextInput label="IgM (mg/dL)" value={igM} onChangeText={setIgM} keyboardType="numeric" style={styles.input} />
              <TextInput label="IgG (mg/dL)" value={igG} onChangeText={setIgG} keyboardType="numeric" style={styles.input} />
              <TextInput label="IgG1 (mg/dL)" value={igG1} onChangeText={setIgG1} keyboardType="numeric" style={styles.input} />
              <TextInput label="IgG2 (mg/dL)" value={igG2} onChangeText={setIgG2} keyboardType="numeric" style={styles.input} />
              <TextInput label="IgG3 (mg/dL)" value={igG3} onChangeText={setIgG3} keyboardType="numeric" style={styles.input} />
              <TextInput label="IgG4 (mg/dL)" value={igG4} onChangeText={setIgG4} keyboardType="numeric" style={styles.input} />

              <Button mode="contained" onPress={handleSubmit} style={styles.button}>
                Sonuçları Getir
              </Button>

              {result && (
                <View style={styles.result}>
                  <Button mode="outlined" onPress={() => openModal("manualAp")}>
                    Ap Kılavuzu Sonuçları
                  </Button>
                  <Button mode="outlined" onPress={() => openModal("manualCilv")}>
                    Cilv Kılavuzu Sonuçları
                  </Button>
                  <Button mode="outlined" onPress={() => openModal("manualOs")}>
                    Os Kılavuzu Sonuçları
                  </Button>
                  <Button mode="outlined" onPress={() => openModal("manualTjp")}>
                    Tjp Kılavuzu Sonuçları
                  </Button>
                  <Button mode="outlined" onPress={() => openModal("manualTubitak")}>
                    Tubitak Kılavuzu Sonuçları
                  </Button>
                </View>
              )}
            </Card>
          </View>

          {/* Modals for different result types */}
          <Portal>
            {isManualApVisible && <ManualApModal visible={isManualApVisible} onClose={closeModal} result={result?.manualApResults} />}
            {isManualCilvVisible && <ManualCilvModal visible={isManualCilvVisible} onClose={closeModal} result={result?.manualCilvResults} />}
            {isManualOsVisible && <ManualOsModal visible={isManualOsVisible} onClose={closeModal} result={result?.manualOsResults} />}
            {isManualTjpVisible && <ManualTjpModal visible={isManualTjpVisible} onClose={closeModal} result={result?.manualTjpResults} />}
            {isManualTubitakVisible && <ManualTubitakModal visible={isManualTubitakVisible} onClose={closeModal} result={result?.manualTubitakResults} />}
          </Portal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 40,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    padding: 16,
    marginBottom: 20,
  },
  input: {
    marginBottom: 12,
  },
  title: {
    padding: 15,
  },
  button: {
    marginTop: 12,
  },
  result: {
    marginTop: 20,
    paddingTop: 10,
  },
});

export default AdminHome;
