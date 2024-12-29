import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, StyleSheet, SafeAreaView } from "react-native";
import { Card, Title, Paragraph, Button, ActivityIndicator } from "react-native-paper";
import axiosInstance from "../utils/axiosSetup";
import { useNavigation } from "@react-navigation/native";

import ManualApModal from "../modals/ManualApModal";
import ManualCilvModal from "../modals/ManualCilvModal";
import ManualOsModal from "../modals/ManualOsModal";
import ManualTjpModal from "../modals/ManualTjpModal";
import ManualTubitakModal from "../modals/ManualTubitakModal";

const ResultDetails = ({ route }) => {
  const navigation = useNavigation(); // Use navigation hook
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isManualApVisible, setManualApVisible] = useState(false);
  const [isManualCilvVisible, setManualCilvVisible] = useState(false);
  const [isManualOsVisible, setManualOsVisible] = useState(false);
  const [isManualTjpVisible, setManualTjpVisible] = useState(false);
  const [isManualTubitakVisible, setManualTubitakVisible] = useState(false);

  const { testResultId } = route?.params || {};

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

  useEffect(() => {
    const fetchResultDetails = async () => {
      if (!testResultId) {
        setError("Test sonucu ID'si eksik.");
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get(`/user/test-result-details/${testResultId}`);
        if (response.status === 200 && response.data) {
          setResult(response.data.data);
        } else {
          setError("Test sonucu alınamadı.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Tahlil bilgileri alınırken bir hata oluştu.");
        console.error("Error fetching result details: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResultDetails();
  }, [testResultId]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Back Button */}
          <Button
            mode="text"
            onPress={() => navigation.goBack()} // Navigate back
            icon="arrow-left" // Icon for the back button
            style={styles.backButton}
          >
            Geri
          </Button>

          {/* Loading Indicator */}
          {loading && (
            <View style={styles.center}>
              <ActivityIndicator size="large" color="#6200ee" />
              <Text>Yükleniyor...</Text>
            </View>
          )}

          {/* Error Message */}
          {error && (
            <View style={styles.center}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {/* Test Result Details */}
          {!loading && !error && result && (
            <View style={styles.content}>
              <Card style={styles.card}>
                <Title>Kılavuzlarda Ara</Title>

                <Card.Content>
                  {result.details.igA !== null && <Paragraph>IgA: {result.details.igA}</Paragraph>}
                  {result.details.igM !== null && <Paragraph>IgM: {result.details.igM}</Paragraph>}
                  {result.details.igG !== null && <Paragraph>IgG: {result.details.igG}</Paragraph>}
                  {result.details.igG1 !== null && <Paragraph>IgG1: {result.details.igG1}</Paragraph>}
                  {result.details.igG2 !== null && <Paragraph>IgG2: {result.details.igG2}</Paragraph>}
                  {result.details.igG3 !== null && <Paragraph>IgG3: {result.details.igG3}</Paragraph>}
                  {result.details.igG4 !== null && <Paragraph>IgG4: {result.details.igG4}</Paragraph>}
                  <Paragraph>Uzman Onay Tarihi: {new Date(result.details.expertApproveTime).toLocaleString()}</Paragraph>
                </Card.Content>

                <View style={styles.resultButtons}>
                  <Button mode="contained" onPress={() => openModal("manualAp")} style={styles.button}>
                    Ap Kılavuzu Sonuçları
                  </Button>
                  <Button mode="contained" onPress={() => openModal("manualCilv")} style={styles.button}>
                    Cilv Kılavuzu Sonuçları
                  </Button>
                  <Button mode="contained" onPress={() => openModal("manualOs")} style={styles.button}>
                    Os Kılavuzu Sonuçları
                  </Button>
                  <Button mode="contained" onPress={() => openModal("manualTjp")} style={styles.button}>
                    Tjp Kılavuzu Sonuçları
                  </Button>
                  <Button mode="contained" onPress={() => openModal("manualTubitak")} style={styles.button}>
                    Tubitak Kılavuzu Sonuçları
                  </Button>
                </View>
              </Card>
            </View>
          )}

          {/* Modals */}
          {isManualApVisible && <ManualApModal visible={isManualApVisible} onClose={closeModal} result={result?.manualApResults} />}
          {isManualCilvVisible && <ManualCilvModal visible={isManualCilvVisible} onClose={closeModal} result={result?.manualCilvResults} />}
          {isManualOsVisible && <ManualOsModal visible={isManualOsVisible} onClose={closeModal} result={result?.manualOsResults} />}
          {isManualTjpVisible && <ManualTjpModal visible={isManualTjpVisible} onClose={closeModal} result={result?.manualTjpResults} />}
          {isManualTubitakVisible && <ManualTubitakModal visible={isManualTubitakVisible} onClose={closeModal} result={result?.manualTubitakResults} />}
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
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    marginBottom: 20,
    padding: 16,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  resultButtons: {
    marginTop: 20,
  },
  button: {
    marginBottom: 10,
  },
  backButton: {
    marginBottom: 20,
    alignSelf: "flex-start",
  },
});

export default ResultDetails;
