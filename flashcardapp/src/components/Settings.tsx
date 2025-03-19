import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Platform } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { CardService } from "../services/CardService";
import { FlashCard } from "../types/CardTypes";

export const Settings = () => {
  const handleExport = async () => {
    try {
      const cards = await CardService.loadCards();
      const deck = { cards };
      const jsonString = JSON.stringify(deck, null, 2);

      if (Platform.OS === 'android') {
        // Android: Use Storage Access Framework
        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        
        if (permissions.granted) {
          // Get the directory uri that the user picked
          const directoryUri = permissions.directoryUri;
          
          // Create a new file in the selected directory
          const fileName = `flashcards_${new Date().toISOString().split('T')[0]}.json`;
          const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
            directoryUri,
            fileName,
            'application/json'
          );
          
          // Write the content to the file
          await FileSystem.StorageAccessFramework.writeAsStringAsync(fileUri, jsonString);
          Alert.alert('Success', 'Flashcards exported successfully!');
        }
      } else {
        // iOS: Use document directory
        const documentDirectory = FileSystem.documentDirectory;
        const fileName = `flashcards_${new Date().toISOString().split('T')[0]}.json`;
        const filePath = documentDirectory + fileName;
        
        await FileSystem.writeAsStringAsync(filePath, jsonString);
        Alert.alert('Success', `Flashcards exported to Documents/${fileName}`);
      }
    } catch (error) {
      Alert.alert("Export Error", "Failed to export flashcards.");
      console.error(error);
    }
  };

  const handleImport = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/json",
        copyToCacheDirectory: true
      });

      if (result.canceled) {
        return;
      }

      const content = await FileSystem.readAsStringAsync(result.assets[0].uri);
      const importedData = JSON.parse(content);

      if (!importedData.cards || !Array.isArray(importedData.cards)) {
        throw new Error("Invalid file format");
      }

      // Validate each card has the required fields
      const isValidCard = importedData.cards.every(
        (card: FlashCard) =>
          card.id && typeof card.front === "string" && typeof card.back === "string"
      );

      if (!isValidCard) {
        throw new Error("Invalid card format");
      }

      await CardService.saveCards(importedData.cards);
      Alert.alert("Success", "Flashcards imported successfully!");
    } catch (error) {
      Alert.alert(
        "Import Error",
        "Failed to import flashcards. Please make sure the file is valid."
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Management</Text>
        <TouchableOpacity style={styles.button} onPress={handleExport}>
          <Text style={styles.buttonText}>Export Flashcards</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleImport}>
          <Text style={styles.buttonText}>Import Flashcards</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0"
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#007AFF"
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500"
  },
  version: {
    fontSize: 14,
    color: "#666"
  }
});
