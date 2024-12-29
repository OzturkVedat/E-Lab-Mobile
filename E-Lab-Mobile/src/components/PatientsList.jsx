import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { TextInput, Button, Card, Title, Paragraph, ActivityIndicator, Snackbar } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import debounce from "lodash.debounce";
import { useNavigation } from "@react-navigation/native";
import axiosInstance from "../utils/axiosSetup";

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axiosInstance.get("/admin/all-patient-details");
        if (response.status === 200 && response.data) {
          setPatients(response.data.data);
        } else {
          setError("Hasta bilgileri getirilemedi.");
        }
      } catch (err) {
        console.error("Error fetching patients:", err);
        setError(err.response?.data?.message || "Bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim() || searchQuery.length < 1) {
      setError("Lütfengeçerli bir isim girin.");
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setError("");
    setSearchResults([]);

    try {
      const response = await axiosInstance.get(`/admin/patient-by-fullname/${searchQuery}`);
      if (response.status === 200 && response.data) {
        setSearchResults(response.data.data);
      } else {
        setError("Sonuç bulunamadı.");
        setSearchResults([]);
      }
    } catch (err) {
      console.error("Error searching patients:", err);
      setError(err.response?.data?.message || "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 500), []);

  const dataToDisplay = searchQuery.trim() && searchResults.length > 0 ? searchResults : patients;

  return (
    <View style={[styles.container, { paddingTop: 70 }]}>
      <TextInput
        style={styles.searchInput}
        placeholder="Ad Soyad ile arama yapın"
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          debouncedSearch(text);
        }}
        mode="outlined"
      />
      <Button onPress={handleSearch} mode="contained" style={styles.searchButton}>
        Ara
      </Button>
      {/* Loading Indicator */}
      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#6200ee" />
        </View>
      )}
      {/* Error Message */}
      {error && !loading && (
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          action={{
            label: "OK",
            onPress: () => setSnackbarVisible(false),
          }}
        >
          {error}
        </Snackbar>
      )}
      {!loading && dataToDisplay.length === 0 && !error && (
        <View style={styles.center}>
          <Paragraph>Sonuç bulunamadı.</Paragraph>
        </View>
      )}
      {!loading && !error && dataToDisplay.length > 0 && (
        <FlatList
          data={dataToDisplay}
          keyExtractor={(item) => item.patientId.toString()}
          renderItem={({ item }) => (
            <Card style={styles.card} onPress={() => navigation.navigate("TestResults", { patientId: item.patientId, patientName: item.fullName })}>
              <Title>{item.fullName}</Title>
              <Paragraph>TCKN: {item.tckn}</Paragraph>
              <Paragraph>Cinsiyet: {item.gender === 0 ? "Erkek" : "Kız"}</Paragraph>
            </Card>
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#f8f8f8",
  },
  searchInput: {
    marginBottom: 16,
    backgroundColor: "#f8f8f8",
  },
  searchButton: {
    marginBottom: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  card: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 3,
  },
});

export default PatientsList;
