import React from "react";
import { View, StyleSheet } from "react-native";
import { Dialog, Paragraph, Button, Text } from "react-native-paper";
import { MaterialIcons } from "react-native-vector-icons";

const ManualCilvModal = ({ visible, onClose, result }) => {
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

  return (
    <Dialog visible={visible} onDismiss={onClose}>
      <Dialog.Title>Cilv Kılavuzu Sonuçları</Dialog.Title>
      <Dialog.Content>
        <View style={styles.resultContainer}>
          {result?.igAResult && (
            <View style={styles.resultItem}>
              <Text>IgA: {getArrowIcon(result.igAResult)}</Text>
            </View>
          )}
          {result?.igMResult && (
            <View style={styles.resultItem}>
              <Text>IgM: {getArrowIcon(result.igMResult)}</Text>
            </View>
          )}
          {result?.igGResult && (
            <View style={styles.resultItem}>
              <Text>IgG: {getArrowIcon(result.igGResult)}</Text>
            </View>
          )}
          {result?.igG1Result && (
            <View style={styles.resultItem}>
              <Text>IgG1: {getArrowIcon(result.igG1Result)}</Text>
            </View>
          )}
          {result?.igG2Result && (
            <View style={styles.resultItem}>
              <Text>IgG2: {getArrowIcon(result.igG2Result)}</Text>
            </View>
          )}
          {result?.igG3Result && (
            <View style={styles.resultItem}>
              <Text>IgG3: {getArrowIcon(result.igG3Result)}</Text>
            </View>
          )}
          {result?.igG4Result && (
            <View style={styles.resultItem}>
              <Text>IgG4: {getArrowIcon(result.igG4Result)}</Text>
            </View>
          )}
        </View>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onClose}>Kapat</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  resultContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  resultItem: {
    width: "48%", // Allows for two columns with some spacing
    marginBottom: 10,
  },
});

export default ManualCilvModal;
