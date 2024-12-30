import React, { useState } from "react";
import { View, ScrollView, Alert, SafeAreaView, Platform } from "react-native";
import { TextInput, Card, Title, Button, Text, Portal } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import axiosInstance from "../utils/axiosSetup";

import ManualApModal from "../modals/ManualApModal";
import ManualCilvModal from "../modals/ManualCilvModal";
import ManualOsModal from "../modals/ManualOsModal";
import ManualTjpModal from "../modals/ManualTjpModal";
import ManualTubitakModal from "../modals/ManualTubitakModal";

const AdminHome = () => {
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [igA, setIgA] = useState("");
  const [igM, setIgM] = useState("");
  const [igG, setIgG] = useState("");
  const [igG1, setIgG1] = useState("");
  const [igG2, setIgG2] = useState("");
  const [igG3, setIgG3] = useState("");
  const [igG4, setIgG4] = useState("");
  const [result, setResult] = useState(null);

  const [isManualApVisible, setManualApVisible] = useState(false);
  const [isManualCilvVisible, setManualCilvVisible] = useState(false);
  const [isManualOsVisible, setManualOsVisible] = useState(false);
  const [isManualTjpVisible, setManualTjpVisible] = useState(false);
  const [isManualTubitakVisible, setManualTubitakVisible] = useState(false);

  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 18);

  const maxDate = new Date();

  const handleSubmit = async () => {
    const formattedBirthDate = birthDate.toISOString().split("T")[0];

    if (new Date(formattedBirthDate) > new Date()) {
      return Alert.alert("Hata", "Doğum tarihi bugünden ileri olamaz.");
    }

    const payload = {
      BirthDate: formattedBirthDate,
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

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setBirthDate(currentDate);
    setShowDatePicker(false);
  };

  const openModal = (modalType) => {
    switch (modalType) {
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

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 40 }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Card style={{ marginBottom: 20 }}>
          <Card.Content>
            <Title style={{ fontSize: 24, marginBottom: 16 }}>Kılavuzlarda Ara</Title>

            <Button mode="outlined" onPress={() => setShowDatePicker(true)} style={{ marginBottom: 12 }}>
              Doğum Tarihi Seç
            </Button>

            <Text style={{ fontSize: 16, marginBottom: 12 }}>
              Doğum Tarihi: <Text style={{ fontWeight: "bold", fontSize: 18 }}>{birthDate.toLocaleDateString("tr-TR")}</Text>
            </Text>

            {showDatePicker && <DateTimePicker value={birthDate} mode="date" display="default" onChange={handleDateChange} locale="tr-TR" minimumDate={minDate} maximumDate={maxDate} />}

            <TextInput label="IgA (mg/dL)" value={igA} onChangeText={setIgA} keyboardType="numeric" style={{ marginBottom: 12 }} />
            <TextInput label="IgM (mg/dL)" value={igM} onChangeText={setIgM} keyboardType="numeric" style={{ marginBottom: 12 }} />
            <TextInput label="IgG (mg/dL)" value={igG} onChangeText={setIgG} keyboardType="numeric" style={{ marginBottom: 12 }} />
            <TextInput label="IgG1 (mg/dL)" value={igG1} onChangeText={setIgG1} keyboardType="numeric" style={{ marginBottom: 12 }} />
            <TextInput label="IgG2 (mg/dL)" value={igG2} onChangeText={setIgG2} keyboardType="numeric" style={{ marginBottom: 12 }} />
            <TextInput label="IgG3 (mg/dL)" value={igG3} onChangeText={setIgG3} keyboardType="numeric" style={{ marginBottom: 12 }} />
            <TextInput label="IgG4 (mg/dL)" value={igG4} onChangeText={setIgG4} keyboardType="numeric" style={{ marginBottom: 12 }} />

            <Button mode="contained" onPress={handleSubmit} style={{ marginTop: 16, marginBottom: 20 }}>
              Sonuçları Getir
            </Button>
          </Card.Content>

          {result && (
            <View style={{ marginTop: 16, marginBottom: 20 }}>
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
      </ScrollView>

      <Portal>
        {isManualApVisible && <ManualApModal visible={isManualApVisible} onClose={closeModal} result={result?.manualApResults} />}
        {isManualCilvVisible && <ManualCilvModal visible={isManualCilvVisible} onClose={closeModal} result={result?.manualCilvResults} />}
        {isManualOsVisible && <ManualOsModal visible={isManualOsVisible} onClose={closeModal} result={result?.manualOsResults} />}
        {isManualTjpVisible && <ManualTjpModal visible={isManualTjpVisible} onClose={closeModal} result={result?.manualTjpResults} />}
        {isManualTubitakVisible && <ManualTubitakModal visible={isManualTubitakVisible} onClose={closeModal} result={result?.manualTubitakResults} />}
      </Portal>
    </SafeAreaView>
  );
};

export default AdminHome;
