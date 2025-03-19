export interface FlashCard {
  id: string;
  front: string;
  back: string;
}

export interface Deck {
  cards: FlashCard[];
}
