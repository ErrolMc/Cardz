import { File, Paths } from "expo-file-system";
import { FlashCard, Deck } from "../types/CardTypes";

const CARDS_FILE = "cards.json";

export const CardService = {
  async loadCards(): Promise<FlashCard[]> {
    try {
      const documentDir = Paths.document;
      const file = new File(documentDir, CARDS_FILE);
      
      if (!file.exists) {
        await this.saveCards([]);
        return [];
      }

      const content: string = file.textSync();
      const deck: Deck = JSON.parse(content);
      return deck.cards;
    } catch (error) {
      console.error("Error loading cards:", error);
      return [];
    }
  },

  async saveCards(cards: FlashCard[]): Promise<void> {
    try {
      const documentDir = Paths.document;
      const file = new File(documentDir, CARDS_FILE);
      const deck: Deck = { cards };
      file.write(JSON.stringify(deck));
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
