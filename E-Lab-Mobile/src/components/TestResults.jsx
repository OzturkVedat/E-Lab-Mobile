import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import axiosInstance from "../utils/axiosSetup";
import { ScrollView } from "react-native-gesture-handler";

const TestResults = ({ route }) => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { patientId, patientName } = route?.params || {};

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

  return (
    <View style={styles.container}>
      {/* Loading Indicator */}
      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#6200ee" />
          <Text>Yükleniyor...</Text>
        </View>
      )}

      {/* Error Message */}
      {!loading && error && (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {!loading && !error && testResults.length > 0 && (
        <ScrollView>
          {/* Displaying the header only once */}
          <Text style={styles.headerText}>{patientName} Tahlil Sonuçları</Text>

          {testResults.map((result) => (
            <Card key={result.id} style={styles.card}>
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

      {/* No Results Message */}
      {!loading && testResults.length === 0 && !error && (
        <View style={styles.center}>
          <Text>Test sonucu bulunamadı.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  card: {
    marginBottom: 16,
    padding: 16,
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
});

export default TestResults;
