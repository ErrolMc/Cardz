import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { CardService } from "../../services/CardService";

type Card = {
  id: string;
  front: string;
  back: string;
};

export function ViewCards() {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [editedFront, setEditedFront] = useState("");
  const [editedBack, setEditedBack] = useState("");
  const [message, setMessage] = useState("");
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    loadCards();
  }, []);

  useEffect(() => {
    if (selectedCard) {
      setIsModified(
        editedFront !== selectedCard.front || editedBack !== selectedCard.back
      );
    }
  }, [editedFront, editedBack, selectedCard]);

  const loadCards = async () => {
    try {
      const loadedCards = await CardService.loadCards();
      setCards(loadedCards);
    } catch (error) {
      setMessage("Error loading cards");
    }
  };

  const handleSelectCard = (card: Card) => {
    setSelectedCard(card);
    setEditedFront(card.front);
    setEditedBack(card.back);
    setIsModified(false);
  };

  const handleBack = () => {
    setSelectedCard(null);
    setEditedFront("");
    setEditedBack("");
    setIsModified(false);
  };

  const handleUpdateCard = async () => {
    if (!selectedCard || !editedFront.trim() || !editedBack.trim()) {
      setMessage("Please fill in both front and back of the card");
      return;
    }

    try {
      const updatedCards = cards.map((card) =>
        card.id === selectedCard.id
          ? { ...card, front: editedFront.trim(), back: editedBack.trim() }
          : card
      );
      await CardService.saveCards(updatedCards);
      setCards(updatedCards);
      setSelectedCard(null);
      setEditedFront("");
      setEditedBack("");
      setIsModified(false);
      setMessage("Card updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error updating card");
    }
  };

  const handleDeleteCard = async () => {
    if (!selectedCard) return;

    try {
      const updatedCards = cards.filter((card) => card.id !== selectedCard.id);
      await CardService.saveCards(updatedCards);
      setCards(updatedCards);
      setSelectedCard(null);
      setEditedFront("");
      setEditedBack("");
      setIsModified(false);
      setMessage("Card deleted successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error deleting card");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {selectedCard ? (
          <>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Viewing Card</Text>
            <View style={styles.backButton} />
          </>
        ) : (
          <Text style={styles.title}>View Cards</Text>
        )}
      </View>

      {!selectedCard ? (
        <ScrollView style={styles.cardList}>
          {cards.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={styles.cardItem}
              onPress={() => handleSelectCard(card)}
            >
              <Text style={styles.cardText} numberOfLines={1} ellipsizeMode="tail">
                {card.front}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            placeholder="Front of card"
            value={editedFront}
            onChangeText={setEditedFront}
            multiline
          />

          <TextInput
            style={styles.input}
            placeholder="Back of card"
            value={editedBack}
            onChangeText={setEditedBack}
            multiline
          />

          <View style={styles.buttonContainer}>
            {isModified && (
              <TouchableOpacity style={styles.updateButton} onPress={handleUpdateCard}>
                <Text style={styles.buttonText}>Update Card</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity 
              style={[styles.deleteButton, isModified && { flex: 1 }]} 
              onPress={handleDeleteCard}
            >
              <Text style={styles.buttonText}>Delete Card</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1
  },
  backButton: {
    width: 80
  },
  backButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "500"
  },
  cardList: {
    flex: 1
  },
  cardItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10
  },
  cardText: {
    fontSize: 16
  },
  editContainer: {
    flex: 1,
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
  buttonContainer: {
    flexDirection: "row",
    gap: 10
  },
  updateButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center"
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    minWidth: "48%"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  message: {
    textAlign: "center",
    color: "#007AFF",
    marginTop: 10
  }
});
