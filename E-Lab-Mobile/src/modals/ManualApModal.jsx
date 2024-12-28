import React from "react";
import { View, Text, Modal, StyleSheet, Button } from "react-native";
import { MaterialIcons } from "react-native-vector-icons";

const ManualApModal = ({ visible, onClose, result }) => {
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
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <Button title="Close" onPress={onClose} />
        <Text style={styles.title}>Ap Kılavuzu Sonuçları</Text>
        {result?.igAResult && <Text>IgA: {getArrowIcon(result.igAResult)}</Text>}
        {result?.igMResult && <Text>IgM: {getArrowIcon(result.igMResult)}</Text>}
        {result?.igGResult && <Text>IgG: {getArrowIcon(result.igGResult)}</Text>}
        {result?.igG1Result && <Text>IgG1: {getArrowIcon(result.igG1Result)}</Text>}
        {result?.igG2Result && <Text>IgG2: {getArrowIcon(result.igG2Result)}</Text>}
        {result?.igG3Result && <Text>IgG3: {getArrowIcon(result.igG3Result)}</Text>}
        {result?.igG4Result && <Text>IgG4: {getArrowIcon(result.igG4Result)}</Text>}
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
});

export default ManualApModal;
