import React from "react";
import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import { Modal, Button, Text, Paragraph } from "react-native-paper";
import { MaterialIcons } from "react-native-vector-icons";

const ManualTjpModal = ({ visible, onClose, result }) => {
  const { height } = Dimensions.get("window");

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
    <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer} style={{ height: height * 0.9 }}>
      <Text style={styles.title}>Tjp Kılavuzu Sonuçları</Text>

      {result?.igTjpRangesResults && result.igTjpRangesResults.length > 0 ? (
        <ScrollView>
          <View style={styles.grid}>
            {result.igTjpRangesResults.map((rangeResult, index) => (
              <View key={index} style={styles.resultItem}>
                <Text style={styles.resultTitle}>{getIgTypeString(rangeResult.igType)}</Text>
                <Paragraph>Geo.Ort.: {getArrowIcon(rangeResult.gmResult)}</Paragraph>
                <Paragraph>Min/Max: {getArrowIcon(rangeResult.minMaxResult)}</Paragraph>
                <Paragraph>G.Aralığı: {getArrowIcon(rangeResult.ciResult)}</Paragraph>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <Text>Sonuç bulunamadı.</Text>
      )}

      <Button mode="contained" onPress={onClose} style={styles.closeButton}>
        Kapat
      </Button>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  resultItem: {
    width: "48%", // Two items per row with some spacing
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
  closeButton: {
    marginTop: 20,
  },
});

export default ManualTjpModal;
