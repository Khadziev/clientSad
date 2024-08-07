import React from "react";

interface Props {
  totalSpent: string;
  finalRemainder: string;
}

export const CalculationResult: React.FC<Props> = ({
  totalSpent,
  finalRemainder,
}) => {
  return (
    <div>
      <p>Израсходовано топлива: {totalSpent} литров</p>
      <p>Конечный остаток топлива в баке: {finalRemainder} литров</p>
    </div>
  );
};
