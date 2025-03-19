import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { CardService } from "../../services/CardService";

export function CreateCard() {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [message, setMessage] = useState("");

  const handleAddCard = async () => {
    if (!front.trim() || !back.trim()) {
      setMessage("Please fill in both front and back of the card");
      return;
    }

    try {
      await CardService.addCard(front.trim(), back.trim());
      setFront("");
      setBack("");
      setMessage("Card added successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error adding card");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Card</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Front of card"
          value={front}
          onChangeText={setFront}
          multiline
        />

        <TextInput
          style={styles.input}
          placeholder="Back of card"
          value={back}
          onChangeText={setBack}
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={handleAddCard}>
          <Text style={styles.buttonText}>Add Card</Text>
        </TouchableOpacity>

        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },
  inputContainer: {
    gap: 15
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    textAlignVertical: "top"
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  message: {
    textAlign: "center",
    color: "#007AFF"
  }
});
