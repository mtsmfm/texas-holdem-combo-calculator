import * as React from "react";
import { Card } from "../classes";

export const CardComponent: React.FC<{ card: Card }> = ({ card }) => {
  return (
    <div
      style={{
        color:
          card.suit === "heart" || card.suit === "diamond" ? "red" : "black"
      }}
    >
      {card.numberChar}
      {card.suitChar}
    </div>
  );
};
