import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { CreateCard } from "./CreateCard";
import { ViewCards } from "./ViewCards";

type ViewType = "create" | "view" | "build";

export function DeckBuilder() {
  const [currentView, setCurrentView] = useState<ViewType>("create");

  const renderContent = () => {
    switch (currentView) {
      case "create":
        return <CreateCard />;
      case "view":
        return <ViewCards />;
      case "build":
        return (
          <View style={styles.placeholder}>
            <Text>Deck Builder Coming Soon</Text>
          </View>
        );
    }
  };

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

        <TouchableOpacity
          style={[styles.button, currentView === "build" && styles.activeButton]}
          onPress={() => setCurrentView("build")}
        >
          <Text style={[styles.buttonText, currentView === "build" && styles.activeButtonText]}>
            Build Deck
          </Text>
        </TouchableOpacity>
      </View>

      {renderContent()}
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
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
