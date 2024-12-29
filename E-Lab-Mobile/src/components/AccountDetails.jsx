import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Dimensions, Alert, ActivityIndicator } from "react-native";
import { Card, Title, Paragraph, Button, TextInput, Dialog, Portal } from "react-native-paper";

import axiosInstance from "../utils/axiosSetup";
import { AuthContext } from "../contexts/AuthContext";

const { width } = Dimensions.get("window");

const AccountDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", birthDate: "" });
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
        setError(err.response?.data?.message || "Kullanıcı bilgileri alınırken hata oluştu.");
        console.error("Error fetching user details: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert("Başarılı", "Çıkış yaptınız.");
    } catch (err) {
      console.error("Error logging out: ", err);
      Alert.alert("Hata", "Çıkış yaparken hata oluştu.");
    }
  };

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
      Alert.alert("Error", err.response?.data?.message || "An error occurred while updating user details.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axiosInstance.delete("/account/remove-account");
      Alert.alert("Başarılı", "Hesabınız silindi.");
      await logout();
    } catch (err) {
      console.error("Error deleting account:", err);
      Alert.alert("Error", err.response?.data?.message || "An error occurred while deleting the account.");
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
            <Paragraph>TC Kimlik No: {userDetails?.tckn || "N/A"}</Paragraph>
            <Paragraph>Doğum Tarihi: {userDetails?.birthDate || "N/A"}</Paragraph>
          </>
        ) : (
          <Paragraph>Yükleniyor...</Paragraph>
        )}
        <Button mode="contained" onPress={() => setUpdateModalVisible(true)} style={styles.button}>
          Bilgileri Güncelle
        </Button>
        <Button mode="contained" onPress={() => setDeleteModalVisible(true)} style={styles.button} color="red">
          Hesabı Sil
        </Button>
        <Button mode="contained" onPress={() => setLogoutModalVisible(true)} style={styles.button} color="orange">
          Çıkış Yap
        </Button>
      </Card>

      {/* Update Modal */}
      <Portal>
        <Dialog visible={updateModalVisible} onDismiss={() => setUpdateModalVisible(false)}>
          <Dialog.Title>Bilgileri Güncelle</Dialog.Title>
          <Dialog.Content>
            <TextInput label="Ad Soyad" value={formData.fullName} onChangeText={(text) => handleInputChange("fullName", text)} style={styles.input} />
            <TextInput label="Doğum Tarihi (YYYY-AA-GG)" value={formData.birthDate} onChangeText={(text) => handleInputChange("birthDate", text)} style={styles.input} />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleUpdateUser}>Kaydet</Button>
            <Button onPress={() => setUpdateModalVisible(false)}>Vazgeç</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Delete Modal */}
      <Portal>
        <Dialog visible={deleteModalVisible} onDismiss={() => setDeleteModalVisible(false)}>
          <Dialog.Title>Hesabınız Silinecektir</Dialog.Title>
          <Dialog.Content>
            <Text>Bu işlem geri alınamaz. Emin misiniz?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleDeleteAccount} color="red">
              Evet, sil
            </Button>
            <Button onPress={() => setDeleteModalVisible(false)}>Vazgeç</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Logout Modal */}
      <Portal>
        <Dialog visible={logoutModalVisible} onDismiss={() => setLogoutModalVisible(false)}>
          <Dialog.Title>Çıkış Yap</Dialog.Title>
          <Dialog.Content>
            <Text>Çıkış yapmak istediğinden emin misin?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleLogout} color="orange">
              Evet, çıkış yap
            </Button>
            <Button onPress={() => setLogoutModalVisible(false)}>Vazgeç</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  card: {
    width: width * 0.9,
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
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AccountDetails;
