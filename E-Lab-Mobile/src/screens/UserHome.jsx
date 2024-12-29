import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, View } from "react-native";
import { Card, Paragraph, Text, ActivityIndicator, Snackbar } from "react-native-paper";
import axiosInstance from "../utils/axiosSetup";

const UserHome = ({ navigation }) => {
  const [testResults, setTestResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        const response = await axiosInstance.get("/user/user-test-results");
        setTestResults(response.data.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch test results. Please try again later.");
        setTestResults([]);
        setSnackbarVisible(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestResults();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>Tahlil sonuçları yükleniyor...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {error && (
          <Snackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            duration={Snackbar.DURATION_SHORT}
            action={{
              label: "Ok",
              onPress: () => setSnackbarVisible(false),
            }}
          >
            {error}
          </Snackbar>
        )}

        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Geçmiş Tahlillerim</Text>
        </View>

        {testResults.length > 0 ? (
          testResults.map((result) => (
            <TouchableOpacity key={result.id} onPress={() => navigation.navigate("ResultDetails", { testResultId: result.id })}>
              <Card style={styles.card}>
                <Card.Content>
                  {result.igA !== null && <Paragraph>IgA: {result.igA}</Paragraph>}
                  {result.igM !== null && <Paragraph>IgM: {result.igM}</Paragraph>}
                  {result.igG !== null && <Paragraph>IgG: {result.igG}</Paragraph>}
                  <Paragraph>Uzman Onay Tarihi: {new Date(result.expertApproveTime).toLocaleString()}</Paragraph>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noResultsText}>No test results found.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: "#6200ee",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  card: {
    width: "100%",
    marginBottom: 16,
    borderRadius: 8,
    elevation: 4, // Adds shadow effect for Android
    backgroundColor: "#f9f9f9",
  },
  noResultsText: {
    fontSize: 16,
    color: "gray",
  },
  headerContainer: {
    marginTop: 20, // Margin for spacing the header from the top
    marginBottom: 16,
    width: "100%",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6200ee",
    marginTop: 20,
    marginBottom: 10,
  },
});

export default UserHome;
