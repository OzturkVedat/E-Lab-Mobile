import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

import axiosInstance from "../utils/axiosSetup";

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {patients.map((patient) => (
        <Card key={patient.patientId} style={styles.card}>
          <Title style={styles.title}>{patient.fullName}</Title>
          <Paragraph>TCKN: {patient.tckn}</Paragraph>
          <Paragraph>Cinsiyet: {patient.gender === 0 ? "Erkek" : "Kız"}</Paragraph>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
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
    paddingHorizontal: 16,
  },
});

export default PatientsList;
