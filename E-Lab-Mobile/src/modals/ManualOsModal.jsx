import React from "react";
import { StyleSheet, View } from "react-native";
import { Dialog, Paragraph, Button, Text, Card } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ManualOsModal = ({ visible, onClose, result }) => {
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
    <Dialog visible={visible} onDismiss={onClose}>
      <Dialog.Title>Os Kılavuzu Sonuçları</Dialog.Title>
      <Dialog.Content>
        {result?.igOsRangesResults && result.igOsRangesResults.length > 0 ? (
          result.igOsRangesResults.map((rangeResult, index) => (
            <Card key={index} style={styles.card}>
              <Card.Content>
                <Text style={styles.resultTitle}>{getIgTypeString(rangeResult.igType)}</Text>
                <View style={styles.arrowIconContainer}>
                  <Text>Aritmetik Ort.Sonucu:</Text>
                  {getArrowIcon(rangeResult.arithMeanResult)}
                </View>
                <View style={styles.arrowIconContainer}>
                  <Text>Min/Max Sonucu:</Text>
                  {getArrowIcon(rangeResult.minMaxResult)}
                </View>
              </Card.Content>
            </Card>
          ))
        ) : (
          <Paragraph>Sonuç bulunamadı.</Paragraph>
        )}
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onClose}>Kapat</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  arrowIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
});

export default ManualOsModal;
