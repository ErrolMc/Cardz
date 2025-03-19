import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { CreateCard } from "./CreateCard";
import { ViewCards } from "./ViewCards";

type ViewType = "create" | "view";

export function ManageCards() {
  const [currentView, setCurrentView] = useState<ViewType>("create");

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, currentView === "create" && styles.activeButton]}
          onPress={() => setCurrentView("create")}
        >
          <Text style={[styles.buttonText, currentView === "create" && styles.activeButtonText]}>
            Create Cards
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, currentView === "view" && styles.activeButton]}
          onPress={() => setCurrentView("view")}
        >
          <Text style={[styles.buttonText, currentView === "view" && styles.activeButtonText]}>
            View Cards
          </Text>
        </TouchableOpacity>
      </View>

      {currentView === "create" ? <CreateCard /> : <ViewCards />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 10,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    alignItems: "center"
  },
  activeButton: {
    backgroundColor: "#007AFF"
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333"
  },
  activeButtonText: {
    color: "#fff"
  }
});
