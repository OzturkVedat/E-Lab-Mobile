import React from "react";
import { View, Text, Modal, StyleSheet, Button, ScrollView } from "react-native";
import { MaterialIcons } from "react-native-vector-icons";

const ManualTubitakModal = ({ visible, onClose, result }) => {
  const getArrowIcon = (result) => {
    switch (result) {
      case "Dusuk":
        return <MaterialIcons name="arrow-downward" size={24} color="red" />;
      case "Yuksek":
        return <MaterialIcons name="arrow-upward" size={24} color="green" />;
      case "Normal":
        return <MaterialIcons name="arrow-forward" size={24} color="blue" />;
      default:
        return null;
    }
  };

  const getIgTypeString = (igType) => {
    const igTypeEnum = {
      0: "IgA",
      1: "IgG",
      2: "IgM",
      3: "IgG1",
      4: "IgG2",
      5: "IgG3",
      6: "IgG4",
    };

    return igTypeEnum[igType] || "Unknown";
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <Button title="Close" onPress={onClose} />
        <Text style={styles.title}>Tubitak Kılavuzu Sonuçları</Text>

        {result?.igTubitakRangesResults && result.igTubitakRangesResults.length > 0 ? (
          <ScrollView>
            {result.igTubitakRangesResults.map((rangeResult, index) => (
              <View key={index} style={styles.resultItem}>
                <Text style={styles.resultTitle}>{getIgTypeString(rangeResult.igType)}</Text>
                <Text>Geometrik Ortalama Sonucu: {getArrowIcon(rangeResult.gMResult)}</Text>
                <Text>Ortalama(Mean) Sonucu: {getArrowIcon(rangeResult.meanResult)}</Text>
                <Text>Min/Max Sonucu: {getArrowIcon(rangeResult.minMaxResult)}</Text>
                <Text>Güven Aralığı Sonucu: {getArrowIcon(rangeResult.ciResult)}</Text>
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text>Sonuç bulunamadı.</Text>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  resultItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default ManualTubitakModal;
