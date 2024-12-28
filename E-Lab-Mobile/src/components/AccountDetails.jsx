import React, { useEffect, useState, useContext } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Modal, TextInput, Button, Alert, Dimensions, ScrollView } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

import axiosInstance from "../utils/axiosSetup"; // API'ye bununla istek yollanacak
import { AuthContext } from "../contexts/AuthContext";

const { width, height } = Dimensions.get("window");

const AccountDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    birthDate: "",
  });
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axiosInstance.get("/account/user-details");
        if (response.status === 200 && response.data) {
          setUserDetails(response.data.data);
          setFormData({
            fullName: response.data.data.fullName,
            birthDate: response.data.data.birthDate,
          });
        }
      } catch (err) {
        setError(err.response?.data?.message || "Kullanıcı bilgileri alınırken bir hata oluştu.");
        console.error("Error fetching user details: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  const handleUpdateUser = async () => {
    try {
      const response = await axiosInstance.patch("/account/update-user-details", {
        fullName: formData.fullName,
        birthDate: formData.birthDate,
      });
      if (response.status === 200) {
        Alert.alert("Başarılı", "Kullanıcı bilgileri güncellendi!");
        setUserDetails((prev) => ({
          ...prev,
          fullName: formData.fullName,
          birthDate: formData.birthDate,
        }));
        setUpdateModalVisible(false);
      } else {
        Alert.alert("Hata", "Beklenmedik bir hata oluştu.");
      }
    } catch (err) {
      console.error("Error updating user details: ", err);
      Alert.alert("Hata", err.response?.data?.message || "Kullanıcı bilgilerini güncellerken hata oluştu.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axiosInstance.delete("/account/remove-account");
      Alert.alert("Başarılı", "Hesabınız silindi.");
      await logout();
    } catch (err) {
      console.error("Error deleting account:", err);
      Alert.alert("Error", err.response?.data?.message || "Hesap kaldırılırken bir hata oluştu.");
    }
  };

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6200ee" />
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
    <View style={styles.container}>
      <Card style={styles.card}>
        <Title style={styles.title}>Kullanıcı Bilgileri</Title>
        {userDetails ? (
          <>
            <Paragraph>Ad Soyad: {userDetails?.fullName || "N/A"}</Paragraph>
            <Paragraph>TCKN: {userDetails?.tckn || "N/A"}</Paragraph>
            <Paragraph>Doğum Tarihi: {userDetails?.birthDate || "N/A"}</Paragraph>
          </>
        ) : (
          <Paragraph>Bilgiler yükleniyor...</Paragraph>
        )}
        <Button title="Bilgileri Güncelle" onPress={() => setUpdateModalVisible(true)} />
        <Button title="Hesabı Sil" onPress={() => setDeleteModalVisible(true)} color="red" />
      </Card>

      {/* Update Modal */}
      <Modal visible={updateModalVisible} animationType="slide" onRequestClose={() => setUpdateModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Bilgileri Güncelle</Text>

          <TextInput style={styles.input} placeholder="Ad Soyad" value={formData.fullName} onChangeText={(text) => handleInputChange("fullName", text)} />

          <TextInput style={styles.input} placeholder="Doğum Tarihi (YYYY-MM-DD)" value={formData.birthDate} onChangeText={(text) => handleInputChange("birthDate", text)} />

          <Button title="Kaydet" onPress={handleUpdateUser} />
          <Button title="İptal" onPress={() => setUpdateModalVisible(false)} color="gray" />
        </View>
      </Modal>

      {/* Delete Modal */}
      <Modal visible={deleteModalVisible} animationType="slide" onRequestClose={() => setDeleteModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Hesabı Sil</Text>
          <Text>Bu işlem geri alınamaz. Emin misiniz?</Text>

          <Button title="Evet, Sil" onPress={handleDeleteAccount} color="red" />
          <Button title="İptal" onPress={() => setDeleteModalVisible(false)} color="gray" />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: width * 0.9, // Adjust card width dynamically
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 8,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    width: width * 0.8, // Adjust input width dynamically
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 16,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 16,
  },
});

export default AccountDetails;
