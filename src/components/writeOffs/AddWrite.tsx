import React, { useState } from "react";
import InputField from "./InputField";
import WorkTypeSelector from "./WorkTypeSelector";
import TractorTypeSelector from "./TractorTypeSelector";
import FuelConsumption from "./FuelConsumption";

import "./write.css";
import { calculateFinalValues } from "./calculations";

const AddWrite: React.FC = () => {
  const [remainder, setRemainder] = useState<string>("");
  const [issued, setIssued] = useState<string>("");
  const [workType, setWorkType] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [tractorType, setTractorType] = useState<string>("");
  const [tankCapacity, setTankCapacity] = useState<number>(0);
  const [finalRemainder, setFinalRemainder] = useState<string | null>(null);
  const [totalSpent, setTotalSpent] = useState<string | null>(null);
  const [consumptionType, setConsumptionType] = useState<string>("");

  const handleTractorTypeChange = (selectedTractor: string) => {
    setTractorType(selectedTractor);
    setTankCapacity(getTankCapacity(selectedTractor));
  };

  const getTankCapacity = (tractorType: string): number => {
    switch (tractorType) {
      case "ландини":
        return 65;
      case "МТЗ-92.1":
        return 95;
      case "МТЗ-82.1":
        return 120;
      default:
        return 0;
    }
  };

  return (
    <div className="container">
      <h2 className="title">Запись данных о тракторе</h2>
      <InputField
        type="number"
        placeholder="остаток при выезде"
        value={remainder}
        onChange={(e) => setRemainder(e.target.value)}
      />
      <InputField
        type="number"
        placeholder="выдано"
        value={issued}
        onChange={(e) => setIssued(e.target.value)}
      />
      <WorkTypeSelector
        value={workType}
        onChange={(e) => setWorkType(e.target.value)}
      />
      <TractorTypeSelector
        value={tractorType}
        onChange={handleTractorTypeChange}
        tankCapacity={tankCapacity}
      />
      {workType && (
        <FuelConsumption
          hours={hours}
          setHours={setHours}
          setConsumptionType={setConsumptionType}
          calculateFinalValues={() =>
            calculateFinalValues({
              remainder,
              issued,
              hours,
              workType,
              tractorType,
              tankCapacity,
              consumptionType,
              setFinalRemainder,
              setTotalSpent,
            })
          }
          finalRemainder={finalRemainder}
          totalSpent={totalSpent}
        />
      )}
    </div>
  );
};

export default AddWrite;
