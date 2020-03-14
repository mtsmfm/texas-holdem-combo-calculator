import * as React from "react";
import { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Slider from "@material-ui/core/Slider";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import { Card, Combo } from "../classes";
import { CardComponent } from "./CardComponent";
import { CommunityCards } from "./CommunityCards";
import { ComboList } from "./ComboList";
import { ComboCountAdvice } from "./ComboCountAdvice";

export const App: React.FC = () => {
  const [handPercent, setHandPercent] = useState(25);
  const [communityCards, setCommunityCards] = useState<Card[]>([]);
  const [
    selectingCommunityCardIndex,
    setSelectingCommunityCardIndex
  ] = useState<number>();
  const [selectedComboSet, setSelectedComboSet] = useState<Set<string>>(
    new Set()
  );

  const filteredCombos = Combo.all.filter(
    combo =>
      combo.rank * 100 < handPercent &&
      !communityCards.some(
        card => card.id === combo.cards[0].id || card.id === combo.cards[1].id
      )
  );

  return (
    <>
      <div>
        {handPercent}%
        <Slider
          value={handPercent}
          min={0}
          step={0.1}
          max={100}
          onChange={(_, v) => setHandPercent(v as number)}
        />
      </div>
      <Dialog
        open={selectingCommunityCardIndex !== undefined}
        onClose={() => setSelectingCommunityCardIndex(undefined)}
      >
        <DialogContent>
          {Card.suits.map(suit => (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap"
              }}
              key={suit}
            >
              {Card.all
                .filter(card => !communityCards.some(c => c.id === card.id))
                .filter(({ suit: s }) => suit === s)
                .map(card => (
                  <Button
                    key={card.id}
                    onClick={() => {
                      const cards = [...communityCards];
                      cards.splice(selectingCommunityCardIndex!, 1, card);

                      setCommunityCards(cards);
                      setSelectingCommunityCardIndex(undefined);
                    }}
                  >
                    <CardComponent card={card} />
                  </Button>
                ))}
            </div>
          ))}
          <Button
            onClick={() => {
              const cards = [...communityCards];
              cards.splice(selectingCommunityCardIndex!, 1);

              setCommunityCards(cards);
              setSelectingCommunityCardIndex(undefined);
            }}
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              const candidates = Card.all.filter(
                card => !communityCards.some(c => c.id === card.id)
              );
              const cards = [...communityCards];
              cards.splice(
                selectingCommunityCardIndex!,
                1,
                candidates[Math.floor(Math.random() * candidates.length)]
              );

              setCommunityCards(cards);
              setSelectingCommunityCardIndex(undefined);
            }}
          >
            Random
          </Button>
        </DialogContent>
      </Dialog>
      <CommunityCards
        cards={communityCards}
        onClick={setSelectingCommunityCardIndex}
      />
      <ComboCountAdvice
        availableComboCount={filteredCombos.length}
        selectedComboCount={selectedComboSet.size}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {[...Card.numbers].reverse().map(n => (
                <TableCell
                  key={n}
                  align="center"
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  {new Card("club", n).numberChar}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Card.numbers].reverse().map(n1 => (
              <TableRow key={n1}>
                <TableCell
                  style={{ backgroundColor: "black", color: "white" }}
                  align="center"
                >
                  {new Card("club", n1).numberChar}
                </TableCell>
                {[...Card.numbers].reverse().map(n2 => {
                  return (
                    <TableCell
                      key={`${n1}-${n2}`}
                      style={{ padding: "0" }}
                      align="center"
                    >
                      <ComboList
                        isSuited={n1 > n2}
                        numbers={[n1, n2]}
                        allCombos={Combo.all}
                        filteredCombos={filteredCombos}
                        selectedComboSet={selectedComboSet}
                        onChange={(comboIds, checked) => {
                          const newSet = new Set(selectedComboSet);

                          if (checked) {
                            comboIds.forEach(comboId => newSet.add(comboId));
                          } else {
                            comboIds.forEach(comboId => newSet.delete(comboId));
                          }

                          setSelectedComboSet(newSet);
                        }}
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
