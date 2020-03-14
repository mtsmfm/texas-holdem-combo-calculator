import * as React from "react";
import MCard from "@material-ui/core/Card";
import MCardContent from "@material-ui/core/CardContent";
import MCardActionArea from "@material-ui/core/CardActionArea";
import { Card } from "../classes";
import { CardComponent } from "./CardComponent";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

export const CommunityCards: React.FC<{
  cards: Card[];
  onClick: (index: number) => void;
}> = ({ cards, onClick }) => {
  return (
    <div style={{ display: "flex" }}>
      {cards.map((card, index) => (
        <MCard key={index} onClick={() => onClick(index)}>
          <MCardActionArea>
            <MCardContent>
              <CardComponent card={card} />
            </MCardContent>
          </MCardActionArea>
        </MCard>
      ))}
      <IconButton onClick={() => onClick(cards.length + 1)}>
        <AddIcon />
      </IconButton>
    </div>
  );
};
