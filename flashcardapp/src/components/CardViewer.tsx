import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { FlashCard } from "../types/CardTypes";
import { CardService } from "../services/CardService";

type DisplayOrder = 'front-first' | 'back-first' | 'random';

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
  const [displayOrder, setDisplayOrder] = useState<DisplayOrder>('front-first');
  const [showDropdown, setShowDropdown] = useState(false);

  const loadCards = async () => {
    const loadedCards = await CardService.loadCards();
    setCards(shuffleArray(loadedCards));
    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadCards();
      setCurrentIndex(0);
      setShowBack(displayOrder === 'back-first' || (displayOrder === 'random' && Math.random() < 0.5));
    }, [displayOrder])
  );

  const goToNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowBack(displayOrder === 'back-first' || (displayOrder === 'random' && Math.random() < 0.5));
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowBack(displayOrder === 'back-first' || (displayOrder === 'random' && Math.random() < 0.5));
    }
  };

  const toggleCard = () => {
    setShowBack(!showBack);
  };

  const getDisplayOrderLabel = (order: DisplayOrder) => {
    switch (order) {
      case 'front-first': return 'Show front first';
      case 'back-first': return 'Show back first';
      case 'random': return 'Random front/back';
    }
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
      <TouchableOpacity 
        style={styles.dropdownButton}
        onPress={() => setShowDropdown(true)}
      >
        <Text style={styles.dropdownButtonText}>{getDisplayOrderLabel(displayOrder)}</Text>
        <Text style={styles.dropdownArrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={showDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDropdown(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.dropdownMenu}>
            {(['front-first', 'back-first', 'random'] as DisplayOrder[]).map((order) => (
              <TouchableOpacity
                key={order}
                style={styles.dropdownItem}
                onPress={() => {
                  setDisplayOrder(order);
                  setShowBack(order === 'back-first' || (order === 'random' && Math.random() < 0.5));
                  setShowDropdown(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{getDisplayOrderLabel(order)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={toggleCard}>
          <Text style={styles.cardText}>
            {showBack ? currentCard.back : currentCard.front}
          </Text>
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
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  cardContainer: {
    width: "100%",
    aspectRatio: 1.5,
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  tapHint: {
    fontSize: 14,
    color: "#666",
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  navButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    minWidth: 100,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  counter: {
    fontSize: 16,
  },
  dropdownButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#fff',
    marginRight: 8,
  },
  dropdownArrow: {
    color: '#fff',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: '80%',
    maxWidth: 300,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
});
