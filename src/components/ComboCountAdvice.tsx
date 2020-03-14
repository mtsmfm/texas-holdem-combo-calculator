import * as React from "react";

const f = Math.floor;

export const ComboCountAdvice: React.FC<{
  availableComboCount: number;
  selectedComboCount: number;
}> = ({ availableComboCount, selectedComboCount }) => {
  const flop = {
    total: f(availableComboCount * 0.7),
    value: f(availableComboCount * 0.7 * (1 / 3)),
    bluff: f(availableComboCount * 0.7 * (2 / 3))
  };

  const turn = {
    total: f(availableComboCount * 0.7 * 0.7),
    value: f(availableComboCount * 0.7 * 0.7 * (1 / 2)),
    bluff: f(availableComboCount * 0.7 * 0.7 * (1 / 2))
  };

  const river = {
    total: f(availableComboCount * 0.7 * 0.7 * 0.7),
    value: f(availableComboCount * 0.7 * 0.7 * 0.7 * (2 / 3)),
    bluff: f(availableComboCount * 0.7 * 0.7 * 0.7 * (1 / 3))
  };

  return (
    <div>
      <div>Total: {availableComboCount} combos</div>
      <div>Selected: {selectedComboCount} combos</div>
      <div>
        Flop: {flop.value} : {flop.bluff} / {flop.total}
      </div>
      <div>
        Turn: {turn.value} : {turn.bluff} / {turn.total}
      </div>
      <div>
        River: {river.value} : {river.bluff} / {river.total}
      </div>
    </div>
  );
};
