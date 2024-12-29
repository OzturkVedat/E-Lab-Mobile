import React from "react";
import { View, ScrollView, Dimensions, StyleSheet } from "react-native";
import { Dialog, Portal, Button, Text } from "react-native-paper";
import { MaterialIcons } from "react-native-vector-icons";

const ManualTubitakModal = ({ visible, onClose, result }) => {
  const windowHeight = Dimensions.get("window").height;

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
    <Portal>
      <Dialog visible={visible} onDismiss={onClose}>
        <Dialog.Title>Tubitak Kılavuzu Sonuçları</Dialog.Title>
        <Dialog.Content>
          {result?.igTubitakRangesResults && result.igTubitakRangesResults.length > 0 ? (
            <ScrollView style={{ maxHeight: windowHeight * 0.7 }}>
              {result.igTubitakRangesResults.map((rangeResult, index) => (
                <View key={index} style={styles.resultItem}>
                  <Text style={styles.resultTitle}>{getIgTypeString(rangeResult.igType)}</Text>
                  <Text>Geometrik Ort. Sonucu: {getArrowIcon(rangeResult.gmResult)}</Text>
                  <Text>Ortalama(Mean) Sonucu: {getArrowIcon(rangeResult.meanResult)}</Text>
                  <Text>Min/Max Sonucu: {getArrowIcon(rangeResult.minMaxResult)}</Text>
                  <Text>Güven Aralığı Sonucu: {getArrowIcon(rangeResult.ciResult)}</Text>
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text>Sonuç bulunamadı.</Text>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose} mode="contained" style={styles.closeButton}>
            Close
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
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
  closeButton: {
    marginTop: 10,
    backgroundColor: "#6200ea", // Purple color
  },
});

export default ManualTubitakModal;
