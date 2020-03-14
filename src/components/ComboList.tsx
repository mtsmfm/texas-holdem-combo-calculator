import * as React from "react";
import { useState } from "react";
import { Combo } from "../classes";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { ComboComponent } from "./ComboComponent";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export const ComboList: React.FC<{
  isSuited: boolean;
  numbers: [number, number];
  allCombos: Combo[];
  filteredCombos: Combo[];
  onChange: (comboIds: string[], checked: boolean) => void;
  selectedComboSet: Set<string>;
}> = ({
  isSuited,
  numbers,
  allCombos: _allCombos,
  filteredCombos: _filteredCombos,
  onChange,
  selectedComboSet
}) => {
  const filterForThisComponent = (c: Combo) => {
    const xs1 = c.cards.map(({ number }) => number).sort();
    const xs2 = numbers.sort();

    return c.isSuited === isSuited && xs1[0] === xs2[0] && xs1[1] === xs2[1];
  };

  const allCombos = _allCombos.filter(filterForThisComponent);
  const filteredCombos = _filteredCombos.filter(filterForThisComponent);
  const selectedCombos = filteredCombos.filter(c => selectedComboSet.has(c.id));

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Tooltip
        title={
          <React.Fragment>
            {filteredCombos.map(c => (
              <ComboComponent key={c.id} combo={c} />
            ))}
          </React.Fragment>
        }
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly"
          }}
        >
          <Checkbox
            checked={
              filteredCombos.length > 0 &&
              filteredCombos.length === selectedCombos.length
            }
            onChange={e => {
              onChange(
                filteredCombos.map(({ id }) => id),
                e.target.checked
              );
            }}
          />
          <div
            style={{
              backgroundColor:
                filteredCombos.length === 0 ? "gray" : "transparent"
            }}
            onClick={() => setIsDialogOpen(true)}
          >
            {selectedCombos.length}/{filteredCombos.length}/{allCombos.length}
          </div>
        </div>
      </Tooltip>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogContent>
          {filteredCombos.map(c => (
            <FormControlLabel
              key={c.id}
              control={
                <Checkbox
                  checked={selectedComboSet.has(c.id)}
                  onChange={e => {
                    onChange([c.id], e.target.checked);
                  }}
                />
              }
              label={<ComboComponent combo={c} />}
            />
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
};
