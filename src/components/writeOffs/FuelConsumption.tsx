import React, { Dispatch, SetStateAction } from "react";
import "./write.css";

interface FuelConsumptionProps {
  hours: string;
  setHours: Dispatch<SetStateAction<string>>;
  setConsumptionType: Dispatch<SetStateAction<string>>;
  calculateFinalValues: () => void;
  finalRemainder: string | null;
  totalSpent: string | null;
}

const FuelConsumption: React.FC<FuelConsumptionProps> = ({
  hours,
  setHours,
  setConsumptionType,
  calculateFinalValues,
  finalRemainder,
  totalSpent,
}) => (
  <div className="fuel-consumption-container">
    <input
      type="number"
      className="fuel-consumption-input"
      placeholder="Часы работы"
      value={hours}
      onChange={(e) => setHours(e.target.value)}
    />
    <div className="fuel-consumption-buttons">
      <button
        className="fuel-consumption-button"
        onClick={() => setConsumptionType("min")}
      >
        Мин. расход
      </button>
      <button
        className="fuel-consumption-button"
        onClick={() => setConsumptionType("avg")}
      >
        Средний расход
      </button>
      <button
        className="fuel-consumption-button"
        onClick={() => setConsumptionType("max")}
      >
        Макс. расход
      </button>
    </div>
    <button
      className="fuel-consumption-button"
      style={{ width: "100%", marginBottom: 0 }}
      onClick={calculateFinalValues}
    >
      Рассчитать расход
    </button>
    {finalRemainder !== null && totalSpent !== null && (
      <div className="fuel-consumption-result">
        <p>Израсходовано топлива: {totalSpent} литров</p>
        <p>Конечный остаток топлива в баке: {finalRemainder} литров</p>
      </div>
    )}
  </div>
);

export default FuelConsumption;
