import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { FlashCard } from "../types/CardTypes";
import { CardService } from "../services/CardService";

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function CardViewer() {
  const [cards, setCards] = useState<FlashCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadCards = async () => {
    const loadedCards = await CardService.loadCards();
    setCards(shuffleArray(loadedCards));
    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadCards();
      setCurrentIndex(0);
      setShowBack(false);
    }, [])
  );

  const goToNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowBack(false);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowBack(false);
    }
  };

  const toggleCard = () => {
    setShowBack(!showBack);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading cards...</Text>
      </View>
    );
  }

  if (cards.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No cards available. Create some cards in the Deck Builder!</Text>
      </View>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={toggleCard}>
          <Text style={styles.cardText}>{showBack ? currentCard.back : currentCard.front}</Text>
          <Text style={styles.tapHint}>Tap to see {showBack ? "front" : "back"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navigation}>
        <TouchableOpacity
          style={[styles.navButton, currentIndex === 0 && styles.disabledButton]}
          onPress={goToPrevious}
          disabled={currentIndex === 0}
        >
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>

        <Text style={styles.counter}>
          {currentIndex + 1} / {cards.length}
        </Text>

        <TouchableOpacity
          style={[styles.navButton, currentIndex === cards.length - 1 && styles.disabledButton]}
          onPress={goToNext}
          disabled={currentIndex === cards.length - 1}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
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
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    width: "100%",
    height: 300,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  cardText: {
    fontSize: 24,
    textAlign: "center"
  },
  tapHint: {
    position: "absolute",
    bottom: 10,
    color: "#666",
    fontSize: 12
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20
  },
  navButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center"
  },
  disabledButton: {
    backgroundColor: "#ccc"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  counter: {
    fontSize: 16
  }
});
