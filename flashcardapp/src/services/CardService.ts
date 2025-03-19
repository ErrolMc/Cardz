import * as FileSystem from "expo-file-system";
import { FlashCard, Deck } from "../types/CardTypes";
import { FileInfo } from "expo-file-system";

const CARDS_FILE = `${FileSystem.documentDirectory}cards.json`;

export const CardService = {
  async loadCards(): Promise<FlashCard[]> {
    try {
      const fileExists: FileInfo = await FileSystem.getInfoAsync(CARDS_FILE);
      if (!fileExists.exists) {
        await this.saveCards([]);
        return [];
      }

      const content: string = await FileSystem.readAsStringAsync(CARDS_FILE);
      const deck: Deck = JSON.parse(content);
      return deck.cards;
    } catch (error) {
      console.error("Error loading cards:", error);
      return [];
    }
  },

  async saveCards(cards: FlashCard[]): Promise<void> {
    try {
      const deck: Deck = { cards };
      await FileSystem.writeAsStringAsync(CARDS_FILE, JSON.stringify(deck));
    } catch (error) {
      console.error("Error saving cards:", error);
    }
  },

  async addCard(front: string, back: string): Promise<void> {
    const cards: FlashCard[] = await this.loadCards();
    const newCard: FlashCard = {
      id: Date.now().toString(),
      front,
      back
    };
    cards.push(newCard);
    await this.saveCards(cards);
  }
};
