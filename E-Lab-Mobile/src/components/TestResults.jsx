import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Card, Paragraph, Button, Text, Appbar, Snackbar } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import axiosInstance from "../utils/axiosSetup";
import NewTestResult from "../modals/NewTestResult";
import { Ionicons } from "@expo/vector-icons"; // Importing Ionicons for the icon

const TestResults = ({ route }) => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const { patientId, patientName } = route?.params || {};
  const navigation = useNavigation();

  useEffect(() => {
    if (!patientId) {
      setError("Hasta ID değeri gerekli.");
      setLoading(false);
      return;
    }

    const fetchTestResults = async () => {
      try {
        const response = await axiosInstance.get(`/admin/patient-test-results/${patientId}`);
        if (response.status === 200 && response.data) {
          setTestResults(response.data.data);
        } else {
          setError("Test sonuçları getirilemedi.");
        }
      } catch (err) {
        console.error("Error fetching test results:", err);
        setError(err.response?.data?.message || "Bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestResults();
  }, [patientId]);

  const handleNewTestResult = async (data) => {
    try {
      const response = await axiosInstance.post("/admin/new-test-result", data);
      if (response.status === 200) {
        setTestResults((prevResults) => [...prevResults, response.data]); // Add the new result to the list
        setShowModal(false); // Close the modal
        setSnackbarVisible(true); // Show the success snackbar
      }
    } catch (err) {
      console.error("Error adding test result:", err);
      setSnackbarVisible(true); // Show an error snackbar
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          mode="text"
          onPress={() => navigation.goBack()} // Navigate back
          icon="arrow-left" // Icon for the back button
          style={styles.backButton}
        >
          Geri
        </Button>
        <Button
          mode="contained"
          onPress={() => setShowModal(true)}
          style={styles.addButton}
          icon={({ size, color }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} /> // Add icon here
          )}
        >
          Yeni Test Sonucu Ekle
        </Button>
      </View>

      <NewTestResult
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        patientId={patientId}
        onSubmit={handleNewTestResult} // Pass the submit handler
      />

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#6200ee" />
          <Text>Yükleniyor...</Text>
        </View>
      )}

      {!loading && error && (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {!loading && !error && testResults.length > 0 && (
        <ScrollView>
          <Text style={styles.headerText}>{patientName === null ? "Geçmiş" : patientName} Tahlil Sonuçları</Text>
          {testResults.map((result) => (
            <Card key={result.id} style={styles.card} onPress={() => navigation.navigate("ResultDetails", { testResultId: result.id })}>
              <Card.Content>
                {result.igA !== null && <Paragraph>IgA: {result.igA}</Paragraph>}
                {result.igM !== null && <Paragraph>IgM: {result.igM}</Paragraph>}
                {result.igG !== null && <Paragraph>IgG: {result.igG}</Paragraph>}
                {result.igG1 !== null && <Paragraph>IgG1: {result.igG1}</Paragraph>}
                {result.igG2 !== null && <Paragraph>IgG2: {result.igG2}</Paragraph>}
                {result.igG3 !== null && <Paragraph>IgG3: {result.igG3}</Paragraph>}
                {result.igG4 !== null && <Paragraph>IgG4: {result.igG4}</Paragraph>}
                <Paragraph>Uzman Onay Tarihi: {new Date(result.expertApproveTime).toLocaleString()}</Paragraph>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      )}

      {!loading && testResults.length === 0 && !error && (
        <View style={styles.center}>
          <Text>Test sonucu bulunamadı.</Text>
        </View>
      )}

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: "Kapat",
          onPress: () => setSnackbarVisible(false),
        }}
      >
        {error ? "Test sonucu eklenemedi." : "Test sonucu başarıyla eklendi."}
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    marginTop: 40,
  },
  buttonContainer: {
    padding: 16,
    alignItems: "center",
  },
  addButton: {
    width: "100%",
    borderRadius: 8,
  },
  card: {
    marginBottom: 16,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 3,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  backButton: {
    marginBottom: 20,
    alignSelf: "flex-start",
  },
});

export default TestResults;
