import * as handRank from "../handRank.json";

const suits = ["heart", "club", "diamond", "spade"] as const;
const numbers = Array.from({ length: 13 }, (_, i) => i + 2);

export class Card {
  public static get all() {
    return allCards;
  }

  public static get suits() {
    return suits;
  }

  public static get numbers() {
    return numbers;
  }

  constructor(public suit: typeof suits[number], public number: number) {}

  get id() {
    return `${this.number.toString(16)}${this.suit}`;
  }

  get suitChar() {
    switch (this.suit) {
      case "club":
        return "\u2663";
      case "diamond":
        return "\u2666";
      case "heart":
        return "\u2665";
      case "spade":
        return "\u2660";
    }
  }

  get numberChar() {
    switch (this.number) {
      case 14:
        return "A";
      case 13:
        return "K";
      case 12:
        return "Q";
      case 11:
        return "J";
      case 10:
        return "T";
      default:
        return String(this.number);
    }
  }
}

export class Combo {
  public cards: [Card, Card];

  public static get all() {
    return allCombos;
  }

  constructor(cards: [Card, Card]) {
    this.cards = [...cards].sort((c1, c2) => c2.id.localeCompare(c1.id)) as [
      Card,
      Card
    ];
  }

  get id() {
    return this.cards[0].id + this.cards[1].id;
  }

  get isPair() {
    return this.cards[0].number === this.cards[1].number;
  }

  get isSuited() {
    return this.cards[0].suit === this.cards[1].suit;
  }

  get isOffSuited() {
    return !this.isSuited;
  }

  get rank() {
    const x: keyof typeof handRank = `${this.cards[0].numberChar}${
      this.cards[1].numberChar
    }${this.isPair ? "" : this.isSuited ? "s" : "o"}` as any;

    return handRank[x];
  }
}

const allCards: Card[] = suits.reduce(
  (ary, suit) => [
    ...ary,
    ...numbers.map(number => new Card(suit, number)).reverse()
  ],
  [] as Card[]
);

const allCombos: Combo[] = Object.values(
  allCards
    .reduce(
      (ary, c1) => [
        ...ary,
        ...allCards
          .filter(({ id }) => id !== c1.id)
          .map(c2 => new Combo([c1, c2]))
      ],
      [] as Combo[]
    )
    .reduce((obj, c) => ({ ...obj, [c.id]: c }), {})
);
