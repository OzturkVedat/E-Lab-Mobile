import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Card, Title, Paragraph, TextInput, Button } from "react-native-paper";
import { FlatList } from "react-native";
import debounce from "lodash.debounce";
import { useNavigation } from "@react-navigation/native";

import axiosInstance from "../utils/axiosSetup";

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const navigation = useNavigation();

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
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setError("Lütfen en az iki karakter uzunluğunda bir isim girin.");
      setPatients([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.get(`/admin/patient-by-fullname/${searchQuery}`);
      if (response.status === 200 && response.data) {
        setPatients(response.data.data);
      } else {
        setError("Sonuç bulunamadı.");
      }
    } catch (err) {
      console.error("Error searching patients:", err);
      setError(err.response?.data?.message || "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 500), []);

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Ad Soyad ile arama yapın"
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          debouncedSearch(text);
        }}
      />
      <Button title="Ara" onPress={handleSearch} mode="contained" style={styles.searchButton} />

      {/* Loading Indicator */}
      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#6200ee" />
          <Text>Yükleniyor...</Text>
        </View>
      )}

      {!loading && patients.length === 0 && !error && (
        <View style={styles.center}>
          <Text>Sonuç bulunamadı.</Text>
        </View>
      )}

      {/* Error Message */}
      {error && !loading && (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {!loading && !error && patients.length > 0 && (
        <FlatList
          data={patients}
          keyExtractor={(item) => item.patientId.toString()}
          renderItem={({ item }) => (
            <Card style={styles.card} onPress={() => navigation.navigate("TestResults", { patientId: item.patientId, patientName: item.fullName })}>
              <Title style={styles.title}>{item.fullName}</Title>
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
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  searchInput: {
    marginBottom: 16,
    backgroundColor: "#f8f8f8",
  },
  searchButton: {
    marginBottom: 16,
    backgroundColor: "#add8ed",
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
  title: {
    fontSize: 18,
    marginBottom: 8,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
  },
});
export default PatientsList;
