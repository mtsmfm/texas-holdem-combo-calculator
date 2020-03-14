import * as React from "react";
import { Combo } from "../classes";
import { CardComponent } from "./CardComponent";

export const ComboComponent: React.FC<{ combo: Combo }> = ({
  combo: {
    cards: [card1, card2]
  }
}) => {
  return (
    <div style={{ display: "flex" }}>
      <CardComponent card={card1} />
      <CardComponent card={card2} />
    </div>
  );
};
